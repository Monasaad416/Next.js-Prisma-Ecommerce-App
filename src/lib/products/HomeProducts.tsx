"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { IProductType } from "../../../interfaces/ProductType";
import ProductsGrid from "./ProductGrid";
import SharedPagination from "@/app/SharedPagination";
import { getVisiblePages } from "@/lib/getPageInfo";

const PAGE_SIZE = 12;

export default function HomeProducts({
  products,
}: {
  products: IProductType[];
}) {
  const searchParams = useSearchParams();
  const pageParam = Number(searchParams.get("page") ?? "1");
  const currentPage =
    Number.isFinite(pageParam) && pageParam > 0 ? pageParam : 1;

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const safePage = Math.min(currentPage, totalPages);

  const pageProducts = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return products.slice(start, start + PAGE_SIZE);
  }, [products, safePage]);

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
      <ProductsGrid products={pageProducts} showHeader />
    </SharedPagination>
  );
}
