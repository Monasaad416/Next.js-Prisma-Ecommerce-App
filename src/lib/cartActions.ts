'use server'

import { cookies } from "next/headers";
import { prisma } from "../../lib/prisma";
import { serializeCart } from "./mappers/cartMapper";
import { ShoppingCart } from "../../types/ShoppingCart";
import { CartItemInput, ItemActionsProps } from "../../types/CartItemInput";

async function getCartWithProducts(cartId: string | undefined) {
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


export async function removeCartIfNoItems(item:ItemActionsProps ): Promise<void> {
    const remainingItems = await getCartSize();
    if (remainingItems === 0) {
    await prisma.cart.delete({
      where: {
        id: item.cartId,
      },
    });
  }
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
    const existingCart = await prisma.cart.findUnique({
      where: { id: cartId },
      select: { id: true },
    });

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
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
  }

  const existingItem = await prisma.cartItem.findUnique({
    where: {
      cartId_productId: {
        cartId,
        productId,
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



export async function getProductByItem(item:CartItemInput) {
    const product = await prisma.product.findFirst({
    where: {
      id: item.productId
    }
  })
  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock <= 0) {
    throw new Error("Out of stock");
  }

  return product

}

export async function increaseItemQty(item: CartItemInput): Promise<void> {
  const product = await getProductByItem(item);

  const cartItem = await prisma.cartItem.findUnique({
    where: { id: item.id },
  });

  if (!cartItem || cartItem.productId !== item.productId) {
    throw new Error("Cart item not found");
  }

  if (cartItem.quantity >= product.stock) {
    throw new Error("Not enough stock");
  }

  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: {
      quantity: {
        increment: 1,
      },
    },
  });
}

export async function dercreaseItemQty(item: CartItemInput): Promise<void> {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: item.id },
  });

  if (!cartItem || cartItem.productId !== item.productId) {
    throw new Error("Cart item not found");
  }

  if (cartItem.quantity <= 1) {
    await prisma.cartItem.delete({
      where: { id: cartItem.id },
    });
    return;
  }

  await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
}

export async function removeItemFromCart(
  item: CartItemInput
): Promise<void> {
  const cartItem = await prisma.cartItem.findUnique({
    where: { id: item.id },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  await prisma.cartItem.delete({
    where: { id: item.id },
  });

  const remainingItems = await getCartSize();

  if (remainingItems === 0) {
    await prisma.cart.delete({
      where: {
        id: cartItem.cartId,
      },
    });
  }
}


