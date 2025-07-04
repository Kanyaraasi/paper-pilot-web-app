"use client";
import React, { useState, useRef, useEffect } from "react";
import { useTheme } from "@/contexts/ThemeContext";

import {
  FileText,
  Search,
  Plus,
  Clock,
  AlertCircle,
  BookOpen,
  Award,
  SortAsc,
  SortDesc,
  Grid3X3,
  List,
  History,
  Bookmark,
  ArrowLeft,
  BookA,
  BookAIcon,
} from "lucide-react";
import Link from "next/link";
import { testService } from "@/apiServices/testServices";
import Loading from "../Components/Loader/Loading"; // Import your Loader component
import Footer from "../FooterPage/page";

const TestHistorySavedDashboard = () => {
  const { theme } = useTheme();
  
  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
      headerBackground: isDark ? 'bg-gray-800/80 border-gray-700' : 'bg-white/80 border-gray-200',
      cardBackground: isDark ? 'bg-gray-800/70 border-gray-700' : 'bg-white/70 border-gray-200',
      cardHover: isDark ? 'hover:bg-gray-700/70' : 'hover:bg-white/80',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark 
        ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white/50 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500',
      buttonPrimary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white',
      buttonSecondary: isDark 
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
        : 'border-gray-200 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      statsCard: isDark 
        ? 'bg-gray-800/70 border-gray-700' 
        : 'bg-white/70 border-gray-200',
      statsIconBg: isDark ? 'bg-gray-700' : 'bg-gradient-to-br',
      iconAccent: isDark ? 'text-blue-400' : 'text-sky-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-emerald-600',
      iconHistory: isDark ? 'text-purple-400' : 'text-blue-600',
      gradientText: isDark 
        ? 'text-transparent bg-clip-text bg-gradient-to-r from-gray-100 to-gray-300' 
        : 'text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600',
      tableHeader: isDark ? 'bg-gray-700/50' : 'bg-gray-50/50',
      tableRow: isDark ? 'bg-gray-800/30 hover:bg-gray-700/40' : 'bg-white/30 hover:bg-white/40',
      tableDivider: isDark ? 'divide-gray-700' : 'divide-gray-200',
      statusSaved: isDark 
        ? 'bg-green-900/50 text-green-300 border-green-700' 
        : 'bg-emerald-50 text-emerald-700 border-emerald-200',
      statusHistory: isDark 
        ? 'bg-purple-900/50 text-purple-300 border-purple-700' 
        : 'bg-blue-50 text-blue-700 border-blue-200',
      statusDefault: isDark 
        ? 'bg-gray-700/50 text-gray-300 border-gray-600' 
        : 'bg-gray-50 text-gray-700 border-gray-200',
      dropdownBg: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      selectBg: isDark 
        ? 'bg-gray-700/50 border-gray-600 text-gray-100' 
        : 'bg-white/50 border-gray-200 text-gray-900',
      testIconBg: isDark 
        ? 'bg-gray-700' 
        : 'bg-gradient-to-br from-sky-100 to-indigo-100',
      paginationActive: isDark 
        ? 'bg-blue-600 border-blue-600 text-white' 
        : 'bg-sky-600 border-sky-600 text-white',
      paginationInactive: isDark 
        ? 'bg-gray-700 border-gray-600 text-gray-300 hover:bg-gray-600' 
        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
    };
  };

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
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    // Add logout logic here
    console.log("Logging out...");
    setShowDropdown(false);
  };

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
    const themeClasses = getThemeClasses();
    switch (status) {
      case "saved":
        return themeClasses.statusSaved;
      case "history":
        return themeClasses.statusHistory;
      default:
        return themeClasses.statusDefault;
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
  const themeClasses = getThemeClasses();

  // Use your Loader component when loading
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} font-sans`}>
      {/* Header */}
      <header className={`${themeClasses.headerBackground} backdrop-blur-sm shadow-sm border-b sticky top-0 z-30`}>
        <div className="max-w-7xl mx-auto sm:px-6 ">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              {/* Back Button */}
              <div className="relative group">
                <button
                  onClick={() => window.history.back()}
                  className={`flex items-center justify-center w-10 h-10 rounded-xl ${themeClasses.buttonBack} transition-colors duration-200`}
                  aria-label="Go back"
                >
                  <ArrowLeft className={`h-5 w-5 ${themeClasses.textSecondary} group-hover:${themeClasses.textPrimary}`} />
                </button>

                {/* Tooltip */}
                <div className={`absolute top-full left-1/2 mt-2 transform -translate-x-1/2 mb-2 px-2 py-1 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-900'} text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                  Go back
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${themeClasses.gradientText}`}>
                    Test Dashboard
                  </h1>
                  <p className={`text-sm font-medium ${themeClasses.textMuted}`}>
                    Manage and monitor your assessments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <input
                  type="text"
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`pl-10 pr-4 py-2 border rounded-xl focus:ring-2 w-64 backdrop-blur-sm text-sm font-medium ${themeClasses.inputBase}`}
                />
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${themeClasses.textMuted} h-4 w-4`} />
              </div>

              <div className="">
                <div className="relative inline-block" ref={dropdownRef}>
                  <div
                    className="w-10 h-10 bg-gradient-to-br from-sky-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg cursor-pointer hover:shadow-xl transition-shadow"
                    onClick={() => setShowDropdown(!showDropdown)}
                  >
                    <span className="text-white text-sm font-semibold">A</span>
                  </div>

                  {showDropdown && (
                    <div className={`absolute top-full right-0 mt-2 w-48 ${themeClasses.dropdownBg} rounded-lg shadow-lg border py-1 z-10`}>
                      <div className={`px-4 py-2 text-sm ${themeClasses.textSecondary} border-b ${theme === 'dark' ? 'border-gray-700' : 'border-gray-100'}`}>
                        <div className={themeClasses.textMuted}>user@example.com</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-4 py-4 mb-40">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className={`${themeClasses.statsCard} backdrop-blur-sm shadow-sm border p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
                  Total Tests
                </p>
                <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
                  {stats.totalTests}
                </p>
              </div>
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-sky-100 to-sky-200'} rounded-full flex items-center justify-center`}>
                <FileText className={`h-6 w-6 ${themeClasses.iconAccent}`} />
              </div>
            </div>
          </div>

          <div className={`${themeClasses.statsCard} backdrop-blur-sm shadow-sm border p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
                  Saved Tests
                </p>
                <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
                  {stats.savedTests}
                </p>
              </div>
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-emerald-100 to-emerald-200'} rounded-full flex items-center justify-center`}>
                <Bookmark className={`h-6 w-6 ${themeClasses.iconSuccess}`} />
              </div>
            </div>
          </div>

          <div className={`${themeClasses.statsCard} backdrop-blur-sm shadow-sm border p-4`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-sm font-medium ${themeClasses.textSecondary} mb-1`}>
                  History
                </p>
                <p className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
                  {stats.historyTests}
                </p>
              </div>
              <div className={`w-12 h-12 ${theme === 'dark' ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-blue-200'} rounded-full flex items-center justify-center`}>
                <History className={`h-6 w-6 ${themeClasses.iconHistory}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Action Bar */}
        <div className={`${themeClasses.cardBackground} backdrop-blur-sm shadow-sm border p-4 mb-4`}>
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
            <div className="flex items-center space-x-3">
              <Link href="/TestCreateDashboardPage">
                <button className={`${themeClasses.buttonPrimary} px-6 py-3 rounded-xl flex items-center space-x-2 transition-all shadow-lg hover:shadow-xl font-medium`}>
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
                className={`border rounded-xl px-4 py-2 text-sm font-medium focus:ring-2 focus:ring-sky-500 backdrop-blur-sm ${themeClasses.selectBg}`}
              >
                <option value="">All Status</option>
                <option value="saved">Saved</option>
                <option value="history">History</option>
              </select>

              <div className={`flex items-center space-x-2 border rounded-xl p-1 ${themeClasses.cardBackground}`}>
                <button
                  onClick={() => setViewMode("table")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "table"
                      ? `${theme === 'dark' ? 'bg-blue-600 text-blue-200' : 'bg-sky-100 text-sky-600'}`
                      : `${themeClasses.textMuted} hover:${themeClasses.textSecondary}`
                  }`}
                >
                  <List className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? `${theme === 'dark' ? 'bg-blue-600 text-blue-200' : 'bg-sky-100 text-sky-600'}`
                      : `${themeClasses.textMuted} hover:${themeClasses.textSecondary}`
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
          <div className={`${themeClasses.cardBackground} backdrop-blur-sm shadow-sm border overflow-hidden`}>
            <div className={`px-6 py-4 border-b ${theme === 'dark' ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'}`}>
              <div className="flex items-center justify-between">
                <h2 className={`text-lg font-semibold ${themeClasses.textPrimary}`}>
                  Test Library
                </h2>
                <div className={`flex items-center space-x-2 text-sm font-medium ${themeClasses.textMuted}`}>
                  <span>{tests.length} tests</span>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className={themeClasses.tableHeader}>
                  <tr>
                    <th className="px-6 py-4 text-left">
                      <input
                        type="checkbox"
                        onChange={handleSelectAll}
                        checked={
                          selectedTests.length === filteredTests.length &&
                          filteredTests.length > 0
                        }
                        className={`rounded border-gray-300 ${theme === 'dark' ? 'text-blue-500 focus:ring-blue-500' : 'text-sky-600 focus:ring-sky-500'}`}
                      />
                    </th>
                    <th
                      className={`px-6 py-4 text-left text-xs font-semibold ${themeClasses.textMuted} uppercase tracking-wider cursor-pointer`}
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
                      className={`px-6 py-4 text-left text-xs font-semibold ${themeClasses.textMuted} uppercase tracking-wider cursor-pointer`}
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
                  </tr>
                </thead>
                <tbody className={`${themeClasses.tableRow} divide-y ${themeClasses.tableDivider}`}>
                  {tests.map((test) => {
                    const formattedTest = formatTestData(test);
                    return (
                      <tr
                        key={formattedTest.id}
                        className={`${themeClasses.cardHover} transition-colors`}
                      >
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedTests.includes(formattedTest.id)}
                            onChange={() => handleTestSelect(formattedTest.id)}
                            className={`rounded border-gray-300 ${theme === 'dark' ? 'text-blue-500 focus:ring-blue-500' : 'text-sky-600 focus:ring-sky-500'}`}
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-start space-x-4">
                            <div className={`w-12 h-12 ${themeClasses.testIconBg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                              <BookOpen className={`h-6 w-6 ${themeClasses.iconAccent}`} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className={`text-sm font-medium ${themeClasses.textSecondary} mb-2`}>
                                {formattedTest.subject} •{" "}
                                {formattedTest.standard} • {formattedTest.board}
                              </div>
                              <div className={`flex items-center space-x-4 text-xs font-medium ${themeClasses.textMuted}`}>
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

                        {/* Table View Row (inside tbody) */}
<td className="px-6 py-4">
  <div className="space-y-2">
    <div className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
      Created: {formattedTest.createdAt}
    </div>

    <div className="flex items-center space-x-2">
      <span
        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(formattedTest.status)}`}
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
          <div className="grid grid-cols-3 gap-6">
            {tests.map((test) => (
              <div
              key={test._id}
              className={`${themeClasses.cardBackground} ${themeClasses.cardHover} transition-colors rounded-lg border p-6`}
            >
              <div className="flex items-start space-x-4">
                <input
                  type="checkbox"
                  checked={selectedTests.includes(test._id)}
                  onChange={() => handleTestSelect(test._id)}
                  className="rounded border-gray-300 text-sky-600 focus:ring-sky-500 mt-1"
                />
            
                <div className={`${themeClasses.testIconBg} w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <BookOpen className={`h-6 w-6 ${themeClasses.iconAccent}`} />
                </div>
            
                <div className="flex-1 min-w-0">
                  <div className={`text-sm font-semibold mb-1 line-clamp-2 leading-5 ${themeClasses.textPrimary}`}>
                    {test.name}
                  </div>
                  <div className={`text-sm font-medium mb-2 ${themeClasses.textMuted}`}>
                    {test.subject?.name} • {test.standard?.name} • {test.batch?.name}
                  </div>
                  <div className={`flex items-center space-x-4 text-xs font-medium mb-3 ${themeClasses.textMuted}`}>
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
            
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <div className={`text-sm font-semibold ${themeClasses.textPrimary}`}>
                        Created: {new Date(test.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(test.status)}`}
                        >
                          {getStatusIcon(test.status)}
                          <span className="ml-1.5 capitalize">{test.status}</span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            ))}

            {tests.length === 0 && (
              <div className="col-span-full text-center py-12">
              <FileText className={`h-12 w-12 mx-auto mb-4 ${themeClasses.textMuted}`} />
              <h3 className={`text-lg font-semibold mb-2 ${themeClasses.textPrimary}`}>
                No tests found
              </h3>
              <p className={`text-sm font-medium mb-4 ${themeClasses.textMuted}`}>
                Get started by creating your first test or adjust your filters.
              </p>
              <button className={`${themeClasses.buttonPrimary} px-6 py-2 rounded-xl flex items-center space-x-2 mx-auto transition-all font-medium`}>
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
    <div className={`text-sm font-medium ${themeClasses.textSecondary}`}>
      Showing {tests.length} of {tests.length} tests
    </div>
    <div className="flex items-center space-x-2">
      <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${themeClasses.paginationInactive}`}>
        Previous
      </button>
      <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${themeClasses.paginationActive}`}>
        1
      </button>
      <button className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${themeClasses.paginationInactive}`}>
        Next
      </button>
    </div>
  </div>
)}

      </main>
      <Footer/>
    </div>
  );
};

export default TestHistorySavedDashboard;
