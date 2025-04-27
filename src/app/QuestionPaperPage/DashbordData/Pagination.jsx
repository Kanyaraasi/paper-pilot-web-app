import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, paginate }) => {
  // Generate the array of page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    
    if (totalPages <= 5) {
      // If 5 or fewer pages, show all
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else if (currentPage <= 3) {
      // Near the start
      for (let i = 1; i <= 5; i++) {
        pages.push(i);
      }
    } else if (currentPage >= totalPages - 2) {
      // Near the end
      for (let i = totalPages - 4; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // In the middle
      for (let i = currentPage - 2; i <= currentPage + 2; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  const pageNumbers = getPageNumbers();
  
  return (
    <div className="mt-6 flex justify-center">
      <nav className="flex items-center">
        <button
          onClick={() => paginate(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className={`p-1.5 rounded-md transition-colors duration-200 ${
            currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Previous page"
        >
          <ChevronLeft size={18} />
        </button>
        
        <div className="flex mx-1">
          {/* First page if not in view */}
          {!pageNumbers.includes(1) && (
            <>
              <button
                onClick={() => paginate(1)}
                className="w-8 h-8 mx-0.5 flex items-center justify-center rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                1
              </button>
              <span className="mx-1 flex items-center text-gray-400">...</span>
            </>
          )}
          
          {/* Visible page numbers */}
          {pageNumbers.map(number => (
            <button
              key={number}
              onClick={() => paginate(number)}
              className={`w-8 h-8 mx-0.5 flex items-center justify-center rounded-md text-sm transition-colors duration-200 ${
                currentPage === number
                  ? 'bg-purple-100 text-purple-600 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {number}
            </button>
          ))}
          
          {/* Last page if not in view */}
          {!pageNumbers.includes(totalPages) && (
            <>
              <span className="mx-1 flex items-center text-gray-400">...</span>
              <button
                onClick={() => paginate(totalPages)}
                className="w-8 h-8 mx-0.5 flex items-center justify-center rounded-md text-sm text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                {totalPages}
              </button>
            </>
          )}
        </div>
        
        <button
          onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className={`p-1.5 rounded-md transition-colors duration-200 ${
            currentPage === totalPages ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'
          }`}
          aria-label="Next page"
        >
          <ChevronRight size={18} />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;