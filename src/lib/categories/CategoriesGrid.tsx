import CategoryCard from "@/app/categories/CategoryCard";
import Link from "next/link";
import {
  CategoriesGridProps,
  ICategoryType,
} from "../../../interfaces/CategoryType";

export default function CategoriesGrid({ categories }: CategoriesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {categories.map((category: ICategoryType) => (
        <Link key={category.id} href={`/categories/${category.slug}`}>
          <CategoryCard category={category} />
        </Link>
      ))}
    </div>
  );
}
