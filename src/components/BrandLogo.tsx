import Image from "next/image";
import Link from "next/link";
import logo from "@/images/logo.png";

type BrandLogoProps = {
  className?: string;
  /** Show wordmark next to the mark */
  showName?: boolean;
  size?: "sm" | "md" | "lg";
};

const sizes = {
  sm: { box: "h-8 w-8", name: "text-lg" },
  md: { box: "h-9 w-9 sm:h-10 sm:w-10", name: "text-xl sm:text-2xl" },
  lg: { box: "h-11 w-11", name: "text-2xl" },
};

export default function BrandLogo({
  className = "",
  showName = true,
  size = "md",
  priority = false,
}: BrandLogoProps & { priority?: boolean }) {
  const s = sizes[size];

  return (
    <Link
      href="/"
      className={`inline-flex items-center gap-2.5 ${className}`}
      aria-label="Furnia home"
    >
      <span
        className={`relative shrink-0 overflow-hidden rounded-lg ${s.box}`}
      >
        <Image
          src={logo}
          alt="Furnia"
          fill
          className="object-contain"
          sizes="40px"
          priority={priority}
        />
      </span>
      {showName ? (
        <span
          className={`font-heading font-bold tracking-tight text-foreground ${s.name}`}
        >
          Furnia
        </span>
      ) : null}
    </Link>
  );
}
