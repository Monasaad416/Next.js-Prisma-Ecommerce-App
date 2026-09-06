"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingBag } from "lucide-react";
import { getCartSize } from "@/lib/cartActions";

const CartIcon = () => {
  const [cartSize, setCartSize] = useState(0);

  useEffect(() => {
    const loadCartSize = () => {
      getCartSize()
        .then(setCartSize)
        .catch(() => setCartSize(0));
    };

    loadCartSize();
    window.addEventListener("cart-updated", loadCartSize);

    return () => {
      window.removeEventListener("cart-updated", loadCartSize);
    };
  }, []);

  return (
    <Link
      href="/cart"
      className="relative inline-flex h-9 w-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-accent"
      aria-label={`Cart${cartSize > 0 ? `, ${cartSize} items` : ""}`}
    >
      <ShoppingBag className="h-5 w-5" />

      {cartSize > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-4.5 items-center justify-center rounded-md bg-primary px-1 text-[10px] font-semibold text-primary-foreground">
          {cartSize}
        </span>
      )}
    </Link>
  );
};

export default CartIcon;
