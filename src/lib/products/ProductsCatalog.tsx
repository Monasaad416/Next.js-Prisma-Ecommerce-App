"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductsGrid from "@/lib/products/ProductGrid";
import SharedPagination from "@/app/SharedPagination";
import { IProductType } from "../../../interfaces/ProductType";
import { getSortingLabel } from "@/lib/getSortingInfo";
import { getVisiblePages } from "@/lib/getPageInfo";

const PAGE_SIZE = 12;

function sortProducts(products: IProductType[], sort?: string | null) {
  const sorted = [...products];

  switch (sort) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "createdAt-desc":
      return sorted.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
    default:
      return sorted;
  }
}

export default function ProductsCatalog({
  products,
}: {
  products: IProductType[];
}) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "";
  const pageParam = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, safePage]);

  const visiblePages = getVisiblePages(safePage, totalPages);

  if (products.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-border bg-card/50 px-4 py-10 text-center text-muted-foreground">
        No products found
      </p>
    );
  }

  return (
    <SharedPagination
      currentPage={safePage}
      totalPages={totalPages}
      visiblePages={visiblePages}
      clientOnly
    >
      <ProductsGrid
        products={pageProducts}
        showHeader={false}
        sortLabel={getSortingLabel(sort)}
        totalCount={sortedProducts.length}
      />
    </SharedPagination>
  );
}
