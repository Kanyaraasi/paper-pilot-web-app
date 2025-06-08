import React, { useState, useEffect } from 'react';
import Link from 'next/link';

function Hero({ animated, onGetStarted }) {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);
  
  const words = [
    "Create question papers in 1 minute",
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-pink-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-2000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-blue-400 rotate-45 animate-bounce opacity-60"></div>
        <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-purple-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-pink-400 rotate-45 animate-pulse opacity-50"></div>
      </div>

      <div className="relative pt-20 pb-16 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Left Container - Enhanced Text Content */}
          <div className={`w-full lg:w-7/12 text-gray-800 space-y-8 ${
            animated ? 'animate-fadeIn' : 'opacity-0'
          }`}>
            <div className="space-y-2">
              <div className="inline-flex items-center mt-8 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200">
                <span className="flex h-2 w-2 relative mr-3">
                  <span className="animate-ping absolute h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-800">✨ PaperPilot Generation</span>
              </div>
              
              <h1 className="text-2xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                Streamline Your Question Paper Creation
              </h1>
            </div>
            
            <div className="h-10 md:h-10 mt-1">
              <h2 className="text-2xl md:text-3xl font-semibold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                <span>{typedText}</span>
                <span className="animate-pulse text-blue-600">|</span>
              </h2>
            </div>
            
            <p className="text-xl text-gray-700 leading-relaxed max-w-2xl">
              PaperPilot is your intelligent co-pilot for creating professional question papers. 
              Designed specifically for Indian schools and coaching institutes, our AI-powered platform 
              helps educators generate high-quality papers in just minutes, not hours.
            </p>
            
            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Lightning Fast</h3>
                  <p className="text-sm text-gray-600">Generate papers in under 60 seconds</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17H4a2 2 0 01-2-2V9a2 2 0 012-2h5.663M9.663 17L12 14.337M9.663 17L12 19.663M12 14.337V4a2 2 0 012-2h4a2 2 0 012 2v10.337M12 14.337L14.337 12M12 14.337L9.663 12" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Curriculum Aligned</h3>
                  <p className="text-sm text-gray-600"> State boards supported</p>
                </div>
              </div>
            </div>
            
            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <button 
                onClick={onGetStarted}
                className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center"
              >
                <span>Start Creating Papers</span>
                <svg className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              <Link href="/HowItWork" className="flex items-center justify-center">
              <button className="px-8 py-4 border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 duration-300 flex items-center justify-center">
                Watch Demo                <svg className="h-5 w-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1.586a1 1 0 01.707.293l2.414 2.414a1 1 0 00.707.293H15" />
                </svg>
              </button>
              </Link>
            </div>
            
            <div className="pt-8">
              <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-xl border border-green-200">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full border-2 border-white"></div>
                  <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-green-500 rounded-full border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                    500+
                  </div>
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">Trusted by 500+ educators</p>
                  <p className="text-xs text-gray-600">Join thousands of satisfied teachers</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Container - Product Demo */}
          <div className={`w-full lg:w-5/12 mt-10 lg:mt-0 ${
            animated ? 'animate-slideInRight' : 'opacity-0'
          }`}>
            <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-gray-100 p-8 space-y-6">
              <div className="text-center space-y-3">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mx-auto flex items-center justify-center">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Get Started in 3 Steps</h3>
                <p className="text-gray-600">Simple process, powerful results</p>
              </div>
              
              <div className="space-y-5">
                {[
                  {
                    step: "1",
                    title: "Select Your Requirements",
                    description: "Choose subject, class, chapter, and difficulty level",
                    color: "from-blue-500 to-blue-600"
                  },
                 
                  {
                    step: "2",
                    title: "saved & Download",
                    description: "Make final edits and export as professional PDF",
                    color: "from-green-500 to-green-600"
                  }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-4 p-5 bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 group">
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white font-bold text-lg group-hover:scale-110 transition-transform`}>
                      {item.step}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="pt-2">
                <div className="bg-gradient-to-r from-amber-100 to-orange-100 rounded-xl border border-amber-200 p-2">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="font-semibold text-gray-900">Quick Start Offer</h4>
                  </div>
                  <p className="text-sm text-gray-700 mb-2">🎯 <strong>First 2 Months absolutely free</strong></p>
                  <p className="text-xs text-gray-600">No setup fees • Instant access • Full features included</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Hero