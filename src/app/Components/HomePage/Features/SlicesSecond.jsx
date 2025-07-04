import React from "react";
import Image from "next/image";
export default function SlicesSecond() {
  return (
    <div className="h-[50vh] bg-white flex items-center justify-center">
      <div className="max-w-6xl w-full flex justify-center  gap-12 items-center">
        
        <div className="space-y-6">
          <Image
            src="/question-generator-main-feature2.svg"
            alt="Paper Pilot Study Fest"
            className="w-full h-full object-cover rounded-lg"
            width={50}
            height={40}
            priority
          />
        </div>
        {/* Left Content */}
        <div className="space-y-6">
          <h1 className="text-5xl font-bold text-gray-800 leading-tight">
            Perfect for Teachers & Students
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Looking for a tool to create multiple-choice quizzes for your
            students or turn your study materials into a quiz? Our AI quiz
            generator can help you with both.
          </p>
          
        </div>
      </div>
    </div>
  );
}