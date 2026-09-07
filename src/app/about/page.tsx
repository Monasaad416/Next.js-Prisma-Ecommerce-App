import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import BreadCrumbs from "@/components/breadCrumbs";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn about Furnia — curated home furniture and a clearer shopping experience.",
};

const values = [
  {
    title: "Curated, not crowded",
    body: "We focus on chairs, tables, and sofas so every piece earns its place.",
  },
  {
    title: "Clear pricing",
    body: "No surprise fees at checkout — what you see is what you pay.",
  },
  {
    title: "Built for real rooms",
    body: "From browsing to delivery planning, the experience stays light and intentional.",
  },
];

export default function AboutPage() {
  return (
    <main>
      <section className="relative overflow-hidden border-b border-border/60">
        <div className="page-shell grid items-center gap-10 py-12 md:grid-cols-2 md:py-16">
          <div>
            <BreadCrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "About", href: "/about" },
              ]}
            />
            <p className="font-heading mt-6 text-sm font-semibold uppercase tracking-[0.2em] text-primary">
              Furnia
            </p>
            <h1 className="font-heading mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Furniture for calmer homes.
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
              Furnia started as a simple idea: fewer distractions, better product
              pages, and furniture shopping that respects your time.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center rounded-xl bg-primary px-5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
              >
                Shop furniture
              </Link>
              <Link
                href="/contact"
                className="inline-flex h-11 items-center rounded-xl border border-border bg-card/80 px-5 text-sm font-semibold transition-colors hover:bg-accent"
              >
                Contact us
              </Link>
            </div>
          </div>

          <div className="relative min-h-72 overflow-hidden rounded-3xl border border-border/70 bg-muted shadow-sm md:min-h-96">
            <Image
              src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&q=80"
              alt="Modern living room furniture"
              fill
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      </section>

      <section className="page-shell py-14 sm:py-16">
        <h2 className="font-heading text-2xl font-bold tracking-tight sm:text-3xl">
          What we care about
        </h2>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {values.map((value) => (
            <article key={value.title} className="surface-card p-6">
              <h3 className="font-heading text-lg font-semibold">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {value.body}
              </p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
