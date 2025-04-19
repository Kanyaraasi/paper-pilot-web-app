// ImprovedDesignProcessComponent.jsx
'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, PenTool, Layers, MonitorPlay, Award, Lightbulb, Users, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function ImprovedDesignProcessComponent() {
  const router = useRouter();
  const [activeStep, setActiveStep] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (autoplay) {
      intervalRef.current = setInterval(() => {
        setActiveStep((prev) => (prev === 5 ? 0 : prev + 1));
      }, 5000);
    }
    
    return () => clearInterval(intervalRef.current);
  }, [autoplay]);
  
  const handleStepChange = (index) => {
    setActiveStep(index);
    // Temporarily pause autoplay when manually changing steps
    setAutoplay(false);
    clearInterval(intervalRef.current);
    
    // Resume autoplay after 10 seconds
    setTimeout(() => {
      setAutoplay(true);
    }, 10000);
  };
  
  const handleNext = () => {
    setActiveStep((prev) => (prev === 5 ? 0 : prev + 1));
    setAutoplay(false);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      setAutoplay(true);
    }, 10000);
  };
  
  const handlePrev = () => {
    setActiveStep((prev) => (prev === 0 ? 5 : prev - 1));
    setAutoplay(false);
    clearInterval(intervalRef.current);
    
    setTimeout(() => {
      setAutoplay(true);
    }, 10000);
  };
  
  const steps = [
    {
      id: 1,
      title: "Client Meeting",
      icon: <Lightbulb className="w-12 h-12 text-blue-600" />,
      description: "We meet and learn about your business, your purpose in creating visual content and set goals for the project.",
      details: "Our collaborative discovery process ensures we're aligned with your vision from day one, establishing clear objectives and expectations for successful outcomes."
    },
    {
      id: 2,
      title: "Conduct Research",
      icon: <BookOpen className="w-12 h-12 text-blue-600" />,
      description: "We hit the books, scour the internet, interview professionals and research your industry thoroughly. We analyze your competitors to identify opportunities.",
      details: "This comprehensive approach allows us to develop unique design solutions that help you stand out in your market while resonating with your target audience."
    },
    {
      id: 3,
      title: "Sketch Out Ideas",
      icon: <PenTool className="w-12 h-12 text-blue-600" />,
      description: "We create different concepts and sketch out as many ideas as possible, choosing the ones that suit your needs the most.",
      details: "Our creative team explores various artistic directions to develop visual approaches that align perfectly with your brand identity and project objectives."
    },
    {
      id: 4,
      title: "Create Variations of Concepts",
      icon: <Layers className="w-12 h-12 text-blue-600" />,
      description: "We take our concepts and flesh them out, creating variations to suit multiple platforms while maintaining a consistent visual story across all channels.",
      details: "Each design is meticulously crafted with attention to detail, ensuring a cohesive visual narrative that resonates with your audience across all touchpoints."
    },
  ];
  
  const handleBack = () => {
    router.push('/');
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-lg overflow-hidden border border-blue-100">
      <div className="bg-gradient-to-r from-blue-50 to-white py-8 px-6 border-b border-blue-100">
        <h2 className="text-center text-4xl md:text-5xl font-light text-blue-700 tracking-wide">Paper Pilot</h2>
        <p className="text-center text-blue-600 mt-2 font-light">Create question papers in 2 minutes, Here Step by Step Explanation</p>
      </div>
      <button 
        onClick={handleBack}
        className="absolute top-4 left-4 p-2 flex items-center gap-1 bg-blue-100 hover:bg-blue-100 text-blue-700 rounded-md transition-all duration-300 hover:translate-x-[-5px] z-10"
        aria-label="Go back to homepage"
      >
        <ArrowLeft className="w-4 h-4" />
        <span className="font-medium">Back</span>
      </button>

      <div className="p-4 md:p-24">
        {/* Mobile View - Vertical Timeline with improved alignment */}
        <div className="md:hidden">
          <div className="flex justify-between items-center mb-6">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-blue-700" />
            </button>
            
            <div className="text-center">
              <span className="font-medium text-blue-700">Step {activeStep + 1} of {steps.length}</span>
            </div>
            
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-blue-700" />
            </button>
          </div>
          
          {steps.map((step, index) => (
            <div 
              key={step.id} 
              className={`mb-8 transition-all duration-500 ${activeStep === index ? 'opacity-100' : 'hidden'}`}
            >
              <div className="flex items-center justify-center mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-blue-100 ring-2 ring-blue-500 shadow-md">
                  {step.icon}
                </div>
              </div>
              
              <div className="text-center mb-4">
                <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step {step.id}</span>
                <h3 className="font-bold text-[12px] text-gray-800">
                  {step.title}
                </h3>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 mb-3 text-center">{step.description}</p>
                <p className="text-gray-600 italic text-sm p-3 rounded-md bg-white shadow-inner">{step.details}</p>
              </div>
            </div>
          ))}
          
          {/* Mobile Step Navigation */}
          <div className="mt-8 flex justify-center gap-2">
            {steps.map((_, index) => (
              <button
                key={index}
                onClick={() => handleStepChange(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  activeStep === index ? 'bg-blue-500 w-6' : 'bg-gray-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Desktop View - Vertical Timeline */}
        <div className="hidden md:block relative">
          {/* Navigation buttons */}
          <div className="absolute -top-16 right-0 flex gap-2">
            <button 
              onClick={handlePrev}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Previous step"
            >
              <ChevronLeft className="w-5 h-5 text-blue-700" />
            </button>
            <button 
              onClick={handleNext}
              className="p-2 rounded-full bg-blue-100 hover:bg-blue-200 transition-colors"
              aria-label="Next step"
            >
              <ChevronRight className="w-5 h-5 text-blue-700" />
            </button>
          </div>
          
          {/* Vertical dashed line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-blue-200 border-dashed border-blue-300 -translate-x-1/2"></div>
          
          {steps.map((step, index) => (
            <div key={step.id} className={`flex items-start mb-24 transition-all duration-500 ${
              activeStep === index ? 'opacity-100' : 'opacity-50'
            }`}>
              {/* Left side content for even steps */}
              {index % 2 === 0 && (
                <div className="w-1/2 pr-10 text-right">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step {step.id}</span>
                  <h3 className={`text-2xl font-medium mb-2 ${activeStep === index ? 'text-blue-700' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                  {activeStep === index && (
                    <p className="text-gray-600 mt-3 text-sm italic bg-blue-50 p-3 rounded-md shadow-sm">{step.details}</p>
                  )}
                </div>
              )}
              
              {/* Center circle with step number */}
              <div className="flex-shrink-0 flex justify-center items-center relative z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                    activeStep === index ? 'bg-blue-600 scale-110 shadow-lg shadow-blue-200' : 'bg-gray-200 hover:bg-blue-200'
                  } transition-all duration-300`}
                  onClick={() => handleStepChange(index)}
                >
                  <span className={`font-bold text-xl ${activeStep === index ? 'text-white' : 'text-gray-600'}`}>
                    {step.id}
                  </span>
                </div>
              </div>
              
              {/* Right side content for odd steps */}
              {index % 2 === 1 && (
                <div className="w-1/2 pl-16">
                  <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Step {step.id}</span>
                  <h3 className={`text-2xl font-medium mb-2 ${activeStep === index ? 'text-blue-700' : 'text-gray-700'}`}>
                    {step.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{step.description}</p>
                  {activeStep === index && (
                    <p className="text-gray-600 mt-3 text-sm italic bg-blue-50 p-3 rounded-md shadow-sm">{step.details}</p>
                  )}
                </div>
              )}
              
              {/* Right side for even steps - icon display */}
              {index % 2 === 0 && (
                <div className="w-1/2 pl-10 flex">
                  <div className={`p-4 rounded-lg bg-white transition-all duration-300 ${
                    activeStep === index ? 'shadow-lg shadow-blue-100 border border-blue-100 transform -translate-y-1' : 'shadow-md'
                  }`}>
                    <div className="w-20 h-20 flex items-center justify-center">
                      {step.icon}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Left side for odd steps - icon display */}
              {index % 2 === 1 && (
                <div className="w-1/2 pr-16 flex justify-end">
                  <div className={`p-4 rounded-lg bg-white transition-all duration-300 ${
                    activeStep === index ? 'shadow-lg shadow-blue-100 border border-blue-100 transform -translate-y-1' : 'shadow-md'
                  }`}>
                    <div className="w-20 h-20 flex items-center justify-center">
                      {step.icon}
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
                className={`w-3 h-3 rounded-full transition-all ${
                  activeStep === index ? 'bg-blue-500 w-8' : 'bg-gray-300 hover:bg-blue-300'
                }`}
                aria-label={`Go to step ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}