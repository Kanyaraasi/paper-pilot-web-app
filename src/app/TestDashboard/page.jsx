"use client";
import React, { useState, useEffect } from "react";
import {
  Home,
  FileText,
  Users,
  Settings,
  Bell,
  Search,
  Plus,
  Filter,
  Download,
  Upload,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Play,
  Pause,
  MoreHorizontal,
  Edit,
  Trash2,
  Eye,
  Copy,
  RefreshCw,
  TrendingUp,
  BookOpen,
  Star,
  Share2,
  Archive,
  BarChart3,
  Timer,
  Award,
  MessageSquare,
  ChevronDown,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  ExternalLink,
  History,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

const TestDashboard = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState({
    academicYear: '',
    batch: '',
    standard: '',
    subject: '',
    status: ''
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('createdAt');
  const [sortOrder, setSortOrder] = useState('desc');
  const [viewMode, setViewMode] = useState('table');
  const [selectedTests, setSelectedTests] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Dummy data for tests
  const [testData] = useState([
    {
      _id: '1',
      name: 'Mathematics Mid-Term Exam',
      subject: { name: 'Mathematics' },
      standard: { board: 'CBSE', medium: 'English', name: 'Class 10' },
      selectedQuestions: Array(50).fill({}),
      duration: '3 hours',
      status: 'saved',
      totalMarks: 100,
      batch: { name: 'Batch A' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-15T10:00:00Z',
      tags: ['Algebra', 'Geometry', 'Statistics'],
      lastModified: '2024-12-20T15:30:00Z'
    },
    {
      _id: '2',
      name: 'Physics Chapter 1-3 Test',
      subject: { name: 'Physics' },
      standard: { board: 'CBSE', medium: 'English', name: 'Class 12' },
      selectedQuestions: Array(40).fill({}),
      duration: '2.5 hours',
      status: 'history',
      totalMarks: 80,
      batch: { name: 'Batch B' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-18T14:30:00Z',
      tags: ['Mechanics', 'Waves', 'Optics'],
      lastModified: '2024-12-22T09:15:00Z'
    },
    {
      _id: '3',
      name: 'English Literature Quiz',
      subject: { name: 'English' },
      standard: { board: 'ICSE', medium: 'English', name: 'Class 11' },
      selectedQuestions: Array(25).fill({}),
      duration: '1.5 hours',
      status: 'saved',
      totalMarks: 50,
      batch: { name: 'Batch A' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-10T11:20:00Z',
      lastModified: '2024-12-19T16:45:00Z'
    },
    {
      _id: '4',
      name: 'Chemistry Organic Compounds',
      subject: { name: 'Chemistry' },
      standard: { board: 'CBSE', medium: 'English', name: 'Class 12' },
      selectedQuestions: Array(35).fill({}),
      duration: '2 hours',
      status: 'history',
      totalMarks: 70,
      batch: { name: 'Batch C' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-05T09:45:00Z',
      lastModified: '2024-12-18T12:30:00Z'
    },
    {
      _id: '5',
      name: 'Biology Cell Structure Test',
      subject: { name: 'Biology' },
      standard: { board: 'CBSE', medium: 'English', name: 'Class 11' },
      selectedQuestions: Array(30).fill({}),
      duration: '1.5 hours',
      status: 'saved',
      totalMarks: 60,
      batch: { name: 'Batch A' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-12T13:15:00Z',
      lastModified: '2024-12-21T10:20:00Z'
    },
    {
      _id: '6',
      name: 'History Modern India',
      subject: { name: 'History' },
      standard: { board: 'NCERT', medium: 'Hindi', name: 'Class 10' },
      selectedQuestions: Array(45).fill({}),
      duration: '2.5 hours',
      status: 'history',
      totalMarks: 90,
      batch: { name: 'Batch B' },
      academicYear: { year: '2024-25' },
      createdAt: '2024-12-20T08:30:00Z',
      lastModified: '2024-12-22T14:10:00Z'
    }
  ]);

  // Calculate stats from dummy data
  const [stats] = useState(() => {
    const totalTests = testData.length;
    const savedTests = testData.filter(test => test.status === 'saved').length;
    const historyTests = testData.filter(test => test.status === 'history').length;
    
    return {
      totalTests,
      savedTests,
      historyTests
    };
  });

  // Filter and sort tests
  const getFilteredAndSortedTests = () => {
    let filtered = testData.filter(test => {
      const matchesSearch = test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.subject?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || test.status === filters.status;
      const matchesSubject = !filters.subject || test.subject?.name === filters.subject;
      const matchesStandard = !filters.standard || test.standard?.name === filters.standard;
      
      return matchesSearch && matchesStatus && matchesSubject && matchesStandard;
    });

    // Sort tests
    filtered.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'createdAt':
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const handleTestSelect = (testId) => {
    setSelectedTests(prev => 
      prev.includes(testId) 
        ? prev.filter(id => id !== testId)
        : [...prev, testId]
    );
  };

  const handleSelectAll = () => {
    const filteredTests = getFilteredAndSortedTests();
    if (selectedTests.length === filteredTests.length) {
      setSelectedTests([]);
    } else {
      setSelectedTests(filteredTests.map(test => test._id));
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "saved":
        return "bg-emerald-50 text-emerald-700 border-emerald-200";
      case "history":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "saved":
        return <Bookmark className="h-3.5 w-3.5" />;
      case "history":
        return <History className="h-3.5 w-3.5" />;
      default:
        return <AlertCircle className="h-3.5 w-3.5" />;
    }
  };

  const formatTestData = (test) => ({
    id: test._id,
    name: test.name,
    subject: test.subject?.name || 'N/A',
    board: test.standard?.board || 'N/A',
    medium: test.standard?.medium || 'N/A',
    standard: test.standard?.name || 'N/A',
    questions: test.selectedQuestions?.length || 0,
    duration: test.duration,
    status: test.status,
    totalMarks: test.totalMarks,
    batch: test.batch?.name || 'N/A',
    academicYear: test.academicYear?.year || 'N/A',
    createdAt: new Date(test.createdAt).toLocaleDateString(),
    tags: test.tags || [],
    lastModified: new Date(test.lastModified).toLocaleDateString()
  });

  const filteredTests = getFilteredAndSortedTests();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                    Test Dashboard
                  </h1>
                  <p className="text-sm font-medium text-gray-500">
                    Manage and monitor your assessments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-64 bg-white/50 backdrop-blur-sm text-sm font-medium"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/50 rounded-xl transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white text-sm font-semibold">A</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Total Tests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.totalTests}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Saved Tests</p>
                <p className="text-3xl font-bold text-gray-900">{stats.savedTests}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">History</p>
                <p className="text-3xl font-bold text-gray-900">{stats.historyTests}</p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl flex items-center justify-center">
                <History className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4 mb-4">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <Link href='/TestCreationDashboard'>
              <button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl font-medium">
                <Plus className="h-5 w-5" />
                <span>Create Test</span>
              </button>
              </Link>
             
              {selectedTests.length > 0 && (
                <button className="border border-gray-200 hover:bg-gray-50 text-gray-700 px-4 py-3 rounded-xl flex items-center space-x-2 transition-colors bg-white/50 font-medium">
                  <Archive className="h-4 w-4" />
                  <span>Bulk Actions ({selectedTests.length})</span>
                </button>
              )}
            </div>
            
            <div className="flex items-center space-x-3">
              <select 
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-sky-500 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Status</option>
                <option value="saved">Saved</option>
                <option value="history">History</option>
              </select>
              
              <select 
                value={filters.subject}
                onChange={(e) => setFilters(prev => ({ ...prev, subject: e.target.value }))}
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-sky-500 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Subjects</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Physics">Physics</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Biology">Biology</option>
                <option value="English">English</option>
                <option value="History">History</option>
              </select>

              <div className="flex items-center space-x-2 border border-gray-200 rounded-xl p-1 bg-white/50">
                <button
                  onClick={() => setViewMode('table')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-sky-100 text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Test List/Grid */}
        {viewMode === 'table' ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-white/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Test Library</h2>
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                  <span>{filteredTests.length} tests</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50/50">
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={selectedTests.length === filteredTests.length && filteredTests.length > 0}
                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center space-x-1">
                        <span>Test Details</span>
                        {sortBy === 'name' && (sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer" onClick={() => handleSort('createdAt')}>
                      <div className="flex items-center space-x-1">
                        <span>Date & Status</span>
                        {sortBy === 'createdAt' && (sortOrder === 'asc' ? <SortAsc className="h-3 w-3" /> : <SortDesc className="h-3 w-3" />)}
                      </div>
                    </th>
                   
                  </tr>
                </thead>
                <tbody className="bg-white/30 divide-y divide-gray-200">
                  {filteredTests.map((test) => {
                    const formattedTest = formatTestData(test);
                    return (
                      <tr key={formattedTest.id} className="hover:bg-white/40 transition-colors">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedTests.includes(formattedTest.id)}
                            onChange={() => handleTestSelect(formattedTest.id)}
                            className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-4">
                            <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                              <BookOpen className="h-6 w-6 text-sky-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              
                              <div className="text-sm font-medium text-gray-600 mb-2">
                                {formattedTest.subject} • {formattedTest.standard} • {formattedTest.board}
                              </div>
                              <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
                                <span className="flex items-center">
                                  <FileText className="h-3 w-3 mr-1" />
                                  {formattedTest.questions} questions
                                </span>
                                <span className="flex items-center">
                                  <Clock className="h-3 w-3 mr-1" />
                                  {formattedTest.duration}
                                </span>
                                <span className="flex items-center">
                                  <Award className="h-3 w-3 mr-1" />
                                  {formattedTest.totalMarks} marks
                                </span>
                              </div>
                            </div>
                          </div>
                        </td>
                        
                        <td className="px-6 py-4">
                          <div className="space-y-2">
                            <div className="text-sm font-semibold text-gray-900">
                              Created: {formattedTest.createdAt}
                            </div>
                           
                            <div className="flex items-center space-x-2">
                              <span
                                className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                                  formattedTest.status
                                )}`}
                              >
                                {getStatusIcon(formattedTest.status)}
                                <span className="ml-1.5 capitalize">{formattedTest.status}</span>
                              </span>
                            </div>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredTests.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests found</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">Get started by creating your first test or adjust your filters.</p>
                <button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 mx-auto transition-all font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Create Test</span>
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((test) => {
              const formattedTest = formatTestData(test);
              return (
                <div key={formattedTest.id} className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-all hover:scale-[1.02]">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl flex items-center justify-center">
                        <BookOpen className="h-6 w-6 text-sky-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 leading-5">
                          {formattedTest.name}
                        </h3>
                        <p className="text-xs font-medium text-gray-500">
                          {formattedTest.subject} • {formattedTest.standard}
                        </p>
                      </div>
                    </div>
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(formattedTest.id)}
                      onChange={() => handleTestSelect(formattedTest.id)}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Questions:</span>
                      <span className="font-semibold">{formattedTest.questions}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Duration:</span>
                      <span className="font-semibold">{formattedTest.duration}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Total Marks:</span>
                      <span className="font-semibold">{formattedTest.totalMarks}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600 font-medium">Created:</span>
                      <span className="font-semibold">{formattedTest.createdAt}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                        formattedTest.status
                      )}`}
                    >
                      {getStatusIcon(formattedTest.status)}
                      <span className="ml-1.5 capitalize">{formattedTest.status}</span>
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors"
                        title="Preview Test"
                      >
                        <Eye className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                        title="Edit Test"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Duplicate Test"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        className="p-2 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
                        title="Analytics"
                      >
                        <BarChart3 className="h-4 w-4" />
                      </button>
                      <button 
                        className="p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-colors"
                        title="More Actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
            
            {filteredTests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No tests found</h3>
                <p className="text-sm font-medium text-gray-500 mb-4">Get started by creating your first test or adjust your filters.</p>
                <button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 mx-auto transition-all font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Create Test</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {filteredTests.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              Showing {filteredTests.length} of {testData.length} tests
            </div>
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Previous
              </button>
              <button className="px-4 py-2 text-sm font-medium text-white bg-sky-600 border border-sky-600 rounded-lg hover:bg-sky-700 transition-colors">
                1
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TestDashboard;