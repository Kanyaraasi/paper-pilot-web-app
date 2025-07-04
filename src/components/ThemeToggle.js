// src/components/ThemeToggle.js
"use client";
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import './ThemeToggle.css';

const ThemeToggle = () => {
  const { theme, font, toggleTheme, changeFont } = useTheme();

  const fontOptions = [
    { value: 'default', label: 'Default' },
    { value: 'inter', label: 'Inter' },
    { value: 'poppins', label: 'Poppins' },
    { value: 'roboto', label: 'Roboto' }
  ];

  return (
    <div className="theme-controls">
      {/* Theme Toggle Button */}
      <button 
        className="theme-toggle-btn"
        onClick={toggleTheme}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
      >
        <span className="theme-icon">
          {theme === 'light' ? '🌙' : '☀️'}
        </span>
        <span className="theme-text">
          {theme === 'light' ? 'Dark' : 'Light'}
        </span>
      </button>

      {/* Font Selector */}
      <div className="font-selector">
        <label htmlFor="font-select" className="font-label">
          Font:
        </label>
        <select 
          id="font-select"
          className="font-select"
          value={font}
          onChange={(e) => changeFont(e.target.value)}
        >
          {fontOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default ThemeToggle;