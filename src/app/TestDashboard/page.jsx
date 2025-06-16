"use client";
import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
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
} from "lucide-react";
import Link from "next/link";
import { DEV } from "../../../BASE_URL";

const TestDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedTest, setSelectedTest] = useState(null);
  const [testData, setTestData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    academicYear: '',
    batch: '',
    standard: '',
    subject: '',
    status: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({
    totalTests: 0,
    activeTests: 0,
    totalStudents: 0,
    avgScore: 0
  });


  // Fetch tests from backend
  const fetchTests = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.page,
        limit: pagination.limit,
        ...filters
      });

      const response = await fetch(`${DEV}/api/tests?${queryParams}`);
      if (!response.ok) throw new Error('Failed to fetch tests');
      
      const data = await response.json();
      setTestData(data.tests);
      setPagination(prev => ({
        ...prev,
        total: data.total,
        totalPages: data.totalPages,
        currentPage: data.currentPage
      }));
      
      // Calculate stats
      calculateStats(data.tests);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Calculate dashboard stats
  const calculateStats = (tests) => {
    const totalTests = tests.length;
    const activeTests = tests.filter(test => test.status === 'published').length;
    const totalStudents = tests.reduce((sum, test) => sum + (test.totalStudents || 0), 0);
    const avgScore = tests.reduce((sum, test) => sum + (test.avgScore || 0), 0) / tests.length || 0;

    setStats({
      totalTests,
      activeTests,
      totalStudents,
      avgScore: avgScore.toFixed(1)
    });
  };

  // Delete/Archive test
  const handleDeleteTest = async (testId) => {
    if (!confirm('Are you sure you want to archive this test?')) return;
    
    try {
      const response = await fetch(`${BASE_URL}/api/tests/${testId}`, {
        method: 'DELETE'
      });
      
      if (!response.ok) throw new Error('Failed to delete test');
      
      // Refresh tests
      fetchTests();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Clone test
  const handleCloneTest = async (testId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tests/${testId}/clone`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to clone test');
      
      const data = await response.json();
      alert('Test cloned successfully');
      fetchTests();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Publish test
  const handlePublishTest = async (testId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tests/${testId}/publish`, {
        method: 'PATCH'
      });
      
      if (!response.ok) throw new Error('Failed to publish test');
      
      fetchTests();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Generate questions for test
  const handleGenerateQuestions = async (testId) => {
    try {
      const response = await fetch(`${BASE_URL}/api/tests/${testId}/generate-questions`, {
        method: 'POST'
      });
      
      if (!response.ok) throw new Error('Failed to generate questions');
      
      const data = await response.json();
      alert(`Questions generated: ${data.totalQuestions} questions, ${data.totalMarks} marks`);
      fetchTests();
    } catch (err) {
      alert(`Error: ${err.message}`);
    }
  };

  // Search tests
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    // Implement search functionality
  };

  // Filter tests
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  // Apply filters
  const applyFilters = () => {
    setPagination(prev => ({ ...prev, page: 1 }));
    fetchTests();
  };

  useEffect(() => {
    fetchTests();
  }, [pagination.page]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", key: "dashboard" },
    { icon: FileText, label: "Tests", key: "tests" },
    { icon: Users, label: "Students", key: "students" },
    { icon: Calendar, label: "Schedule", key: "schedule" },
    { icon: Settings, label: "Settings", key: "settings" },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "published":
        return "bg-green-100 text-green-800 border-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "archived":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "published":
        return <Play className="h-3 w-3" />;
      case "draft":
        return <Pause className="h-3 w-3" />;
      case "archived":
        return <CheckCircle className="h-3 w-3" />;
      default:
        return <AlertCircle className="h-3 w-3" />;
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
    createdAt: new Date(test.createdAt).toLocaleDateString()
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <RefreshCw className="h-8 w-8 animate-spin text-sky-600" />
        <span className="ml-2 text-lg">Loading tests...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <p className="text-red-600 text-lg mb-4">Error: {error}</p>
          <button 
            onClick={fetchTests}
            className="bg-sky-600 text-white px-4 py-2 rounded-lg hover:bg-sky-700"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar - Keep existing sidebar code */}
      <div
        className={`${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
        fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
              <FileText className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">TestPro</span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-8 px-4">
          {sidebarItems.map((item) => (
            <a
              key={item.key}
              href="#"
              className={`flex items-center px-4 py-3 mb-2 text-sm font-medium rounded-lg transition-colors ${
                activeTab === item.key
                  ? "bg-sky-100 text-sky-700 border-r-2 border-sky-600"
                  : "text-gray-600 hover:bg-sky-50 hover:text-sky-700"
              }`}
              onClick={() => setActiveTab(item.key)}
            >
              <item.icon className="h-5 w-5 mr-3" />
              {item.label}
            </a>
          ))}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="bg-gradient-to-r from-sky-400 to-sky-600 rounded-lg p-4 text-white">
            <h3 className="font-semibold text-sm">Upgrade to Pro</h3>
            <p className="text-xs mt-1 opacity-90">Unlock advanced features</p>
            <button className="mt-2 bg-white text-sky-600 text-xs px-3 py-1 rounded-md font-medium hover:bg-gray-100">
              Learn More
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-4 py-4">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md hover:bg-gray-100"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Tests</h1>
                <p className="text-sm text-gray-500">
                  Manage your test assessments
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">A</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalTests}</p>
                </div>
                <div className="w-12 h-12 bg-sky-100 rounded-lg flex items-center justify-center">
                  <FileText className="h-6 w-6 text-sky-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Tests</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.activeTests}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Play className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalStudents}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Score</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.avgScore}%</p>
                </div>
                <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <Link href={'/TestCreationDashboard'}>
                <button className="bg-sky-600 hover:bg-sky-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
                  <Plus className="h-4 w-4" />
                  <span>Create Test</span>
                </button>
              </Link>
              <button 
                onClick={fetchTests}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <RefreshCw className="h-4 w-4" />
                <span>Refresh</span>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              <select 
                value={filters.status}
                onChange={(e) => handleFilterChange('status', e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-sky-500"
              >
                <option value="">All Status</option>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
              <button 
                onClick={applyFilters}
                className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>Apply Filters</span>
              </button>
            </div>
          </div>

          {/* Test List */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Test Details</h2>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Test Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Questions
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Duration
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Total Marks
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {testData.map((test) => {
                    const formattedTest = formatTestData(test);
                    return (
                      <tr key={formattedTest.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {formattedTest.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formattedTest.board} • {formattedTest.standard} • {formattedTest.medium}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedTest.subject}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedTest.questions}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedTest.duration}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {formattedTest.totalMarks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                              formattedTest.status
                            )}`}
                          >
                            {getStatusIcon(formattedTest.status)}
                            <span className="ml-1 capitalize">{formattedTest.status}</span>
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex items-center space-x-2">
                            <button 
                              onClick={() => window.open(`${BASE_URL}/api/tests/${formattedTest.id}/preview`, '_blank')}
                              className="text-sky-600 hover:text-sky-900 p-1"
                              title="Preview"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleCloneTest(formattedTest.id)}
                              className="text-blue-600 hover:text-blue-900 p-1"
                              title="Clone"
                            >
                              <Copy className="h-4 w-4" />
                            </button>
                            {formattedTest.status === 'draft' && (
                              <button 
                                onClick={() => handlePublishTest(formattedTest.id)}
                                className="text-green-600 hover:text-green-900 p-1"
                                title="Publish"
                              >
                                <Play className="h-4 w-4" />
                              </button>
                            )}
                            <button 
                              onClick={() => handleGenerateQuestions(formattedTest.id)}
                              className="text-purple-600 hover:text-purple-900 p-1"
                              title="Generate Questions"
                            >
                              <RefreshCw className="h-4 w-4" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTest(formattedTest.id)}
                              className="text-red-600 hover:text-red-900 p-1"
                              title="Archive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {pagination.totalPages > 1 && (
              <div className="px-6 py-4 border-t border-gray-200 flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                    disabled={pagination.page === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                    disabled={pagination.page >= pagination.totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default TestDashboard;