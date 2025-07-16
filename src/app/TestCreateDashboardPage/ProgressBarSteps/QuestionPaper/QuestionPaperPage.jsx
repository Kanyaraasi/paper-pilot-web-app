'use client'
import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Printer, Download, ArrowLeft, CheckCircle, AlertCircle, Save, Settings, Eye, EyeOff, Loader } from 'lucide-react';

const QuestionPaper = () => {
  // State management
  const [examDetails, setExamDetails] = useState({});
  const [questionPaper, setQuestionPaper] = useState(null);
  const [notification, setNotification] = useState(null);
  const [showGeneralInstructions, setShowGeneralInstructions] = useState(true);
  const [showWatermark, setShowWatermark] = useState(true);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 to-blue-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      cardHeader: isDark ? 'border-gray-700' : 'border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark 
        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark 
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      headerBg: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      toggleButton: isDark 
        ? 'bg-gray-700 hover:bg-gray-600' 
        : 'bg-gray-50 hover:bg-gray-100',
      toggleActive: isDark ? 'bg-blue-600' : 'bg-blue-600',
      toggleInactive: isDark ? 'bg-gray-600' : 'bg-gray-300',
      notificationSuccess: isDark ? 'bg-green-600' : 'bg-green-500',
      notificationError: isDark ? 'bg-red-600' : 'bg-red-500',
      // Paper-specific styling (always white for printing)
      paperBackground: 'bg-white',
      paperText: 'text-black',
      paperBorder: 'border-gray-300',
      // Action buttons
      printButton: isDark 
        ? 'bg-blue-600 hover:bg-blue-700' 
        : 'bg-blue-600 hover:bg-blue-700',
      downloadButton: isDark 
        ? 'bg-green-600 hover:bg-green-700 disabled:bg-green-500' 
        : 'bg-green-600 hover:bg-green-700 disabled:bg-green-400',
      saveButton: isDark 
        ? 'bg-purple-600 hover:bg-purple-700' 
        : 'bg-purple-600 hover:bg-purple-700',
      backButton: isDark 
        ? 'hover:bg-gray-700' 
        : 'hover:bg-gray-100',
      shadowCard: isDark ? 'shadow-lg shadow-gray-900/20' : 'shadow-sm',
      shadowHover: isDark ? 'hover:shadow-xl hover:shadow-gray-900/30' : 'hover:shadow-md',
    };
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    // Mock data initialization
    const mockExamDetails = {
      schoolName: "P.E.M HIGH SCHOOL",
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
        options: null,
        marks: 5
      },
      {
        id: 2,
        text: 'Solve the quadratic equation: 2x² - 7x + 3 = 0',
        options: null,
        marks: 4
      },
      {
        id: 3,
        text: 'Which of the following is a prime number?',
        options: ['15', '21', '23', '27'],
        marks: 2
      },
      {
        id: 4,
        text: 'Find the derivative of f(x) = 3x² + 2x - 1',
        options: null,
        marks: 3
      },
      {
        id: 5,
        text: 'Calculate the area of a triangle with base 12 cm and height 8 cm.',
        options: null,
        marks: 3
      },
      {
        id: 6,
        text: 'What is the value of π (pi) approximately?',
        options: ['3.14', '2.71', '1.41', '1.73'],
        marks: 2
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
    const printContent = document.getElementById('print-section');
    const WinPrint = window.open('', '', 'width=900,height=650');
    WinPrint.document.write(`
      <html>
        <head>
          <title>Question Paper</title>
          <style>
            body { 
              font-family: Inter, Arial, sans-serif; 
              margin: 20px; 
              position: relative; 
              background: white;
            }
            .question { margin-bottom: 15px; }
            .options { margin-left: 20px; margin-top: 5px; }
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
          </style>
        </head>
        <body>
          ${printContent.innerHTML}
        </body>
      </html>
    `);
    WinPrint.document.close();
    WinPrint.focus();
    WinPrint.print();
    WinPrint.close();
    showNotification('Question paper sent to printer!');
  };

  const handleDownloadPDF = async () => {
    try {
      setIsGeneratingPdf(true);
      
      // Load html2pdf.js from CDN as fallback
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
        // Get the element to convert
        const element = document.getElementById('pdf-content');
        
        if (!element) {
          throw new Error('Content element not found');
        }

        // PDF options
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

        // Generate and download PDF
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
    showNotification('Question paper saved successfully!');
  };

  const ToggleButton = ({ isOn, onToggle, label, icon: Icon }) => (
    <div className={`flex items-center justify-between p-3 ${themeClasses.toggleButton} rounded-lg transition-colors `}>
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

  // Generate single centered watermark
  const generateWatermarkPattern = () => {
    return [{ x: 200, y: 400, id: 'single-watermark' }];
  };

  const QuestionPaperPreview = () => (
    <div className={`${themeClasses.paperBackground} rounded-lg ${themeClasses.shadowCard} overflow-hidden`}>
      {/* Print Section - Hidden from normal view */}
      <div 
        id="print-section"
        className="hidden"
      >
        <div className="relative p-8 text-black bg-white " style={{ minHeight: '297mm' }}>
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

      {/* PDF Content - Optimized for PDF generation */}
      <div 
        id="pdf-content"
        className="relative bg-white text-black "
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

      {/* Display Content - Visible to users */}
      <div 
        className={`relative border-2 ${themeClasses.paperBorder} p-8 ${themeClasses.paperText} ${themeClasses.paperBackground} h-full overflow-hidden lg:hidden `}
        style={{ minHeight: '297mm' }}
      >
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
        <div className="relative z-10">
          <QuestionPaperContent />
        </div>
      </div>
    </div>
  );

  const QuestionPaperContent = () => (
    <>
      {/* School Header */}
      <div className="text-center mb-6 border-b-2 border-gray-800 pb-4">
        <h1 className="text-2xl font-bold uppercase tracking-wider mb-2">
          {examDetails.schoolName || "P.E.M HIGH SCHOOL"}
        </h1>
        <h2 className="text-lg font-semibold">UNIT TEST - 1</h2>
      </div>

      {/* Exam Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-sm mb-4">
        <div className="space-y-2">
          <div><strong>SUBJECT:</strong> {examDetails.subject || "Subject"}</div>
          <div><strong>DATE:</strong> {new Date().toLocaleDateString()}</div>
          <div><strong>DURATION:</strong> {examDetails.duration || "2 Hours"}</div>
        </div>
        <div className="space-y-2">
          <div><strong>CLASS:</strong> {examDetails.grade || "Grade"}</div>
          <div><strong>TIME:</strong> {examDetails.startTime || "10:00 AM"} - {examDetails.endTime || "12:00 PM"}</div>
          <div><strong>TOTAL MARKS:</strong> {examDetails.totalMarks || "50"}</div>
        </div>
      </div>

      {/* General Instructions */}
      {showGeneralInstructions && (
        <div className="mb-2 p-2">
          <h3 className="font-semibold text-sm mb-2">General Instructions:</h3>
          <ul className="text-xs space-y-1 list-disc list-inside text-gray-700">
            <li>All questions are compulsory.</li>
            <li>Write answers clearly and legibly.</li>
            <li>Use of calculator is not allowed.</li>
            <li>Read the questions carefully before answering.</li>
          </ul>
        </div>
      )}
      
      <div className="border-t-2 border-gray-300 my-4"></div>
      
      {/* Questions */}
      <div className="">
        {questionPaper?.map((question, index) => (
          <div key={question.id} className="border-gray-200">
            <div className="flex justify-between items-start mb-2">
              <p className="text-sm font-medium flex-1 pr-4">
                <span className="">Q{index + 1}.</span> {question.text}
              </p>
              <span className="text-xs px-2 py-1 rounded-full font-medium whitespace-nowrap">
                [{question.marks} Marks]
              </span>
            </div>
            
            {question.options && (
              <div className="ml-6 mt-1 space-y-2">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="text-sm flex items-center">
                    <span className="mr-3 font-medium w-6">
                      {String.fromCharCode(97 + optIndex)})
                    </span>
                    <span>{option}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t-2 border-gray-300 text-center">
        <p className="font-bold text-sm">*** END OF THE QUESTION PAPER ***</p>
        <p className="text-xs text-gray-600 mt-2">Best of Luck!</p>
      </div>
    </>
  );

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} `}>
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
                onClick={() => window.history.back()}
                className={`p-2 ${themeClasses.backButton} rounded-lg transition-colors`}
              >
                <ArrowLeft className={`w-5 h-5 ${themeClasses.textSecondary}`} />
              </button>
              <h1 className={`ml-4 text-xl font-semibold ${themeClasses.textPrimary}`}>Question Paper Preview</h1>
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
                    className={`flex items-center justify-center gap-2 ${themeClasses.printButton} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 ${themeClasses.shadowCard} ${themeClasses.shadowHover} w-full`}
                  >
                    <Printer className="w-4 h-4" />
                    Print Paper
                  </button>
                  
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isGeneratingPdf}
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
                    className={`flex items-center justify-center gap-2 ${themeClasses.saveButton} text-white px-4 py-3 rounded-lg font-medium transition-all duration-200 ${themeClasses.shadowCard} ${themeClasses.shadowHover} w-full`}
                  >
                    <Save className="w-4 h-4" />
                    Save Paper
                  </button>
                </div>
              </div>

              {/* Toggle Controls */}
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
                </div>
              </div>
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