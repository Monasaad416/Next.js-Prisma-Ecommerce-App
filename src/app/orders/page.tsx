import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Package } from "lucide-react";
import BreadCrumbs from "@/components/breadCrumbs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  getOrdersForCurrentUser,
  statusLabel,
} from "@/lib/orders/getOrders";
import { formatPrice } from "../../../lib/utils";

export const metadata: Metadata = {
  title: "Orders",
  description: "View your order history.",
};

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const { user, orders } = await getOrdersForCurrentUser();

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
          <Package className="mx-auto h-12 w-12 text-primary" />
          <h1 className="font-heading mt-4 text-3xl font-bold tracking-tight">
            Sign in to view orders
          </h1>
          <p className="mt-2 text-muted-foreground">
            Your order history is available after you log in.
          </p>
          <Button asChild className="mt-6">
            <Link href="/auth">Login</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell py-4 sm:py-6">
      <BreadCrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Orders", href: "/orders" },
        ]}
      />

      <div className="mt-6 mb-8">
        <h1 className="font-heading text-3xl font-bold tracking-tight sm:text-4xl">
          Your orders
        </h1>
        <p className="mt-2 text-muted-foreground">
          Track purchases and open any order for full details.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
          <Package className="mx-auto h-10 w-10 text-muted-foreground" />
          <p className="mt-4 font-heading text-xl font-semibold">No orders yet</p>
          <p className="mt-2 text-sm text-muted-foreground">
            When you complete a checkout, your orders will show up here.
          </p>
          <Button asChild className="mt-6">
            <Link href="/products">Browse products</Link>
          </Button>
        </div>
      ) : (
        <ul className="space-y-4">
          {orders.map((order) => {
            const preview = order.items[0];
            return (
              <li key={order.id}>
                <Link
                  href={`/orders/${order.id}`}
                  className="group block overflow-hidden rounded-3xl border border-border/80 bg-card/90 shadow-sm transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-md"
                >
                  <div className="grid gap-4 p-5 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:p-6">
                    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                      {preview?.productImage ? (
                        <Image
                          src={preview.productImage}
                          alt={preview.productName}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="112px"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <Package className="h-8 w-8 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-heading text-lg font-semibold tracking-tight">
                          Order #{order.id.slice(-8).toUpperCase()}
                        </p>
                        <Badge
                          variant="outline"
                          className="border-primary/30 text-primary"
                        >
                          {statusLabel(order.status)}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                        {" · "}
                        {order.items.length}{" "}
                        {order.items.length === 1 ? "item" : "items"}
                      </p>
                      {preview ? (
                        <p className="mt-2 truncate text-sm text-muted-foreground">
                          {preview.productName}
                          {order.items.length > 1
                            ? ` +${order.items.length - 1} more`
                            : ""}
                        </p>
                      ) : null}
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="font-heading text-xl font-bold tracking-tight">
                        {formatPrice(Number(order.total))}
                      </p>
                      <p className="mt-1 text-sm font-medium text-primary group-hover:underline">
                        View details →
                      </p>
                    </div>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}

      <Separator className="my-10" />

      <div className="flex flex-wrap gap-3">
        <Button asChild variant="outline">
          <Link href="/products">Continue shopping</Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/cart">Go to cart</Link>
        </Button>
      </div>
    </main>
  );
}
