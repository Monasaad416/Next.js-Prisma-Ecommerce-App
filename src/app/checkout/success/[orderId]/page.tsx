import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { confirmOrderPaid } from "@/lib/confirmOrderPaid";
import { formatPrice } from "../../../../../lib/utils";

export const metadata: Metadata = {
  title: "Order confirmed",
};

type PageProps = {
  params: Promise<{ orderId: string }> | { orderId: string };
  searchParams?:
    | Promise<{ session_id?: string }>
    | { session_id?: string };
};

export default async function OrderSuccessPage({
  params,
  searchParams,
}: PageProps) {
  const { orderId } = await Promise.resolve(params);
  const query = searchParams ? await Promise.resolve(searchParams) : {};
  const sessionId = query.session_id ?? null;

  const { order, paid } = await confirmOrderPaid({ orderId, sessionId });

  if (!order) {
    return (
      <main className="page-shell py-16 text-center">
        <h1 className="font-heading text-2xl font-bold">Order not found</h1>
        <p className="mt-2 text-muted-foreground">
          We could not find that order.
        </p>
        <Button asChild className="mt-6">
          <Link href="/">Back home</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="page-shell max-w-3xl py-12">
      <Card className="border-border/80 bg-card/90 shadow-sm">
        <CardContent className="space-y-6 p-8 text-center">
          <CheckCircle2 className="mx-auto h-16 w-16 text-primary" />

          <div>
            <h1 className="font-heading text-3xl font-bold tracking-tight">
              {paid ? "Order confirmed" : "Payment received — confirming…"}
            </h1>
            <p className="mt-2 text-muted-foreground">
              {paid
                ? "Thank you for your purchase. Your order is being processed."
                : "If this stays pending, wait a moment or contact support with your order number."}
            </p>
          </div>

          <div className="rounded-xl border border-border/70 bg-muted/40 p-4">
            <p className="text-sm text-muted-foreground">Order number</p>
            <p className="font-heading mt-1 text-lg font-semibold">
              #{order.id.slice(-8).toUpperCase()}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Status:{" "}
              <span className="font-medium text-foreground">{order.status}</span>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Total:{" "}
              <span className="font-medium text-foreground">
                {formatPrice(Number(order.total))}
              </span>
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild>
              <Link href="/orders">View orders</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Continue shopping</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
