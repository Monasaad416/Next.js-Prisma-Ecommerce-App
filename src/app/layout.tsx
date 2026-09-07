import type { Metadata } from "next";
import { DM_Sans, Geist_Mono, Syne } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import { Toaster } from "sonner";
import Providers from "./providers";
import { getSiteUrl } from "@/lib/site";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  display: "swap",
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Furnia — Home Furniture",
    template: "%s | Furnia",
  },
  description:
    "Shop chairs, tables, and sofas with clear pricing and secure checkout.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Furnia — Home Furniture",
    description:
      "Shop chairs, tables, and sofas with clear pricing and secure checkout.",
    type: "website",
    url: siteUrl,
    siteName: "Furnia",
  },
  twitter: {
    card: "summary_large_image",
    title: "Furnia — Home Furniture",
    description:
      "Shop chairs, tables, and sofas with clear pricing and secure checkout.",
  },
  icons: {
    icon: [
      { url: "/icon", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    shortcut: "/favicon.png",
    apple: [{ url: "/apple-icon", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${syne.variable} ${geistMono.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Providers>
          <Navbar />
          <main className="flex-1 pb-16 pt-6 sm:pt-8">{children}</main>
          <Footer />
          <Toaster richColors position="top-right" />
        </Providers>
      </body>
    </html>
  );
}
