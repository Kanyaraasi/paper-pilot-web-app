import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { BookOpen } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const Sidebar = () => {
  const { 
    activeChapter, 
    setActiveChapter, 
    chapters, 
    questions,
    activeTab 
  } = useQuestionBank();
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      sidebarBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      headerText: isDark ? 'text-gray-400' : 'text-gray-500',
      buttonBase: isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100',
      buttonActive: isDark ? 'bg-blue-900/40 text-blue-300' : 'bg-blue-50 text-blue-700',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-600',
      iconActiveColor: isDark ? 'text-blue-300' : 'text-blue-700',
      badgeBase: isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-600',
      badgeActive: isDark ? 'bg-blue-800/50 text-blue-200' : 'bg-blue-100 text-blue-700',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <aside className={`w-64 ${themeClasses.sidebarBackground} border-r overflow-y-auto`}>
      <div className="p-4">
        <h2 className={`text-sm font-medium ${themeClasses.headerText} uppercase tracking-wide mb-4 `}>
          Chapters Names
        </h2>

        <nav className="space-y-1">
          {chapters.map((chapter) => {
            const count = questions[activeTab]?.filter(q => q.chapterName === chapter.name).length || 0;
            const isActive = activeChapter === chapter._id;

            return (
              <button
                key={chapter._id}
                onClick={() => setActiveChapter(chapter._id)}
                title={chapter.name} // Tooltip for full chapter name on hover
                className={`w-full flex px-1 py-2 text-sm rounded-lg transition-colors group ${
                  isActive ? themeClasses.buttonActive : themeClasses.buttonBase
                }`}
              >
                <div className="flex items-center space-x-3 min-w-0 flex-1">
                  <BookOpen className={`w-4 h-4 flex-shrink-0 ${
                    isActive ? themeClasses.iconActiveColor : themeClasses.iconColor
                  }`} />
                  <span className="truncate text-left ">
                    {chapter.name}
                  </span>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full  ${
                  isActive ? themeClasses.badgeActive : themeClasses.badgeBase
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