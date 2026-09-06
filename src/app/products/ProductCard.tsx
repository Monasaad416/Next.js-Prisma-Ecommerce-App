"use client";

import Image from "next/image";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { formatPrice } from "../../../lib/utils";
import { IProductType } from "../../../interfaces/ProductType";
import AddToCartBtn from "@/components/AddToCartBtn";
import noImage from "../../images/No_Image_Available.jpg";


const ProductCard = ({ product }: { product: IProductType }) => {
  return (
    <Card className="group overflow-hidden border-border/80 bg-card/90 pt-0 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-md">
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative h-56 w-full overflow-hidden bg-muted">
          <Image
            src={product.images[0] || noImage}
            alt={product.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.isNew && (
            <span className="absolute left-3 top-3 rounded-md bg-primary px-2 py-1 text-[11px] font-semibold uppercase tracking-wide text-primary-foreground">
              New
            </span>
          )}
        </div>

        <CardHeader className="gap-2 space-y-0 pb-2">
          <CardTitle className="font-heading line-clamp-2 min-h-12 text-lg leading-snug">
            {product.name}
          </CardTitle>
          <CardDescription className="line-clamp-2 text-sm leading-relaxed">
            {product.description}
          </CardDescription>
        </CardHeader>
      </Link>

      <CardFooter className="border-t border-border/60 pt-4">
        <div className="flex w-full items-center justify-between gap-3">
          <p className="font-heading text-xl font-bold tracking-tight">
            {formatPrice(product.price)}
          </p>
          <AddToCartBtn product={product} />
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
