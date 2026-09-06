import CartItemCard from "./CartItemCard";
import { getCart } from "@/lib/cart";
import Link from "next/link";

const CartItems = async () => {
  const cart = await getCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="surface-card flex flex-col items-start gap-4 px-6 py-12">
        <h2 className="font-heading text-xl font-semibold">Your cart is empty</h2>
        <p className="text-sm text-muted-foreground">
          Browse the catalog and add something you like.
        </p>
        <Link
          href="/"
          className="inline-flex h-10 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.items.map((item) => (
        <div key={item.id}>
          <CartItemCard item={item} />
        </div>
      ))}
    </div>
  );
};

export default CartItems;
