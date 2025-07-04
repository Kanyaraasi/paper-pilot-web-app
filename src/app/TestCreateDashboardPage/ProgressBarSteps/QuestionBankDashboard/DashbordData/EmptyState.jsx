import React from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const EmptyState = ({ hasSearchQuery, resetFilters, initNewQuestion }) => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      iconBackground: isDark ? 'bg-gray-700' : 'bg-gray-50',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-400',
      buttonPrimary: isDark 
        ? 'bg-purple-600 hover:bg-purple-700 text-white' 
        : 'bg-purple-600 hover:bg-purple-700 text-white',
      buttonSecondary: isDark 
        ? 'text-purple-400 hover:text-purple-300' 
        : 'text-purple-600 hover:text-purple-800',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`${themeClasses.cardBackground} rounded-lg shadow-sm border p-8 text-center font-inter`}>
      <div className="mb-4">
        <div className={`${themeClasses.iconBackground} h-16 w-16 rounded-full flex items-center justify-center mx-auto`}>
          <Search size={32} className={themeClasses.iconColor} />
        </div>
      </div>
      <h3 className={`text-xl font-semibold ${themeClasses.iconBackground} mb-2 font-inter`}>
        No questions found
      </h3>
      <p className={`${themeClasses.textMuted} mb-6 font-inter`}>
        {hasSearchQuery
          ? "Try adjusting your filters or search query to find questions"
          : "Start by adding your first question to the bank"}
      </p>
      {hasSearchQuery ? (
        <button
          onClick={resetFilters}
          className={`${themeClasses.buttonSecondary} font-medium transition-colors underline underline-offset-2 font-inter`}
        >
          Clear all filters
        </button>
      ) : (
        <button
          onClick={initNewQuestion}
          className={`${themeClasses.buttonPrimary} flex items-center gap-2 px-6 py-3 rounded-md transition-all font-medium mx-auto font-inter`}
        >
          <PlusCircle size={20} />
          Add Your First Question
        </button>
      )}
    </div>
  );
};

export default EmptyState;