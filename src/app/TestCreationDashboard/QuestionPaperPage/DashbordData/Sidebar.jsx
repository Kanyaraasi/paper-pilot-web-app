import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { 
  FileText, 
  MessageSquare, 
  Type, 
  Link, 
  CheckSquare, 
  ToggleLeft, 
  BookOpen, 
  Calculator, 
  Image, 
  Wrench 
} from 'lucide-react';

const Sidebar = () => {
  const { activeTab, setActiveTab, tabTitles, questions } = useQuestionBank();

  const tabIcons = {
    fill: FileText,
    brief: MessageSquare,
    sentence: Type,
    match: Link,
    mcq: CheckSquare,
    truefalse: ToggleLeft,
    essay: BookOpen,
    numerical: Calculator,
    diagram: Image,
    practical: Wrench
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Question Types
        </h2>
        
        <nav className="space-y-1">
          {Object.entries(tabTitles).map(([key, title]) => {
            const Icon = tabIcons[key];
            const count = questions[key]?.length || 0;
            
            return (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeTab === key
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className="w-4 h-4" />
                  <span>{title}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === key
                    ? 'bg-blue-100 text-blue-700'
                    : 'bg-gray-100 text-gray-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;