import Stripe from "stripe";
import { Prisma } from "../../generated/prisma/browser";
import { getSiteUrl } from "@/lib/site";

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("STRIPE_SECRET_KEY is not defined.");
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export type OrderWithItemsAndProducts = Prisma.OrderGetPayload<{
  include: {
    items: {
      include: {
        product: true;
      };
    };
  };
}>;

export async function createCheckoutSession(order: OrderWithItemsAndProducts) {
  if (!order || !order.items || order.items.length === 0) {
    throw new Error("Cannot create checkout session: Order is empty.");
  }

  const origin = getSiteUrl();
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
    order.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.product.name,
          description: item.product.description ?? "No description available",
          images: item.product.images ?? ["https://via.placeholder.com/150"],
        },
        unit_amount: Math.round(Number(item.product.price) * 100),
      },
      quantity: item.quantity,
    }));

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      client_reference_id: order.id,
      success_url: `${origin}/checkout/success/${order.id}?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: order.id,
        userId: order.userId || "guest",
      },
    });
    return { sessionId: session.id, sessionUrl: session.url };
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw new Error("Failed to create checkout session.");
  }
}
