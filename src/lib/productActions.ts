'use server'

import { IProductType } from "../../interfaces/ProductType";
import { prisma } from "../../lib/prisma";
import { mapProducts } from "./mappers/productMapper";

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












