import NotFoundView from "@/components/NotFoundView";

export default function OrderNotFound() {
  return (
    <NotFoundView
      title="Order not found"
      description="That order doesn’t exist or doesn’t belong to your account."
    />
  );
}
