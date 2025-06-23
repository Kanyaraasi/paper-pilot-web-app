import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { 
  Clock,
  Play,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  Calendar,
  Users,
  Timer,
  Award
} from 'lucide-react';

const TestDashboard = ({ onNext, onPrevious, formData, currentStep }) => {
  const [subjectError, setSubjectError] = useState('');
  
  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: formData?.name || '',
      duration: formData?.duration || '',
      totalMarks: formData?.totalMarks || '',
      class: formData?.class || '',
      unit: formData?.unit || '',
      academicYear: formData?.academicYear || '',
      batch: formData?.batch || '',
      selectedSubject: formData?.selectedSubject || '', // Changed to single subject
      subjects: [
        { id: 1, name: 'Physics', icon: '⚛️' },
        { id: 2, name: 'Chemistry', icon: '🧪' },
        { id: 3, name: 'Biology', icon: '🧬' },
        { id: 4, name: 'Mathematics and Statistics', icon: '📊' }
      ]
    },
    mode: 'onChange'
  });

  const selectedSubject = watch('selectedSubject');
  const subjects = watch('subjects');

  const handleSubjectSelect = (subjectId) => {
    setValue('selectedSubject', subjectId);
    
    // Clear error when user selects a subject
    if (subjectError) {
      setSubjectError('');
    }
  };

  const validateSubject = () => {
    if (!selectedSubject) {
      setSubjectError('Please select a subject');
      return false;
    }
    setSubjectError('');
    return true;
  };

  const onSubmit = (data) => {
    // Validate subject before submission
    if (!validateSubject()) {
      return;
    }
    
    // Add selected subject details to form data
    const selectedSubjectDetails = subjects.find(s => s.id === parseInt(selectedSubject));
    const formDataWithSubject = {
      ...data,
      selectedSubjectDetails
    };
    
    console.log('Form Data:', formDataWithSubject);
    onNext(formDataWithSubject);
  };

  const classOptions = Array.from({ length: 12 }, (_, i) => `Class ${i + 1}`);
  const unitOptions = Array.from({ length: 8 }, (_, i) => `Unit ${i + 1}`);
  const academicYears = ['2023-24', '2024-25', '2025-26'];
  const batches = ['Morning', 'Evening', 'Weekend'];

  const getSelectedSubjectDetails = () => {
    return subjects.find(s => s.id === parseInt(selectedSubject));
  };

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Test Details Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900 flex items-center">
              <FileText className="h-5 w-5 mr-2 text-blue-600" />
              Test Configuration
            </h2>
            <p className="text-sm text-gray-600 mt-1">Define the basic parameters for your test</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Test Name *</label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Test name is required',
                    minLength: { value: 3, message: 'Test name must be at least 3 characters' }
                  })}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                  placeholder="e.g., Mid-term Physics Exam"
                />
                {errors.name && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Duration *</label>
                <div className="relative">
                  <Timer className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    {...register('duration', { 
                      required: 'Duration is required' 
                    })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                      errors.duration ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="e.g., 3 hours"
                  />
                </div>
                {errors.duration && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.duration.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Total Marks *</label>
                <div className="relative">
                  <Award className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    {...register('totalMarks', { 
                      required: 'Total marks is required',
                      min: { value: 1, message: 'Total marks must be at least 1' }
                    })}
                    className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                      errors.totalMarks ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                    }`}
                    placeholder="e.g., 100"
                  />
                </div>
                {errors.totalMarks && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.totalMarks.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Class *</label>
                <select 
                  {...register('class', { required: 'Class is required' })}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    errors.class ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.class.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Unit *</label>
                <select 
                  {...register('unit', { required: 'Unit is required' })}
                  className={`w-full px-3 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm ${
                    errors.unit ? 'border-red-300 bg-red-50' : 'border-gray-300 bg-white'
                  }`}
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="text-xs text-red-600 flex items-center">
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.unit.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Academic Year</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select 
                    {...register('academicYear')}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
                  >
                    <option value="">Select Academic Year</option>
                    {academicYears.map((year) => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Batch</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <select 
                    {...register('batch')}
                    className="w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm bg-white"
                  >
                    <option value="">Select Batch</option>
                    {batches.map((batch) => (
                      <option key={batch} value={batch}>{batch}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Subject */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <BookOpen className="h-5 w-5 mr-2 text-purple-600" />
              Select Subject *
            </h3>
            <p className="text-sm text-gray-600 mt-1">Choose one subject for your test</p>
          </div>
          
          <div className="p-6">
            <div className={`space-y-3 ${subjectError ? 'ring-2 ring-red-200 rounded-lg p-4' : ''}`}>
              {subjects.map((subject) => (
                <div 
                  key={subject.id} 
                  className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
                    parseInt(selectedSubject) === subject.id
                      ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200' 
                      : 'border-gray-200 bg-white'
                  }`}
                  onClick={() => handleSubjectSelect(subject.id)}
                >
                  <div className="flex items-center space-x-4 flex-1">
                    <input
                      type="radio"
                      name="selectedSubject"
                      value={subject.id}
                      checked={parseInt(selectedSubject) === subject.id}
                      onChange={() => handleSubjectSelect(subject.id)}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-lg">
                      {subject.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{subject.name}</p>
                      <p className="text-sm text-gray-600">Complete syllabus coverage</p>
                    </div>
                    {parseInt(selectedSubject) === subject.id && (
                      <CheckCircle className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {subjectError && (
              <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center text-red-600">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  <p className="text-sm font-medium">{subjectError}</p>
                </div>
              </div>
            )}

            {selectedSubject && (
              <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm font-medium text-green-800 mb-2">
                  Selected Subject
                </p>
                <div className="flex items-center space-x-2">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                    {getSelectedSubjectDetails()?.icon} {getSelectedSubjectDetails()?.name}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2 text-gray-500">
              <Clock className="h-4 w-4" />
              <span className="text-sm">Changes saved automatically</span>
            </div>
            
            <div className="flex items-center space-x-3">
              <button 
                type="button"
                onClick={onPrevious}
                disabled={currentStep === 1}
                className="px-6 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Cancel
              </button>
              <button 
                type="submit"
                onClick={handleSubmit(onSubmit)}
                className="px-6 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center space-x-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <span>Continue to Question Bank</span>
                <Play className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestDashboard;
