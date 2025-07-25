// src/contexts/ThemeContext.js
"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  // const [theme, setTheme] = useState('light'); // Removed - always light
  const [font, setFont] = useState('poppins');

  // Load font from localStorage on component mount (theme is always light)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Always use light theme
      const savedFont = localStorage.getItem('font') || 'default';
      setFont(savedFont);
    }
  }, []);

  // Apply theme and font to document root
  useEffect(() => {
    // Always set light theme
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.setAttribute('data-font', font);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', 'light');
      localStorage.setItem('font', font);
    }
  }, [font]);

  // Disabled theme toggle - always stays light
  const toggleTheme = () => {
    // Theme toggle disabled - always stays light
    console.log('Theme toggle disabled - using light theme only');
  };

  const changeFont = (newFont) => {
    setFont(newFont);
  };

  const value = {
    theme: 'light', // Always light
    font,
    toggleTheme,
    changeFont,
    setTheme: () => {}, // Disabled
    setFont
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};