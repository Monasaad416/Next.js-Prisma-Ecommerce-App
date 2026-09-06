import ProductCardSkeleton from "./ProductCardSkeleton";

export default function loading() {
  return (
    <div>
      <section className="page-shell grid gap-10 py-12 md:grid-cols-2 md:py-16">
        <div className="space-y-4">
          <div className="h-4 w-32 animate-pulse rounded bg-muted" />
          <div className="h-12 w-full max-w-md animate-pulse rounded-xl bg-muted" />
          <div className="h-4 w-3/4 animate-pulse rounded bg-muted" />
          <div className="flex gap-3 pt-2">
            <div className="h-11 w-36 animate-pulse rounded-xl bg-muted" />
            <div className="h-11 w-32 animate-pulse rounded-xl bg-muted" />
          </div>
        </div>
        <div className="min-h-72 animate-pulse rounded-3xl bg-muted md:min-h-96" />
      </section>

      <section className="page-shell py-12">
        <div className="mb-8 h-8 w-48 animate-pulse rounded bg-muted" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="aspect-4/5 animate-pulse rounded-2xl bg-muted" />
          ))}
        </div>
      </section>

      <section className="page-shell pb-14">
        <div className="mb-8 h-8 w-40 animate-pulse rounded bg-muted" />
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
