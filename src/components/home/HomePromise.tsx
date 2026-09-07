import Link from "next/link";

const points = [
  {
    title: "Thoughtful curation",
    body: "Only chairs, tables, and sofas that earn a place in real homes.",
  },
  {
    title: "Clear pricing",
    body: "No surprise fees — the price on the card is what you pay.",
  },
  {
    title: "Simple checkout",
    body: "Secure payment and a cart that stays out of your way.",
  },
];

export default function HomePromise() {
  return (
    <section className="border-y border-border/60 bg-secondary/40">
      <div className="page-shell py-12 sm:py-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-center">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
              Why shop here
            </p>
            <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
              A quieter furniture storefront.
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Built for browsing comfort — fewer distractions, better product
              pages, and rooms that feel finished.
            </p>
            <Link
              href="/about"
              className="mt-6 inline-flex text-sm font-semibold text-primary transition-opacity hover:opacity-80"
            >
              About Furnia →
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {points.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border border-border/70 bg-card/80 p-5"
              >
                <h3 className="font-heading text-base font-semibold">
                  {point.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {point.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
