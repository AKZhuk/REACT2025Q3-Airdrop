'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import './Pagination.css';

const Pagination: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', String(newPage));
    router.push(`/?${params.toString()}`);
  };

  return (
    <div className="pagination">
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </button>
      <span className="pagination__info">Page {currentPage}</span>
      <button
        className="pagination__button"
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
