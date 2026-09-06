import { notFound, redirect } from "next/navigation";
import type { NextRequest } from "next/server";
import { confirmOrderPaid } from "@/lib/confirmOrderPaid";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return notFound();
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const orderId =
      session.metadata?.orderId ?? session.client_reference_id ?? null;

    if (!orderId || session.payment_status !== "paid") {
      return notFound();
    }

    await confirmOrderPaid({ orderId, sessionId });
    return redirect(`/checkout/success/${orderId}?session_id=${sessionId}`);
  } catch (error) {
    console.error("Error handling checkout success:", error);
    return notFound();
  }
}
