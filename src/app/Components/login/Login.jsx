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
      )}

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default HomePage;