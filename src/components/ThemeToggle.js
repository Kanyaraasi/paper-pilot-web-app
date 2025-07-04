// src/components/ThemeToggle.js
"use client";
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';
import { Sun, Moon } from "lucide-react";

const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`
        relative p-2 rounded-full transition-all duration-300 transform hover:scale-110
        ${theme === 'light' 
          ? 'bg-gray-100 text-gray-700 hover:bg-gray-200' 
          : 'bg-gray-700 text-yellow-300 hover:bg-gray-600'
        }
        shadow-lg hover:shadow-xl
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      <div className="relative w-6 h-6">
        <Sun className={`
          absolute inset-0 w-6 h-6 transition-all duration-300
          ${theme === 'light' 
            ? 'rotate-0 scale-100 opacity-100' 
            : 'rotate-90 scale-0 opacity-0'
          }
        `} />
        <Moon className={`
          absolute inset-0 w-6 h-6 transition-all duration-300
          ${theme === 'dark' 
            ? 'rotate-0 scale-100 opacity-100' 
            : '-rotate-90 scale-0 opacity-0'
          }
        `} />
      </div>
    </button>
  );
};

export default ThemeToggle