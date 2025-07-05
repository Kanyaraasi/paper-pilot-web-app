import React from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Filter, Grid, List, Eye, EyeOff, ChevronDown } from 'lucide-react';

const Toolbar = ({ showSortDropdown, setShowSortDropdown }) => {
  const {
    viewMode,
    setViewMode,
    showAnswers,
    setShowAnswers,
    showFilters,
    setShowFilters,
    sortBy,
    setSortBy,
    filteredQuestions
  } = useQuestionBank();

  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gray-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      cardHeader: isDark ? 'border-gray-700' : 'border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark 
        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark 
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      subjectCard: isDark 
        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
        : 'border-gray-200 bg-white hover:bg-gray-50',
      subjectCardSelected: isDark 
        ? 'border-blue-400 bg-blue-900/30 ring-blue-400' 
        : 'border-blue-300 bg-blue-50 ring-blue-200',
      subjectCardHover: isDark ? 'hover:border-gray-500' : 'hover:border-gray-300',
      alertInfo: isDark 
        ? 'bg-blue-900/30 border-blue-700 text-blue-200' 
        : 'bg-blue-50 border-blue-200 text-blue-700',
      alertError: isDark 
        ? 'bg-red-900/30 border-red-700 text-red-200' 
        : 'bg-red-50 border-red-200 text-red-600',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-green-600',
      iconError: isDark ? 'text-red-400' : 'text-red-600',
      gradientBg: isDark 
        ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
        : 'bg-gradient-to-br from-blue-100 to-purple-100',
      // Additional toolbar-specific classes
      toolbarBg: isDark ? 'bg-gray-800' : 'bg-white',
      toolbarBorder: isDark ? 'border-gray-700' : 'border-gray-200',
      buttonFilter: isDark 
        ? 'bg-blue-600/20 text-blue-300 hover:bg-blue-600/30' 
        : 'bg-blue-50 text-blue-700 hover:bg-blue-100',
      buttonToggle: isDark 
        ? 'text-gray-300 hover:bg-gray-700' 
        : 'text-gray-600 hover:bg-gray-50',
      buttonToggleActive: isDark 
        ? 'bg-blue-600/20 text-blue-300' 
        : 'bg-blue-50 text-blue-600',
      dropdownBg: isDark ? 'bg-gray-800' : 'bg-white',
      dropdownBorder: isDark ? 'border-gray-700' : 'border-gray-200',
      dropdownItem: isDark ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-50',
      dropdownItemActive: isDark ? 'text-blue-300 bg-blue-600/20' : 'text-blue-600 bg-blue-50',
      answersButtonOn: isDark 
        ? 'bg-green-600/20 text-green-300' 
        : 'bg-green-50 text-green-700',
      answersButtonOff: isDark 
        ? 'text-gray-300 hover:bg-gray-700' 
        : 'text-gray-600 hover:bg-gray-50',
      viewModeButton: isDark 
        ? 'text-gray-300 hover:bg-gray-700' 
        : 'text-gray-600 hover:bg-gray-50',
      viewModeButtonActive: isDark 
        ? 'bg-blue-600/20 text-blue-300' 
        : 'bg-blue-50 text-blue-600',
      viewModeContainer: isDark ? 'border-gray-700' : 'border-gray-300',
    };
  };

  const themeClasses = getThemeClasses();

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'difficulty', label: 'By Difficulty' }
  ];

  return (
    <div className={`${themeClasses.toolbarBg} border-b ${themeClasses.toolbarBorder} px-4 py-3 `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <span className={`text-sm ${themeClasses.textSecondary} font-medium`}>
            {filteredQuestions.length} questions
          </span>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showFilters
                ? themeClasses.buttonFilter
                : themeClasses.buttonToggle
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filters</span>
          </button>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <button
              onClick={() => setShowSortDropdown(!showSortDropdown)}
              className={`flex items-center space-x-2 px-3 py-1.5 border ${themeClasses.inputBase} rounded-lg text-sm font-medium transition-colors`}
            >
              <span>Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}</span>
              <ChevronDown className="w-4 h-4" />
            </button>
            
            {showSortDropdown && (
              <div className={`absolute right-0 mt-1 w-48 ${themeClasses.dropdownBg} border ${themeClasses.dropdownBorder} rounded-lg shadow-lg z-10`}>
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setSortBy(option.value);
                      setShowSortDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 text-sm font-medium transition-colors ${
                      sortBy === option.value 
                        ? themeClasses.dropdownItemActive 
                        : themeClasses.dropdownItem
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            onClick={() => setShowAnswers(!showAnswers)}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
              showAnswers
                ? themeClasses.answersButtonOn
                : themeClasses.answersButtonOff
            }`}
          >
            {showAnswers ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            <span>{showAnswers ? 'Hide' : 'Show'} Answers</span>
          </button>

          <div className={`flex items-center border ${themeClasses.viewModeContainer} rounded-lg`}>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${
                viewMode === 'grid'
                  ? themeClasses.viewModeButtonActive
                  : themeClasses.viewModeButton
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${
                viewMode === 'list'
                  ? themeClasses.viewModeButtonActive
                  : themeClasses.viewModeButton
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;