import { Suspense } from "react";
import type { Metadata } from "next";
import BreadCrumbs from "@/components/breadCrumbs";
import CategoriesSidebar from "@/lib/categories/CategoriesSidebar";
import Sorting from "@/components/sorting";
import ProductsCatalog from "@/lib/products/ProductsCatalog";
import { getHomeProducts } from "@/lib/products/getProduct";
import Loading from "../loading";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Products",
  description: "Browse all products with sorting and category filters.",
};

export default async function ProductsPage() {
  const products = await getHomeProducts();

  return (
    <main className="page-shell">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Products", href: "/products" },
          ]}
        />

        <Suspense fallback={<div className="h-10 w-44 rounded-xl border bg-card" />}>
          <Sorting />
        </Suspense>
      </div>

      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          All products
        </h1>
        <p className="mt-2 text-muted-foreground">
          {products.length} products available
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <aside className="w-full shrink-0 lg:w-64">
          <CategoriesSidebar />
        </aside>

        <div className="min-w-0 flex-1">
          <Suspense fallback={<Loading />}>
            <ProductsCatalog products={products} />
          </Suspense>
        </div>
      </div>
    </main>
  );
}
