// services/subjectServices.js

import API from "./apiServices";

export const subjectService = {
  // Get all subjects
  getAllSubjects: async () => {
    return API.GET('/api/subjects');
  },

  // Get subjects by standard ID
  getSubjectsByStandard: async (standardId) => {
    return API.GET(`/api/subjects/standard/${standardId}`);
  },

  // Get single subject by ID
  getSubjectById: async (subjectId) => {
    return API.GET(`/api/subjects/${subjectId}`);
  },

  // Create new subject
  createSubject: async (subjectData) => {
    return API.POST('/api/subjects', subjectData);
  },

  // Chapter management methods
  
  // Add chapter to subject
  addChapterToSubject: async (subjectId, chapterData) => {
    return API.POST(`/api/subjects/${subjectId}/chapters`, chapterData);
  },

  // Update chapter in subject
  updateChapter: async (subjectId, chapterId, chapterData) => {
    return API.PUT(`/api/subjects/${subjectId}/chapters/${chapterId}`, chapterData);
  },

  // Delete chapter from subject
  deleteChapter: async (subjectId, chapterId) => {
    return API.DELETE(`/api/subjects/${subjectId}/chapters/${chapterId}`);
  },

  // Helper methods for common use cases

  // Get subjects with their chapters by standard (useful for curriculum planning)
  getSubjectsWithChaptersByStandard: async (standardId) => {
    return API.GET(`/api/subjects/standard/${standardId}`);
  },

  // Get subject with all chapters (alias for getSubjectById for clarity)
  getSubjectWithChapters: async (subjectId) => {
    return API.GET(`/api/subjects/${subjectId}`);
  }
};