import { ReactNode } from "react";

export interface IPaginationProps {
  currentPage: number;
  totalPages: number;
  visiblePages: Array<number | "ellipsis">;
  children: ReactNode;
  /** When true, only updates the URL — no router.refresh() (ISR + client pagination) */
  clientOnly?: boolean;
}
