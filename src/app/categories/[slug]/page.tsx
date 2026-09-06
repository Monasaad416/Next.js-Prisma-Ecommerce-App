import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Suspense } from "react";
import BreadCrumbs from "@/components/breadCrumbs";
import CategoriesSidebar from "@/lib/categories/CategoriesSidebar";
import Sorting from "@/components/sorting";
import CategoryProductsClient from "@/lib/categories/CategoryProducts";
import {
  getCategoryBySlug,
  getCategorySlugs,
  getProductsByCategory,
} from "@/lib/categories/getCategory";
import type { SlugPageProps } from "../../../../types/PageProps";
import { getSiteUrl } from "@/lib/site";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getCategorySlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: SlugPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const canonical = `${siteUrl}/categories/${category.slug}`;
  const image = category.image || `${siteUrl}/placeholder.jpg`;

  return {
    title: category.name,
    description: `Browse all ${category.name} products`,
    alternates: { canonical },
    openGraph: {
      title: category.name,
      description: `Browse all ${category.name} products`,
      url: canonical,
      images: [{ url: image, alt: category.name }],
    },
    twitter: {
      card: "summary_large_image",
      title: category.name,
      description: `Browse all ${category.name} products`,
      images: [image],
    },
  };
}

export default async function CategoryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([
    getCategoryBySlug(slug),
    getProductsByCategory(slug),
  ]);

  if (!category || products.length === 0) {
    notFound();
  }

  return (
    <div className="page-shell">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
            { label: category.name, href: `/categories/${slug}` },
          ]}
        />

        <Suspense fallback={<div className="h-10 w-44 rounded-xl border bg-card" />}>
          <Sorting />
        </Suspense>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          {category.name}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} products in this collection
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <CategoriesSidebar currentCategory={slug} />
        </aside>

        <div className="min-w-0 flex-1">
          <Suspense
            fallback={
              <p className="text-sm text-muted-foreground">
                Showing {products.length} products
              </p>
            }
          >
            <CategoryProductsClient products={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
