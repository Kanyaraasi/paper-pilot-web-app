import React from 'react';
import { Menu, Plus, Search, Bell, User, ChevronLeft } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const Header = ({ toggleSidebar, showSidebar, onAddNew, selectedCount }) => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      headerBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-400',
      buttonHover: isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100',
      inputBase: isDark 
        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      badgeBackground: isDark ? 'bg-blue-900/40 text-blue-200' : 'bg-blue-100 text-blue-800',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-600',
      iconSearchColor: isDark ? 'text-gray-400' : 'text-gray-400',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <header className={`${themeClasses.headerBackground} border-b px-4 py-3 flex items-center justify-between font-inter`}>
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleSidebar}
          className={`p-2 ${themeClasses.buttonHover} rounded-lg transition-colors`}
        >
          <ChevronLeft className={`w-5 h-5 ${themeClasses.iconColor}`} />
        </button>
        
        <div className="flex items-center space-x-2">
          <h1 className={`text-xl font-semibold ${themeClasses.textPrimary} font-inter`}>
            Question Bank
          </h1>
          {selectedCount > 0 && (
            <span className={`${themeClasses.badgeBackground} text-xs font-medium px-2.5 py-0.5 rounded-full font-inter`}>
              {selectedCount} selected
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="relative">
          <Search className={`w-4 h-4 ${themeClasses.iconSearchColor} absolute left-3 top-1/2 transform -translate-y-1/2`} />
          <input
            type="text"
            placeholder="Search questions..."
            className={`pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent ${themeClasses.inputBase} font-inter`}
          />
        </div>
        
        <button className={`p-2 ${themeClasses.buttonHover} rounded-lg transition-colors`}>
          <Bell className={`w-5 h-5 ${themeClasses.iconColor}`} />
        </button>

        <button className={`p-2 ${themeClasses.buttonHover} rounded-lg transition-colors`}>
          <User className={`w-5 h-5 ${themeClasses.iconColor}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;