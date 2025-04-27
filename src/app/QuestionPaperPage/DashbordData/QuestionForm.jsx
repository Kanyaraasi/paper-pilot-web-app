import React, { useState, useEffect } from 'react';
import { X, PlusCircle, Trash2 } from 'lucide-react';

const QuestionForm = ({ editingQuestion, setEditingQuestion, activeTab, onClose, onSave }) => {
  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (editingQuestion && editingQuestion.tagsInput) {
      const tags = editingQuestion.tagsInput.split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');
      
      setEditingQuestion({
        ...editingQuestion,
        tags: tags
      });
    }
  }, []);

  // Add matching item in edit form
  const addMatchingItem = () => {
    if (!editingQuestion) return;
    
    const newItem = { 
      id: `new-${Date.now()}`, 
      left: '', 
      right: '' 
    };
    
    setEditingQuestion({
      ...editingQuestion,
      items: [...(editingQuestion.items || []), newItem]
    });
  };

  // Remove matching item in edit form
  const removeMatchingItem = (itemId) => {
    if (!editingQuestion || !editingQuestion.items) return;
    
    if (editingQuestion.items.length <= 2) {
      // Show error toast
      return;
    }
    
    setEditingQuestion({
      ...editingQuestion,
      items: editingQuestion.items.filter(item => item.id !== itemId)
    });
  };

  const isFormValid = () => {
    if (activeTab === 'match') {
      return editingQuestion?.items && 
        editingQuestion.items.length >= 2 && 
        !editingQuestion.items.some(item => !item.left || !item.right);
    } else {
      return editingQuestion?.text && editingQuestion?.answer;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scaleIn">
        <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-800">
            {editingQuestion && editingQuestion.id ? 'Edit Question' : 'Add New Question'}
          </h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6">
          {activeTab !== 'match' ? (
            <>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Question Text</label>
                <textarea
                  value={editingQuestion?.text || ''}
                  onChange={(e) => setEditingQuestion({...editingQuestion, text: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  rows={3}
                  placeholder={`Enter your ${activeTab} question here...`}
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Answer</label>
                <textarea
                  value={editingQuestion?.answer || ''}
                  onChange={(e) => setEditingQuestion({...editingQuestion, answer: e.target.value})}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                  rows={2}
                  placeholder="Enter the answer..."
                />
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Matching Items</label>
                  <button
                    onClick={addMatchingItem}
                    className="text-xs text-purple-600 hover:text-purple-800 font-medium transition-colors duration-200"
                  >
                    + Add Item
                  </button>
                </div>
                
                {editingQuestion?.items?.map((item, index) => (
                  <div key={item.id} className="flex gap-2 mb-2 animate-fadeIn">
                    <div className="flex-1">
                      <input
                        value={item.left}
                        onChange={(e) => {
                          const updatedItems = [...editingQuestion.items];
                          updatedItems[index].left = e.target.value;
                          setEditingQuestion({...editingQuestion, items: updatedItems});
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="Left side item"
                      />
                    </div>
                    <div className="flex-1">
                      <input
                        value={item.right}
                        onChange={(e) => {
                          const updatedItems = [...editingQuestion.items];
                          updatedItems[index].right = e.target.value;
                          setEditingQuestion({...editingQuestion, items: updatedItems});
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                        placeholder="Right side item"
                      />
                    </div>
                    <button
                      onClick={() => removeMatchingItem(item.id)}
                      className="text-gray-400 hover:text-red-500 p-2 transition-colors duration-200"
                      disabled={editingQuestion.items.length <= 2}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                {(!editingQuestion?.items || editingQuestion.items.length === 0) && (
                  <div className="text-sm text-gray-500 text-center py-2 border border-dashed border-gray-300 rounded-md">
                    Add at least one matching pair
                  </div>
                )}
              </div>
            </>
          )}
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Difficulty</label>
              <select
                value={editingQuestion?.difficulty || 'Medium'}
                onChange={(e) => setEditingQuestion({...editingQuestion, difficulty: e.target.value})}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
              <div className="relative">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && tagInput.trim()) {
                      e.preventDefault();
                      if (!editingQuestion.tags) {
                        setEditingQuestion({
                          ...editingQuestion, 
                          tags: [tagInput.trim()]
                        });
                      } else if (!editingQuestion.tags.includes(tagInput.trim())) {
                        setEditingQuestion({
                          ...editingQuestion, 
                          tags: [...editingQuestion.tags, tagInput.trim()]
                        });
                      }
                      setTagInput('');
                    }
                  }}
                  placeholder="Add tags and press Enter"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500 transition-colors duration-200"
                />
                {tagInput && (
                  <button
                    onClick={() => {
                      if (tagInput.trim()) {
                        if (!editingQuestion.tags) {
                          setEditingQuestion({
                            ...editingQuestion, 
                            tags: [tagInput.trim()]
                          });
                        } else if (!editingQuestion.tags.includes(tagInput.trim())) {
                          setEditingQuestion({
                            ...editingQuestion, 
                            tags: [...editingQuestion.tags, tagInput.trim()]
                          });
                        }
                        setTagInput('');
                      }
                    }}
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  >
                    <PlusCircle size={16} />
                  </button>
                )}
              </div>
              
              {editingQuestion?.tags && editingQuestion.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {editingQuestion.tags.map(tag => (
                    <span 
                      key={tag}
                      className="inline-flex items-center bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded animate-fadeIn"
                    >
                      {tag}
                      <button
                        onClick={() => {
                          setEditingQuestion({
                            ...editingQuestion,
                            tags: editingQuestion.tags.filter(t => t !== tag)
                          });
                        }}
                        className="ml-1 text-gray-500 hover:text-gray-700 transition-colors duration-200"
                      >
                        <X size={12} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="question-starred"
                checked={editingQuestion?.starred || false}
                onChange={(e) => setEditingQuestion({...editingQuestion, starred: e.target.checked})}
                className="h-4 w-4 text-purple-600 rounded border-gray-300"
              />
              <label htmlFor="question-starred" className="ml-2 text-sm text-gray-700">
                Star this question
              </label>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={onSave}
                disabled={!isFormValid()}
                className={`px-4 py-2 text-sm text-white rounded-md transition-all duration-200 ${
                  isFormValid() ? 'bg-purple-600 hover:bg-purple-700' : 'bg-purple-300 cursor-not-allowed'
                }`}
              >
                {editingQuestion && editingQuestion.id ? 'Update Question' : 'Add Question'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuestionForm;