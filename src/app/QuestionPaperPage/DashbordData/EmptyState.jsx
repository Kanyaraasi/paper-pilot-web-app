import React from 'react';
import { Search, PlusCircle } from 'lucide-react';

const EmptyState = ({ hasSearchQuery, resetFilters, initNewQuestion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 md:p-8 text-center animate-fadeIn mx-auto max-w-lg">
      <div className="text-gray-400 mb-3">
        <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
          <Search size={28} className="text-gray-400" />
        </div>
      </div>
      <h3 className="text-lg md:text-xl font-medium text-gray-800 mb-1">No questions found</h3>
      <p className="text-sm md:text-base text-gray-500 mb-4">
        {hasSearchQuery
          ? "Try adjusting your filters or search query"
          : "Start by adding your first question to the bank"}
      </p>
      {hasSearchQuery ? (
        <button
          onClick={resetFilters}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200 underline underline-offset-2"
        >
          Clear all filters
        </button>
      ) : (
        <button
          onClick={initNewQuestion}
          className="bg-purple-600 text-white flex items-center gap-1 px-3 py-2 md:px-4 md:py-2 rounded-md text-sm hover:bg-purple-700 transition-all font-medium mx-auto"
        >
          <PlusCircle size={16} />
          <span className="inline-block">Add New Question</span>
        </button>
      )}
    </div>
  );
};

export default EmptyState;