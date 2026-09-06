import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Checkout",
  robots: noIndexRobots,
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
