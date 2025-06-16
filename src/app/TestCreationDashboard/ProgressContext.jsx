import React, { createContext, useContext, useState } from 'react';

const ProgressContext = createContext(undefined);

const initialSteps = [
  { 
    number: 1, 
    title: 'Test Details', 
    description: 'Fill out test details', 
    completed: false 
  },
  { 
    number: 2, 
    title: 'Question Bank', 
    description: 'Select Question Types', 
    completed: false 
  },
  { 
    number: 3, 
    title: 'Question Paper (Ready)', 
    description: 'Generate final paper', 
    completed: false 
  }
];

export const ProgressProvider = ({ children }) => {
  const [steps, setSteps] = useState(initialSteps);
  const [currentStep, setCurrentStep] = useState(1);

  const markStepCompleted = (stepNumber) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.number === stepNumber 
          ? { ...step, completed: true }
          : step
      )
    );
  };

  const markStepIncomplete = (stepNumber) => {
    setSteps(prevSteps => 
      prevSteps.map(step => 
        step.number === stepNumber 
          ? { ...step, completed: false }
          : step
      )
    );
  };

  const resetProgress = () => {
    setSteps(initialSteps);
    setCurrentStep(1);
  };

  const value = {
    steps,
    currentStep,
    setCurrentStep,
    markStepCompleted,
    markStepIncomplete,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};