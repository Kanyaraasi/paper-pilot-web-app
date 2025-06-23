import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { Star, Edit, Trash2, CheckSquare } from 'lucide-react';

const QuestionCard = ({ question, onEdit, onDelete }) => {
  const { 
    activeTab, 
    selectedQuestions, 
    toggleQuestionSelection, 
    toggleStarred,
    showAnswers 
  } = useQuestionBank();

  const isSelected = selectedQuestions[activeTab].includes(question.id);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderQuestionContent = () => {
    switch (activeTab) {
      case 'match':
        return (
          <div className="space-y-2">
            <p className="text-sm font-medium text-gray-900">Match the following:</p>
            {question.items?.slice(0, 2).map((item, index) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600">
                <span>{item.left}</span>
                <span>→</span>
                <span>{item.right}</span>
              </div>
            ))}
            {question.items?.length > 2 && (
              <p className="text-xs text-gray-500">+{question.items.length - 2} more items</p>
            )}
          </div>
        );
      case 'mcq':
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-900">{question.text}</p>
            {showAnswers && (
              <p className="text-sm text-green-600 font-medium">Answer: {question.answer}</p>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <p className="text-sm text-gray-900">{question.text}</p>
            {showAnswers && (
              <p className="text-sm text-green-600">{question.answer}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`bg-white border rounded-lg p-4 hover:shadow-md transition-shadow ${
      isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
    }`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => toggleQuestionSelection(question.id)}
            className={`p-1 rounded transition-colors ${
              isSelected ? 'text-blue-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <CheckSquare className={`w-4 h-4 ${isSelected ? 'fill-current' : ''}`} />
          </button>
          
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => toggleStarred(question.id)}
            className={`p-1 rounded transition-colors ${
              question.starred ? 'text-yellow-500' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <Star className={`w-4 h-4 ${question.starred ? 'fill-current' : ''}`} />
          </button>
          
          <button
            onClick={() => onEdit(question)}
            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
          >
            <Edit className="w-4 h-4" />
          </button>
          
          <button
            onClick={() => onDelete(question.id)}
            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {renderQuestionContent()}

      {question.tags && question.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {question.tags.map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuestionCard;