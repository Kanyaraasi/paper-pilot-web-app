import React, { createContext, useContext, useState, useEffect } from 'react';
import { useSessionStorage } from '../../hooks/useSessionStorage';

const QuestionBankContext = createContext();

export const QuestionBankProvider = ({
  children,
  formData,
  onNext,
  onPrevious,
  currentStep,
  onQuestionsUpdate
}) => {
  // Session storage for selected questions
  const [selectedQuestions, setSelectedQuestions] = useSessionStorage('selectedQuestions', {
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

  // UI State
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('fill');
  const [viewMode, setViewMode] = useState('grid');
  const [showAnswers, setShowAnswers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    formData?.subjects?.find((s) => s.selected)?.id
  );
  const [chapters, setChapters] = useState([]);
  const [activeChapter, setActiveChapter] = useState('');
  const [totalPage, setTotalPage] = useState(1);

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
  const [questions, setQuestions] = useState({
    fill: [
      {
        id: 1,
        text: 'The capital of France is _______.',
        answer: 'Paris',
        difficulty: 'Easy',
        tags: ['Geography', 'Europe'],
        starred: false,
        createdAt: new Date('2024-01-15'),
        marks: 2,
      },
      {
        id: 2,
        text: 'The largest planet in our solar system is _______.',
        answer: 'Jupiter',
        difficulty: 'Medium',
        tags: ['Astronomy', 'Science'],
        starred: true,
        createdAt: new Date('2024-01-16'),
        marks: 3,
      }
    ],
    brief: [
      {
        id: 3,
        text: 'Explain the process of photosynthesis.',
        answer: 'Photosynthesis is the process by which plants convert light energy into chemical energy.',
        difficulty: 'Medium',
        tags: ['Biology', 'Plants'],
        starred: false,
        createdAt: new Date('2024-01-17'),
        marks: 5,
      }
    ],
    mcq: [
      {
        id: 4,
        text: 'What is the chemical symbol for gold?',
        options: ['Au', 'Ag', 'Cu', 'Fe'],
        answer: 'Au',
        difficulty: 'Easy',
        tags: ['Chemistry', 'Elements'],
        starred: false,
        createdAt: new Date('2024-01-18'),
        marks: 1,
      },
      {
        id: 5,
        text: 'Which of the following is a prime number?',
        options: ['15', '21', '23', '27'],
        answer: '23',
        difficulty: 'Medium',
        tags: ['Mathematics', 'Numbers'],
        starred: true,
        createdAt: new Date('2024-01-19'),
        marks: 2,
      }
    ],
    match: [
      {
        id: 6,
        text: 'Match the following countries with their capitals:',
        items: [
          { id: 'item-1', left: 'India', right: 'New Delhi' },
          { id: 'item-2', left: 'Japan', right: 'Tokyo' },
          { id: 'item-3', left: 'Brazil', right: 'Brasília' }
        ],
        difficulty: 'Medium',
        tags: ['Geography', 'Capitals'],
        starred: false,
        createdAt: new Date('2024-01-20'),
        marks: 3,
      }
    ],
    truefalse: [
      {
        id: 7,
        text: 'The Earth is flat.',
        answer: 'False',
        difficulty: 'Easy',
        tags: ['Geography', 'Science'],
        starred: false,
        createdAt: new Date('2024-01-21'),
        marks: 1,
      }
    ],
    essay: [
      {
        id: 8,
        text: 'Discuss the impact of climate change on global ecosystems.',
        answer: 'Climate change significantly affects global ecosystems through various mechanisms...',
        difficulty: 'Hard',
        tags: ['Environment', 'Climate'],
        starred: true,
        createdAt: new Date('2024-01-22'),
        marks: 10,
      }
    ],
    numerical: [
      {
        id: 9,
        text: 'Calculate the area of a circle with radius 5 cm.',
        answer: '78.54 cm²',
        difficulty: 'Medium',
        tags: ['Mathematics', 'Geometry'],
        starred: false,
        createdAt: new Date('2024-01-23'),
        marks: 4,
      }
    ]
  });

  // Tab Configuration
  const tabTitles = {
    fill: 'Fill in the Blanks',
    brief: 'Short Answer',
    sentence: 'Short Answer',
    match: 'Match the Following',
    mcq: 'MCQ',
    truefalse: 'True/False',
    essay: 'Long Answer',
    numerical: 'Numerical',
  };

  // Update parent component when selected questions change
  useEffect(() => {
    if (onQuestionsUpdate) {
      onQuestionsUpdate(selectedQuestions);
    }
  }, [selectedQuestions, onQuestionsUpdate]);

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
    let filtered = questions[activeTab] || [];

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(q => 
        q.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Apply tags filter
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        q.tags && q.tags.some(tag => selectedTags.includes(tag))
      );
    }

    // Apply starred filter
    if (showOnlyStarred) {
      filtered = filtered.filter(q => q.starred);
    }

    // Apply sorting
    switch (sortBy) {
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'oldest':
        filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
      case 'difficulty':
        const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
        filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
        break;
      default:
        break;
    }

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

  // Get selected questions for current tab
  const getSelectedQuestionsForTab = (tab) => {
    const selectedIds = selectedQuestions[tab] || [];
    return questions[tab]?.filter(q => selectedIds.includes(q.id)) || [];
  };

  // Get all selected questions across all tabs
  const getAllSelectedQuestions = () => {
    const allSelected = [];
    Object.keys(questions).forEach(tab => {
      const tabQuestions = getSelectedQuestionsForTab(tab);
      allSelected.push(...tabQuestions.map(q => ({ ...q, type: tab })));
    });
    return allSelected;
  };

  // Clear all selected questions
  const clearAllSelectedQuestions = () => {
    const emptySelection = {
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
    };
    setSelectedQuestions(emptySelection);
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
    loading,
    subjects,
    setSubjects,
    selectedSubjectId,
    setSelectedSubjectId,
    chapters,
    setChapters,
    activeChapter,
    setActiveChapter,
    totalPage,
    setTotalPage,

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
    paginate,
    getSelectedQuestionsForTab,
    getAllSelectedQuestions,
    clearAllSelectedQuestions,

    // Navigation props
    onNext,
    onPrevious,
    currentStep,
    formData
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