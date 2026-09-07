import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t border-border/70 bg-card/60">
      <div className="page-shell grid gap-8 py-12 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <BrandLogo size="lg" />
          <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Curated products, clear pricing, and a checkout flow built for speed.
          </p>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-foreground">Shop</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-foreground">
              Products
            </Link>
            <Link href="/categories" className="hover:text-foreground">
              Categories
            </Link>
            <Link href="/cart" className="hover:text-foreground">
              Cart
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold tracking-wide text-foreground">Company</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground">
              About
            </Link>
            <Link href="/contact" className="hover:text-foreground">
              Contact
            </Link>
            <Link href="/orders" className="hover:text-foreground">
              Orders
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-border/60">
        <div className="page-shell flex flex-col gap-2 py-4 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>© {year} Furnia. All rights reserved.</span>
          <span>Secure checkout · Fast delivery</span>
        </div>
      </div>
    </footer>
  );
}
