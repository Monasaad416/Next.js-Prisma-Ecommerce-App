import Link from "next/link";
import Image from "next/image";

export default function HomeHero() {
  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <div className="page-shell grid items-center gap-10 py-12 md:grid-cols-[1.05fr_0.95fr] md:py-16 lg:py-20">
        <div>
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.2em] text-primary">
            Furnia Furniture
          </p>
          <h1 className="font-heading mt-4 max-w-xl text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Furniture that feels at home.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
            Chairs, tables, and sofas chosen for everyday rooms — clear prices,
            simple checkout.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#new-arrivals"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See new arrivals
            </a>
            <Link
              href="/categories"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-border bg-card/80 px-5 text-sm font-semibold text-foreground transition-colors hover:bg-accent"
            >
              Shop by room
            </Link>
          </div>
        </div>

        <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm md:min-h-[28rem]">
          <Image
            src="https://images.unsplash.com/photo-1618220179428-22790b461013?w=1400&q=80"
            alt="Modern living room with sofa and table"
            fill
            priority
            className="object-cover"
            sizes="(max-width:768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-foreground/35 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 rounded-xl border border-white/20 bg-card/90 p-4 backdrop-blur-sm">
            <p className="font-heading text-base font-semibold">Living room edit</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Sofas, side tables, and seating that work together.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
