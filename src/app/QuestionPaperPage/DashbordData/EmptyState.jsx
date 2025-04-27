import React from 'react';
import { Search, PlusCircle } from 'lucide-react';

const EmptyState = ({ hasSearchQuery, resetFilters, initNewQuestion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center animate-fadeIn">
      <div className="text-gray-400 mb-3">
        <Search size={48} className="mx-auto" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-1">No questions found</h3>
      <p className="text-gray-500 mb-4">
        {hasSearchQuery
          ? "Try adjusting your filters or search query"
          : "Start by adding your first question"}
      </p>
      {hasSearchQuery && (
        <button
          onClick={resetFilters}
          className="text-sm text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
        >
          Clear all filters
        </button>
      )}
      {!hasSearchQuery && (
        <button
          onClick={initNewQuestion}
          className="bg-purple-600 text-white flex items-center gap-1 px-4 py-2 rounded-md text-sm hover:bg-purple-700 transition-all font-medium mx-auto"
        >
          <PlusCircle size={16} />
          Add New Question
        </button>
      )}
    </div>
  );
};

export default EmptyState;