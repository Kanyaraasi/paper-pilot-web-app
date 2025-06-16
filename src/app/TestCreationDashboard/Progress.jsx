import React from 'react';
import { CheckCircle } from 'lucide-react';
import { useProgress } from './ProgressContext';

const Progress = () => {
  const { steps, currentStep } = useProgress();

  return (
    <div className="bg-white border-b px-4 py-4">
      <div className="flex items-center justify-center space-x-6 max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200 ${
                step.number === currentStep
                  ? 'bg-blue-600 text-white shadow-lg'
                  : step.completed
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step.completed ? <CheckCircle className="h-4 w-4" /> : step.number}
              </div>
              <div className="mt-1 text-center">
                <p className={`text-xs font-medium transition-colors duration-200 ${
                  step.number === currentStep ? 'text-blue-600' : 'text-gray-600'
                }`}>
                  {step.title}
                </p>
                {step.description && (
                  <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
                )}
              </div>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-12 h-0.5 mx-3 transition-colors duration-300 ${
                step.completed ? 'bg-green-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Progress;