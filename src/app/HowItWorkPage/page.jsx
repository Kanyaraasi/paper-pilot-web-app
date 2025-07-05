'use client'
import { useTheme } from "@/contexts/ThemeContext";
import React from "react";

const HowItWorkPage = () => {
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
      inputBase: isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      subjectCard: isDark ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-gray-200 bg-white hover:bg-gray-50',
      subjectCardSelected: isDark ? 'border-blue-400 bg-blue-900/30 ring-blue-400' : 'border-blue-300 bg-blue-50 ring-blue-200',
      subjectCardHover: isDark ? 'hover:border-gray-500' : 'hover:border-gray-300',
      alertInfo: isDark ? 'bg-blue-900/30 border-blue-700 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-700',
      alertError: isDark ? 'bg-red-900/30 border-red-700 text-red-200' : 'bg-red-50 border-red-200 text-red-600',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-green-600',
      iconError: isDark ? 'text-red-400' : 'text-red-600',
      gradientBg: isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100',
    };
  };

  const themeClasses = getThemeClasses();

  return (
<div className={`w-full ${themeClasses.pageBackground} flex items-center justify-center min-h-screen pt-[160px] p-4 transition-colors duration-200`}>
        <div className={`w-full max-w-7xl ${themeClasses.cardBackground} rounded-2xl shadow-lg overflow-hidden min-h-[90vh]`}>
        <div className="flex flex-col md:flex-row min-h-[90vh]">
          {/* Left Container - Logo */}
          <div className="flex-1 p-8 md:p-16 flex items-center justify-center relative min-h-[40vh] md:min-h-[90vh]">
            <div className="relative flex items-center justify-center">
              <div className="relative w-56 h-56 md:w-72 md:h-72 bg-gradient-to-br from-yellow-200 to-yellow-300 rounded-full flex items-center justify-center shadow-lg">
                <div className="flex items-center gap-2 text-2xl md:text-3xl font-bold">
                  <div className={themeClasses.textSecondary}>Paper</div>
                  <div className={themeClasses.iconAccent}>Pilot</div>
                </div>
              </div>

              {/* Number cards */}
              <div 
                className="absolute -top-4 -left-8 w-16 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-md text-white text-xl font-bold transform -rotate-12 hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                1
              </div>
              <div 
                className="absolute -top-8 left-20 w-16 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md text-white text-xl font-bold transform rotate-6 hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                2
              </div>
              <div 
                className="absolute -top-2 right-8 w-16 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-md text-white text-xl font-bold transform rotate-12 hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                3
              </div>
              <div 
                className="absolute top-14 -right-8 w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-md text-white text-xl font-bold transform rotate-12 hover:scale-110 transition-transform duration-200 cursor-pointer"
              >
                4
              </div>
            </div>
          </div>

          {/* Right Container - Content */}
          <div className="flex-1 p-8 md:p-12 flex items-center justify-start min-h-[90vh]">
            <div className="max-w-lg w-full">
              <h2 className={`text-3xl md:text-4xl font-bold ${themeClasses.textPrimary} mb-6 leading-tight`}>
                Four Simple Steps
              </h2>
              <p className={`${themeClasses.textSecondary} text-lg mb-8 leading-relaxed`}>
                Follow these steps to create your papers effortlessly and efficiently.
              </p>

              <div className="flex flex-col gap-6">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${themeClasses.iconAccent} bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 leading-snug`}>
                      Login is compulsory to access the system.
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Each user will receive a unique and secure key ID after
                      successful authentication, ensuring data privacy and
                      security.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${themeClasses.iconAccent} bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 leading-snug`}>
                      Fill Proper Details
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Enter all details correctly such as selecting the grade,
                      subject, and exam details to ensure accurate paper generation.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${themeClasses.iconAccent} bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 leading-snug`}>
                      Select Questions and Add New Ones
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Based on the selected class, subject, and exam type, you
                      can filter and choose questions like fill-ups, match the
                      pair, one-sentence answers, answer in brief, etc.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 ${themeClasses.iconAccent} bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold shadow-sm`}>
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-2 leading-snug`}>
                      Create and Download Question Paper
                    </h3>
                    <p className={`${themeClasses.textSecondary} leading-relaxed`}>
                      Choose from two download options: download only the
                      questions or download the questions with their answers.
                      Printing is also available for your convenience.
                    </p>
                  </div>
                </div>
              </div>

              <a href='/TestHistorySavedDashboard' className="inline-block mt-8 text-decoration-none">
                <button 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 hover:scale-105 transition-all duration-200"
                >
                  <span>Start Creating Papers</span>
                  <svg 
                    className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M13 7l5 5m0 0l-5 5m5-5H6" 
                    />
                  </svg>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkPage;