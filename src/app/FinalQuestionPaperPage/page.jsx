'use client'
import React, { useState, useEffect } from 'react';
import { Printer, Download, Eye, Edit3, Save, FileText, Calendar, Clock, User, BookOpen, Star, ArrowLeft, CheckCircle, AlertCircle, MoreVertical, Trash2 } from 'lucide-react';

const FinalQuestionPaperPage = () => {
  // State management
  const [examDetails, setExamDetails] = useState({});
  const [questionPaper, setQuestionPaper] = useState(null);
  const [savedPapers, setSavedPapers] = useState([]);
  const [recentDownloads, setRecentDownloads] = useState([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    // Simulate data loading (since we can't use localStorage)
    const mockExamDetails = {
      schoolName: "Springfield High School",
      subject: "Mathematics",
      grade: "10th Grade",
      date: "June 15, 2025",
      startTime: "10:00 AM",
      endTime: "12:00 PM",
      totalMarks: 50,
      duration: "2 Hours"
    };

    const mockQuestionPaper = [
      {
        id: 1,
        text: 'Let A = {2,4,6,8,10,12} and B = {6,8,10}. Find the value of A∩B and show that A∩B = B.',
        options: null
      },
      {
        id: 2,
        text: 'Solve the quadratic equation: 2x² - 7x + 3 = 0',
        options: null
      },
      {
        id: 3,
        text: 'Which of the following is a prime number?',
        options: ['15', '21', '23', '27']
      },
      {
        id: 4,
        text: 'Find thw the derivative of f(x) = 3x² + 2x - 1',
        options: null
      }
    ];

    const mockSavedPapers = [
      { id: 1, name: "Math Unit Test 1", date: "2025-06-01", subject: "Mathematics" },
      { id: 2, name: "Physics Quiz", date: "2025-05-28", subject: "Physics" },
      { id: 3, name: "Chemistry Test", date: "2025-05-25", subject: "Chemistry" }
    ];

    const mockRecentDownloads = [
      { id: 1, name: "Math Unit Test 1.pdf", date: "2025-06-01", time: "10:30 AM" },
      { id: 2, name: "Physics Quiz.pdf", date: "2025-05-30", time: "2:15 PM" }
    ];

    setExamDetails(mockExamDetails);
    setQuestionPaper(mockQuestionPaper);
    setSavedPapers(mockSavedPapers);
    setRecentDownloads(mockRecentDownloads);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrint = () => {
    showNotification('Question paper sent to printer!');
    // Actual print logic would go here
  };

  const handleDownloadPDF = () => {
    const newDownload = {
      id: Date.now(),
      name: `${examDetails.subject} Test.pdf`,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setRecentDownloads(prev => [newDownload, ...prev.slice(0, 4)]);
    showNotification('PDF downloaded successfully!');
  };

  const handleSavePaper = () => {
    const newPaper = {
      id: Date.now(),
      name: `${examDetails.subject} Test`,
      date: new Date().toISOString().split('T')[0],
      subject: examDetails.subject
    };
    setSavedPapers(prev => [newPaper, ...prev.slice(0, 4)]);
    showNotification('Question paper saved!');
  };

  const handleDeleteSavedPaper = (id) => {
    setSavedPapers(prev => prev.filter(paper => paper.id !== id));
    showNotification('Paper deleted successfully!', 'success');
  };

  const handleDeleteDownload = (id) => {
    setRecentDownloads(prev => prev.filter(download => download.id !== id));
    showNotification('Download removed successfully!', 'success');
  };
  const date=new Date()
  const QuestionPaperPreview = () => (
    <div 
      id="print-section"
      className="border-2 border-gray-300 p-6 text-black bg-white rounded-lg shadow-md"
    >
      {/* School Header */}
      <div className="text-center mb-4">
        <h1 className="text-xl font-bold uppercase tracking-wider">
          {examDetails.schoolName || "School Name"}
        </h1>
        <h2 className="text-base font-semibold mt-1">UNIT TEST - 1</h2>
      </div>

      {/* Exam Details Header */}
      <div className="flex justify-between text-xs mb-3">
        <div>
          <strong>SUBJECT: </strong> {examDetails.subject || "Subject"}
        </div>
        <div>
          <strong>CLASS: </strong> {examDetails.grade || "Grade"}
        </div>
      </div>

      {/* Date and Time Details */}
      <div className="flex justify-between text-xs mb-3">
        <div>
          <strong>DATE: </strong> {}
        </div>
        
      </div>

      {/* General Instructions */}
      <div className="mb-3 text-xs">
        <strong>General Instructions: </strong>All questions are compulsory.
      </div>
      
      <div className="border-t border-gray-300 my-3"></div>
      
      {/* Questions */}
      {questionPaper?.map((question, index) => (
        <div key={question.id} className="mb-2">
          <p className="text-xs font-medium">
            Q{index + 1}. {question.text} 
            <span className="float-right">[1 Mark]</span>
          </p>
          {question.options && (
            <div className="ml-4 mt-2 space-y-1">
              {question.options.map((option, optIndex) => (
                <div 
                  key={optIndex} 
                  className="text-xs"
                >
                  <span className="mr-2">
                    {String.fromCharCode(97 + optIndex)})
                  </span>
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Answer Space */}
      <div className="mt-6 pt-2 border-t border-gray-300">
        <p className="text-center font-semibold text-xs">*** END OF THE QUESTION PAPER ***</p>
      </div>
    </div>
  );

  const Dashboard = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Saved Question Papers */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Save className="w-5 h-5 text-blue-600" />
            Saved Question Papers
          </h3>
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
            {savedPapers.length} papers
          </span>
        </div>
        <div className="space-y-3">
          {savedPapers.map((paper) => (
            <div key={paper.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center gap-3">
                <FileText className="w-4 h-4 text-gray-600" />
                <div>
                  <p className="font-medium text-sm text-gray-800">{paper.name}</p>
                  <p className="text-xs text-gray-500">{paper.subject} • {paper.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-500 cursor-pointer hover:text-yellow-600" />
                <button
                  onClick={() => handleDeleteSavedPaper(paper.id)}
                  className="p-1 hover:bg-red-100 rounded"
                >
                  <Trash2 className="w-3 h-3 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Downloads */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <Download className="w-5 h-5 text-green-600" />
            Recent Downloads
          </h3>
          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
            {recentDownloads.length} files
          </span>
        </div>
        <div className="space-y-3">
          {recentDownloads.map((download) => (
            <div key={download.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                  <FileText className="w-4 h-4 text-red-600" />
                </div>
                <div>
                  <p className="font-medium text-sm text-gray-800">{download.name}</p>
                  <p className="text-xs text-gray-500">{download.date} • {download.time}</p>
                </div>
              </div>
              <button
                onClick={() => handleDeleteDownload(download.id)}
                className="p-1 hover:bg-red-100 rounded"
              >
                <Trash2 className="w-3 h-3 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      
    </div>
  );

  const QuestionPaperView = () => (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          <Printer className="w-5 h-5" />
          Print Question Paper
        </button>
        
        <button
          onClick={handleDownloadPDF}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </button>
        
        <button
          onClick={handleSavePaper}
          className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
        >
          <Save className="w-5 h-5" />
          Save Paper
        </button>
        
      </div>

      {/* Question Paper Preview */}
      <div className="max-w-4xl mx-auto">
        <QuestionPaperPreview />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? 
              <CheckCircle className="w-5 h-5" /> : 
              <AlertCircle className="w-5 h-5" />
            }
            {notification.message}
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-white shadow-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => window.history.back()}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="ml-4 text-2xl font-bold text-gray-800">Final Question Paper</h1>
       

            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600 flex gap-1 item-center">
                <Calendar className="w-4 h-4 inline mt-0.5" />
                       <div>
  <strong>DATE: </strong> {new Date().toLocaleDateString()}
</div>
              </div>
             
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Recently Saved / Recently Download
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('preview')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'preview'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                Question Paper
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' ? <Dashboard /> : <QuestionPaperView />}
      </div>
    </div>
  );
};

export default FinalQuestionPaperPage;
