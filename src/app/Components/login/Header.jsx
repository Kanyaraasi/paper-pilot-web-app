import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled ? 'bg-[#F9F9F9] shadow-md py-2' : 'bg-[#F9F9F9] py-2'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img 
                src="/logo.jpg" 
                alt="PaperPilot Logo" 
                className="h-16 w-auto rounded-md"
              />
            </div>

          </div>
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-4">
              <a href="#" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-[16px] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-blue-600">Home</a>
              <a href="/HowItWork" className="text-gray-800 hover:text-blue-600 px-3 py-2 rounded-md text-[16px] font-medium transition-colors duration-300 border-b-2 border-transparent hover:border-blue-600">How It Works ?</a>
                </div>
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full bg-blue-50 hover:bg-blue-100 text-gray-800 hover:text-blue-600 focus:outline-none transition-colors duration-300"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden transform transition-all duration-300 ease-in-out ${
        isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
      } absolute top-full left-0 right-0 bg-white shadow-lg border-t`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Home</a>
          <a href="/HowItWork" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">How It Works</a>
          <a href="#features" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Features</a>
          {/* <a href="#testimonials" className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 block px-3 py-2 rounded-md text-base font-medium transition-colors duration-300">Testimonials</a> */}
        </div>
      </div>
    </nav>
  );
}

export default Header;