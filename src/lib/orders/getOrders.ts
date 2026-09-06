import { auth } from "../../../auth";
import { prisma } from "../../../lib/prisma";


export async function getCurrentUser() {
  const session = await auth();
  if (!session?.user?.email) {
    return null;
  }

  return prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true, email: true, role: true },
  });
}

export async function getOrdersForCurrentUser() {
  const user = await getCurrentUser();
  if (!user) {
    return { user: null, orders: [] as Awaited<ReturnType<typeof fetchOrders>> };
  }

  const orders = await fetchOrders(user.id);
  return { user, orders };
}

async function fetchOrders(userId: string) {
  return prisma.order.findMany({
    where: { userId },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getOrderByIdForCurrentUser(orderId: string) {
  const user = await getCurrentUser();
  if (!user) {
    return { user: null, order: null };
  }

  if(user.role === "ADMIN") {
     throw new Error("You are not authorized to access this order");
  }

  const order = await prisma.order.findFirst({
    where: {
      id: orderId,
      userId: user.id,
    },
    include: {
      items: {
        orderBy: { createdAt: "asc" },
      },
    },
  });

  return { user, order };
}

export function statusLabel(status: string) {
  return status.replaceAll("_", " ");
}
