import React, { useState, useEffect } from "react";
import {
  Eye,
  EyeOff,
  User,
  Lock,
  UserPlus,
  Mail,
  User as UserIcon,
} from "lucide-react";

import axios from "axios";
// import { toast } from 'react-toastify';
import { BASE_URL } from "../../../../BASE_URL";

function AuthForms() {
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
  const [passwordhide, setpasswordhide] = useState(true);
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
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email: loginData.schoolName,
        password: loginData.password,
      });
      const token = response.data.token;
      const slotType = response.data.user?.role;
      // Save token to localStorage or cookie
      localStorage.setItem("token", token);
      localStorage.setItem("roleType", slotType);
      setSuccess("Login successful");
      setTimeout(() => {
        if (slotType === "admin") {
          window.location.href = "/CreateUser";
        } else if (slotType === "teacher") {
          window.location.href = "/GradeSelector";
        } else {
          setError("Unknown user type.");
        }
      }, 1000);
      console.log("JWT Token:", token);
      setLoginData({
    schoolName: "",
    password: "",
  })
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    // Basic validation
    // if (registerData.password !== registerData.confirmPassword) {
    //   setError("Passwords do not match!");
    //   return;
    // }

    if (registerData.password.length < 6) {
      setError("Password must be at least 6 characters!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, {
        schoolName: registerData.schoolName,
        email: registerData.email,
        password: registerData.password,
        address: registerData.address,
      });
      await localStorage.setItem("token", response.data.token);
      await localStorage.setItem("roleType", "admin");
      setSuccess(response.data.message || "Registration successful");
      console.log("JWT Token:", response.data.token);
      setRegisterData({
    schoolName: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
  })
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
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
    <div className="bg-white p-2 rounded-xl shadow-xl w-full max-w-md mx-auto border border-gray-100 hover:shadow-2xl transition-shadow duration-500 relative overflow-hidden">
      {/* Card Header with Toggle */}
      <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
        <button
          onClick={() => setIsRegisterForm(false)}
          className={`flex-1 py-2 rounded-3xl font-medium text-sm transition-all duration-300 ${
            !isRegisterForm
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Login
        </button>
        <button
          onClick={() => setIsRegisterForm(true)}
          className={`flex-1 py-2 rounded-3xl font-medium text-sm transition-all duration-300 ${
            isRegisterForm
              ? "bg-blue-600 text-white shadow-md"
              : "text-gray-700 hover:bg-gray-200"
          }`}
        >
          Register
        </button>
      </div>

      {/* Alert Messages */}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 px-4 py-3 rounded relative animate-shake mb-4"
          role="alert"
        >
          <span className="font-medium">Error:</span> {error}
        </div>
      )}

      {success && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 px-4 py-3 rounded relative mb-4"
          role="alert"
        >
          <span className="font-medium">Success:</span> {success}
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
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
          Log in to PaperPilot
        </h2>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label
              htmlFor="schoolName"
              className="block text-sm font-medium text-gray-700"
            >
              School Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="schoolName"
                type="text"
                placeholder="Enter your school name"
                value={loginData.schoolName}
                onChange={handleLoginInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1 relative">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={hidePass ? "password" : "text"}
                placeholder="Enter your password"
                value={loginData.password}
                onChange={handleLoginInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("login")}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
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
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-gray-700">
                Remember me
              </label>
            </div>
            <a
              href="#"
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium transform hover:scale-105 flex items-center justify-center"
          >
            <span>Sign In</span>
            <svg
              className="w-5 h-5 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </form>

       

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Don't have an account?
            <button
              onClick={toggleFormMode}
              className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
            >
              Register now
            </button>
          </p>
        </div>
      </div>

      {/* Register Form - Improved alignment */}
      <div
        className={`transition-all duration-500 transform ${
          !isRegisterForm
            ? "translate-x-full opacity-0 absolute inset-0 pointer-events-none"
            : "translate-x-0 opacity-100"
        }`}
        style={{ padding: "1rem" }}
      >
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">
          Create an Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4">
          {/* Full Name Field */}
          <div className="space-y-1">
            <label
              htmlFor="schoolName"
              className="block text-sm font-medium text-gray-700"
            >
              School Name
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <UserIcon className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="schoolName"
                type="text"
                placeholder="Enter your school name"
                value={registerData.schoolName}
                onChange={handleRegisterInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-1">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={registerData.email}
                onChange={handleRegisterInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              School Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </div>
              <input
                id="address"
                type="text"
                placeholder="Enter school address"
                value={registerData.address}
                onChange={handleRegisterInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          {/* Username Field - Added this field which was missing */}

          {/* Password Field */}
          <div className="space-y-1">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="password"
                type={hideRegisterPass ? "password" : "text"}
                placeholder="Create a password"
                value={registerData.password}
                onChange={handleRegisterInputChange}
                required
                className="w-full pl-10 p-3 border border-gray-300 rounded-lg text-gray-800 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("register")}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600 hover:text-blue-600 transition-colors duration-300"
              >
                {hideRegisterPass ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          {/* Terms & Conditions */}
          <div className="flex items-start py-2">
            <div className="flex items-center h-5">
              <input
                type="checkbox"
                id="terms"
                required
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium transform hover:scale-105 flex items-center justify-center mt-6"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            <span>Create Account</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600">
            Already have an account?
            <button
              onClick={toggleFormMode}
              className="ml-1 text-blue-600 hover:text-blue-500 font-medium"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default AuthForms;