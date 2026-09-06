import BreadCrumbs from "@/components/breadCrumbs";
import { ISearchParams } from "../../../interfaces/SearchParamsProps";
import { Suspense } from "react";
import ProductCardSkeleton from "../ProductCardSkeleton";
import getSearchQuery from "@/lib/getSearchQuery";
import ProductsContent from "@/lib/products/ProductContent";
import type { SearchPageProps } from "../../../types/PageProps";

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = (await searchParams) ?? {};
  const query = getSearchQuery(params as ISearchParams);

  const breadCrumbs = [
    { label: "Products", href: "/" },
    {
      label: `Results for: ${query || "All products"}`,
      href: query ? `/search?query=${encodeURIComponent(query)}` : "/search",
    },
  ];

  return (
    <div className="page-shell">
      <div className="mb-8 space-y-4">
        <BreadCrumbs items={breadCrumbs} />
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Search results
          </h1>
          <p className="mt-2 text-muted-foreground">
            {query
              ? `Showing matches for “${query}”`
              : "Browse all products"}
          </p>
        </div>
      </div>

      <Suspense fallback={<ProductCardSkeleton />}>
        <ProductsContent
          searchParams={searchParams}
          query={query}
          showHeader={false}
        />
      </Suspense>
    </div>
  );
}
