import BreadCrumbs from "@/components/breadCrumbs";
import CategoriesContent from "@/lib/categories/CategoryContent";


import type { Metadata } from "next";
import { getSiteUrl } from "@/lib/site";

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse chairs, tables, sofas, and more.",
  alternates: { canonical: `${siteUrl}/categories` },
  openGraph: {
    title: "Categories",
    description: "Browse chairs, tables, sofas, and more.",
    url: `${siteUrl}/categories`,
  },
};


const Categories = () => {
  return (
    <div className="page-shell">
      <div className="mb-8 space-y-4">
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Categories", href: "/categories" },
          ]}
        />
        <div>
          <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            Categories
          </h1>
          <p className="mt-2 text-muted-foreground">
            Browse collections and jump into what you need.
          </p>
        </div>
      </div>
      <CategoriesContent />
    </div>
  );
};

export default Categories;
