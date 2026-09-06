import HomeHero from "@/components/home/HomeHero";
import HomeCategories from "@/components/home/HomeCategories";
import HomeFeatured from "@/components/home/HomeFeatured";
import HomePromise from "@/components/home/HomePromise";
import { getHomeProducts } from "@/lib/products/getProduct";
import { getCategories } from "@/lib/categories/getCategory";

export const revalidate = 60;

export default async function HomePage() {
  const [products, categories] = await Promise.all([
    getHomeProducts(),
    getCategories(),
  ]);

  const featured = [...products]
    .sort((a, b) => Number(b.isNew) - Number(a.isNew))
    .slice(0, 8);

  return (
    <div>
      <HomeHero />
      <HomeCategories categories={categories} />
      <HomeFeatured products={featured} />
      <HomePromise />
    </div>
  );
}
