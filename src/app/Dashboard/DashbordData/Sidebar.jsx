import React, { useState } from 'react';
import { 
  Inbox, Clock, FileText, Book, HelpCircle, Shield, 
  ChevronDown, ChevronRight, BookOpen, Play
} from 'lucide-react';

const Sidebar = ({ 
  allTags, 
  questions, 
   
  activeTab,
  setActiveTab,
  tabTitles,
  setCurrentPage
}) => {
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    tags: true,
    difficulty: false,
    chapters: true,
  });

  // Chapter data - you can make this dynamic later
  const chapters = [
    { id: 1, name: "Introduction to Fundamentals", completed: false, current: false },
    { id: 2, name: "Basic Concepts", completed: false, current: false },
    { id: 3, name: "Advanced Principles", completed: false, current: false },
    { id: 4, name: "Practical Applications", completed: false, current: false },
    { id: 5, name: "Case Studies", completed: false, current: false },
    { id: 6, name: "Integration Methods", completed: false, current: false },
    { id: 7, name: "Problem Solving", completed: false, current: false },
    { id: 8, name: "Advanced Techniques", completed: false, current: false },
    { id: 9, name: "Real World Examples", completed: false, current: false },
    { id: 10, name: "Final Assessment", completed: false, current: false },
  ];

  
  // Count questions of each type
  const totalQuestions = Object.values(questions).reduce((total, qs) => total + qs.length, 0);
  
  // Count questions with each tag and calculate popularity
  const tagCounts = {};
  allTags.forEach(tag => {
    tagCounts[tag] = getTagCount(tag);
  });
 
  // Helper function to get tag count
  function getTagCount(tag) {
    return Object.values(questions).reduce((count, qs) => 
      count + qs.filter(q => q.tags && q.tags.includes(tag)).length, 0
    );
  }

  // Helper function to count questions by difficulty
  function countQuestionsByDifficulty(difficulty) {
    return Object.values(questions).reduce((count, qs) => 
      count + qs.filter(q => q.difficulty === difficulty).length, 0
    );
  }

  // Toggle section expansion
  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Handle tab selection
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  // Handle chapter selection
  const handleChapterSelect = (chapterId) => {
    console.log(`Selected chapter ${chapterId}`);
    // Add your chapter selection logic here
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full flex flex-col">
      {/* Sidebar Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-purple-800">Question Bank</h2>
        <p className="text-xs text-gray-500 mt-1">Organize and manage your questions</p>
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto py-2 px-3">
        <button 
          onClick={() => {
            setCurrentPage(1);
          }}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 w-full p-2 rounded-md transition-colors duration-200"
        >
          <Inbox size={18} className="text-purple-600" />
          <span>All Questions</span>
          <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-2 py-0.5 rounded-full">
            {totalQuestions}
          </span>
        </button>
        
        <div className="mt-4 border-t border-gray-200 pt-4">
          {/* Chapters Section */}
          <div className="mb-4">
            <button 
              onClick={() => toggleSection('chapters')}
              className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase"
            >
              <span>Chapters (English)</span>
              {expandedSections.chapters ? 
                <ChevronDown size={14} /> : 
                <ChevronRight size={14} />
              }
            </button>
            
            {expandedSections.chapters && (
              <div className="mt-2 space-y-1 pl-1 max-h-64 overflow-y-auto">
                {chapters.map(chapter => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterSelect(chapter.id)}
                    className="flex items-center gap-3 text-sm w-full p-2 rounded-md transition-colors duration-200 text-gray-600 hover:bg-gray-200"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-5 h-5 border-2 border-gray-300 rounded-full hover:bg-green-600"></div>
                    </div>
                    <div className="flex-1 text-left">
                      <div className="font-medium">Chapter {chapter.id}</div>
                      <div className="text-xs text-gray-500">{chapter.name}</div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories Section */}
          <div>
            <button 
              onClick={() => toggleSection('categories')}
              className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase"
            >
              <span>Categories</span>
              {expandedSections.categories ? 
                <ChevronDown size={14} /> : 
                <ChevronRight size={14} />
              }
            </button>
            
            {expandedSections.categories && (
              <div className="mt-1 space-y-1 pl-1">
                {Object.keys(tabTitles).map(tab => (
                  <button
                    key={tab}
                    onClick={() => handleTabChange(tab)}
                    className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                      activeTab === tab 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    {tab === 'fill' && <FileText size={16} className="text-indigo-500" />}
                    {tab === 'brief' && <Book size={16} className="text-green-500" />}
                    {tab === 'sentence' && <HelpCircle size={16} className="text-orange-500" />}
                    {tab === 'match' && <Shield size={16} className="text-cyan-500" />}
                    <span>{tabTitles[tab]}</span>
                    <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {questions[tab].length}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;