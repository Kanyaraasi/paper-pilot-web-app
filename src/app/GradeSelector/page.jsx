'use client'
import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ArrowLeft, BookOpen, Calendar, Clock, School, MapPin, Award, Box } from 'lucide-react';
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import { BASE_URL } from '../../../BASE_URL';

const GradeSelector = () => {
  const [selectedGrade, setSelectedGrade] = useState(null);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [unit, setUnit] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [schoolName, setSchoolName] = useState('');
  const [address, setAddress] = useState('');
  const [totalMarks, setTotalMarks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('grade'); // To track wizard steps
  const [examConfigArray, setExamConfigArray] = useState([]);
  const [teacherData, setTeacherData] = useState(null);
const [availableAssignments, setAvailableAssignments] = useState([]);
const [dynamicGrades, setDynamicGrades] = useState([]);

  const router = useRouter();

  // Load existing exam configurations from localStorage on component mount
  useEffect(() => {
    fetchUserData();
    const savedConfigurations = localStorage.getItem('examConfigArray');
    if (savedConfigurations) {
      setExamConfigArray(JSON.parse(savedConfigurations));
    }
  }, []);
  

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('tokennn', token)
      const response = await fetch(`${BASE_URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
  
      const userData = await response.json();
      console.log('User Data:', userData);
      
      setTeacherData(userData);
      setAvailableAssignments(userData.assignments || []);
      
      // Create dynamic grades from assignments
      const uniqueStandards = [...new Set(userData.assignments?.map(assignment => assignment.standard) || [])];
      const dynamicGradesList = uniqueStandards.map((standard, index) => {
        // Extract subjects for this standard
        const subjectsForStandard = userData.assignments
          .filter(assignment => assignment.standard === standard)
          .map(assignment => assignment.subject);
        
        // Extract number from standard (e.g., "Grade 10" -> 10)
        const gradeNumber = standard.match(/\d+/)?.[0] || (index + 1);
        
        return {
          number: parseInt(gradeNumber),
          title: standard,
          subjects: subjectsForStandard
        };
      });
      
      setDynamicGrades(dynamicGradesList);
      
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error("Failed to fetch user data");
    }
  };
  



  const grades = [
    { number: 1, title: "1st Standard", subjects: ["English", "Mathematics", "Environmental Science", "Hindi"] },
    { number: 2, title: "2nd Standard", subjects: ["English", "Mathematics", "Environmental Science", "Hindi", "Computer"] },
    { number: 3, title: "3rd Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 4, title: "4th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 5, title: "5th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer"] },
    { number: 6, title: "6th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 7, title: "7th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 8, title: "8th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 9, title: "9th Standard", subjects: ["English", "Mathematics", "Science", "Social Studies", "Computer Science"] },
    { number: 10, title: "10th Standard", subjects: ["English", "Algebra", "Geometry", "Science", "Social Studies", "Computer Science"] }
  ];

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.4 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2
      }
    }
  };

  const itemFadeIn = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
  };

  const slideIn = {
    hidden: { x: 20, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: "spring", damping: 18 } }
  };

  const handleBack = () => {
    // Go back to previous section or home
    if (activeSection === 'subject') {
      setActiveSection('grade');
    } else if (activeSection === 'details') {
      setActiveSection('subject');
    } else {
      router.push('/');
    }
  };

  const validateAndProceed = () => {
    if (activeSection === 'grade') {
      if (!selectedGrade) {
        toast.error("Please select a standard!");
        return;
      }
      setActiveSection('subject');
    } 
    else if (activeSection === 'subject') {
      if (!selectedSubject) {
        toast.error("Please select a subject!");
        return;
      }
      setActiveSection('details');
    }
    else if (activeSection === 'details') {
      // Validate all form fields
      if (!date) {
        toast.error("Please select a date!");
        return;
      }
      if (!startTime || !endTime) {
        toast.error("Please select start and end times!");
        return;
      }
      if (!unit) {
        toast.error("Please select a unit!");
        return;
      }
      if (!schoolName) {
        toast.error("Please enter the School Name!");
        return;
      }
      if (!address) {
        toast.error("Please enter the Address!");
        return;
      }
      if (!totalMarks) {
        toast.error("Please enter the Total Marks!");
        return;
      }
      
      // Validate that totalMarks is a positive number
      const marksValue = parseInt(totalMarks);
      if (isNaN(marksValue) || marksValue <= 0) {
        toast.error("Total Marks must be a positive number!");
        return;
      }

      // Submit form
      handleFormSubmit();
    }
  };

  const handleFormSubmit = () => {
    setIsLoading(true);
    
    // Create exam details object
    const examDetails = {
      id: Date.now(),
      grade: selectedGrade.title,
      subject: selectedSubject,
      date: date,
      startTime: startTime,
      endTime: endTime,
      unit: unit,
      schoolName: schoolName,
      address: address,
      totalMarks: totalMarks,
      teacherId: teacherData?._id,
      teacherName: teacherData?.teacherName,
      teacherEmail: teacherData?.email,
      createdAt: new Date().toISOString()
    };
    
    
    // Simulate network request
    setTimeout(() => {
      // Update the array with the new exam config
      const updatedConfigArray = [...examConfigArray, examDetails];
      
      // Store the updated array in localStorage
      localStorage.setItem('examConfigArray', JSON.stringify(updatedConfigArray));
      
      // Also store the current exam details for immediate use
      localStorage.setItem('examDetails', JSON.stringify(examDetails));
      
      // Update state
      setExamConfigArray(updatedConfigArray);
      
      // Success notification
      toast.success("Exam details added successfully!");
      
      setIsLoading(false);
      
      // Navigate to Question Paper Page with subject as a query parameter
      router.push(`/QuestionPaperPage`);
    }, 800);
  };
  
  // Progress indicator calculation
  const getProgress = () => {
    if (activeSection === 'grade') return 33;
    if (activeSection === 'subject') return 66;
    if (activeSection === 'details') return 100;
    return 0;
  };

  // Function to render step title
  const getStepTitle = () => {
    if (activeSection === 'grade') return "Step 1: Select Grade";
    if (activeSection === 'subject') return "Step 2: Select Subject";
    if (activeSection === 'details') return "Step 3: Exam Details";
    return "";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-3 sm:p-6">
      <ToastContainer position="top-right" autoClose={3000} />
      
      {/* Header with back button - Made more prominent */}
      <div className="relative container mx-auto max-w-5xl mb-6">
        {/* Back button - Improved visibility */}
        <motion.button 
          onClick={handleBack}
          className="px-4 py-2 flex items-center gap-2 bg-white text-indigo-600 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 border border-indigo-100"
          whileHover={{ x: -3, backgroundColor: "#f0f5ff" }}
          whileTap={{ scale: 0.95 }}
          aria-label="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium text-base">{activeSection === 'grade' ? 'Home' : 'Back'}</span>
        </motion.button>
        
        <motion.div 
          className="text-center my-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900 tracking-tight mb-1">
            Exam Configuration Dashboard
          </h1>
          <p className="text-indigo-600 text-sm sm:text-base">
            {getStepTitle()}
          </p>
        </motion.div>
      </div>
      
      {/* Progress Bar */}
      <motion.div 
        className="container mx-auto max-w-5xl mb-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ width: `${getProgress()}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          ></motion.div>
        </div>
        <div className="flex justify-between mt-2 text-xs text-indigo-700 font-medium">
          <span className={activeSection === 'grade' ? 'text-indigo-900 font-bold text-[16px]' : ''}>Grade Selection</span>
          <span className={activeSection === 'subject' ? 'text-indigo-900 font-bold ' : ''}>Subject</span>
          <span className={activeSection === 'details' ? 'text-indigo-900 font-bold' : ''}>Exam Details</span>
        </div>
      </motion.div>
      
      {/* Main Content Area */}
      <div className="container mx-auto max-w-5xl">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="p-6">
            {/* Navigation buttons at the top of content area */}
            <div className="flex justify-between mb-4">
              {activeSection !== 'grade' && (
                <motion.button
                  onClick={handleBack}
                  className="flex items-center gap-1 text-indigo-600 hover:text-indigo-800 transition-colors"
                  whileHover={{ x: -2 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to {activeSection === 'subject' ? 'Grade Selection' : 'Subject Selection'}</span>
                </motion.button>
              )}
              <div></div> {/* Empty div for flex spacing */}
            </div>
            
            <AnimatePresence mode="wait">
              {/* Grade Selection Section */}
              {activeSection === 'grade' && (
  <motion.div
    key="grade-selection"
    initial="hidden"
    animate="visible"
    exit={{ opacity: 0, x: -100 }}
    variants={fadeIn}
    className="min-h-[210px]"
  >
    <motion.h2 
      className="text-xl font-bold text-gray-800 mb-5 flex items-center gap-2"
      variants={itemFadeIn}
    >
      <School className="w-5 h-5 text-indigo-500" /> 
      Select Grade
      {teacherData && (
        <span className="text-sm font-normal text-gray-600 ml-2">
          - {teacherData.teacherName}
        </span>
      )}
    </motion.h2>
    
    {dynamicGrades.length === 0 ? (
      <div className="flex items-center justify-center h-32">
        <div className="text-gray-500">Loading your assigned grades...</div>
      </div>
    ) : (
      <motion.div 
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
        variants={staggerContainer}
      >
        {(dynamicGrades.length > 0 ? dynamicGrades : grades).map((grade) => (
                      <motion.button
                        key={grade.number}
                        variants={itemFadeIn}
                        whileHover={{ scale: 1.03, boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)" }}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => setSelectedGrade(grade)}
                        className={`relative h-24 rounded-xl font-medium transition-all duration-300 overflow-hidden
                          ${selectedGrade?.number === grade.number 
                            ? 'ring-2 ring-indigo-500 ring-offset-2' 
                            : 'border border-gray-200'}`}
                      >
                        <div className={`absolute inset-0 w-full h-full ${
                          selectedGrade?.number === grade.number 
                            ? 'bg-indigo-600 text-white' 
                            : 'bg-indigo-50 text-indigo-900'
                        } flex flex-col items-center justify-center transition-all`}>
                          <span className="text-lg sm:text-xl font-bold">{grade.number}</span>
                          <span className="text-xs sm:text-sm mt-1">{grade.title}</span>
                        </div>
                      </motion.button>
                    ))}
      </motion.div>
    )}
  </motion.div>
)}
              {/* Subject Selection Section */}
              {activeSection === 'subject' && selectedGrade && (
                <motion.div
                  key="subject-selection"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -100 }}
                  variants={fadeIn}
                  className="min-h-[400px]"
                >
                  <motion.h2 
                    className="text-xl font-bold text-gray-800 mb-2 flex items-center gap-2"
                    variants={itemFadeIn}
                  >
                    <BookOpen className="w-5 h-5 text-indigo-500" /> 
                    {selectedGrade.title} - Subject Selection
                  </motion.h2>
                  
                  <motion.p 
                    className="text-gray-500 mb-6 text-sm"
                    variants={itemFadeIn}
                  >
                    Please select a subject for the exam
                  </motion.p>
                  
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 gap-3"
                    variants={staggerContainer}
                  >
                    {selectedGrade?.subjects?.map((subject) => (
                      <motion.button
                        key={subject}
                        variants={itemFadeIn}
                        whileHover={{ 
                          scale: 1.02, 
                          boxShadow: "0 4px 12px rgba(79, 70, 229, 0.15)",
                          y: -2 
                        }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setSelectedSubject(subject)}
                        className={`p-4 rounded-xl font-medium text-sm transition-all duration-300 flex flex-col items-center justify-center gap-2 h-24
                          ${selectedSubject === subject 
                            ? 'bg-indigo-600 text-white ring-2 ring-indigo-300 ring-offset-2' 
                            : 'bg-white text-indigo-800 border border-gray-200 hover:border-indigo-300'}`}
                      >
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          selectedSubject === subject 
                            ? 'bg-white text-indigo-600' 
                            : 'bg-indigo-100 text-indigo-600'
                        }`}>
                          <BookOpen className="w-4 h-4" />
                        </div>
                        <span>{subject}</span>
                      </motion.button>
                    ))}
                  </motion.div>
                </motion.div>
              )}
              
              {/* Exam Details Section */}
              {activeSection === 'details' && selectedGrade && selectedSubject && (
                <motion.div
                  key="exam-details"
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -100 }}
                  variants={fadeIn}
                  className="min-h-[400px]"
                >
                  <motion.div 
  className="flex flex-wrap items-center justify-between gap-2 mb-6 pb-4 border-b border-gray-100"
  variants={itemFadeIn}
>
  <div>
    <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
      <Award className="w-5 h-5 text-indigo-500" />
      Exam Details
    </h2>
    <p className="text-gray-500 text-sm mt-1">
      {selectedGrade?.title} - {selectedSubject}
      {teacherData && (
        <span className="block text-xs text-indigo-600 mt-1">
          Teacher: {teacherData.teacherName}
        </span>
      )}
    </p>
  </div>
  
  {examConfigArray.length > 0 && (
    <div className="text-sm text-indigo-600">
      {examConfigArray.length} saved configuration{examConfigArray.length !== 1 ? 's' : ''}
    </div>
  )}
</motion.div>

                  <motion.div 
                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4"
                    variants={staggerContainer}
                  >
                    {/* School Name */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <School className="w-4 h-4 text-indigo-500" />
                        School Name
                      </label>
                      <input 
                        type="text"
                        value={schoolName}
                        onChange={(e) => setSchoolName(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                        placeholder="Enter school name"
                      />
                    </motion.div>
                    
                    {/* Address */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-indigo-500" />
                        Address
                      </label>
                      <input 
                        type="text"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                        placeholder="Enter address"
                      />
                    </motion.div>
                    
                    {/* Date */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-indigo-500" />
                        Exam Date
                      </label>
                      <input 
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                      />
                    </motion.div>
                    
                    {/* Start Time */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        Start Time
                      </label>
                      <input 
                        type="time"
                        value={startTime}
                        onChange={(e) => setStartTime(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                      />
                    </motion.div>
                    
                    {/* End Time */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <Clock className="w-4 h-4 text-indigo-500" />
                        End Time
                      </label>
                      <input 
                        type="time"
                        value={endTime}
                        onChange={(e) => setEndTime(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                      />
                    </motion.div>
                    
                    {/* Unit Selection */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <Box className="w-4 h-4 text-indigo-500" />
                        Unit
                      </label>
                      <select 
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                      >
                        <option value="">Select Unit</option>
                        <option value="1st Unit">1st Unit</option>
                        <option value="2nd Unit">2nd Unit</option>
                        <option value="3rd Unit">3rd Unit</option>
                      </select>
                    </motion.div>
                    
                    {/* Total Marks */}
                    <motion.div variants={slideIn} className="flex flex-col">
                      <label className="text-gray-700 text-sm font-medium mb-1 flex items-center gap-1">
                        <Award className="w-4 h-4 text-indigo-500" />
                        Total Marks
                      </label>
                      <input 
                        type="number"
                        min="1"
                        value={totalMarks}
                        onChange={(e) => setTotalMarks(e.target.value)}
                        className="p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-800 text-sm"
                        placeholder="Enter total marks"
                      />
                    </motion.div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
            
            {/* Action Buttons */}
            <motion.div 
              className="mt-2 flex justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Added explicit back button at the bottom */}
              {activeSection !== 'grade' && (
                <motion.button 
                  onClick={handleBack}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-2.5 rounded-lg font-medium text-indigo-600 border border-indigo-200 hover:border-indigo-400 transition transform flex items-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>
              )}
              <motion.div></motion.div>
              <motion.button 
                onClick={validateAndProceed}
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`px-6 py-2.5 rounded-lg font-medium text-white shadow-lg transition transform ${
                  isLoading 
                  ? 'bg-indigo-400 cursor-not-allowed' 
                  : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </div>
                ) : (
                  <>
                    {activeSection === 'details' ? 'Submit Exam Details' : 'Continue'}
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GradeSelector;