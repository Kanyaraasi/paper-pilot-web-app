import React, { useState } from 'react';
import { X, Mail, Phone, MessageSquare } from 'lucide-react';
import { useTheme } from "@/contexts/ThemeContext";

function FloatingContactButton() {
  const { theme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  // Theme classes
  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      popupBackground: isDark ? 'bg-gray-800/95 border-gray-700' : 'bg-white/95 border-gray-200',
      popupShadow: isDark ? 'shadow-2xl shadow-black/30' : 'shadow-xl shadow-gray-400/20',
      headerBackground: isDark 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-500',
      headerText: 'text-white',
      headerSubtext: isDark ? 'text-blue-100' : 'text-blue-100',
      contactItemBg: isDark 
        ? 'bg-gray-700/50 hover:bg-gray-600/50 border-gray-600' 
        : 'bg-blue-50 hover:bg-blue-100 border-blue-100',
      contactItemText: isDark ? 'text-gray-100' : 'text-blue-600',
      iconBg: isDark 
        ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-500',
      iconColor: 'text-white',
      buttonPrimary: isDark 
        ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white' 
        : 'bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white',
      buttonClose: isDark 
        ? 'bg-red-600 hover:bg-red-700 text-white' 
        : 'bg-red-500 hover:bg-red-600 text-white',
      backdrop: isDark ? 'backdrop-blur-sm' : 'backdrop-blur-sm',
    };
  };

  const themeClasses = getThemeClasses();

  const toggleContactInfo = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Contact popup */}
      <div 
        className={`
          ${themeClasses.popupBackground} ${themeClasses.popupShadow} ${themeClasses.backdrop}
          rounded-2xl mb-4 w-80 border
          transition-all duration-300 ease-in-out transform origin-bottom-right
          ${isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}
        `}
        style={{ marginRight: '-16px' }}
      >
        {/* Header */}
        <div className={`${themeClasses.headerBackground} p-5 ${themeClasses.headerText} relative rounded-t-2xl`}>
          <button
            onClick={toggleContactInfo}
            className={`absolute top-3 right-3 ${themeClasses.buttonClose} rounded-full p-1 transition-all duration-200 shadow-md hover:scale-110 active:scale-95`}
            aria-label="Close contact popup"
          >
            <X className="h-5 w-5" />
          </button>
          <h3 className="text-2xl font-bold text-center mb-1">Contact Us</h3>
          <p className={`text-sm text-center ${themeClasses.headerSubtext} font-medium`}>
            We will connect within 2-3 hours
          </p>
        </div>
        
        {/* Contact info */}
        <div className="p-4 space-y-3">
          <a 
            href="mailto:paperpilott@gmail.com" 
            className={`flex items-center ${themeClasses.contactItemBg} p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 border group`}
          >
            <div className={`${themeClasses.iconBg} rounded-full p-2 mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
              <Mail className={`h-5 w-5 ${themeClasses.iconColor}`} />
            </div>
            <span className={`${themeClasses.contactItemText} font-semibold`}>paperpilott@gmail.com</span>
          </a>
          
          <a 
            href="tel:9021951461" 
            className={`flex items-center ${themeClasses.contactItemBg} p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 border group`}
          >
            <div className={`${themeClasses.iconBg} rounded-full p-2 mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
              <Phone className={`h-5 w-5 ${themeClasses.iconColor}`} />
            </div>
            <span className={`${themeClasses.contactItemText} font-semibold`}>9021951461</span>
          </a>
          
          <a 
            href="tel:9370868033" 
            className={`flex items-center ${themeClasses.contactItemBg} p-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-95 border group`}
          >
            <div className={`${themeClasses.iconBg} rounded-full p-2 mr-4 shadow-md group-hover:shadow-lg transition-shadow duration-200`}>
              <Phone className={`h-5 w-5 ${themeClasses.iconColor}`} />
            </div>
            <span className={`${themeClasses.contactItemText} font-semibold`}>9370868033</span>
          </a>
        </div>
      </div>
      
      {/* Floating button */}
      <button
        onClick={toggleContactInfo}
        className={`${themeClasses.buttonPrimary} rounded-full p-4 shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 relative bottom-1 float-right`}
        aria-label={isOpen ? "Close contact" : "Contact us"}
      >
        <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}>
          {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
        </div>
      </button>
    </div>
  );
}

export default FloatingContactButton;