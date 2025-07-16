'use client'
import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import ProgressBar from '../Components/ProgressBar/ProgressBar';
import Loading from '../Components/Loader/Loading';
import Footer from '../FooterPage/page';

// Lazy load components for better performance
const TestDashboard = lazy(() => import('./ProgressBarSteps/TestDetailsPage/TestDetailsPage'));
const MainDashboard = lazy(() => import('./ProgressBarSteps/QuestionBankDashboard/MainDashboard'));
const FinalQuestionPaperPage = lazy(() => import('./ProgressBarSteps/QuestionPaper/QuestionPaperPage'));

const TestCreateDashboardPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({});
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  // Load state from localStorage on component mount with error handling
  useEffect(() => {
    try {
      const savedStep = localStorage.getItem('testDashboard_currentStep');
      const savedFormData = localStorage.getItem('testDashboard_formData');
      const savedQuestions = localStorage.getItem('testDashboard_selectedQuestions');

      if (savedStep) {
        const step = parseInt(savedStep, 10);
        if (step >= 1 && step <= 3) {
          setCurrentStep(step);
        }
      }
      if (savedFormData) {
        try {
          setFormData(JSON.parse(savedFormData));
        } catch (parseError) {
          console.warn('Failed to parse saved form data:', parseError);
          localStorage.removeItem('testDashboard_formData');
        }
      }
      if (savedQuestions) {
        try {
          setSelectedQuestions(JSON.parse(savedQuestions));
        } catch (parseError) {
          console.warn('Failed to parse saved questions:', parseError);
          localStorage.removeItem('testDashboard_selectedQuestions');
        }
      }
    } catch (error) {
      console.error('Error loading saved state:', error);
    }
  }, []);

  // Save state to localStorage whenever it changes with error handling
  useEffect(() => {
    try {
      localStorage.setItem('testDashboard_currentStep', currentStep.toString());
    } catch (error) {
      console.error('Failed to save current step:', error);
    }
  }, [currentStep]);

  useEffect(() => {
    try {
      localStorage.setItem('testDashboard_formData', JSON.stringify(formData));
    } catch (error) {
      console.error('Failed to save form data:', error);
    }
  }, [formData]);

  useEffect(() => {
    try {
      localStorage.setItem('testDashboard_selectedQuestions', JSON.stringify(selectedQuestions));
    } catch (error) {
      console.error('Failed to save selected questions:', error);
    }
  }, [selectedQuestions]);

  const handleStepClick = useCallback((stepNumber) => {
    if (stepNumber >= 1 && stepNumber <= 3 && (stepNumber <= currentStep || stepNumber === currentStep - 1)) {
      setCurrentStep(stepNumber);
    }
  }, [currentStep]);

  const handleNextStep = useCallback((data) => {
    if (currentStep === 1) {
      setFormData(data);
    } else if (currentStep === 2) {
      setSelectedQuestions(data);
    }
    
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  }, [currentStep]);

  const handlePreviousStep = useCallback(() => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  }, [currentStep]);

  const clearAllData = useCallback(() => {
    try {
      localStorage.removeItem('testDashboard_currentStep');
      localStorage.removeItem('testDashboard_formData');
      localStorage.removeItem('testDashboard_selectedQuestions');
      setCurrentStep(1);
      setFormData({});
      setSelectedQuestions([]);
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  }, []);

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Suspense fallback={<Loading />}>
            <TestDashboard
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              formData={formData}
              currentStep={currentStep}
            />
          </Suspense>
        );
      case 2:
        return (
          <Suspense fallback={<Loading />}>
            <MainDashboard
              onNext={handleNextStep}
              onPrevious={handlePreviousStep}
              formData={formData}
              selectedQuestions={selectedQuestions}
              currentStep={currentStep}
            />
          </Suspense>
        );
      case 3:
        return (
          <Suspense fallback={<Loading />}>
            <FinalQuestionPaperPage
              onPrevious={handlePreviousStep}
              formData={formData}
              selectedQuestions={selectedQuestions}
              currentStep={currentStep}
              onClearAll={clearAllData}
            />
          </Suspense>
        );
      default:
        return (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-700">Invalid Step</h2>
              <p className="text-gray-500 mt-2">Please start from step 1.</p>
              <button 
                onClick={() => setCurrentStep(1)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Go to Step 1
              </button>
            </div>
          </div>
        );
    }
  };

  return (
<div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 ">      <ProgressBar currentStep={currentStep} onStepClick={handleStepClick} />
      <div className="">
        {renderCurrentStep()}
      </div>
      <Footer />
    </div>
  );
};

export default TestCreateDashboardPage;