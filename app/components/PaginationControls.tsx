// app/components/PaginationControls.tsx
import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

const PaginationControls: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination-controls flex justify-center gap-4 mt-4">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="px-4 py-2 rounded-full bg-teal-400 text-white disabled:opacity-50"
      >
        Previous
      </button>
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="px-4 py-2 rounded-full bg-teal-400 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;