"use client";

import Image from "next/image";
import { ICategoryType } from "../../../interfaces/CategoryType";
import noImage from "../../images/No_Image_Available.jpg";

const CategoryCard = ({ category }: { category: ICategoryType }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md">
      <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
        <Image
          src={category.image || noImage}
          alt={category.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-t from-foreground/70 via-foreground/10 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5">
          <h3 className="font-heading text-xl font-bold tracking-tight text-white">
            {category.name}
          </h3>
          <p className="mt-1 text-sm text-white/80">Explore collection</p>
        </div>
      </div>
    </article>
  );
};

export default CategoryCard;
