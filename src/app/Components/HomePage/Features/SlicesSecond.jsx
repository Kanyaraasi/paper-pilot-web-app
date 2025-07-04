import React from "react";
import Image from "next/image";
import { useTheme } from "@/contexts/ThemeContext";

export default function SlicesSecond() {
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
    <div className={`h-[50vh] ${themeClasses.pageBackground} flex items-center justify-center`}>
      <div className="max-w-6xl w-full flex justify-center gap-12 items-center">
        
        <div className="space-y-6">
          <Image
            src="/question-generator-main-feature2.svg"
            alt="Paper Pilot Study Fest"
            className="w-full h-full object-cover rounded-lg"
            width={50}
            height={40}
            priority
          />
        </div>
        {/* Right Content */}
        <div className="space-y-6">
          <h1 className={`text-5xl font-bold ${themeClasses.textPrimary} leading-tight`}>
            Perfect for Teachers & Students
          </h1>
          <p className={`text-lg ${themeClasses.textSecondary} leading-relaxed`}>
            Looking for a tool to create multiple-choice quizzes for your
            students or turn your study materials into a quiz? Our AI quiz
            generator can help you with both.
          </p>
        </div>
      </div>
    </div>
  );
}