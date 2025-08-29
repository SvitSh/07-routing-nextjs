"use client";

import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

export interface PaginationProps {
  currentPage: number;
  pageCount: number;
  onPageChange: (newPage: number) => void;
}

/**
 * Simple wrapper around the `react-paginate` component.  The library
 * handles all of the underlying pagination calculations.  We only need
 * to translate the zero‑based index returned by the library into a
 * one‑based page number expected by our API.
 */
export default function Pagination({
  currentPage,
  pageCount,
  onPageChange,
}: PaginationProps) {
  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      previousLabel="<"
      onPageChange={(event) => onPageChange(event.selected + 1)}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage - 1}
      containerClassName={css.pagination}
      activeClassName={css.active}
    />
  );
}