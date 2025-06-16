import React, { useState } from 'react';
import { ProgressProvider } from './ProgressContext';
import TestCreationDashboard from './TestCreationDashboard';
import Dashboard from './components/Dashboard';

function Page() {
  const [currentView, setCurrentView] = useState('testCreation'); // 'testCreation' or 'dashboard'

  const handleNavigateToDashboard = () => {
    setCurrentView('dashboard');
  };

  const handleNavigateToTestCreation = () => {
    setCurrentView('testCreation');
  };

  return (
    <ProgressProvider>
      <div className="min-h-screen bg-gray-100">
        {currentView === 'testCreation' ? (
          <TestCreationDashboard onNavigateToDashboard={handleNavigateToDashboard} />
        ) : (
          <Dashboard onNavigateToTestCreation={handleNavigateToTestCreation} />
        )}
      </div>
    </ProgressProvider>
  );
}

export default Page;