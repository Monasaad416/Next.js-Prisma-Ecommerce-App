"use server"
import { cookies } from "next/headers";
import { Prisma  } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";
import { getCart } from "./cartActions";
import { createCheckoutSession } from "./stripe";
import { OrderStatus } from "../../generated/prisma/enums";
import { auth } from "../../auth";


export type CreateOrderResult =
  | { sessionUrl: string; error?: undefined }
  | { sessionUrl?: undefined; error: string };

export async function createOrder(): Promise<CreateOrderResult> {
  let orderId: string | null = null;
  try {
    const session = await auth();
    if (!session?.user?.email) {
      return { error: "Please sign in to checkout." };
    }

    const dbUser = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!dbUser) {
      return {
        error: "Your session is outdated after a data reset. Sign out and sign in again.",
      };
    }

    const cart = await getCart();
    if (!cart || cart.items.length === 0) {
      return { error: "Your cart is empty." };
    }

    // Drop cart lines that point at deleted products (e.g. after reseed)
    const validItems = cart.items.filter((item) => item.product?.id);
    if (validItems.length === 0) {
      return {
        error: "Cart products are no longer available. Clear the cart and add items again.",
      };
    }

    const subtotal = validItems.reduce(
      (sum, item) => sum + item.quantity * Number(item.product.price),
      0,
    );
    const shipping = 0;
    const total = subtotal + shipping;

    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          subtotal: new Prisma.Decimal(subtotal),
          shipping: new Prisma.Decimal(shipping),
          total: new Prisma.Decimal(total),
          items: {
            create: validItems.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
              productName: item.product.name,
              productSlug: item.product.slug,
              productImage: item.product.images[0] ?? null,
              unitPrice: new Prisma.Decimal(item.product.price),
              lineTotal: new Prisma.Decimal(
                item.quantity * Number(item.product.price),
              ),
            })),
          },
          userId: dbUser.id,
          status: OrderStatus.PENDING,
        },
        include: {
          items: true,
        },
      });

      await tx.cartItem.deleteMany({
        where: { cartId: cart.id },
      });

      await tx.cart.delete({
        where: { id: cart.id },
      });

      return newOrder;
    });

    const fullOrder = await prisma.order.findUnique({
      where: { id: order.id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!fullOrder) {
      return { error: "Failed to load order after creation." };
    }

    orderId = fullOrder.id;
    const checkoutSession = await createCheckoutSession(fullOrder);
    const sessionId = checkoutSession?.sessionId;
    const sessionUrl = checkoutSession?.sessionUrl;

    if (!sessionId || !sessionUrl) {
      return { error: "Failed to create checkout session." };
    }

    await prisma.order.update({
      where: { id: fullOrder.id },
      data: {
        stripeSessionId: sessionId,
        status: { set: OrderStatus.PENDING_PAYMENT },
      },
    });

    const cookieStore = await cookies();
    cookieStore.delete("cartId");

    return { sessionUrl };
  } catch (error) {
    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: { set: OrderStatus.CANCELLED } },
      });
    }
    console.error("Error creating order:", error);

    const raw = error instanceof Error ? error.message : "";
    if (raw.includes("Order_userId_fkey") || raw.includes("userId")) {
      return {
        error:
          "Your session is outdated. Sign out, sign in again, then retry checkout.",
      };
    }
    if (raw.includes("productId") || raw.includes("OrderItem_productId")) {
      return {
        error:
          "A product in your cart no longer exists. Clear the cart and add items again.",
      };
    }

    return { error: "Failed to create order. Please try again." };
  }
}
