import type { Metadata } from "next";
import { noIndexRobots } from "@/lib/site";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in or create an account.",
  robots: noIndexRobots,
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
