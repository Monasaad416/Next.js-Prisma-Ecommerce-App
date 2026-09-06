"use client";

import { useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Button } from "../ui/button";
import RemoveItem from "./RemoveItem";
import { dercreaseItemQty, increaseItemQty } from "@/lib/cartActions";
import { SerializedCartItem } from "@/lib/mappers/cartMapper";
import Link from "next/link";

type CartItemCardProps = {
  item: SerializedCartItem;
};

function toCartItemInput(item: SerializedCartItem) {
  return {
    id: item.id,
    productId: item.productId,
    quantity: item.quantity,
    cartId: item.cartId,
  };
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [quantity, setQuantity] = useState(item.quantity);

  useEffect(() => {
    setQuantity(item.quantity);
  }, [item.quantity, item.id]);

  const unitPrice = Number(item.product.price);
  const lineTotal = quantity * unitPrice;

  const handleIncrease = () => {
    if (quantity >= item.product.stock) {
      return;
    }

    const nextQuantity = quantity + 1;
    setQuantity(nextQuantity);

    startTransition(async () => {
      try {
        await increaseItemQty({
          ...toCartItemInput(item),
          quantity,
        });
        window.dispatchEvent(new Event("cart-updated"));
        router.refresh();
      } catch (error) {
        setQuantity(item.quantity);
        console.error(error);
      }
    });
  };

  const handleDecrease = () => {
    const nextQuantity = quantity - 1;
    setQuantity(Math.max(nextQuantity, 0));

    startTransition(async () => {
      try {
        await dercreaseItemQty({
          ...toCartItemInput(item),
          quantity,
        });
        window.dispatchEvent(new Event("cart-updated"));
        router.refresh();
      } catch (error) {
        setQuantity(item.quantity);
        console.error(error);
      }
    });
  };

  return (
    <article className="surface-card overflow-hidden p-4 sm:p-5">
      <div className="flex flex-col gap-4 sm:flex-row">
        <Link
          href={`/product/${item.product.slug}`}
          className="relative h-32 w-full shrink-0 overflow-hidden rounded-xl bg-muted sm:h-28 sm:w-28"
        >
          <Image
            src={item.product.images[0]}
            alt={item.product.name}
            fill
            className="object-cover"
            sizes="112px"
          />
        </Link>

        <div className="flex flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <Link href={`/product/${item.product.slug}`}>
                <h3 className="font-heading text-lg font-semibold tracking-tight hover:text-primary">
                  {item.product.name}
                </h3>
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                In stock: {item.product.stock}
              </p>
            </div>
            <RemoveItem item={toCartItemInput(item)} />
          </div>

          <div className="mt-4 flex flex-wrap items-end justify-between gap-4">
            <div className="flex gap-8">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Price
                </p>
                <p className="font-heading mt-1 text-lg font-bold">
                  ${unitPrice.toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  Total
                </p>
                <p className="font-heading mt-1 text-lg font-bold">
                  ${lineTotal.toFixed(2)}
                </p>
              </div>
            </div>

            <div className="inline-flex items-center gap-1 rounded-xl border border-border bg-background p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleDecrease}
                disabled={isPending}
              >
                -
              </Button>
              <span className="min-w-8 text-center text-sm font-semibold">
                {quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleIncrease}
                disabled={isPending || quantity >= item.product.stock}
              >
                +
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
