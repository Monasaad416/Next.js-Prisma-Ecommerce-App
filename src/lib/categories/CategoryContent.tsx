import SharedPagination from "@/app/SharedPagination";
import CategoriesGrid from "./CategoriesGrid";
import {
  ISearchParams,
  PageSearchParams,
} from "../../../interfaces/SearchParamsProps";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import { getCategoriesPage } from "./getCategory";

export default async function CategoriesContent(props: {
  searchParams?: PageSearchParams;
  sorting?: string;
  showHeader?: boolean;
  count?: number;
}) {
  const resolvedSearchParams = ((await props.searchParams) ??
    {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const sorting = props.sorting?.trim() ?? "";

  const { categories, totalCategories } = await getCategoriesPage(
    page,
    pageSize,
    sorting,
  );

  if (totalCategories === 0) {
    return <p className="mt-8 mb-5">No categories found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalCategories / pageSize));
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="container mx-auto">
      <SharedPagination
        currentPage={page}
        totalPages={totalPages}
        visiblePages={visiblePages}
      >
        <CategoriesGrid categories={categories} />
      </SharedPagination>
    </div>
  );
}
