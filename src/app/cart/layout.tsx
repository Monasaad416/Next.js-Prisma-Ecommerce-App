import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cart",
  description: "Your shopping cart.",
  robots: noIndexRobots,
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
