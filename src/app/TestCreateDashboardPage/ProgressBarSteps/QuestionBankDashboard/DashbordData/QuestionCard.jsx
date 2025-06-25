import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { Star, Edit, Trash2, CheckSquare } from 'lucide-react';

const QuestionCard = ({ question, onEdit, onDelete }) => {
  const { 
    activeTab, 
    selectedQuestions, 
    toggleQuestionSelection, 
    toggleStarred,
    showAnswers,
    activeChapter
  } = useQuestionBank();

  const isSelected = selectedQuestions[activeTab].includes(question.id);
  
  // Check if this chapter has reached the 5-question limit
  const chapterSelectedCount = selectedQuestions[activeTab].filter(qId => {
    const q = useQuestionBank().questions[activeTab]?.find(qu => qu.id === qId);
    return q?.chapterName === question.chapterName;
  }).length;

  const canSelect = !isSelected && chapterSelectedCount < 5;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'bg-green-100 text-green-700';
      case 'Medium': return 'bg-yellow-100 text-yellow-700';
      case 'Hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const handleSelectionClick = () => {
    if (!canSelect && !isSelected) {
      // Show warning if trying to select more than 5 from same chapter
      return;
    }
    toggleQuestionSelection(question.id);
  };

  const renderQuestionContent = () => {
    switch (activeTab) {
      case 'match':
        return (
          <div className="space-y-3">
            <p className="text-sm font-medium text-gray-700">Match the following:</p>
            {question.items?.slice(0, 2).map((item, index) => (
              <div key={item.id} className="flex justify-between text-sm text-gray-600 bg-gray-50 p-2 rounded">
                <span>{item.left}</span>
                <span className="text-gray-400">→</span>
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
          <div className="space-y-3">
            <p className="text-sm text-gray-700 font-medium">{question.text}</p>
            <div className="space-y-1">
              {question.options?.slice(0, 2).map((option, index) => (
                <div key={index} className="text-sm text-gray-600">
                  {String.fromCharCode(65 + index)}. {option}
                </div>
              ))}
              {question.options?.length > 2 && (
                <div className="text-xs text-gray-500">+{question.options.length - 2} more options</div>
              )}
            </div>
            {showAnswers && (
              <p className="text-sm text-green-600 font-medium">Answer: {question.answer}</p>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-3">
            <p className="text-sm text-gray-700">{question.text}</p>
            {showAnswers && (
              <p className="text-sm text-green-600 bg-green-50 p-2 rounded">{question.answer}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all ${
      isSelected ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-200'
    } ${!canSelect && !isSelected ? 'opacity-50' : ''}`}>
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <button
            onClick={handleSelectionClick}
            disabled={!canSelect && !isSelected}
            className={`p-1 rounded transition-colors ${
              isSelected 
                ? 'text-blue-600' 
                : canSelect 
                  ? 'text-gray-400 hover:text-gray-600' 
                  : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <CheckSquare className={`w-5 h-5 ${isSelected ? 'fill-current' : ''}`} />
          </button>
          
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>

        <div className="text-xs text-gray-500">
          {question.chapterName}
        </div>
      </div>

      {renderQuestionContent()}

      {question.tags && question.tags.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1">
          {question.tags.slice(0, 3).map(tag => (
            <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded">
              {tag}
            </span>
          ))}
          {question.tags.length > 3 && (
            <span className="px-2 py-1 text-xs bg-gray-100 text-gray-500 rounded">
              +{question.tags.length - 3}
            </span>
          )}
        </div>
      )}

      {!canSelect && !isSelected && (
        <div className="mt-3 text-xs text-red-600 bg-red-50 p-2 rounded">
          Maximum 5 questions can be selected from this chapter
        </div>
      )}
    </div>
  );
};

export default QuestionCard;