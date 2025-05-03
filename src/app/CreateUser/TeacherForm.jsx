import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, Book, PlusCircle, Trash } from 'lucide-react';
import AssignmentForm from './AssignmentForm';
import { validateTeacherForm } from './validateTeacherForm';

function TeacherForm({ teacher, onSave, onCancel }) {
  const initialState = {
    id: null,
    name: '',
    email: '',
    phone: '',
    password: '',
    assignments: [{ standard: '', subject: '' }]
  };
  
  const [newTeacher, setNewTeacher] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  
  // Determine if we're editing or adding a new teacher
  const editingTeacher = teacher !== null;
  
  useEffect(() => {
    if (editingTeacher) {
      setNewTeacher({
        ...teacher,
        // Don't populate password for editing - it will be optional
        password: ''
      });
    }
  }, [editingTeacher, teacher]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value
    });
    
    // Clear error for this field when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };
  
  const addAssignment = () => {
    setNewTeacher({
      ...newTeacher,
      assignments: [...newTeacher.assignments, { standard: '', subject: '' }]
    });
  };
  
  const removeAssignment = (index) => {
    const updatedAssignments = [...newTeacher.assignments];
    updatedAssignments.splice(index, 1);
    
    setNewTeacher({
      ...newTeacher,
      assignments: updatedAssignments
    });
  };
  
  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...newTeacher.assignments];
    updatedAssignments[index][field] = value;
    
    setNewTeacher({
      ...newTeacher,
      assignments: updatedAssignments
    });
    
    // Clear assignments error if it exists
    if (errors.assignments) {
      setErrors({
        ...errors,
        assignments: null
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateTeacherForm(newTeacher, editingTeacher);
    
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Form is valid, proceed with save
    onSave(newTeacher);
  };
  
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-600 bg-opacity-50 backdrop-blur-sm">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity" 
          onClick={onCancel}
        ></div>
        
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg leading-6 font-medium text-gray-900">
                    {editingTeacher ? 'Edit Teacher' : 'Add New Teacher'}
                  </h3>
                  <div className="mt-4">
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Personal Information Section */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Personal Information</h4>
                          
                          {/* Name Field */}
                          <div className="mb-4">
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                              Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="text"
                              id="name"
                              name="name"
                              value={newTeacher.name}
                              onChange={handleChange}
                              className={`mt-1 block w-full px-3 py-2 border ${
                                errors.name ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                            />
                            {errors.name && (
                              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                            )}
                          </div>
                          
                          {/* Email Field */}
                          <div className="mb-4">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email Address <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="email"
                              id="email"
                              name="email"
                              value={newTeacher.email}
                              onChange={handleChange}
                              className={`mt-1 block w-full px-3 py-2 border ${
                                errors.email ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                            />
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                          </div>
                          
                          {/* Phone Field */}
                          <div className="mb-4">
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              id="phone"
                              name="phone"
                              value={newTeacher.phone}
                              onChange={handleChange}
                              className={`mt-1 block w-full px-3 py-2 border ${
                                errors.phone ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                              } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                            />
                            {errors.phone && (
                              <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Account Information Section */}
                        <div>
                          <h4 className="text-sm font-medium text-gray-700 mb-3">Account Information</h4>
                          
                          {/* Password Field */}
                          <div className="mb-4">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Password {!editingTeacher && <span className="text-red-500">*</span>}
                              {editingTeacher && <span className="text-sm font-normal text-gray-500 ml-1">(Leave blank to keep current)</span>}
                            </label>
                            <div className="mt-1 relative">
                              <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={newTeacher.password}
                                onChange={handleChange}
                                placeholder={editingTeacher ? "Leave blank to keep current" : "Min. 6 characters"}
                                className={`block w-full px-3 py-2 border ${
                                  errors.password ? 'border-red-300 ring-1 ring-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition-all duration-200`}
                              />
                              <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                                <button
                                  type="button"
                                  onClick={() => setShowPassword(!showPassword)}
                                  className="text-gray-400 hover:text-gray-600"
                                >
                                  {showPassword ? (
                                    <EyeOff size={18} />
                                  ) : (
                                    <Eye size={18} />
                                  )}
                                </button>
                              </div>
                            </div>
                            {errors.password && (
                              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      {/* Teacher Assignments Section */}
                      <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                        <div className="flex justify-between items-center">
                          <h4 className="font-medium text-green-800 flex items-center">
                            <Book size={18} className="mr-2" />
                            Subject Assignments
                          </h4>
                          <button
                            type="button"
                            onClick={addAssignment}
                            className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
                          >
                            <PlusCircle size={14} className="mr-1" />
                            Add
                          </button>
                        </div>
                        
                        {errors.assignments && (
                          <p className="mt-2 text-sm text-red-600">{errors.assignments}</p>
                        )}
                        
                        {newTeacher.assignments.map((assignment, index) => (
                          <AssignmentForm
                            key={index}
                            index={index}
                            assignment={assignment}
                            onChange={handleAssignmentChange}
                            onRemove={removeAssignment}
                            canRemove={newTeacher.assignments.length > 1}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gradient-to-r from-sky-500 to-cyan-500 text-base font-medium text-white hover:from-sky-600 hover:to-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm transition-all duration-200"
              >
                {editingTeacher ? 'Update Teacher' : 'Add Teacher'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:w-auto sm:text-sm transition-all duration-200"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TeacherForm;