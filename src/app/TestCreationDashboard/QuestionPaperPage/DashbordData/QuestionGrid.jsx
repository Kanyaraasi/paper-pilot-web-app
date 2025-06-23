import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import QuestionCard from './QuestionCard';
import { Plus } from 'lucide-react';

const QuestionGrid = ({ onEditQuestion, onDeleteQuestion, onAddNew }) => {
  const { currentQuestions, viewMode, filteredQuestions } = useQuestionBank();

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 mb-4">
          <Plus className="w-16 h-16 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
        <p className="text-gray-500 mb-4">Get started by adding your first question</p>
        <button
          onClick={onAddNew}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
        >
          Add Question
        </button>
      </div>
    );
  }

  return (
    <div className={viewMode === 'grid' 
      ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
      : 'space-y-4'
    }>
      {currentQuestions.map(question => (
        <QuestionCard
          key={question.id}
          question={question}
          onEdit={onEditQuestion}
          onDelete={onDeleteQuestion}
        />
      ))}
    </div>
  );
};

export default QuestionGrid;