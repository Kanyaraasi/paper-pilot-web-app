'use client'
import React from 'react';
import Link from 'next/link';
import { Mail, Heart } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const Footer = () => {
  const { theme } = useTheme();
  const currentYear = new Date().getFullYear();
  
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
    <footer className={`${themeClasses.pageBackground} transition-colors duration-200`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            <Link 
              href="/"
              className={`${themeClasses.textMuted} hover:${themeClasses.textSecondary} flex items-center justify-center gap-3 transition-colors duration-200`}
              aria-label="Email"
            >
              <Mail size={20} /> @paperpilott@gmail.com
            </Link>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className={`text-center md:text-right text-base ${themeClasses.textMuted}`}>
              &copy; {currentYear} paperpilott. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className={`mt-8 border-t ${themeClasses.cardHeader} pt-8`}>
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <Link 
                href="/PrivacyPage" 
                className={`text-sm ${themeClasses.textMuted} hover:${themeClasses.textSecondary} border-r-2 px-2 ${themeClasses.cardHeader} transition-colors duration-200`}
              >
                Privacy
              </Link>
              <Link 
                href="/TermsAndConditionPage" 
                className={`text-sm ${themeClasses.textMuted} hover:${themeClasses.textSecondary} border-r-2 px-2 ${themeClasses.cardHeader} transition-colors duration-200`}
              >
                Terms
              </Link>
              <Link 
                href="/HowItWorkPage" 
                className={`text-sm ${themeClasses.textMuted} hover:${themeClasses.textSecondary} px-2 transition-colors duration-200`}
              >
                How It Works
              </Link>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center justify-center md:justify-end">
              <span className={`text-sm ${themeClasses.textMuted} flex items-center`}>
                Made with <Heart size={14} className="mx-1 text-red-500" /> for Teacher's
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;