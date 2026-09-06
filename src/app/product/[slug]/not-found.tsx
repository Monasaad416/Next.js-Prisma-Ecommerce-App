import NotFoundView from "@/components/NotFoundView";

export default function ProductNotFound() {
  return (
    <NotFoundView
      title="Product not found"
      description="That product isn’t available. It may have been removed or the link is incorrect."
    />
  );
}
