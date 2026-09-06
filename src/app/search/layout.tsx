import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search furniture across chairs, tables, and sofas.",
};

export default function SearchLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="flex-1">{children}</div>;
}
