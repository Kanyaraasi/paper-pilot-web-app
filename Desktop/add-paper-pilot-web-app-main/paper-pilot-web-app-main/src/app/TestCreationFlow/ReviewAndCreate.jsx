import React, { useState } from 'react';
import { ArrowLeft, FileText, Clock, Users, CheckCircle, Download, Send, Eye } from 'lucide-react';

const ReviewAndCreate = ({ testData, selectedQuestions, onBack, onComplete }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [created, setCreated] = useState(false);

  const totalMarks = selectedQuestions.reduce((sum, q) => sum + q.marks, 0);
  const questionsByType = selectedQuestions.reduce((acc, q) => {
    acc[q.type] = (acc[q.type] || 0) + 1;
    return acc;
  }, {});

  const questionsByDifficulty = selectedQuestions.reduce((acc, q) => {
    acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
    return acc;
  }, {});

  const handleCreateTest = async () => {
    setIsCreating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsCreating(false);
    setCreated(true);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (created) {
    return (
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="text-center py-16 px-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Test Created Successfully!</h2>
          <p className="text-gray-600 mb-8">Your test "{testData.testName}" has been created and is ready to use.</p>
          
          <div className="flex items-center justify-center space-x-4">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview Test</span>
            </button>
            <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
              <Send className="h-4 w-4" />
              <span>Share with Students</span>
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-white bg-opacity-20 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">Review & Create Test</h1>
            <p className="text-blue-100">Review your test configuration and create the final test</p>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Test Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <FileText className="h-8 w-8 text-blue-600" />
              <div>
                <div className="text-2xl font-bold text-blue-900">{selectedQuestions.length}</div>
                <div className="text-blue-700">Questions</div>
              </div>
            </div>
          </div>
          
          <div className="bg-green-50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Clock className="h-8 w-8 text-green-600" />
              <div>
                <div className="text-2xl font-bold text-green-900">{totalMarks}</div>
                <div className="text-green-700">Total Marks</div>
              </div>
            </div>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-6">
            <div className="flex items-center space-x-3">
              <Users className="h-8 w-8 text-purple-600" />
              <div>
                <div className="text-2xl font-bold text-purple-900">{testData.duration}</div>
                <div className="text-purple-700">Minutes</div>
              </div>
            </div>
          </div>
        </div>

        {/* Test Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Test Information</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Test Name:</span>
                <span className="font-medium">{testData.testName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Subject:</span>
                <span className="font-medium">{testData.subject}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Board:</span>
                <span className="font-medium">{testData.board}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Standard:</span>
                <span className="font-medium">{testData.standard}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Medium:</span>
                <span className="font-medium">{testData.medium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Duration:</span>
                <span className="font-medium">{testData.duration} minutes</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Passing Marks:</span>
                <span className="font-medium">{testData.passingMarks}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Allowed Attempts:</span>
                <span className="font-medium">{testData.allowedAttempts}</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Question Distribution</h3>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3">By Question Type</h4>
              <div className="space-y-2">
                {Object.entries(questionsByType).map(([type, count]) => (
                  <div key={type} className="flex justify-between items-center">
                    <span className="text-gray-600">{type}:</span>
                    <span className="font-medium">{count} questions</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-3">By Difficulty Level</h4>
              <div className="space-y-2">
                {Object.entries(questionsByDifficulty).map(([difficulty, count]) => (
                  <div key={difficulty} className="flex justify-between items-center">
                    <span className="text-gray-600">{difficulty}:</span>
                    <span className="font-medium">{count} questions</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Test Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Test Settings</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${testData.shuffleQuestions ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Shuffle Questions</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${testData.showResults ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Show Results</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${testData.negativeMarking ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Negative Marking</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${testData.scheduledDate ? 'bg-green-500' : 'bg-gray-300'}`} />
              <span className="text-sm text-gray-600">Scheduled</span>
            </div>
          </div>
        </div>

        {/* Selected Questions Preview */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Selected Questions Preview</h3>
          <div className="max-h-64 overflow-y-auto space-y-3">
            {selectedQuestions.map((question, index) => (
              <div key={question.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium text-gray-500">Q{index + 1}.</span>
                      <span className="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">
                        {question.type}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${getDifficultyColor(question.difficulty)}`}>
                        {question.difficulty}
                      </span>
                    </div>
                    <p className="text-gray-900 mb-2">{question.question}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>{question.subject}</span>
                      <span>{question.category}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-gray-900">{question.marks} marks</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Instructions */}
        {testData.instructions && (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Test Instructions</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <p className="text-gray-700">{testData.instructions}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-gray-200 px-8 py-6 bg-gray-50">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Question Selection</span>
          </button>
          
          <button
            onClick={handleCreateTest}
            disabled={isCreating}
            className={`px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:from-green-700 hover:to-emerald-700 transition-all transform hover:scale-[1.02] flex items-center space-x-2 shadow-lg ${
              isCreating ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isCreating ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                <span>Creating Test...</span>
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4" />
                <span>Create Test</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewAndCreate;