'use client'
import React from 'react';
import { useForm } from 'react-hook-form';
import { BookOpen, FileText, ArrowRight, Clock, Calendar } from 'lucide-react';

const TestCreationDashboard = ({ onNext }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm({
    defaultValues: {
      schoolName: '',
      timeStart: '',
      timeEnd: '',
      standard: '',
      subjectName: '',
      unit: '',
      examHours: '',
      examDate: '',
    }
  });

  const units = ['Unit 1', 'Unit 2', 'Unit 3', 'Unit 4'];
  const standards = ['Std 8', 'Std 9', 'Std 10'];
  const subjects = [
    'Mathematics',
    'Science',
    'English',
    'Social Studies',
    'Hindi',
    'Computer Science',
    'Physical Education'
  ];

  const watchedTimeStart = watch('timeStart');
  const watchedTimeEnd = watch('timeEnd');

  const validateTimeEnd = (value) => {
    if (!watchedTimeStart || !value) return true;
    const startTime = new Date(`2000-01-01T${watchedTimeStart}`);
    const endTime = new Date(`2000-01-01T${value}`);
    return endTime > startTime || 'End time must be after start time';
  };

  const onSubmit = (data) => {
    onNext(data);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-2xl shadow-xl overflow-hidden px-16">
      {/* Header */}
      <div className="px-8 py-6">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gray-500 bg-opacity-20 rounded-lg flex items-center justify-center">
            <FileText className="h-6 w-6 text-gray-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-600">Test Details</h1>
            <p className="text-gray-700">Set up your test parameters and configuration</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="p-8 space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <BookOpen className="h-5 w-5 mr-2 text-blue-600" />
            Exam Configuration
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* School Name */}
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                School Name *
              </label>
              <input
                type="text"
                {...register('schoolName', {
                  required: 'School name is required',
                  validate: value => value.trim() !== '' || 'School name cannot be empty'
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.schoolName ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter school name"
              />
              {errors.schoolName && <p className="text-red-500 text-sm mt-1">{errors.schoolName.message}</p>}
            </div>

            {/* Time Start */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                Start Time *
              </label>
              <input
                type="time"
                {...register('timeStart', {
                  required: 'Start time is required'
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.timeStart ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.timeStart && <p className="text-red-500 text-sm mt-1">{errors.timeStart.message}</p>}
            </div>

            {/* Time End */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Clock className="h-4 w-4 inline mr-1" />
                End Time *
              </label>
              <input
                type="time"
                {...register('timeEnd', {
                  required: 'End time is required',
                  validate: validateTimeEnd
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.timeEnd ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.timeEnd && <p className="text-red-500 text-sm mt-1">{errors.timeEnd.message}</p>}
            </div>

            {/* Standard */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Standard *
              </label>
              <select
                {...register('standard', {
                  required: 'Standard selection is required'
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.standard ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select standard</option>
                {standards.map(standard => (
                  <option key={standard} value={standard}>{standard}</option>
                ))}
              </select>
              {errors.standard && <p className="text-red-500 text-sm mt-1">{errors.standard.message}</p>}
            </div>

            {/* Subject Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject Name *
              </label>
              <select
                {...register('subjectName', {
                  required: 'Subject selection is required'
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.subjectName ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select subject</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subjectName && <p className="text-red-500 text-sm mt-1">{errors.subjectName.message}</p>}
            </div>

            {/* Select Unit */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Unit *
              </label>
              <select
                {...register('unit', {
                  required: 'Unit selection is required'
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.unit ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select unit</option>
                {units.map(unit => (
                  <option key={unit} value={unit}>{unit}</option>
                ))}
              </select>
              {errors.unit && <p className="text-red-500 text-sm mt-1">{errors.unit.message}</p>}
            </div>

            {/* Exam Hours */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Exam Hours *
              </label>
              <input
                type="number"
                {...register('examHours', {
                  required: 'Exam hours is required',
                  min: {
                    value: 0.5,
                    message: 'Minimum exam duration is 0.5 hours'
                  },
                  max: {
                    value: 8,
                    message: 'Maximum exam duration is 8 hours'
                  }
                })}
                min="0.5"
                max="8"
                step="0.5"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.examHours ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter exam duration in hours"
              />
              {errors.examHours && <p className="text-red-500 text-sm mt-1">{errors.examHours.message}</p>}
            </div>

            {/* Exam Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="h-4 w-4 inline mr-1" />
                Exam Date *
              </label>
              <input
                type="date"
                {...register('examDate', {
                  required: 'Exam date is required',
                  validate: value => {
                    const today = new Date();
                    const selectedDate = new Date(value);
                    return selectedDate >= today || 'Exam date cannot be in the past';
                  }
                })}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                  errors.examDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.examDate && <p className="text-red-500 text-sm mt-1">{errors.examDate.message}</p>}
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end items-center pt-6 border-t border-gray-200">
          <button
            onClick={handleSubmit(onSubmit)}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all transform hover:scale-[1.02] flex items-center space-x-2 shadow-lg"
          >
            <span>Continue to Question Selection</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestCreationDashboard;