import React from 'react';
import { AlertTriangle } from 'lucide-react';

const DeleteConfirmation = ({ onCancel, onConfirm, selectedCount }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md animate-scaleIn">
        <div className="px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Delete Confirmation</h2>
        </div>
        
        <div className="p-6">
          <div className="mb-4">
            <AlertTriangle size={32} className="text-yellow-500 mx-auto mb-3" />
            <p className="text-center text-gray-700">
              {selectedCount > 1 ? 
                `Are you sure you want to delete ${selectedCount} selected questions?` : 
                `Are you sure you want to delete this question?`}
            </p>
            <p className="text-center text-sm text-gray-500 mt-2">This action cannot be undone.</p>
          </div>
          
          <div className="flex justify-center gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;