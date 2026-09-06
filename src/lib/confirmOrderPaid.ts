import { prisma } from "../../lib/prisma";
import { stripe } from "@/lib/stripe";
import { OrderStatus } from "../../generated/prisma/enums";

/**
 * Confirm Stripe checkout and mark the order PAID when still PENDING_PAYMENT.
 * Safe to call from success page or webhook-style handlers.
 */
export async function confirmOrderPaid(options: {
  orderId: string;
  sessionId?: string | null;
}) {
  const { orderId, sessionId } = options;

  const order = await prisma.order.findUnique({
    where: { id: orderId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!order) {
    return { order: null, paid: false as const };
  }

  if (order.status === OrderStatus.PAID) {
    return { order, paid: true as const };
  }

  if (!sessionId) {
    return { order, paid: false as const };
  }

  const session = await stripe.checkout.sessions.retrieve(sessionId);

  const sessionOrderId =
    session.metadata?.orderId ?? session.client_reference_id ?? null;

  const matchesOrder =
    sessionOrderId === orderId || order.stripeSessionId === session.id;

  if (!matchesOrder || session.payment_status !== "paid") {
    return { order, paid: false as const };
  }

  if (order.status === OrderStatus.PENDING_PAYMENT) {
    const updated = await prisma.order.update({
      where: { id: order.id },
      data: {
        status: OrderStatus.PAID,
        stripeSessionId: session.id,
        stripePaymentIntentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : null,
      },
      include: {
        items: {
          include: { product: true },
        },
      },
    });
    return { order: updated, paid: true as const };
  }

  return { order, paid: false as const };
}
