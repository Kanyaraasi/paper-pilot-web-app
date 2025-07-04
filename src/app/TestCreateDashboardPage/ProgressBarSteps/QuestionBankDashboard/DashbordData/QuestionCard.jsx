import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { Star, Edit, Trash2, CheckSquare } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const QuestionCard = ({ question }) => {
  const { 
    activeTab, 
    selectedQuestions, 
    toggleQuestionSelection, 
    showAnswers 
  } = useQuestionBank();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      cardBackground: isDark ? 'bg-gray-800' : 'bg-white',
      cardBorder: isDark ? 'border-gray-700' : 'border-gray-200',
      cardBorderSelected: isDark ? 'ring-blue-400 border-blue-400' : 'ring-blue-500 border-blue-500',
      cardHover: isDark ? 'hover:bg-gray-700' : 'hover:shadow-sm',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      textAnswer: isDark ? 'text-green-400' : 'text-green-600',
      checkboxSelected: isDark ? 'text-blue-400' : 'text-blue-600',
      checkboxUnselected: isDark ? 'text-gray-500' : 'text-gray-400',
      tagBackground: isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600',
      matchArrow: isDark ? 'text-gray-400' : 'text-gray-600',
    };
  };

  const themeClasses = getThemeClasses();
  const isSelected = selectedQuestions[activeTab].includes(question.id);

  const renderQuestionContent = () => {
    switch (activeTab) {
      case 'match':
        return (
          <div className="space-y-2">
            <p className={`text-sm font-medium ${themeClasses.textPrimary} font-inter`}>Match the following:</p>
            {question.items?.slice(0, 2).map((item, index) => (
              <div key={item.id} className={`flex justify-between text-sm ${themeClasses.textSecondary}`}>
                <span className="font-inter">{item.left}</span>
                <span className={themeClasses.matchArrow}>→</span>
                <span className="font-inter">{item.right}</span>
              </div>
            ))}
            {question.items?.length > 2 && (
              <p className={`text-xs ${themeClasses.textMuted} font-inter`}>+{question.items.length - 2} more items</p>
            )}
          </div>
        );
      case 'mcq':
        return (
          <div className="space-y-2">
            <p className={`text-sm ${themeClasses.textPrimary} font-inter`}>{question.text}</p>
            {showAnswers && (
              <p className={`text-sm ${themeClasses.textAnswer} font-medium font-inter`}>Answer: {question.answer}</p>
            )}
          </div>
        );
      default:
        return (
          <div className="space-y-2">
            <p className={`text-sm ${themeClasses.textPrimary} font-inter`}>{question.text}</p>
            {showAnswers && (
              <p className={`text-sm ${themeClasses.textAnswer} font-inter`}>{question.answer}</p>
            )}
          </div>
        );
    }
  };

  return (
    <div 
      onClick={() => toggleQuestionSelection(question.id)}
      className={`${themeClasses.cardBackground} border rounded p-2 ${themeClasses.cardHover} transition-all cursor-pointer ${
        isSelected ? `ring-1 ${themeClasses.cardBorderSelected}` : themeClasses.cardBorder
      }`}>
      <div className="flex items-start gap-2">
        <div className={`flex-shrink-0 p-0.5 rounded transition-colors ${
            isSelected ? themeClasses.checkboxSelected : themeClasses.checkboxUnselected
          }`}>
          <CheckSquare className={`w-3.5 h-3.5 ${isSelected ? 'fill-current' : ''}`} />
        </div>
        
        <div className="flex-1 min-w-0">
          {renderQuestionContent()}
          
          {question.tags && question.tags.length > 0 && (
            <div className="mt-1.5 flex flex-wrap gap-1">
              {question.tags.map(tag => (
                <span key={tag} className={`px-1.5 py-0.5 text-xs ${themeClasses.tagBackground} rounded text-nowrap font-inter`}>
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