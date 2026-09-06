
import SharedPagination from "@/app/SharedPagination";


import CategoriesGrid from "./CategoriesGrid";
import { ISearchParams, PageSearchParams } from "../../../interfaces/SearchParamsProps";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import { prisma } from "../../../lib/prisma";


export default async function CategoriesContent(props: {
  searchParams?: PageSearchParams;
  sorting?:string;
  showHeader?: boolean;
  count?:number
}) {
  const resolvedSearchParams = ((await props.searchParams) ?? {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const skip = (page - 1) * pageSize;
  const sorting = props.sorting?.trim() ?? "";

  const where = sorting
    ? {
        name: {
          contains: sorting,
          mode: "insensitive" as const,
        }
      }
    : {};

  const [dbCategories, totalCategories] = await Promise.all([
    prisma.category.findMany({
      where,
      skip,
      take: pageSize,
      orderBy: { id: "desc" },
    }),
    prisma.category.count({ where }),
  ]);

  if (totalCategories === 0) {
    return <p className="mt-8 mb-5">No categories found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalCategories / pageSize));
  const categories = dbCategories.map((category) => ({
    id: category.id,
    name: category.name,
    slug: category.slug,
    visible: category.visible,
    image: category.image || "",
    // is_top_cat: category.isTopCat,
  }));

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <main className="container mx-auto">
      <SharedPagination
        currentPage={page}
        totalPages={totalPages}
        visiblePages={visiblePages}
      >
        <CategoriesGrid categories={categories} />
      </SharedPagination>
    </main>
  );
}
