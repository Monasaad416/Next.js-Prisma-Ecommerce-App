import { notFound, redirect } from 'next/navigation';
import type { NextRequest } from 'next/server'
import { prisma } from '../../../../lib/prisma';
import { stripe } from '../../../lib/stripe';
 
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const sessionId = searchParams.get('session_id');

  if(!sessionId) {
    return notFound();
  }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);
        const orderId = session.metadata?.orderId;

        if (!orderId) {
            return notFound();
        }

        const order = await prisma.order.findFirst({
            where: {
                id: orderId,
                stripeSessionId: session.id,
            },
        });

        if (!order) {
            return notFound();
        }

        if (order.status === 'PENDING_PAYMENT') {
            await prisma.order.update({
                where: { id: order.id },
                data: {
                    status: 'CANCELLED',
                },
            });
        }

    } catch (error) {
      console.error("Error handling checkout cancel:", error);
      return notFound();
    }

        return redirect("/");
}