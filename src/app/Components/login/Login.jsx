"use client";
import { useState } from "react";
import { Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [hidepass, setHidepass] = useState(true);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin123" && password === "admin123") {
      // Simple navigation without Next.js routing
      window.location.href = "/GradeSelector";
    } else {
      setError("Invalid username or password!");
    }
  };

  const togglePasswordVisibility = () => {
    setHidepass(!hidepass);
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-blue-50">
      <div className="bg-white p-8 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">
           Login
        </h2>
        
        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              {error}
            </div>
          )}
          
          <div className="space-y-2">
            <label 
              htmlFor="username" 
              className="block text-sm font-medium text-gray-700"
            >
              Username :
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full p-2 border rounded text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div className="space-y-2 relative">
            <label 
              htmlFor="password" 
              className="block text-sm font-medium text-gray-700"
            >
              Password :
            </label>
            <div className="relative">
              <input
                id="password"
                type={hidepass ? "password" : "text"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-2 border rounded text-black pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-600"
              >
                {hidepass ? (
                  <Eye className="h-5 w-5" />
                ) : (
                  <EyeOff className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition-colors"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-4 text-center text-sm text-gray-600">
          <p>Test: Username and Password are both "admin123"</p>
        </div>
      </div>
    </div>
  );
}