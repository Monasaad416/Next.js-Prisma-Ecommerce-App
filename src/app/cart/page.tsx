import CartItems from "@/components/cart/CartItems";
import OrderSummary from "@/components/cart/OrderSummary";

const Cart = () => {
  return (
    <div className="page-shell py-4 sm:py-6">
      <div className="mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Shopping Cart
        </h1>
        <p className="mt-2 text-muted-foreground">
          Review your items before checkout.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <CartItems />
        <OrderSummary />
      </div>
    </div>
  );
};

export default Cart;
