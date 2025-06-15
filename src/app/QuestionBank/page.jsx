'use client'
import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Search,
  Filter,
  Grid3X3,
  List,
  Eye,
  Star,
  Edit,
  Trash2,
  Settings,
  Bell,
  Plus,
  FileText,
  BookOpen,
  Clock,
  CheckCircle2,
  Circle,
  ChevronDown,
  Download,
  ChevronRight,
  Target,
  BarChart3
} from 'lucide-react';

const QuestionBank = ({ selectedSubjects = [], testData = {}, onBack, onContinue }) => {
  const [activeTab, setActiveTab] = useState('Fill in Blanks');
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Questions');
  const [viewMode, setViewMode] = useState('list');
  const [showAnswers, setShowAnswers] = useState(false);
  const [questionsPerPage, setQuestionsPerPage] = useState(20);

  // Question types with counts
  const questionTypes = [
    { name: 'Fill in Blanks', count: 500, active: true },
    { name: 'Brief Answers', count: 350, active: false },
    { name: 'One Sentence', count: 420, active: false },
    { name: 'Matching', count: 280, active: false }
  ];

  // Categories with counts
  const categories = [
    { name: 'All Questions', count: 2000, icon: FileText },
    { name: 'Fill in Blanks', count: 500, icon: Circle },
    { name: 'Brief Answers', count: 350, icon: BookOpen },
    { name: 'One Sentence', count: 420, icon: Circle },
    { name: 'Matching', count: 280, icon: Circle }
  ];

  // Dummy questions data
  const generateQuestions = () => {
    const subjects = ['Physics', 'Chemistry', 'Biology', 'Mathematics'];
    const difficulties = ['Easy', 'Medium', 'Hard'];
    const chapters = {
      Physics: ['Mechanics', 'Thermodynamics', 'Optics', 'Electricity', 'Magnetism'],
      Chemistry: ['Organic Chemistry', 'Inorganic Chemistry', 'Physical Chemistry', 'Analytical Chemistry'],
      Biology: ['Cell Biology', 'Genetics', 'Evolution', 'Ecology', 'Human Physiology'],
      Mathematics: ['Algebra', 'Calculus', 'Geometry', 'Statistics', 'Trigonometry']
    };

    const questionTemplates = {
      'Fill in Blanks': [
        'The sum of angles in a triangle is _____ degrees.',
        'The chemical formula for water is _____.',
        'The powerhouse of the cell is the _____.',
        'The value of π (pi) is approximately _____.',
        'The process of photosynthesis occurs in _____.',
        'Newton\'s first law is also known as the law of _____.',
        'The atomic number of carbon is _____.',
        'DNA stands for _____.',
        'The square root of 144 is _____.',
        'The smallest unit of matter is _____.'
      ],
      'Brief Answers': [
        'Explain the concept of photosynthesis in plants.',
        'Describe Newton\'s three laws of motion.',
        'What is the difference between organic and inorganic compounds?',
        'Solve the quadratic equation x² + 5x + 6 = 0.',
        'Explain the process of cellular respiration.',
        'What are the properties of electromagnetic waves?',
        'Describe the structure of an atom.',
        'Explain the theory of evolution by natural selection.',
        'What is the Pythagorean theorem and its applications?',
        'Describe the water cycle and its importance.'
      ],
      'One Sentence': [
        'Define velocity in physics.',
        'What is a compound in chemistry?',
        'Name the largest organ in the human body.',
        'What is the derivative of x²?',
        'Define ecosystem in biology.',
        'State Ohm\'s law.',
        'What is an isotope?',
        'Define heredity.',
        'What is a prime number?',
        'Define homeostasis.'
      ],
      'Matching': [
        'Match the following scientists with their discoveries.',
        'Match the chemical elements with their symbols.',
        'Match the biological terms with their definitions.',
        'Match the mathematical concepts with their formulas.',
        'Match the physics quantities with their units.',
        'Match the organs with their functions.',
        'Match the compounds with their uses.',
        'Match the animals with their habitats.',
        'Match the geometric shapes with their properties.',
        'Match the historical events with their dates.'
      ]
    };

    const questions = [];
    let id = 1;

    subjects.forEach(subject => {
      chapters[subject].forEach(chapter => {
        questionTemplates[activeTab].forEach((template, templateIndex) => {
          if (questions.length < 500) {
            questions.push({
              id: id++,
              question: template,
              subject: subject,
              chapter: chapter,
              difficulty: difficulties[Math.floor(Math.random() * difficulties.length)],
              type: activeTab,
              isStarred: Math.random() > 0.8,
              tags: [subject, chapter],
              marks: Math.ceil(Math.random() * 5),
              timeRequired: Math.ceil(Math.random() * 10) + 2
            });
          }
        });
      });
    });

    return questions.slice(0, 500);
  };

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    setQuestions(generateQuestions());
    setSelectedQuestions([]);
  }, [activeTab]);

  // Filter questions based on search and category
  const filteredQuestions = questions.filter(question => {
    const matchesSearch = question.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         question.chapter.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All Questions' || 
                           question.type === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Handle question selection
  const handleQuestionSelect = (questionId) => {
    setSelectedQuestions(prev => 
      prev.includes(questionId) 
        ? prev.filter(id => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAll = () => {
    const allQuestionIds = filteredQuestions.map(q => q.id);
    setSelectedQuestions(
      selectedQuestions.length === filteredQuestions.length ? [] : allQuestionIds
    );
  };

  // Progress calculation
  const progress = filteredQuestions.length > 0 ? (selectedQuestions.length / filteredQuestions.length) * 100 : 0;
  const targetMarks = parseInt(testData.totalMarks) || 100;
  const selectedMarks = selectedQuestions.reduce((total, questionId) => {
    const question = questions.find(q => q.id === questionId);
    return total + (question ? question.marks : 0);
  }, 0);

  // Subject color mapping
  const getSubjectColor = (subject) => {
    const colors = {
      Physics: 'bg-blue-100 text-blue-800',
      Chemistry: 'bg-green-100 text-green-800', 
      Biology: 'bg-purple-100 text-purple-800',
      Mathematics: 'bg-orange-100 text-orange-800'
    };
    return colors[subject] || 'bg-gray-100 text-gray-800';
  };

  // Difficulty color mapping
  const getDifficultyColor = (difficulty) => {
    const colors = {
      Easy: 'bg-green-100 text-green-800',
      Medium: 'bg-yellow-100 text-yellow-800',
      Hard: 'bg-red-100 text-red-800'
    };
    return colors[difficulty] || 'bg-gray-100 text-gray-800';
  };

  const handleContinueToQuestionPaper = () => {
    const selectedQuestionData = questions.filter(q => selectedQuestions.includes(q.id));
    onContinue(selectedQuestionData);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button 
              onClick={onBack}
              className="p-1.5 rounded hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Question Bank</h1>
                <p className="text-xs text-gray-500">Organize and manage your questions</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={handleContinueToQuestionPaper}
              disabled={selectedQuestions.length === 0}
              className={`px-4 py-2 rounded-md hover:bg-gray-800 flex items-center space-x-2 text-sm font-medium transition-all ${
                selectedQuestions.length > 0 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <span>Generate Question Paper</span>
              <ChevronRight className="h-4 w-4" />
            </button>
            <button className="px-3 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 flex items-center space-x-2 text-sm font-medium">
              <Plus className="h-4 w-4" />
              <span>Add New</span>
            </button>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
              <Settings className="h-4 w-4" />
            </button>
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Enhanced Progress Section */}
      <div className="bg-white border-b px-4 py-4">
        <div className="max-w-7xl mx-auto">
          {/* Progress Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-blue-600 font-medium">Questions Selected</p>
                  <p className="text-lg font-bold text-blue-900">{selectedQuestions.length}</p>
                </div>
                <CheckCircle2 className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-green-50 to-green-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-green-600 font-medium">Total Marks</p>
                  <p className="text-lg font-bold text-green-900">{selectedMarks}/{targetMarks}</p>
                </div>
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-purple-600 font-medium">Available Questions</p>
                  <p className="text-lg font-bold text-purple-900">{filteredQuestions.length}</p>
                </div>
                <FileText className="h-6 w-6 text-purple-600" />
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-orange-600 font-medium">Progress</p>
                  <p className="text-lg font-bold text-orange-900">{Math.round(progress)}%</p>
                </div>
                <BarChart3 className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Selection Progress: {selectedQuestions.length} of {filteredQuestions.length} questions
            </span>
            <span className="text-sm text-gray-500">{Math.round(progress)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Started</span>
            <span className={progress >= 50 ? 'text-purple-600 font-medium' : ''}>
              {progress >= 50 ? 'Great progress!' : 'Keep selecting...'}
            </span>
            <span className={progress >= 80 ? 'text-green-600 font-medium' : ''}>
              {progress >= 80 ? 'Almost ready!' : 'Target'}
            </span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white border-b px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex space-x-8 overflow-x-auto">
            {questionTypes.map((type) => (
              <button
                key={type.name}
                onClick={() => setActiveTab(type.name)}
                className={`py-3 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === type.name
                    ? 'border-purple-600 text-purple-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r min-h-screen p-4">
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-900 mb-3 flex items-center">
                <BookOpen className="h-4 w-4 mr-2" />
                Question Bank
              </h3>
              <p className="text-xs text-gray-500 mb-4">Organize and manage your questions</p>
            </div>

            <div>
              <h4 className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2">Categories</h4>
              <div className="space-y-1">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.name}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.name
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <IconComponent className="h-4 w-4 mr-2" />
                        <span>{category.name}</span>
                      </div>
                      <span className="text-xs text-gray-500">{category.count}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="pt-4 border-t">
              <button className="w-full flex items-center px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-gray-50">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {/* Controls */}
          <div className="mb-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search questions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-purple-500 focus:border-purple-500 text-sm w-80"
                  />
                </div>
                <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-1.5 rounded ${viewMode === 'list' ? 'bg-purple-100 text-purple-600' : 'text-gray-400 hover:text-gray-600'}`}
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
                <button
                  onClick={() => setShowAnswers(!showAnswers)}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded text-sm ${
                    showAnswers ? 'bg-purple-100 text-purple-600' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Eye className="h-4 w-4" />
                  <span>Show Answers</span>
                </button>
                <select 
                  value={questionsPerPage}
                  onChange={(e) => setQuestionsPerPage(Number(e.target.value))}
                  className="px-3 py-1.5 border border-gray-300 rounded text-sm focus:ring-1 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value={20}>20 per page</option>
                  <option value={50}>50 per page</option>
                  <option value={100}>100 per page</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Showing 1-{Math.min(questionsPerPage, filteredQuestions.length)} of {filteredQuestions.length} questions</span>
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleSelectAll}
                  className="flex items-center space-x-2 text-purple-600 hover:text-purple-700"
                >
                  {selectedQuestions.length === filteredQuestions.length ? 
                    <CheckCircle2 className="h-4 w-4" /> : 
                    <Circle className="h-4 w-4" />
                  }
                  <span>Select all</span>
                </button>
              </div>
            </div>
          </div>

          {/* Questions List */}
          <div className="space-y-3">
            {filteredQuestions.slice(0, questionsPerPage).map((question) => (
              <div
                key={question.id}
                className={`bg-white border rounded-lg p-4 hover:shadow-md transition-all ${
                  selectedQuestions.includes(question.id) ? 'ring-2 ring-purple-500 bg-purple-50' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => handleQuestionSelect(question.id)}
                    className="mt-1 w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          {question.isStarred && <Star className="h-4 w-4 text-yellow-500 fill-current" />}
                          <span className="text-sm font-medium text-gray-900">
                            {activeTab.toLowerCase().replace(' ', '_')}_question_{question.id}: {question.question}
                          </span>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSubjectColor(question.subject)}`}>
                            {question.subject}
                          </span>
                          <span className="text-xs text-gray-500">{question.chapter}</span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>{question.marks} marks</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <button className="p-1 text-gray-400 hover:text-gray-600 rounded">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="p-1 text-gray-400 hover:text-red-600 rounded">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredQuestions.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No questions found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionBank;