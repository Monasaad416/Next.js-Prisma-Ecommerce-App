"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import ProductsGrid from "@/lib/products/ProductGrid";
import { IProductType } from "../../../interfaces/ProductType";
import { getSortingLabel } from "@/lib/getSortingInfo";

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

export default function CategoryProductsClient({
  products,
}: {
  products: IProductType[];
}) {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort") ?? "";

  const sortedProducts = useMemo(
    () => sortProducts(products, sort),
    [products, sort],
  );

  return (
    <ProductsGrid
      products={sortedProducts}
      showHeader={false}
      sortLabel={getSortingLabel(sort)}
      totalCount={sortedProducts.length}
    />
  );
}
