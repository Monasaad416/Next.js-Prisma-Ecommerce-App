"use client";

import { sortingOptions } from "@/lib/getSortingInfo";
import { ArrowUpDown } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

const Sorting = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentSort = searchParams.get("sort") ?? "";

  const handleChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("sort", value);
    } else {
      params.delete("sort");
    }

    // Reset pagination when filters change
    params.delete("page");

    const query = params.toString();
    router.push(query ? `?${query}` : "?");
  };

  return (
    <div className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-card/90 px-3 py-2 shadow-sm">
      <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
      <select
        value={currentSort}
        onChange={(e) => handleChange(e.target.value)}
        className="bg-transparent text-sm font-medium text-foreground outline-none"
      >
        {sortingOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Sorting;
