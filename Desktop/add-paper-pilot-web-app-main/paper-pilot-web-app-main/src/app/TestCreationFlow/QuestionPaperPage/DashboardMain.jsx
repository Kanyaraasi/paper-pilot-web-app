'use client'
import React, { useState, useEffect } from 'react';
// import { ArrowLeft, ArrowRight } from 'lucide-react';
import Dashboard from './DashbordData/Dashboard';

const DashboardMain = ({ testData, onNext, onBack }) => {
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [currentMarks, setCurrentMarks] = useState(0);

  // Calculate total marks whenever selectedQuestions changes
  useEffect(() => {
    const totalMarks = selectedQuestions.reduce((sum, question) => {
      return sum + (parseInt(question.marks) || 1);
    }, 0);
    setCurrentMarks(totalMarks);
  }, [selectedQuestions]);

  const handleQuestionSelection = (questions, totalMarks) => {
    console.log('Questions selected:', questions);

    setCurrentMarks(totalMarks);
  };

  const handleNext = () => {
    if (selectedQuestions.length === 0) {
      alert('Please select at least one question to continue.');
      return;
    }

    const questionData = {
      selectedQuestions,
      currentMarks,
      totalQuestions: selectedQuestions.length
    };

    console.log('Passing to next step:', questionData); 
    onNext(questionData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 w-[100%]">
      {/* Header with test info */}
      {/* <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Select Questions</h1>
              <p className="text-sm text-gray-600 mt-1">
                Test: <span className="font-medium">{testData?.testName}</span> • 
                Subject: <span className="font-medium">{testData?.subject}</span> • 
                Total Marks: <span className="font-medium">{testData?.totalMarks}</span>
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">
                Selected: <span className="font-semibold text-blue-600">{selectedQuestions.length}</span> questions
              </div>
              <div className="text-sm text-gray-600">
                Current Marks: <span className="font-semibold text-green-600">{currentMarks}</span> / {testData?.totalMarks}
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* Question Bank Dashboard */}
      <Dashboard 
        testData={testData}
        onQuestionSelection={handleQuestionSelection}
        targetMarks={parseInt(testData?.totalMarks || 0)}
        selectedQuestions={selectedQuestions}
        setSelectedQuestions={setSelectedQuestions}
        onBack={onBack}
      />

      {/* Navigation Footer */}
      {/* <div className="bg-white border-t border-gray-200 px-4 py-4 sticky bottom-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-600">
              Progress: {currentMarks > 0 ? Math.round((currentMarks / parseInt(testData?.totalMarks || 1)) * 100) : 0}% of target marks
            </div>
            <button
              onClick={handleNext}
              disabled={selectedQuestions.length === 0}
              className={`flex items-center space-x-2 px-8 py-3 rounded-lg transition-all ${
                selectedQuestions.length > 0
                  ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Review & Create Test</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
};
export default DashboardMain
