import React from 'react';
import { Check, X } from 'lucide-react';

const Toast = ({ message, type, onClose }) => {
  return (
    <div 
      className={`fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg flex items-center gap-2 animate-slideIn ${
        type === 'error' ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
      }`}
    >
      {type === 'error' ? <X size={16} /> : <Check size={16} />}
      <span className="text-sm">{message}</span>
      <button 
        onClick={onClose}
        className="ml-2 text-white opacity-70 hover:opacity-100 transition-opacity duration-200"
      >
        <X size={14} />
      </button>
    </div>
  );
};

export default Toast;