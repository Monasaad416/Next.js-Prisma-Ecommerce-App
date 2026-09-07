import {
  ISearchParams,
  PageSearchParams,
} from "../../../interfaces/SearchParamsProps";
import SharedPagination from "@/app/SharedPagination";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import ProductsGrid from "./ProductGrid";
import { searchProductsPage } from "./getProduct";

export default async function ProductsContent(props: {
  searchParams?: PageSearchParams;
  query?: string;
  showHeader?: boolean;
  limit?: number;
}) {
  const resolvedSearchParams = ((await props.searchParams) ??
    {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const query = props.query?.trim() ?? "";

  const { products, totalProducts } = await searchProductsPage(
    page,
    pageSize,
    query,
    props.limit,
  );

  if (totalProducts === 0) {
    return <p className="mt-8 mb-5">No products found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <div className="container mx-auto px-4">
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
