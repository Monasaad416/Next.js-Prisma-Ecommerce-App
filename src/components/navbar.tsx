import Link from "next/link";
import SearchIcon from "./searchIcon";
import CartIcon from "./cartIcon";
import { ThemeToggle } from "./theme-toggle";
import MobileNav from "./mobile-nav";
import AuthButtons from "./AuthButtons";

const links = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="page-shell flex h-16 items-center justify-between gap-4 sm:h-18">
        <div className="flex items-center gap-3">
          <MobileNav />
          <Link
            href="/"
            className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
          >
            E-Comm
          </Link>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <SearchIcon />
          <CartIcon />
          <AuthButtons className="hidden sm:flex" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Navbar;
