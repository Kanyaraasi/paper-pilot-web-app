'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, Layers, Lightbulb, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImprovedDesignProcessComponent() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [animating, setAnimating] = useState(false);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        handleNext(true);
      }, 5000);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [autoplay]);
  
  const handleStepChange = (index) => {
    if (animating || index === activeStep) return;
    
    setAnimating(true);
    setActiveStep(index);
    setAutoplay(false);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      setAnimating(false);
      setAutoplay(true);
    }, 7000);
  };
  
  const handleNext = (isAutoplay = false) => {
    if (animating && !isAutoplay) return;
    
    setAnimating(true);
    setActiveStep((prev) => (prev === steps.length - 1 ? 0 : prev + 1));
    
    if (!isAutoplay) {
      setAutoplay(false);
      clearInterval(intervalRef.current);
    }
    
    setTimeout(() => {
      setAnimating(false);
      if (!isAutoplay) setAutoplay(true);
    }, 1000);
  };
  
  const handlePrev = () => {
    if (animating) return;
    
    setAnimating(true);
    setActiveStep((prev) => (prev === 0 ? steps.length - 1 : prev - 1));
    setAutoplay(false);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      setAnimating(false);
      setAutoplay(true);
    }, 1000);
  };
  
  const steps = [
    {
      id: 1,
      title: "Login ",
      icon: <Lightbulb className="w-12 h-12 text-indigo-600" />,
      description: "Login is compulsory to access the system.",
      details: "Each user will receive a unique and secure key ID after successful authentication, ensuring data privacy and security."
    },
    {
      id: 2,
      title: "Fill Proper Details",
      icon: <BookOpen className="w-12 h-12 text-indigo-600" />,
      description: "Enter all details correctly such as selecting the grade, subject, and exam details.",
      details: "Proper and complete information is important to proceed to the next steps without any errors."
    },
    {
      id: 3,
      title: "Filter Details and Select Questions",
      icon: <PenTool className="w-12 h-12 text-indigo-600" />,
      description: "Please select the questions you need. You also have the option to add new questions.",
      details: "Based on the selected class, subject, and exam type, you can filter and choose questions like fill-ups, match the pair, one-sentence answers, answer in brief, etc."
    },
    {
      id: 4,
      title: "Create and Download Question Paper",
      icon: <Layers className="w-12 h-12 text-indigo-600" />,
      description: "After finalizing the questions, you can create your customized question paper.",
      details: "There will be two download options: download only the questions or download the questions with their answers. Printing is also available."
    },
  ];
  
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="w-full bg-gradient-to-br from-white to-indigo-50 shadow-xl rounded-lg overflow-hidden border border-indigo-100">
      <div className="relative bg-gradient-to-r from-indigo-600 to-blue-400 py-6 px-6">
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20"></div>
        <h2 className="text-center text-4xl md:text-5xl font-bold text-white tracking-tight">Paper Pilot</h2>
        <p className="text-center text-indigo-100 text-lg mt-2">Create question papers in 2 minutes, follow these easy steps</p>
        
        <button 
          onClick={handleBack}
          className="absolute top-4 left-4 p-2 flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white rounded-md transition-all duration-300 hover:translate-x-[-3px] backdrop-blur-sm"
          aria-label="Go back to homepage"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-medium">Back</span>
        </button>
      </div>

      <div className="p-4 md:p-16">
        {/* Mobile View */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-4">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-700 shadow-md"
              aria-label="Previous step"
              disabled={animating}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="text-center px-3 py-1 bg-indigo-100 rounded-full">
              <span className="font-medium text-indigo-700">Step {activeStep + 1} of {steps.length}</span>
            </div>
            
            <button 
              onClick={() => handleNext()}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-700 shadow-md"
              aria-label="Next step"
              disabled={animating}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          <div className="relative h-[420px] overflow-hidden">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                className={`absolute inset-0 transition-all duration-500 ease-in-out transform ${
                  activeStep === index 
                    ? 'translate-x-0 opacity-100 z-10' 
                    : activeStep > index 
                      ? '-translate-x-full opacity-0 z-0' 
                      : 'translate-x-full opacity-0 z-0'
                }`}
              >
                <div className="bg-white rounded-xl shadow-lg p-4 border border-indigo-100">
                  <div className="flex items-center justify-center mb-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-indigo-600 text-white shadow-lg shadow-indigo-200">
                      {step.icon}
                    </div>
                  </div>
                  
                  <div className="text-center mb-3">
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-2">Step {step.id}</span>
                    <h3 className="font-bold text-xl text-gray-800">
                      {step.title}
                    </h3>
                  </div>
                  
                  <div className="bg-indigo-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 mb-3">{step.description}</p>
                    <p className="text-gray-600 text-sm p-3 rounded-md bg-white shadow-sm border border-indigo-50">{step.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Mobile Step Navigation */}
          <div className="mt-6 flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeStep === index 
                    ? 'bg-indigo-600 w-8 shadow-md shadow-indigo-200' 
                    : 'bg-gray-300 hover:bg-indigo-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
                disabled={animating}
              />
            ))}
          </div>
        </div>

        {/* Desktop View - Vertical Timeline */}
        <div className="hidden md:block relative">
          {/* Navigation buttons */}
          <div className="absolute -top-12 right-0 flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-700 shadow-md"
              aria-label="Previous step"
              disabled={animating}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={() => handleNext()}
              className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors text-indigo-700 shadow-md"
              aria-label="Next step"
              disabled={animating}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
          
          {/* Vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-300 to-blue-300 -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`flex items-start mb-12 transition-all duration-700 ${
                activeStep === index ? 'opacity-100' : 'opacity-40 hover:opacity-70'
              }`}
            >
              {/* Left side content for even steps */}
              {index % 2 === 0 && (
                <div className="w-1/2 pr-6 text-right">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-1">Step {step.id}</span>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${activeStep === index ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700">{step.description}</p>
                  <div className={`mt-3 transition-all duration-500 overflow-hidden ${activeStep === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 italic bg-indigo-50 p-3 rounded-md shadow-sm border border-indigo-100">{step.details}</p>
                  </div>
                </div>
              )}
              
              {/* Center point */}
              <div className="flex-shrink-0 flex justify-center items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all duration-500 ${
                    activeStep === index 
                      ? 'bg-indigo-600 scale-125 shadow-lg shadow-indigo-200' 
                      : 'bg-gray-200 hover:bg-indigo-200'
                  }`}
                  onClick={() => handleStepChange(index)}
                >
                  <span className={`font-bold text-lg ${activeStep === index ? 'text-white' : 'text-gray-600'}`}>
                    {step.id}
                  </span>
                </div>
              </div>
              
              {/* Right side content for odd steps */}
              {index % 2 === 1 && (
                <div className="w-1/2 pl-6">
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-semibold mb-1">Step {step.id}</span>
                  <h3 className={`text-xl font-bold mb-2 transition-colors duration-500 ${activeStep === index ? 'text-indigo-700' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700">{step.description}</p>
                  <div className={`mt-3 transition-all duration-500 overflow-hidden ${activeStep === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <p className="text-gray-600 italic bg-indigo-50 p-3 rounded-md shadow-sm border border-indigo-100">{step.details}</p>
                  </div>
                </div>
              )}
              
              {/* Right side for even steps - icon display */}
              {index % 2 === 0 && (
                <div className="w-1/2 pl-6 flex">
                  <div className={`p-3 rounded-lg bg-white transition-all duration-500 group ${
                    activeStep === index 
                      ? 'shadow-lg shadow-indigo-100 border border-indigo-100 transform -translate-y-1' 
                      : 'shadow-md hover:-translate-y-1'
                  }`}>
                    <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                      <div className={`transition-transform duration-500 ${activeStep === index ? 'rotate-0 scale-110' : 'rotate-0 scale-100'}`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Left side for odd steps - icon display */}
              {index % 2 === 1 && (
                <div className="w-1/2 pr-6 flex justify-end">
                  <div className={`p-3 rounded-lg bg-white transition-all duration-500 group ${
                    activeStep === index 
                      ? 'shadow-lg shadow-indigo-100 border border-indigo-100 transform -translate-y-1' 
                      : 'shadow-md hover:-translate-y-1'
                  }`}>
                    <div className="w-16 h-16 flex items-center justify-center bg-indigo-50 rounded-full group-hover:bg-indigo-100 transition-colors">
                      <div className={`transition-transform duration-500 ${activeStep === index ? 'rotate-0 scale-110' : 'rotate-0 scale-100'}`}>
                        {step.icon}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* Step Navigation */}
          <div className="mt-6 flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepChange(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${
                  activeStep === index 
                    ? 'bg-indigo-600 w-10 shadow-md shadow-indigo-200' 
                    : 'bg-gray-300 hover:bg-indigo-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
                disabled={animating}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}