/** Single public site origin for metadata, sitemap, robots, Stripe. */
export function getSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_APP_URL ?? "https://www.furnia.app";
  return raw.replace(/\/+$/, "").replace(/\/(en|ar)(?=\/|$)/gi, "");
}

export const noIndexRobots = {
  index: false,
  follow: false,
  googleBot: {
    index: false,
    follow: false,
  },
} as const;
