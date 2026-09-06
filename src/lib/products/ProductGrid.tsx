import BreadCrumbs from "@/components/breadCrumbs";
import ProductCard from "@/app/products/ProductCard";
import { IProductType } from "../../../interfaces/ProductType";

export default function ProductsGrid({
  products,
  showHeader = true,
  sortLabel,
  totalCount,
}: {
  products: IProductType[];
  showHeader?: boolean;
  sortLabel?: string;
  totalCount?: number;
}) {
  const countLabel = totalCount ?? products.length;

  return (
    <>
      {showHeader ? (
        <div className="mb-8 space-y-4">
          <BreadCrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Products", href: "/products" },
            ]}
          />
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
                Products
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Showing {products.length} of {countLabel} products
                {sortLabel ? ` · ${sortLabel}` : ""}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <p className="mb-6 text-sm text-muted-foreground">
          Showing {products.length} of {countLabel} products
          {sortLabel ? ` · ${sortLabel}` : ""}
        </p>
      )}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
