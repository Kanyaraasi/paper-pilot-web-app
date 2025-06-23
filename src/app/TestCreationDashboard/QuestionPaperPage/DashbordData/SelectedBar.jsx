import React from 'react';
import { X, Trash2 } from 'lucide-react';

const SelectedBar = ({ selectedCount, onClearSelection }) => {
  return (
    <div className="bg-blue-50 border-b border-blue-200 px-4 py-3 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <span className="text-sm font-medium text-blue-900">
          {selectedCount} question{selectedCount !== 1 ? 's' : ''} selected
        </span>
      </div>
      
      <div className="flex items-center space-x-2">
        <button className="flex items-center space-x-2 px-3 py-1.5 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors">
          <Trash2 className="w-4 h-4" />
          <span>Delete Selected</span>
        </button>
        
        <button
          onClick={onClearSelection}
          className="flex items-center space-x-2 px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <X className="w-4 h-4" />
          <span>Clear Selection</span>
        </button>
      </div>
    </div>
  );
};

export default SelectedBar;