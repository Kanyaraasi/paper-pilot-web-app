import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  Save,
  ArrowLeft,
  ArrowRight,
  GraduationCap,
  Calendar,
  Users,
  BookMarked
} from 'lucide-react';

// Toast Component
const Toast = ({ message, type = "error", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800';
      default:
        return 'bg-red-50 border-red-200 text-red-800';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      default:
        return 'text-red-500';
    }
  };

  return (
    <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border flex items-center space-x-3 min-w-80 ${getToastStyles()}`}>
      <div className={`flex-shrink-0 ${getIconColor()}`}>
        {type === 'success' ? (
          <CheckCircle className="h-5 w-5" />
        ) : (
          <AlertCircle className="h-5 w-5" />
        )}
      </div>
      <div className="flex-1">
        <div className="text-sm font-medium">{message}</div>
      </div>
      <button
        onClick={onClose}
        className={`flex-shrink-0 ${getIconColor()} hover:opacity-70`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

// Loading Spinner Component
const LoadingSpinner = ({ size = "sm" }) => {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-blue-600`}></div>
  );
};

// Form Input Component
const FormInput = ({ 
  label, 
  error, 
  required = false, 
  loading = false, 
  children, 
  helpText,
  icon: Icon 
}) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <div className="relative">
        {children}
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <LoadingSpinner size="sm" />
          </div>
        )}
      </div>
      {helpText && !error && (
        <p className="text-xs text-gray-500">{helpText}</p>
      )}
      {error && (
        <p className="text-xs text-red-600 flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          {error}
        </p>
      )}
    </div>
  );
};

const TestDashboard = ({ onNext, onPrevious, formData: initialFormData, currentStep }) => {
  // Form state - initialize with props or defaults
  const [formData, setFormData] = useState({
    name: initialFormData?.name || '',
    duration: initialFormData?.duration || '',
    totalMarks: initialFormData?.totalMarks || '',
    class: initialFormData?.class || '',
    unit: initialFormData?.unit || '',
    academicYear: initialFormData?.academicYear || '',
    batch: initialFormData?.batch || '',
    subjects: initialFormData?.subjects || []
  });

  // Loading states
  const [loading, setLoading] = useState({
    classes: false,
    academicYears: false,
    batches: false,
    subjects: false
  });

  // Other states
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  // Mock data
  const [mockData] = useState({
    classes: [
      { id: '1', name: 'Class 10 - Science', code: '10-SCI' },
      { id: '2', name: 'Class 11 - PCM', code: '11-PCM' },
      { id: '3', name: 'Class 12 - PCB', code: '12-PCB' },
      { id: '4', name: 'Class 9 - General', code: '9-GEN' }
    ],
    academicYears: [
      { id: '1', year: '2024-25' },
      { id: '2', year: '2023-24' },
      { id: '3', year: '2025-26' }
    ],
    batches: [
      { id: '1', name: 'Morning Batch' },
      { id: '2', name: 'Afternoon Batch' },
      { id: '3', name: 'Evening Batch' }
    ],
    subjects: [
      { id: '1', name: 'Physics', icon: '⚛️', selected: false },
      { id: '2', name: 'Chemistry', icon: '🧪', selected: false },
      { id: '3', name: 'Biology', icon: '🧬', selected: false },
      { id: '4', name: 'Mathematics', icon: '📊', selected: false },
      { id: '5', name: 'Computer Science', icon: '💻', selected: false },
      { id: '6', name: 'English', icon: '📚', selected: false }
    ]
  });

  const unitOptions = Array.from({ length: 8 }, (_, i) => ({
    id: i + 1,
    name: `Unit ${i + 1}`
  }));

  // Toast functions
  const showToast = (message, type = 'error') => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  // Auto-save simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.name || formData.duration || formData.totalMarks) {
        setIsAutoSaving(true);
        setTimeout(() => {
          setIsAutoSaving(false);
        }, 1000);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [formData]);

  // Form handlers
  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleSubjectToggle = (subjectId) => {
    setFormData(prev => {
      const updatedSubjects = prev.subjects.map(subject => {
        if (subject.id === subjectId) {
          // If trying to select and another is already selected
          if (!subject.selected) {
            const hasSelected = prev.subjects.some(s => s.selected);
            if (hasSelected) {
              showToast('You can only select one subject per test.', 'warning');
              return subject;
            }
          }
          return { ...subject, selected: !subject.selected };
        }
        return subject;
      });

      return {
        ...prev,
        subjects: updatedSubjects
      };
    });
  };

  // Load subjects when class changes
  useEffect(() => {
    if (formData.class) {
      setLoading(prev => ({ ...prev, subjects: true }));
      
      // Simulate API call
      setTimeout(() => {
        setFormData(prev => ({
          ...prev,
          subjects: mockData.subjects.map(subject => ({ ...subject, selected: false }))
        }));
        setLoading(prev => ({ ...prev, subjects: false }));
      }, 800);
    }
  }, [formData.class]);

  // Validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Test name is required';
    } else if (formData.name.length < 3) {
      newErrors.name = 'Test name must be at least 3 characters';
    }

    if (!formData.duration.trim()) {
      newErrors.duration = 'Duration is required';
    }

    if (!formData.totalMarks) {
      newErrors.totalMarks = 'Total marks is required';
    } else if (parseInt(formData.totalMarks) < 1) {
      newErrors.totalMarks = 'Total marks must be at least 1';
    }

    if (!formData.class) {
      newErrors.class = 'Class is required';
    }

    if (!formData.unit) {
      newErrors.unit = 'Unit is required';
    }

    const selectedSubjects = formData.subjects.filter(s => s.selected);
    if (selectedSubjects.length === 0) {
      newErrors.subjects = 'Please select one subject';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      showToast('Test configuration saved successfully!', 'success');
      
      // Call onNext with the form data
      setTimeout(() => {
        onNext(formData);
      }, 1000);
    } else {
      showToast('Please fix the errors below', 'error');
    }
  };

  const handlePrevious = () => {
    if (onPrevious) {
      onPrevious();
    }
  };

  const selectedSubject = formData.subjects.find(s => s.selected);
  const inputClasses = "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm bg-white";
  const inputErrorClasses = "border-red-300 bg-red-50 focus:ring-red-500 focus:border-red-500";

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <GraduationCap className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-gray-900">Create New Test</h1>
                <p className="text-sm text-gray-600">Configure your test parameters</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {currentStep && (
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <span>Step {currentStep} of 3</span>
                </div>
              )}
              {isAutoSaving && (
                <div className="flex items-center space-x-2 text-green-600">
                  <Save className="h-4 w-4" />
                  <span className="text-sm">Saving...</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="space-y-6">
          {/* Basic Test Configuration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900 flex items-center">
                <FileText className="h-5 w-5 mr-2 text-blue-600" />
                Test Configuration
              </h2>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <FormInput 
                  label="Test Name" 
                  error={errors.name} 
                  required
                >
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className={`${inputClasses} ${errors.name ? inputErrorClasses : ''}`}
                    placeholder="e.g., Mid-term Physics Exam"
                  />
                </FormInput>

                <FormInput 
                  label="Duration" 
                  error={errors.duration} 
                  required
                >
                  <input
                    type="text"
                    value={formData.duration}
                    onChange={(e) => handleInputChange('duration', e.target.value)}
                    className={`${inputClasses} ${errors.duration ? inputErrorClasses : ''}`}
                    placeholder="e.g., 3 hours"
                  />
                </FormInput>

                <FormInput 
                  label="Total Marks" 
                  error={errors.totalMarks} 
                  required
                >
                  <input
                    type="number"
                    value={formData.totalMarks}
                    onChange={(e) => handleInputChange('totalMarks', e.target.value)}
                    className={`${inputClasses} ${errors.totalMarks ? inputErrorClasses : ''}`}
                    placeholder="e.g., 100"
                    min="1"
                  />
                </FormInput>

                <FormInput 
                  label="Class" 
                  error={errors.class} 
                  required
                  loading={loading.classes}
                >
                  <select
                    value={formData.class}
                    onChange={(e) => handleInputChange('class', e.target.value)}
                    className={`${inputClasses} ${errors.class ? inputErrorClasses : ''}`}
                  >
                    <option value="">Select Class</option>
                    {mockData.classes.map((cls) => (
                      <option key={cls.id} value={cls.id}>
                        {cls.name}
                      </option>
                    ))}
                  </select>
                </FormInput>

                <FormInput 
                  label="Unit" 
                  error={errors.unit} 
                  required
                >
                  <select
                    value={formData.unit}
                    onChange={(e) => handleInputChange('unit', e.target.value)}
                    className={`${inputClasses} ${errors.unit ? inputErrorClasses : ''}`}
                  >
                    <option value="">Select Unit</option>
                    {unitOptions.map((unit) => (
                      <option key={unit.id} value={unit.id}>
                        {unit.name}
                      </option>
                    ))}
                  </select>
                </FormInput>

                <FormInput 
                  label="Academic Year" 
                  loading={loading.academicYears}
                >
                  <select
                    value={formData.academicYear}
                    onChange={(e) => handleInputChange('academicYear', e.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select Academic Year</option>
                    {mockData.academicYears.map((year) => (
                      <option key={year.id} value={year.id}>
                        {year.year}
                      </option>
                    ))}
                  </select>
                </FormInput>

                <FormInput 
                  label="Batch" 
                  loading={loading.batches}
                >
                  <select
                    value={formData.batch}
                    onChange={(e) => handleInputChange('batch', e.target.value)}
                    className={inputClasses}
                  >
                    <option value="">Select Batch</option>
                    {mockData.batches.map((batch) => (
                      <option key={batch.id} value={batch.id}>
                        {batch.name}
                      </option>
                    ))}
                  </select>
                </FormInput>
              </div>
            </div>
          </div>

          {/* Subject Selection */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-medium text-gray-900 flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
                    Select Subject
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    Choose one subject for this test
                  </p>
                </div>
                {selectedSubject && (
                  <div className="flex items-center space-x-2 text-sm text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>{selectedSubject.name} selected</span>
                  </div>
                )}
              </div>
            </div>

            <div className="p-6">
              {/* Error Display */}
              {errors.subjects && (
                <div className="mb-4 p-3 border border-red-200 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-600 flex items-center">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {errors.subjects}
                  </p>
                </div>
              )}

              {/* Info Notice */}
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start space-x-3">
                  <Info className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-blue-900">
                      Single Subject Selection
                    </p>
                    <p className="text-sm text-blue-700 mt-1">
                      You can only select one subject per test for focused assessment.
                    </p>
                  </div>
                </div>
              </div>

              {/* Subject Grid */}
              {loading.subjects ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <LoadingSpinner size="lg" />
                    <p className="text-gray-500 mt-3 text-sm">Loading subjects...</p>
                  </div>
                </div>
              ) : formData.subjects.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className="text-center">
                    <BookOpen className="h-8 w-8 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500 text-sm">
                      {formData.class ? "No subjects found for selected class" : "Please select a class to see subjects"}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {formData.subjects.map((subject) => (
                    <div
                      key={subject.id}
                      className={`cursor-pointer transition-all ${
                        subject.selected ? 'ring-2 ring-blue-300' : ''
                      }`}
                      onClick={() => handleSubjectToggle(subject.id)}
                    >
                      <div className={`p-4 rounded-lg border-2 transition-all ${
                        subject.selected 
                          ? 'border-blue-300 bg-blue-50' 
                          : 'border-gray-200 bg-white hover:border-gray-300'
                      }`}>
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="subject"
                            checked={subject.selected}
                            onChange={() => handleSubjectToggle(subject.id)}
                            className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                          />
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                            {subject.icon}
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-gray-900 text-sm">
                              {subject.name}
                            </p>
                            <p className="text-xs text-gray-600">
                              Complete syllabus
                            </p>
                          </div>
                          {subject.selected && (
                            <CheckCircle className="h-5 w-5 text-blue-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-gray-500">
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <span className="text-sm">Auto-save enabled</span>
                </div>
                
                {onPrevious && (
                  <button
                    type="button"
                    onClick={handlePrevious}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium flex items-center space-x-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    <span>Previous</span>
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-3">
                <button
                  type="button"
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium flex items-center space-x-2"
                >
                  <span>Continue to Question Bank</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;