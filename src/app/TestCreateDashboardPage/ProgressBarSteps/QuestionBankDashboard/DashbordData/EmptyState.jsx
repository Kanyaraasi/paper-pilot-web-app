import React from 'react';
import { Search, PlusCircle } from 'lucide-react';

const EmptyState = ({ hasSearchQuery, resetFilters, initNewQuestion }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 text-center">
      <div className="text-gray-400 mb-4">
        <div className="bg-gray-50 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
          <Search size={32} className="text-gray-400" />
        </div>
      </div>
      <h3 className="text-xl font-medium text-gray-800 mb-2">No questions found</h3>
      <p className="text-gray-500 mb-6">
        {hasSearchQuery
          ? "Try adjusting your filters or search query to find questions"
          : "Start by adding your first question to the bank"}
      </p>
      {hasSearchQuery ? (
        <button
          onClick={resetFilters}
          className="text-purple-600 hover:text-purple-800 font-medium transition-colors underline underline-offset-2"
        >
          Clear all filters
        </button>
      ) : (
        <button
          onClick={initNewQuestion}
          className="bg-purple-600 text-white flex items-center gap-2 px-6 py-3 rounded-md hover:bg-purple-700 transition-all font-medium mx-auto"
        >
          <PlusCircle size={20} />
          Add Your First Question
        </button>
      )}
    </div>
  );
};

export default EmptyState;