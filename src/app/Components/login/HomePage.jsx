'use client'
import React, { useState, useEffect } from 'react';
import Header from './Header';
import Hero from './Hero';
import Features from './Features';
import CallToAction from './CallToAction';
import Footer from '@/app/Footer/page';
import ContactModal from './ContactModal';
import Toast from './Toast';
import { usePathname } from 'next/navigation';

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [animated, setAnimated] = useState(false);
  const [error, setError] = useState('');
  const pathname = usePathname();
  // const [animated, setAnimated] = useState(false);

  // Initialize animations and check user role after page load
  useEffect(() => {
    setAnimated(true);
    const roleType = localStorage.getItem('roleType');

    const landing = sessionStorage.getItem('landing'); // flag to prevent redirect

    // if (!landing && pathname === '/') {
    //   sessionStorage.setItem('landing', 'true');

    //   if (roleType === "admin") {
    //     window.location.href = "/CreateUser";
    //   } else if (roleType === "teacher") {
    //     window.location.href = "/GradeSelector";
    //   }
    // }
  }, [pathname]);

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
    const roleType = localStorage.getItem('roleType');
    if(!roleType) {
      setToastMessage("Please login to get started!");
    setShowToast(true);
    return
    }
    if (roleType === "admin") {
        window.location.href = "/CreateUser";
      } else if (roleType === "teacher") {
        window.location.href = "/GradeSelector";
      }
    // Show toast message for all users who click the button
    // setToastMessage("Please login to get started!");
    // setShowToast(true);
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

      {/* Display error if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-4 right-4 z-50">
          {error}
          <span className="absolute top-0 right-0 px-4 py-3" onClick={() => setError('')}>
            <span className="sr-only">Close</span>
            &times;
          </span>
        </div>
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

      <Footer/>
      {/* <Footer /> */}
    </div>
  );
}

export default HomePage;