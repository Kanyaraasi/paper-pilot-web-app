import React, { useState } from 'react';
import { useQuestionBank } from './Context/QuestionBankContext';
import { X, Plus, Trash2 } from 'lucide-react';

const QuestionForm = ({ editingQuestion, setEditingQuestion, onClose, onSave }) => {
  const { activeTab, tabTitles } = useQuestionBank();
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    if (!tagInput.trim()) return;
    
    const newTag = tagInput.trim();
    const currentTags = editingQuestion.tags || [];
    
    if (!currentTags.includes(newTag)) {
      setEditingQuestion({
        ...editingQuestion,
        tags: [...currentTags, newTag]
      });
    }
    setTagInput('');
  };

  const removeTag = (tagToRemove) => {
    setEditingQuestion({
      ...editingQuestion,
      tags: editingQuestion.tags.filter(tag => tag !== tagToRemove)
    });
  };

  const addMatchItem = () => {
    const newItem = {
      id: `item-${Date.now()}`,
      left: '',
      right: ''
    };
    setEditingQuestion({
      ...editingQuestion,
      items: [...(editingQuestion.items || []), newItem]
    });
  };

  const removeMatchItem = (itemId) => {
    setEditingQuestion({
      ...editingQuestion,
      items: editingQuestion.items.filter(item => item.id !== itemId)
    });
  };

  const updateMatchItem = (itemId, field, value) => {
    setEditingQuestion({
      ...editingQuestion,
      items: editingQuestion.items.map(item =>
        item.id === itemId ? { ...item, [field]: value } : item
      )
    });
  };

  const addMCQOption = () => {
    setEditingQuestion({
      ...editingQuestion,
      options: [...(editingQuestion.options || []), '']
    });
  };

  const removeMCQOption = (index) => {
    setEditingQuestion({
      ...editingQuestion,
      options: editingQuestion.options.filter((_, i) => i !== index)
    });
  };

  const updateMCQOption = (index, value) => {
    setEditingQuestion({
      ...editingQuestion,
      options: editingQuestion.options.map((option, i) => i === index ? value : option)
    });
  };

  const renderQuestionFields = () => {
    switch (activeTab) {
      case 'match':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Matching Items
              </label>
              <div className="space-y-2">
                {editingQuestion.items?.map((item, index) => (
                  <div key={item.id} className="flex space-x-2">
                    <input
                      type="text"
                      placeholder="Left item"
                      value={item.left}
                      onChange={(e) => updateMatchItem(item.id, 'left', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      placeholder="Right item"
                      value={item.right}
                      onChange={(e) => updateMatchItem(item.id, 'right', e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => removeMatchItem(item.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMatchItem}
                className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Item</span>
              </button>
            </div>
          </div>
        );

      case 'mcq':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                value={editingQuestion.text || ''}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Options
              </label>
              <div className="space-y-2">
                {editingQuestion.options?.map((option, index) => (
                  <div key={index} className="flex space-x-2">
                    <span className="flex items-center justify-center w-8 h-10 text-sm font-medium text-gray-500">
                      {String.fromCharCode(65 + index)}.
                    </span>
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateMCQOption(index, e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder={`Option ${String.fromCharCode(65 + index)}`}
                    />
                    {editingQuestion.options.length > 2 && (
                      <button
                        type="button"
                        onClick={() => removeMCQOption(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={addMCQOption}
                className="mt-2 flex items-center space-x-2 text-blue-600 hover:text-blue-700"
              >
                <Plus className="w-4 h-4" />
                <span>Add Option</span>
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Answer
              </label>
              <select
                value={editingQuestion.answer || ''}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select correct answer</option>
                {editingQuestion.options?.map((option, index) => (
                  <option key={index} value={option}>
                    {String.fromCharCode(65 + index)}. {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Text
              </label>
              <textarea
                value={editingQuestion.text || ''}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, text: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
                placeholder="Enter your question..."
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Answer
              </label>
              <textarea
                value={editingQuestion.answer || ''}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, answer: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={2}
                placeholder="Enter the answer..."
              />
            </div>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            {editingQuestion.id ? 'Edit Question' : `Add ${tabTitles[activeTab]} Question`}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {renderQuestionFields()}

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <select
                value={editingQuestion.difficulty || 'Medium'}
                onChange={(e) => setEditingQuestion({ ...editingQuestion, difficulty: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add tag"
                />
                <button
                  type="button"
                  onClick={addTag}
                  className="px-3 py-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              {editingQuestion.tags && editingQuestion.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {editingQuestion.tags.map(tag => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="starred"
              checked={editingQuestion.starred || false}
              onChange={(e) => setEditingQuestion({ ...editingQuestion, starred: e.target.checked })}
              className="h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
            />
            <label htmlFor="starred" className="ml-2 text-sm text-gray-700">
              Star this question
            </label>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {editingQuestion.id ? 'Update Question' : 'Add Question'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;