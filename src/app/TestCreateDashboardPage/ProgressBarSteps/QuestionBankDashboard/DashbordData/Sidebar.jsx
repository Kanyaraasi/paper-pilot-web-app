import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { BookOpen, CheckCircle } from 'lucide-react';

const Sidebar = () => {
  const { 
    activeChapter, 
    setActiveChapter, 
    chapters, 
    questions,
    activeTab,
    selectedQuestions
  } = useQuestionBank();

  // Mock chapters for demonstration
  const mockChapters = [
    { _id: '1', name: 'Introduction to Physics', isActive: true },
    { _id: '2', name: 'Motion and Force', isActive: true },
    { _id: '3', name: 'Energy and Work', isActive: true },
    { _id: '4', name: 'Heat and Temperature', isActive: true },
    { _id: '5', name: 'Light and Optics', isActive: true },
    { _id: '6', name: 'Sound and Waves', isActive: true },
    { _id: '7', name: 'Electricity', isActive: true },
    { _id: '8', name: 'Magnetism', isActive: true },
    { _id: '9', name: 'Modern Physics', isActive: true },
    { _id: '10', name: 'Nuclear Physics', isActive: true }
  ];

  const displayChapters = chapters.length > 0 ? chapters : mockChapters;

  return (
    <aside className="w-72 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-6">
        <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-6">
          Select Chapters
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Choose up to 5 questions from each chapter
        </p>

        <nav className="space-y-2">
          {displayChapters.map((chapter) => {
            const count = questions[activeTab]?.filter(q => q.chapterName === chapter.name).length || 0;
            const selectedCount = selectedQuestions[activeTab]?.filter(qId => {
              const question = questions[activeTab]?.find(q => q.id === qId);
              return question?.chapterName === chapter.name;
            }).length || 0;

            return (
              <button
                key={chapter._id}
                onClick={() => setActiveChapter(chapter.name)}
                className={`w-full flex items-center justify-between p-3 text-sm rounded-lg transition-colors ${
                  activeChapter === chapter.name
                    ? 'bg-blue-50 text-blue-700 border-l-4 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <BookOpen className="w-4 h-4" />
                  <span className="font-medium">{chapter.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    activeChapter === chapter.name
                      ? 'bg-blue-100 text-blue-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}
                  </span>
                  {selectedCount > 0 && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-medium text-green-600">
                        {selectedCount}/5
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Selection Summary */}
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Selection Summary</h3>
          <div className="space-y-2">
            {Object.entries(selectedQuestions).map(([type, selections]) => (
              selections.length > 0 && (
                <div key={type} className="flex justify-between text-sm">
                  <span className="text-gray-600 capitalize">{type.replace(/([A-Z])/g, ' $1')}</span>
                  <span className="font-medium text-gray-700">{selections.length}</span>
                </div>
              )
            ))}
          </div>
          <div className="mt-3 pt-3 border-t border-gray-200">
            <div className="flex justify-between text-sm font-semibold">
              <span className="text-gray-700">Total Selected</span>
              <span className="text-blue-600">
                {Object.values(selectedQuestions).reduce((total, selections) => total + selections.length, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;