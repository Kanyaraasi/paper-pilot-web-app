'use client'
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";

const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [date, setDate] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');

  const [unit, setUnit] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [SchoolName, setSchoolName] = useState('');
  const [selectedInputs, setSelectedInputs] = useState([]);

  const grades = [
    { 
      number: 1, 
      title: "1st Standard", 
      subjects: ["English", "Mathematics", "Environmental Science", "Hindi"] 
    },
    { 
      number: 2, 
      title: "2nd Standard", 
      subjects: ["English", "Mathematics", "Environmental Science", "Hindi", "Computer"] 
    },
    { 
      number: 3, 
      title: "3rd Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] 
    },
    { 
      number: 4, 
      title: "4th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] 
    },
    { 
      number: 5, 
      title: "5th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] 
    },
    { 
      number: 6, 
      title: "6th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] 
    },
    { 
      number: 7, 
      title: "7th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] 
    },
    { 
      number: 8, 
      title: "8th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] 
    },
    { 
      number: 9, 
      title: "9th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] 
    },
    { 
      number: 10, 
      title: "10th Standard", 
      subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] 
    }
  ];

  const router = useRouter();

  const handleProceed = () => {
    // Fixed validation checks
    if (!selectedGrade) {
      toast.error("Please select a standard!");
      return;
    }
    if (!selectedSubject) {
      toast.error("Please select a subject!");
      return;
    }
    if (!date) {
      toast.error("Please select a date!");
      return;
    }
    if (!StartTime || !EndTime) {
      toast.error("Please select start and end times!");
      return;
    }
    if (!unit) {
      toast.error("Please select a unit!");
      return;
    }
    if (!SchoolName) {
      toast.error("Please Enter the School Name!");
      return;
    }

    // Create an object with selected inputs
    const examDetails = {
      grade: selectedGrade.title,
      subject: selectedSubject,
      date: date,
      startTime: StartTime,
      endTime: EndTime,
      unit: unit,
      schoolName: SchoolName
    };
   console.log(StartTime,EndTime)
    // Store exam details in localStorage
    localStorage.setItem('examDetails', JSON.stringify(examDetails));

    // Success notification
    toast.success("Exam details added successfully!");
    
    // Log details (for debugging)
    console.log("Added Exam Details:", examDetails);

    // Navigate to Question Paper Page with subject as a query parameter
    router.push(`/QuestionPaperPage?subject=${encodeURIComponent(selectedSubject)}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container mx-auto max-w-6xl">
        <h1 className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800 tracking-wide">
          Exam Details Selection
        </h1>

        {/* Grade Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8">
          {grades.map((grade) => (
            <button
              key={grade.number}
              onClick={() => {
                setSelectedGrade(grade);
                setSelectedSubject('');
              }}
              className={`relative px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 transform 
                ${selectedGrade?.number === grade.number 
                  ? 'bg-indigo-600 text-white scale-105 shadow-md' 
                  : 'bg-white text-gray-800 hover:bg-indigo-100 border border-gray-200'}`}
            >
              {grade.title}
            </button>
          ))}
        </div>

        {/* Selected Grade Details */}
        {selectedGrade && (
          <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xl">
            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-indigo-700">
              {selectedGrade.title} - Exam Configuration
            </h2>

            {/* Subjects Selection */}
            <div className="mb-6">
              <label className="block text-black font-semibold mb-3">
                Select Subject:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                {selectedGrade.subjects.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => setSelectedSubject(subject)}
                    className={`p-2 sm:p-3 rounded-lg font-medium text-sm transition-all duration-300 
                      ${selectedSubject === subject 
                        ? 'bg-green-500 text-white scale-105 shadow-md' 
                        : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'}`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            {/* Date, Time, and Dropdown */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4">
              {/* Date Input */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Exam Date:</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">School Name / Classes Name</label>
                <input 
                  type="text"
                  value={SchoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black uppercase"
                />
              </div>

              {/* Time Input */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Start Time:</label>
                <input 
                  type="time"
                  value={StartTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">End Time:</label>
                <input 
                  type="time"
                  value={EndTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </div>

              {/* Unit Dropdown */}
              <div className="flex flex-col">
                <label className="text-black font-medium mb-2">Select Unit:</label>
                <select 
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                >
                  <option value="">Choose Unit</option>
                  <option value="1st Unit">1st Unit</option>
                  <option value="2nd Unit">2nd Unit</option>
                  <option value="3rd Unit">3rd Unit</option>
                </select>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="mt-6 text-center">
              <button 
                onClick={handleProceed}
                className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition transform active:scale-95"
              >
                Add Exam Details
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GradeSelector;