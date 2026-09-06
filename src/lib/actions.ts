'use server'

import { cookies } from "next/headers";
import { Prisma } from "../../generated/prisma/client";
import { IProductDetail } from "../../interfaces/ProductDetails";
import { IProductType } from "../../interfaces/ProductType";
import { prisma } from "../../lib/prisma";
import { serializeCart, SerializedCart } from "./mappers/cartMapper";
import { mapProducts } from "./mappers/productMapper";



export async function getProductBySlug(slug: string): Promise<IProductDetail | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
    include: { category: true },
  });

  if (!product) {
    // throw new Error(`Product with slug "${slug}" not found`);
    return null // to get 404 not found with notFound()
  }


  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    stock: product.stock,
    description: product.description,
    image: product.images[0] || "",
    images: product.images,
    visible: product.visible,
    categoryId: product.categoryId,
    category: product.category?.name ?? "",
    isNew: product.isNew ?? false, // default to false if not set
  };
}


export async function getProductByCatSlug(slug: string): Promise<IProductType[] | null> {
  const products = await prisma.product.findMany({
    where: { category: { slug } },
    include: { category: true },
  });

  if (products.length === 0) {
    return null;
  }

  return mapProducts(products);
}

export async function resolveSearchPath(query: string): Promise<string> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return "/search";
  }

 const category = await prisma.category.findFirst({
  where: {
    OR: [
      {
        slug: {
          contains: trimmedQuery,
          mode: "insensitive",
        },
      },
      {
        name: {
          contains: trimmedQuery,
          mode: "insensitive",
        },
      },
    ],
  },
  select: { slug: true },
});

  if (category) {
    return `/search/byCategory/${category.slug}`;
  }

  return `/search?query=${encodeURIComponent(trimmedQuery)}`;
}

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