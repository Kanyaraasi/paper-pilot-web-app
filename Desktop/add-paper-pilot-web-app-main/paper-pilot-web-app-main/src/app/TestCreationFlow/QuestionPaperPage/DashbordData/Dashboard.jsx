'use client'
import React, { useState, useEffect } from 'react';
import useQuestionBank from '../hooks/useQuestionBank';
import Header from './Header';
import Sidebar from './Sidebar';
import TabNavigation from './TabNavigation';
import Toolbar from './Toolbar';
import QuestionGrid from './QuestionGrid';
import Pagination from './Pagination';
import QuestionForm from './QuestionForm';
import Toast from './Toast';
import SelectedBar from './SelectedBar';
import { QuestionBankProvider } from './Context/QuestionBankContext'; 
// import Footer from '@/app/Footer/page';

const Dashboard = ({ testData, onQuestionSelection, targetMarks,onBack }) => {
  const questionBank = useQuestionBank();
  
  // UI state
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Update parent component when selections change
  useEffect(() => {
    if (onQuestionSelection) {
      const allSelected = Object.values(questionBank.selectedQuestions).flat();
      const totalMarks = allSelected.reduce((sum, question) => {
        return sum + (parseInt(question.marks) || 1);
      }, 0);
      
      onQuestionSelection(allSelected, totalMarks);
    }
  }, [questionBank.selectedQuestions, onQuestionSelection]);

  // Initialize selections if needed (optional - remove if not required)
  // useEffect(() => {
  //   if (selectedQuestions.length > 0) {
  //     const selectionsByTab = {};
  //     selectedQuestions.forEach(question => {
  //       const tabKey = question.type || 'mcq';
  //       if (!selectionsByTab[tabKey]) {
  //         selectionsByTab[tabKey] = [];
  //       }
  //       selectionsByTab[tabKey].push(question);
  //     });
  //     questionBank.setSelectedQuestions(selectionsByTab);
  //   }
  // }, []);

  // Handle edit question
  const handleEditQuestion = (question) => {
    setEditingQuestion({
      ...question,
      tagsInput: question.tags ? question.tags.join(', ') : ''
    });
    setIsCreating(true);
  };

  // Get empty question template based on active tab
  const getEmptyQuestion = () => {
    const baseQuestion = {
      difficulty: 'Medium',
      tags: [],
      tagsInput: '',
      createdAt: new Date(),
    };
    
    switch (questionBank.activeTab) {
      case 'match':
        return {
          ...baseQuestion,
          items: [
            { id: `new-A`, left: '', right: '' },
            { id: `new-B`, left: '', right: '' }
          ]
        };
      default:
        return {
          ...baseQuestion,
          text: '',
          answer: ''
        };
    }
  };

  // Initialize new question form
  const initNewQuestion = () => {
    setEditingQuestion(getEmptyQuestion());
    setIsCreating(true);
  };

  // Handle adding/updating a question
  const handleSaveQuestion = () => {
    // Validate
    if (questionBank.activeTab === 'match') {
      if (!editingQuestion.items || editingQuestion.items.some(item => !item.left || !item.right)) {
        questionBank.showToastMessage("All matching items must have both left and right values", "error");
        return;
      }
    } else if (!editingQuestion.text || !editingQuestion.answer) {
      questionBank.showToastMessage("Question text and answer are required", "error");
      return;
    }

    // Process tags from input string
    let tags = [];
    if (editingQuestion.tagsInput) {
      tags = editingQuestion.tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    }

    // In production, this would make an API call to MongoDB
    const updatedQuestions = {...questionBank.questions};
    
    if (editingQuestion.id && questionBank.questions[questionBank.activeTab].find(q => q.id === editingQuestion.id)) {
      // Update existing question
      updatedQuestions[questionBank.activeTab] = questionBank.questions[questionBank.activeTab].map(q => 
        q.id === editingQuestion.id ? {...editingQuestion, tags} : q
      );
      questionBank.showToastMessage("Question updated successfully");
    } else {
      // Add new question
      const newId = `${questionBank.activeTab}-${Date.now()}`;
      const questionToAdd = {
        ...editingQuestion,
        id: newId,
        tags,
        createdAt: new Date()
      };
      
      updatedQuestions[questionBank.activeTab] = [questionToAdd, ...questionBank.questions[questionBank.activeTab]];
      questionBank.showToastMessage("Question added successfully");
    }
    
    questionBank.setQuestions(updatedQuestions);
    setIsCreating(false);
  };

  // Prepare question for deletion
  const prepareDeleteQuestion = (id) => {
    setQuestionToDelete(id);
    setShowDeleteModal(true);
  };

  // Toggle the sidebar
  const toggleSidebar = () => {
    questionBank.setShowSidebar(!questionBank.showSidebar);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <QuestionBankProvider>
        {/* Toast notification */}
        {questionBank.toast && (
          <Toast 
            message={questionBank.toast.message} 
            type={questionBank.toast.type} 
            onClose={() => questionBank.setToast(null)} 
          />
        )}

        {/* Header Bar */}
        {/* <Header 
          toggleSidebar={toggleSidebar} 
          showSidebar={questionBank.showSidebar}
          onAddNew={initNewQuestion}
          selectedCount={Object.values(questionBank.selectedQuestions).reduce(
            (total, selections) => total + selections.length, 0
          )}
        /> */}

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          {questionBank.showSidebar && (
            <Sidebar 
              allTags={questionBank.allTags}
              questions={questionBank.questions}
              toggleTagSelection={questionBank.toggleTagSelection}
              selectedTags={questionBank.selectedTags}
              activeTab={questionBank.activeTab}
              setActiveTab={questionBank.setActiveTab}
              tabTitles={questionBank.tabTitles}
              setCurrentPage={questionBank.setCurrentPage}
              onBack={onBack}
            />
          )}

          {/* Main Content */}
          <main className="flex-1 overflow-auto">
            {/* Tab Navigation */}
            <TabNavigation 
              activeTab={questionBank.activeTab}
              setActiveTab={questionBank.setActiveTab}
              tabTitles={questionBank.tabTitles}
              setCurrentPage={questionBank.setCurrentPage}
            />

            {/* Toolbar */}
            <Toolbar 
              searchQuery={questionBank.searchQuery}
              setSearchQuery={questionBank.setSearchQuery}
              showFilters={questionBank.showFilters}
              setShowFilters={questionBank.setShowFilters}
              selectedDifficulty={questionBank.selectedDifficulty}
              selectedTags={questionBank.selectedTags}
              dateRange={questionBank.dateRange}
              showOnlyStarred={questionBank.showOnlyStarred}
              viewMode={questionBank.viewMode}
              setViewMode={questionBank.setViewMode}
              showAnswers={questionBank.showAnswers}
              setShowAnswers={questionBank.setShowAnswers}
              sortBy={questionBank.sortBy}
              setSortBy={questionBank.setSortBy}
              questionsPerPage={questionBank.questionsPerPage}
              setQuestionsPerPage={questionBank.setQuestionsPerPage}
              setSelectedDifficulty={questionBank.setSelectedDifficulty}
              toggleTagSelection={questionBank.toggleTagSelection}
              setDateRange={questionBank.setDateRange}
              setShowOnlyStarred={questionBank.setShowOnlyStarred}
              resetFilters={questionBank.resetFilters}
              allTags={questionBank.allTags}
              showSortDropdown={showSortDropdown}
              setShowSortDropdown={setShowSortDropdown}
            />

            {/* Selected Questions Bar */}
            {questionBank.selectedQuestions[questionBank.activeTab]?.length > 0 && (
              <SelectedBar 
                selectedCount={questionBank.selectedQuestions[questionBank.activeTab].length}
                onClearSelection={() => questionBank.setSelectedQuestions({
                  ...questionBank.selectedQuestions, 
                  [questionBank.activeTab]: []
                })}
                onDelete={() => setShowDeleteModal(true)}
              />
            )}

            <div className="p-2">
              {/* Target Marks Indicator for Test Creation */}
              {/* {targetMarks && (
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-blue-800">
                      Target Marks: <span className="font-semibold">{targetMarks}</span>
                    </div>
                    <div className="text-sm text-blue-800">
                      Selected Marks: <span className="font-semibold">
                        {Object.values(questionBank.selectedQuestions).flat().reduce((sum, q) => sum + (parseInt(q.marks) || 1), 0)}
                      </span>
                    </div>
                  </div>
                </div>
              )} */}
              
              {/* Questions Grid/List */}
              <QuestionGrid 
                questions={questionBank.currentQuestions}
                filteredQuestions={questionBank.filteredQuestions}
                selectedQuestions={questionBank.selectedQuestions[questionBank.activeTab] || []}
                activeTab={questionBank.activeTab}
                searchQuery={questionBank.searchQuery}
                viewMode={questionBank.viewMode}
                showAnswers={questionBank.showAnswers}
                toggleQuestionSelection={questionBank.toggleQuestionSelection}
                handleDeleteQuestion={prepareDeleteQuestion}
                handleEditQuestion={handleEditQuestion} 
                toggleStarred={questionBank.toggleStarred}
                selectAllVisible={questionBank.selectAllVisible}
                resetFilters={questionBank.resetFilters}
                indexOfFirstQuestion={questionBank.indexOfFirstQuestion}
                indexOfLastQuestion={questionBank.indexOfLastQuestion}
                totalFilteredCount={questionBank.filteredQuestions.length}
                initNewQuestion={initNewQuestion}
                setViewMode={questionBank.setViewMode}
              />
              
              {/* Pagination */}
              {questionBank.filteredQuestions.length > questionBank.questionsPerPage && (
                <Pagination 
                  currentPage={questionBank.currentPage}
                  totalPages={questionBank.totalPages}
                  paginate={questionBank.paginate}
                />
              )}
            </div>
          </main>
        </div>

        {/* Create/Edit Question Modal */}
        {isCreating && (
          <QuestionForm 
            editingQuestion={editingQuestion}
            setEditingQuestion={setEditingQuestion}
            activeTab={questionBank.activeTab}
            onClose={() => setIsCreating(false)}
            onSave={handleSaveQuestion}
          />
        )}
      </QuestionBankProvider>
      {/* <Footer/> */}
    </div>
  );
};


export default Dashboard;