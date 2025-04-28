import React from 'react';
import { Star, Edit3, Trash2, Clock } from 'lucide-react';

const QuestionCard = ({ 
  question, 
  isSelected, 
  onSelect, 
  showAnswers, 
  onDelete, 
  onEdit, 
  onToggleStar, 
  viewMode 
}) => {
  const formatDate = (date) => {
    if (!date) return 'Never';
    return new Date(date).toLocaleDateString();
  };

  const difficultyStyles = {
    'Easy': 'bg-green-100 text-green-800',
    'Medium': 'bg-yellow-100 text-yellow-800',
    'Hard': 'bg-red-100 text-red-800'
  };

  if (viewMode === 'list') {
    return (
      <div 
        onClick={() => onSelect(question.id)}
        className={`bg-white rounded-lg shadow-sm border transition-all duration-200 mb-2 ${
          isSelected ? 'border-purple-400 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-200'
        } cursor-pointer`}
      >
        <div className="flex flex-1 items-center p-3">
          <div className="flex items-center w-10">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(question.id);
              }}
              className="h-4 w-4 text-purple-600 rounded border-gray-300 cursor-pointer"
            />
          </div>
          
          {question.starred && (
            <Star size={16} className="text-yellow-500 ml-2" />
          )}
          
          <div className="flex-1 ml-3 truncate">
            <p className="text-sm font-medium text-gray-800 truncate">
              {question.text ? question.text.substring(0, 60) + (question.text.length > 60 ? '...' : '') : 'Matching Question'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {question.tags && question.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
          
          <div className={`ml-4 text-xs font-semibold px-2 py-0.5 rounded ${difficultyStyles[question.difficulty]}`}>
            {question.difficulty}
          </div>

          <div className="ml-4 flex items-center gap-2">
            <button 
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              onClick={(e) => { 
                e.stopPropagation(); 
                onEdit(question);
              }}
            >
              <Edit3 size={14} />
            </button>
            
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div 
      onClick={() => onSelect(question.id)}
      className={`bg-white rounded-lg shadow-sm border transition-all duration-200 ${
        isSelected ? 'border-purple-400 ring-2 ring-purple-200' : 'border-gray-200 hover:border-purple-200'
      } cursor-pointer h-full`}
    >
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div 
            className={`text-xs font-semibold px-2 py-0.5 rounded ${difficultyStyles[question.difficulty]}`}
          >
            {question.difficulty}
          </div>
          
          <div className="flex gap-1">
            <button 
              className={`text-gray-400 hover:text-yellow-500 transition-colors duration-200 ${question.starred ? 'text-yellow-500' : ''}`}
              onClick={(e) => { 
                e.stopPropagation(); 
                onToggleStar(question.id);
              }}
            >
              <Star size={14} fill={question.starred ? "currentColor" : "none"} />
            </button>
            <button 
              className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
              onClick={(e) => { 
                e.stopPropagation(); 
                onEdit(question);
              }}
            >
              <Edit3 size={14} />
            </button>
            <button 
              className="text-gray-400 hover:text-red-600 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(question.id);
              }}
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
        
        <div className="mb-3">
          <p className="text-sm text-gray-900 font-medium line-clamp-2">
            {question.text || 'Matching Question'}
          </p>
          
          {question.items && (
            <div className="grid grid-cols-2 gap-1 mt-2">
              {question.items.slice(0, 2).map(item => (
                <div key={item.id} className="bg-gray-50 p-1.5 rounded border border-gray-100 text-xs">
                  <div className="font-medium truncate">{item.left}</div>
                  <div className="text-gray-600 truncate">{item.right}</div>
                </div>
              ))}
              {question.items.length > 2 && (
                <div className="col-span-2 text-center text-xs text-gray-500 mt-1">
                  + {question.items.length - 2} more items
                </div>
              )}
            </div>
          )}
        </div>
        
        {question.tags && question.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {question.tags.map(tag => (
              <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">
                {tag}
              </span>
            ))}
          </div>
        )}
        
        {showAnswers && question.answer && (
          <div className="pt-2 border-t border-gray-100 mt-2">
            <p className="text-xs text-gray-700 line-clamp-2">
              <span className="font-medium">Answer:</span> {question.answer}
            </p>
          </div>
        )}
        
        <div className="flex justify-between items-center mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={isSelected}
              onChange={(e) => {
                e.stopPropagation();
                onSelect(question.id);
              }}
              className="h-3 w-3 text-purple-600 rounded border-gray-300 cursor-pointer"
            />
            <label className="ml-1.5 text-xs text-gray-500">Select</label>
          </div>
          
          <div className="text-xs text-gray-500 flex items-center">
            <Clock size={12} className="mr-1" />
            {formatDate(question.createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
