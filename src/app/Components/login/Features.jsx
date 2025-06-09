import React from 'react';
import { Clock, CheckCircle, RefreshCw } from 'lucide-react';

function Features({ animated }) {
  const features = [
    {
      icon: <Clock className="h-7 w-7" />,
      title: "Save Time",
      description: "Create comprehensive question papers in minutes instead of hours. Focus more on teaching, less on paperwork.",
      delay: "0.1s"
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      title: "High Quality",
      description: "Generate professionally formatted question papers with properly balanced difficulty levels and comprehensive coverage.",
      delay: "0.3s"
    },
    {
      icon: <RefreshCw className="h-7 w-7" />,
      title: "Fully Customizable",
      description: "Tailor question papers to your specific curriculum, difficulty level, and format requirements with ease.",
      delay: "0.5s"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>,
      title: "Smart Generation",
      description: "AI-powered question generation ensures balanced coverage of topics and appropriate difficulty levels.",
      delay: "0.7s"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>,
      title: "Professional Format",
      description: "Generate beautifully formatted question papers with proper layout, numbering, and marking schemes.",
      delay: "0.9s"
    },
    {
      icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>,
      title: "Multiple Subjects",
      description: "Support for all major subjects and educational boards in India, from primary to senior secondary levels.",
      delay: "1.1s"
    }
  ];

  return (
    <div id="features" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className={`text-3xl sm:text-4xl font-bold text-gray-900 mb-4 ${animated ? 'animate-fadeIn' : 'opacity-0'}`}>
            Why Choose PaperPilot?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-16">
            Our platform is designed to make question paper creation effortless and professional
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {features.map((feature, index) => (
              <div 
                key={index}
                className={`p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl transform transition-all duration-500 
                  hover:shadow-2xl hover:-translate-y-2 ${animated ? 'animate-slideIn' : 'opacity-0 translate-y-10'}`} 
                style={{animationDelay: feature.delay}}
              >
                <div className="h-14 w-14 mx-auto bg-blue-600 text-white rounded-full flex items-center justify-center mb-6 shadow-md">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Features;