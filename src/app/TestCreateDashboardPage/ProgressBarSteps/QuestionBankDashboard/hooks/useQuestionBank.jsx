import { useState, useEffect, useMemo } from 'react';
import { generateMockQuestions } from './generateMockQuestions';

const useQuestionBank = () => {
  // State for tabs and questions
  const [activeTab, setActiveTab] = useState('fill');
  const [questions, setQuestions] = useState({
    fill: [],
    brief: [],
    sentence: [],
    match: []
  });

  // State for selected questions
  const [selectedQuestions, setSelectedQuestions] = useState({
    fill: [],
    brief: [],
    sentence: [],
    match: []
  });

  // State for filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedTags, setSelectedTags] = useState([]);
  const [dateRange, setDateRange] = useState('all');
  const [showOnlyStarred, setShowOnlyStarred] = useState(false);
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage, setQuestionsPerPage] = useState(20);
  
  // State for sorting
  const [sortBy, setSortBy] = useState('newest');

  // State for view options
  const [viewMode, setViewMode] = useState('grid');
  const [showAnswers, setShowAnswers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [showSidebar, setShowSidebar] = useState(true);
  
  // Toast state
  const [toast, setToast] = useState(null);
  
  // Initialize mock data
  useEffect(() => {
    setQuestions({
      fill: generateMockQuestions('fill', 500),
      brief: generateMockQuestions('brief', 500),
      sentence: generateMockQuestions('sentence', 500),
      match: generateMockQuestions('match', 500)
    });
  }, []);

  // Toast message helper function
  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // Extract all unique tags for filter dropdown
  const allTags = useMemo(() => {
    const tagSet = new Set();
    Object.values(questions).forEach(categoryQuestions => {
      categoryQuestions.forEach(question => {
        if (question.tags) {
          question.tags.forEach(tag => tagSet.add(tag));
        }
      });
    });
    return Array.from(tagSet).sort();
  }, [questions]);

  // Filter questions based on all filters
  const filteredQuestions = useMemo(() => {
    return questions[activeTab].filter(q => {
      // Apply search
      const matchesSearch = searchQuery === '' || 
        (q.text && q.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.items && q.items.some(item => 
          item.left.toLowerCase().includes(searchQuery.toLowerCase()) || 
          item.right.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
        (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
      
      // Apply difficulty filter
      const matchesDifficulty = selectedDifficulty === 'All' || q.difficulty === selectedDifficulty;
      
      // Apply tag filter
      const matchesTags = selectedTags.length === 0 || 
        (q.tags && selectedTags.every(tag => q.tags.includes(tag)));
      
      // Apply date range filter
      let matchesDateRange = true;
      if (dateRange !== 'all' && q.createdAt) {
        const today = new Date();
        const questionDate = new Date(q.createdAt);
        const daysDiff = Math.floor((today - questionDate) / (1000 * 60 * 60 * 24));
        
        switch (dateRange) {
          case 'today':
            matchesDateRange = daysDiff < 1;
            break;
          case 'week':
            matchesDateRange = daysDiff < 7;
            break;
          case 'month':
            matchesDateRange = daysDiff < 30;
            break;
          default:
            matchesDateRange = true;
        }
      }
      
      // Apply starred filter
      const matchesStarred = !showOnlyStarred || q.starred;
      
      return matchesSearch && matchesDifficulty && matchesTags && matchesDateRange && matchesStarred;
    });
  }, [
    questions, 
    activeTab, 
    searchQuery, 
    selectedDifficulty, 
    selectedTags, 
    dateRange,
    showOnlyStarred
  ]);

  // Sort the filtered questions
  const sortedQuestions = useMemo(() => {
    return [...filteredQuestions].sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt);
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt);
        case 'a-z':
          return (a.text || '').localeCompare(b.text || '');
        case 'z-a':
          return (b.text || '').localeCompare(a.text || '');
        case 'difficulty-asc':
          const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
          return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        case 'difficulty-desc':
          const difficultyOrderDesc = { 'Easy': 3, 'Medium': 2, 'Hard': 1 };
          return difficultyOrderDesc[a.difficulty] - difficultyOrderDesc[b.difficulty];
        case 'most-used':
          return (b.timesUsed || 0) - (a.timesUsed || 0);
        default:
          return 0;
      }
    });
  }, [filteredQuestions, sortBy]);

  // Pagination
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = sortedQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);
  const totalPages = Math.ceil(sortedQuestions.length / questionsPerPage);

  // Calculate questions stats
  const questionStats = useMemo(() => {
    const stats = {
      total: questions[activeTab].length,
      easy: questions[activeTab].filter(q => q.difficulty === 'Easy').length,
      medium: questions[activeTab].filter(q => q.difficulty === 'Medium').length,
      hard: questions[activeTab].filter(q => q.difficulty === 'Hard').length,
      starred: questions[activeTab].filter(q => q.starred).length,
    };
    return stats;
  }, [questions, activeTab]);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Toggle question selection
  const toggleQuestionSelection = (id) => {
    setSelectedQuestions(prev => {
      const currentTabSelections = [...prev[activeTab]];
      
      if (currentTabSelections.includes(id)) {
        // Remove the question if already selected
        return {
          ...prev,
          [activeTab]: currentTabSelections.filter(qId => qId !== id)
        };
      } else {
        // Check if we've reached the 5-question limit
        if (currentTabSelections.length >= 5) {
          // Show error toast
          console.log(currentTabSelections,'currentTabSelections')
          showToastMessage("upto 5 questions are not allowed.", "error");
          return prev;
        } else {
          // Add the question if under the limit
          return {
            ...prev,
            [activeTab]: [...currentTabSelections, id]
          };
        }
      }
    });
  };

  // Select all visible, with 5-question limit
  const selectAllVisible = () => {
    const visibleIds = currentQuestions.map(q => q.id);
    const currentTabSelections = [...selectedQuestions[activeTab]];
    
    if (currentTabSelections.length === visibleIds.length) {
      // If all visible questions are already selected, deselect them all
      setSelectedQuestions({
        ...selectedQuestions,
        [activeTab]: []
      });
    } else {
      // Select visible questions up to the 5-question limit
      if (visibleIds.length > 5) {
        showToastMessage("upto 5 questions are not allowed.", "error");
        
        // Select only the first 5 visible questions
        setSelectedQuestions({
          ...selectedQuestions,
          [activeTab]: visibleIds.slice(0, 5)
        });
      } else {
        // Select all visible questions if under the limit
        setSelectedQuestions({
          ...selectedQuestions,
          [activeTab]: visibleIds
        });
      }
    }
  };

  // Handle bulk delete
  const handleBulkDelete = () => {
    const currentTabSelections = selectedQuestions[activeTab];
    if (currentTabSelections.length === 0) return;
    
    // In production, this would make an API call to delete from MongoDB
    const updatedQuestions = {...questions};
    updatedQuestions[activeTab] = questions[activeTab].filter(q => !currentTabSelections.includes(q.id));
    setQuestions(updatedQuestions);
    
    // Clear selections for this tab
    setSelectedQuestions({
      ...selectedQuestions,
      [activeTab]: []
    });
    
    showToastMessage(`${currentTabSelections.length} questions deleted successfully`);
  };

  // Handle single question delete
  const handleDeleteQuestion = (id) => {
    const updatedQuestions = {...questions};
    updatedQuestions[activeTab] = questions[activeTab].filter(q => q.id !== id);
    setQuestions(updatedQuestions);
    
    // Remove from selection if selected
    if (selectedQuestions[activeTab].includes(id)) {
      setSelectedQuestions({
        ...selectedQuestions,
        [activeTab]: selectedQuestions[activeTab].filter(qId => qId !== id)
      });
    }
    
    showToastMessage("Question deleted successfully");
  };

  // Toggle starred status for a question
  const toggleStarred = (id) => {
    const updatedQuestions = {...questions};
    updatedQuestions[activeTab] = questions[activeTab].map(q => 
      q.id === id ? {...q, starred: !q.starred} : q
    );
    setQuestions(updatedQuestions);
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedDifficulty('All');
    setSelectedTags([]);
    setDateRange('all');
    setShowOnlyStarred(false);
  };

  // Toggle tag selection in filters
  const toggleTagSelection = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  // Tab titles with counts
  const tabTitles = {
    fill: `Fill in Blanks (${selectedQuestions.fill.length}/5)`,
    brief: `Brief Answers (${selectedQuestions.brief.length}/5)`,
    sentence: `One Sentence (${selectedQuestions.sentence.length}/5)`,
    match: `Matching (${selectedQuestions.match.length}/5)`
  };
  // console.log(currentTabSelections,'currentTabSelections')

  return {
    // State
    activeTab,
    questions,
    selectedQuestions,
    searchQuery,
    selectedDifficulty,
    selectedTags,
    dateRange,
    currentPage,
    questionsPerPage,
    sortBy,
    viewMode,
    showAnswers,
    showFilters,
    showSidebar,
    showOnlyStarred,
    toast,
    
    // Derived state
    allTags,
    filteredQuestions,
    sortedQuestions,
    currentQuestions,
    totalPages,
    questionStats,
    indexOfFirstQuestion,
    indexOfLastQuestion,
    tabTitles,
    
    // Actions
    setActiveTab,
    setQuestions,
    setSelectedQuestions,
    setSearchQuery,
    setSelectedDifficulty,
    setSelectedTags,
    setDateRange,
    setCurrentPage,
    setQuestionsPerPage,
    setSortBy,
    setViewMode,
    setShowAnswers,
    setShowFilters,
    setShowSidebar,
    setShowOnlyStarred,
    toggleQuestionSelection,
    selectAllVisible,
    handleBulkDelete,
    handleDeleteQuestion,
    toggleStarred,
    resetFilters,
    toggleTagSelection,
    paginate,
    showToastMessage,
    setToast,
  };
};

export default useQuestionBank;