'use client'
import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Search, 
  PlusCircle, 
  Filter, 
  Download, 
  Upload, 
  Settings, 
  ChevronDown, 
  Layers, 
  Edit3, 
  Trash2,
  Check,
  X,
  Grid,
  List,
  MoreHorizontal,
  FileText,
  Eye,
  EyeOff
} from 'lucide-react';

// Mock data - will be replaced with MongoDB data
const generateMockQuestions = (type, count = 20) => {
  const questions = [];
  
  for (let i = 1; i <= count; i++) {
    switch(type) {
      case 'fill':
        questions.push({
          id: `fill-${i}`,
          text: `Fill in the blank question ${i}: The sum of angles in a triangle is always _____.`,
          answer: '180 degrees',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags: [`math${i % 5}`, 'geometry']
        });
        break;
      case 'brief':
        questions.push({
          id: `brief-${i}`,
          text: `Answer briefly question ${i}: Explain Newton's First Law of Motion.`,
          answer: 'An object at rest stays at rest, and an object in motion stays in motion with the same speed and direction unless acted upon by an external force.',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags: [`physics${i % 5}`, 'newton']
        });
        break;
      case 'sentence':
        questions.push({
          id: `sentence-${i}`,
          text: `One sentence answer question ${i}: What is photosynthesis?`,
          answer: 'Photosynthesis is the process by which green plants and some other organisms use sunlight to synthesize nutrients from carbon dioxide and water.',
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags: [`biology${i % 5}`, 'plants']
        });
        break;
      case 'match':
        questions.push({
          id: `match-${i}`,
          items: [
            { id: `${i}-A`, left: `Country ${i}A`, right: `Capital ${i}A` },
            { id: `${i}-B`, left: `Country ${i}B`, right: `Capital ${i}B` },
            { id: `${i}-C`, left: `Country ${i}C`, right: `Capital ${i}C` },
            { id: `${i}-D`, left: `Country ${i}D`, right: `Capital ${i}D` }
          ],
          difficulty: i % 3 === 0 ? 'Hard' : i % 2 === 0 ? 'Medium' : 'Easy',
          tags: [`geography${i % 5}`, 'capitals']
        });
        break;
      default:
        break;
    }
  }
  
  return questions;
};

const Dashboard = () => {
  const router = useRouter();
  
  // States
  const [activeTab, setActiveTab] = useState('fill');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(10);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [availableTags, setAvailableTags] = useState([]);
  const [selectedQuestions, setSelectedQuestions] = useState([]);
  const [viewMode, setViewMode] = useState('grid');
  const [showAnswers, setShowAnswers] = useState(false);
  const [toast, setToast] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newQuestion, setNewQuestion] = useState({
    text: '',
    answer: '',
    difficulty: 'Medium',
    tags: []
  });
  
  // Mock questions data
  const [questions, setQuestions] = useState({
    fill: generateMockQuestions('fill', 50), // Simulate 50 for now, would be 1000+
    brief: generateMockQuestions('brief', 50),
    sentence: generateMockQuestions('sentence', 50),
    match: generateMockQuestions('match', 50)
  });

  // Extract all unique tags for filters
  useEffect(() => {
    const tags = new Set();
    questions[activeTab].forEach(q => {
      if (q.tags) {
        q.tags.forEach(tag => tags.add(tag));
      }
    });
    setAvailableTags(Array.from(tags));
  }, [activeTab, questions]);

  // Show toast message
  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Filter questions based on search query and filters
  const filteredQuestions = questions[activeTab].filter(q => {
    // Apply search
    const matchesSearch = searchQuery === '' || 
      (q.text && q.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (q.items && q.items.some(item => 
        item.left.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.right.toLowerCase().includes(searchQuery.toLowerCase())
      ));
    
    // Apply difficulty filter
    const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
    
    // Apply tags filter
    const matchesTags = selectedTags.length === 0 || 
      (q.tags && selectedTags.every(tag => q.tags.includes(tag)));
    
    return matchesSearch && matchesDifficulty && matchesTags;
  });

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle question selection
  const toggleQuestionSelection = (id) => {
    setSelectedQuestions(prev => {
      if (prev.includes(id)) {
        return prev.filter(qId => qId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  // Select all visible questions
  const selectAllVisible = () => {
    const visibleIds = currentQuestions.map(q => q.id);
    if (selectedQuestions.length === visibleIds.length) {
      setSelectedQuestions([]);
    } else {
      setSelectedQuestions(visibleIds);
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    // In production, this would make an API call to delete from MongoDB
    const updatedQuestions = {...questions};
    updatedQuestions[activeTab] = questions[activeTab].filter(q => !selectedQuestions.includes(q.id));
    setQuestions(updatedQuestions);
    setSelectedQuestions([]);
    showToastMessage(`${selectedQuestions.length} questions deleted successfully`);
  };

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag);
      } else {
        return [...prev, tag];
      }
    });
  };

  // Handle adding a new question
  const handleAddQuestion = () => {
    // Validate
    if (!newQuestion.text || !newQuestion.answer) {
      showToastMessage("Question text and answer are required", "error");
      return;
    }

    // In production, this would make an API call to MongoDB
    const updatedQuestions = {...questions};
    const newId = `${activeTab}-${Date.now()}`;
    
    const questionToAdd = {
      id: newId,
      text: newQuestion.text,
      answer: newQuestion.answer,
      difficulty: newQuestion.difficulty,
      tags: newQuestion.tags.length > 0 ? newQuestion.tags : ['untagged']
    };
    
    updatedQuestions[activeTab] = [questionToAdd, ...questions[activeTab]];
    setQuestions(updatedQuestions);
    
    // Reset form
    setNewQuestion({
      text: '',
      answer: '',
      difficulty: 'Medium',
      tags: []
    });
    
    setIsCreating(false);
    showToastMessage("Question added successfully");
  };

  // Handle adding a tag to new question
  const addTagToNewQuestion = (tag) => {
    if (tag && !newQuestion.tags.includes(tag)) {
      setNewQuestion({...newQuestion, tags: [...newQuestion.tags, tag]});
    }
  };

  // Remove tag from new question
  const removeTagFromNewQuestion = (tag) => {
    setNewQuestion({
      ...newQuestion, 
      tags: newQuestion.tags.filter(t => t !== tag)
    });
  };

  // Tab titles with counts
  const tabTitles = {
    fill: `Fill in the Blanks (${questions.fill.length})`,
    brief: `Brief Answers (${questions.brief.length})`,
    sentence: `One Sentence (${questions.sentence.length})`,
    match: `Match the Following (${questions.match.length})`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast notification */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center gap-2 ${
          toast.type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}>
          {toast.type === 'error' ? <X size={18} /> : <Check size={18} />}
          <span>{toast.message}</span>
        </div>
      )}

      {/* Header Section */}
      <header className="bg-gradient-to-r from-indigo-400 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">Question Bank Dashboard</h1>
              <p className="text-blue-100 mt-1">Manage your question library efficiently</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsCreating(true)}
                className="bg-white text-blue-700 flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-50 transition-all"
              >
                <PlusCircle size={18} />
                <span>Add New</span>
              </button>
              
              <button className="bg-blue-700 text-white flex items-center gap-2 px-4 py-2 rounded-lg shadow-md hover:bg-blue-800 transition-all">
                <Download size={18} />
                <span>Export</span>
              </button>
            </div>
          </div>
          
          {/* Search and Filters Row */}
          <div className="mt-6 flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search questions, answers or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-10 pr-4 py-3 border border-blue-300 bg-white bg-opacity-90 text-gray-800 placeholder-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                >
                  <X size={18} />
                </button>
              )}
            </div>
            
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-3 rounded-lg shadow-sm flex items-center gap-2 transition-all ${
                showFilters 
                  ? 'bg-blue-200 text-blue-800 border border-blue-300' 
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          {/* Advanced Filters Section */}
          {showFilters && (
            <div className="mt-4 bg-white bg-opacity-90 p-4 rounded-lg shadow-sm border border-blue-200 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={selectedDifficulty}
                    onChange={(e) => setSelectedDifficulty(e.target.value)}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="All">All Difficulties</option>
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div className="col-span-1 md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2">
                    {availableTags.slice(0, 10).map(tag => (
                      <button
                        key={tag}
                        onClick={() => toggleTag(tag)}
                        className={`py-1 px-3 rounded-full text-sm font-medium transition-colors ${
                          selectedTags.includes(tag)
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {tag}
                      </button>
                    ))}
                    {availableTags.length > 10 && (
                      <button className="py-1 px-3 rounded-full text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200">
                        +{availableTags.length - 10} more
                      </button>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end mt-4">
                <button 
                  onClick={() => {
                    setSelectedDifficulty('All');
                    setSelectedTags([]);
                  }}
                  className="text-sm text-blue-600 hover:text-blue-800 font-medium"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs Navigation */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-1 border-b border-gray-200">
          {Object.keys(tabTitles).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
                setSelectedQuestions([]);
              }}
              className={`py-3 px-6 font-medium whitespace-nowrap transition-colors ${
                activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-blue-50'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tabTitles[tab]}
            </button>
          ))}
        </div>
        
        {/* Create Question Form */}
        {isCreating && (
          <div className="bg-white shadow rounded-lg mt-6 p-6 border border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Add New Question</h2>
              <button 
                onClick={() => setIsCreating(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                  <textarea
                    value={newQuestion.text}
                    onChange={(e) => setNewQuestion({...newQuestion, text: e.target.value})}
                    placeholder="Enter your question here..."
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                  <textarea
                    value={newQuestion.answer}
                    onChange={(e) => setNewQuestion({...newQuestion, answer: e.target.value})}
                    placeholder="Enter the answer here..."
                    rows={4}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) => setNewQuestion({...newQuestion, difficulty: e.target.value})}
                    className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {newQuestion.tags.map(tag => (
                      <span 
                        key={tag} 
                        className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm flex items-center gap-1"
                      >
                        {tag}
                        <button 
                          onClick={() => removeTagFromNewQuestion(tag)} 
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <X size={14} />
                        </button>
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add tags..."
                      id="newTag"
                      className="flex-grow border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && e.target.value) {
                          e.preventDefault();
                          addTagToNewQuestion(e.target.value);
                          e.target.value = '';
                        }
                      }}
                    />
                    <button
                      onClick={() => {
                        const input = document.getElementById('newTag');
                        if (input.value) {
                          addTagToNewQuestion(input.value);
                          input.value = '';
                        }
                      }}
                      className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setIsCreating(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleAddQuestion}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                Save Question
              </button>
            </div>
          </div>
        )}
        
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-6 mb-4 gap-3">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="selectAll"
              checked={selectedQuestions.length === currentQuestions.length && currentQuestions.length > 0}
              onChange={selectAllVisible}
              className="h-4 w-4 text-blue-600 rounded border-gray-300"
            />
            <label htmlFor="selectAll" className="ml-2 text-sm text-gray-600">
              Select All ({selectedQuestions.length} selected)
            </label>
            
            {selectedQuestions.length > 0 && (
              <button 
                onClick={handleBulkDelete}
                className="ml-4 text-red-600 hover:text-red-800 text-sm font-medium flex items-center gap-1"
              >
                <Trash2 size={16} />
                Delete Selected
              </button>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 ${viewMode === 'grid' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <Grid size={18} />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={`p-2 ${viewMode === 'list' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:bg-gray-100'}`}
              >
                <List size={18} />
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setShowAnswers(!showAnswers)}
                className={`flex items-center gap-1 text-sm font-medium py-1 px-3 rounded-full ${
                  showAnswers 
                    ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                    : 'bg-gray-100 text-gray-700 border border-gray-200 hover:bg-gray-200'
                }`}
              >
                {showAnswers ? <Eye size={16} /> : <EyeOff size={16} />}
                {showAnswers ? 'Hide Answers' : 'Show Answers'}
              </button>
            </div>
            
            <select
              value={questionsPerPage}
              onChange={(e) => {
                setQuestionsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md shadow-sm py-1 px-2 text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value={10}>10 per page</option>
              <option value={25}>25 per page</option>
              <option value={50}>50 per page</option>
              <option value={100}>100 per page</option>
            </select>
          </div>
        </div>
        
        {/* Question Grid / List */}
        {filteredQuestions.length === 0 ? (
          <div className="bg-white p-10 rounded-lg shadow-sm border border-gray-200 text-center">
            <FileText size={48} className="mx-auto text-gray-400 mb-3" />
            <h3 className="text-lg font-medium text-gray-900 mb-1">No questions found</h3>
            <p className="text-gray-500 mb-4">Try changing your search or filters</p>
            <button 
              onClick={() => {
                setSearchQuery('');
                setSelectedDifficulty('All');
                setSelectedTags([]);
              }}
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Clear all filters
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          // Grid View
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {currentQuestions.map((question) => (
              <div 
                key={question.id}
                className={`bg-white rounded-lg shadow-sm border p-4 transition-shadow hover:shadow-md ${
                  selectedQuestions.includes(question.id) ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start mb-3">
                  <input
                    type="checkbox"
                    checked={selectedQuestions.includes(question.id)}
                    onChange={() => toggleQuestionSelection(question.id)}
                    className="h-4 w-4 mt-1 text-blue-600 rounded border-gray-300"
                  />
                  
                  <div className="ml-3 flex-grow">
                    <div className="text-sm">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                        question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {question.difficulty}
                      </span>
                      
                      <span className="text-gray-500 ml-2">#{question.id}</span>
                    </div>
                    
                    <p className="font-medium text-gray-900 mt-1 line-clamp-3">
                      {question.text}
                    </p>
                  </div>
                </div>
                
                {/* Matching items if it's a matching question */}
                {question.items && (
                  <div className="mb-3 border-t pt-2 border-dashed border-gray-200">
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="text-gray-500 font-medium">Item</div>
                      <div className="text-gray-500 font-medium">Match</div>
                      {question.items.slice(0, 2).map((item) => (
                        <React.Fragment key={item.id}>
                          <div className="bg-gray-50 p-1 rounded">{item.left}</div>
                          <div className="bg-gray-50 p-1 rounded">{item.right}</div>
                        </React.Fragment>
                      ))}
                      {question.items.length > 2 && (
                        <div className="col-span-2 text-center text-xs text-gray-500">
                          +{question.items.length - 2} more items
                        </div>
                      )}
                    </div>
                  </div>
                )}
                
                {/* Show answer if toggled */}
                {showAnswers && question.answer && (
                  <div className="mt-3 p-2 bg-green-50 rounded-md border border-green-200">
                    <div className="text-xs font-medium text-green-700 mb-1">Answer:</div>
                    <p className="text-sm text-green-800 line-clamp-2">{question.answer}</p>
                  </div>
                   )}{/* Tags */}
                   <div className="mt-3 flex flex-wrap gap-1">
                     {question.tags && question.tags.map((tag) => (
                       <span 
                         key={tag}
                         className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                       >
                         {tag}
                       </span>
                     ))}
                   </div>
                   
                   <div className="mt-3 pt-2 border-t border-gray-100 flex justify-end">
                     <div className="flex space-x-2">
                       <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                         <Edit3 size={16} />
                       </button>
                       <button className="p-1.5 text-gray-500 hover:text-red-600 transition-colors">
                         <Trash2 size={16} />
                       </button>
                       <button className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors">
                         <MoreHorizontal size={16} />
                       </button>
                     </div>
                   </div>
                 </div>
               ))}
             </div>
           ) : (
             // List View
             <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               <table className="min-w-full divide-y divide-gray-200">
                 <thead className="bg-gray-50">
                   <tr>
                     <th scope="col" className="px-4 py-3 w-10">
                       <input
                         type="checkbox"
                         checked={selectedQuestions.length === currentQuestions.length && currentQuestions.length > 0}
                         onChange={selectAllVisible}
                         className="h-4 w-4 text-blue-600 rounded border-gray-300"
                       />
                     </th>
                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       ID
                     </th>
                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Question
                     </th>
                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Difficulty
                     </th>
                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Tags
                     </th>
                     <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                       Actions
                     </th>
                   </tr>
                 </thead>
                 <tbody className="bg-white divide-y divide-gray-200">
                   {currentQuestions.map((question) => (
                     <tr 
                       key={question.id}
                       className={selectedQuestions.includes(question.id) ? 'bg-blue-50' : 'hover:bg-gray-50'}
                     >
                       <td className="px-4 py-3 w-10">
                         <input
                           type="checkbox"
                           checked={selectedQuestions.includes(question.id)}
                           onChange={() => toggleQuestionSelection(question.id)}
                           className="h-4 w-4 text-blue-600 rounded border-gray-300"
                         />
                       </td>
                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                         #{question.id}
                       </td>
                       <td className="px-4 py-3">
                         <div className="text-sm font-medium text-gray-900 line-clamp-2">
                           {question.text}
                         </div>
                         {showAnswers && question.answer && (
                           <div className="mt-1 text-sm text-green-700 bg-green-50 px-2 py-1 rounded">
                             <span className="font-medium">Answer:</span> {question.answer}
                           </div>
                         )}
                         {question.items && (
                           <div className="mt-1 grid grid-cols-2 gap-x-4 gap-y-1 text-xs text-gray-600">
                             {question.items.slice(0, 2).map((item) => (
                               <React.Fragment key={item.id}>
                                 <div>{item.left} → {item.right}</div>
                               </React.Fragment>
                             ))}
                             {question.items.length > 2 && (
                               <div className="text-gray-500">
                                 +{question.items.length - 2} more
                               </div>
                             )}
                           </div>
                         )}
                       </td>
                       <td className="px-4 py-3 whitespace-nowrap">
                         <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                           question.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                           question.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                           'bg-red-100 text-red-800'
                         }`}>
                           {question.difficulty}
                         </span>
                       </td>
                       <td className="px-4 py-3">
                         <div className="flex flex-wrap gap-1">
                           {question.tags && question.tags.slice(0, 3).map((tag) => (
                             <span 
                               key={tag}
                               className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                             >
                               {tag}
                             </span>
                           ))}
                           {question.tags && question.tags.length > 3 && (
                             <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                               +{question.tags.length - 3}
                             </span>
                           )}
                         </div>
                       </td>
                       <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                         <div className="flex space-x-2">
                           <button className="p-1.5 text-gray-500 hover:text-blue-600 transition-colors">
                             <Edit3 size={16} />
                           </button>
                           <button className="p-1.5 text-gray-500 hover:text-red-600 transition-colors">
                             <Trash2 size={16} />
                           </button>
                           <button className="p-1.5 text-gray-500 hover:text-gray-700 transition-colors">
                             <MoreHorizontal size={16} />
                           </button>
                         </div>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
             </div>
           )}
           
           {/* Pagination */}
           {totalPages > 1 && (
             <div className="flex justify-between items-center mt-6">
               <div className="text-sm text-gray-500">
                 Showing {indexOfFirstQuestion + 1} to {Math.min(indexOfLastQuestion, filteredQuestions.length)} of {filteredQuestions.length} questions
               </div>
               
               <div className="flex space-x-1">
                 <button
                   onClick={() => paginate(1)}
                   disabled={currentPage === 1}
                   className={`px-3 py-1 rounded ${
                     currentPage === 1
                       ? 'text-gray-400 cursor-not-allowed'
                       : 'text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   First
                 </button>
                 
                 <button
                   onClick={() => paginate(currentPage - 1)}
                   disabled={currentPage === 1}
                   className={`px-3 py-1 rounded ${
                     currentPage === 1
                       ? 'text-gray-400 cursor-not-allowed'
                       : 'text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   Previous
                 </button>
                 
                 {/* Page Numbers */}
                 {[...Array(totalPages).keys()].map(number => {
                   // Show current page, one before, and one after (if they exist)
                   if (
                     number + 1 === currentPage ||
                     number + 1 === currentPage - 1 ||
                     number + 1 === currentPage + 1 ||
                     number + 1 === 1 ||
                     number + 1 === totalPages
                   ) {
                     return (
                       <button
                         key={number + 1}
                         onClick={() => paginate(number + 1)}
                         className={`px-3 py-1 rounded ${
                           currentPage === number + 1
                             ? 'bg-blue-600 text-white'
                             : 'text-gray-700 hover:bg-gray-100'
                         }`}
                       >
                         {number + 1}
                       </button>
                     );
                   } else if (
                     (number + 1 === currentPage - 2 && currentPage > 3) ||
                     (number + 1 === currentPage + 2 && currentPage < totalPages - 2)
                   ) {
                     return <span key={number + 1} className="px-1 py-1">...</span>;
                   } else {
                     return null;
                   }
                 })}
                 
                 <button
                   onClick={() => paginate(currentPage + 1)}
                   disabled={currentPage === totalPages}
                   className={`px-3 py-1 rounded ${
                     currentPage === totalPages
                       ? 'text-gray-400 cursor-not-allowed'
                       : 'text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   Next
                 </button>
                 
                 <button
                   onClick={() => paginate(totalPages)}
                   disabled={currentPage === totalPages}
                   className={`px-3 py-1 rounded ${
                     currentPage === totalPages
                       ? 'text-gray-400 cursor-not-allowed'
                       : 'text-gray-700 hover:bg-gray-100'
                   }`}
                 >
                   Last
                 </button>
               </div>
             </div>
           )}
         </main>
         
         <footer className="border-t border-gray-200 bg-white">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
             <div className="flex flex-col md:flex-row justify-between items-center gap-4">
               <div className="text-sm text-gray-500">
                 © 2025 Question Bank Dashboard. All rights reserved.
               </div>
               
               <div className="flex items-center gap-4">
                 <button className="text-gray-500 hover:text-gray-700 text-sm">Help</button>
                 <button className="text-gray-500 hover:text-gray-700 text-sm">Terms</button>
                 <button className="text-gray-500 hover:text-gray-700 text-sm">Privacy</button>
                 <button className="flex items-center gap-1 text-gray-500 hover:text-gray-700 text-sm">
                   <Settings size={16} />
                   Settings
                 </button>
               </div>
             </div>
           </div>
         </footer>
       </div>
     );
   };
   
   export default Dashboard;