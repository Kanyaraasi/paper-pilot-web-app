'use client'
import React, { useState, useEffect } from 'react';
import { Search, PlusCircle, Edit2, Trash2, ArrowUpDown } from 'lucide-react';
import TeacherForm from './TeacherForm';
import DeleteConfirmationModal from './DeleteConfirmationModal';

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  
  // Simulated data - in a real app, this would come from an API
  useEffect(() => {
    // Mock data for demonstration
    const mockTeachers = [
      { 
        id: 1, 
        name: 'Jane Smith', 
        email: 'jane.smith@school.edu', 
        phone: '555-123-4567',
        assignments: [
          { standard: 'Grade 5', subject: 'Mathematics' },
          { standard: 'Grade 6', subject: 'Science' }
        ]
      },
      { 
        id: 2, 
        name: 'John Doe', 
        email: 'john.doe@school.edu', 
        phone: '555-987-6543',
        assignments: [
          { standard: 'Grade 7', subject: 'English' },
          { standard: 'Grade 8', subject: 'History' }
        ]
      },
      { 
        id: 3, 
        name: 'Alice Johnson', 
        email: 'alice.johnson@school.edu', 
        phone: '555-567-8901',
        assignments: [
          { standard: 'Grade 9', subject: 'Physics' },
          { standard: 'Grade 10', subject: 'Chemistry' }
        ]
      }
    ];
    
    setTeachers(mockTeachers);
  }, []);
  
  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };
  
  const getSortedTeachers = () => {
    const sortableTeachers = [...teachers];
    if (sortConfig.key) {
      sortableTeachers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableTeachers;
  };
  
  const filteredTeachers = getSortedTeachers().filter(teacher => {
    const searchLower = searchQuery.toLowerCase();
    return (
      teacher.name.toLowerCase().includes(searchLower) ||
      teacher.email.toLowerCase().includes(searchLower) ||
      teacher.phone.includes(searchQuery) ||
      teacher.assignments.some(a => 
        a.standard.toLowerCase().includes(searchLower) || 
        a.subject.toLowerCase().includes(searchLower)
      )
    );
  });
  
  const openAddModal = () => {
    setEditingTeacher(null);
    setShowModal(true);
  };
  
  const openEditModal = (teacher) => {
    setEditingTeacher(teacher);
    setShowModal(true);
  };
  
  const openDeleteModal = (teacher) => {
    setSelectedTeacher(teacher);
    setShowDeleteModal(true);
  };
  
  const handleSaveTeacher = (teacher) => {
    if (teacher.id) {
      // Update existing teacher
      setTeachers(teachers.map(t => t.id === teacher.id ? teacher : t));
    } else {
      // Add new teacher with generated ID
      const newTeacher = {
        ...teacher,
        id: Date.now() // simple ID generation for demo
      };
      setTeachers([...teachers, newTeacher]);
    }
    setShowModal(false);
  };
  
  const handleDeleteTeacher = () => {
    if (selectedTeacher) {
      setTeachers(teachers.filter(t => t.id !== selectedTeacher.id));
      setShowDeleteModal(false);
      setSelectedTeacher(null);
    }
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-sky-500 to-cyan-500">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <h2 className="text-2xl font-bold text-white">Teacher Management</h2>
            <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search teachers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search size={18} className="text-gray-400" />
                </div>
              </div>
              <button
                onClick={openAddModal}
                className="inline-flex items-center justify-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-all duration-200"
              >
                <PlusCircle size={18} className="mr-2" />
                Add Teacher
              </button>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('name')}
                >
                  <div className="flex items-center">
                    Name
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th 
                  scope="col" 
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('email')}
                >
                  <div className="flex items-center">
                    Email
                    <ArrowUpDown size={14} className="ml-1" />
                  </div>
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Assignments
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredTeachers.length > 0 ? (
                filteredTeachers.map((teacher) => (
                  <tr key={teacher.id} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{teacher.name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{teacher.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">{teacher.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {teacher.assignments.map((assignment, index) => (
                          <div key={index} className="mb-1 last:mb-0">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {assignment.standard}
                            </span>
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {assignment.subject}
                            </span>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => openEditModal(teacher)}
                        className="text-sky-600 hover:text-sky-900 mr-3 transition-colors duration-150"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button
                        onClick={() => openDeleteModal(teacher)}
                        className="text-red-600 hover:text-red-900 transition-colors duration-150"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm font-medium text-gray-500">
                    {searchQuery ? 'No teachers match your search criteria.' : 'No teachers added yet.'}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Render modals */}
        {showModal && (
          <TeacherForm 
            teacher={editingTeacher} 
            onSave={handleSaveTeacher} 
            onCancel={() => setShowModal(false)} 
          />
        )}
        
        {showDeleteModal && (
          <DeleteConfirmationModal 
            onDelete={handleDeleteTeacher} 
            onCancel={() => setShowDeleteModal(false)} 
          />
        )}
      </div>
    </div>
  );
}

export default TeacherList;