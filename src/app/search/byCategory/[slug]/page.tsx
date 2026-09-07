import BreadCrumbs from "@/components/breadCrumbs";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductCardSkeleton from "../../../ProductCardSkeleton";
import FilterByCategory from "@/lib/categories/FilterByCategory";
import { findCategoryMatch } from "@/lib/categories/getCategory";
import type { SearchByCategoryPageProps } from "../../../../../types/PageProps";

export default async function SearchByCategoryBySlugPage({
  params,
  searchParams,
}: SearchByCategoryPageProps) {
  const { slug } = await params;

  const category = await findCategoryMatch(slug);

  if (!category) {
    notFound();
  }

  const breadCrumbs = [
    { label: "Products", href: "/" },
    {
      label: category.name,
      href: `/search/byCategory/${slug}`,
    },
  ];

  return (
    <>
      <BreadCrumbs items={breadCrumbs} />

      <Suspense fallback={<ProductCardSkeleton />}>
        <FilterByCategory
          searchParams={searchParams}
          categorySlug={category.slug}
          showHeader={false}
        />
      </Suspense>
    </>
  );
}
