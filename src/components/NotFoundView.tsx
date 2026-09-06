import Image from "next/image";
import Link from "next/link";

type NotFoundViewProps = {
  title?: string;
  description?: string;
};

export default function NotFoundView({
  title = "Page not found",
  description = "The page you’re looking for doesn’t exist or may have moved.",
}: NotFoundViewProps) {
  return (
    <main className="page-shell py-10 sm:py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="relative min-h-64 overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm md:min-h-80">
          <Image
            src="https://images.unsplash.com/photo-1584824486509-112e4181ff6b?w=1200&q=80"
            alt="404 — page not found"
            fill
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
            priority
          />
        </div>

        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            404
          </p>
          <h1 className="font-heading mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              Back to home
            </Link>
            <Link
              href="/products"
              className="inline-flex h-11 items-center rounded-xl border border-border bg-card/80 px-5 text-sm font-semibold transition-colors hover:bg-accent"
            >
              Browse products
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
