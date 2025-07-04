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
  const [theme, setTheme] = useState('light');
  const [font, setFont] = useState('poppins');

  // Load theme and font from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme') || 'light';
      const savedFont = localStorage.getItem('font') || 'default';
      setTheme(savedTheme);
      setFont(savedFont);
    }
  }, []);

  // Apply theme and font to document root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.setAttribute('data-font', font);
    if (typeof window !== 'undefined') {
      localStorage.setItem('theme', theme);
      localStorage.setItem('font', font);
    }
  }, [theme, font]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const changeFont = (newFont) => {
    setFont(newFont);
  };

  const value = {
    theme,
    font,
    toggleTheme,
    changeFont,
    setTheme,
    setFont
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};