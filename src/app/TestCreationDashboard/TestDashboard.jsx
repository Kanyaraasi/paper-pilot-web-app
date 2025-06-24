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
// import Footer from './Footer';
import { useEffect } from 'react';
import { academicYearService } from '@/apiServices/academicYearServices';
import { standardService } from '@/apiServices/standardServices';
import { subjectService } from '@/apiServices/subjectServices';
import { batchService } from '@/apiServices/batchServices';

const TestDashboard = ({ onNext, onPrevious, formData, currentStep }) => {
  const [subjectError, setSubjectError] = useState('');
  const [instituteId, setInstituteId] = useState(null);
  const [loading, setLoading] = useState({
    academicYears: false,
    batches: false,
    standards: false,
    subjects: false
  });
  
  const [apiData, setApiData] = useState({
    academicYears: [],
    batches: [],
    standards: [],
    subjects: []
  });
  
  const [errorss, setErrors] = useState({
    api: null
  });
  

  useEffect(() => {
    // Get institute ID from your auth context or user data
    // For example: setInstituteId(user?.institute?._id || localStorage.getItem('instituteId'));
    const userInstituteId = '68568963dbe533623cf89b30' || localStorage.getItem('instituteId'); // Replace with your auth logic
    setInstituteId(userInstituteId);
  }, []);
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
      subjects: formData?.subjects || [
        { id: 1, name: 'Physics', selected: false, icon: '⚛️' },
        { id: 2, name: 'Chemistry', selected: false, icon: '🧪' },
        { id: 3, name: 'Biology', selected: false, icon: '🧬' },
        { id: 4, name: 'Mathematics and Statistics', selected: false, icon: '📊' }
      ]
    },
    mode: 'onChange'
  });

  // Add these useEffect hooks after your existing state declarations
useEffect(() => {
  if (instituteId) {
    fetchInitialData();
  }
}, [instituteId]);

const fetchInitialData = async () => {
  if (!instituteId) {
    console.warn('Institute ID not available');
    return;
  }

  try {
    setLoading(prev => ({ ...prev, academicYears: true, standards: true }));
    
    const [academicYearsResponse, standardsResponse] = await Promise.all([
      academicYearService.getActiveAcademicYears({ institute: instituteId }),
      standardService.getAllStandards() // Standards might not be institute-specific
    ]);
    console.log('acec', academicYearsResponse);
    console.log('standas', standardsResponse);
    setApiData(prev => ({
      ...prev,
      academicYears: academicYearsResponse.academicYears || [],
      standards: standardsResponse || []
    }));
  } catch (error) {
    console.error('Error fetching initial data:', error);
    setErrors(prev => ({ ...prev, api: 'Failed to load initial data' }));
  } finally {
    setLoading(prev => ({ ...prev, academicYears: false, standards: false }));
  }
};

const fetchBatchesByAcademicYear = async (academicYearId) => {
  if (!academicYearId || !instituteId) {
    setApiData(prev => ({ ...prev, batches: [] }));
    return;
  }

  try {
    setLoading(prev => ({ ...prev, batches: true }));
    // Pass institute filter if your API supports it
    const response = await batchService.getActiveBatchesByAcademicYear(academicYearId, { 
      institute: instituteId 
    });
    console.log('batches', response.batches)
    setApiData(prev => ({ ...prev, batches: response.batches || [] }));
  } catch (error) {
    console.error('Error fetching batches:', error);
    setApiData(prev => ({ ...prev, batches: [] }));
  } finally {
    setLoading(prev => ({ ...prev, batches: false }));
  }
};

// Fetch subjects when standard changes
const fetchSubjectsByStandard = async (standardId) => {
  console.log('statst', standardId)
  if (!standardId) {
    setApiData(prev => ({ ...prev, subjects: [] }));
    setValue('subjects', []);
    return;
  }

  try {
    setLoading(prev => ({ ...prev, subjects: true }));
    const response = await subjectService.getSubjectsByStandard(standardId);
    
    // Transform API response to match your current subject structure
    const transformedSubjects = (response || []).map((subject, index) => ({
      id: subject._id || subject.id || index + 1,
      name: subject.name,
      selected: false,
      icon: getSubjectIcon(subject.name) // You'll need this helper function
    }));

    setApiData(prev => ({ ...prev, subjects: transformedSubjects }));
    setValue('subjects', transformedSubjects);
  } catch (error) {
    console.error('Error fetching subjects:', error);
    setApiData(prev => ({ ...prev, subjects: [] }));
    setValue('subjects', []);
  } finally {
    setLoading(prev => ({ ...prev, subjects: false }));
  }
};

// Helper function to get subject icons
const getSubjectIcon = (subjectName) => {
  const iconMap = {
    'Physics': '⚛️',
    'Chemistry': '🧪',
    'Biology': '🧬',
    'Mathematics': '📊',
    'Mathematics and Statistics': '📊',
    'English': '📚',
    'History': '📜',
    'Geography': '🌍',
    'Economics': '💰',
    'Political Science': '🏛️',
    'Sociology': '👥',
    'Psychology': '🧠',
    'Computer Science': '💻',
    'Information Technology': '🖥️'
  };
  
  return iconMap[subjectName] || '📖';
};

// Watch for academic year changes
const watchedAcademicYear = watch('academicYear');
const watchedClass = watch('class');

useEffect(() => {
  if (watchedAcademicYear) {
    fetchBatchesByAcademicYear(watchedAcademicYear);
  }
}, [watchedAcademicYear]);

useEffect(() => {
  if (watchedClass) {
    // watchedClass now contains the standard ID
    fetchSubjectsByStandard(watchedClass);
  }
}, [watchedClass]);




  const subjects = watch('subjects');

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
    onNext(data);
  };

  const classOptions = apiData.standards.map(standard => ({
    value: standard._id || standard.id,
    label: standard.name, // Using 'name' field from your model
    code: standard.code,
    level: standard.level,
    board: standard.board,
    stream: standard.stream,
    medium: standard.medium
  }));
    
  const unitOptions = Array.from({ length: 8 }, (_, i) => `Unit ${i + 1}`);
  const academicYears = ['2023-24', '2024-25', '2025-26'];
  const academicYearOptions = apiData.academicYears.map(year => ({
    value: year._id || year.id,
    label: year.year, // Using 'year' field from your model
    startDate: year.startDate,
    endDate: year.endDate
  }));
  
  const batches = ['Morning', 'Evening', 'Weekend'];
  const batchOptions = apiData.batches.map(batch => ({
    value: batch._id || batch.id,
    label: batch.name
  }));
  
  const selectedSubjects = subjects.filter(subject => subject.selected);

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">Create Test</h1>
              <p className="text-sm text-gray-600 mt-1">Step {currentStep} of 3 - Configure your test details</p>
            </div>
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1 text-sm text-gray-600">
                <Clock className="h-4 w-4" />
                <span>Auto-save enabled</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">1</span>
              </div>
              <span className="ml-2 text-sm font-medium text-blue-600">Test Details</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">2</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Question Bank</span>
            </div>
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                <span className="text-gray-600 text-sm font-medium">3</span>
              </div>
              <span className="ml-2 text-sm text-gray-500">Review & Publish</span>
            </div>
          </div>
        </div>
      </div>

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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
    disabled={loading.standards}
  >
    <option value="">
      {loading.standards ? 'Loading classes...' : 'Select Class'}
    </option>
    {classOptions.map((cls) => (
      <option key={cls.value} value={cls.value}>{cls.label}</option>
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
      disabled={loading.academicYears}
    >
      <option value="">
        {loading.academicYears ? 'Loading...' : 'Select Academic Year'}
      </option>
      {academicYearOptions.map((year) => (
        <option key={year.value} value={year.value}>{year.label}</option>
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
      disabled={loading.batches || !watchedAcademicYear}
    >
      <option value="">
        {loading.batches ? 'Loading batches...' : 
         !watchedAcademicYear ? 'Select Academic Year first' : 'Select Batch'}
      </option>
      {batchOptions.map((batch) => (
        <option key={batch.value} value={batch.value}>{batch.label}</option>
      ))}
    </select>
  </div>
</div>
            </div>
          </div>
        </div>

        {/* Question Paper Includes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center">
              <Info className="h-5 w-5 mr-2 text-green-600" />
              Question Paper Includes
            </h3>
            <p className="text-sm text-gray-600 mt-1">Features and specifications of your test paper</p>
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Multiple Choice Questions</p>
                  <p className="text-xs text-gray-600">MCQ with 4 options each</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Theory Questions</p>
                  <p className="text-xs text-gray-600">Descriptive and analytical</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Numerical Problems</p>
                  <p className="text-xs text-gray-600">Step-by-step solutions</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Board Pattern</p>
                  <p className="text-xs text-gray-600">Follows official syllabus</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Answer Key</p>
                  <p className="text-xs text-gray-600">Detailed solutions included</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Marking Scheme</p>
                  <p className="text-xs text-gray-600">Clear evaluation criteria</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Select Subjects */}
        <div className={`space-y-3 ${subjectError ? 'ring-2 ring-red-200 rounded-lg p-4' : ''}`}>
  {loading.subjects ? (
    <div className="flex items-center justify-center py-8">
      <div className="text-gray-500">Loading subjects...</div>
    </div>
  ) : subjects.length === 0 ? (
    <div className="flex items-center justify-center py-8">
      <div className="text-gray-500">
        {watchedClass ? 'No subjects found for selected class' : 'Please select a class to see subjects'}
      </div>
    </div>
  ) : (
    subjects.map((subject, index) => (
      <div 
        key={subject.id} 
        className={`flex items-center p-4 border rounded-lg cursor-pointer transition-all hover:bg-gray-50 ${
          subject.selected 
            ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-200' 
            : 'border-gray-200 bg-white'
        }`}
        onClick={() => handleSubjectToggle(index)}
      >
        <div className="flex items-center space-x-4 flex-1">
          <input
            type="checkbox"
            checked={subject.selected}
            onChange={() => handleSubjectToggle(index)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-lg">
            {subject.icon}
          </div>
          <div className="flex-1">
            <p className="font-medium text-gray-900">{subject.name}</p>
            <p className="text-sm text-gray-600">Complete syllabus coverage</p>
          </div>
          {subject.selected && (
            <CheckCircle className="h-5 w-5 text-blue-600" />
          )}
        </div>
      </div>
    ))
  )}
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
      
      {/* <Footer /> */}
    </div>
  );
};

export default TestDashboard;