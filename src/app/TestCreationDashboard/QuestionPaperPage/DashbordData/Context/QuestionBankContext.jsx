'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const QuestionBankContext = createContext();

export const QuestionBankProvider = ({ children }) => {
  // UI State
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('fill');
  const [viewMode, setViewMode] = useState('grid');
  const [showAnswers, setShowAnswers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  const [sortBy, setSortBy] = useState('newest');

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(12);

  // Question Management
  const [selectedQuestions, setSelectedQuestions] = useState({
    fill: [],
    brief: [],
    sentence: [],
    match: [],
    mcq: [],
    truefalse: [],
    essay: [],
    numerical: [],
    diagram: [],
    practical: []
  });

  // Tab Configuration
  const tabTitles = {
    fill: 'Fill in the Blanks',
    brief: 'Brief Answers',
    sentence: 'One Word/Sentence',
    match: 'Match the Following',
    mcq: 'Multiple Choice',
    truefalse: 'True/False',
    essay: 'Essay Type',
    numerical: 'Numerical Problems',
    diagram: 'Diagram Based',
    practical: 'Practical Questions'
  };

  // Sample Questions Data
  const [questions, setQuestions] = useState({
    fill: [
      {
        id: 'fill-1',
        text: 'The capital of India is _______.',
        answer: 'New Delhi',
        difficulty: 'Easy',
        tags: ['Geography', 'India'],
        starred: false,
        createdAt: new Date('2024-01-15')
      },
      {
        id: 'fill-2',
        text: 'The largest planet in our solar system is _______.',
        answer: 'Jupiter',
        difficulty: 'Medium',
        tags: ['Science', 'Astronomy'],
        starred: true,
        createdAt: new Date('2024-01-10')
      }
    ],
    brief: [
      {
        id: 'brief-1',
        text: 'Explain the process of photosynthesis.',
        answer: 'Photosynthesis is the process by which plants convert sunlight, carbon dioxide, and water into glucose and oxygen.',
        difficulty: 'Medium',
        tags: ['Biology', 'Plants'],
        starred: false,
        createdAt: new Date('2024-01-12')
      }
    ],
    sentence: [
      {
        id: 'sentence-1',
        text: 'Who invented the telephone?',
        answer: 'Alexander Graham Bell',
        difficulty: 'Easy',
        tags: ['History', 'Inventions'],
        starred: false,
        createdAt: new Date('2024-01-08')
      }
    ],
    match: [
      {
        id: 'match-1',
        items: [
          { id: 'item-1', left: 'Apple', right: 'Red' },
          { id: 'item-2', left: 'Sky', right: 'Blue' },
          { id: 'item-3', left: 'Grass', right: 'Green' }
        ],
        difficulty: 'Easy',
        tags: ['Colors', 'Basic'],
        starred: false,
        createdAt: new Date('2024-01-05')
      }
    ],
    mcq: [
      {
        id: 'mcq-1',
        text: 'What is the largest mammal in the world?',
        options: ['Elephant', 'Blue Whale', 'Giraffe', 'Hippopotamus'],
        answer: 'Blue Whale',
        difficulty: 'Medium',
        tags: ['Biology', 'Animals'],
        starred: true,
        createdAt: new Date('2024-01-14')
      }
    ],
    truefalse: [
      {
        id: 'tf-1',
        text: 'The Earth is flat.',
        answer: 'False',
        difficulty: 'Easy',
        tags: ['Geography', 'Science'],
        starred: false,
        createdAt: new Date('2024-01-11')
      }
    ],
    essay: [
      {
        id: 'essay-1',
        text: 'Discuss the impact of technology on modern education.',
        answer: 'Technology has revolutionized education by providing access to online resources, interactive learning platforms, and remote learning opportunities...',
        difficulty: 'Hard',
        tags: ['Technology', 'Education'],
        starred: false,
        createdAt: new Date('2024-01-13')
      }
    ],
    numerical: [
      {
        id: 'num-1',
        text: 'Calculate the area of a circle with radius 5 cm.',
        answer: '78.54 cm²',
        difficulty: 'Medium',
        tags: ['Mathematics', 'Geometry'],
        starred: false,
        createdAt: new Date('2024-01-09')
      }
    ],
    diagram: [
      {
        id: 'diag-1',
        text: 'Draw and label the parts of a plant cell.',
        answer: 'Diagram should include: cell wall, cell membrane, nucleus, cytoplasm, chloroplasts, vacuole',
        difficulty: 'Hard',
        tags: ['Biology', 'Cell Structure'],
        starred: true,
        createdAt: new Date('2024-01-07')
      }
    ],
    practical: [
      {
        id: 'prac-1',
        text: 'Demonstrate the procedure to test for starch in leaves.',
        answer: 'Boil leaf in water, then in alcohol, add iodine solution. Blue-black color indicates starch presence.',
        difficulty: 'Hard',
        tags: ['Biology', 'Experiments'],
        starred: false,
        createdAt: new Date('2024-01-06')
      }
    ]
  });

  // Get all unique tags
  const allTags = React.useMemo(() => {
    const tagSet = new Set();
    Object.values(questions).forEach(questionList => {
      questionList.forEach(question => {
        if (question.tags) {
          question.tags.forEach(tag => tagSet.add(tag));
        }
      });
    });
    return Array.from(tagSet).sort();
  }, [questions]);

  // Filter questions based on current filters
  const filteredQuestions = React.useMemo(() => {
    let filtered = [...questions[activeTab]];

    // Search filter
    if (searchQuery.trim()) {
      filtered = filtered.filter(q => {
        const searchLower = searchQuery.toLowerCase();
        const textMatch = q.text && q.text.toLowerCase().includes(searchLower);
        const answerMatch = q.answer && q.answer.toLowerCase().includes(searchLower);
        const tagMatch = q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchLower));
        return textMatch || answerMatch || tagMatch;
      });
    }

    // Difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        q.tags && selectedTags.some(tag => q.tags.includes(tag))
      );
    }

    // Starred filter
    if (showOnlyStarred) {
      filtered = filtered.filter(q => q.starred);
    }

    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'difficulty':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        default:
          return 0;
      }
    });

    return filtered;
  }, [questions, activeTab, searchQuery, selectedDifficulty, selectedTags, showOnlyStarred, sortBy]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

  // Helper functions
  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleQuestionSelection = (questionId) => {
    setSelectedQuestions(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].includes(questionId)
        ? prev[activeTab].filter(id => id !== questionId)
        : [...prev[activeTab], questionId]
    }));
  };

  const selectAllVisible = (questionIds, shouldSelect) => {
    setSelectedQuestions(prev => ({
      ...prev,
      [activeTab]: shouldSelect 
        ? [...new Set([...prev[activeTab], ...questionIds])]
        : prev[activeTab].filter(id => !questionIds.includes(id))
    }));
  };

  const toggleStarred = (questionId) => {
    setQuestions(prev => ({
      ...prev,
      [activeTab]: prev[activeTab].map(q => 
        q.id === questionId ? { ...q, starred: !q.starred } : q
      )
    }));
  };

  const toggleTagSelection = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    setDateRange('all');
    setShowOnlyStarred(false);
    setCurrentPage(1);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedDifficulty, selectedTags, showOnlyStarred, activeTab]);

  const contextValue = {
    // UI State
    showSidebar,
    setShowSidebar,
    activeTab,
    setActiveTab,
    viewMode,
    setViewMode,
    showAnswers,
    setShowAnswers,
    showFilters,
    setShowFilters,
    toast,
    setToast,

    // Filter States
    searchQuery,
    setSearchQuery,
    selectedDifficulty,
    setSelectedDifficulty,
    selectedTags,
    setSelectedTags,
    dateRange,
    setDateRange,
    showOnlyStarred,
    setShowOnlyStarred,
    sortBy,
    setSortBy,

    // Pagination
    currentPage,
    setCurrentPage,
    questionsPerPage,
    setQuestionsPerPage,
    totalPages,
    indexOfFirstQuestion,
    indexOfLastQuestion,

    // Questions and Data
    questions,
    setQuestions,
    selectedQuestions,
    setSelectedQuestions,
    filteredQuestions,
    currentQuestions,
    allTags,
    tabTitles,

    // Helper Functions
    showToastMessage,
    toggleQuestionSelection,
    selectAllVisible,
    toggleStarred,
    toggleTagSelection,
    resetFilters,
    paginate
  };

  return (
    <QuestionBankContext.Provider value={contextValue}>
      {children}
    </QuestionBankContext.Provider>
  );
};

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
  if (!context) {
    throw new Error('useQuestionBank must be used within a QuestionBankProvider');
  }
  return context;
};