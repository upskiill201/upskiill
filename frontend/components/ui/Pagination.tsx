'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './Pagination.module.css';

export type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  showPageCount?: boolean;
};

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  showPageCount = false,
}) => {
  // Prevent invalid values
  const safeCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  // Logic to show max 7 items (including dots)
  const getPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (safeCurrentPage <= 4) {
        // 1 2 3 4 5 ... max
        for (let i = 1; i <= 5; i++) pages.push(i);
        pages.push('...');
        pages.push(totalPages);
      } else if (safeCurrentPage >= totalPages - 3) {
        // 1 ... max-4 max-3 max-2 max-1 max
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) pages.push(i);
      } else {
        // 1 ... current-1 current current+1 ... max
        pages.push(1);
        pages.push('...');
        pages.push(safeCurrentPage - 1);
        pages.push(safeCurrentPage);
        pages.push(safeCurrentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <button
          className={`${styles.pageBtn} ${styles.navBtn}`}
          onClick={() => onPageChange(safeCurrentPage - 1)}
          disabled={safeCurrentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={16} />
        </button>

        {getPageNumbers().map((page, index) => {
          if (page === '...') {
            return (
              <span key={`ellipsis-${index}`} className={styles.ellipsis}>
                &hellip;
              </span>
            );
          }
          return (
            <button
              key={`page-${page}`}
              className={`${styles.pageBtn} ${page === safeCurrentPage ? styles.active : ''}`}
              onClick={() => onPageChange(page as number)}
              aria-current={page === safeCurrentPage ? 'page' : undefined}
            >
              {page}
            </button>
          );
        })}

        <button
          className={`${styles.pageBtn} ${styles.navBtn}`}
          onClick={() => onPageChange(safeCurrentPage + 1)}
          disabled={safeCurrentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={16} />
        </button>
      </div>
      
      {showPageCount && (
        <div className={styles.pageCount}>
          Page <span className={styles.bold}>{safeCurrentPage}</span> of <span className={styles.bold}>{totalPages}</span>
        </div>
      )}
    </div>
  );
};
