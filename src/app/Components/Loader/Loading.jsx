import React from "react";

const Loading = () => {
  const letters = ["P", "A", "P", "E", "R", "P", "I", "L", "O", "T"];

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
      <div className="relative">
        {/* Main container with compact spacing */}
        <div className="flex space-x-1 mb-4">
          {letters.map((letter, index) => (
            <div key={index} className="relative">
              <div className="relative overflow-hidden bg-white rounded-lg shadow-sm border border-blue-100 w-8 h-10 flex items-center justify-center">
                <span
                  className="text-blue-600 font-bold text-lg relative z-10 animate-pulse"
                  style={{
                    animationDelay: `${index * 0.1}s`,
                    animationDuration: "1.5s",
                  }}
                >
                  {letter}
                </span>

                <div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-200 to-transparent opacity-30 animate-pulse"
                  style={{
                    animationDelay: `${index * 0.2}s`,
                    animationDuration: "2s",
                  }}
                />
              </div>

              {/* Overflow loading bar */}
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-blue-100 overflow-hidden">
                <div
                  className="h-full bg-blue-400 animate-pulse"
                  style={{
                    animationDelay: `${index * 0.15}s`,
                    animationDuration: "1.8s",
                  }}
                />
              </div>

              {/* Pulse glow effect */}
              <div
                className="absolute inset-0 rounded-lg bg-blue-300 opacity-20 animate-ping"
                style={{
                  animationDelay: `${index * 0.25}s`,
                  animationDuration: "2.5s",
                }}
              />
            </div>
          ))}
        </div>

        {/* Loading text */}
        <div className="text-center">
          <p className="text-blue-500 text-sm font-medium animate-pulse">
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Loading;
