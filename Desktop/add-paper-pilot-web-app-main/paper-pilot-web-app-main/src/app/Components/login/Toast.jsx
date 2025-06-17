import React from 'react';
import { AlertTriangle, CheckCircle, Info, X } from 'lucide-react';

function Toast({ message, type = 'warning', onClose }) {
  // Define toast types and their corresponding styles
  const toastTypes = {
    success: {
      bgColor: 'bg-green-600',
      icon: <CheckCircle className="h-5 w-5" />
    },
    warning: {
      bgColor: 'bg-amber-600',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    error: {
      bgColor: 'bg-red-600',
      icon: <AlertTriangle className="h-5 w-5" />
    },
    info: {
      bgColor: 'bg-blue-600',
      icon: <Info className="h-5 w-5" />
    }
  };

  const { bgColor, icon } = toastTypes[type] || toastTypes.info;

  return (
    <div className={`fixed top-20 right-4 z-50 ${bgColor} text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-slideInRight`}>
      {icon}
      <span>{message}</span>
      <button 
        onClick={onClose}
        className="ml-4 text-white hover:text-gray-200 transition-colors duration-300"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}

export default Toast;