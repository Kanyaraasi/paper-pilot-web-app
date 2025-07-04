import React, { useState } from 'react';
import { Menu, X, FileText, Search, Bell, User, ChevronDown, ArrowLeft } from 'lucide-react';

export default function PaperPilotHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="text-gray-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-72 h-72 bg-indigo-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      <nav className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Back button and Logo */}
          <div className="flex items-center space-x-4">
            {/* Back button */}
            <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all duration-200 text-gray-700 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm font-medium">Back</span>
            </button>

            {/* Logo and brand */}
            <div className="flex items-center space-x-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-lg blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
                <div className="relative bg-gray-100 rounded-lg p-2 border border-gray-200 group-hover:bg-gray-200 transition duration-300">
                  <FileText className="h-6 w-6 text-gray-800" />
                </div>
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Paper Pilot
                </h1>
                <p className="text-xs text-gray-600 -mt-1">Research Navigation</p>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              How It Works
            </a>
            <a href="#" className="text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-all duration-200">
              Features
            </a>
          </div>

          {/* Search and actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search papers..."
                className="bg-gray-100 border border-gray-300 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent w-64 transition-all duration-200 focus:w-80"
              />
            </div>

            {/* Notifications */}
            <button className="relative p-2 rounded-lg hover:bg-gray-100 transition-all duration-200">
              <Bell className="h-5 w-5 text-gray-700" />
              <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                3
              </span>
            </button>

            {/* Profile dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-white" />
                </div>
                <ChevronDown className="h-4 w-4 text-gray-700" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-100 rounded-lg shadow-xl border border-gray-200 z-50">
                  <div className="py-2">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      Profile
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      Settings
                    </a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      Help
                    </a>
                    <hr className="my-2 border-gray-300" />
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 transition-colors">
                      Sign out
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 bg-white/10 backdrop-blur-md rounded-lg mt-2 border border-white/20">
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors">
                Dashboard
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors">
                Research
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors">
                Library
              </a>
              <a href="#" className="block px-3 py-2 text-white hover:bg-white/10 rounded-md text-sm font-medium transition-colors">
                Analytics
              </a>
              <hr className="my-2 border-white/20" />
              <div className="px-3 py-2">
                <input
                  type="text"
                  placeholder="Search papers..."
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:border-transparent backdrop-blur-sm"
                />
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Subtle gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
    </header>
  );
}