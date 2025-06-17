import React, { useState, useEffect } from "react";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import AuthForms from "./AuthForms";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState("");
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Check authentication status
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("roleType");

    if (token) {
      setIsLoggedIn(true);
      setUserRole(role || "");
    }
  }, []);

  // Handle scroll effect for navbar
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
      window.location.href = "/TestDashboard";
    } else if (userRole === "teacher") {
      window.location.href = "/TestDashboard";
    }
  };

  return (
    <>
      <nav
        className={`fixed w-full z-50 transition-all duration-500 shadow ${
          isScrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg py-2"
            : "bg-white/90 backdrop-blur-sm py-3"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center group">
              <div className="flex-shrink-0 transform transition-transform duration-300 ">
                <img
                  src="/logo.jpg"
                  alt="PaperPilot Logo"
                  className="h-12 w-auto rounded-lg "
                />
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 ">
              <a
                href="#"
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">Home</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              </a>
              <a
                href="/HowItWork"
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">How It Works</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              </a>
              <a
                href="#features"
                className="relative px-4 py-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-300 group"
              >
                <span className="relative z-10">Features</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300 origin-center"></div>
              </a>
            </div>

            {/* Authentication Buttons / User Menu */}
            <div className="hidden md:flex items-center space-x-3">
              {!isLoggedIn ? (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={toggleAuthModal}
                    className="relative px-6 py-2 text-blue-600 font-semibold border-2 border-blue-600 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 transform hover:scale-105 overflow-hidden group"
                  >
                    <span className="relative z-10 flex items-center">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </span>
                    <div className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                  </button>
                  <button
                    onClick={toggleAuthModal}
                    className="relative px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="relative flex items-center">
                  {/* User Profile Button */}
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
                    <div className="absolute top-full right-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border border-gray-200/50 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                      <div className="p-2">
                        {/* Profile Section */}
                        <div className="px-4 py-3 border-b border-gray-100">
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-800 capitalize">
                                {userRole}
                              </p>
                              
                            </div>
                          </div>
                        </div>
                        <div className="border-t border-gray-100 pt-2">
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-red-600 hover:bg-gradient-to-r hover:from-red-50 hover:to-red-100 transition-all duration-200 flex items-center rounded-lg group hover:text-red-700 font-medium"
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
            <div className="md:hidden">
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
          } absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg border-t border-gray-100`}
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <a
              href="#"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
            >
              Home
            </a>
            <a
              href="/HowItWork"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="block px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium transition-all duration-200"
            >
              Features
            </a>

            {/* Mobile Auth Buttons */}
            <div className="pt-4 border-t border-gray-200">
              {!isLoggedIn ? (
                <div className="space-y-3">
                  <button
                    onClick={toggleAuthModal}
                    className="w-full px-4 py-3 text-blue-600 font-semibold border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all duration-300 flex items-center justify-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </button>
                  <button
                    onClick={toggleAuthModal}
                    className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300"
                  >
                    Sign Up
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="px-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg text-center font-medium">
                    Welcome, {userRole}!
                  </div>
                  <button
                    onClick={navigateToDashboard}
                    className="w-full px-4 py-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 flex items-center justify-center"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Dashboard
                  </button>
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 flex items-center justify-center"
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
            onClick={toggleAuthModal}
          ></div>

          {/* Modal Content */}
          <div className="relative z-10 w-full max-w-md transform transition-all duration-300 scale-100">
            {/* Close Button */}
            <button
              onClick={toggleAuthModal}
              className="absolute -top-4 -right-4 z-20 p-2 bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>

            {/* Auth Form */}
            <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
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
