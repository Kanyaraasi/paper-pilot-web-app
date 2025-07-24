import React, { useState } from "react";
import { useQuestionBank } from "./Context/QuestionBankContext";
// import { useTheme } from "../contexts/ThemeContext";
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
import { Play, FileText } from "lucide-react";

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
      marks: 2,
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
        id: editingQuestion.id || Date.now(),
        marks: editingQuestion.marks || 2,
      };

      // Add question to the current tab
      questionBank.setQuestions((prev) => ({
        ...prev,
        [questionBank.activeTab]: editingQuestion.id
          ? prev[questionBank.activeTab].map((q) =>
              q.id === editingQuestion.id ? questionData : q
            )
          : [...prev[questionBank.activeTab], questionData],
      }));

      questionBank.showToastMessage(
        editingQuestion.id
          ? "Question updated successfully"
          : "Question created successfully"
      );

      setIsCreating(false);
      setEditingQuestion(null);
    } catch (error) {
      questionBank.showToastMessage("Error saving question", "error");
    }
  };

  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm("Are you sure you want to delete this question?")) {
      try {
        questionBank.setQuestions((prev) => ({
          ...prev,
          [questionBank.activeTab]: prev[questionBank.activeTab].filter(
            (q) => q.id !== questionId
          ),
        }));

        // Remove from selected questions if it was selected
        questionBank.setSelectedQuestions((prev) => ({
          ...prev,
          [questionBank.activeTab]: prev[questionBank.activeTab].filter(
            (id) => id !== questionId
          ),
        }));

        questionBank.showToastMessage("Question deleted successfully");
      } catch (error) {
        questionBank.showToastMessage("Error deleting question", "error");
      }
    }
  };

  const handleContinueToQuestionPaper = () => {
    const allSelected = questionBank.getAllSelectedQuestions();
    console.log("Selected questions for paper:", allSelected);

    if (allSelected.length === 0) {
      questionBank.showToastMessage(
        "Please select at least one question to continue",
        "error"
      );
      return;
    }

    // Save selected questions data to session storage
    sessionStorage.setItem(
      "selectedQuestionsData",
      JSON.stringify(allSelected)
    );
    console.log("Saved to session storage:", allSelected);

    // Continue to next step (question paper)
    if (questionBank.onNext) {
      questionBank.onNext({
        selectedQuestions: questionBank.selectedQuestions,
      });
    }
  };

  // Get total selected questions count
  const totalSelectedCount = Object.values(
    questionBank.selectedQuestions
  ).reduce((total, selections) => total + selections.length, 0);

  return (
    <div
      className={`min-h-screen flex flex-col ${themeClasses.pageBackground}`}
    >
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
        selectedCount={totalSelectedCount}
      />

      <div className="flex flex-1 overflow-hidden">
        {questionBank.showSidebar && <Sidebar />}

        <main className={`flex-1 overflow-auto ${themeClasses.pageBackground}`}>
          <TabNavigation />

          <Toolbar
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
          />

          {questionBank.selectedQuestions[questionBank.activeTab].length >
            0 && (
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

            {questionBank.totalPages > 1 && <Pagination />}
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

      {/* Bottom Action Bar */}
      <div
        className={`flex items-center justify-between gap-4 w-full p-4 border-t ${themeClasses.cardBackground}`}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={() => questionBank.onPrevious && questionBank.onPrevious()}
            className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ${themeClasses.buttonSecondary}`}
            aria-label="Go back to test details"
          >
            Back
          </button>

          <div className={`text-sm ${themeClasses.textSecondary}`}>
            {totalSelectedCount > 0 ? (
              <span className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                {totalSelectedCount} question{totalSelectedCount > 1 ? "s" : ""}{" "}
                selected
              </span>
            ) : (
              "No questions selected"
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleContinueToQuestionPaper}
          disabled={totalSelectedCount === 0}
          className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 text-sm font-medium rounded-lg shadow-sm transition-all duration-200 ${
            totalSelectedCount === 0
              ? "bg-gray-400 cursor-not-allowed"
              : themeClasses.buttonPrimary
          }`}
          aria-label="Continue to question paper"
        >
          <span>Continue to Question Paper</span>
          <Play className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
