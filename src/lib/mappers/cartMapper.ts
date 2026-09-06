import { Cart, CartItem, Product } from "../../../generated/prisma/client";

type CartItemWithProduct = CartItem & { product: Product };
type CartWithItems = Cart & { items: CartItemWithProduct[] };

export type SerializedCartProduct = {
  id: string;
  name: string;
  slug: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  visible: boolean;
  isNew: boolean;
  categoryId: string;
  createdAt: string;
};

export type SerializedCartItem = {
  id: string;
  quantity: number;
  cartId: string;
  productId: string;
  createdAt: string;
  updatedAt: string;
  product: SerializedCartProduct;
};

export type SerializedCart = {
  id: string;
  createdAt: string;
  updatedAt: string;
  items: SerializedCartItem[];
};

export function serializeCartProduct(product: Product): SerializedCartProduct {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    stock: product.stock,
    description: product.description,
    images: product.images,
    visible: product.visible,
    isNew: product.isNew,
    categoryId: product.categoryId,
    createdAt: product.createdAt.toISOString(),
  };
}

export function serializeCart(cart: CartWithItems): SerializedCart {
  return {
    id: cart.id,
    createdAt: cart.createdAt.toISOString(),
    updatedAt: cart.updatedAt.toISOString(),
    items: cart.items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      cartId: item.cartId,
      productId: item.productId,
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
      product: serializeCartProduct(item.product),
    })),
  };
}
