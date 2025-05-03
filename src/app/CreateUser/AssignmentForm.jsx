import React from 'react';
import { Trash } from 'lucide-react';

function AssignmentForm({ index, assignment, onChange, onRemove, canRemove }) {
  // Standard and subject options (in a real app, these would likely come from an API/database)
  const standardOptions = [
    'Kindergarten',
    'Grade 1', 
    'Grade 2', 
    'Grade 3', 
    'Grade 4', 
    'Grade 5',
    'Grade 6', 
    'Grade 7', 
    'Grade 8', 
    'Grade 9', 
    'Grade 10', 
    'Grade 11', 
    'Grade 12'
  ];
  
  const subjectOptions = [
    'Mathematics',
    'Science',
    'English',
    'History',
    'Geography',
    'Physics',
    'Chemistry',
    'Biology',
    'Computer Science',
    'Art',
    'Music',
    'Physical Education',
    'Foreign Languages'
  ];
  
  return (
    <div className="mt-3 p-3 bg-white rounded-md shadow-sm animate-fadeIn">
      <div className="flex justify-between items-center mb-2">
        <h5 className="text-sm font-medium text-gray-700">Assignment {index + 1}</h5>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="text-gray-400 hover:text-red-500 transition-colors duration-150"
          >
            <Trash size={16} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Standard/Grade Selection */}
        <div>
          <label htmlFor={`standard-${index}`} className="block text-xs font-medium text-gray-700">
            Standard/Grade
          </label>
          <select 
            id={`standard-${index}`}
            value={assignment.standard}
            onChange={(e) => onChange(index, 'standard', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md transition-all duration-200"
          >
            <option value="">Select Standard</option>
            {standardOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
        
        {/* Subject Selection */}
        <div>
          <label htmlFor={`subject-${index}`} className="block text-xs font-medium text-gray-700">
            Subject
          </label>
          <select 
            id={`subject-${index}`}
            value={assignment.subject}
            onChange={(e) => onChange(index, 'subject', e.target.value)}
            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 sm:text-sm rounded-md transition-all duration-200"
          >
            <option value="">Select Subject</option>
            {subjectOptions.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default AssignmentForm;