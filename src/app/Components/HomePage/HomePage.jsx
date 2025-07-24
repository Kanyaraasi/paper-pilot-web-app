"use client";
import React, { useState, useEffect } from "react";

import Hero from "./Hero";
import Features from "./Features";
import CallToAction from "./CallToAction";
import Footer from "@/app/FooterPage/page";
import ContactModal from "./ContactModal";
import { Toaster, toast } from "sonner";
import { usePathname } from "next/navigation";

function HomePage() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [animated, setAnimated] = useState(false);
  const [error, setError] = useState("");
  const pathname = usePathname();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Initialize animations and check user role after page load
  useEffect(() => {
    setAnimated(true);
    const roleType = localStorage.getItem("roleType");

    const landing = sessionStorage.getItem("landing"); // flag to prevent redirect
  }, [pathname]);

  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const handleGetStarted = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setToastMessage("Please login to get started!");
      setShowToast(true);
      return;
    }

    window.location.href = "/TestHistorySavedDashboard";
  };

  const toggleContact = () => {
    setIsContactOpen(!isContactOpen);
  };

  return (
    <div className="h-[80vh]">
      {/* Toast Notification */}
      <Toaster />
      {showToast && (
        <toast
          message={toastMessage}
          type="warning"
          onClose={() => setShowToast(false)}
        />
      )}

      {/* Display error if any */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded fixed top-4 right-4 z-50">
          {error}
          <span
            className="absolute top-0 right-0 px-4 py-3"
            onClick={() => setError("")}
          >
            <span className="sr-only">Close</span>
            &times;
          </span>
        </div>
      )}

      <main>
        <Hero animated={animated} onGetStarted={handleGetStarted} />
        <Features animated={animated} />

        <CallToAction
          onGetStarted={handleGetStarted}
          onContact={toggleContact}
        />
      </main>

      {isContactOpen && <ContactModal onClose={toggleContact} />}

      <Footer />
    </div>
  );
}

export default HomePage;
