import BreadCrumbs from "@/components/breadCrumbs";
import { Suspense } from "react";
import { notFound } from "next/navigation";
import ProductCardSkeleton from "../../../ProductCardSkeleton";
import { prisma } from "../../../../../lib/prisma";
import FilterByCategory from "@/lib/categories/FilterByCategory";
import type { SearchByCategoryPageProps } from "../../../../../types/PageProps";

export default async function SearchByCategoryBySlugPage({
  params,
  searchParams,
}: SearchByCategoryPageProps) {
  const { slug } = await params;

  const category = await prisma.category.findFirst({
    where: {
      OR: [
        {
          slug: {
            contains: slug,
            mode: "insensitive",
          },
        },
        {
          name: {
            contains: slug,
            mode: "insensitive",
          },
        },
      ],
    },
  });

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
          categorySlug={slug}
          showHeader={false}
        />
      </Suspense>
    </>
  );
}
