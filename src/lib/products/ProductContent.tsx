import { ISearchParams, PageSearchParams } from "../../../interfaces/SearchParamsProps";
import SharedPagination from "@/app/SharedPagination";
import { getPageNumber, getVisiblePages } from "../getPageInfo";
import { mapProducts } from "../mappers/productMapper";
import ProductsGrid from "./ProductGrid";
import { prisma } from "../../../lib/prisma";


export default async function ProductsContent(props: {
  searchParams?: PageSearchParams;
  query?: string;
  showHeader?: boolean;
  limit?:number
}) {
  const resolvedSearchParams = ((await props.searchParams) ?? {}) as ISearchParams;
  const page = getPageNumber(resolvedSearchParams);
  const pageSize = 12;
  const skip = (page - 1) * pageSize;
  const query = props.query?.trim() ?? "";

  // const orderBy: Record<string, string> = {
  //   name: "asc" as const,
  //   price: "desc" as const,
  //   stock: "desc" as const,
  //   createdAt: "desc" as const,
  //   updatedAt: "desc" as const,
  // };

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

  const [dbProducts, totalProducts] = await Promise.all([
    prisma.product.findMany({
      where,
      include: { category: true },
      skip: props.limit ? 0 : skip,
      take: pageSize,
      orderBy: { id: "desc" },
    }),
    prisma.product.count({ where }),
  ]);

  if (totalProducts === 0) {
    return <p className="mt-8 mb-5">No products found</p>;
  }

  const totalPages = Math.max(1, Math.ceil(totalProducts / pageSize));

  const products = mapProducts(dbProducts);

  const visiblePages = getVisiblePages(page, totalPages);

  return (
    <main className="container mx-auto px-4">
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
