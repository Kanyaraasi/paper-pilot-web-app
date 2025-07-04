"use client"
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Clock,
  Play,
  BookOpen,
  FileText,
  AlertCircle,
  CheckCircle,
  Info,
  X,
  ArrowLeft,
} from "lucide-react";
import { useEffect } from "react";
import { academicYearService } from "@/apiServices/academicYearServices";
import { standardService } from "@/apiServices/standardServices";
import { subjectService } from "@/apiServices/subjectServices";
import { batchService } from "@/apiServices/batchServices";
import { useTheme } from "@/contexts/ThemeContext";

// Toast Component with Theme Support
const Toast = ({ message, type = "error", onClose }) => {
  const { theme } = useTheme();
  
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const getToastClasses = () => {
    const baseClasses = "fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 transition-all";
    
    if (type === "error") {
      return `${baseClasses} ${
        theme === 'dark' 
          ? 'bg-red-950 border border-red-800 text-red-200' 
          : 'bg-red-50 border border-red-200 text-red-800'
      }`;
    } else {
      return `${baseClasses} ${
        theme === 'dark' 
          ? 'bg-green-950 border border-green-800 text-green-200' 
          : 'bg-green-50 border border-green-200 text-green-800'
      }`;
    }
  };

  return (
    <div className={getToastClasses()}>
      <div className={`flex-shrink-0 ${type === "error" ? "text-red-400" : "text-green-400"}`}>
        <AlertCircle className="h-5 w-5" />
      </div>
      <div className="text-sm font-medium">
        {message}
      </div>
      <button
        onClick={onClose}
        className={`flex-shrink-0 ${
          type === "error"
            ? "text-red-400 hover:text-red-300"
            : "text-green-400 hover:text-green-300"
        } transition-colors`}
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};

const TestDetailsPage = ({ onNext, onPrevious, formData, currentStep }) => {
  const { theme } = useTheme();
  const [subjectError, setSubjectError] = useState("");
  const [instituteId, setInstituteId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState({
    academicYears: false,
    batches: false,
    standards: false,
    subjects: false,
  });

  const [apiData, setApiData] = useState({
    academicYears: [],
    batches: [],
    standards: [],
    subjects: [],
  });

  const [errorss, setErrors] = useState({
    api: null,
  });

  // Toast helper functions
  const showToast = (message, type = "error") => {
    setToast({ message, type });
  };

  const hideToast = () => {
    setToast(null);
  };

  useEffect(() => {
    const userInstituteId =
      "68568963dbe533623cf89b30" || localStorage.getItem("instituteId");
    setInstituteId(userInstituteId);
  }, []);

  // React Hook Form setup
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: formData?.name || "",
      duration: formData?.duration || "",
      totalMarks: formData?.totalMarks || "",
      class: formData?.class || "",
      unit: formData?.unit || "",
      academicYear: formData?.academicYear || "",
      batch: formData?.batch || "",
      subjects: formData?.subjects || [
        { id: 1, name: "Physics", selected: false, icon: "⚛️" },
        { id: 2, name: "Chemistry", selected: false, icon: "🧪" },
        { id: 3, name: "Biology", selected: false, icon: "🧬" },
        {
          id: 4,
          name: "Mathematics and Statistics",
          selected: false,
          icon: "📊",
        },
      ],
    },
    mode: "onChange",
  });

  // API functions (keeping existing logic)
  useEffect(() => {
    if (instituteId) {
      fetchInitialData();
    }
  }, [instituteId]);

  const fetchInitialData = async () => {
    if (!instituteId) {
      console.warn("Institute ID not available");
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, academicYears: true, standards: true }));

      const [academicYearsResponse, standardsResponse] = await Promise.all([
        academicYearService.getActiveAcademicYears({ institute: instituteId }),
        standardService.getAllStandards(),
      ]);
      
      setApiData((prev) => ({
        ...prev,
        academicYears: academicYearsResponse.academicYears || [],
        standards: standardsResponse || [],
      }));
    } catch (error) {
      console.error("Error fetching initial data:", error);
      setErrors((prev) => ({ ...prev, api: "Failed to load initial data" }));
    } finally {
      setLoading((prev) => ({
        ...prev,
        academicYears: false,
        standards: false,
      }));
    }
  };

  const fetchBatchesByAcademicYear = async (academicYearId) => {
    if (!academicYearId || !instituteId) {
      setApiData((prev) => ({ ...prev, batches: [] }));
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, batches: true }));
      const response = await batchService.getActiveBatchesByAcademicYear(
        academicYearId,
        {
          institute: instituteId,
        }
      );
      setApiData((prev) => ({ ...prev, batches: response.batches || [] }));
    } catch (error) {
      console.error("Error fetching batches:", error);
      setApiData((prev) => ({ ...prev, batches: [] }));
    } finally {
      setLoading((prev) => ({ ...prev, batches: false }));
    }
  };

  const fetchSubjectsByStandard = async (standardId) => {
    if (!standardId) {
      setApiData((prev) => ({ ...prev, subjects: [] }));
      setValue("subjects", []);
      return;
    }

    try {
      setLoading((prev) => ({ ...prev, subjects: true }));
      const response = await subjectService.getSubjectsByStandard(standardId);

      const transformedSubjects = (response || []).map((subject, index) => ({
        id: subject._id || subject.id || index + 1,
        name: subject.name,
        selected: false,
        icon: getSubjectIcon(subject.name),
      }));

      setApiData((prev) => ({ ...prev, subjects: transformedSubjects }));
      setValue("subjects", transformedSubjects);
    } catch (error) {
      console.error("Error fetching subjects:", error);
      setApiData((prev) => ({ ...prev, subjects: [] }));
      setValue("subjects", []);
    } finally {
      setLoading((prev) => ({ ...prev, subjects: false }));
    }
  };

  const getSubjectIcon = (subjectName) => {
    const iconMap = {
      Physics: "⚛️",
      Chemistry: "🧪",
      Biology: "🧬",
      Mathematics: "📊",
      "Mathematics and Statistics": "📊",
      English: "📚",
      History: "📜",
      Geography: "🌍",
      Economics: "💰",
      "Political Science": "🏛️",
      Sociology: "👥",
      Psychology: "🧠",
      "Computer Science": "💻",
      "Information Technology": "🖥️",
    };
    return iconMap[subjectName] || "📖";
  };

  // Watch for changes
  const watchedAcademicYear = watch("academicYear");
  const watchedClass = watch("class");

  useEffect(() => {
    if (watchedAcademicYear) {
      fetchBatchesByAcademicYear(watchedAcademicYear);
    }
  }, [watchedAcademicYear]);

  useEffect(() => {
    if (watchedClass) {
      fetchSubjectsByStandard(watchedClass);
    }
  }, [watchedClass]);

  const subjects = watch("subjects");

  const handleSubjectToggle = (index) => {
    const updatedSubjects = [...subjects];
    const clickedSubject = updatedSubjects[index];

    if (!clickedSubject.selected) {
      const hasSelectedSubject = updatedSubjects.some(
        (subject) => subject.selected
      );

      if (hasSelectedSubject) {
        showToast(
          "You can only select one subject per test. Please deselect the current subject first.",
          "error"
        );
        return;
      }

      updatedSubjects[index].selected = true;
    } else {
      updatedSubjects[index].selected = false;
    }

    setValue("subjects", updatedSubjects);

    const hasSelectedSubject = updatedSubjects.some(
      (subject) => subject.selected
    );
    if (hasSelectedSubject && subjectError) {
      setSubjectError("");
    }
  };

  const validateSubjects = () => {
    const selectedSubjects = subjects.filter((subject) => subject.selected);

    if (selectedSubjects.length === 0) {
      setSubjectError("Please select one subject");
      return false;
    }

    if (selectedSubjects.length > 1) {
      setSubjectError("Please select only one subject");
      return false;
    }

    setSubjectError("");
    return true;
  };

  const onSubmit = (data) => {
    if (!validateSubjects()) {
      return;
    }
    console.log("Form Data:", data);
    onNext(data);
  };

  const classOptions = apiData.standards.map((standard) => ({
    value: standard._id || standard.id,
    label: standard.name,
    code: standard.code,
    level: standard.level,
    board: standard.board,
    stream: standard.stream,
    medium: standard.medium,
  }));

  const unitOptions = Array.from({ length: 8 }, (_, i) => `Unit ${i + 1}`);
  const academicYearOptions = apiData.academicYears.map((year) => ({
    value: year._id || year.id,
    label: year.year,
    startDate: year.startDate,
    endDate: year.endDate,
  }));

  const batchOptions = apiData.batches.map((batch) => ({
    value: batch._id || batch.id,
    label: batch.name,
  }));

  const selectedSubjects = subjects.filter((subject) => subject.selected);

  // Theme-aware style classes
  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gray-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      cardHeader: isDark ? 'border-gray-700' : 'border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark 
        ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark 
        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
        : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark 
        ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' 
        : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      subjectCard: isDark 
        ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' 
        : 'border-gray-200 bg-white hover:bg-gray-50',
      subjectCardSelected: isDark 
        ? 'border-blue-400 bg-blue-900/30 ring-blue-400' 
        : 'border-blue-300 bg-blue-50 ring-blue-200',
      subjectCardHover: isDark ? 'hover:border-gray-500' : 'hover:border-gray-300',
      alertInfo: isDark 
        ? 'bg-blue-900/30 border-blue-700 text-blue-200' 
        : 'bg-blue-50 border-blue-200 text-blue-700',
      alertError: isDark 
        ? 'bg-red-900/30 border-red-700 text-red-200' 
        : 'bg-red-50 border-red-200 text-red-600',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-green-600',
      iconError: isDark ? 'text-red-400' : 'text-red-600',
      gradientBg: isDark 
        ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' 
        : 'bg-gradient-to-br from-blue-100 to-purple-100',
    };
  };

  const themeClasses = getThemeClasses();

  return (
    <div className={`min-h-screen ${themeClasses.pageBackground} transition-colors`}>
      {/* Toast */}
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={hideToast} />
      )}

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Test Details Form */}
        <div className={`${themeClasses.cardBackground} rounded-lg shadow-sm border transition-colors`}>
          <div className={`px-6 py-4 border-b ${themeClasses.cardHeader} flex gap-4 transition-colors`}>
            <div className="relative group">
              <button
                onClick={() => window.history.back()}
                className={`flex items-center justify-center w-10 h-10 rounded-xl ${themeClasses.buttonBack} transition-colors duration-200`}
                aria-label="Go back"
              >
                <ArrowLeft className="h-5 w-5 group-hover:scale-110 transition-transform" />
              </button>
              
              <div className={`absolute top-full left-1/2 mt-2 transform -translate-x-1/2 mb-2 px-2 py-1 ${
                theme === 'dark' ? 'bg-gray-700 text-gray-200' : 'bg-gray-900 text-white'
              } text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap`}>
                Go back
              </div>
            </div>
            
            <div>
              <h2 className={`text-lg font-semibold ${themeClasses.textPrimary} flex items-center transition-colors`}>
                <FileText className={`h-5 w-5 mr-2 ${themeClasses.iconAccent}`} />
                Test Configuration
              </h2>
              <p className={`text-sm ${themeClasses.textSecondary} mt-1 transition-colors`}>
                Define the basic parameters for your test
              </p>
            </div>
          </div>

          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Test Name */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Test Name *
                </label>
                <input
                  type="text"
                  {...register("name", {
                    required: "Test name is required",
                    minLength: {
                      value: 3,
                      message: "Test name must be at least 3 characters",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${
                    errors.name ? themeClasses.inputError : themeClasses.inputBase
                  }`}
                  placeholder="Enter test name"
                />
                {errors.name && (
                  <p className={`text-xs ${themeClasses.iconError} flex items-center transition-colors`}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Duration */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Duration *
                </label>
                <input
                  type="number"
                  {...register("duration", {
                    required: "Duration is required",
                  })}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${
                    errors.duration ? themeClasses.inputError : themeClasses.inputBase
                  }`}
                  placeholder="e.g. 3 hours"
                />
                {errors.duration && (
                  <p className={`text-xs ${themeClasses.iconError} flex items-center transition-colors`}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.duration.message}
                  </p>
                )}
              </div>

              {/* Total Marks */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Total Marks *
                </label>
                <input
                  type="number"
                  {...register("totalMarks", {
                    required: "Total marks is required",
                    min: {
                      value: 1,
                      message: "Total marks must be at least 1",
                    },
                  })}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${
                    errors.totalMarks ? themeClasses.inputError : themeClasses.inputBase
                  }`}
                  placeholder="e.g. 100"
                />
                {errors.totalMarks && (
                  <p className={`text-xs ${themeClasses.iconError} flex items-center transition-colors`}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.totalMarks.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Class *
                </label>
                <select
                  {...register("class", { required: "Class is required" })}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${
                    errors.class ? themeClasses.inputError : themeClasses.inputBase
                  }`}
                  disabled={loading.standards}
                >
                  <option value="">
                    {loading.standards ? "Loading classes..." : "Select Class"}
                  </option>
                  {classOptions.map((cls) => (
                    <option key={cls.value} value={cls.value}>
                      {cls.label}
                    </option>
                  ))}
                </select>
                {errors.class && (
                  <p className={`text-xs ${themeClasses.iconError} flex items-center transition-colors`}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.class.message}
                  </p>
                )}
              </div>

              {/* Unit */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Unit *
                </label>
                <select
                  {...register("unit", { required: "Unit is required" })}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${
                    errors.unit ? themeClasses.inputError : themeClasses.inputBase
                  }`}
                >
                  <option value="">Select Unit</option>
                  {unitOptions.map((unit) => (
                    <option key={unit} value={unit}>
                      {unit}
                    </option>
                  ))}
                </select>
                {errors.unit && (
                  <p className={`text-xs ${themeClasses.iconError} flex items-center transition-colors`}>
                    <AlertCircle className="h-3 w-3 mr-1" />
                    {errors.unit.message}
                  </p>
                )}
              </div>

              {/* Academic Year */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Academic Year
                </label>
                <select
                  {...register("academicYear")}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${themeClasses.inputBase}`}
                  disabled={loading.academicYears}
                >
                  <option value="">
                    {loading.academicYears ? "Loading..." : "Select Academic Year"}
                  </option>
                  {academicYearOptions.map((year) => (
                    <option key={year.value} value={year.value}>
                      {year.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Batch */}
              <div className="space-y-1">
                <label className={`block text-sm font-semibold ${themeClasses.textMuted} transition-colors`}>
                  Batch
                </label>
                <select
                  {...register("batch")}
                  className={`w-full px-4 py-3 border rounded-md transition-all text-sm ${themeClasses.inputBase}`}
                  disabled={loading.batches || !watchedAcademicYear}
                >
                  <option value="">
                    {loading.batches
                      ? "Loading batches..."
                      : !watchedAcademicYear
                      ? "Select Academic Year first"
                      : "Select Batch"}
                  </option>
                  {batchOptions.map((batch) => (
                    <option key={batch.value} value={batch.value}>
                      {batch.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Subject Selection Section */}
        <div className={`${themeClasses.cardBackground} rounded-lg shadow-sm border transition-colors`}>
          <div className={`px-6 py-4 border-b ${themeClasses.cardHeader} transition-colors`}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className={`text-lg font-semibold ${themeClasses.textPrimary} flex items-center transition-colors`}>
                  <BookOpen className={`h-5 w-5 mr-2 ${themeClasses.iconAccent}`} />
                  Select Subject
                </h2>
                <p className={`text-sm ${themeClasses.textSecondary} mt-1 transition-colors`}>
                  Choose one subject for this <b>Test / Exam</b>
                </p>
              </div>
              {selectedSubjects.length > 0 && (
                <div className={`flex items-center space-x-2 text-sm ${themeClasses.iconSuccess} transition-colors`}>
                  <CheckCircle className="h-4 w-4" />
                  <span>{selectedSubjects.length} subject selected</span>
                </div>
              )}
            </div>
          </div>

          <div className="p-6">
            {/* Subject Selection Error */}
            {subjectError && (
              <div className={`mb-4 p-3 border rounded-lg ${themeClasses.alertError} transition-colors`}>
                <p className="text-sm flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  {subjectError}
                </p>
              </div>
            )}

            {/* Info Notice */}
            <div className={`mb-6 p-4 border rounded-lg ${themeClasses.alertInfo} transition-colors`}>
              <div className="flex items-start space-x-3">
                <Info className="h-5 w-5 mt-0.5" />
                <div>
                  <p className="text-sm font-medium">
                    Single Subject Selection
                  </p>
                  <p className="text-sm mt-1">
                    You can only select one subject per test. This ensures
                    focused assessment and better question management.
                  </p>
                </div>
              </div>
            </div>

            {/* Select Subjects */}
            <div className={`space-y-3 ${subjectError ? 'ring-2 ring-red-200 rounded-lg p-4' : ''}`}>
              {loading.subjects ? (
                <div className="flex items-center justify-center py-8">
                  <div className={`${themeClasses.textMuted} transition-colors`}>Loading subjects...</div>
                </div>
              ) : subjects.length === 0 ? (
                <div className="flex items-center justify-center py-8">
                  <div className={`${themeClasses.textMuted} transition-colors`}>
                    {watchedClass
                      ? "No subjects found for selected class"
                      : "Please select a class to see subjects"}
                  </div>
                </div>
              ) : (
                <div className="w-full flex flex-wrap gap-3">
                  {subjects.map((subject, index) => (
                    <div
                      key={subject.id}
                      className={`flex items-center p-4 w-full sm:w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-0.5rem)] border rounded-lg cursor-pointer transition-all ${
                        subject.selected
                          ? `${themeClasses.subjectCardSelected} ring-2`
                          : `${themeClasses.subjectCard} ${themeClasses.subjectCardHover}`
                      }`}
                      onClick={() => handleSubjectToggle(index)}
                    >
                      <div className="flex items-center space-x-4 w-full">
                        <input
                          type="radio"
                          name="subject"
                          checked={subject.selected}
                          onChange={() => handleSubjectToggle(index)}
                          className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500 transition-colors"
                        />
                        <div className={`w-10 h-10 ${themeClasses.gradientBg} rounded-lg flex items-center justify-center text-lg transition-colors`}>
                          {subject.icon}
                        </div>
                        <div className="flex-1">
                          <p className={`font-medium ${themeClasses.textPrimary} transition-colors`}>
                            {subject.name}
                          </p>
                          <p className={`text-sm ${themeClasses.textSecondary} transition-colors`}>
                            Complete syllabus coverage
                          </p>
                        </div>
                        {subject.selected && (
                          <CheckCircle className={`h-5 w-5 ${themeClasses.iconAccent} transition-colors`} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className={`${themeClasses.cardBackground} rounded-lg shadow-sm border p-6 transition-colors`}>
          <div className="flex justify-between items-center">
            <div className={`flex items-center space-x-2 ${themeClasses.textMuted} transition-colors`}>
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
    </div>
  );
};

export default TestDetailsPage;
