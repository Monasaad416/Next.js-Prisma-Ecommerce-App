import { getProductBySlug, getProductSlugs } from "@/lib/products/getProduct";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, ShoppingCart } from "lucide-react";
import BreadCrumbs from "@/components/breadCrumbs";
import type { ProductPageProps } from "../../../../types/PageProps";
import { getSiteUrl } from "@/lib/site";
import AddToCartBtn from "@/components/AddToCartBtn";

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const slug = (await params).slug;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {};
  }

  const siteUrl = getSiteUrl();
  const image = product.images?.[0] || `${siteUrl}/placeholder.jpg`;
  const canonical = `${siteUrl}/product/${product.slug}`;

  return {
    title: product.name,
    description: product.description,
    alternates: { canonical },
    openGraph: {
      title: product.name,
      description: product.description,
      url: canonical,
      type: "website",
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: product.description,
      images: [image],
    },
  };
}

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getProductSlugs();
  return slugs.map((slug) => ({ slug }));
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const siteUrl = getSiteUrl();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: "Furnia",
    },
    offers: {
      "@type": "Offer",
      url: `${siteUrl}/product/${product.slug}`,
      priceCurrency: "USD",
      price: product.price.toString(),
      availability:
        product.stock > 0
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const cartProduct = {
    id: product.id,
    name: product.name,
    slug: product.slug,
    price: product.price,
    stock: product.stock,
    description: product.description,
    images: product.images,
    visible: product.visible,
    categoryId: product.categoryId,
    isNew: product.isNew,
    createdAt: new Date().toISOString(),
    category: {
      id: product.categoryId,
      name: product.category,
      slug: product.category.toLowerCase().replace(/\s+/g, "-"),
    },
  };

  return (
    <div className="page-shell">
      <BreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Products", href: "/products" },
          { label: product.name, href: `/product/${product.slug}` },
        ]}
      />

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-sm">
        <div className="grid md:grid-cols-2">
          <div className="relative aspect-square bg-muted md:min-h-[32rem]">
            <Image
              src={product.image || "/placeholder.jpg"}
              alt={product.name}
              fill
              priority
              className="object-cover"
              sizes="(max-width:768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-foreground/25 via-transparent to-transparent" />
            {product.isNew && (
              <Badge className="absolute left-4 top-4 z-10 bg-primary text-primary-foreground">
                New
              </Badge>
            )}
          </div>

          <div className="flex flex-col justify-between p-6 sm:p-8 lg:p-10">
            <div>
              {product.category && (
                <Badge
                  variant="outline"
                  className="mb-4 border-primary/30 text-primary"
                >
                  {product.category}
                </Badge>
              )}

              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                {product.name}
              </h1>

              <p className="font-heading mt-4 text-3xl font-bold tracking-tight">
                ${product.price.toFixed(2)}
              </p>

              <Separator className="my-6" />

              <div className="space-y-3">
                <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Description
                </h2>
                <p className="leading-7 text-muted-foreground">
                  {product.description}
                </p>
              </div>

              <Separator className="my-6" />

              <div className="flex items-center gap-3 rounded-xl bg-muted/70 px-4 py-3">
                <ShoppingBag className="h-5 w-5 text-primary" />
                <span
                  className={
                    product.stock > 0
                      ? "text-sm font-medium"
                      : "text-sm font-medium text-destructive"
                  }
                >
                  {product.stock > 0
                    ? `${product.stock} items available`
                    : "Out of stock"}
                </span>
              </div>
            </div>

            <div className="mt-8">
              {product.stock > 0 ? (
                <div className="[&_button]:h-12 [&_button]:w-full [&_button]:px-5 [&_button]:text-base sm:[&_button]:w-auto sm:[&_button]:min-w-48">
                  <AddToCartBtn product={cartProduct} />
                </div>
              ) : (
                <Button
                  className="h-12 w-full text-base sm:w-auto sm:min-w-48"
                  disabled
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Out of Stock
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </div>
  );
};

export default ProductPage;
