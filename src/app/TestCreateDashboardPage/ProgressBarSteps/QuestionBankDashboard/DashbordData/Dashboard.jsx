"use client";
import React, { useState } from "react";
import { useQuestionBank } from "./Context/QuestionBankContext";
import { useTheme } from "@/contexts/ThemeContext";
import Header from "./Header";
import Sidebar from "./Sidebar";
import TabNavigation from "./TabNavigation";
import Toolbar from "./Toolbar";
import QuestionGrid from "./QuestionGrid";
import Pagination from "./Pagination";
import QuestionForm from "./QuestionForm";
import Toast from "./Toast";
import SelectedBar from "./SelectedBar";
import { Play } from "lucide-react";

const Dashboard = () => {
  const questionBank = useQuestionBank();
  const { theme } = useTheme();
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      pageBackground: isDark ? "bg-gray-900" : "bg-gray-50",
      cardBackground: isDark
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200",
      cardHeader: isDark ? "border-gray-700" : "border-gray-200",
      textPrimary: isDark ? "text-gray-100" : "text-gray-900",
      textSecondary: isDark ? "text-gray-300" : "text-gray-600",
      buttonPrimary: isDark
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white",
      buttonSecondary: isDark
        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
        : "border-gray-300 text-gray-700 hover:bg-gray-50",
    };
  };

  const themeClasses = getThemeClasses();

  const handleEditQuestion = (question) => {
    setEditingQuestion({
      ...question,
      tagsInput: question.tags ? question.tags.join(", ") : "",
    });
    setIsCreating(true);
  };

  const getEmptyQuestion = () => {
    const baseQuestion = {
      difficulty: "Medium",
      tags: [],
      tagsInput: "",
      createdAt: new Date(),
      starred: false,
    };

    switch (questionBank.activeTab) {
      case "match":
        return {
          ...baseQuestion,
          items: [
            { id: `item-${Date.now()}-1`, left: "", right: "" },
            { id: `item-${Date.now()}-2`, left: "", right: "" },
          ],
        };
      case "mcq":
        return {
          ...baseQuestion,
          text: "",
          options: ["", "", "", ""],
          answer: "",
        };
      default:
        return {
          ...baseQuestion,
          text: "",
          answer: "",
        };
    }
  };

  const initNewQuestion = () => {
    setEditingQuestion(getEmptyQuestion());
    setIsCreating(true);
  };

  const handleSaveQuestion = async () => {
    if (questionBank.activeTab === "match") {
      if (
        !editingQuestion.items ||
        editingQuestion.items.some((item) => !item.left || !item.right)
      ) {
        questionBank.showToastMessage(
          "All matching items must have both left and right values",
          "error"
        );
        return;
      }
    } else if (questionBank.activeTab === "mcq") {
      if (
        !editingQuestion.text ||
        !editingQuestion.answer ||
        editingQuestion.options.some((opt) => !opt.trim())
      ) {
        questionBank.showToastMessage(
          "Question text, all options, and answer are required",
          "error"
        );
        return;
      }
    } else if (!editingQuestion.text || !editingQuestion.answer) {
      questionBank.showToastMessage(
        "Question text and answer are required",
        "error"
      );
      return;
    }

    let tags = [];
    if (editingQuestion.tagsInput) {
      tags = editingQuestion.tagsInput
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag !== "");
    }

    try {
      const questionData = {
        ...editingQuestion,
        tags,
        subjectId: "507f1f77bcf86cd799439011",
        chapterId: "507f1f77bcf86cd799439012",
        chapterName: "Sample Chapter",
      };

      if (editingQuestion.id && editingQuestion.id.includes("temp-")) {
        await questionBank.createQuestion(questionData);
      } else if (editingQuestion.id) {
        await questionBank.updateQuestion(editingQuestion.id, questionData);
      } else {
        await questionBank.createQuestion(questionData);
      }

      setIsCreating(false);
      setEditingQuestion(null);
    } catch (error) {}
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        await questionBank.deleteQuestion(questionId);
      } catch (error) {}
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses.pageBackground}`}>
      {questionBank.toast && (
        <Toast
          message={questionBank.toast.message}
          type={questionBank.toast.type}
          onClose={() => questionBank.setToast(null)}
        />
      )}

      <Header
        toggleSidebar={() =>
          questionBank.setShowSidebar(!questionBank.showSidebar)
        }
        showSidebar={questionBank.showSidebar}
        onAddNew={initNewQuestion}
        selectedCount={Object.values(questionBank.selectedQuestions).reduce(
          (total, selections) => total + selections.length,
          0
        )}
      />

      <div className="flex flex-1 overflow-hidden">
        {questionBank.showSidebar && <Sidebar />}

        <main className={`flex-1 overflow-auto ${themeClasses.pageBackground}`}>
          <TabNavigation />

          <Toolbar
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
          />

          {questionBank.selectedQuestions[questionBank.activeTab].length > 0 && (
            <SelectedBar
              selectedCount={
                questionBank.selectedQuestions[questionBank.activeTab].length
              }
              onClearSelection={() =>
                questionBank.setSelectedQuestions({
                  ...questionBank.selectedQuestions,
                  [questionBank.activeTab]: [],
                })
              }
            />
          )}

          <div className={`p-4 ${themeClasses.textPrimary}`}>
            <QuestionGrid
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onAddNew={initNewQuestion}
            />

            {questionBank.totalPage > 1 && <Pagination />}
          </div>
        </main>
      </div>

      {isCreating && (
        <QuestionForm
          editingQuestion={editingQuestion}
          setEditingQuestion={setEditingQuestion}
          onClose={() => {
            setIsCreating(false);
            setEditingQuestion(null);
          }}
          onSave={handleSaveQuestion}
        />
      )}

      <div
        className={`flex items-center justify-between gap-4 w-full p-4 border-t ${themeClasses.cardBackground}`}
      >
        <button
          type="button"
          className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ${themeClasses.buttonSecondary}`}
          aria-label="Cancel current action"
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ${themeClasses.buttonPrimary}`}
          aria-label="Continue to question bank"
        >
          <span>Continue to Question Bank</span>
          <Play className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
