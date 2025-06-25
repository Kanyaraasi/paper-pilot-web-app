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
  const [loading, setLoading] = useState(false);
  const [activeChapter, setActiveChapter] = useState('Introduction to Physics');

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
    numerical: []
  });

  // Tab Configuration
  const tabTitles = {
    fill: 'Fill in the Blanks',
    brief: 'Short Answer',
    sentence: 'One Sentence',
    match: 'Match the Following',
    mcq: 'Multiple Choice',
    truefalse: 'True/False',
    essay: 'Long Answer',
    numerical: 'Numerical'
  };

  // Mock chapters data
  const chapters = [
    { _id: '1', name: 'Introduction to Physics', isActive: true },
    { _id: '2', name: 'Motion and Force', isActive: true },
    { _id: '3', name: 'Energy and Work', isActive: true },
    { _id: '4', name: 'Heat and Temperature', isActive: true },
    { _id: '5', name: 'Light and Optics', isActive: true },
    { _id: '6', name: 'Sound and Waves', isActive: true },
    { _id: '7', name: 'Electricity', isActive: true },
    { _id: '8', name: 'Magnetism', isActive: true },
    { _id: '9', name: 'Modern Physics', isActive: true },
    { _id: '10', name: 'Nuclear Physics', isActive: true }
  ];

  // Generate mock questions for each chapter and type
  const generateMockQuestions = (type, chapterName) => {
    const questions = [];
    const questionsPerChapter = 20; // 20 questions per chapter per type
    
    for (let i = 1; i <= questionsPerChapter; i++) {
      const tags = ['Physics', 'Science', 'Theory', 'Practice'].slice(0, Math.floor(Math.random() * 3) + 1);
      const difficulties = ['Easy', 'Medium', 'Hard'];
      const randomDifficulty = difficulties[Math.floor(Math.random() * difficulties.length)];
      
      const baseQuestion = {
        id: `${type}-${chapterName.replace(/\s+/g, '-').toLowerCase()}-${i}`,
        difficulty: randomDifficulty,
        tags,
        chapterName,
        createdAt: new Date(),
        starred: Math.random() > 0.8
      };

      switch (type) {
        case 'fill':
          questions.push({
            ...baseQuestion,
            text: `Fill in the blank for ${chapterName} - Question ${i}: The fundamental concept of _____ is essential in this chapter.`,
            answer: 'physics principles'
          });
          break;
        case 'brief':
          questions.push({
            ...baseQuestion,
            text: `Brief answer question for ${chapterName} - Question ${i}: Explain the key concept covered in this chapter.`,
            answer: `This chapter covers the fundamental principles of ${chapterName.toLowerCase()} including theoretical concepts and practical applications.`
          });
          break;
        case 'sentence':
          questions.push({
            ...baseQuestion,
            text: `One sentence question for ${chapterName} - Question ${i}: Define the main topic of this chapter.`,
            answer: `${chapterName} deals with the fundamental principles and applications in physics.`
          });
          break;
        case 'match':
          questions.push({
            ...baseQuestion,
            items: [
              { id: `${i}-A`, left: `Concept A from ${chapterName}`, right: `Definition A` },
              { id: `${i}-B`, left: `Concept B from ${chapterName}`, right: `Definition B` },
              { id: `${i}-C`, left: `Concept C from ${chapterName}`, right: `Definition C` },
              { id: `${i}-D`, left: `Concept D from ${chapterName}`, right: `Definition D` }
            ]
          });
          break;
        case 'mcq':
          questions.push({
            ...baseQuestion,
            text: `MCQ for ${chapterName} - Question ${i}: What is the primary focus of this chapter?`,
            options: [
              `Primary concept of ${chapterName}`,
              'Secondary concept',
              'Tertiary concept',
              'None of the above'
            ],
            answer: `Primary concept of ${chapterName}`
          });
          break;
        case 'truefalse':
          questions.push({
            ...baseQuestion,
            text: `True/False for ${chapterName} - Question ${i}: This chapter covers fundamental physics principles.`,
            answer: 'True'
          });
          break;
        case 'essay':
          questions.push({
            ...baseQuestion,
            text: `Essay question for ${chapterName} - Question ${i}: Discuss the importance and applications of concepts covered in this chapter.`,
            answer: `This chapter covers essential concepts in ${chapterName.toLowerCase()} that are fundamental to understanding physics. The key principles include theoretical foundations and practical applications that are crucial for students to master.`
          });
          break;
        case 'numerical':
          questions.push({
            ...baseQuestion,
            text: `Numerical problem for ${chapterName} - Question ${i}: Calculate the value based on the given parameters related to this chapter's concepts.`,
            answer: '42 units'
          });
          break;
      }
    }
    return questions;
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
    numerical: []
  });

  // Initialize questions data
  useEffect(() => {
    const initialQuestions = {};
    Object.keys(tabTitles).forEach(type => {
      initialQuestions[type] = [];
      chapters.forEach(chapter => {
        initialQuestions[type].push(...generateMockQuestions(type, chapter.name));
      });
    });
    setQuestions(initialQuestions);
  }, []);

  // Filter questions based on current filters and active chapter
  const filteredQuestions = React.useMemo(() => {
    let filtered = questions[activeTab] || [];

    // Filter by active chapter
    if (activeChapter) {
      filtered = filtered.filter(q => q.chapterName === activeChapter);
    }

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(q => 
        (q.text && q.text.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.answer && q.answer.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (q.tags && q.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())))
      );
    }

    // Apply difficulty filter
    if (selectedDifficulty !== 'All') {
      filtered = filtered.filter(q => q.difficulty === selectedDifficulty);
    }

    // Apply other filters...
    if (selectedTags.length > 0) {
      filtered = filtered.filter(q => 
        q.tags && selectedTags.every(tag => q.tags.includes(tag))
      );
    }

    if (showOnlyStarred) {
      filtered = filtered.filter(q => q.starred);
    }

    return filtered;
  }, [questions, activeTab, activeChapter, searchQuery, selectedDifficulty, selectedTags, showOnlyStarred]);

  // Pagination calculations
  const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
  const indexOfLastQuestion = currentPage * questionsPerPage;
  const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
  const currentQuestions = filteredQuestions.slice(indexOfFirstQuestion, indexOfLastQuestion);

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

  // Helper functions
  const showToastMessage = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const toggleQuestionSelection = (questionId) => {
    const question = questions[activeTab].find(q => q.id === questionId);
    if (!question) return;

    const currentChapterSelections = selectedQuestions[activeTab].filter(qId => {
      const q = questions[activeTab].find(qu => qu.id === qId);
      return q?.chapterName === question.chapterName;
    });

    setSelectedQuestions(prev => {
      const currentSelections = prev[activeTab];
      
      if (currentSelections.includes(questionId)) {
        // Remove the question if already selected
        return {
          ...prev,
          [activeTab]: currentSelections.filter(id => id !== questionId)
        };
      } else {
        // Check if we've reached the 5-question limit for this chapter
        if (currentChapterSelections.length >= 5) {
          showToastMessage(`Maximum 5 questions can be selected from ${question.chapterName}`, "error");
          return prev;
        } else {
          // Add the question
          return {
            ...prev,
            [activeTab]: [...currentSelections, questionId]
          };
        }
      }
    });
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
  }, [searchQuery, selectedDifficulty, selectedTags, showOnlyStarred, activeTab, activeChapter]);

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
    activeChapter,
    setActiveChapter,
    chapters,

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