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
  const handleSaveQuestion = () => {
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

    const updatedQuestions = { ...questionBank.questions };
    
    if (editingQuestion.id && questionBank.questions[questionBank.activeTab].find(q => q.id === editingQuestion.id)) {
      // Update existing
      updatedQuestions[questionBank.activeTab] = questionBank.questions[questionBank.activeTab].map(q => 
        q.id === editingQuestion.id ? { ...editingQuestion, tags } : q
      );
      questionBank.showToastMessage("Question updated successfully");
    } else {
      // Add new
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
    setEditingQuestion(null);
  };

  // Delete question
  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Are you sure you want to delete this question?')) {
      const updatedQuestions = { ...questionBank.questions };
      updatedQuestions[questionBank.activeTab] = questionBank.questions[questionBank.activeTab]
        .filter(q => q.id !== questionId);
      
      questionBank.setQuestions(updatedQuestions);
      questionBank.showToastMessage("Question deleted successfully");
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
            {questionBank.filteredQuestions.length > questionBank.questionsPerPage && (
              <Pagination />
            )}
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