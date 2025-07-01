import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { Star, Edit, Trash2, CheckSquare } from 'lucide-react';

const QuestionCard = ({ question }) => {
  const { 
    activeTab, 
    selectedQuestions, 
    toggleQuestionSelection, 
    
    showAnswers 
  } = useQuestionBank();

  const isSelected = selectedQuestions[activeTab].includes(question.id);

 

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
    <div 
      onClick={() => toggleQuestionSelection(question.id)}
      className={`bg-white border rounded p-2 hover:shadow-sm transition-shadow cursor-pointer ${
        isSelected ? 'ring-1 ring-blue-500 border-blue-500' : 'border-gray-200'
      }`}>
      <div className="flex items-start gap-2">
        <div className={`flex-shrink-0 p-0.5 rounded transition-colors ${
            isSelected ? 'text-blue-600' : 'text-gray-400'
          }`}>
          <CheckSquare className={`w-3.5 h-3.5 ${isSelected ? 'fill-current' : ''}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          {renderQuestionContent()}
          
          {question.tags && question.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {question.tags.map(tag => (
                <span key={tag} className="px-1.5 py-0.5 text-xs bg-gray-100 text-gray-600 rounded text-nowrap">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;