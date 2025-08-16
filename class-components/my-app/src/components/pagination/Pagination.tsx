import React from 'react';
import { useSearchParams } from 'react-router-dom';
import './Pagination.css';

const Pagination: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page') ?? '1') || 1;

  const handlePageChange = (newPage: number) => {
    const next = Math.max(1, newPage);
    setSearchParams(prev => {
      const params = new URLSearchParams(prev);
      params.set('page', String(next));
      return params;
    });
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
