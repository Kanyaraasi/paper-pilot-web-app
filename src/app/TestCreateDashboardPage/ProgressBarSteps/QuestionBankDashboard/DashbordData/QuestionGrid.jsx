import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import QuestionCard from './QuestionCard';
import { Plus } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const QuestionGrid = ({ onEditQuestion, onDeleteQuestion, onAddNew }) => {
  const { currentQuestions, viewMode, filteredQuestions, loading } = useQuestionBank();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-400',
      iconColor: isDark ? 'text-gray-500' : 'text-gray-400',
      loadingSpinner: isDark ? 'text-gray-400' : 'text-gray-600',
    };
  };

  const themeClasses = getThemeClasses();

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className={`inline-flex items-center px-4 py-2 text-sm ${themeClasses.textSecondary}`}>
          <svg className={`animate-spin -ml-1 mr-3 h-5 w-5 ${themeClasses.loadingSpinner}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading questions...
        </div>
      </div>
    );
  }

  if (filteredQuestions.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <Plus className={`w-16 h-16 mx-auto ${themeClasses.iconColor}`} />
        </div>
        <h3 className={`text-lg font-medium ${themeClasses.textPrimary} mb-2 `}>
          No questions found
        </h3>
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