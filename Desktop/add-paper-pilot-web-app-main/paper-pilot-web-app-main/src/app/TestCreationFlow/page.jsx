'use client';
import React, { useState, useEffect } from 'react';
import { CheckCircle,FileText,HelpCircle,Eye } from 'lucide-react';
import TestCreationDashboard from './TestCreationDashboard';
// import QuestionSelection from './QuestionSelection';
import ReviewAndCreate from './ReviewAndCreate';
import DashboardMain from './QuestionPaperPage/DashboardMain';
import Footer from '../Footer/page';


const Page = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [testData, setTestData] = useState(null);
  const [selectedQuestions, setSelectedQuestions] = useState([]);

  const steps = [
    { 
      id: 1, 
      title: 'Test Details', 
      description: 'Basic information and settings',
      icon: FileText
    },
    { 
      id: 2, 
      title: 'Select Questions', 
      description: 'Choose questions from question bank',
      icon: HelpCircle
    },
    { 
      id: 3, 
      title: 'Final Question Paper', 
      description: 'Finalize Your Question Paper',
      icon: Eye
    }
  ];

  const handleNext = (data) => {
    if (currentStep === 1) {
      setTestData(data);
      setCurrentStep(2);
    } else if (currentStep === 2) {
      setSelectedQuestions(data.selectedQuestions || data);
      setCurrentStep(3);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    console.log('Test created successfully!', { testData, selectedQuestions });
    alert('Test created successfully!');
    setCurrentStep(1);
  };

 const ProgressBar = () => (
  <div className="w-full mx-auto bg-white py-8">
    <div className="flex items-center justify-center gap-16">
      {steps.map((step, index) => {
        const isActive = currentStep === step.id;
        const isCompleted = currentStep > step.id;

        return (
          <div key={step.id} className="flex flex-col items-center text-center">
            {/* Step Number Circle */}
            <div className={`
              w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm mb-2
              ${isCompleted ? 'bg-green-500 text-white' : 
                isActive ? 'bg-red-500 text-white' : 'bg-red-100 text-red-500'}
            `}>
              {step.id}
            </div>

            {/* Step Title */}
            <div className={`text-sm font-semibold 
              ${isActive ? 'text-gray-900' : 'text-gray-500'}
            `}>
              {step.title}
            </div>

            {/* Step Description */}
            <div className={`text-xs mt-1 
              ${isActive ? 'text-gray-600' : 'text-gray-400'}
            `}>
              {step.description}
            </div>
          </div>
        );
      })}
    </div>
  </div>
);

  return (
    <div className="min-h-screen bg-gray-100 ">
      <div className=" mx-auto">
        <ProgressBar />

        <div className=" mx-auto">
          {currentStep === 1 && (
            <TestCreationDashboard onNext={handleNext} />
          )}

          {currentStep === 2 && (
            <DashboardMain 
              testData={testData}
              onNext={handleNext} 
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && (
            <ReviewAndCreate 
              testData={testData}
              selectedQuestions={selectedQuestions}
              onBack={handleBack}
              onComplete={handleComplete}
            />
          )}
        </div>
        <Footer/>
      </div>
    </div>
  );
};

export default Page;
