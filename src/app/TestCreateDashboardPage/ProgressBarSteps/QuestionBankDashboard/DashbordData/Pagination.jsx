import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const Pagination = () => {
  const { currentPage, totalPage, paginate } = useQuestionBank();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      buttonBase: isDark 
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonActive: isDark 
        ? 'bg-blue-600 text-white border-blue-600' 
        : 'bg-blue-600 text-white border-blue-600',
      buttonDisabled: isDark 
        ? 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent' 
        : 'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-600',
    };
  };

  const themeClasses = getThemeClasses();

  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 5;
    
    if (totalPage <= maxVisiblePages) {
      for (let i = 1; i <= totalPage; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPage);
      } else if (currentPage >= totalPage - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPage - 3; i <= totalPage; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPage);
      }
    }
    
    return pages;
  };

  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-center space-x-2 mt-6 ">
      <button
        onClick={() => paginate(currentPage - 1)}
        disabled={currentPage === 1}
        className={`p-2 rounded-lg border transition-colors ${themeClasses.buttonBase} ${themeClasses.buttonDisabled}`}
      >
        <ChevronLeft className={`w-4 h-4 ${themeClasses.iconColor}`} />
      </button>

      {getPageNumbers().map((page, index) => (
        <React.Fragment key={index}>
          {page === '...' ? (
            <span className={`px-3 py-2 ${themeClasses.textMuted} `}>...</span>
          ) : (
            <button
              onClick={() => paginate(page)}
              className={`px-3 py-2 rounded-lg border transition-colors  ${
                currentPage === page
                  ? themeClasses.buttonActive
                  : themeClasses.buttonBase
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      <button
        onClick={() => paginate(currentPage + 1)}
        disabled={currentPage === totalPage}
        className={`p-2 rounded-lg border transition-colors ${themeClasses.buttonBase} ${themeClasses.buttonDisabled}`}
      >
        <ChevronRight className={`w-4 h-4 ${themeClasses.iconColor}`} />
      </button>
    </div>
  );
};

export default Pagination;