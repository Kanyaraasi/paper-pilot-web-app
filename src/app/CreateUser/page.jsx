'use client'
import { useState, useEffect } from 'react';
import { 
  Users, 
  PlusCircle, 
  Search, 
  X, 
  CheckCircle, 
  AlertCircle,
  Menu,
  Home,
  Book,
  Calendar,
  Settings,
  LogOut,
  ChevronDown
} from 'lucide-react';

// Mock data for teachers
const initialTeachers = [
  { id: 1, name: 'John Doe', email: 'john.doe@school.edu', subject: 'Mathematics', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@school.edu', subject: 'Science', status: 'active' },
  { id: 3, name: 'Robert Johnson', email: 'robert.j@school.edu', subject: 'History', status: 'inactive' },
  { id: 4, name: 'Sarah Williams', email: 'sarah.w@school.edu', subject: 'English', status: 'active' },
];

// Navigation sidebar items
const sidebarItems = [
  { icon: Home, name: 'Dashboard', active: false },
  { icon: Users, name: 'Teachers', active: true },
  { icon: Book, name: 'Courses', active: false },
  { icon: Calendar, name: 'Schedule', active: false },
  { icon: Settings, name: 'Settings', active: false },
];

export default function AdminDashboard() {
  const [teachers, setTeachers] = useState(initialTeachers);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [notification, setNotification] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Form state
  const [newTeacher, setNewTeacher] = useState({
    teacherName: '',
    email: '',
    mobileNumber: '',
    password: '',
    assignments: [{ standard: '', subject: '' }]
  });
  
  // Form validation errors
  const [errors, setErrors] = useState({});
  
  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTeacher({
      ...newTeacher,
      [name]: value
    });
    
    // Clear error when field is edited
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  // Filter teachers based on search term
  const filteredTeachers = teachers.filter(teacher => {
    return (
      teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subject.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  
  // Subject options for dropdown
  const subjectOptions = [
    'Mathematics', 'Science', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Social Studies', 'English', 'Literature',
    'Computer Science', 'Physical Education', 'Art', 'Music'
  ];
  
  // Standard/Grade options for dropdown
  const standardOptions = [
    'Grade 1', 'Grade 2', 'Grade 3', 'Grade 4', 'Grade 5',
    'Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10',
    'Grade 11', 'Grade 12'
  ];
  
  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!newTeacher.teacherName.trim()) {
      newErrors.teacherName = 'Teacher name is required';
    }
    
    if (!newTeacher.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(newTeacher.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!newTeacher.mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile number is required';
    } else if (!/^\d{10}$/.test(newTeacher.mobileNumber.replace(/[^\d]/g, ''))) {
      newErrors.mobileNumber = 'Mobile number must be 10 digits';
    }
    
    if (!newTeacher.password.trim()) {
      newErrors.password = 'Password is required';
    } else if (newTeacher.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    // Validate at least one assignment has both standard and subject
    if (newTeacher.assignments.length === 0) {
      newErrors.assignments = 'At least one assignment is required';
    } else {
      const assignmentErrors = [];
      newTeacher.assignments.forEach((assignment, index) => {
        if (!assignment.standard.trim() || !assignment.subject.trim()) {
          assignmentErrors.push(index);
        }
      });
      
      if (assignmentErrors.length > 0) {
        newErrors.assignments = 'All assignments must have both standard and subject';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  // Add a new assignment field
  const addAssignment = () => {
    setNewTeacher({
      ...newTeacher,
      assignments: [...newTeacher.assignments, { standard: '', subject: '' }]
    });
  };

  // Remove an assignment field
  const removeAssignment = (index) => {
    const updatedAssignments = [...newTeacher.assignments];
    updatedAssignments.splice(index, 1);
    setNewTeacher({
      ...newTeacher,
      assignments: updatedAssignments
    });
  };

  // Handle assignment field changes
  const handleAssignmentChange = (index, field, value) => {
    const updatedAssignments = [...newTeacher.assignments];
    updatedAssignments[index][field] = value;
    setNewTeacher({
      ...newTeacher,
      assignments: updatedAssignments
    });
    
    // Clear errors if present
    if (errors.assignments) {
      setErrors({
        ...errors,
        assignments: ''
      });
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    
    if (validateForm()) {
      // In a real app, this would make an API call to create the teacher
      const newTeacherId = teachers.length + 1;
      
      // Get subject for display in table (first subject)
      const primarySubject = newTeacher.assignments.length > 0 
        ? newTeacher.assignments[0].subject 
        : 'Not assigned';
      
      const teacher = {
        id: newTeacherId,
        name: newTeacher.teacherName,
        email: newTeacher.email,
        subject: primarySubject,
        status: 'active'
      };
      
      setTeachers([...teachers, teacher]);
      setShowAddModal(false);
      
      // Reset form
      setNewTeacher({
        teacherName: '',
        email: '',
        mobileNumber: '',
        password: '',
        assignments: [{ standard: '', subject: '' }]
      });
      
      // Show success notification
      setNotification({
        type: 'success',
        message: 'Teacher added successfully!'
      });
      
      // Clear notification after 3 seconds
      setTimeout(() => {
        setNotification(null);
      }, 3000);
    }
  };
  
  // Handle responsive sidebar behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          <Menu size={24} />
        </button>
      </div>
      
      {/* Sidebar - Desktop */}
      <div className={`bg-white shadow-lg fixed inset-y-0 left-0 z-40 transform ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 transition-transform duration-300 ease-in-out md:relative md:w-64`}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 border-b">
            <span className="text-xl font-bold text-sky-500">SchoolAdmin</span>
          </div>
          
          {/* Close button for mobile */}
          <div className="md:hidden absolute top-4 right-4">
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="p-1 rounded-full hover:bg-gray-100"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-2">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`flex items-center px-4 py-3 rounded-lg ${
                      item.active 
                        ? 'bg-sky-100 text-sky-700' 
                        : 'text-gray-600 hover:bg-sky-50 hover:text-sky-600'
                    } transition-colors duration-200`}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.name}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User info */}
          <div className="p-4 border-t">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-sky-200 flex items-center justify-center">
                <span className="font-semibold text-sky-700">A</span>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">Admin User</p>
                <p className="text-xs text-gray-500">admin@school.edu</p>
              </div>
              <button className="ml-auto p-1 rounded-full hover:bg-gray-100">
                <ChevronDown size={16} />
              </button>
            </div>
            <a 
              href="#" 
              className="flex items-center mt-4 text-gray-600 hover:text-sky-600"
            >
              <LogOut size={18} className="mr-2" />
              <span className="text-sm">Log Out</span>
            </a>
          </div>
        </div>
      </div>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm z-10">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-semibold text-gray-800">Teacher Management</h1>
              <button
                onClick={() => setShowAddModal(true)}
                className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
              >
                <PlusCircle size={18} className="mr-2" />
                <span>Add Teacher</span>
              </button>
            </div>
          </div>
        </header>
        
        {/* Main content area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {/* Search and filter */}
          <div className="mb-6">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search teachers by name, email or subject..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button
                  className="absolute inset-y-0 right-0 flex items-center pr-3"
                  onClick={() => setSearchTerm('')}
                >
                  <X size={18} className="text-gray-400 hover:text-gray-600" />
                </button>
              )}
            </div>
          </div>
          
          {/* Notification */}
          {notification && (
            <div className={`mb-6 p-4 rounded-lg flex items-start ${
              notification.type === 'success' ? 'bg-green-50' : 'bg-red-50'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle size={20} className="text-green-500 mr-3 mt-0.5" />
              ) : (
                <AlertCircle size={20} className="text-red-500 mr-3 mt-0.5" />
              )}
              <div>
                <p className={`font-medium ${
                  notification.type === 'success' ? 'text-green-800' : 'text-red-800'
                }`}>
                  {notification.message}
                </p>
              </div>
              <button 
                className="ml-auto"
                onClick={() => setNotification(null)}
              >
                <X size={16} className="text-gray-500" />
              </button>
            </div>
          )}
          
          {/* Teacher list */}
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTeachers.length > 0 ? (
                  filteredTeachers.map((teacher) => (
                    <tr key={teacher.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{teacher.email}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-500">{teacher.subject}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          teacher.status === 'active' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {teacher.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-sky-600 hover:text-sky-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No teachers found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      
      {/* Add Teacher Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            {/* Background overlay */}
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
              onClick={() => setShowAddModal(false)}
            ></div>
            
            {/* Modal panel */}
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Add New Teacher
                      </h3>
                      <div className="mt-4 space-y-6">
                        <h4 className="font-medium text-gray-900">Teacher Information</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Teacher Name field */}
                          <div>
                            <label htmlFor="teacherName" className="block text-sm font-medium text-gray-700">
                              Full Name
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Users size={16} className="text-gray-400" />
                              </div>
                              <input
                                type="text"
                                name="teacherName"
                                id="teacherName"
                                value={newTeacher.teacherName}
                                onChange={handleInputChange}
                                placeholder="John Doe"
                                className={`pl-10 block w-full px-3 py-2 border ${
                                  errors.teacherName ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                              />
                            </div>
                            {errors.teacherName && (
                              <p className="mt-1 text-sm text-red-600">{errors.teacherName}</p>
                            )}
                          </div>
                          
                          {/* Email field */}
                          <div>
                            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                              Email Address
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                              </div>
                              <input
                                type="email"
                                name="email"
                                id="email"
                                value={newTeacher.email}
                                onChange={handleInputChange}
                                placeholder="teacher@school.edu"
                                className={`pl-10 block w-full px-3 py-2 border ${
                                  errors.email ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                              />
                            </div>
                            {errors.email && (
                              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {/* Mobile Number field */}
                          <div>
                            <label htmlFor="mobileNumber" className="block text-sm font-medium text-gray-700">
                              Mobile Number
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                </svg>
                              </div>
                              <input
                                type="tel"
                                name="mobileNumber"
                                id="mobileNumber"
                                value={newTeacher.mobileNumber}
                                onChange={handleInputChange}
                                placeholder="(123) 456-7890"
                                className={`pl-10 block w-full px-3 py-2 border ${
                                  errors.mobileNumber ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                              />
                            </div>
                            {errors.mobileNumber && (
                              <p className="mt-1 text-sm text-red-600">{errors.mobileNumber}</p>
                            )}
                          </div>
                          
                          {/* Password field */}
                          <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                              Initial Password
                            </label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                              </div>
                              <input
                                type="password"
                                name="password"
                                id="password"
                                value={newTeacher.password}
                                onChange={handleInputChange}
                                placeholder="••••••"
                                className={`pl-10 block w-full px-3 py-2 border ${
                                  errors.password ? 'border-red-300' : 'border-gray-300'
                                } rounded-md shadow-sm focus:outline-none focus:ring-sky-500 focus:border-sky-500`}
                              />
                            </div>
                            {errors.password && (
                              <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                            )}
                          </div>
                        </div>
                        
                        {/* Assignments section */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <h4 className="font-medium text-gray-900">Subject & Grade Assignments</h4>
                            <button
                              type="button"
                              onClick={addAssignment}
                              className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-sky-600 hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500"
                            >
                              <PlusCircle size={16} className="mr-1" />
                              Add Assignment
                            </button>
                          </div>
                          
                          {errors.assignments && (
                            <p className="text-sm text-red-600">{errors.assignments}</p>
                          )}
                          
                          {newTeacher.assignments.map((assignment, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                              <div className="flex justify-between items-center mb-3">
                                <h5 className="text-sm font-medium text-gray-700">Assignment {index + 1}</h5>
                                {newTeacher.assignments.length > 1 && (
                                  <button
                                    type="button"
                                    onClick={() => removeAssignment(index)}
                                    className="text-red-600 hover:text-red-800"
                                  >
                                    <X size={16} />
                                  </button>
                                )}
                              </div>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Standard/Grade select */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Grade/Standard
                                  </label>
                                  <select
                                    value={assignment.standard}
                                    onChange={(e) => handleAssignmentChange(index, 'standard', e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md"
                                  >
                                    <option value="">Select Grade</option>
                                    {standardOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                                
                                {/* Subject select */}
                                <div>
                                  <label className="block text-sm font-medium text-gray-700">
                                    Subject
                                  </label>
                                  <select
                                    value={assignment.subject}
                                    onChange={(e) => handleAssignmentChange(index, 'subject', e.target.value)}
                                    className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-sky-500 focus:border-sky-500 rounded-md"
                                  >
                                    <option value="">Select Subject</option>
                                    {subjectOptions.map((option) => (
                                      <option key={option} value={option}>
                                        {option}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Add Teacher
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}