import { useCallback, useState } from "react";

export const PAGE_SIZE = 10;

export default function usePagination() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const skip = (currentPage - 1) * PAGE_SIZE;

  const handlePageChange = useCallback((newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return { currentPage, setCurrentPage, skip, handlePageChange };
}
