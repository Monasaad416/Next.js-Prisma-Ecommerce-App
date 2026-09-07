import { unstable_cache } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { ICategoryType } from "../../../interfaces/CategoryType";
import { mapProducts } from "../mappers/productMapper";
import { IProductType } from "../../../interfaces/ProductType";

const CATEGORY_REVALIDATE_SECONDS = 60;

export const getCategoryBySlug = unstable_cache(
  async (slug: string): Promise<ICategoryType | null> => {
    const category = await prisma.category.findUnique({
      where: { slug },
    });

    if (!category) {
      return null;
    }

    return {
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image ?? "",
      isTopCategory: category.isTopCategory ?? false,
      visible: category.visible ?? false,
    };
  },
  ["category-by-slug"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);

export const getCategorySlugs = unstable_cache(
  async () => {
    const categories = await prisma.category.findMany({
      select: { slug: true },
    });

    return categories.map((category) => category.slug);
  },
  ["category-slugs"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);

export const getCategories = unstable_cache(
  async (): Promise<ICategoryType[]> => {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      slug: category.slug,
      image: category.image ?? "",
      isTopCategory: category.isTopCategory ?? false,
      visible: category.visible ?? false,
    }));
  },
  ["categories-list"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);

export const getProductsByCategory = unstable_cache(
  async (slug: string): Promise<IProductType[]> => {
    const products = await prisma.product.findMany({
      where: { category: { slug } },
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    return mapProducts(products);
  },
  ["products-by-category"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["products", "categories"] },
);

/** Partial match used by search → byCategory routing */
export const findCategoryMatch = unstable_cache(
  async (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return null;

    return prisma.category.findFirst({
      where: {
        OR: [
          { slug: { contains: trimmed, mode: "insensitive" } },
          { name: { contains: trimmed, mode: "insensitive" } },
        ],
      },
      select: {
        id: true,
        name: true,
        slug: true,
        image: true,
        visible: true,
        isTopCategory: true,
      },
    });
  },
  ["category-match"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);

export const getCategoriesPage = unstable_cache(
  async (page: number, pageSize: number, sorting: string) => {
    const where = sorting
      ? {
          name: {
            contains: sorting,
            mode: "insensitive" as const,
          },
        }
      : {};

    const skip = (page - 1) * pageSize;

    const [dbCategories, totalCategories] = await Promise.all([
      prisma.category.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { id: "desc" },
      }),
      prisma.category.count({ where }),
    ]);

    return {
      totalCategories,
      categories: dbCategories.map((category) => ({
        id: category.id,
        name: category.name,
        slug: category.slug,
        visible: category.visible,
        image: category.image || "",
        isTopCategory: category.isTopCategory ?? false,
      })),
    };
  },
  ["categories-page"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);

export const getSitemapCategorySlugs = unstable_cache(
  async () => {
    return prisma.category.findMany({
      select: { slug: true },
    });
  },
  ["sitemap-category-slugs"],
  { revalidate: CATEGORY_REVALIDATE_SECONDS, tags: ["categories"] },
);
