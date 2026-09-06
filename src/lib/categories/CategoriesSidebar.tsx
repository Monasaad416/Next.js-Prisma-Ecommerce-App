import Link from "next/link";
import { getCategories } from "@/lib/categories/getCategory";

interface CategoriesSidebarProps {
  currentCategory?: string;
}

export default async function CategoriesSidebar({
  currentCategory,
}: CategoriesSidebarProps) {
  const categories = await getCategories();

  return (
    <div className="surface-card p-3">
      <p className="mb-3 px-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
        Categories
      </p>
      <div className="space-y-1">
        <Link
          href="/products"
          className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
            !currentCategory
              ? "bg-primary text-primary-foreground"
              : "text-foreground hover:bg-accent hover:text-accent-foreground"
          }`}
        >
          All products
        </Link>
        {categories.map((category) => {
          const active = currentCategory === category.slug;
          return (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className={`block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {category.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
