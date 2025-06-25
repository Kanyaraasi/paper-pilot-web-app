'use client';
import { QuestionBankProvider } from './DashbordData/Context/QuestionBankContext';
import Dashboard from './DashbordData/Dashboard';

export default function MainDashboard() {
  return (
    <QuestionBankProvider>
      <Dashboard />
    </QuestionBankProvider>
  );
}