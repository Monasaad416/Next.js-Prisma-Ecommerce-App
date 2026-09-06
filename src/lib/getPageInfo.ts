import { ISearchParams } from "../../interfaces/SearchParamsProps";

export function getPageNumber(searchParams: ISearchParams | undefined) {
  const pageParam = searchParams?.page;
  const page = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1;
  return Math.max(1, page);
}

export function getVisiblePages(currentPage: number, totalPages: number) {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, totalPages, currentPage]);

  if (currentPage > 1) {
    pages.add(currentPage - 1);
  }

  if (currentPage < totalPages) {
    pages.add(currentPage + 1);
  }

  const sortedPages = Array.from(pages).sort((a, b) => a - b);
  const visiblePages: Array<number | "ellipsis"> = [];

  sortedPages.forEach((pageNumber, index) => {
    if (index > 0 && pageNumber - sortedPages[index - 1] > 1) {
      visiblePages.push("ellipsis");
    }
    visiblePages.push(pageNumber);
  });

  return visiblePages;
}
