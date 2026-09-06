import SharedPagination from "@/app/SharedPagination";
import { ISearchParams, PageSearchParams } from "../../../interfaces/SearchParamsProps";
import { prisma } from "../../../lib/prisma";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import { mapProducts } from "../mappers/productMapper";
import ProductsGrid from "../products/ProductGrid";

export default async function FilterByCategory(props: {
  searchParams?: PageSearchParams;
  categorySlug: string;
  showHeader?: boolean;
}) {
  const resolvedSearchParams = ((await props.searchParams) ?? {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const skip = (page - 1) * pageSize;
  const categorySlug = props.categorySlug.trim();

  const where = categorySlug
    ? {
        category: {
          slug: categorySlug,
        },
      }
    : {};

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

  if (totalProducts === 0) {
    return <p className="mt-8 mb-5">No products found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));
  const products = mapProducts( dbProducts )

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <main className="container mx-auto p-4">
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
    </main>
  );
}
