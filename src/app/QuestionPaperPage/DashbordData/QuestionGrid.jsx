import React from 'react';
import QuestionCard from './QuestionCard';
import EmptyState from './EmptyState';
import { Search } from 'lucide-react';

const QuestionGrid = ({
  questions,
  filteredQuestions,
  selectedQuestions,
  activeTab,
  searchQuery,
  viewMode,
  showAnswers,
  toggleQuestionSelection,
  handleDeleteQuestion,
  handleEditQuestion,
  toggleStarred,
  selectAllVisible,
  resetFilters,
  indexOfFirstQuestion,
  indexOfLastQuestion,
  totalFilteredCount,
  initNewQuestion
}) => {
  // If no questions match filters
  if (filteredQuestions.length === 0) {
    return (
      <EmptyState 
        hasSearchQuery={!!searchQuery}
        resetFilters={resetFilters}
        initNewQuestion={initNewQuestion}
      />
    );
  }

  return (
    <>
      {/* Bulk selection controls */}
      <div className="mb-3 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <button 
            onClick={selectAllVisible}
            className="text-sm text-gray-600 hover:text-gray-800 transition-colors duration-200"
          >
            {selectedQuestions.length === questions.length ? 'Deselect all' : 'Select all visible'}
          </button>
        </div>
        
        <div className="text-sm text-gray-500">
          Showing {Math.min(indexOfFirstQuestion + 1, totalFilteredCount)}-{Math.min(indexOfLastQuestion, totalFilteredCount)} of {totalFilteredCount} questions
        </div>
      </div>
      
      {/* Questions grid */}
      <div className={`
        ${viewMode === 'grid' 
          ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4' 
          : 'space-y-2'
        }
      `}>
        {questions.map(question => (
          <QuestionCard
            key={question.id}
            question={question}
            isSelected={selectedQuestions.includes(question.id)}
            onSelect={toggleQuestionSelection}
            showAnswers={showAnswers}
            onDelete={handleDeleteQuestion}
            onEdit={handleEditQuestion}
            onToggleStar={() => toggleStarred(question.id)}
            viewMode={viewMode}
          />
        ))}
      </div>
    </>
  );
};

export default QuestionGrid;