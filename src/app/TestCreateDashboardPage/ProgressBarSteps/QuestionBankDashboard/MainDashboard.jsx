'use client';
import { QuestionBankProvider } from './DashbordData/Context/QuestionBankContext';
import Dashboard from './DashbordData/Dashboard';

export default function MainDashboard({ onNext, onPrevious, formData, selectedQuestions, currentStep }) {
  return (
    <QuestionBankProvider>
      <Dashboard 
        onNext={onNext}
        onPrevious={onPrevious}
        formData={formData}
        selectedQuestions={selectedQuestions}
        currentStep={currentStep}
      />
    </QuestionBankProvider>
  );
}