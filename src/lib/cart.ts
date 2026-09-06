import { cookies } from "next/headers";
import { Prisma } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { serializeCart, SerializedCart } from "./mappers/cartMapper";

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

export async function getCartWithProducts(cartId: string | undefined) {
  return await prisma.cart.findUnique({
    where: { id: cartId },
    include: {
      items: {
        include: {
          product: true,
        },
        orderBy: { createdAt: "asc" },
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
    (total, item) => total + item.quantity * item.product.price,
    0,
  );

  return {
    ...serializedCart,
    size,
    subTotal,
  };
}
