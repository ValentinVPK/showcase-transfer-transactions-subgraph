import { useCallback, useState } from "react";

const DEFAULT_PAGE_SIZE = 5;
export const ESTIMATED_TOTAL_TRANSFERS = 5000; // The maximum number for the "skip" parameter in the subgraph

export default function usePagination() {
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const skip = (currentPage - 1) * pageSize;

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return {
    currentPage,
    setCurrentPage,
    skip,
    handlePageChange,
    pageSize,
    setPageSize,
  };
}
