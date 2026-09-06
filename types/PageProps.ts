import { CategorySearchParams } from "../interfaces/GategorySearchProps";
import { PageSearchParams } from "../interfaces/SearchParamsProps";

/** Dynamic route pages with a `slug` param only (ISR-friendly). */
export type SlugPageProps = {
  params: Promise<{ slug: string }>;
};

/** Product detail page props. */
export type ProductPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
};

/** Search results page props. */
export type SearchPageProps = {
  searchParams?: PageSearchParams;
};

/** Category-by-slug search page props. */
export type SearchByCategoryPageProps = {
  params: Promise<{ slug: string }>;
  searchParams?: CategorySearchParams;
};
