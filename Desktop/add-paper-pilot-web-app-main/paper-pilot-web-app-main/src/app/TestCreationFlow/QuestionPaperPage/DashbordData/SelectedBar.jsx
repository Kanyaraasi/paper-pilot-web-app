import React from 'react';
import { Trash2 } from 'lucide-react';

const SelectedBar = ({ selectedCount, onClearSelection, onDelete }) => {
  return (
    <div className="bg-purple-50 border-b border-purple-100 p-3 flex items-center justify-between animate-fadeIn">
      <div className="flex items-center gap-2 justify-around">
        <span className="text-sm font-medium text-purple-700">
          {selectedCount} questions selected
        </span>
        
      </div>
      <button 
      onClick={onClearSelection}
      className="flex items-center justify-center px-4 py-2 text-sm font-medium text-red-500 bg-white hover:bg-red-50 rounded-md border border-red-300 shadow-sm transition-all duration-200 ease-in-out hover:shadow focus:outline-none focus:ring-2 focus:ring-red-300 focus:ring-opacity-50"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-4 w-4 mr-1" 
        viewBox="0 0 20 20" 
        fill="currentColor"
      >
        <path 
          fillRule="evenodd" 
          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" 
          clipRule="evenodd" 
        />
      </svg>
      Clear Selection
    </button>
      
     
    </div>
  );
};

export default SelectedBar;