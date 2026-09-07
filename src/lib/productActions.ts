"use server";

import { unstable_cache } from "next/cache";
import { IProductType } from "../../interfaces/ProductType";
import { mapProducts } from "./mappers/productMapper";
import { prisma } from "../../lib/prisma";
import { findCategoryMatch } from "./categories/getCategory";

const REVALIDATE_SECONDS = 60;

export const getProductByCatSlug = unstable_cache(
  async (slug: string): Promise<IProductType[] | null> => {
    const products = await prisma.product.findMany({
      where: { category: { slug } },
      include: { category: true },
    });

    if (products.length === 0) {
      return null;
    }

    return mapProducts(products);
  },
  ["product-actions-by-cat-slug"],
  { revalidate: REVALIDATE_SECONDS, tags: ["products", "categories"] },
);

export async function resolveSearchPath(query: string): Promise<string> {
  const trimmedQuery = query.trim();

  if (!trimmedQuery) {
    return "/search";
  }

  const category = await findCategoryMatch(trimmedQuery);

  if (category) {
    return `/search/byCategory/${category.slug}`;
  }

  return `/search?query=${encodeURIComponent(trimmedQuery)}`;
}
