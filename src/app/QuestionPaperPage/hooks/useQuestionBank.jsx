import { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { BASE_URL } from '../../../../BASE_URL';

const useQuestionBank = () => {
  // State for tabs and questions
  const [activeTab, setActiveTab] = useState('fill');
  const [questions, setQuestions] = useState({
    fill: [],
    brief: [],
    sentence: [],
    match: []
  });

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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

  // Function to get exam details from localStorage
  const getExamDetails = () => {
    try {
      const examDetails = localStorage.getItem("examDetails");
      if (examDetails) {
        const parsedDetails = JSON.parse(examDetails);
        return {
          standard: parsedDetails.grade?.replace('th', ''), // Convert "10th" to "10"
          subject: parsedDetails.subject
        };
      }
    } catch (error) {
      console.error('Error parsing exam details:', error);
    }
    return null;
  };

  // Function to map API question type to our tab structure
  const mapQuestionTypeToTab = (apiType) => {
    const typeMapping = {
      'fill': 'fill',
      'short': 'brief',
      'medium': 'sentence', 
      'long': 'sentence',
      'mcq': 'match' // Treating MCQ as match for now, adjust as needed
    };
    return typeMapping[apiType] || 'brief';
  };

  // Function to determine difficulty based on marks
  const getDifficultyFromMarks = (marks) => {
    if (marks <= 2) return 'Easy';
    if (marks <= 5) return 'Medium';
    return 'Hard';
  };

  // Function to transform API response to our question format
  const transformApiQuestions = (apiQuestions) => {
    const categorizedQuestions = {
      fill: [],
      brief: [],
      sentence: [],
      match: []
    };

    apiQuestions.forEach(apiQuestion => {
      const tab = mapQuestionTypeToTab(apiQuestion.type);
      
      const transformedQuestion = {
        id: apiQuestion._id,
        text: apiQuestion.text,
        answer: apiQuestion.answer,
        type: apiQuestion.type,
        difficulty: getDifficultyFromMarks(apiQuestion.marks),
        marks: apiQuestion.marks,
        chapterNo: apiQuestion.chapterNo,
        options: apiQuestion.options || [],
        createdAt: apiQuestion.createdAt,
        updatedAt: apiQuestion.updatedAt,
        starred: false, // Default value, can be managed separately
        timesUsed: 0, // Default value
        tags: [`Chapter ${apiQuestion.chapterNo}`, `${apiQuestion.marks} marks`] // Generate tags
      };

      // For matching type questions, create items structure if needed
      if (tab === 'match' && apiQuestion.options && apiQuestion.options.length > 0) {
        transformedQuestion.items = apiQuestion.options.map((option, index) => ({
          left: `Option ${index + 1}`,
          right: option
        }));
      }

      categorizedQuestions[tab].push(transformedQuestion);
    });

    return categorizedQuestions;
  };

  // Function to fetch questions from API
  const fetchQuestions = async () => {
    const examDetails = getExamDetails();
    
    if (!examDetails) {
      setError('Exam details not found in localStorage');
      return;
    }

    const { standard, subject } = examDetails;
    
    setLoading(true);
    setError(null);

    try {
      // Extract subject name (remove "- 1" part if present)
      const subjectName = subject.split(' - ')[0].toLowerCase();
      console.log('subject name', subjectName)
      console.log('standard name', standard)
      const response = await axios.get(`${BASE_URL}/api/questions`, {
        params: {
          subjectName: subjectName,
          standard: standard
        }
      });

      if (response.data.success) {
        const transformedQuestions = transformApiQuestions(response.data.data);
        setQuestions(transformedQuestions);
      } else {
        setError('Failed to fetch questions');
      }
    } catch (err) {
      console.error('API Error:', err);
      setError(err.response?.data?.message || 'Failed to fetch questions');
    } finally {
      setLoading(false);
    }
  };

  // Initialize questions from API
  useEffect(() => {
    fetchQuestions();
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
          showToastMessage("Up to 5 questions are allowed per category.", "error");
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
        showToastMessage("Up to 5 questions are allowed per category.", "error");
        
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
  const handleBulkDelete = async () => {
    const currentTabSelections = selectedQuestions[activeTab];
    if (currentTabSelections.length === 0) return;
    
    try {
      // In production, make API calls to delete from MongoDB
      // await axios.delete(`${BASE_URL}/api/questions/bulk`, { data: { ids: currentTabSelections } });
      
      // For now, just remove from local state
      const updatedQuestions = {...questions};
      updatedQuestions[activeTab] = questions[activeTab].filter(q => !currentTabSelections.includes(q.id));
      setQuestions(updatedQuestions);
      
      // Clear selections for this tab
      setSelectedQuestions({
        ...selectedQuestions,
        [activeTab]: []
      });
      
      showToastMessage(`${currentTabSelections.length} questions deleted successfully`);
    } catch (error) {
      showToastMessage("Failed to delete questions", "error");
    }
  };

  // Handle single question delete
  const handleDeleteQuestion = async (id) => {
    try {
      // In production, make API call to delete from MongoDB
      // await axios.delete(`${BASE_URL}/api/questions/${id}`);
      
      // For now, just remove from local state
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
    } catch (error) {
      showToastMessage("Failed to delete question", "error");
    }
  };

  // Toggle starred status for a question
  const toggleStarred = async (id) => {
    try {
      // In production, make API call to update starred status
      // await axios.patch(`${BASE_URL}/api/questions/${id}/star`);
      
      // For now, just update local state
      const updatedQuestions = {...questions};
      updatedQuestions[activeTab] = questions[activeTab].map(q => 
        q.id === id ? {...q, starred: !q.starred} : q
      );
      setQuestions(updatedQuestions);
    } catch (error) {
      showToastMessage("Failed to update starred status", "error");
    }
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

  // Function to refresh questions (useful for retrying after errors)
  const refreshQuestions = () => {
    fetchQuestions();
  };

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
    loading,
    error,
    
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
    refreshQuestions,
  };
};

export default useQuestionBank;