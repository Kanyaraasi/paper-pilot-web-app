'use client';
import React, { useState } from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import Header from './Header';
import Sidebar from './Sidebar';
import TabNavigation from './TabNavigation';
import Toolbar from './Toolbar';
import QuestionGrid from './QuestionGrid';
import Pagination from './Pagination';
import QuestionForm from './QuestionForm';
import Toast from './Toast';
import SelectedBar from './SelectedBar';

const Dashboard = () => {
  const questionBank = useQuestionBank();
  const [isCreating, setIsCreating] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState(null);
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Handle edit question
  const handleEditQuestion = (question) => {
    setEditingQuestion({
      ...question,
      tagsInput: question.tags ? question.tags.join(', ') : ''
    });
    setIsCreating(true);
  };

  // Get empty question template
  const getEmptyQuestion = () => {
    const baseQuestion = {
      difficulty: 'Medium',
      tags: [],
      tagsInput: '',
      createdAt: new Date(),
      starred: false
    };
    
    switch (questionBank.activeTab) {
      case 'match':
        return {
          ...baseQuestion,
          items: [
            { id: `item-${Date.now()}-1`, left: '', right: '' },
            { id: `item-${Date.now()}-2`, left: '', right: '' }
          ]
        };
      case 'mcq':
        return {
          ...baseQuestion,
          text: '',
          options: ['', '', '', ''],
          answer: ''
        };
      default:
        return {
          ...baseQuestion,
          text: '',
          answer: ''
        };
    }
  };

  // Initialize new question
  const initNewQuestion = () => {
    setEditingQuestion(getEmptyQuestion());
    setIsCreating(true);
  };

  // Save question
  const handleSaveQuestion = async () => {
    // Validate
    if (questionBank.activeTab === 'match') {
      if (!editingQuestion.items || editingQuestion.items.some(item => !item.left || !item.right)) {
        questionBank.showToastMessage("All matching items must have both left and right values", "error");
        return;
      }
    } else if (questionBank.activeTab === 'mcq') {
      if (!editingQuestion.text || !editingQuestion.answer || editingQuestion.options.some(opt => !opt.trim())) {
        questionBank.showToastMessage("Question text, all options, and answer are required", "error");
        return;
      }
    } else if (!editingQuestion.text || !editingQuestion.answer) {
      questionBank.showToastMessage("Question text and answer are required", "error");
      return;
    }
  
    // Process tags
    let tags = [];
    if (editingQuestion.tagsInput) {
      tags = editingQuestion.tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
    }
  
    try {
      const questionData = {
        ...editingQuestion,
        tags,
        // Add required fields for backend
        subjectId: '507f1f77bcf86cd799439011', // Replace with actual subject selection
        chapterId: '507f1f77bcf86cd799439012', // Replace with actual chapter selection
        chapterName: 'Sample Chapter' // Replace with actual chapter name
      };
  
      if (editingQuestion.id && editingQuestion.id.includes('temp-')) {
        // Create new question
        await questionBank.createQuestion(questionData);
      } else if (editingQuestion.id) {
        // Update existing question
        await questionBank.updateQuestion(editingQuestion.id, questionData);
      } else {
        // Create new question
        await questionBank.createQuestion(questionData);
      }
      
      setIsCreating(false);
      setEditingQuestion(null);
    } catch (error) {
      // Error is handled in the context
    }
  };
  

  // Delete question
  const handleDeleteQuestion = async (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      try {
        await questionBank.deleteQuestion(questionId);
      } catch (error) {
        // Error is handled in the context
      }
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-inter">
      {/* Toast notification */}
      {questionBank.toast && (
        <Toast 
          message={questionBank.toast.message} 
          type={questionBank.toast.type} 
          onClose={() => questionBank.setToast(null)} 
        />
      )}

      {/* Header */}
      <Header 
        toggleSidebar={() => questionBank.setShowSidebar(!questionBank.showSidebar)}
        showSidebar={questionBank.showSidebar}
        onAddNew={initNewQuestion}
        selectedCount={Object.values(questionBank.selectedQuestions).reduce(
          (total, selections) => total + selections.length, 0
        )}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {questionBank.showSidebar && (
          <Sidebar />
        )}

        {/* Main Content */}
        <main className="flex-1 overflow-auto">
          {/* Tab Navigation */}
          <TabNavigation />

          {/* Toolbar */}
          <Toolbar 
            showSortDropdown={showSortDropdown}
            setShowSortDropdown={setShowSortDropdown}
          />

          {/* Selected Questions Bar */}
          {questionBank.selectedQuestions[questionBank.activeTab].length > 0 && (
            <SelectedBar 
              selectedCount={questionBank.selectedQuestions[questionBank.activeTab].length}
              onClearSelection={() => questionBank.setSelectedQuestions({
                ...questionBank.selectedQuestions, 
                [questionBank.activeTab]: []
              })}
            />
          )}

          <div className="p-4">
            {/* Questions Grid */}
            <QuestionGrid 
              onEditQuestion={handleEditQuestion}
              onDeleteQuestion={handleDeleteQuestion}
              onAddNew={initNewQuestion}
            />
            
            {/* Pagination */}
            {questionBank.totalPage > 1 && (
  <Pagination />
)}
            {/* {questionBank.filteredQuestions.length > questionBank.questionsPerPage && ( */}
              {/* <Pagination /> */}
            {/* )} */}
          </div>
        </main>
      </div>

      {/* Question Form Modal */}
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
    </div>
  );
};

export default Dashboard;