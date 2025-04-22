"use client";
import { useState, useEffect } from "react";
import { Eye, EyeOff, Menu, X, Clock, CheckCircle, RefreshCw, AlertTriangle, MessageCircle, Phone, Mail } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LandingPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidepass, setHidepass] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [animated, setAnimated] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  
  const words = [
    "Create question papers in 15 minutes",
    "Save hours of preparation time",
    "Generate professional papers easily",
    "Customize for any curriculum"
  ];

  // Initialize animations after page load
  useEffect(() => {
    setAnimated(true);
  }, []);

  // Text typing animation effect
  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const deletingDelay = 1500;
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), deletingDelay);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, typingSpeed);
    
    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isDeleting, words]);

  // Toast auto-hide effect
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin123" && password === "admin123") {
      window.location.href = "/GradeSelector";
    } else {
      setError("Invalid username or password!");
    }
  };

  const togglePasswordVisibility = () => {
    setHidepass(!hidepass);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleGetStarted = () => {
    setShowToast(true);
  };
  
  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 to-blue-300 ">
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-20 right-4 z-50 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center space-x-2 animate-slideInRight">
          <AlertTriangle className="h-5 w-5" />
          <span>Before login cannot get started!</span>
          <button 
            onClick={() => setShowToast(false)}
            className="ml-4 text-white hover:text-red-200"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}

      {/* Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and brand */}
            <div className="flex items-center">
              <div className="flex-shrink-0">
               <Image></Image>
              </div>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="#" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Home</a>
                <a href="#" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Features</a>
                <a href="#" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">Pricing</a>
                <a href="/HowItWork" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-300">How It Works</a>
              </div>
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-blue-600 focus:outline-none transition-colors duration-300"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Home</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Features</a>
              <a href="#" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Pricing</a>
              <a href="/HowItWork" className="text-gray-800 hover:text-blue-600 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">How It Works</a>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Container with Text Animation */}
          <div className={`w-full lg:w-1/2 text-gray-800 space-y-6 ${animated ? 'animate-fadeIn' : 'opacity-0'}`}>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Streamline Your Question Paper Creation Process
            </h1>
            
            <div className="h-16 md:h-10 mt-4">
              <h2 className="text-2xl md:text-3xl font-medium text-blue-600">
                <span>{typedText}</span>
                <span className="animate-pulse text-blue-600">|</span>
              </h2>
            </div>
            
            <p className="text-lg text-gray-700">
              PaperPilot is your co-pilot in creating question papers—quickly, efficiently, and stress-free. 
              Designed for Indian schools and coaching institutes, PaperPilot helps educators generate 
              professional-quality question papers in just 15 minutes.
            </p>
            
            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={handleGetStarted}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-lg transform hover:scale-105 duration-300"
              >
                Get Started
              </button>
              <button className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors transform hover:scale-105 duration-300">
               <a href="/HowItWork"> Learn More</a>
              </button>
            </div>
            
            <div className="pt-6">
              <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
                <span className="flex h-3 w-3">
                  <span className="animate-ping absolute h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
                </span>
                <p className="text-sm text-gray-800">Over 100+ teachers are already using PaperPilot</p>
              </div>
            </div>
          </div>
          
          {/* Right Container with Login Form */}
          <div className={`w-full lg:w-5/12 mt-10 lg:mt-0 ${animated ? 'animate-slideInRight' : 'opacity-0'}`}>
            <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md mx-auto border border-gray-100 hover:shadow-2xl transition-shadow duration-300">
              <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
                Log in to PaperPilot
              </h2>
              
              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-shake" role="alert">
                    {error}
                  </div>
                )}
                
                <div className="space-y-2">
                  <label 
                    htmlFor="username" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Username:
                  </label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                  />
                </div>
                
                <div className="space-y-2 relative">
                  <label 
                    htmlFor="password" 
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password:
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={hidepass ? "password" : "text"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full p-3 border border-gray-300 rounded-lg text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
                    >
                      {hidepass ? (
                        <Eye className="h-5 w-5" />
                      ) : (
                        <EyeOff className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium transform hover:scale-105"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-4 text-center text-sm text-gray-600">
                <p>Test: Username and Password are both "admin123"</p>
              </div>
              
              <div className="mt-6 flex items-center justify-center">
                <div className="w-full border-t border-gray-300"></div>
                <div className="px-2 text-gray-500 text-sm">OR</div>
                <div className="w-full border-t border-gray-300"></div>
              </div>
              
              <div className="mt-6">
                <button className="w-full bg-gray-100 text-gray-700 p-3 rounded-lg hover:bg-gray-200 transition-all duration-300 font-medium flex items-center justify-center transform hover:scale-105">
                  <span>Create New Account</span>
                </button>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className={`text-3xl font-bold text-gray-900 mb-8 ${animated ? 'animate-fadeIn' : 'opacity-0'}`}>Why Choose PaperPilot?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-10">
              {/* Save Time Feature */}
              <div className={`p-6 bg-blue-100 rounded-xl transform transition-all duration-500 hover:shadow-2xl hover:cursor-pointer ${animated ? 'animate-slideIn' : 'opacity-0 translate-y-10'}`} 
                   style={{animationDelay: '0.1s'}}>
                <div className="h-12 w-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <Clock className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Save Time</h3>
                <p className="text-gray-600">Create comprehensive question papers in minutes instead of hours</p>
              </div>
              
              {/* High Quality Feature */}
              <div className={`p-6 bg-blue-100 rounded-xl transform transition-all duration-500 hover:shadow-lg hover:cursor-pointer ${animated ? 'animate-slideIn' : 'opacity-0 translate-y-10'}`}
                   style={{animationDelay: '0.3s'}}>
                <div className="h-12 w-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <CheckCircle className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">High Quality</h3>
                <p className="text-gray-600">Professional formatting with balanced question difficulty</p>
              </div>
              
              {/* Customizable Feature */}
              <div className={`p-6 bg-blue-100 rounded-xl transform transition-all duration-500 hover:shadow-lg hover:cursor-pointer ${animated ? 'animate-slideIn' : 'opacity-0 translate-y-10'}`}
                   style={{animationDelay: '0.5s'}}>
                <div className="h-12 w-12 mx-auto bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <RefreshCw className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Customizable</h3>
                <p className="text-gray-600">Tailor question papers to your specific curriculum needs</p>
              </div>
            </div>
            
           
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start">
              <h2 className="text-xl font-bold text-blue-600">PaperPilot</h2>
            </div>
            <div className="mt-4 md:mt-0">
              <p className="text-center md:text-right text-gray-600">
                © 2025 PaperPilot. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Contact Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          onClick={toggleContact}
          className={`p-4 rounded-full shadow-lg transition-all duration-300 ${isContactOpen ? 'bg-red-500 transform rotate-90' : 'bg-blue-600 hover:bg-blue-700'}`}
        >
          {isContactOpen ? (
            <X className="h-6 w-6 text-white" />
          ) : (
            <MessageCircle className="h-6 w-6 text-white" />
          )}
        </button>
      </div>
      
      {/* Contact Info Popup */}
      {isContactOpen && (
        <div className="fixed bottom-20 right-6 z-40 w-80 bg-white rounded-lg shadow-xl border border-gray-200 p-4 animate-slideIn">
          <div className="text-center">
            <h3 className="text-xl font-bold text-blue-600 mb-4">Contact Us</h3>
            <p className="text-gray-600 mb-4">We will connect within 2-3 hours</p>
            
            <div className="flex flex-col space-y-3">
              <a 
                href="mailto:paperpilot@gmail.com" 
                className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Mail className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">paperpilot@gmail.com</span>
              </a>
              
              <a 
                href="tel:+919021951461" 
                className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">9021951461</span>
              </a>
              
              <a 
                href="tel:+919370868033" 
                className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <Phone className="h-5 w-5 text-blue-600" />
                <span className="text-blue-600 font-medium">9370868033</span>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideInRight {
          from { 
            opacity: 0;
            transform: translateX(20px);
          }
          to { 
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
        
        .animate-slideIn {
          animation: slideIn 0.7s ease-out forwards;
        }
        
        .animate-slideInRight {
          animation: slideInRight 0.7s ease-out forwards;
        }
        
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </div>
  );
}