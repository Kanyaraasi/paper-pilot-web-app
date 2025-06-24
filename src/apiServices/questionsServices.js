// services/questionServices.js
import API from "./apiServices";

export const questionService = {
  // Get all questions with filters and pagination
  getAllQuestions: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get single question by ID
  getQuestionById: async (questionId) => {
    return API.GET(`/api/questions/${questionId}`);
  },

  // Create new question
  createQuestion: async (questionData) => {
    return API.POST('/api/questions', questionData);
  },

  // Bulk create questions
  createBulkQuestions: async (questionsArray) => {
    return API.POST('/api/questions/bulk', { questions: questionsArray });
  },

  // Update question
  updateQuestion: async (questionId, questionData) => {
    return API.PUT(`/api/questions/${questionId}`, questionData);
  },

  // Delete question (soft delete)
  deleteQuestion: async (questionId) => {
    return API.DELETE(`/api/questions/${questionId}`);
  },

  // Get questions by subject
  getQuestionsBySubject: async (subject, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('subject', subject);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get questions by subject and chapter
  getQuestionsBySubjectAndChapter: async (subjectId, chapterId, params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions/subject/${subjectId}/chapter/${chapterId}?${queryParams.toString()}`);
  },

  // Get questions by difficulty
  getQuestionsByDifficulty: async (difficulty, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('difficulty', difficulty);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get questions by type
  getQuestionsByType: async (type, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('type', type);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get questions by tags
  getQuestionsByTags: async (tags, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('tags', Array.isArray(tags) ? tags.join(',') : tags);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Search questions
  searchQuestions: async (searchTerm, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('search', searchTerm);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get questions with multiple filters
  getQuestionsFiltered: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(filters).forEach(key => {
      if (filters[key] !== undefined && filters[key] !== '') {
        if (key === 'tags' && Array.isArray(filters[key])) {
          queryParams.append(key, filters[key].join(','));
        } else {
          queryParams.append(key, filters[key]);
        }
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  },

  // Get question statistics summary
  getQuestionStats: async () => {
    return API.GET('/api/questions/stats/summary');
  },

  // Get difficulty statistics for a subject
  getSubjectDifficultyStats: async (subjectId) => {
    return API.GET(`/api/questions/subject/${subjectId}/difficulty-stats`);
  },

  // Get questions for practice/quiz (with limit)
  getPracticeQuestions: async (subjectId, chapterId, difficulty, type, limit = 20) => {
    const queryParams = new URLSearchParams();
    if (difficulty) queryParams.append('difficulty', difficulty);
    if (type) queryParams.append('type', type);
    queryParams.append('limit', limit);
    
    return API.GET(`/api/questions/subject/${subjectId}/chapter/${chapterId}?${queryParams.toString()}`);
  },

  // Get random questions for assessment
  getRandomQuestions: async (params = {}) => {
    const { subject, chapter, difficulty, type, count = 10, ...otherParams } = params;
    const queryParams = new URLSearchParams();
    
    if (subject) queryParams.append('subject', subject);
    if (chapter) queryParams.append('chapter', chapter);
    if (difficulty) queryParams.append('difficulty', difficulty);
    if (type) queryParams.append('type', type);
    queryParams.append('limit', count);
    
    Object.keys(otherParams).forEach(key => {
      if (otherParams[key] !== undefined && otherParams[key] !== '') {
        queryParams.append(key, otherParams[key]);
      }
    });
    
    return API.GET(`/api/questions?${queryParams.toString()}`);
  }
};