'use client'
import React, { useState, useEffect } from 'react';
import Header from '../Header';
import Hero from '../Hero';
import Features from '../Features';

import CallToAction from './CallToAction';
import Footer from '../Footer';
import ContactModal from './ContactModal';
import Toast from '../Toast';

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [animated, setAnimated] = useState(false);

  // Initialize animations after page load
  useEffect(() => {
    setAnimated(true);
  }, []);

  // Toast auto-hide effect
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleGetStarted = () => {
    setToastMessage("Please login to get started!");
    setShowToast(true);
  };
  
  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200">
      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          type="warning" 
          onClose={() => setShowToast(false)} 
        />
      )}


      {/* Navigation */}
      <Header />

      {/* Main Content */}
      <main>
        <Hero 
          animated={animated} 
          onGetStarted={handleGetStarted} 
        />
        <Features animated={animated} />
     
        <CallToAction 
          onGetStarted={handleGetStarted} 
          onContact={toggleContact} 
        />
      </main>

      {/* Contact Form Modal */}
      {isContactOpen && (
        <ContactModal onClose={toggleContact} />
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
                <span className="text-blue-600 font-medium">paperpilott@gmail.com</span>
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

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;

