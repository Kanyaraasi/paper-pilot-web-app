// services/academicYearServices.js

import API from "./apiServices";

export const academicYearService = {
  // Get all academic years with pagination and filters
  getAllAcademicYears: async (params = {}) => {
    const queryParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== undefined && params[key] !== '') {
        queryParams.append(key, params[key]);
      }
    });
    
    return API.GET(`/api/academic-years?${queryParams.toString()}`);
  },

  // Get single academic year by ID
  getAcademicYearById: async (academicYearId) => {
    return API.GET(`/api/academic-years/${academicYearId}`);
  },

  // Create new academic year
  createAcademicYear: async (academicYearData) => {
    return API.POST('/api/academic-years', academicYearData);
  },

  // Update academic year
  updateAcademicYear: async (academicYearId, academicYearData) => {
    return API.PUT(`/api/academic-years/${academicYearId}`, academicYearData);
  },

  // Delete academic year
  deleteAcademicYear: async (academicYearId) => {
    return API.DELETE(`/api/academic-years/${academicYearId}`);
  },

  // Get active academic years only
  getActiveAcademicYears: async () => {
    return API.GET('/api/academic-years?isActive=true');
  },

  // Get current academic year
  getCurrentAcademicYear: async () => {
    const currentDate = new Date().toISOString().split('T')[0]; // YYYY-MM-DD format
    return API.GET(`/api/academic-years?isActive=true&current=${currentDate}`);
  }
};