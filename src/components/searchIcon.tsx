"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "./ui/input";
import { resolveSearchPath } from "@/lib/productActions";

export default function SearchIcon() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    const path = await resolveSearchPath(query);
    router.push(path);
  };

  return (
    <form onSubmit={handleSearch} className="relative flex items-center">
      <Input
        type="search"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="h-9 w-36 border-border/80 bg-card/80 pr-9 text-sm shadow-none sm:w-48 md:w-56"
      />

      <button
        type="submit"
        className="absolute right-2.5 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Search"
      >
        <Search className="h-4 w-4" />
      </button>
    </form>
  );
}
