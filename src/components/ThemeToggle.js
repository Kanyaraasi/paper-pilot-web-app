// src/components/ThemeToggle.js
"use client";
import React from 'react';
import './ThemeToggle.css';
import { Sun } from "lucide-react";

const ThemeToggle = () => {
  // Theme is always light - no toggle functionality
  return (
    <div
      className="
        relative p-2 rounded-full transition-all duration-300
        bg-gray-100 text-gray-700 opacity-50 cursor-not-allowed
        shadow-lg
      "
      title="Light theme only - dark theme disabled"
    >
      <div className="relative w-6 h-6">
        <Sun className="
          absolute inset-0 w-6 h-6 transition-all duration-300
          rotate-0 scale-100 opacity-100
        " />
      </div>
    </div>
  );
};

export default ThemeToggle