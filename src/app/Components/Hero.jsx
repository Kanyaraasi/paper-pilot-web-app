import React, { useState, useEffect } from 'react';
import AuthForms from '../Components/login/AuthForms';

function Hero({ animated, onGetStarted }) {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const words = [
    "Create question papers in 1 minutes",
    "Save hours of preparation time",
    "Generate professional papers easily",
    "Customize for any curriculum"
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Text typing animation effect
  useEffect(() => {
    if (!mounted) return;

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
  }, [typedText, currentWordIndex, isDeleting, words, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Container with Text Animation */}
        <div className={`w-full lg:w-1/2 text-gray-800 space-y-6 ${
          animated ? 'animate-fadeIn' : 'opacity-0'
        }`}>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Streamline Your Question Paper Creation Process
          </h1>
          
          <div className="h-16 md:h-10 mt-4">
            <h2 className="text-2xl md:text-3xl font-medium text-blue-600">
              <span>{typedText}</span>
              <span className="animate-pulse text-blue-600">|</span>
            </h2>
          </div>
          
          <p className="text-lg text-gray-700 leading-relaxed">
            PaperPilot is your co-pilot in creating question papers—quickly, efficiently, and stress-free. 
            Designed for Indian schools and coaching institutes, PaperPilot helps educators generate 
            professional-quality question papers in just 1 minutes.
          </p>
          
          <div className="pt-4 flex flex-col sm:flex-row gap-4">
            <button 
              onClick={onGetStarted}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-all shadow-lg transform hover:scale-105 duration-300 flex items-center justify-center"
            >
              <span>Get Started</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            <a 
              href="/TermsAndCondition"
              className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors transform hover:scale-105 duration-300 flex items-center justify-center"
            >
              Learn More
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2h.01a1 1 0 000-2H9z" clipRule="evenodd" />
              </svg>
            </a>
          </div>
          
          <div className="pt-6">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-lg">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute h-3 w-3 rounded-full bg-green-400 opacity-75"></span>
                <span className="relative rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              <p className="text-sm text-gray-800">Over 100+ teachers are already using PaperPilot</p>
            </div>
          </div>
        </div>
        
        {/* Right Container with Login/Register Form */}
        <div className={`w-full lg:w-5/12 mt-10 lg:mt-0 ${
          animated ? 'animate-slideInRight' : 'opacity-0'
        }`}>
          <AuthForms />
        </div>
      </div>
    </div>
  );
}

export default Hero;