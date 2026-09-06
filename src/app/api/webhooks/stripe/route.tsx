import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "../../../../../lib/prisma";


export async function POST(req: Request) {
  const payload = await req.text();

  const signature =
    (await headers()).get("stripe-signature")!;

    if(!signature) {
    return NextResponse.json(
      { error: "Missing signature" },
      { status: 400 }
    );
  }
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      payload,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Error verifying Stripe webhook signature:", error);
    return NextResponse.json(
      { error: "Invalid signature" },
      { status: 400 }
    );
  }

  switch (event.type) {
    case "checkout.session.completed":
      const session = event.data.object;

      const orderId = session.metadata?.orderId ?? session.client_reference_id;

      if (!orderId) {
        console.error("Order ID not found in Stripe session.");
        return NextResponse.json({ received: true });
      }
      
      if (orderId && session.payment_status === "paid") {
        try {
        await prisma.order.updateMany({
          where: {
            id: orderId,
            stripeSessionId: session.id,
            status: "PENDING_PAYMENT",
          },
          data: {
            status: "PAID",
            stripePaymentIntentId: typeof session.payment_intent === "string"
              ? session.payment_intent
              : null,
          },
          
        });
      }
      catch (error) {
        console.error("Error updating order status:", error);
        return NextResponse.json(
          { error: "Error updating order status" },
          { status: 500 }
        );
      }

    }
      break;
  }

  return NextResponse.json({ received: true });
}