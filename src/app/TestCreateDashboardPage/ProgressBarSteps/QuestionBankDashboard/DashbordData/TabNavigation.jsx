import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';

const TabNavigation = () => {
  const { activeTab, setActiveTab, tabTitles, questions, selectedQuestions } = useQuestionBank();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-6">
        <div className="flex space-x-8 overflow-x-auto">
          {Object.entries(tabTitles).map(([key, title]) => {
            const count = questions[key]?.length || 0;
            const selectedCount = selectedQuestions[key]?.length || 0;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-2 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-700 hover:text-gray-900 hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <span>{title}</span>
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {count}
                  </span>
                  {selectedCount > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
                      {selectedCount} selected
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default TabNavigation;