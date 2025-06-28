'use client';
import { useEffect } from 'react';
import { QuestionBankProvider } from './DashbordData/Context/QuestionBankContext';
import Dashboard from './DashbordData/Dashboard';

export default function MainDashboard({
  formData,
  onNext,
  onPrevious,
  selectedQuestions,
  currentStep,
}) {
  useEffect(() => {
    const handleLoad = () => {
      window.scrollTo(0, 0);
    };

    // If the page is already loaded, scroll immediately
    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      // Otherwise, wait for the window to load
      window.addEventListener('load', handleLoad);
    }

    // Cleanup
    return () => {
      window.removeEventListener('load', handleLoad);
    };
  }, []);

  return (
    <QuestionBankProvider
      formData={formData}
      onNext={onNext}
      onPrevious={onPrevious}
      selectedQuestions={selectedQuestions}
      currentStep={currentStep}
    >
      <Dashboard />
    </QuestionBankProvider>
  );
}