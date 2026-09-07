import SharedPagination from "@/app/SharedPagination";
import {
  ISearchParams,
  PageSearchParams,
} from "../../../interfaces/SearchParamsProps";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import ProductsGrid from "../products/ProductGrid";
import { getProductsByCategoryPage } from "../products/getProduct";

export default async function FilterByCategory(props: {
  searchParams?: PageSearchParams;
  categorySlug: string;
  showHeader?: boolean;
}) {
  const resolvedSearchParams = ((await props.searchParams) ??
    {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const categorySlug = props.categorySlug.trim();

  const { products, totalProducts } = await getProductsByCategoryPage(
    page,
    pageSize,
    categorySlug,
  );

  if (totalProducts === 0) {
    return <p className="mt-8 mb-5">No products found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="container mx-auto p-4">
      <SharedPagination
        currentPage={page}
        totalPages={totalPages}
        visiblePages={visiblePages}
      >
        <ProductsGrid
          products={products}
          showHeader={props.showHeader ?? true}
        />
      </SharedPagination>
    </div>
  );
}
