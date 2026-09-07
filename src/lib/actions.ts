'use server'

import { cookies } from "next/headers";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { serializeCart, SerializedCart } from "./mappers/cartMapper";

export { getProductBySlug } from "./products/getProduct";
export { getProductByCatSlug, resolveSearchPath } from "./productActions";

export type CartWithProducts = Prisma.CartGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export type ShoppingCart = SerializedCart & {
  size: number;
  subTotal: number;
};



async function getCartWithProducts(cartId: string | undefined) {
  return await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
      },
    },
  });
}

export async function getCartSize(): Promise<number> {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return 0;
  }

  const cart = await prisma.cart.findUnique({
    where: { id: cartId },
    select: {
      items: {
        select: {
          quantity: true,
        },
      },
    },
  });

  if (!cart) {
    return 0;
  }

  return cart.items.reduce((total, item) => total + item.quantity, 0);
}

export async function getCart(): Promise<ShoppingCart | null> {

  const cartId = (await cookies()).get("cartId")?.value;
  const cart = cartId ? await getCartWithProducts(cartId) : null;

  if (!cart) {
    return null;
  }

  const serializedCart = serializeCart(cart);
  const size = serializedCart.items.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subTotal = serializedCart.items.reduce(
    (total, item) => total + item.quantity * Number(item.product.price),
    0,
  );

  return {
    ...serializedCart,
    size,
    subTotal,
  };
}


export async function getOrCreateCartAndAddItem(
  quantity: number = 1,
  productId: string,
): Promise<void> {
  if (quantity < 1) {
    throw new Error("Quantity must be at least = 1");
  }

  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;

  if (cartId) {
    const existingCart = await getCartWithProducts(cartId);

    if (!existingCart) {
      cartId = undefined;
    }
  }

  if (!cartId) {
    const newCart = await prisma.cart.create({
      data: {},
    });

    cartId = newCart.id;

    cookieStore.set("cartId", cartId, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId: cartId,
        productId:productId,
      },
    },
  });

  if (existingItem) {
    await prisma.cartItem.update({
      where: {
        id: existingItem.id,
      },
      data: {
        quantity: {
          increment: quantity,
        },
      },
    });
  } else {
    await prisma.cartItem.create({
      data: {
        quantity,
        cartId: cartId,
        productId,
      },
    });
  }
}