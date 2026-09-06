"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function AuthButtons({
  className = "",
}: {
  className?: string;
}) {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div
        className={`h-9 w-16 animate-pulse rounded-lg bg-muted ${className}`}
        aria-hidden
      />
    );
  }

  if (!session?.user) {
    return (
      <Button asChild variant="outline" size="sm" className={className}>
        <Link href="/auth">Login</Link>
      </Button>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Button asChild variant="ghost" size="sm" className="hidden sm:inline-flex">
        <Link href="/orders">Orders</Link>
      </Button>
      <span className="max-w-28 truncate text-sm font-medium text-muted-foreground">
        {session.user.name}
      </span>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => {
          toast.success("Logged out successfully");
          setTimeout(() => {
            signOut({ callbackUrl: "/" });
          }, 400);
        }}
      >
        Logout
      </Button>
    </div>
  );
}
