import React from 'react';
import { CheckCircle, FileText, Database, Eye } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

const ProgressBar = ({ currentStep, onStepClick }) => {
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
  const isDark = theme === 'dark';

  const steps = [
    { 
      number: 1, 
      title: 'Test Details', 
      description: 'Fill out test details',
      icon: FileText
    },
    { 
      number: 2, 
      title: 'Question Bank', 
      description: 'Select Question Types',
      icon: Database
    },
    { 
      number: 3, 
      title: 'Question Paper', 
      description: 'Preview & Download',
      icon: Eye
    }
  ];

  const getStepStyles = (step) => {
    const isCompleted = step.number < currentStep;
    const isActive = step.number === currentStep;
    const isClickable = step.number <= currentStep;

    if (isActive) {
      return {
        button: `${themeClasses.buttonPrimary} shadow-lg scale-110`,
        title: themeClasses.iconAccent,
        description: themeClasses.textMuted
      };
    }

    if (isCompleted) {
      return {
        button: `${isDark ? 'bg-green-600 hover:bg-green-700' : 'bg-green-500 hover:bg-green-600'} text-white`,
        title: themeClasses.iconSuccess,
        description: themeClasses.textMuted
      };
    }

    return {
      button: `${isDark ? 'bg-gray-700 text-gray-400' : 'bg-gray-200 text-gray-600'} ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed'}`,
      title: themeClasses.textSecondary,
      description: themeClasses.textMuted
    };
  };

  const getConnectorStyle = (index) => {
    const isCompleted = steps[index].number < currentStep;
    return `w-16 h-0.5 mx-4 transition-all duration-300 ${
      isCompleted 
        ? (isDark ? 'bg-green-600' : 'bg-green-500')
        : (isDark ? 'bg-gray-600' : 'bg-gray-200')
    }`;
  };

  return (
    <div className={`${themeClasses.cardBackground} border-b px-4 py-4`}>
      <div className="flex items-center justify-center space-x-6 max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.number < currentStep;
          const isClickable = step.number <= currentStep;
          const stepStyles = getStepStyles(step);
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${stepStyles.button}`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${stepStyles.title}`}>
                    {step.title}
                  </p>
                  <p className={`text-xs mt-0.5 ${stepStyles.description}`}>
                    {step.description}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={getConnectorStyle(index)} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;