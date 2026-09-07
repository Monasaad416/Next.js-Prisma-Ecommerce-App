"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import Link from "next/link";
import AuthButtons from "./AuthButtons";
import BrandLogo from "./BrandLogo";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/cart", label: "Cart" },
  { href: "/orders", label: "Orders" },
];

const MobileNav = () => {
  return (
    <div className="flex md:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <button
            className="rounded-lg p-2 text-foreground transition-colors hover:bg-accent"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </SheetTrigger>

        <SheetContent side="left" className="w-[280px]">
          <SheetHeader>
            <SheetTitle className="text-left">
              <BrandLogo size="sm" />
            </SheetTitle>
          </SheetHeader>

          <nav className="mt-8 flex flex-col gap-1 px-2">
              {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="mt-6 border-t border-border px-2 pt-4">
            <AuthButtons />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNav;
