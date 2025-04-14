'use client'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';

const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [date, setDate] = useState('');
  const [StartTime, setStartTime] = useState('');
  const [EndTime, setEndTime] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [SchoolName, setSchoolName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [totalMarks, setTotalMarks] = useState(''); // New total marks input field
  const [isLoading, setIsLoading] = useState(false);

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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } },
    tap: { scale: 0.95, transition: { duration: 0.1 } }
  };

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
    if (!teacherName) {
      toast.error("Please Enter the Address!");
      return;
    }
    if (!totalMarks) {
      toast.error("Please Enter the Total Marks!");
      return;
    }
    
    // Validate that totalMarks is a positive number
    const marksValue = parseInt(totalMarks);
    if (isNaN(marksValue) || marksValue <= 0) {
      toast.error("Total Marks must be a positive number!");
      return;
    }

    setIsLoading(true);

    // Create an object with selected inputs
    const examDetails = {
      grade: selectedGrade.title,
      subject: selectedSubject,
      date: date,
      startTime: StartTime,
      endTime: EndTime,
      unit: unit,
      schoolName: SchoolName,
      teacherName: teacherName,
      totalMarks: totalMarks
    };
    
    // Simulate network request
    setTimeout(() => {
      // Store exam details in localStorage
      localStorage.setItem('examDetails', JSON.stringify(examDetails));

      // Success notification
      toast.success("Exam details added successfully!");
      
      // Log details (for debugging)
      console.log("Added Exam Details:", examDetails);

      setIsLoading(false);
      
      // Navigate to Question Paper Page with subject as a query parameter
      router.push(`/QuestionPaperPage?subject=${encodeURIComponent(selectedSubject)}`);
    }, 800);
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 p-4 sm:p-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <ToastContainer position="top-right" autoClose={3000} />
      
      <div className="container mx-auto max-w-6xl">
        <motion.h1 
          className="text-2xl sm:text-4xl font-extrabold mb-6 sm:mb-8 text-center text-gray-800 tracking-wide"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          Exam Details Selection
        </motion.h1>

        {/* Grade Buttons */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-5 gap-2 sm:gap-4 mb-6 sm:mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {grades.map((grade, index) => (
            <motion.button
              key={grade.number}
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setSelectedGrade(grade);
                setSelectedSubject('');
              }}
              className={`relative px-3 py-2 sm:px-6 sm:py-3 rounded-lg font-medium text-sm sm:text-base transition-all duration-300 transform 
                ${selectedGrade?.number === grade.number 
                  ? 'bg-indigo-600 text-white shadow-md' 
                  : 'bg-white text-gray-800 hover:bg-indigo-100 border border-gray-200'}`}
            >
              {grade.title}
            </motion.button>
          ))}
        </motion.div>

        {/* Selected Grade Details */}
        {selectedGrade && (
          <motion.div 
            className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h2 
              className="text-xl sm:text-2xl font-bold mb-4 text-indigo-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {selectedGrade.title} - Exam Configuration
            </motion.h2>

            {/* Subjects Selection */}
            <motion.div 
              className="mb-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <label className="block text-black font-semibold mb-3">
                Select Subject:
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2 sm:gap-4">
                {selectedGrade.subjects.map((subject) => (
                  <motion.button
                    key={subject}
                    variants={itemVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() => setSelectedSubject(subject)}
                    className={`p-2 sm:p-3 rounded-lg font-medium text-sm transition-all duration-300 
                      ${selectedSubject === subject 
                        ? 'bg-green-500 text-white shadow-md' 
                        : 'bg-indigo-50 text-indigo-800 hover:bg-indigo-100'}`}
                  >
                    {subject}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Form fields */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {/* Date Input */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">Exam Date:</label>
                <input 
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </motion.div>
              
              {/* School Name */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">School Name / Classes Name</label>
                <input 
                  type="text"
                  value={SchoolName}
                  onChange={(e) => setSchoolName(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black uppercase"
                  placeholder="Enter school name"
                />
              </motion.div>

              {/* Address */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">Address</label>
                <input 
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter Address"
                />
              </motion.div>

              {/* Total Marks - New Field */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">Total Marks</label>
                <input 
                  type="number"
                  min="1"
                  value={totalMarks}
                  onChange={(e) => setTotalMarks(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                  placeholder="Enter total marks"
                />
              </motion.div>

              {/* Start Time */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">Start Time:</label>
                <input 
                  type="time"
                  value={StartTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </motion.div>
              
              {/* End Time */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
                <label className="text-black font-medium mb-2">End Time:</label>
                <input 
                  type="time"
                  value={EndTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="p-2 sm:p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 text-black"
                />
              </motion.div>

              {/* Unit Dropdown */}
              <motion.div 
                className="flex flex-col"
                variants={itemVariants}
              >
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
              </motion.div>
            </motion.div>

            {/* Proceed Button */}
            <motion.div 
              className="mt-6 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <motion.button 
                onClick={handleProceed}
                disabled={isLoading}
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                className={`px-6 py-3 rounded-lg font-semibold text-white transition transform ${
                  isLoading 
                  ? 'bg-blue-400 cursor-not-allowed' 
                  : 'bg-blue-500 hover:bg-blue-600 active:scale-95'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : "Add Exam Details"}
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default GradeSelector;