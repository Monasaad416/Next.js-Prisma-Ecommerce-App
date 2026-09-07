import { unstable_cache } from "next/cache";
import { prisma } from "../../../lib/prisma";
import { IProductDetail } from "../../../interfaces/ProductDetails";
import { mapProducts } from "../mappers/productMapper";
import { IProductType } from "../../../interfaces/ProductType";

const PRODUCT_REVALIDATE_SECONDS = 60;

export const getProductBySlug = unstable_cache(
  async (slug: string): Promise<IProductDetail | null> => {
    const product = await prisma.product.findUnique({
      where: { slug },
      include: { category: true },
    });

    if (!product) {
      return null;
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
      isNew: product.isNew ?? false,
    };
  },
  ["product-by-slug"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products"] },
);

export const getProductSlugs = unstable_cache(
  async () => {
    const products = await prisma.product.findMany({
      select: { slug: true },
    });

    return products.map((product) => product.slug);
  },
  ["product-slugs"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products"] },
);

export const getHomeProducts = unstable_cache(
  async (): Promise<IProductType[]> => {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { id: "desc" },
    });

    return mapProducts(products);
  },
  ["home-products"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products"] },
);

export const searchProductsPage = unstable_cache(
  async (page: number, pageSize: number, query: string, limit?: number) => {
    const where = query
      ? {
          OR: [
            {
              name: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
            {
              description: {
                contains: query,
                mode: "insensitive" as const,
              },
            },
          ],
        }
      : {};

    const skip = limit ? 0 : (page - 1) * pageSize;

    const [dbProducts, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip,
        take: pageSize,
        orderBy: { id: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      totalProducts,
      products: mapProducts(dbProducts),
    };
  },
  ["search-products-page"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products"] },
);

export const getProductsByCategoryPage = unstable_cache(
  async (page: number, pageSize: number, categorySlug: string) => {
    const where = categorySlug
      ? {
          category: {
            slug: categorySlug,
          },
        }
      : {};

    const skip = (page - 1) * pageSize;

    const [dbProducts, totalProducts] = await Promise.all([
      prisma.product.findMany({
        where,
        include: { category: true },
        skip,
        take: pageSize,
        orderBy: { id: "desc" },
      }),
      prisma.product.count({ where }),
    ]);

    return {
      totalProducts,
      products: mapProducts(dbProducts),
    };
  },
  ["products-by-category-page"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products", "categories"] },
);

export const getSitemapProducts = unstable_cache(
  async () => {
    return prisma.product.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    });
  },
  ["sitemap-products"],
  { revalidate: PRODUCT_REVALIDATE_SECONDS, tags: ["products"] },
);
