import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';

function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleContactInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Contact popup */}
      <div 
        className={`
          bg-white rounded-2xl shadow-xl mb-4 w-80 
          transition-all duration-300 ease-in-out transform origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ marginRight: '-16px' }} // Add negative margin to align popup with button
      >
        {/* Header */}
        <div className="bg-blue-500 p-5 text-white relative">
          <button
            onClick={toggleContactInfo}
            className="absolute top-3 right-3 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors duration-200 shadow-md"
            aria-label="Close contact popup"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-2xl font-bold text-center mb-1">Contact Us</h3>
          <p className="text-sm text-center text-blue-100">We will connect within 2-3 hours</p>
        </div>
        
        {/* Contact info */}
        <div className="p-4 space-y-3">
          <a 
            href="mailto:paperpilott@gmail.com" 
            className="flex items-center bg-blue-50 hover:bg-blue-100 p-4 rounded-xl transition-all duration-200"
          >
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <Mail className="h-5 w-5 text-white" />
            </div>
            <span className="text-blue-600 font-medium">paperpilott@gmail.com</span>
          </a>
          
          <a 
            href="tel:9021951461" 
            className="flex items-center bg-blue-50 hover:bg-blue-100 p-4 rounded-xl transition-all duration-200"
          >
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-blue-600 font-medium">9021951461</span>
          </a>
          
          <a 
            href="tel:9370868033" 
            className="flex items-center bg-blue-50 hover:bg-blue-100 p-4 rounded-xl transition-all duration-200"
          >
            <div className="bg-blue-500 rounded-full p-2 mr-4">
              <Phone className="h-5 w-5 text-white" />
            </div>
            <span className="text-blue-600 font-medium">9370868033</span>
          </a>
        </div>
      </div>
      
      {/* Floating button - positioned with right margin */}
      <button
        onClick={toggleContactInfo}
        className="bg-blue-500 text-white rounded-full p-4 shadow-xl hover:bg-blue-600 transition-all duration-300  relative bottom-1 float-right"
        aria-label={isOpen ? "Close contact" : "Contact us"}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
      </button>
    </div>
  );
}

export default FloatingContactButton;