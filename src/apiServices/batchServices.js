// services/batchServices.js

import API from "./apiServices";

export const batchService = {
  // Get all batches with pagination and filters
  getAllBatches: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/batches?${queryParams.toString()}`);
  },

  // Get single batch by ID
  getBatchById: async (batchId) => {
    return API.GET(`/api/batches/${batchId}`);
  },

  // Create new batch
  createBatch: async (batchData) => {
    return API.POST('/api/batches', batchData);
  },

  // Update batch
  updateBatch: async (batchId, batchData) => {
    return API.PUT(`/api/batches/${batchId}`, batchData);
  },

  // Delete batch
  deleteBatch: async (batchId) => {
    return API.DELETE(`/api/batches/${batchId}`);
  },

  // Get active batches only
  getActiveBatches: async () => {
    return API.GET('/api/batches?isActive=true');
  },

  // Get batches by academic year
  getBatchesByAcademicYear: async (academicYearId, params = {}) => {
    const queryParams = new URLSearchParams();
    queryParams.append('academicYear', academicYearId);
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/batches?${queryParams.toString()}`);
  },

  // Get active batches by academic year (useful for dropdowns)
  getActiveBatchesByAcademicYear: async (academicYearId) => {
    return API.GET(`/api/batches?academicYear=${academicYearId}&isActive=true`);
  }
};