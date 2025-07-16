import React, { useState, useEffect } from "react";
import { Eye, EyeOff, User, Lock, User as UserIcon } from "lucide-react";
import { useTheme } from "@/contexts/ThemeContext";

import axios from "axios";
import { BASE_URL } from "../../../../BASE_URL";
// import { toast } from 'react-toastify';

function AuthForms() {
  const { theme } = useTheme();

  const [loginData, setLoginData] = useState({
    schoolName: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [hidePass, setHidePass] = useState(true);
  const [hideRegisterPass, setHideRegisterPass] = useState(true);
  const [hideConfirmPass, setHideConfirmPass] = useState(true);
  const [isRegisterForm, setIsRegisterForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Theme classes
  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50',
      cardBackground: isDark ? 'bg-gray-800/90 border-gray-700' : 'bg-white/90 border-gray-200',
      cardHover: isDark ? 'hover:bg-gray-700/90' : 'hover:bg-white/95',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark 
        ? 'bg-gray-700/50 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' 
        : 'bg-white/70 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-sky-500 focus:ring-sky-500',
      buttonPrimary: isDark 
        ? 'bg-blue-600 hover:bg-blue-700 text-white' 
        : 'bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white',
      linkPrimary: isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-500',
      iconColor: isDark ? 'text-gray-400' : 'text-gray-400',
      iconHover: isDark ? 'hover:text-blue-400' : 'hover:text-blue-600',
      errorBg: isDark ? 'bg-red-900/50 border-red-700 text-red-300' : 'bg-red-100 border-red-500 text-red-700',
      successBg: isDark ? 'bg-green-900/50 border-green-700 text-green-300' : 'bg-green-100 border-green-500 text-green-700',
      checkboxBase: isDark 
        ? 'text-blue-400 focus:ring-blue-400 border-gray-600 bg-gray-700' 
        : 'text-blue-600 focus:ring-blue-500 border-gray-300 bg-white',
      gradientText: isDark 
        ? 'text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400' 
        : 'text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-indigo-600',
    };
  };

  const themeClasses = getThemeClasses();

  // Success message auto-hide effect
  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [success]);

  // Error message auto-hide effect
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/institute/login`,
        {
          email: loginData.schoolName,
          password: loginData.password,
        }
      );
      console.log("respoooo", response);
      const token = response.data.token;
      const roleType = response.data.institute.type;
      
      // Save token to localStorage or cookie
      localStorage.setItem("token", token);
      localStorage.setItem("roleType", roleType);
      
      setSuccess("Login successful");
      setTimeout(() => {
        window.location.href = "/TestHistorySavedDashboard";
      }, 1000);
      
      console.log("JWT Token:", token);
      setLoginData({
        schoolName: "",
        password: "",
      });
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    console.log("hidepass");
    if (field === "login") {
      setHidePass(!hidePass);
    } else if (field === "register") {
      setHideRegisterPass(!hideRegisterPass);
    } else if (field === "confirm") {
      setHideConfirmPass(!hideConfirmPass);
    }
  };

  const toggleFormMode = () => {
    setIsRegisterForm(!isRegisterForm);
    setError("");
    setSuccess("");
  };

  const handleLoginInputChange = (e) => {
    const { id, value } = e.target;
    setLoginData((prev) => ({ ...prev, [id]: value }));
  };

  const handleRegisterInputChange = (e) => {
    const { id, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <div className={`${themeClasses.cardBackground} ${themeClasses.cardHover} p-6 rounded-xl shadow-xl w-full max-w-md mx-auto border backdrop-blur-sm transition-all duration-500 relative overflow-hidden`}>
      {/* Alert Messages */}
      {error && (
        <div
          className={`${themeClasses.errorBg} border-l-4 px-4 py-3 rounded relative animate-pulse mb-4 font-medium`}
          role="alert"
        >
          <span className="font-semibold">Error:</span> {error}
        </div>
      )}

      {success && (
        <div
          className={`${themeClasses.successBg} border-l-4 px-4 py-3 rounded relative mb-4 font-medium`}
          role="alert"
        >
          <span className="font-semibold">Success:</span> {success}
        </div>
      )}

      {/* Login Form */}
      <div
        className={`transition-all duration-500 transform ${
          isRegisterForm
            ? "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
        style={{ padding: "1rem" }}
      >
        <div className="text-center mb-8">
          <h2 className={`text-3xl font-bold ${themeClasses.gradientText} mb-2`}>
            Welcome Back
          </h2>
          <p className={`${themeClasses.textSecondary} text-sm font-medium`}>
            Sign in to your PaperPilot account
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="schoolName"
              className={`block text-sm font-semibold ${themeClasses.textPrimary}`}
            >
              Institute Email
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className={`h-5 w-5 ${themeClasses.iconColor}`} />
              </div>
              <input
                id="schoolName"
                type="email"
                placeholder="Enter your institute email"
                value={loginData.schoolName}
                onChange={handleLoginInputChange}
                required
                className={`w-full pl-10 pr-4 py-3 border rounded-lg font-medium ${themeClasses.inputBase} focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm`}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className={`block text-sm font-semibold ${themeClasses.textPrimary}`}
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className={`h-5 w-5 ${themeClasses.iconColor}`} />
              </div>
              <input
                id="password"
                type={hidePass ? "password" : "text"}
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                required
                className={`w-full pl-10 pr-12 py-3 border rounded-lg font-medium ${themeClasses.inputBase} focus:outline-none focus:ring-2 transition-all duration-300 backdrop-blur-sm`}
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("login")}
                className={`absolute inset-y-0 right-0 flex items-center px-3 ${themeClasses.iconColor} ${themeClasses.iconHover} transition-colors duration-300`}
              >
                {hidePass ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className={`h-4 w-4 rounded ${themeClasses.checkboxBase} focus:ring-2 transition-colors duration-300`}
              />
              <label htmlFor="remember" className={`ml-2 font-medium ${themeClasses.textSecondary}`}>
                Remember me
              </label>
            </div>
            <a
              href="#"
              className={`${themeClasses.linkPrimary} font-semibold transition-colors duration-300`}
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full ${themeClasses.buttonPrimary} py-3 rounded-lg transition-all duration-300 font-semibold transform hover:scale-[1.02] active:scale-95 flex items-center justify-center shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                <span>Signing In...</span>
              </div>
            ) : (
              <>
                <span>Sign In</span>
                <svg
                  className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </>
            )}
          </button>
        </form>

        {/* <div className="mt-6 text-center">
          <p className={`text-sm ${themeClasses.textSecondary} font-medium`}>
            Don't have an account?{" "}
            <button
              onClick={toggleFormMode}
              className={`${themeClasses.linkPrimary} font-semibold transition-colors duration-300`}
            >
              Sign up here
            </button>
          </p>
        </div> */}
      </div>
    </div>
  );
}

export default AuthForms;