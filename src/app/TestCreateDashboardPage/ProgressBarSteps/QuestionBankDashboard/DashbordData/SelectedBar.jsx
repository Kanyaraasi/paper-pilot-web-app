import React from 'react';
import { X, Trash2 } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const SelectedBar = ({ selectedCount, onClearSelection }) => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      barBackground: isDark ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200',
      textPrimary: isDark ? 'text-blue-200' : 'text-blue-900',
      buttonText: isDark ? 'text-blue-300 hover:bg-blue-800/50' : 'text-blue-600 hover:bg-blue-100',
      iconColor: isDark ? 'text-blue-300' : 'text-blue-600',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`${themeClasses.barBackground} border-b px-4 py-3 flex items-center justify-between`}>
      <div className="flex items-center space-x-3">
        <span className={`text-sm font-medium ${themeClasses.textPrimary} font-inter`}>
          {selectedCount} question{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onClearSelection}
          className={`flex items-center space-x-2 px-3 py-1.5 text-sm ${themeClasses.buttonText} rounded-lg transition-colors font-inter`}
        >
          <X className={`w-4 h-4 ${themeClasses.iconColor}`} />
          <span>Clear Selection</span>
        </button>
      </div>
    </div>
  );
};

export default SelectedBar;