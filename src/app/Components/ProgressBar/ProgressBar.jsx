import React from 'react';
import { CheckCircle, FileText, Database, Eye } from 'lucide-react';

const ProgressBar = ({ currentStep, onStepClick }) => {
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

  return (
    <div className="bg-white border-b px-4 py-4">
      <div className="flex items-center justify-center space-x-6 max-w-2xl mx-auto">
        {steps.map((step, index) => {
          const Icon = step.icon;
          const isCompleted = step.number < currentStep;
          const isActive = step.number === currentStep;
          const isClickable = step.number <= currentStep;
          
          return (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <button
                  onClick={() => isClickable && onStepClick(step.number)}
                  disabled={!isClickable}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg scale-110'
                      : isCompleted
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-gray-200 text-gray-600'
                  } ${isClickable ? 'cursor-pointer hover:shadow-md' : 'cursor-not-allowed'}`}
                >
                  {isCompleted ? (
                    <CheckCircle className="h-5 w-5" />
                  ) : (
                    <Icon className="h-5 w-5" />
                  )}
                </button>
                <div className="mt-2 text-center">
                  <p className={`text-sm font-medium ${
                    isActive ? 'text-blue-600' : isCompleted ? 'text-green-600' : 'text-gray-600'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-16 h-0.5 mx-4 transition-all duration-300 ${
                  isCompleted ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;