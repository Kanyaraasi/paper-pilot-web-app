import React from 'react';
import { Inbox, Star, Clock, FileText, Book, HelpCircle, Shield, Tag } from 'lucide-react';

const Sidebar = ({ allTags, questions, toggleTagSelection, selectedTags, activeTab }) => {
  // Count questions of each type
  const totalQuestions = Object.values(questions).reduce((total, qs) => total + qs.length, 0);
  const totalStarred = Object.values(questions).reduce((total, qs) => total + qs.filter(q => q.starred).length, 0);
  
  // Count questions with each tag
  const getTagCount = (tag) => {
    return Object.values(questions).reduce((count, qs) => 
      count + qs.filter(q => q.tags && q.tags.includes(tag)).length, 0
    );
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="p-4">
        <div className="space-y-1">
          <button className="flex items-center gap-2 text-sm font-medium text-purple-600 bg-purple-50 w-full p-2 rounded-md transition-colors duration-200">
            <Inbox size={16} />
            <span>All Questions</span>
            <span className="ml-auto bg-purple-100 text-purple-800 text-xs px-1.5 py-0.5 rounded">
              {totalQuestions}
            </span>
          </button>
          
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full p-2 rounded-md transition-colors duration-200">
            <Star size={16} />
            <span>Starred</span>
            <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
              {totalStarred}
            </span>
          </button>
          
          <button className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50 w-full p-2 rounded-md transition-colors duration-200">
            <Clock size={16} />
            <span>Recently Used</span>
          </button>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">CATEGORIES</h3>
            <div className="space-y-1">
              <button className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                activeTab === 'fill' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
                <FileText size={16} />
                <span>Fill in Blanks</span>
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                  {questions.fill.length}
                </span>
              </button>
              
              <button className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                activeTab === 'brief' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
                <Book size={16} />
                <span>Brief Answers</span>
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                  {questions.brief.length}
                </span>
              </button>
              
              <button className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                activeTab === 'sentence' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
                <HelpCircle size={16} />
                <span>One Sentence</span>
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                  {questions.sentence.length}
                </span>
              </button>
              
              <button className={`flex items-center gap-2 text-sm font-medium w-full p-2 rounded-md transition-colors duration-200 ${
                activeTab === 'match' ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:bg-gray-50'
              }`}>
                <Shield size={16} />
                <span>Matching</span>
                <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                  {questions.match.length}
                </span>
              </button>
            </div>
          </div>
          
          <div className="pt-4 mt-4 border-t border-gray-200">
            <h3 className="text-xs font-semibold text-gray-500 uppercase mb-2 px-2">TAGS</h3>
            <div className="max-h-48 overflow-y-auto">
              {allTags.map(tag => (
                <div 
                  key={tag} 
                  className={`flex items-center gap-2 text-sm ${selectedTags.includes(tag) ? 'text-purple-700 bg-purple-50' : 'text-gray-700'} hover:bg-gray-50 w-full px-2 py-1 rounded-md cursor-pointer transition-colors duration-200`}
                  onClick={() => toggleTagSelection(tag)}
                >
                  <Tag size={14} />
                  <span>{tag}</span>
                  <span className="ml-auto bg-gray-100 text-gray-600 text-xs px-1.5 py-0.5 rounded">
                    {getTagCount(tag)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;