import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/auth",
          "/admin",
          "/cart",
          "/checkout",
          "/orders",
          "/order",
          "/api",
        ],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
