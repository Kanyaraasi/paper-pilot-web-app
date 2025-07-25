import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useTheme } from "@/contexts/ThemeContext";
import { useSessionStorage } from '../../../TestCreateDashboardPage/ProgressBarSteps/QuestionBankDashboard/hooks/useSessionStorage';
import { 
  Printer, 
  Download, 
  ArrowLeft, 
  CheckCircle, 
  AlertCircle, 
  Save, 
  Settings, 
  Eye, 
  EyeOff, 
  Loader,
  FileText,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Layout,
  Hash
} from 'lucide-react';

const QuestionPaper = ({ formData, onPrevious }) => {
  // Get selected questions from session storage
  const [selectedQuestions] = useSessionStorage('selectedQuestions', {});
  const [examDetails, setExamDetails] = useState({});
  const [notification, setNotification] = useState(null);
  const [showGeneralInstructions, setShowGeneralInstructions] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [previewZoom, setPreviewZoom] = useState(100);
  const [showAnswerSpaces, setShowAnswerSpaces] = useState(true);
  const [questionNumbering, setQuestionNumbering] = useState('numeric'); // 'numeric', 'roman', 'alpha'
  const [paperLayout, setPaperLayout] = useState('standard'); // 'standard', 'compact', 'spacious'

  const { theme } = useTheme();

  // Transform selected questions into paper format
  const [questionPaper, setQuestionPaper] = useState([]);

  useEffect(() => {
    // Transform form data to exam details
    if (formData) {
      setExamDetails({
        schoolName: "P.E.M HIGH SCHOOL",
        subject: formData.subjects?.find(s => s.selected)?.name || "Subject",
        grade: formData.class || "Grade",
        date: new Date().toLocaleDateString(),
        startTime: "10:00 AM",
        endTime: "12:00 PM",
        totalMarks: formData.totalMarks || "50",
        duration: formData.duration ? `${formData.duration} Hours` : "2 Hours",
        testName: formData.name || "Unit Test"
      });
    }
  }, [formData]);

  useEffect(() => {
    // Get selected questions data from session storage
    const selectedQuestionsData = sessionStorage.getItem('selectedQuestionsData');
    console.log('Reading from session storage:', selectedQuestionsData);
    
    if (selectedQuestionsData) {
      try {
        const questionsData = JSON.parse(selectedQuestionsData);
        console.log('Parsed questions data:', questionsData);
        
        // Transform questions for paper display
        const transformedQuestions = questionsData.map((question, index) => {
          const baseQuestion = {
            id: question.id,
            text: question.text,
            marks: question.marks || getDefaultMarks(question.type),
            type: question.type,
            difficulty: question.difficulty
          };

          // Handle different question types
          switch (question.type) {
            case 'mcq':
              return {
                ...baseQuestion,
                options: question.options || []
              };
            case 'match':
              return {
                ...baseQuestion,
                items: question.items || []
              };
            case 'truefalse':
              return {
                ...baseQuestion,
                options: ['True', 'False']
              };
            default:
              return baseQuestion;
          }
        });

        setQuestionPaper(transformedQuestions);
      } catch (error) {
        console.error('Error parsing selected questions:', error);
        setQuestionPaper([]);
      }
    } else {
      // Fallback to empty array if no questions found
      setQuestionPaper([]);
    }
  }, []);

  // Get default marks based on question type
  const getDefaultMarks = useCallback((type) => {
    const marksMap = {
      'fill': 2,
      'brief': 3,
      'sentence': 3,
      'mcq': 1,
      'truefalse': 1,
      'match': 3,
      'essay': 10,
      'numerical': 4
    };
    return marksMap[type] || 2;
  }, []);

  // Calculate total marks
  const totalMarks = useMemo(() => 
    questionPaper.reduce((sum, question) => sum + (question.marks || 0), 0), 
    [questionPaper]
  );

  // Simplified theme classes for light theme only
  const themeClasses = {
    pageBackground: 'bg-gradient-to-br from-slate-50 to-blue-50',
    cardBackground: 'bg-white border-gray-200',
    cardHeader: 'border-gray-200',
    textPrimary: 'text-gray-900',
    textSecondary: 'text-gray-600',
    textMuted: 'text-gray-500',
    buttonPrimary: 'bg-blue-600 hover:bg-blue-700 text-white',
    buttonSecondary: 'border-gray-300 text-gray-700 hover:bg-gray-50',
    buttonBack: 'bg-gray-100 hover:bg-gray-200 text-gray-600',
    headerBg: 'bg-white border-gray-200',
    toggleButton: 'bg-gray-50 hover:bg-gray-100',
    toggleActive: 'bg-blue-600',
    toggleInactive: 'bg-gray-300',
    notificationSuccess: 'bg-green-500',
    notificationError: 'bg-red-500',
    paperBackground: 'bg-white',
    paperText: 'text-black',
    paperBorder: 'border-gray-300',
    printButton: 'bg-blue-600 hover:bg-blue-700',
    downloadButton: 'bg-green-600 hover:bg-green-700 disabled:bg-green-400',
    saveButton: 'bg-purple-600 hover:bg-purple-700',
    backButton: 'hover:bg-gray-100',
    shadowCard: 'shadow-sm',
    shadowHover: 'hover:shadow-md',
  };

  // Helper function for question numbering
  const getQuestionNumber = useCallback((index) => {
    switch (questionNumbering) {
      case 'roman':
        return ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'][index] || `${index + 1}`;
      case 'alpha':
        return String.fromCharCode(65 + index) || `Q${index + 1}`;
      default:
        return `${index + 1}`;
    }
  }, [questionNumbering]);

  // Helper function for answer space height based on question type
  const getAnswerSpaceHeight = useCallback((questionType, marks) => {
    const heightMap = {
      'fill': '40px',
      'brief': '60px', 
      'sentence': '80px',
      'mcq': '0px',
      'truefalse': '0px',
      'match': '0px',
      'essay': `${Math.max(120, marks * 15)}px`,
      'numerical': '50px'
    };
    return heightMap[questionType] || '60px';
  }, []);

  const showNotification = useCallback((message, type = 'success') => {
    setNotification({ message, type });
    const timer = setTimeout(() => setNotification(null), 3000);
    return () => clearTimeout(timer);
  }, []);


  const handlePrint = useCallback(() => {
    try {
      const printContent = document.getElementById('print-section');
      if (!printContent) {
        showNotification('Print content not found', 'error');
        return;
      }

      const WinPrint = window.open('', '', 'width=900,height=650');
      if (!WinPrint) {
        showNotification('Unable to open print window. Please check popup blockers.', 'error');
        return;
      }

      WinPrint.document.write(`
        <html>
          <head>
            <title>Question Paper - ${examDetails.subject || 'Subject'}</title>
            <style>
              body { 
                font-family: Inter, Arial, sans-serif; 
                margin: 20px; 
                position: relative; 
                background: white;
              }
              .question { margin-bottom: 20px; page-break-inside: avoid; }
              .options { margin-left: 20px; margin-top: 8px; }
              .match-items { margin-left: 20px; margin-top: 8px; }
              .watermark-container {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 0;
                overflow: hidden;
              }
              .watermark-text {
                position: absolute;
                font-size: 28px;
                font-weight: bold;
                color: rgba(0, 0, 0, 0.08);
                transform: rotate(-45deg);
                white-space: nowrap;
                user-select: none;
                font-family: Inter, Arial, sans-serif;
                letter-spacing: 2px;
              }
              .content { 
                position: relative; 
                z-index: 1; 
                background: transparent;
              }
              .question-header {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                margin-bottom: 8px;
              }
              .question-text {
                flex: 1;
                padding-right: 10px;
              }
              .question-marks {
                font-size: 12px;
                background: #f0f0f0;
                padding: 2px 8px;
                border-radius: 12px;
                white-space: nowrap;
              }
              @media print {
                body { margin: 0; }
                .question { page-break-inside: avoid; }
              }
            </style>
          </head>
          <body>
            ${printContent.innerHTML}
          </body>
        </html>
      `);
      WinPrint.document.close();
      WinPrint.focus();
      
      // Add slight delay for better browser compatibility
      setTimeout(() => {
        WinPrint.print();
        WinPrint.close();
      }, 100);
      
      showNotification('Question paper sent to printer!');
    } catch (error) {
      console.error('Print error:', error);
      showNotification('Error printing document. Please try again.', 'error');
    }
  }, [examDetails.subject, showNotification]);

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      
      if (!window.html2pdf) {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
        script.onload = () => {
          generatePDF();
        };
        script.onerror = () => {
          throw new Error('Failed to load PDF library');
        };
        document.head.appendChild(script);
      } else {
        generatePDF();
      }

      function generatePDF() {
        const element = document.getElementById('pdf-content');
        
        if (!element) {
          throw new Error('Content element not found');
        }

        const options = {
          margin: [10, 10, 10, 10],
          filename: `QuestionPaper_${examDetails.subject || 'Subject'}_${new Date().toLocaleDateString().replace(/\//g, '-')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { 
            scale: 2,
            useCORS: true,
            letterRendering: true,
            allowTaint: true
          },
          jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait' 
          }
        };

        window.html2pdf().set(options).from(element).save().then(() => {
          showNotification('PDF downloaded successfully!');
          setIsGeneratingPdf(false);
        }).catch((error) => {
          console.error('PDF generation error:', error);
          showNotification('Error generating PDF. Please try again.', 'error');
          setIsGeneratingPdf(false);
        });
      }
      
    } catch (error) {
      console.error('Error loading PDF library:', error);
      showNotification('Error loading PDF library. Please try the print option instead.', 'error');
      setIsGeneratingPdf(false);
    }
  };

  const handleSavePaper = () => {
    // Save the question paper data
    const paperData = {
      examDetails,
      questionPaper,
      generatedAt: new Date().toISOString()
    };
    
    sessionStorage.setItem('savedQuestionPaper', JSON.stringify(paperData));
    showNotification('Question paper saved successfully!');
  };

  const ToggleButton = ({ isOn, onToggle, label, icon: Icon }) => (
    <div className={`flex items-center justify-between p-3 ${themeClasses.toggleButton} rounded-lg transition-colors`}>
      <div className="flex items-center gap-2">
        <Icon className={`w-4 h-4 ${themeClasses.textSecondary}`} />
        <span className={`text-sm font-medium ${themeClasses.textPrimary}`}>{label}</span>
      </div>
      <button
        onClick={onToggle}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          isOn ? themeClasses.toggleActive : themeClasses.toggleInactive
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
            isOn ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
    </div>
  );

  const generateWatermarkPattern = () => {
    return [{ x: 200, y: 400, id: 'single-watermark' }];
  };

  // Get spacing based on layout
  const getLayoutSpacing = useCallback(() => {
    const spacingMap = {
      'compact': 'space-y-4',
      'standard': 'space-y-6', 
      'spacious': 'space-y-8'
    };
    return spacingMap[paperLayout] || 'space-y-6';
  }, [paperLayout]);

  const QuestionPaperContent = () => (
    <>
      {/* School Header */}
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
          {examDetails.schoolName || "P.E.M HIGH SCHOOL"}
        </h1>
        <h2 className="text-lg font-semibold">{examDetails.testName || "UNIT TEST - 1"}</h2>
      </div>

      {/* Exam Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-6">
        <div className="space-y-2">
          <div><strong>SUBJECT:</strong> {examDetails.subject || "Subject"}</div>
          <div><strong>DATE:</strong> {examDetails.date || new Date().toLocaleDateString()}</div>
          <div><strong>DURATION:</strong> {examDetails.duration || "2 Hours"}</div>
        </div>
        <div className="space-y-2">
          <div><strong>CLASS:</strong> {examDetails.grade || "Grade"}</div>
          <div><strong>TIME:</strong> {examDetails.startTime || "10:00 AM"} - {examDetails.endTime || "12:00 PM"}</div>
          <div><strong>TOTAL MARKS:</strong> {totalMarks || examDetails.totalMarks || "50"}</div>
        </div>
      </div>

      {/* General Instructions */}
      {showGeneralInstructions && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border-l-4 border-blue-500">
          <h3 className="font-semibold text-sm mb-3 text-blue-800">General Instructions:</h3>
          <ul className="text-xs space-y-1.5 list-disc list-inside text-gray-700">
            <li>All questions are compulsory.</li>
            <li>Write answers clearly and legibly.</li>
            <li>Use of calculator is not allowed unless specified.</li>
            <li>Read the questions carefully before answering.</li>
            <li>Attempt all questions in the order given.</li>
            <li>Write your name and roll number clearly at the top of the answer sheet.</li>
          </ul>
        </div>
      )}
      
      <div className="border-t-2 border-gray-300 my-6"></div>
      
      {/* Questions */}
      <div className={getLayoutSpacing()}>
        {questionPaper.length === 0 ? (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
            <p className="text-gray-500 text-lg">No questions selected</p>
            <p className="text-gray-400 text-sm mt-2">Please go back and select questions to generate the paper.</p>
          </div>
        ) : (
          questionPaper.map((question, index) => (
            <div key={question.id} className="question border-l-2 border-gray-200 pl-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3 flex-1">
                  <span className="font-bold text-lg text-blue-600 min-w-[40px]">
                    {getQuestionNumber(index)}.
                  </span>
                  <div className="flex-1">
                    <p className="text-sm font-medium leading-relaxed">
                      {question.text}
                    </p>
                  </div>
                </div>
                <span className="text-xs px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium whitespace-nowrap ml-4">
                  [{question.marks} Mark{question.marks > 1 ? 's' : ''}]
                </span>
              </div>
              
              {/* MCQ Options */}
              {question.options && question.type !== 'truefalse' && (
                <div className="ml-12 mt-3 space-y-2">
                  {question.options.map((option, optIndex) => (
                    <div key={optIndex} className="text-sm flex items-start">
                      <span className="mr-3 font-medium min-w-[24px]">
                        ({String.fromCharCode(97 + optIndex)})
                      </span>
                      <span className="leading-relaxed">{option}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* True/False Options */}
              {question.type === 'truefalse' && (
                <div className="ml-12 mt-3 space-y-2">
                  <div className="text-sm flex items-center">
                    <span className="mr-3 font-medium min-w-[24px]">(a)</span>
                    <span>True</span>
                  </div>
                  <div className="text-sm flex items-center">
                    <span className="mr-3 font-medium min-w-[24px]">(b)</span>
                    <span>False</span>
                  </div>
                </div>
              )}

              {/* Matching Questions */}
              {question.type === 'match' && question.items && (
                <div className="ml-12 mt-3">
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <h5 className="font-semibold text-sm mb-3 text-gray-700">Column A</h5>
                      {question.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm mb-2 flex items-start">
                          <span className="mr-2 font-medium min-w-[20px]">{itemIndex + 1}.</span>
                          <span>{item.left}</span>
                        </div>
                      ))}
                    </div>
                    <div>
                      <h5 className="font-semibold text-sm mb-3 text-gray-700">Column B</h5>
                      {question.items.map((item, itemIndex) => (
                        <div key={itemIndex} className="text-sm mb-2 flex items-start">
                          <span className="mr-2 font-medium min-w-[20px]">({String.fromCharCode(97 + itemIndex)})</span>
                          <span>{item.right}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Answer Space */}
              {/* {showAnswerSpaces && ['fill', 'brief', 'sentence', 'essay', 'numerical'].includes(question.type) && (
                <div className="ml-12 mt-4">
                  <div 
                    className="border border-dashed border-gray-300 rounded bg-gray-50/30"
                    style={{ height: getAnswerSpaceHeight(question.type, question.marks) }}
                  >
                    <div className="text-xs text-gray-400 p-2">Answer:</div>
                  </div>
                </div>
              )} */}
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div className="mt-10 pt-6 border-t-2 border-gray-300 text-center">
        <p className="font-bold text-sm">*** END OF THE QUESTION PAPER ***</p>
        <p className="text-xs text-gray-600 mt-2">Best of Luck!</p>
      </div>
    </>
  );

  const QuestionPaperPreview = () => (
    <div className="space-y-4">
      {/* Preview Controls */}
      <div className="flex items-center justify-between bg-white rounded-lg border p-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-gray-700">Preview:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPreviewZoom(Math.max(50, previewZoom - 10))}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={previewZoom <= 50}
            >
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-sm min-w-[50px] text-center">{previewZoom}%</span>
            <button
              onClick={() => setPreviewZoom(Math.min(150, previewZoom + 10))}
              className="p-1 hover:bg-gray-100 rounded"
              disabled={previewZoom >= 150}
            >
              <ZoomIn className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewZoom(100)}
              className="p-1 hover:bg-gray-100 rounded text-xs"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Paper Preview */}
      <div className="bg-gray-100 p-6 rounded-lg">
        <div 
          className="bg-white shadow-lg mx-auto"
          style={{ 
            width: '210mm',
            minHeight: '297mm',
            transform: `scale(${previewZoom / 100})`,
            transformOrigin: 'top center',
            marginBottom: previewZoom !== 100 ? `${(297 * (previewZoom / 100 - 1))}px` : '0'
          }}
        >
          <div className="relative p-8 text-black" style={{ minHeight: '297mm' }}>
            {showWatermark && (
              <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
                <div
                  className="absolute select-none"
                  style={{
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) rotate(-45deg)',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.08)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, Arial, sans-serif',
                    letterSpacing: '2px',
                    userSelect: 'none',
                  }}
                >
                  P.E.M HIGH SCHOOL
                </div>
              </div>
            )}
            <div className="relative z-10">
              <QuestionPaperContent />
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Section */}
      <div 
        id="print-section"
        className="hidden"
      >
        <div className="relative p-8 text-black bg-white" style={{ minHeight: '297mm' }}>
          {showWatermark && (
            <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
              {generateWatermarkPattern().map((pos) => (
                <div
                  key={pos.id}
                  className="absolute select-none"
                  style={{
                    left: `${pos.x}px`,
                    top: `${pos.y}px`,
                    transform: 'rotate(-45deg)',
                    fontSize: '48px',
                    fontWeight: 'bold',
                    color: 'rgba(0, 0, 0, 0.08)',
                    whiteSpace: 'nowrap',
                    fontFamily: 'Inter, Arial, sans-serif',
                    letterSpacing: '2px',
                    userSelect: 'none',
                  }}
                >
                  P.E.M HIGH SCHOOL
                </div>
              ))}
            </div>
          )}
          <QuestionPaperContent />
        </div>
      </div>

      {/* Hidden PDF Content */}
      <div 
        id="pdf-content"
        className="hidden relative bg-white text-black"
        style={{ width: '210mm', minHeight: '297mm', margin: '0 auto', padding: '4mm' }}
      >
        {showWatermark && (
          <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
            <div
              className="absolute select-none"
              style={{
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%) rotate(-45deg)',
                fontSize: '48px',
                fontWeight: 'bold',
                color: 'rgba(0, 0, 0, 0.08)',
                whiteSpace: 'nowrap',
                fontFamily: 'Inter, Arial, sans-serif',
                letterSpacing: '2px',
                userSelect: 'none',
              }}
            >
              P.E.M HIGH SCHOOL
            </div>
          </div>
        )}
        <div className="relative z-10">
          <QuestionPaperContent />
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground}`}>
      {/* Notification */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-3 rounded-lg shadow-lg text-white font-medium transform transition-all duration-300 ${
          notification.type === 'success' ? themeClasses.notificationSuccess : themeClasses.notificationError
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
      <div className={`${themeClasses.headerBg} shadow-sm border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <button
                onClick={() => onPrevious && onPrevious()}
                className={`p-2 ${themeClasses.backButton} rounded-lg transition-colors`}
              >
                <ArrowLeft className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              <h1 className={`ml-4 text-xl font-semibold ${themeClasses.textPrimary}`}>
                Question Paper Preview
              </h1>
              {questionPaper.length > 0 && (
                <span className={`ml-4 text-sm ${themeClasses.textSecondary}`}>
                  ({questionPaper.length} question{questionPaper.length > 1 ? 's' : ''}, {totalMarks} marks)
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar - Controls */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="space-y-4">
              {/* Action Buttons */}
              <div className={`${themeClasses.cardBackground} rounded-xl ${themeClasses.shadowCard} border p-6`}>
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4 flex items-center gap-2`}>
                  <Settings className="w-5 h-5" />
                  Actions
                </h3>
                <div className="space-y-3">
                  <button
                    onClick={handlePrint}
                    disabled={questionPaper.length === 0}
                    className={`flex items-center justify-center gap-2 ${themeClasses.printButton} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 ${themeClasses.shadowCard} ${themeClasses.shadowHover} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Printer className="w-4 h-4" />
                    Print Paper
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPdf || questionPaper.length === 0}
                    className={`flex items-center justify-center gap-2 ${themeClasses.downloadButton} disabled:cursor-not-allowed text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 ${themeClasses.shadowCard} ${themeClasses.shadowHover} w-full`}
                  >
                    {isGeneratingPdf ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" />
                        Generating PDF...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download PDF
                      </>
                    )}
                  </button>

                  <button
                    onClick={handleSavePaper}
                    disabled={questionPaper.length === 0}
                    className={`flex items-center justify-center gap-2 ${themeClasses.saveButton} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 ${themeClasses.shadowCard} ${themeClasses.shadowHover} w-full disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    <Save className="w-4 h-4" />
                    Save Paper
                  </button>
                </div>
              </div>

              {/* Display Options */}
              <div className={`${themeClasses.cardBackground} rounded-xl ${themeClasses.shadowCard} border p-6`}>
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4`}>Display Options</h3>
                <div className="space-y-3">
                  <ToggleButton
                    isOn={showGeneralInstructions}
                    onToggle={() => setShowGeneralInstructions(!showGeneralInstructions)}
                    label="General Instructions"
                    icon={showGeneralInstructions ? Eye : EyeOff}
                  />
                  <ToggleButton
                    isOn={showWatermark}
                    onToggle={() => setShowWatermark(!showWatermark)}
                    label="School Watermark"
                    icon={showWatermark ? Eye : EyeOff}
                  />
                  <ToggleButton
                    isOn={showAnswerSpaces}
                    onToggle={() => setShowAnswerSpaces(!showAnswerSpaces)}
                    label="Answer Spaces"
                    icon={showAnswerSpaces ? Layout : EyeOff}
                  />
                </div>
              </div>

              {/* Formatting Options */}
              <div className={`${themeClasses.cardBackground} rounded-xl ${themeClasses.shadowCard} border p-6`}>
                <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4`}>Formatting</h3>
                <div className="space-y-4">
                  {/* Question Numbering */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
                      <Hash className="w-4 h-4 inline mr-1" />
                      Question Numbering
                    </label>
                    <select
                      value={questionNumbering}
                      onChange={(e) => setQuestionNumbering(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="numeric">1, 2, 3...</option>
                      <option value="roman">I, II, III...</option>
                      <option value="alpha">A, B, C...</option>
                    </select>
                  </div>

                  {/* Paper Layout */}
                  <div>
                    <label className={`block text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
                      <Layout className="w-4 h-4 inline mr-1" />
                      Paper Layout
                    </label>
                    <select
                      value={paperLayout}
                      onChange={(e) => setPaperLayout(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="compact">Compact</option>
                      <option value="standard">Standard</option>
                      <option value="spacious">Spacious</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Question Summary */}
              {questionPaper.length > 0 && (
                <div className={`${themeClasses.cardBackground} rounded-xl ${themeClasses.shadowCard} border p-6`}>
                  <h3 className={`text-lg font-semibold ${themeClasses.textPrimary} mb-4`}>Question Summary</h3>
                  <div className="space-y-3 text-sm">
                    <div className={`flex justify-between ${themeClasses.textSecondary}`}>
                      <span>Total Questions:</span>
                      <span className="font-medium text-blue-600">{questionPaper.length}</span>
                    </div>
                    <div className={`flex justify-between ${themeClasses.textSecondary}`}>
                      <span>Total Marks:</span>
                      <span className="font-medium text-green-600">{totalMarks}</span>
                    </div>
                    <div className={`flex justify-between ${themeClasses.textSecondary}`}>
                      <span>Duration:</span>
                      <span className="font-medium">{examDetails.duration}</span>
                    </div>
                    
                    {/* Question Type Breakdown */}
                    <div className="pt-3 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Question Types:</h4>
                      {Object.entries(
                        questionPaper.reduce((acc, q) => {
                          acc[q.type] = (acc[q.type] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([type, count]) => (
                        <div key={type} className={`flex justify-between text-xs ${themeClasses.textMuted}`}>
                          <span className="capitalize">{type}:</span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>

                    {/* Difficulty Breakdown */}
                    <div className="pt-2 border-t border-gray-200">
                      <h4 className="font-medium text-gray-700 mb-2">Difficulty:</h4>
                      {Object.entries(
                        questionPaper.reduce((acc, q) => {
                          const difficulty = q.difficulty || 'medium';
                          acc[difficulty] = (acc[difficulty] || 0) + 1;
                          return acc;
                        }, {})
                      ).map(([difficulty, count]) => (
                        <div key={difficulty} className={`flex justify-between text-xs ${themeClasses.textMuted}`}>
                          <span className="capitalize">{difficulty}:</span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Question Paper */}
          <div className="flex-1 min-w-0">
            <QuestionPaperPreview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionPaper;