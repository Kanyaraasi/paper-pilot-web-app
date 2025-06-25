import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';

const TabNavigation = () => {
  const { activeTab, setActiveTab, tabTitles, questions } = useQuestionBank();

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="px-4">
        <div className="flex space-x-8 overflow-x-auto">
          {Object.entries(tabTitles).map(([key, title]) => {
            const count = questions[key]?.length || 0;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
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