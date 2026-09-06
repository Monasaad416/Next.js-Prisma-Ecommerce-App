import NotFoundView from "@/components/NotFoundView";

export default function CategoryNotFound() {
  return (
    <NotFoundView
      title="Category not found"
      description="That category doesn’t exist. Try another collection or browse all products."
    />
  );
}
