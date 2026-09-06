import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Orders",
  robots: noIndexRobots,
};

export default function OrdersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
