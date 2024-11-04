// app/components/PaginationControls.tsx

import React from 'react';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <div className="flex justify-center space-x-4 mt-8">
      <button
        onClick={handlePrevious}
        className="pagination-button flex items-center justify-center w-32 px-6 py-2 bg-teal-400 text-white font-semibold rounded-full hover:bg-teal-500 transition"
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <button
        onClick={handleNext}
        className="pagination-button flex items-center justify-center w-32 px-6 py-2 bg-teal-400 text-white font-semibold rounded-full hover:bg-teal-500 transition"
        disabled={currentPage === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default PaginationControls;