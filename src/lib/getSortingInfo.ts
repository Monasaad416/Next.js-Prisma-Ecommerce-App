export const sortingOptions = [
  { label: "Featured", value: "" },
  { label: "Newest", value: "createdAt-desc" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "sales-desc" },
  { label: "Highest Rated", value: "rating-desc" },
  { label: "Name: A-Z", value: "name-asc" },
  { label: "Name: Z-A", value: "name-desc" },
];

export function getSortingLabel(sort?: string) {
  return (
    sortingOptions.find(
      (option) => option.value === sort
    )?.label ?? "Featured"
  );
}