'use client'
import { useTheme } from "@/contexts/ThemeContext";
import Image from "next/image";
import React from "react";

const HowItWorkPage = () => {
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gray-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      gradientBg: isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100',
    };
  };

  const themeClasses = getThemeClasses();

  const steps = [
    {
      title: "Login Required",
      description: "Secure authentication with unique key ID for data privacy and security."
    },
    {
      title: "Fill Details",
      description: "Select grade, subject, and exam details for accurate paper generation."
    },
    {
      title: "Choose Questions",
      description: "Filter and select from various question types: fill-ups, match pairs, short answers, etc."
    },
    {
      title: "Generate Paper",
      description: "Download questions only or with answers. Print option available for convenience."
    }
  ];

  return (
    <div className={`w-full ${themeClasses.pageBackground} py-8 px-4 transition-colors duration-200`}>
      <div className={`max-w-6xl mx-auto ${themeClasses.cardBackground} rounded-xl shadow-lg overflow-hidden`}>
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Container - Image */}
          <div className="lg:w-2/5 flex items-center justify-center">
            <div className="relative w-full max-w-sm">
              <Image 
                src='/how-it-work.jpg' 
                width={450} 
                height={450} 
                alt="How It Works Illustration"
                className="w-full h-auto "
              />
            </div>
          </div>

          {/* Right Container - Content */}
          <div className="lg:w-3/5 p-6 lg:p-8">
            <div className="max-w-2xl">
              
              {/* Header */}
              <div className="mb-4">
                <h2 className={`text-2xl lg:text-3xl font-bold mb-3`}>
                  How It Works
                </h2>
                <p className={`${themeClasses.textSecondary} text-base lg:text-lg`}>
                  Create your papers in four simple steps :
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-2">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1 pt-1">
                      <h3 className={`text-base lg:text-lg font-semibold ${themeClasses.textPrimary} mb-1`}>
                        {step.title}
                      </h3>
                      <p className={`${themeClasses.textSecondary} text-sm lg:text-base leading-relaxed`}>
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <div className="mt-4">
                <a href='/' className="inline-block text-decoration-none">
                  <button className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg font-medium shadow-md hover:shadow-lg hover:from-blue-700 hover:to-blue-800 transform hover:scale-105 transition-all duration-200 text-sm lg:text-base">
                    <span>Start Creating Papers</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-200"
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
    </div>
  );
};

export default HowItWorkPage;