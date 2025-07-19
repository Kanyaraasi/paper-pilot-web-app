"use client"
import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import AuthForms from "./AuthForms";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/contexts/ThemeContext";

function Header() {
  const { theme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gray-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      cardHeader: isDark ? 'border-gray-700' : 'border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      subjectCard: isDark ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-gray-200 bg-white hover:bg-gray-50',
      subjectCardSelected: isDark ? 'border-blue-400 bg-blue-900/30 ring-blue-400' : 'border-blue-300 bg-blue-50 ring-blue-200',
      subjectCardHover: isDark ? 'hover:border-gray-500' : 'hover:border-gray-300',
      alertInfo: isDark ? 'bg-blue-900/30 border-blue-700 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-700',
      alertError: isDark ? 'bg-red-900/30 border-red-700 text-red-200' : 'bg-red-50 border-red-200 text-red-600',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-green-600',
      iconError: isDark ? 'text-red-400' : 'text-red-600',
      gradientBg: isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100',
      // Header specific classes
      headerBackground: isDark ? 'bg-gray-900/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md',
      headerShadow: isDark ? 'shadow-gray-900/50' : 'shadow-gray-200/50',
      navLink: isDark ? 'text-gray-300 hover:text-blue-400' : 'text-gray-700 hover:text-blue-600',
      navLinkHover: isDark ? 'bg-gray-800' : 'bg-blue-50',
      mobileMenu: isDark ? 'bg-gray-800/95 backdrop-blur-md border-gray-700' : 'bg-white/95 backdrop-blur-md border-gray-100',
      dropdown: isDark ? 'bg-gray-800/95 backdrop-blur-md border-gray-700' : 'bg-white/95 backdrop-blur-md border-gray-200/50',
      modalBackdrop: isDark ? 'bg-black/70' : 'bg-black/60',
      modalBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-100',
    };
  };

  const themeClasses = getThemeClasses();
  const isDark = theme === 'dark';

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("roleType");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role || "");
    }
  }, []);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAuthModal = () => {
    setIsAuthModalOpen(!isAuthModalOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("roleType");
    setIsLoggedIn(false);
    setUserRole("");
    setShowUserMenu(false);
    window.location.reload();
  };

  const navigateToDashboard = () => {
    if (userRole === "admin") {
      window.location.href = "/TestHistorySavedDashboard";
    } else if (userRole === "teacher") {
      window.location.href = "/TestHistorySavedDashboard";
    }
  };

  return (
    <>
      <nav
        className={` w-full z-50 transition-all duration-500 ${
          isScrolled
            ? `${themeClasses.headerBackground} shadow-lg ${themeClasses.headerShadow} py-2`
            : `${themeClasses.headerBackground} shadow ${themeClasses.headerShadow} py-3`
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center group">
              <a href="/">
              <div className="flex-shrink-0 transform transition-transform duration-300">
                <img
                  src="/logo.jpeg"
                  alt="PaperPilot Logo"
                  className="h-12 w-auto rounded-lg"
                />
              </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1">
              <a
                href="/"
                className={`relative px-4 py-2 ${themeClasses.navLink} font-medium transition-all duration-300 group`}
              >
                <span className="relative z-10">Home</span>
                <div className={`absolute inset-0 ${themeClasses.navLinkHover} rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></div>
              </a>
              <a
                href="/HowItWorkPage"
                className={`relative px-4 py-2 ${themeClasses.navLink} font-medium transition-all duration-300 group`}
              >
                <span className="relative z-10">How It Works</span>
                <div className={`absolute inset-0 ${themeClasses.navLinkHover} rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></div>
              </a>
              <a
                href="#features"
                className={`relative px-4 py-2 ${themeClasses.navLink} font-medium transition-all duration-300 group`}
              >
                <span className="relative z-10">Features</span>
                <div className={`absolute inset-0 ${themeClasses.navLinkHover} rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center`}></div>
              </a>
            </div>

            <div className="hidden md:flex items-center space-x-3">
              {/* Theme Toggle */}
              <ThemeToggle />
              
              {!isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleAuthModal}
                    className={`relative px-6 py-2 ${themeClasses.iconAccent} font-semibold border-2 ${isDark ? 'border-blue-400 hover:bg-blue-400' : 'border-blue-600 hover:bg-blue-600'} rounded-full hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden group`}
                  >
                    <span className="relative z-10 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </span>
                    <div className={`absolute inset-0 ${isDark ? 'bg-blue-400' : 'bg-blue-600'} transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300`}></div>
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center justify-center space-x-3 px-6 py-3 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 text-white rounded-xl hover:from-emerald-600 hover:via-teal-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl shadow-lg backdrop-blur-sm border border-white/20 group"
                  >
                    <User className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                    <span className="font-semibold capitalize tracking-wide">
                      {userRole}
                    </span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${
                        showUserMenu ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserMenu && (
                    <div className={`absolute top-full right-0 mt-2 w-56 ${themeClasses.dropdown} rounded-xl shadow-2xl border overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200`}>
                      <div className="p-2">
                        <div className={`border-t ${themeClasses.cardHeader} pt-2`}>
                          <button
                            onClick={handleLogout}
                            className={`w-full text-left px-4 py-3 ${themeClasses.iconError} hover:bg-gradient-to-r ${isDark ? 'hover:from-red-900/30 hover:to-red-800/30' : 'hover:from-red-50 hover:to-red-100'} transition-all duration-200 flex items-center rounded-lg group font-medium`}
                          >
                            <LogOut className="w-4 h-4 mr-3 transition-transform duration-200 group-hover:translate-x-1" />
                            <span>Sign Out</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              {/* Theme Toggle for Mobile */}
              <ThemeToggle />
              
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 focus:outline-none transition-all duration-300 transform hover:scale-110 shadow-lg"
                aria-expanded={isMenuOpen}
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div
          className={`md:hidden transform transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 -translate-y-full pointer-events-none"
          } absolute top-full left-0 right-0 ${themeClasses.mobileMenu} shadow-lg border-t`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a
              href="#"
              className={`block px-4 py-3 ${themeClasses.navLink} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-lg font-medium transition-all duration-200`}
            >
              Home
            </a>
            <a
              href="/HowItWorkPage"
              className={`block px-4 py-3 ${themeClasses.navLink} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-lg font-medium transition-all duration-200`}
            >
              How It Works
            </a>
            <a
              href="#features"
              className={`block px-4 py-3 ${themeClasses.navLink} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50'} rounded-lg font-medium transition-all duration-200`}
            >
              Features
            </a>

            {/* Mobile Auth Buttons */}
            <div className={`pt-4 border-t ${themeClasses.cardHeader}`}>
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={toggleAuthModal}
                    className={`w-full px-4 py-3 ${themeClasses.iconAccent} font-semibold border-2 ${isDark ? 'border-blue-400 hover:bg-blue-400' : 'border-blue-600 hover:bg-blue-600'} rounded-lg hover:text-white transition-all duration-300 flex items-center justify-center`}
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-center font-medium">
                    Welcome, {userRole}!
                  </div>
                  <button
                    onClick={navigateToDashboard}
                    className={`w-full px-4 py-3 ${themeClasses.textSecondary} ${isDark ? 'hover:bg-gray-700' : 'hover:bg-blue-50 hover:text-blue-600'} rounded-lg transition-all duration-200 flex items-center justify-center`}
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className={`w-full px-4 py-3 ${themeClasses.iconError} ${isDark ? 'hover:bg-red-900/30' : 'hover:bg-red-50'} rounded-lg transition-all duration-200 flex items-center justify-center`}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal Overlay */}
      {isAuthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className={`absolute inset-0 ${themeClasses.modalBackdrop} backdrop-blur-sm transition-opacity duration-300`}
            onClick={toggleAuthModal}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={toggleAuthModal}
              className={`absolute -top-4 -right-4 z-20 p-2 ${themeClasses.cardBackground} rounded-full shadow-lg ${isDark ? 'hover:bg-gray-700' : 'hover:bg-gray-100'} transition-colors duration-200`}
            >
              <X className={`w-6 h-6 ${themeClasses.textSecondary}`} />
            </button>

            {/* Auth Form */}
            <div className={`${themeClasses.modalBackground} rounded-2xl shadow-2xl border overflow-hidden`}>
              <div className="">
                <AuthForms onClose={toggleAuthModal} />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;