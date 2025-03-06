import { useCallback } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./pagination";

interface TransfersPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function TransfersPagination({
  currentPage,
  totalPages,
  onPageChange,
}: TransfersPaginationProps) {
  const getPageNumbers = useCallback(() => {
    const pageNumbers = [];

    pageNumbers.push(1);

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    if (startPage > 2) {
      pageNumbers.push("ellipsis-start");
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    if (endPage < totalPages - 1) {
      pageNumbers.push("ellipsis-end");
    }

    if (totalPages > 1) {
      pageNumbers.push(totalPages);
    }

    return pageNumbers;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
            className={
              currentPage <= 1
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>

        {getPageNumbers().map((page, index) => {
          if (page === "ellipsis-start" || page === "ellipsis-end") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            );
          }

          return (
            <PaginationItem key={`page-${page}`}>
              <PaginationLink
                onClick={() => onPageChange(Number(page))}
                isActive={currentPage === page}
                className="cursor-pointer"
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem>
          <PaginationNext
            onClick={() =>
              currentPage < totalPages && onPageChange(currentPage + 1)
            }
            className={
              currentPage >= totalPages
                ? "pointer-events-none opacity-50"
                : "cursor-pointer"
            }
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
