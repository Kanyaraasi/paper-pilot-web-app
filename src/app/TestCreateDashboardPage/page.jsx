'use client'
import React, { useState, useEffect } from 'react';
import ProgressBar from '../Components/ProgressBar/ProgressBar';
import TestDashboard from './ProgressBarSteps/TestDetailsPage/TestDetailsPage';
import MainDashboard from './ProgressBarSteps/QuestionBankDashboard/MainDashboard';
import FinalQuestionPaperPage from './ProgressBarSteps/QuestionPaper/QuestionPaperPage';
import Footer from '../FooterPage/page';

const TestCreateDashboardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedStep = localStorage.getItem('testDashboard_currentStep');
    const savedFormData = localStorage.getItem('testDashboard_formData');
    const savedQuestions = localStorage.getItem('testDashboard_selectedQuestions');

    if (savedStep) {
      setCurrentStep(parseInt(savedStep));
    }
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
    if (savedQuestions) {
      setSelectedQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('testDashboard_currentStep', currentStep.toString());
  }, [currentStep]);

  useEffect(() => {
    localStorage.setItem('testDashboard_formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('testDashboard_selectedQuestions', JSON.stringify(selectedQuestions));
  }, [selectedQuestions]);

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

  const clearAllData = () => {
    localStorage.removeItem('testDashboard_currentStep');
    localStorage.removeItem('testDashboard_formData');
    localStorage.removeItem('testDashboard_selectedQuestions');
    setCurrentStep(1);
    setFormData({});
    setSelectedQuestions([]);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TestDashboard
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
          <FinalQuestionPaperPage
            onPrevious={handlePreviousStep}
            formData={formData}
            selectedQuestions={selectedQuestions}
            currentStep={currentStep}
            onClearAll={clearAllData}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="">
        {renderCurrentStep()}
      </div>
      <Footer />
    </div>
  );
};

export default TestCreateDashboardPage;