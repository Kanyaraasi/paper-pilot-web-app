import React from 'react';
import QuestionCard from './QuestionCard';
import EmptyState from './EmptyState';
import { Grid, List } from 'lucide-react';

const QuestionGrid = ({
  questions,
  filteredQuestions,
  selectedQuestions,
  activeTab,
  searchQuery,
  viewMode,
  showAnswers,
  toggleQuestionSelection,
  handleEditQuestion,
  setViewMode,
  toggleStarred,
  selectAllVisible,
  resetFilters,
  indexOfFirstQuestion,
  indexOfLastQuestion,
  totalFilteredCount,
  initNewQuestion,
}) => {
  // Check if there are any questions to display
  const noQuestions = filteredQuestions.length === 0;
  const hasSearchQuery = searchQuery.trim() !== '' || totalFilteredCount !== questions.length;
  
  // Current page questions
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  
  // Handle select all checkbox
  const allCurrentSelected = currentQuestions.length > 0 && 
    currentQuestions.every(q => selectedQuestions.includes(q.id));
  
  // Toggle view mode
  const toggleViewMode = () => {
    // This would be handled by the parent component
  };

  return (
    <div className="mt-4">
      {/* Top bar with count and controls */}
      {!noQuestions && (
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
          <div className="text-sm text-gray-600">
            Showing {indexOfFirstQuestion + 1}-{Math.min(indexOfLastQuestion, totalFilteredCount)} of {totalFilteredCount} questions
          </div>
          
          <div className="flex items-center gap-3">
            {/* Select all checkbox */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="select-all"
                checked={allCurrentSelected}
                onChange={() => selectAllVisible(currentQuestions.map(q => q.id), !allCurrentSelected)}
                className="h-4 w-4 text-purple-600 rounded border-gray-300 cursor-pointer"
              />
              <label htmlFor="select-all" className="ml-2 text-sm text-gray-600 cursor-pointer select-none">
                Select all
              </label>
            </div>
            
            {/* View mode toggle */}
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
          </div>
        </div>
      )}
      
      {/* Question grid/list */}
      {noQuestions ? (
        <EmptyState 
          hasSearchQuery={hasSearchQuery} 
          resetFilters={resetFilters}
          initNewQuestion={initNewQuestion}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {currentQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestions.includes(question.id)}
              onSelect={toggleQuestionSelection}
              showAnswers={showAnswers}
              onEdit={handleEditQuestion}
              onToggleStar={toggleStarred}
              viewMode={viewMode}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {currentQuestions.map(question => (
            <QuestionCard
              key={question.id}
              question={question}
              isSelected={selectedQuestions.includes(question.id)}
              onSelect={toggleQuestionSelection}
              showAnswers={showAnswers}
              onEdit={handleEditQuestion}
              onToggleStar={toggleStarred}
              viewMode={viewMode}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionGrid;