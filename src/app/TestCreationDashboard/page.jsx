'use client'
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { 
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle,
  Play,
  BookOpen,
  Users,
  Bell,
  FileText,
  Timer,
  Hash,
  AlertCircle
} from 'lucide-react';
import Footer from '../Footer/page';


const TestCreationDashboard = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [subjectError, setSubjectError] = useState('');
  
  // React Hook Form setup
  const {
    register,
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      name: '',
      duration: '',
      totalMarks: '',
      class: '',
      unit: '',
      onlyTextual: 'Only Textual Questions',
      onlyBoard: 'Only Board Questions',
      academicYear: '',
      batch: '',
      subjects: [
        { id: 1, name: 'Physics', selected: false, icon: '⚛️' },
        { id: 2, name: 'Chemistry', selected: false, icon: '🧪' },
        { id: 3, name: 'Biology', selected: false, icon: '🧬' },
        { id: 4, name: 'Mathematics and Statistics', selected: false, icon: '📊' }
      ]
    },
    mode: 'onChange'
  });

  const subjects = watch('subjects');

  const steps = [
    { number: 1, title: 'Test Details', description: 'Fill out test details', completed: true },
    { number: 2, title: 'Question Bank', description: 'Select Question Types', completed: false },
    { number: 3, title: 'Question Paper (Ready)', description: '', completed: false }
  ];

  const handleSubjectToggle = (index) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].selected = !updatedSubjects[index].selected;
    setValue('subjects', updatedSubjects);
    
    // Clear error when user selects at least one subject
    const hasSelectedSubject = updatedSubjects.some(subject => subject.selected);
    if (hasSelectedSubject && subjectError) {
      setSubjectError('');
    }
  };

  const validateSubjects = () => {
    const hasSelectedSubject = subjects.some(subject => subject.selected);
    if (!hasSelectedSubject) {
      setSubjectError('Please select at least one subject');
      return false;
    }
    setSubjectError('');
    return true;
  };

  const onSubmit = (data) => {
    // Validate subjects before submission
    if (!validateSubjects()) {
      return;
    }
    
    console.log('Form Data:', data);
    // Handle form submission
    alert('Form submitted successfully! Check console for data.');
  };

  const classOptions = Array.from({ length: 10 }, (_, i) => `Class ${i + 1}`);
  const unitOptions = Array.from({ length: 6 }, (_, i) => `Unit ${i + 1}`);

  return (
    <>
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b px-4 py-3">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center space-x-3">
            <button className="p-1.5 rounded hover:bg-gray-100">
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <FileText className="h-4 w-4 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-gray-900">Create Test</h1>
                <p className="text-xs text-gray-500">Design your assessment</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-1.5 text-gray-500 hover:bg-gray-100 rounded">
              <Bell className="h-4 w-4" />
            </button>
            <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-medium">A</span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b px-4 py-4">
        <div className="flex items-center justify-center space-x-6 max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div className="flex flex-col items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${
                  step.number === activeStep
                    ? 'bg-blue-600 text-white'
                    : step.completed
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step.completed ? <CheckCircle className="h-4 w-4" /> : step.number}
                </div>
                <div className="mt-1 text-center">
                  <p className={`text-xs font-medium ${
                    step.number === activeStep ? 'text-blue-600' : 'text-gray-600'
                  }`}>{step.title}</p>
                  {step.description && (
                    <p className="text-xs text-gray-400 mt-0.5">{step.description}</p>
                  )}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-12 h-0.5 mx-3 ${
                  step.completed ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Main Content - Form */}
      <div className="max-w-7xl mx-auto p-4 space-y-4">
        {/* Test Details Form */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-200">
            <h2 className="text-base font-semibold text-gray-900 flex items-center">
              <FileText className="h-4 w-4 mr-2" />
              Test Details
            </h2>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Test Name *</label>
                <input
                  type="text"
                  {...register('name', { 
                    required: 'Test name is required',
                    minLength: { value: 3, message: 'Test name must be at least 3 characters' }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.name ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter Test Name"
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration *</label>
                <input
                  type="text"
                  {...register('duration', { 
                    required: 'Duration is required' 
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.duration ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="e.g., 3 hours"
                />
                {errors.duration && (
                  <p className="mt-1 text-xs text-red-600">{errors.duration.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total Marks *</label>
                <input
                  type="number"
                  {...register('totalMarks', { 
                    required: 'Total marks is required',
                    min: { value: 1, message: 'Total marks must be at least 1' }
                  })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.totalMarks ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="Enter total marks"
                />
                {errors.totalMarks && (
                  <p className="mt-1 text-xs text-red-600">{errors.totalMarks.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Class *</label>
                <select 
                  {...register('class', { required: 'Class is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.class ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Class</option>
                  {classOptions.map((cls) => (
                    <option key={cls} value={cls}>{cls}</option>
                  ))}
                </select>
                {errors.class && (
                  <p className="mt-1 text-xs text-red-600">{errors.class.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Unit *</label>
                <select 
                  {...register('unit', { required: 'Unit is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.unit ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </select>
                {errors.unit && (
                  <p className="mt-1 text-xs text-red-600">{errors.unit.message}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Type</label>
                <select 
                  {...register('onlyTextual')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option>Only Textual Questions</option>
                  <option>Include Images</option>
                  <option>Mixed Questions</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Source</label>
                <select 
                  {...register('onlyBoard')}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm"
                >
                  <option>Only Board Questions</option>
                  <option>Include Competitive</option>
                  <option>Mixed Questions</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Select Subjects */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-200">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <BookOpen className="h-4 w-4 mr-2" />
              Select Subjects *
            </h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-4 gap-4 mb-3 text-center text-xs font-medium text-gray-600 bg-gray-100 p-2 rounded">
              <div>Select</div>
              <div>Icon</div>
              <div>Subject Name</div>
              <div>Subject Alias</div>
            </div>

            <div className={`space-y-2 ${subjectError ? 'border border-red-300 rounded-md p-2' : ''}`}>
              {subjects.map((subject, index) => (
                <div key={subject.id} className="grid grid-cols-4 gap-4 items-center p-3 border border-gray-200 rounded hover:bg-gray-50">
                  <div className="flex justify-center">
                    <input
                      type="checkbox"
                      checked={subject.selected}
                      onChange={() => handleSubjectToggle(index)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                  <div className="flex justify-center">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-lg">
                      {subject.icon}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="font-medium text-gray-900 text-sm">{subject.name}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">All {subject.name}</p>
                  </div>
                </div>
              ))}
            </div>
            
            {subjectError && (
              <div className="mt-2 flex items-center text-red-600">
                <AlertCircle className="h-4 w-4 mr-1" />
                <p className="text-xs">{subjectError}</p>
              </div>
            )}
          </div>
        </div>

        {/* Batch Details */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="px-4 py-3 border-b bg-gray-200">
            <h3 className="text-base font-semibold text-gray-900 flex items-center">
              <Users className="h-4 w-4 mr-2" />
              Batch Details
            </h3>
          </div>
          
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Academic Year *</label>
                <select 
                  {...register('academicYear', { required: 'Academic year is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.academicYear ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select an Academic Year</option>
                  <option>2024-2025</option>
                  <option>2023-2024</option>
                  <option>2022-2023</option>
                </select>
                {errors.academicYear && (
                  <p className="mt-1 text-xs text-red-600">{errors.academicYear.message}</p>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Batches *</label>
                <select 
                  {...register('batch', { required: 'Batch is required' })}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-1 focus:ring-blue-500 focus:border-blue-500 text-sm ${
                    errors.batch ? 'border-red-300' : 'border-gray-300'
                  }`}
                >
                  <option value="">Select a Batch</option>
                  <option>Morning Batch</option>
                  <option>Evening Batch</option>
                  <option>Weekend Batch</option>
                </select>
                {errors.batch && (
                  <p className="mt-1 text-xs text-red-600">{errors.batch.message}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-between items-center bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center space-x-2 text-gray-500">
            <Clock className="h-4 w-4" />
            <span className="text-sm">Auto-save enabled</span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              type="button"
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 text-sm font-medium"
            >
              Cancel
            </button>
            <button 
              type="submit"
              onClick={handleSubmit(onSubmit)}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center space-x-2 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Continue</span>
              <Play className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default TestCreationDashboard;