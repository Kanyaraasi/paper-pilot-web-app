'use client'
import React, { useState } from 'react';
import ProgressBar from '../Components/ProgressBar/ProgressBar';
import TestDetailsPage from './ProgressBarSteps/TestDetailsPage/TestDetailsPage';
import MainDashboard from './ProgressBarSteps/QuestionBankDashboard/MainDashboard';
import QuestionPaperPage from './ProgressBarSteps/QuestionPaper/QuestionPaperPage';
import Footer from '../FooterPage/page';

const TestCreationDashboard = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const handleStepClick = (stepNumber) => {
    if (stepNumber <= currentStep || stepNumber === currentStep - 1) {
      setCurrentStep(stepNumber);
    }
  };

  const handleNextStep = (data) => {
    if (currentStep === 1) {
      setFormData(data);
    } else if (currentStep === 2) {
      setSelectedQuestions(data);
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TestDetailsPage
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            formData={formData}
            currentStep={currentStep}
          />
        );
      case 2:
        return (
          <MainDashboard
            onNext={handleNextStep}
            onPrevious={handlePreviousStep}
            formData={formData}
            selectedQuestions={selectedQuestions}
            currentStep={currentStep}
          />
        );
      case 3:
        return (
          <QuestionPaperPage
            onPrevious={handlePreviousStep}
            formData={formData}
            selectedQuestions={selectedQuestions}
            currentStep={currentStep}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
      {renderCurrentStep()}
      <Footer/>
    </div>
  );
};

export default TestCreationDashboard;