// services/testService.js

import API from "./apiServices";

export const testService = {
  // Get all tests with pagination and filters
  getAllTests: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/tests?${queryParams.toString()}`);
  },

  // Get single test by ID
  getTestById: async (testId) => {
    return API.GET(`/api/tests/${testId}`);
  },

  // Create new test
  createTest: async (testData) => {
    return API.POST('/api/tests', testData);
  },

  // Update test
  updateTest: async (testId, testData) => {
    return API.PUT(`/api/tests/${testId}`, testData);
  },

  // Update test status (draft/published/archived)
  updateTestStatus: async (testId, status) => {
    return API.PATCH(`/api/tests/${testId}/status`, { status });
  },

  // Delete test
  deleteTest: async (testId) => {
    return API.DELETE(`/api/tests/${testId}`);
  },

  // Get test for taking (student view)
  getTestForTaking: async (testId) => {
    return API.GET(`/api/tests/${testId}/take`);
  },

  // Bulk operations
  bulkUpdateStatus: async (testIds, status) => {
    return API.PATCH('/api/tests/bulk-status', { testIds, status });
  },

  bulkDelete: async (testIds) => {
    return API.DELETE('/api/tests/bulk-delete', { data: { testIds } });
  }
};