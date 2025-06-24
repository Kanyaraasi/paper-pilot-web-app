// services/standardServices.js

import API from "./apiServices";

export const standardService = {
  // Get all standards with filters
  getAllStandards: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/standards?${queryParams.toString()}`);
  },

  // Get single standard by ID
  getStandardById: async (standardId) => {
    return API.GET(`/api/standards/${standardId}`);
  },

  // Create new standard
  createStandard: async (standardData) => {
    return API.POST('/api/standards', standardData);
  },

  // Update standard
  updateStandard: async (standardId, standardData) => {
    return API.PUT(`/api/standards/${standardId}`, standardData);
  },

  // Get standards by board
  getStandardsByBoard: async (board) => {
    return API.GET(`/api/standards?board=${encodeURIComponent(board)}`);
  },

  // Get standards by stream
  getStandardsByStream: async (stream) => {
    return API.GET(`/api/standards?stream=${encodeURIComponent(stream)}`);
  },

  // Get standards by medium
  getStandardsByMedium: async (medium) => {
    return API.GET(`/api/standards?medium=${encodeURIComponent(medium)}`);
  },

  // Get standards by multiple filters
  getStandardsFiltered: async (board, stream, medium) => {
    const queryParams = new URLSearchParams();
    
    if (board) queryParams.append('board', board);
    if (stream) queryParams.append('stream', stream);
    if (medium) queryParams.append('medium', medium);
    
    return API.GET(`/api/standards?${queryParams.toString()}`);
  },

  // Get filter values (boards, streams, mediums)
  getFilterValues: async () => {
    return API.GET('/api/standards/filters/values');
  }
};