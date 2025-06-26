'use client';
import { QuestionBankProvider } from './DashbordData/Context/QuestionBankContext';
import Dashboard from './DashbordData/Dashboard';

export default function MainDashboard({
  formData,
  onNext,
  onPrevious,
  selectedQuestions,
  currentStep,
}) {
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
