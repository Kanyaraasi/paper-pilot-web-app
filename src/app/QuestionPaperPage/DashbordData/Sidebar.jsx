import React, { useState } from 'react';
import { 
  Inbox, Star, Clock, FileText, Book, HelpCircle, Shield, 
  ChevronDown, ChevronRight, Settings, LogOut, Bell, User
} from 'lucide-react';

const Sidebar = ({ 
  allTags, 
  questions, 
  toggleTagSelection, 
  selectedTags, 
  activeTab,
  setActiveTab,
  tabTitles,
  setCurrentPage
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // State for collapsible sections
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    tags: true,
    difficulty: false,
  });

  // State for tag search/filter
  const [tagSearch, setTagSearch] = useState('');
  
  // Count questions of each type
  const totalQuestions = Object.values(questions).reduce((total, qs) => total + qs.length, 0);
  const totalStarred = Object.values(questions).reduce((total, qs) => total + qs.filter(q => q.starred).length, 0);
  const recentCount = Object.values(questions).reduce((total, qs) => 
    total + qs.filter(q => {
      const created = new Date(q.createdAt);
      const now = new Date();
      const diffTime = Math.abs(now - created);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      return diffDays < 7;
    }).length, 0);
  
  // Count questions with each tag and calculate popularity
  const tagCounts = {};
  allTags.forEach(tag => {
    tagCounts[tag] = getTagCount(tag);
  });

  // Sort tags by frequency (most used first)
  const sortedTags = allTags
    .filter(tag => tag.toLowerCase().includes(tagSearch.toLowerCase()))
    .sort((a, b) => tagCounts[b] - tagCounts[a]);

  // Count questions with each difficulty
  const difficultyCount = {
    Easy: countQuestionsByDifficulty('Easy'),
    Medium: countQuestionsByDifficulty('Medium'),
    Hard: countQuestionsByDifficulty('Hard')
  };

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

  // Toggle settings dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-full  flex flex-col">
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
        
        <button 
          onClick={() => {
            // Logic to show only starred questions
          }}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 w-full p-2 rounded-md transition-colors duration-200"
        >
          <Star size={18} className="text-yellow-500" />
          <span>Starred</span>
          <span className="ml-auto bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded-full">
            {totalStarred}
          </span>
        </button>
        
        <button 
          onClick={() => {
            // Logic for recently added questions
          }}
          className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-purple-50 hover:text-purple-700 w-full p-2 rounded-md transition-colors duration-200"
        >
          <Clock size={18} className="text-blue-500" />
          <span>Recently Added</span>
          <span className="ml-auto bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
            {recentCount}
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
        </div>
      </div>
      
      {/* Sidebar Footer - Settings Dropdown */}
      <div className="border-t border-gray-200 relative">
        <button 
          onClick={toggleDropdown}
          className="flex items-center px-4 py-3 w-full text-left bg-white hover:bg-gray-50 focus:outline-none"
        >
          <Settings className="mr-2 text-gray-600" size={18} />
          <span className="text-gray-700">Settings</span>
        </button>

        {isOpen && (
          <div className="absolute  left-0 right-0 mb-1 bg-white border border-gray-200 rounded-md shadow-md z-10">
            <div className="py-1">
              <a href="#" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <User className="mr-2 text-gray-600" size={18} />
                <span>Profile</span>
              </a>
              
              <a href="/HowItWork" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Bell className="mr-2 text-gray-600" size={18} />
                <span>How It Work</span>
              </a>
              
              <a href="/Help" className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100">
                <HelpCircle className="mr-2 text-gray-600" size={18} />
                <span>Help & Support</span>
              </a>
              
              <a href="#" className="flex items-center px-4 py-2 text-red-500 hover:bg-gray-100">
                <LogOut className="mr-2" size={18} />
                <span>Log Out</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;