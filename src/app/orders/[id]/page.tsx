import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { Package } from "lucide-react";
import BreadCrumbs from "@/components/breadCrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getOrderByIdForCurrentUser,
  statusLabel,
} from "@/lib/orders/getOrders";
import { formatPrice } from "../../../../lib/utils";

type OrderPageProps = {
  params: Promise<{ id: string }> | { id: string };
};

export async function generateMetadata({
  params,
}: OrderPageProps): Promise<Metadata> {
  const { id } = await Promise.resolve(params);
  return {
    title: `Order #${id.slice(-8).toUpperCase()}`,
  };
}

export const dynamic = "force-dynamic";

export default async function OrderDetailsPage({ params }: OrderPageProps) {
  const { id } = await Promise.resolve(params);
  const { user, order } = await getOrderByIdForCurrentUser(id);

  if (!user) {
    return (
      <main className="page-shell py-10 sm:py-12">
        <BreadCrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Orders", href: "/orders" },
          ]}
        />
        <div className="mt-8 overflow-hidden rounded-3xl border border-border/80 bg-card/90 p-8 text-center shadow-sm sm:p-12">
          <h1 className="font-heading text-3xl font-bold tracking-tight">
            Sign in to view this order
          </h1>
          <Button asChild className="mt-6">
            <Link href="/auth">Login</Link>
          </Button>
        </div>
      </main>
    );
  }

  if (!order) {
    notFound();
  }

  return (
    <main className="page-shell py-4 sm:py-6">
      <BreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Orders", href: "/orders" },
          {
            label: `#${order.id.slice(-8).toUpperCase()}`,
            href: `/orders/${order.id}`,
          },
        ]}
      />

      <div className="mt-6 overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-sm">
        <div className="border-b border-border/70 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <Badge
                variant="outline"
                className="mb-3 border-primary/30 text-primary"
              >
                {statusLabel(order.status)}
              </Badge>
              <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
                Order #{order.id.slice(-8).toUpperCase()}
              </h1>
              <p className="mt-2 text-muted-foreground">
                Placed{" "}
                {new Date(order.createdAt).toLocaleString("en-US", {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            <div className="text-left sm:text-right">
              <p className="text-sm uppercase tracking-[0.14em] text-muted-foreground">
                Total
              </p>
              <p className="font-heading mt-1 text-3xl font-bold tracking-tight">
                {formatPrice(Number(order.total))}
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8">
          <h2 className="text-sm font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Items
          </h2>

          <ul className="mt-4 space-y-4">
            {order.items.map((item) => (
              <li
                key={item.id}
                className="grid gap-4 rounded-2xl border border-border/70 bg-muted/30 p-4 sm:grid-cols-[6rem_1fr_auto] sm:items-center"
              >
                <div className="relative aspect-square overflow-hidden rounded-xl bg-muted">
                  {item.productImage ? (
                    <Image
                      src={item.productImage}
                      alt={item.productName}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Package className="h-6 w-6 text-muted-foreground" />
                    </div>
                  )}
                </div>

                <div className="min-w-0">
                  <Link
                    href={`/product/${item.productSlug}`}
                    className="font-heading text-lg font-semibold tracking-tight hover:text-primary"
                  >
                    {item.productName}
                  </Link>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Qty {item.quantity} · {formatPrice(Number(item.unitPrice))} each
                  </p>
                </div>

                <p className="font-heading text-lg font-bold">
                  {formatPrice(Number(item.lineTotal))}
                </p>
              </li>
            ))}
          </ul>

          <Separator className="my-8" />

          <div className="ml-auto max-w-sm space-y-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="font-medium text-foreground">
                {formatPrice(Number(order.subtotal))}
              </span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Shipping</span>
              <span className="font-medium text-foreground">
                {formatPrice(Number(order.shipping))}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/orders">Back to orders</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/products">Continue shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}
