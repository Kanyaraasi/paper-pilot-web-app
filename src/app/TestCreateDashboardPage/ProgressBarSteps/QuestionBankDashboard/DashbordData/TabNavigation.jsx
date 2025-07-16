import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { useTheme } from "@/contexts/ThemeContext";

const TabNavigation = () => {
  const { activeTab, setActiveTab, tabTitles, questions } = useQuestionBank();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      tabBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      tabActive: isDark ? 'border-blue-400 text-blue-300' : 'border-blue-500 text-blue-600',
      tabInactive: isDark 
        ? 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600' 
        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`${themeClasses.tabBackground} border-b`}>
      <div className="px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {Object.entries(tabTitles).map(([key, title]) => {
            const count = questions[key]?.length || 0;
            const isActive = activeTab === key;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors  ${
                  isActive ? themeClasses.tabActive : themeClasses.tabInactive
                }`}
              >
                {title} ({count})
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;