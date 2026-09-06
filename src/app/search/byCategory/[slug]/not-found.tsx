import NotFoundView from "@/components/NotFoundView";

export default function CategorySearchNotFound() {
  return (
    <NotFoundView
      title="Category not found"
      description="That category doesn’t exist. Try chairs, tables, sofas, or browse all products."
    />
  );
}
