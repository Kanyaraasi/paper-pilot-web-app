import React from 'react';
import { Menu, Bell, User, BookOpen } from 'lucide-react';

const Header = ({ toggleSidebar, showSidebar, onAddNew, selectedCount }) => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        
        <div className="flex items-center space-x-3">
          <BookOpen className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-700">Question Bank</h1>
          {selectedCount > 0 && (
            <span className="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full">
              {selectedCount} selected
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-gray-700" />
        </button>

        <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
          <User className="w-5 h-5 text-gray-700" />
        </button>
      </div>
    </header>
  );
};

export default Header;