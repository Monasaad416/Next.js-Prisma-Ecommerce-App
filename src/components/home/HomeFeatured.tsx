import Link from "next/link";
import ProductCard from "@/app/products/ProductCard";
import { IProductType } from "../../../interfaces/ProductType";

export default function HomeFeatured({
  products,
}: {
  products: IProductType[];
}) {
  if (products.length === 0) {
    return (
      <section id="new-arrivals" className="page-shell scroll-mt-24 pb-14">
        <p className="rounded-xl border border-dashed border-border bg-card/50 px-4 py-10 text-center text-muted-foreground">
          No products found
        </p>
      </section>
    );
  }

  return (
    <section id="new-arrivals" className="page-shell scroll-mt-24 py-12 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
            Fresh finds
          </p>
          <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            New arrivals
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Recently added pieces for living rooms, dining, and workspaces.
          </p>
        </div>
        <Link
          href="/products"
          className="inline-flex h-10 items-center rounded-xl border border-border bg-card px-4 text-sm font-semibold transition-colors hover:bg-accent"
        >
          Browse all products
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
