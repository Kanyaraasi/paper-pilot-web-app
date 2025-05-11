  import React from 'react';

  const TabNavigation = ({ activeTab, setActiveTab, tabTitles, setCurrentPage }) => {
    const handleTabChange = (tab) => {
      setActiveTab(tab);
      setCurrentPage(1);
    };

    return (
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <div className="flex px-4">
          {Object.keys(tabTitles).map(tab => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-all duration-200 ${
                activeTab === tab
                  ? 'text-purple-600 border-purple-600'
                  : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              {tabTitles[tab]}
            </button>
          ))}
        </div>
      </div>
    );
  };

  export default TabNavigation;