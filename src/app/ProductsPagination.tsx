'use client';

import { useEffect, useState, useTransition } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import ProductCardSkeleton from './ProductCardSkeleton';
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';


type ProductsPaginationProps = {
  currentPage: number;
  totalPages: number;
  visiblePages: Array<number | 'ellipsis'>;
  children: ReactNode;
};

export default function ProductsPagination({
  currentPage,
  totalPages,
  visiblePages,
  children,
}: ProductsPaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [pendingPage, setPendingPage] = useState<number | null>(null);

  const currentPageFromUrl = Number(searchParams.get('page') ?? '1');

  useEffect(() => {
    if (pendingPage && currentPageFromUrl === pendingPage) {
      const timer = window.setTimeout(() => {
        setPendingPage(null);
      }, 300);

      return () => window.clearTimeout(timer);
    }
  }, [pendingPage, currentPageFromUrl]);

  const goToPage = (page: number) => {
    if (page === currentPage) {
      return;
    }

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(page));

    setPendingPage(page);

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
      router.refresh();
    });
  };

  return (
    <div className="mt-8">
      {(isPending || pendingPage !== null) ? (
        <div className="mb-6 space-y-4">
          <p className="text-sm text-muted-foreground">Loading products...</p>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        </div>
      ) : (
        children
      )}

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={currentPage > 1 ? `?page=${currentPage - 1}` : '#'}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage > 1) {
                  goToPage(currentPage - 1);
                }
              }}
              aria-disabled={currentPage <= 1}
              className={currentPage <= 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {visiblePages.map((pageNumber, index) =>
            pageNumber === 'ellipsis' ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={pageNumber}>
                <PaginationLink
                  href={`?page=${pageNumber}`}
                  isActive={pageNumber === currentPage}
                  onClick={(event) => {
                    event.preventDefault();
                    goToPage(pageNumber);
                  }}
                >
                  {pageNumber}
                </PaginationLink>
              </PaginationItem>
            )
          )}

          <PaginationItem>
            <PaginationNext
              href={currentPage < totalPages ? `?page=${currentPage + 1}` : '#'}
              onClick={(event) => {
                event.preventDefault();
                if (currentPage < totalPages) {
                  goToPage(currentPage + 1);
                }
              }}
              aria-disabled={currentPage >= totalPages}
              className={currentPage >= totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
