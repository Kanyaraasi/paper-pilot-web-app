// Modified Sidebar.js
import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { BookOpen } from 'lucide-react';

const Sidebar = () => {
  const { 
    activeChapter, 
    setActiveChapter, 
    chapters, 
    questions,
    activeTab 
  } = useQuestionBank();

  return (
    <aside className="w-64 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4">
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-4">
          Chapters
        </h2>

        <nav className="space-y-1">
          {chapters.map((chapter) => {
            const count = questions[activeTab]?.filter(q => q.chapterName === chapter.name).length || 0;

            return (
              <button
                key={chapter._id}
                onClick={() => setActiveChapter(chapter._id)}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-lg transition-colors ${
                  activeChapter === chapter._id
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4" />
                  <span>{chapter.name}</span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeChapter === chapter._id
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