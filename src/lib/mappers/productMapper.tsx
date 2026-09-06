
import { Category, Product } from "../../../generated/prisma/client";
import { IProductType } from "../../../interfaces/ProductType";

type ProductWithCategory = Product & {
  category: Category;
};

export function mapProduct(
  product: ProductWithCategory
): IProductType {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: Number(product.price),
    stock: product.stock,
    description: product.description,
    images: product.images,
    categoryId: product.categoryId,
    isNew: product.isNew,
    visible: product.visible,
    createdAt: product.createdAt.toISOString(),

    category: {
      id: product.category.id,
      name: product.category.name,
      slug: product.category.slug,
    },
  };
}

export function mapProducts(
  products: ProductWithCategory[]
): IProductType[] {
  return products.map(mapProduct);
}