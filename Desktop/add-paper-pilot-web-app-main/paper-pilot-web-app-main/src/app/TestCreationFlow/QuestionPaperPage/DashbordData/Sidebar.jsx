import React, { useState } from 'react';
import { 
  Inbox,  FileText, Book, HelpCircle, Shield, 
  ChevronDown, ChevronRight, 
  StepBackIcon,
  MoveLeft,
  BookOpen
} from 'lucide-react';

const Sidebar = ({ 
  allTags, 
  questions, 
   
  activeTab,
  setActiveTab,
  tabTitles,
  setCurrentPage,
  onBack,
  activeChapter,
  setActiveChapter
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    chapters: true,
    tags: true,
    difficulty: false,
  });

  // English chapters data
  const englishChapters = [
    { id: 'ch1', name: 'The Fun They Had', number: 1 },
    { id: 'ch2', name: 'The Sound of Music', number: 2 },
    { id: 'ch3', name: 'The Little Girl', number: 3 },
    { id: 'ch4', name: 'A Truly Beautiful Mind', number: 4 },
    { id: 'ch5', name: 'The Snake and the Mirror', number: 5 },
    { id: 'ch6', name: 'My Childhood', number: 6 },
    { id: 'ch7', name: 'Reach for the Top', number: 7 },
    { id: 'ch8', name: 'Kathmandu', number: 8 },
    { id: 'ch9', name: 'If I Were You', number: 9 },
    { id: 'ch10', name: 'The Happy Prince', number: 10 }
  ];

  // State for tag search/filter

  
  // Count questions of each type
  const totalQuestions = Object.values(questions).reduce((total, qs) => total + qs.length, 0);
  // const totalStarred = Object.values(questions).reduce((total, qs) => total + qs.filter(q => q.starred).length, 0);
  // const recentCount = Object.values(questions).reduce((total, qs) => 
  //   total + qs.filter(q => {
  //     const created = new Date(q.createdAt);
  //     const now = new Date();
  //     const diffTime = Math.abs(now - created);
  //     const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  //     return diffDays < 7;
  //   }).length, 0);
  
  // Count questions with each tag and calculate popularity
  const tagCounts = {};
  allTags.forEach(tag => {
    tagCounts[tag] = getTagCount(tag);
  });

  // Sort tags by frequency (most used first)
 
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

  // Helper function to count questions by chapter
  function countQuestionsByChapter(chapterId) {
    return Object.values(questions).reduce((count, qs) => 
      count + qs.filter(q => q.chapter === chapterId).length, 0
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
  const handleChapterChange = (chapter) => {
    setActiveChapter(chapter);
    setCurrentPage(1);
  };

  // Toggle settings dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-72 bg-white border-r border-gray-200 h-full  flex flex-col">
      {/* Sidebar Header */}
      <div className="px-4 py-3 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-purple-800 flex items-center gap-2"><MoveLeft onClick={onBack} size={16}/> Question Bank </h2>
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

          {/* Chapters Section */}
          <div className="mt-4">
            <button 
              onClick={() => toggleSection('chapters')}
              className="flex items-center justify-between w-full px-2 py-1 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase"
            >
              <span>English Chapters</span>
              {expandedSections.chapters ? 
                <ChevronDown size={14} /> : 
                <ChevronRight size={14} />
              }
            </button>
            
            {expandedSections.chapters && (
              <div className="mt-1 space-y-1 pl-1 max-h-72 overflow-y-auto">
                {englishChapters.map(chapter => (
                  <button
                    key={chapter.id}
                    onClick={() => handleChapterChange(chapter.id)}
                    className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                      activeChapter === chapter.id 
                        ? 'bg-blue-100 text-blue-700' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <BookOpen size={16} className="text-blue-500" />
                    <div className="flex flex-col items-start flex-1 min-w-0">
                      <span className="text-xs text-gray-500">Ch {chapter.number}</span>
                      <span className="truncate w-full text-left">{chapter.name}</span>
                    </div>
                    
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