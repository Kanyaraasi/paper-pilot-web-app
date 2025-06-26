'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import HomePageImage from '../../../../public/HomepageImage.png'
import { Pause, Volume2 } from 'lucide-react';

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

  const handleGetStarted = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onGetStarted && typeof onGetStarted === 'function') {
      onGetStarted();
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#FCFEFF] relative overflow-hidden">
      <div className="relative pt-20 md:pt-20 pb-16 px-4 max-w-7xl mx-auto">
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                  <p className="text-sm text-gray-600">State boards supported</p>
                </div>
              </div>
            </div>
            
            {/* Fixed button container */}
            <div className="pt-2 flex flex-col sm:flex-row gap-4 w-full">
              <button 
                onClick={handleGetStarted}
                className="group w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center touch-manipulation"
                type="button"
                role="button"
                tabIndex="0"
              >
                <span>Start Creating Papers</span>
                <svg className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </button>
              
              <Link 
                href="/HowItWorkPage" 
                className="w-full sm:w-auto block"
                role="link"
                tabIndex="0"
              >
                <button 
                  className="w-full px-8 py-4 border-2 border-gray-300 gap-2 hover:border-blue-500 text-gray-700 hover:text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-all transform hover:scale-105 duration-300 flex items-center justify-center touch-manipulation"
                  type="button"
                  role="button"
                  tabIndex="-1"
                >
                  Watch Demo               
                  <Volume2 strokeWidth={0.75} />
                </button>
              </Link>
            </div>
            
          </div>
          
          {/* Right Container - Smooth Animated Image */}
          <div className={`w-full lg:w-6/12 lg:mt-0 ${
            animated ? 'animate-slideInRight' : 'opacity-0'
          }`}>
            <div className="relative rounded-lg animate-floatSmooth w-[100%] md:mt-20">
              <Image
                src={HomePageImage}
                alt="Paper Pilot Study Fest"
                className="w-full h-full object-cover"
                layout="responsive" 
                width={500}
                height={400}
              />
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes floatSmooth {
          0% { 
            transform: translateY(0px) scale(1);
          }
          33% { 
            transform: translateY(-15px) scale(1.02);
          }
          66% { 
            transform: translateY(-8px) scale(1.01);
          }
          100% { 
            transform: translateY(0px) scale(1);
          }
        }
        
        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-floatSmooth {
          animation: floatSmooth 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }
        
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }
        
        /* Enhanced mobile touch targets */
        @media (max-width: 640px) {
          button {
            min-height: 48px;
            min-width: 48px;
          }
        }
      `}</style>
    </div>
  );
}

export default Hero;