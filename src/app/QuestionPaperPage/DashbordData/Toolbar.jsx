import React from 'react';
import { Search, Filter, Grid, List, Eye, EyeOff, ChevronDown, ArrowDown, ArrowUp } from 'lucide-react';

const Toolbar = ({
  searchQuery,
  setSearchQuery,
  showFilters,
  setShowFilters,
  selectedDifficulty,
  selectedTags,
  dateRange,
  showOnlyStarred,
  viewMode,
  setViewMode,
  showAnswers,
  setShowAnswers,
  sortBy,
  setSortBy,
  questionsPerPage,
  setQuestionsPerPage,
  setSelectedDifficulty,
  toggleTagSelection,
  setDateRange,
  setShowOnlyStarred,
  resetFilters,
  allTags,
  showSortDropdown,
  setShowSortDropdown
}) => {
  // Count active filters
  const activeFilterCount = 
    (selectedDifficulty !== 'All' ? 1 : 0) + 
    (selectedTags.length > 0 ? 1 : 0) + 
    (dateRange !== 'all' ? 1 : 0) + 
    (showOnlyStarred ? 1 : 0);

  return (
    <div className="bg-white border-b border-gray-200 p-3 sticky top-[45px] z-10 shadow-sm" >
      <div className="flex flex-wrap gap-2">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1 px-3 py-1.5 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
          >
            <Filter size={16} />
            Filter
            {activeFilterCount > 0 && (
              <span className="ml-1 bg-purple-100 text-purple-800 text-xs px-1.5 rounded-full">
                {activeFilterCount}
              </span>
            )}
          </button>
          
          {/* Filter dropdown */}
          {showFilters && (
            <div className="absolute top-full right-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <div className="p-3">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-gray-800">Filters</h3>
                  <button 
                    onClick={resetFilters}
                    className="text-xs text-purple-600 hover:text-purple-700 transition-colors duration-200"
                  >
                    Reset all
                  </button>
                </div>
                
                <div className="mb-3">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select 
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="w-full text-sm border border-gray-300 rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="All">All</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
               
                
               
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="show-starred"
                    checked={showOnlyStarred}
                    onChange={() => setShowOnlyStarred(!showOnlyStarred)}
                    className="h-3 w-3 text-purple-600 rounded border-gray-300"
                  />
                  <label htmlFor="show-starred" className="ml-2 text-sm text-gray-700">
                    Show only starred
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
          <button 
            onClick={() => setViewMode('grid')}
            className={`p-1.5 transition-colors duration-200 ${viewMode === 'grid' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
            aria-label="Grid view"
          >
            <Grid size={16} />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={`p-1.5 transition-colors duration-200 ${viewMode === 'list' ? 'bg-gray-100 text-gray-800' : 'text-gray-500 hover:bg-gray-50'}`}
            aria-label="List view"
          >
            <List size={16} />
          </button>
        </div>
        
        <button 
          onClick={() => setShowAnswers(!showAnswers)}
          className={`flex items-center gap-1 px-3 py-1.5 text-sm border rounded-md transition-colors duration-200 ${
            showAnswers ? 'bg-purple-50 text-purple-600 border-purple-300' : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {showAnswers ? <EyeOff size={16} /> : <Eye size={16} />}
          {showAnswers ? 'Hide Answers' : 'Show Answers'}
        </button>
        
       
        
        <div className="relative ml-auto">
          <select
            value={questionsPerPage}
            onChange={(e) => {
              setQuestionsPerPage(Number(e.target.value));
            }}
            className="pl-3 pr-8 py-1.5 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 appearance-none transition-colors duration-200"
          >
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
          <ChevronDown size={14} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" />
        </div>
      </div>
    </div>
  );
};

export default Toolbar;