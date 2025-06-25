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
import { testService } from "@/apiServices/testServices";

const TestDashboard = () => {
  const [selectedTest, setSelectedTest] = useState(null);
  const [filters, setFilters] = useState({
    academicYear: "",
    batch: "",
    standard: "",
    subject: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");
  const [viewMode, setViewMode] = useState("table");
  const [selectedTests, setSelectedTests] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  // Dummy data for tests
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalTests: 0,
    savedTests: 0,
    historyTests: 0,
  });
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    total: 0,
    limit: 10,
  });

  const fetchTests = async () => {
    try {
      setLoading(true);
      const params = {
        page: pagination.currentPage,
        limit: pagination.limit,
        ...filters,
        search: searchTerm,
        sortBy,
        sortOrder,
      };

      const response = await testService.getAllTests();
      setTests(response.tests || []);
      setPagination({
        currentPage: response.currentPage || 1,
        totalPages: response.totalPages || 1,
        total: response.total || 0,
        limit: pagination.limit,
      });

      // Update stats
      const totalTests = response.total || 0;
      const savedTests =
        response.tests?.filter((test) => test.status === "draft").length || 0;
      const publishedTests =
        response.tests?.filter((test) => test.status === "published").length ||
        0;

      setStats({
        totalTests,
        savedTests,
        historyTests: publishedTests,
      });
    } catch (error) {
      console.error("Error fetching tests:", error);

      // toast.error('Failed to fetch tests');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteTest = async (testId) => {
    if (!confirm("Are you sure you want to delete this test?")) return;

    try {
      await testService.deleteTest(testId);
      // toast.success('Test deleted successfully');
      fetchTests();
    } catch (error) {
      console.error("Error deleting test:", error);
      // toast.error('Failed to delete test');
    }
  };

  const handleStatusUpdate = async (testId, newStatus) => {
    try {
      await testService.updateTestStatus(testId, newStatus);
      // toast.success(`Test ${newStatus} successfully`);
      fetchTests();
    } catch (error) {
      console.error("Error updating test status:", error);
      // toast.error('Failed to update test status');
    }
  };

  const handleBulkStatusUpdate = async (status) => {
    if (selectedTests.length === 0) return;

    try {
      await testService.bulkUpdateStatus(selectedTests, status);
      // toast.success(`${selectedTests.length} tests ${status} successfully`);
      setSelectedTests([]);
      fetchTests();
    } catch (error) {
      console.error("Error updating tests:", error);
      // toast.error('Failed to update tests');
    }
  };

  const handleBulkDelete = async () => {
    if (selectedTests.length === 0) return;
    if (
      !confirm(`Are you sure you want to delete ${selectedTests.length} tests?`)
    )
      return;

    try {
      await testService.bulkDelete(selectedTests);
      // toast.success(`${selectedTests.length} tests deleted successfully`);
      setSelectedTests([]);
      fetchTests();
    } catch (error) {
      console.error("Error deleting tests:", error);
      // toast.error('Failed to delete tests');
    }
  };

  const handlePageChange = (newPage) => {
    setPagination((prev) => ({ ...prev, currentPage: newPage }));
  };

  // Add useEffect to fetch data
  useEffect(() => {
    fetchTests();
  }, [pagination.currentPage, filters, searchTerm, sortBy, sortOrder]);

  // Filter and sort tests
  const getFilteredAndSortedTests = () => {
    let filtered = tests.filter((test) => {
      const matchesSearch =
        test.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        test.subject?.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = !filters.status || test.status === filters.status;
      const matchesSubject =
        !filters.subject || test.subject?.name === filters.subject;
      const matchesStandard =
        !filters.standard || test.standard?.name === filters.standard;

      return (
        matchesSearch && matchesStatus && matchesSubject && matchesStandard
      );
    });

    // Sort tests
    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (sortBy) {
        case "name":
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case "createdAt":
          aValue = new Date(a.createdAt);
          bValue = new Date(b.createdAt);
          break;
        default:
          aValue = a[sortBy];
          bValue = b[sortBy];
      }

      if (sortOrder === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const handleTestSelect = (testId) => {
    setSelectedTests((prev) =>
      prev.includes(testId)
        ? prev.filter((id) => id !== testId)
        : [...prev, testId]
    );
  };

  const handleSelectAll = () => {
    const filteredTests = getFilteredAndSortedTests();
    if (selectedTests.length === filteredTests.length) {
      setSelectedTests([]);
    } else {
      setSelectedTests(filteredTests.map((test) => test._id));
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
    subject: test.subject?.name || "N/A",
    board: test.standard?.board || "N/A",
    medium: test.standard?.medium || "N/A",
    standard: test.standard?.name || "N/A",
    questions: test.selectedQuestions?.length || 0,
    duration: test.duration,
    status: test.status,
    totalMarks: test.totalMarks,
    batch: test.batch?.name || "N/A",
    academicYear: test.academicYear?.year || "N/A",
    createdAt: new Date(test.createdAt).toLocaleDateString(),
    tags: test.tags || [],
    lastModified: new Date(test.lastModified).toLocaleDateString(),
  });

  const filteredTests = getFilteredAndSortedTests();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-sky-600 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Loading tests...</p>
        </div>
      </div>
    );
  }
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
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Total Tests
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.totalTests}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-sky-200 rounded-xl flex items-center justify-center">
                <FileText className="h-6 w-6 text-sky-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  Saved Tests
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.savedTests}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-xl flex items-center justify-center">
                <Bookmark className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">
                  History
                </p>
                <p className="text-3xl font-bold text-gray-900">
                  {stats.historyTests}
                </p>
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
              <Link href="/TestCreationDashboard">
                <button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl font-medium">
                  <Plus className="h-5 w-5" />
                  <span>Create Test</span>
                </button>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              <select
                value={filters.status}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, status: e.target.value }))
                }
                className="border border-gray-200 rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-sky-500 bg-white/50 backdrop-blur-sm"
              >
                <option value="">All Status</option>
                <option value="saved">Saved</option>
                <option value="history">History</option>
              </select>

              <select
                value={filters.subject}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, subject: e.target.value }))
                }
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
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table"
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-sky-100 text-sky-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Test List/Grid */}
        {viewMode === "table" ? (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 bg-white/50">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">
                  Test Library
                </h2>
                <div className="flex items-center space-x-2 text-sm font-medium text-gray-500">
                  <span>{tests.length} tests</span>
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
                        checked={
                          selectedTests.length === filteredTests.length &&
                          filteredTests.length > 0
                        }
                        className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                      />
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("name")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Test Details</span>
                        {sortBy === "name" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="h-3 w-3" />
                          ) : (
                            <SortDesc className="h-3 w-3" />
                          ))}
                      </div>
                    </th>
                    <th
                      className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort("createdAt")}
                    >
                      <div className="flex items-center space-x-1">
                        <span>Date & Status</span>
                        {sortBy === "createdAt" &&
                          (sortOrder === "asc" ? (
                            <SortAsc className="h-3 w-3" />
                          ) : (
                            <SortDesc className="h-3 w-3" />
                          ))}
                      </div>
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/30 divide-y divide-gray-200">
                  {tests.map((test) => {
                    const formattedTest = formatTestData(test);
                    return (
                      <tr
                        key={formattedTest.id}
                        className="hover:bg-white/40 transition-colors"
                      >
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
                                {formattedTest.subject} •{" "}
                                {formattedTest.standard} • {formattedTest.board}
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
                                <span className="ml-1.5 capitalize">
                                  {formattedTest.status}
                                </span>
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
          </div>
        ) : (
          /* Grid View */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <tbody className="bg-white/30 divide-y divide-gray-200">
              {tests.map((test) => (
                <tr
                  key={test._id}
                  className="hover:bg-white/40 transition-colors"
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      checked={selectedTests.includes(test._id)}
                      onChange={() => handleTestSelect(test._id)}
                      className="rounded border-gray-300 text-sky-600 focus:ring-sky-500"
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-sky-100 to-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="h-6 w-6 text-sky-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 mb-1 line-clamp-2 leading-5">
                          {test.name}
                        </div>
                        <div className="text-sm font-medium text-gray-600 mb-2">
                          {test.subject?.name} • {test.standard?.name} •{" "}
                          {test.batch?.name}
                        </div>
                        <div className="flex items-center space-x-4 text-xs font-medium text-gray-500">
                          <span className="flex items-center">
                            <FileText className="h-3 w-3 mr-1" />
                            {test.selectedQuestions?.length || 0} questions
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {test.duration}
                          </span>
                          <span className="flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            {test.totalMarks} marks
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="text-sm font-semibold text-gray-900">
                        Created: {new Date(test.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
                            test.status
                          )}`}
                        >
                          {getStatusIcon(test.status)}
                          <span className="ml-1.5 capitalize">
                            {test.status}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <Link href={`/tests/${test._id}/preview`}>
                        <button
                          className="p-2 text-sky-600 hover:text-sky-800 hover:bg-sky-50 rounded-lg transition-colors"
                          title="Preview Test"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </Link>

                      <Link href={`/tests/${test._id}/edit`}>
                        <button
                          className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                          title="Edit Test"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                      </Link>

                      {test.status === "draft" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(test._id, "published")
                          }
                          className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Publish Test"
                        >
                          <Play className="h-4 w-4" />
                        </button>
                      )}

                      {test.status === "published" && (
                        <button
                          onClick={() =>
                            handleStatusUpdate(test._id, "archived")
                          }
                          className="p-2 text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-colors"
                          title="Archive Test"
                        >
                          <Archive className="h-4 w-4" />
                        </button>
                      )}

                      <button
                        onClick={() => handleDeleteTest(test._id)}
                        className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete Test"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

            {tests.length === 0 && (
              <div className="col-span-full text-center py-12">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  No tests found
                </h3>
                <p className="text-sm font-medium text-gray-500 mb-4">
                  Get started by creating your first test or adjust your
                  filters.
                </p>
                <button className="bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white px-6 py-2 rounded-xl flex items-center space-x-2 mx-auto transition-all font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Create Test</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Pagination */}
        {tests.length > 0 && (
          <div className="mt-8 flex items-center justify-between">
            <div className="text-sm font-medium text-gray-700">
              Showing {tests.length} of {tests.length} tests
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
