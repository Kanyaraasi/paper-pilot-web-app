'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';

const generateQuestions = () => {
  const fillInTheBlankQuestions = [
    { id: 1, text: 'The sum of angles in a triangle is always _____.', answer: '180 degrees' },
    { id: 2, text: 'The formula for the area of a circle is π * _____.', answer: 'r²' },
    { id: 3, text: 'The number of sides in a hexagon is _____.', answer: '6' },
    { id: 4, text: 'The value of π is approximately _____.', answer: '3.14159' },
    { id: 5, text: 'A square has _____ equal sides.', answer: '4' },
    { id: 6, text: 'The sum of interior angles in a quadrilateral is _____ degrees.', answer: '360' },
    { id: 7, text: 'The Pythagorean theorem relates the sides of a right-angled triangle with the equation a² + b² = _____.', answer: 'c²' },
    { id: 8, text: 'The circumference of a circle is calculated as 2π * _____.', answer: 'r (radius)' },
    { id: 9, text: 'A regular pentagon has _____ equal sides.', answer: '5' },
    { id: 10, text: 'The value of the golden ratio is approximately _____.', answer: '1.618' }
  ];

  const multipleChoiceQuestions = [
    {
      id: 11,
      text: 'What is the fundamental theorem of algebra?',
      options: [
        'Every non-zero complex number has a multiplicative inverse',
        'Every non-constant polynomial has at least one complex root',
        'The sum of interior angles of a triangle is 180 degrees'
      ],
      answer: 'Every non-constant polynomial has at least one complex root'
    },
    {
      id: 12,
      text: 'What is a prime number?',
      options: [
        'A number divisible by 2',
        'A number greater than 10',
        'A number only divisible by 1 and itself'
      ],
      answer: 'A number only divisible by 1 and itself'
    },
    {
      id: 13,
      text: 'What is the Fibonacci sequence?',
      options: [
        'A sequence where each number is the sum of the two preceding ones',
        'A sequence of prime numbers',
        'A sequence of exponential growth'
      ],
      answer: 'A sequence where each number is the sum of the two preceding ones'
    },
    {
      id: 14,
      text: 'What is a rational number?',
      options: [
        'A number that can be expressed as a fraction of two integers',
        'A number greater than zero',
        'A number with decimal places'
      ],
      answer: 'A number that can be expressed as a fraction of two integers'
    },
    {
      id: 15,
      text: 'What is the quadratic formula used for?',
      options: [
        'Finding the roots of a quadratic equation',
        'Calculating the area of a circle',
        'Determining the slope of a line'
      ],
      answer: 'Finding the roots of a quadratic equation'
    },
    {
      id: 16,
      text: 'What is the Pythagorean theorem?',
      options: [
        'A theorem about similar triangles',
        'A relationship between the sides of a right-angled triangle',
        'A method for calculating circumference'
      ],
      answer: 'A relationship between the sides of a right-angled triangle'
    },
    {
      id: 17,
      text: 'What is a geometric progression?',
      options: [
        'A sequence where each term is multiplied by a constant',
        'A sequence of increasing geometric shapes',
        'A method of measuring angles'
      ],
      answer: 'A sequence where each term is multiplied by a constant'
    },
    {
      id: 18,
      text: 'What is the difference between median and mean?',
      options: [
        'Median is the middle value, mean is the average',
        'Median is the largest value, mean is the smallest',
        'They are the same mathematical concept'
      ],
      answer: 'Median is the middle value, mean is the average'
    },
    {
      id: 19,
      text: 'What is an irrational number?',
      options: [
        'A number that cannot be expressed as a simple fraction',
        'A number that is always positive',
        'A number divisible by itself'
      ],
      answer: 'A number that cannot be expressed as a simple fraction'
    },
    {
      id: 20,
      text: 'What is the definition of a derivative?',
      options: [
        'The rate of change of a function at a specific point',
        'A method of multiplying numbers',
        'A way to calculate area'
      ],
      answer: 'The rate of change of a function at a specific point'
    }
  ];

  return { fillInTheBlankQuestions, multipleChoiceQuestions };
};

const QuestionPaperPageContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // Retrieve the subject from search parameters
  const subject = searchParams.get('subject') || 'Mathematics';

  const { fillInTheBlankQuestions, multipleChoiceQuestions } = generateQuestions();
  const [selectedFillInBlank, setSelectedFillInBlank] = useState([]);
  const [selectedMultipleChoice, setSelectedMultipleChoice] = useState([]);
  const [generatedPaper, setGeneratedPaper] = useState(null);
  const [toast, setToast] = useState(null);
  const [examDetails, setExamDetails] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('fill'); // 'fill' or 'multiple'
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    const storedExamDetails = localStorage.getItem('examDetails');
    if (storedExamDetails) {
      setExamDetails(JSON.parse(storedExamDetails));
    }
  }, []);

  const showToast = (message, type = 'error') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFillInBlank = (id) => {
    setSelectedFillInBlank(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      
      if (prev.length >= 5) {
        showToast('You can only select 5 Fill in the Blank questions');
        return prev;
      }
      
      return [...prev, id];
    });
  };

  const toggleMultipleChoice = (id) => {
    setSelectedMultipleChoice(prev => {
      if (prev.includes(id)) {
        return prev.filter(selectedId => selectedId !== id);
      }
      
      if (prev.length >= 5) {
        showToast('You can only select 5 Multiple Choice questions');
        return prev;
      }
      
      return [...prev, id];
    });
  };

  const generateQuestionPaper = () => {
    // Validate selections exactly 5 questions
    if (selectedFillInBlank.length !== 5 || selectedMultipleChoice.length !== 5) {
      showToast('Please select exactly 5 questions from each section');
      return;
    }

    // Select questions
    const selectedFillInBlankQuestions = fillInTheBlankQuestions
      .filter(q => selectedFillInBlank.includes(q.id));

    const selectedMultipleChoiceQuestions = multipleChoiceQuestions
      .filter(q => selectedMultipleChoice.includes(q.id));

    const finalQuestionPaper = [...selectedFillInBlankQuestions, ...selectedMultipleChoiceQuestions];
    
    // Store generated paper in localStorage
    localStorage.setItem('generatedQuestionPaper', JSON.stringify(finalQuestionPaper));
    
    // Navigate to Final Question Paper Page
    router.push('/FinalQuestionPaperPage');
  };

  // Filter questions based on search query
  const filteredFillInBlank = fillInTheBlankQuestions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (showAnswers && q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );
  
  const filteredMultipleChoice = multipleChoiceQuestions.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) || 
    (q.options && q.options.some(opt => 
      opt.toLowerCase().includes(searchQuery.toLowerCase())
    )) ||
    (showAnswers && q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Auto-select first 5 questions
  const quickSelect = (type) => {
    if (type === 'fill') {
      const firstFive = filteredFillInBlank.slice(0, 5).map(q => q.id);
      setSelectedFillInBlank(firstFive);
      showToast('Selected first 5 Fill in the Blank questions', 'success');
    } else {
      const firstFive = filteredMultipleChoice.slice(0, 5).map(q => q.id);
      setSelectedMultipleChoice(firstFive);
      showToast('Selected first 5 Multiple Choice questions', 'success');
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded shadow-lg ${
          toast.type === 'error' 
            ? 'bg-red-500 text-white' 
            : 'bg-green-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}
      
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-lg shadow-lg mb-6">
        <h1 className="text-3xl font-bold text-center">{subject} Question Paper</h1>
        <p className="text-center mt-2 text-blue-100">
          Select 5 questions from each category
        </p>
        
        {/* Enhanced search input with more visible styling */}
        <div className="mt-4 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-white" />
          </div>
          <input
            type="text"
            placeholder="Search questions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-4 py-3 border-2 border-blue-400 bg-black/20 bg-opacity-50 text-white placeholder-blue-200 focus:ring-2 focus:ring-white focus:border-white rounded-lg text-lg shadow-inner transition-all duration-300 focus:shadow-lg"
            style={{
              boxShadow: "0 0 15px rgba(255, 255, 255, 0.1) inset",
            }}
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="h-full px-4 text-blue-200 hover:text-white"
              >
                ✕
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Controls for showing answers */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-2 items-center">
          <input 
            type="checkbox" 
            id="showAnswers" 
            checked={showAnswers} 
            onChange={() => setShowAnswers(!showAnswers)}
            className="w-4 h-4 text-blue-600" 
          />
          <label htmlFor="showAnswers" className="text-gray-700">Questions with Answers</label>
        </div>
        
        <button
          onClick={() => quickSelect(activeTab)}
          className="bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200 transition border border-blue-300"
        >
          Quick Select 5
        </button>
      </div>

      {/* Tabs for question types */}
      <div className="flex mb-4 border-b border-gray-300">
        <button
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'fill' 
              ? 'text-blue-600 border-b-3 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('fill')}
          style={{
            borderBottomWidth: activeTab === 'fill' ? '3px' : '0',
            marginBottom: activeTab === 'fill' ? '-1px' : '0'
          }}
        >
          Fill in the Blanks ({selectedFillInBlank.length}/5)
        </button>
        <button
          className={`py-3 px-6 text-lg font-medium ${
            activeTab === 'multiple' 
              ? 'text-blue-600 border-b-3 border-blue-600 bg-blue-50' 
              : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
          }`}
          onClick={() => setActiveTab('multiple')}
          style={{
            borderBottomWidth: activeTab === 'multiple' ? '3px' : '0',
            marginBottom: activeTab === 'multiple' ? '-1px' : '0'
          }}
        >
          Multiple Choice ({selectedMultipleChoice.length}/5)
        </button>
      </div>

      {/* Fill in the Blank Questions (conditionally rendered) */}
      {activeTab === 'fill' && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Fill in the Blanks</h2>
          
          {searchQuery && filteredFillInBlank.length === 0 && (
            <div className="text-gray-500 italic bg-gray-50 p-4 rounded text-center">
              No matching fill-in-the-blank questions found
            </div>
          )}
          
          <div className="grid gap-3">
            {filteredFillInBlank.map((question) => (
              <div 
                key={question.id} 
                className={`rounded-lg p-4 border transition-all ${
                  selectedFillInBlank.includes(question.id) 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow'
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`fillblank-${question.id}`}
                    checked={selectedFillInBlank.includes(question.id)}
                    onChange={() => toggleFillInBlank(question.id)}
                    className="mr-3 h-5 w-5 mt-1 text-blue-600 rounded border-gray-400 focus:ring-blue-500"
                  />
                  <div className="flex-grow">
                    <label 
                      htmlFor={`fillblank-${question.id}`}
                      className="flex-grow cursor-pointer"
                    >
                      <span className="text-gray-600 text-sm font-medium mr-2">Q{question.id}.</span>
                      <span className="text-gray-800">{question.text}</span>
                    </label>
                    
                    {showAnswers && (
                      <div className="mt-2 ml-6 text-green-700 bg-green-50 inline-block px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        Answer: {question.answer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Multiple Choice Questions (conditionally rendered) */}
      {activeTab === 'multiple' && (
        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 border-b pb-2">Multiple Choice Questions</h2>
          
          {searchQuery && filteredMultipleChoice.length === 0 && (
            <div className="text-gray-500 italic bg-gray-50 p-4 rounded text-center">
              No matching multiple-choice questions found
            </div>
          )}
          
          <div className="grid gap-4">
            {filteredMultipleChoice.map((question) => (
              <div 
                key={question.id} 
                className={`rounded-lg p-4 border transition-all ${
                  selectedMultipleChoice.includes(question.id) 
                    ? 'border-blue-500 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-300 hover:shadow'
                }`}
              >
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id={`multiple-${question.id}`}
                    checked={selectedMultipleChoice.includes(question.id)}
                    onChange={() => toggleMultipleChoice(question.id)}
                    className="mr-3 h-5 w-5 mt-1 text-blue-600 rounded border-gray-400 focus:ring-blue-500"
                  />
                  <div className="flex-grow">
                    <label 
                      htmlFor={`multiple-${question.id}`}
                      className="font-medium cursor-pointer"
                    >
                      <span className="text-gray-600 text-sm font-medium mr-2">Q{question.id}.</span>
                      <span className="text-gray-800">{question.text}</span>
                    </label>
                    
                    <div className="ml-6 mt-2 text-sm text-gray-700 grid gap-2">
                      {question.options.map((option, optIndex) => (
                        <div key={optIndex} className={`flex items-start rounded p-2 ${
                          showAnswers && option === question.answer 
                            ? 'bg-green-50 border border-green-200' 
                            : 'hover:bg-gray-50'
                        }`}>
                          <span className="mr-2 font-medium">{String.fromCharCode(65 + optIndex)}.</span>
                          <span className={`${
                            showAnswers && option === question.answer 
                              ? 'font-medium' 
                              : ''
                          }`}>{option}</span>
                          {showAnswers && option === question.answer && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Correct</span>
                          )}
                        </div>
                      ))}
                    </div>
                    
                    {showAnswers && (
                      <div className="mt-3 ml-6 text-green-700 bg-green-50 inline-block px-3 py-1 rounded-full text-sm font-medium border border-green-200">
                        Answer: {question.answer}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Selection Summary */}
      <div className="sticky bottom-4 bg-white rounded-lg p-4 mb-6 flex justify-between items-center shadow-lg border border-gray-300">
        <div>
          <div className="text-sm text-gray-600">Fill in the Blank: <span className="font-medium text-blue-600">{selectedFillInBlank.length}/5</span></div>
          <div className="text-sm text-gray-600">Multiple Choice: <span className="font-medium text-blue-600">{selectedMultipleChoice.length}/5</span></div>
        </div>
        <button 
          onClick={generateQuestionPaper}
          disabled={selectedFillInBlank.length !== 5 || selectedMultipleChoice.length !== 5}
          className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
            selectedFillInBlank.length === 5 && selectedMultipleChoice.length === 5
              ? 'bg-blue-600 text-white hover:bg-blue-700 hover:shadow-lg transform hover:-translate-y-1' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Generate Paper
        </button>
      </div>
    </div>
  );
};

const QuestionPaperPage = () => {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading questions...</p>
        </div>
      </div>
    }>
      <QuestionPaperPageContent />
    </Suspense>
  );
};

export default QuestionPaperPage;