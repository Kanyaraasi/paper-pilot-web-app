'use client'
import React, { useState, useEffect } from 'react';
import { Printer, Download, Save, ArrowLeft, CheckCircle, AlertCircle, Eye, School } from 'lucide-react';

const FinalQuestionPaperPage = () => {
  const [examDetails, setExamDetails] = useState({});
  const [questionPaper, setQuestionPaper] = useState(null);
  const [notification, setNotification] = useState(null);
  const [includeInstructions, setIncludeInstructions] = useState(true);
  const [includeWatermark, setIncludeWatermark] = useState(false);
  const [schoolName, setSchoolName] = useState("ST. XAVIER'S HIGH SCHOOL");

  useEffect(() => {
    const mockExamDetails = {
      assessmentType: "Summative Assessment -1 (2024-2025)",
      subject: "SOCIAL SCIENCE",
      className: "IX",
      maxMarks: "90",
      duration: "3 Hours"
    };

    const mockQuestionPaper = [
      {
        id: 1,
        text: 'Who re-introduced slavery in France?',
        marks: 1
      },
      {
        id: 2,
        text: 'Which two island countries are India\'s southern neighbours?',
        marks: 1
      },
      {
        id: 3,
        text: 'Who led the military coup in Pakistan in 1999?',
        marks: 1
      },
      {
        id: 4,
        text: 'Name the countries which are the permanent members of Security Council.',
        marks: 1
      },
      {
        id: 5,
        text: 'What is apartheid?',
        marks: 1
      },
      {
        id: 6,
        text: 'Define disguised unemployment.',
        marks: 1
      },
      {
        id: 7,
        text: 'What do you mean by \'Infant Mortality Rate\'?',
        marks: 1
      },
      {
        id: 8,
        text: 'What is the main aim of \'Sarva Shiksha Abhiyan\'?',
        marks: 1
      },
      {
        id: 9,
        text: 'Who was Napoleon Bonaparte? What reforms did he introduce in France?',
        marks: 3
      },
      {
        id: 10,
        text: 'State any three factors which made Weimer Republic politically fragile.',
        marks: 3
      },
      {
        id: 11,
        text: 'How was the Nazi ideology taught to the youth in Germany?',
        marks: 3
      },
      {
        id: 12,
        text: 'Which group of islands of India is located in Arabian Sea? Write any four features of these islands.',
        marks: 3
      },
      {
        id: 13,
        text: 'How did India\'s contact with rest of the world contribute in the exchange of ideas and commodities?',
        marks: 3
      },
      {
        id: 14,
        text: '\'Lakes are of great value to human beings\'. Support this statement.',
        marks: 3
      },
      {
        id: 15,
        text: 'Who was elected as the President of Chile in 1970? What measures did he take to help the poor?',
        marks: 3
      },
      {
        id: 16,
        text: '\'There are many instances of denial of equal right to vote.\' Explain the statement with three examples.',
        marks: 3
      },
      {
        id: 17,
        text: 'What is meant by the term \'Secular\' and \'Sovereign\'? Explain.',
        marks: 3
      }
    ];

    setExamDetails(mockExamDetails);
    setQuestionPaper(mockQuestionPaper);
  }, []);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  const handlePrint = () => {
    showNotification('Question paper sent to printer!');
    setTimeout(() => {
      window.print();
    }, 500);
  };

  const handleDownloadPDF = () => {
    showNotification('PDF generation started...');
    setTimeout(() => {
      showNotification('PDF downloaded successfully!');
    }, 1500);
  };

  const handleSaveTemplate = () => {
    showNotification('Question paper template saved!');
  };

  const handleToggleInstructions = () => {
    setIncludeInstructions(!includeInstructions);
    showNotification(
      includeInstructions ? 'Instructions removed' : 'Instructions added'
    );
  };

  const handleToggleWatermark = () => {
    setIncludeWatermark(!includeWatermark);
    showNotification(
      includeWatermark ? 'Watermark removed' : 'Watermark added'
    );
  };

  const getTotalMarks = () => {
    return questionPaper?.reduce((total, question) => total + (question.marks || 1), 0) || 0;
  };

  const generalInstructions = [
    "Questions from serial no. 1 to 8 are 1 mark questions.",
    "Questions from serial no. 9-17 are 3 marks questions.",
    "Questions from serial no. 18-25 are 5 marks questions.",
    "Question no. 26 and 27 are map questions of 3 marks each.",
    "NOTE: Questions no. 6, 7, 8, 16, 17 and 24, 25 are Economics questions which are to be done on separate answer sheet."
  ];

  const QuestionPaperPreview = () => (
    <div 
      id="print-section"
      className="bg-white text-black relative overflow-hidden text-base leading-snug p-6 min-h-screen mx-auto"
    >
      {/* Watermark */}
      {includeWatermark && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none transform -rotate-45 opacity-5 z-10"
        >
          <div className="text-center text-6xl font-bold text-black tracking-widest">
            <div>{schoolName}</div>
            <div className="text-3xl mt-4">CONFIDENTIAL</div>
          </div>
        </div>
      )}

      <div className="relative z-20">
        {/* School Header (if watermark is enabled) */}
        <div className="text-center mb-2">
          <div className="text-xl font-bold">
            {schoolName}
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center mb-4">
          <div className="text-base font-normal mb-4">
            SUBJECT - {examDetails.subject}
          </div>
          <div className="flex justify-between items-center text-sm">
            <span>Class – {examDetails.className}</span>
            <span>Time – {examDetails.duration}</span>
            <span>MM – {examDetails.maxMarks}</span>
          </div>
        </div>

        {/* Instructions */}
        {includeInstructions && (
          <div className="mb-6">
            <div className="text-sm font-normal mb-2">
              Instructions:-
            </div>
            <div className="text-xs pl-4">
              {generalInstructions.map((instruction, index) => (
                <div key={index} className="mb-1 flex items-start">
                  <span className="mr-2 flex-shrink-0">({index + 1})</span>
                  <span>{instruction}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Separator line before questions */}
        <div className="border-b border-black mb-4"></div>

        {/* Questions */}
        <div>
          {questionPaper?.map((question, index) => (
            <div key={question.id} className={`flex justify-between items-start ${
              index < 8 ? 'mb-3' : 'mb-4'
            } break-inside-avoid`}>
              <div className="flex-grow pr-4">
                <span className="text-sm font-normal mr-1">
                  {question.id}.
                </span>
                <span className="text-sm">{question.text}</span>
              </div>
              <div className="text-sm font-normal flex-shrink-0 text-right min-w-8">
                [{question.marks}]
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-50 px-6 py-4 rounded-xl shadow-2xl text-white font-medium transform transition-all duration-500 ${
          notification.type === 'success' ? 'bg-emerald-500' : 'bg-red-500'
        } animate-pulse`}>
          <div className="flex items-center gap-3">
            {notification.type === 'success' ? 
              <CheckCircle className="w-5 h-5" /> : 
              <AlertCircle className="w-5 h-5" />
            }
            <span className="text-sm">{notification.message}</span>
          </div>
        </div>
      )}

      {/* Enhanced Header */}
      <div className="bg-white shadow-lg border-b border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="p-3 hover:bg-gray-50 rounded-xl transition-all duration-200 hover:shadow-md"
              >
                <ArrowLeft className="w-6 h-6 text-gray-700" />
              </button>
              <div className="border-l border-gray-200 pl-4">
                <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Question Paper Generator</h1>
                <p className="text-sm text-gray-500 mt-1">Professional exam paper creation system</p>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{examDetails.subject}</div>
                <div className="text-xs text-gray-500">Class {examDetails.className} • {examDetails.duration}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content with improved spacing */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Question Paper Preview - Enhanced */}
          <div className="xl:col-span-3">
           
              
           
                <div className="bg-gray-50  rounded-xl border-2 border-dashed border-gray-200">
                  <QuestionPaperPreview />
                </div>
        
          
          </div>
          
          {/* Enhanced Controls Panel */}
          <div className="xl:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 sticky top-8">
         
             

              <div className="p-6 space-y-6">
                {/* Enhanced Toggles */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Customization</h3>
                  
                  {/* Instructions Toggle */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-blue-900">Exam Instructions</label>
                        <p className="text-xs text-blue-700 mt-1">Include general instructions for students</p>
                      </div>
                      <button
                        onClick={handleToggleInstructions}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 ${
                          includeInstructions ? 'bg-blue-600 shadow-lg' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow-md ${
                            includeInstructions ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Watermark Toggle */}
                  <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <label className="text-sm font-semibold text-purple-900">School Watermark</label>
                        <p className="text-xs text-purple-700 mt-1">Add institutional branding</p>
                      </div>
                      <button
                        onClick={handleToggleWatermark}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-all duration-200 ${
                          includeWatermark ? 'bg-purple-600 shadow-lg' : 'bg-gray-300'
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform duration-200 shadow-md ${
                            includeWatermark ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                    
                    {/* School Name Input */}
                    {includeWatermark && (
                      <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
                        <label className="block text-xs font-medium text-purple-900 mb-2">Institution Name</label>
                        <input
                          type="text"
                          value={schoolName}
                          onChange={(e) => setSchoolName(e.target.value)}
                          className="w-full px-3 py-2 text-sm border border-purple-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                          placeholder="Enter school name"
                        />
                      </div>
                    )}
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Export Options</h3>
                  
                  <button
                    onClick={handleSaveTemplate}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Save className="w-5 h-5" />
                    Save as Template
                  </button>
                  
                  <button
                    onClick={handlePrint}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Printer className="w-5 h-5" />
                    Print Question Paper
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-4 py-4 rounded-xl text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                  >
                    <Download className="w-5 h-5" />
                    Download PDF
                  </button>
                </div>

                {/* Enhanced Paper Summary */}
                

                {/* Enhanced School Info */}
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-5 border border-blue-200">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                      <School className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-sm font-semibold text-blue-900">Institution Details</span>
                  </div>
                  <div className="bg-white p-3 rounded-lg border border-blue-200">
                    <p className="text-sm font-medium text-gray-900">{schoolName}</p>
                    <p className="text-xs text-gray-600 mt-1">{examDetails.subject} • Class {examDetails.className}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalQuestionPaperPage;