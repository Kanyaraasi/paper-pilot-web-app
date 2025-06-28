'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { subjectService } from '@/apiServices/subjectServices';
import { questionService } from '@/apiServices/questionsServices';


const QuestionBankContext = createContext();

export const QuestionBankProvider = ({
  children,
  formData,
  onNext,
  onPrevious,
  currentStep,
}) => {

  // UI State
  const [showSidebar, setShowSidebar] = useState(true);
  const [activeTab, setActiveTab] = useState('fill');
  const [viewMode, setViewMode] = useState('grid');
  const [showAnswers, setShowAnswers] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [selectedSubjectId, setSelectedSubjectId] = useState(formData?.subjects?.find((s) => s.selected)?.id);
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

  const loadSubjectChapters = async (subjectId) => {
    try {
      setLoading(true);
      const response = await subjectService.getSubjectById(subjectId);
      
      if (response && response.chapters) {
        const activeChapters = response.chapters.filter(chapter => chapter.isActive);
        setChapters(activeChapters);
        
        // Only set first active chapter as default if no chapter is currently selected
        if (!activeChapter && activeChapters.length > 0) {
          setActiveChapter(activeChapters[0]._id);
        }
      }
    } catch (error) {
      console.error('Error loading subject chapters:', error);
      showToastMessage('Error loading chapters', 'error');
    } finally {
      setLoading(false);
    }
  };
  

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
    brief: 'Short Answer',
    sentence: 'Short Answer',
    match: 'Match the Following',
    mcq: 'MCQ',
    truefalse: 'True/False',
    essay: 'Long Answer',
    numerical: 'Numerical',
  };

  const getBackendType = (tab) => {
    const typeMap = {
      fill: 'Fill in the Blanks',
      brief: 'Short Answer',
      sentence: 'Short Answer',
      match: 'Match the Following',
      mcq: 'MCQ',
      truefalse: 'True/False',
      essay: 'Long Answer',
      numerical: 'Numerical',
    };
    return typeMap[tab] || 'Short Answer';
  };


  // Sample Questions Data
  const [questions, setQuestions] = useState({
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

  // Add this import at the top with other imports

// Modify the loadQuestions function to use the new API when activeChapter is set
// Replace the existing loadQuestions function with this:
const loadQuestions = async (filters = {}) => {
  if (!selectedSubjectId) {
    console.error('🚫 No subject selected');
    showToastMessage('Please select a subject', 'error');
    return;
  }

  try {
    setLoading(true);

    const params = {
      page: currentPage,
      limit: questionsPerPage,
      type: getBackendType(activeTab), // required by backend
      ...(selectedDifficulty !== 'All' && { difficulty: selectedDifficulty }),
      ...(searchQuery && { search: searchQuery }),
      ...(selectedTags.length > 0 && { tags: selectedTags.join(',') }),
      sortBy,
      ...filters,
    };

    console.log('📤 Query Params:', params);
    console.log('📍 Selected Subject:', selectedSubjectId);
    console.log('📍 Active Chapter:', activeChapter);
    console.log('📍 Active Tab (type):', activeTab);

    const response = await (activeChapter
      ? questionService.getQuestionsBySubjectAndChapter(selectedSubjectId, activeChapter, params)
      : questionService.getQuestionsBySubject(selectedSubjectId, params));

    console.log('📥 Raw API Response:', response);

    if (!response || !Array.isArray(response.questions)) {
      console.warn('⚠️ No questions found or invalid response format');
      setQuestions(prev => ({ ...prev, [activeTab]: [] }));
      setTotalPage(0);
      showToastMessage('No questions found', 'info');
      return;
    }

    const transformedQuestions = response.questions.map(q => {
      const transformed = {
        id: q._id,
        text: q.content,
        difficulty: q.difficulty,
        tags: q.tags || [],
        starred: false,
        createdAt: new Date(q.createdAt),
        answer:q.correctAnswer
      };

      if (q.type === 'MCQ') {
        transformed.options = q.options?.map(opt => opt.text) || [];
        transformed.answer = q.options?.find(opt => opt.isCorrect)?.text || q.correctAnswer;
      }

      if (q.type === 'Match the Following') {
        transformed.items = q.matchItems || [];
      }

      console.log('🔄 Transformed Question:', transformed);
      return transformed;
    });

    console.log('✅ All Questions Transformed:', transformedQuestions);

    setQuestions(prev => ({
      ...prev,
      [activeTab]: transformedQuestions,
    }));

    setTotalPage(response.totalPages || 1);
    setCurrentPage(response.currentPage || 1);

    console.log(`📄 Page Info => Current: ${response.currentPage}, Total: ${response.totalPages}`);

  } catch (error) {
    console.error('❌ Error loading questions:', error.message, error);
    showToastMessage('Failed to load questions. Please try again.', 'error');
  } finally {
    console.log('✅ Finished loading questions.');
    setLoading(false);
  }
};




  const createQuestion = async (questionData) => {
    try {
      setLoading(true);
      
      // Transform frontend data to backend format
      const backendQuestion = {
        content: questionData.text,
        type: getBackendType(activeTab),
        difficulty: questionData.difficulty,
        marks: 1, // Default marks
        subject: questionData.subjectId, // Add subject selection logic
        chapter: questionData.chapterId, // Add chapter selection logic
        chapterName: questionData.chapterName,
        tags: questionData.tags || [],
        correctAnswer: questionData.answer,
        explanation: questionData.explanation || '',
        // Handle MCQ options
        ...(activeTab === 'mcq' && {
          options: questionData.options?.map((opt, index) => ({
            text: opt,
            isCorrect: opt === questionData.answer
          })) || []
        })
      };

      const response = await questionService.createQuestion(backendQuestion);
      
      if (response.success) {
        showToastMessage('Question created successfully');
        // loadQuestions(); // Reload questions
        return response.data;
      }
    } catch (error) {
      console.error('Error creating question:', error);
      showToastMessage('Error creating question', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update question
  const updateQuestion = async (questionId, questionData) => {
    try {
      setLoading(true);
      
      const backendQuestion = {
        content: questionData.text,
        type: getBackendType(activeTab),
        difficulty: questionData.difficulty,
        tags: questionData.tags || [],
        correctAnswer: questionData.answer,
        explanation: questionData.explanation || '',
        ...(activeTab === 'mcq' && {
          options: questionData.options?.map((opt) => ({
            text: opt,
            isCorrect: opt === questionData.answer
          })) || []
        })
      };

      const response = await questionService.updateQuestion(questionId, backendQuestion);
      
      if (response.success) {
        showToastMessage('Question updated successfully');
        // loadQuestions(); // Reload questions
        return response.data;
      }
    } catch (error) {
      console.error('Error updating question:', error);
      showToastMessage('Error updating question', 'error');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Delete question
  const deleteQuestion = async (questionId) => {
    try {
      setLoading(true);
      const response = await questionService.deleteQuestion(questionId);
      
      if (response.success) {
        showToastMessage('Question deleted successfully');
        // loadQuestions(); // Reload questions
      }
    } catch (error) {
      console.error('Error deleting question:', error);
      showToastMessage('Error deleting question', 'error');
    } finally {
      setLoading(false);
    }
  };

  // Load questions when filters change
// Load questions when filters change
useEffect(() => {
  if (selectedSubjectId) {
    loadQuestions();
  }
}, [activeTab, currentPage, selectedDifficulty, searchQuery, selectedTags, sortBy, selectedSubjectId, activeChapter]);

// Load chapters when subject changes (separate effect)
useEffect(() => {
  if (selectedSubjectId) {
    loadSubjectChapters(selectedSubjectId);
  }
}, [selectedSubjectId]);
  





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
    return questions[activeTab] || [];
  }, [questions, activeTab]);  

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions;

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
    // Implement starred functionality with API call if needed
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
    loading,
    subjects,
    setSubjects,
    selectedSubjectId,
    setSelectedSubjectId,
    chapters,
    setChapters,
    activeChapter,
    setActiveChapter,
    loadSubjectChapters,
  
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
    // totalPages,
    totalPage,
    setTotalPage,
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

      // API Functions
      loadQuestions,
      createQuestion,
      updateQuestion,
      deleteQuestion,

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