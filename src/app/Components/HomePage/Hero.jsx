"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useTheme } from "@/contexts/ThemeContext";
import {
  ArrowBigLeft,
  ArrowBigLeftDash,
  ArrowBigRightDash,
  Play,
  PlayIcon,
} from "lucide-react";

function Hero({ animated = true, onGetStarted }) {
  const [typedText, setTypedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  const { theme } = useTheme();

  const words = [
    "Create question papers in 1 minute",
    "Save hours of preparation time",
    "Generate professional papers easily",
    "Customize for any curriculum",
  ];

  const getThemeClasses = () => {
    const isDark = theme === "dark";
    return {
      pageBackground: isDark ? "bg-gray-900" : "bg-gray-50",
      cardBackground: isDark
        ? "bg-gray-800 border-gray-700"
        : "bg-white border-gray-200",
      cardHeader: isDark ? "border-gray-700" : "border-gray-200",
      textPrimary: isDark ? "text-gray-100" : "text-gray-900",
      textSecondary: isDark ? "text-gray-300" : "text-gray-600",
      textMuted: isDark ? "text-gray-400" : "text-gray-500",
      inputBase: isDark
        ? "bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400"
        : "bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500",
      inputError: isDark
        ? "border-red-400 bg-red-900/20"
        : "border-red-300 bg-red-50",
      buttonPrimary: isDark
        ? "bg-blue-600 hover:bg-blue-700 text-white"
        : "bg-blue-600 hover:bg-blue-700 text-white",
      buttonSecondary: isDark
        ? "border-gray-600 text-gray-300 hover:bg-gray-700"
        : "border-gray-300 text-gray-700 hover:bg-gray-50",
      buttonBack: isDark
        ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
        : "bg-gray-100 hover:bg-gray-200 text-gray-600",
      subjectCard: isDark
        ? "border-gray-600 bg-gray-700 hover:bg-gray-600"
        : "border-gray-200 bg-white hover:bg-gray-50",
      subjectCardSelected: isDark
        ? "border-blue-400 bg-blue-900/30 ring-blue-400"
        : "border-blue-300 bg-blue-50 ring-blue-200",
      subjectCardHover: isDark
        ? "hover:border-gray-500"
        : "hover:border-gray-300",
      alertInfo: isDark
        ? "bg-blue-900/30 border-blue-700 text-blue-200"
        : "bg-blue-50 border-blue-200 text-blue-700",
      alertError: isDark
        ? "bg-red-900/30 border-red-700 text-red-200"
        : "bg-red-50 border-red-200 text-red-600",
      iconAccent: isDark ? "text-blue-400" : "text-blue-600",
      iconSuccess: isDark ? "text-green-400" : "text-green-600",
      iconError: isDark ? "text-red-400" : "text-red-600",
      gradientBg: isDark
        ? "bg-gradient-to-br from-blue-900/20 to-purple-900/20"
        : "bg-gradient-to-br from-blue-100 to-purple-100",
    };
  };

  const themeClasses = getThemeClasses();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Text typing animation effect
  useEffect(() => {
    if (!mounted) return;

    const typingSpeed = isDeleting ? 50 : 100;
    const deletingDelay = 1500;
    const currentWord = words[currentWordIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        if (typedText.length < currentWord.length) {
          setTypedText(currentWord.substring(0, typedText.length + 1));
        } else {
          setTimeout(() => setIsDeleting(true), deletingDelay);
        }
      } else {
        if (typedText.length > 0) {
          setTypedText(currentWord.substring(0, typedText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((currentWordIndex + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [typedText, currentWordIndex, isDeleting, words, mounted]);

  if (!mounted) {
    return null;
  }

  return (
    <div
      className={`min-h-screen ${themeClasses.pageBackground} relative overflow-hidden`}
    >
      <div className="relative pt-10 pb-5 px-4 max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          <div
            className={`w-full lg:w-7/12 ${
              themeClasses.textPrimary
            } space-y-8 ${animated ? "animate-fadeIn" : "opacity-0"}`}
          >
            <div className="space-y-2">
              <div
                className={`inline-flex items-center mt-8 ${themeClasses.alertInfo} px-4 py-2 rounded-full border`}
              >
                <span className="flex h-2 w-2 relative mr-3">
                  <span
                    className={`animate-ping absolute h-2 w-2 rounded-full ${
                      theme === "dark" ? "bg-blue-400" : "bg-blue-400"
                    } opacity-75`}
                  ></span>
                  <span className={`relative rounded-full h-2 w-2 `}></span>
                </span>
                <span className="text-sm font-medium">
                  ✨ PaperPilot Generation
                </span>
              </div>
            </div>

            <div className="h-10 md:h-6 mt-1">
              <h2
                className={`text-2xl md:text-3xl font-semibold ${
                  theme === "dark"
                    ? "bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent"
                    : "bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"
                }`}
              >
                <span>{typedText}</span>
                <span className={`animate-pulse ${themeClasses.iconAccent}`}>
                  |
                </span>
              </h2>
            </div>

            <p
              className={`text-xl ${themeClasses.textSecondary} leading-relaxed max-w-2xl`}
            >
              PaperPilot is your intelligent co-pilot for creating professional
              question papers. Designed specifically for Indian schools and
              coaching institutes, our AI-powered platform helps educators
              generate high-quality papers in just minutes, not hours.
            </p>

            {/* Feature highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div
                className={`flex items-center space-x-3 ${themeClasses.subjectCard} p-4 rounded-lg border shadow-sm hover:shadow-md transition-all`}
              >
                <div
                  className={`w-10 h-10 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-green-500 to-green-600"
                      : "bg-gradient-to-r from-green-400 to-green-500"
                  } rounded-full flex items-center justify-center`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                    Lightning Fast
                  </h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    Generate papers in under 60 seconds
                  </p>
                </div>
              </div>

              <div
                className={`flex items-center space-x-3 ${themeClasses.subjectCard} p-4 rounded-lg border shadow-sm hover:shadow-md transition-all`}
              >
                <div
                  className={`w-10 h-10 ${
                    theme === "dark"
                      ? "bg-gradient-to-r from-blue-500 to-blue-600"
                      : "bg-gradient-to-r from-blue-400 to-blue-500"
                  } rounded-full flex items-center justify-center`}
                >
                  <svg
                    className="w-5 h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17H4a2 2 0 01-2-2V9a2 2 0 012-2h5.663M9.663 17L12 14.337M9.663 17L12 19.663M12 14.337V4a2 2 0 012-2h4a2 2 0 012 2v10.337M12 14.337L14.337 12M12 14.337L9.663 12"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className={`font-semibold ${themeClasses.textPrimary}`}>
                    Curriculum Aligned
                  </h3>
                  <p className={`text-sm ${themeClasses.textSecondary}`}>
                    State boards supported
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4">
              <a href="/TestHistorySavedDashboard">
                <button
                  className={`group px-6 py-4 ${themeClasses.buttonPrimary} rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center`}
                >
                  <span>Start Creating Papers</span>
                  <svg
                    className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </button>
              </a>

              <Link href="/HowItWorkPage">
                <button
                  className={`px-6 py-4 border-2 border-lightGray ${themeClasses.buttonSecondary} rounded-xl font-semibold transition-all transform hover:scale-105 duration-300 flex items-center justify-center`}
                >
                  Watch Demo
                  <ArrowBigRightDash />
                </button>
              </Link>
            </div>
          </div>

          {/* Right Container - Smooth Animated Image */}
          <div
            className={`w-full lg:w-6/12 lg:mt-0 ${
              animated ? "animate-slideInRight" : "opacity-0"
            }`}
          >
            <div className={`relative rounded-lg animate-floatSmooth w-full `}>
              <Image
                src="/HomepageImage.png"
                alt="Paper Pilot Study Fest"
                className="w-full h-full object-cover rounded-lg"
                width={500}
                height={400}
                priority
              />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes floatSmooth {
          0% {
            transform: translateY(0px) scale(1);
          }
          33% {
            transform: translateY(-15px) scale(1.02);
          }
          66% {
            transform: translateY(-8px) scale(1.01);
          }
          100% {
            transform: translateY(0px) scale(1);
          }
        }

        @keyframes slideInRight {
          0% {
            opacity: 0;
            transform: translateX(100px);
          }
          100% {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-floatSmooth {
          animation: floatSmooth 6s ease-in-out infinite;
          animation-delay: 0.5s;
        }

        .animate-slideInRight {
          animation: slideInRight 1s ease-out forwards;
          animation-delay: 0.6s;
        }

        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
          animation-delay: 0.3s;
        }
      `}</style>
    </div>
  );
}

export default Hero;
