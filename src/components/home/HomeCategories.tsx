import Link from "next/link";
import { ICategoryType } from "../../../interfaces/CategoryType";
import CategoryCard from "@/app/categories/CategoryCard";

export default function HomeCategories({
  categories,
}: {
  categories: ICategoryType[];
}) {
  if (categories.length === 0) return null;

  return (
    <section className="page-shell py-12 sm:py-14">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm font-medium uppercase tracking-[0.16em] text-primary">
            Collections
          </p>
          <h2 className="font-heading mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            Shop by category
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Browse chairs, tables, and sofas without the clutter.
          </p>
        </div>
        <Link
          href="/categories"
          className="text-sm font-semibold text-primary transition-opacity hover:opacity-80"
        >
          View all categories →
        </Link>
      </div>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <Link key={category.id} href={`/categories/${category.slug}`}>
            <CategoryCard category={category} />
          </Link>
        ))}
      </div>
    </section>
  );
}
