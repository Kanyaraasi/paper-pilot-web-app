"use client";
import { useState, useEffect } from "react";
import { Search, UserPlus, Edit, Trash2, X, Check, AlertCircle, ChevronDown, Copy } from "lucide-react";  
import { BASE_URL } from "../../../BASE_URL";
import axios from "axios";


export default function page() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("add"); // "add", "edit", "delete", "password"
  const [searchTerm, setSearchTerm] = useState("");
  const [currentTeacher, setCurrentTeacher] = useState(null);
  const [generatedPassword, setGeneratedPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [copied, setCopied] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    teacherName: "",
    email: "",
    mobileNumber: "",
    assignments: [],
  });

  // Temp assignment being added
  const [tempAssignment, setTempAssignment] = useState({
    standard: "",
    subject: "",
  });

  // Standards and subjects for dropdown
  const standards = [
    "1st",
    "2nd",
    "3rd",
    "4th",
    "5th",
    "6th",
    "7th",
    "8th",
    "9th",
    "10th",
    "11th",
    "12th",
  ];
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
    "Music",
    "Physical Education",
  ];

  useEffect(() => {
    fetchTeachers();
  }, []);

  const fetchTeachers = async () => {
    try {
      setLoading(true);
      const token = await localStorage.getItem("token");
      // Mock data for demonstration purposes
      // In a real app, you would fetch from your API:
      const response = await fetch(`${BASE_URL}/api/teachers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("token", token);
      const data = await response.json();
      console.log("teachers", data);
      // Mock response data

      // console.log('teac')
      setTeachers(data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching teachers:", err);
      setError("Failed to load teachers");
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleTempAssignmentChange = (e) => {
    const { name, value } = e.target;
    setTempAssignment({
      ...tempAssignment,
      [name]: value,
    });
  };

  const addAssignment = () => {
    if (tempAssignment.standard && tempAssignment.subject) {
      setFormData({
        ...formData,
        assignments: [...formData.assignments, { ...tempAssignment }],
      });
      setTempAssignment({ standard: "", subject: "" });
    }
  };

  const removeAssignment = (index) => {
    setFormData({
      ...formData,
      assignments: formData.assignments.filter((_, i) => i !== index),
    });
  };

  const openAddModal = () => {
    setFormData({
      teacherName: "",
      email: "",
      mobileNumber: "",
      assignments: [],
    });
    setModalType("add");
    setShowModal(true);
  };

  const openEditModal = (teacher) => {
    setCurrentTeacher(teacher);
    setFormData({
      teacherName: teacher.teacherName,
      email: teacher.email,
      mobileNumber: teacher.mobileNumber,
      assignments: [...teacher.assignments],
    });
    setModalType("edit");
    setShowModal(true);
  };

  const openDeleteModal = (teacher) => {
    setCurrentTeacher(teacher);
    setModalType("delete");
    setShowModal(true);
  };

  const handleCreateTeacher = async () => {
    try {
      const token = await localStorage.getItem("token");
  
      const response = await axios.post(
        `${BASE_URL}/api/teachers/createTeacher`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      const data = response.data;
      console.log("add teacher", data);
  
      if (!data.success) {
        showToastMessage(data.message || "Failed to add teacher", "error");
        return;
      }
  
      // Add new teacher to state using real teacher data from response
      setTeachers([...teachers, data.teacher]);
      setShowModal(false);
  
      // Show password modal
      setGeneratedPassword(data.generatedPassword);
      setModalType("password");
      setShowModal(true);
  
      showToastMessage("Teacher added successfully", "success");
    } catch (err) {
      console.error("Error creating teacher:", err);
      showToastMessage("Failed to create teacher", "error");
    }
  };
  

  const handleUpdateTeacher = async () => {
    try {
      const token = await localStorage.getItem("token");
      // In a real app, you would PUT to your API:
      const response = await fetch(
        `${BASE_URL}/api/teachers/${currentTeacher._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();

      // Update teacher in state
      setTeachers(
        teachers.map((teacher) =>
          teacher._id === currentTeacher._id
            ? { ...teacher, ...formData }
            : teacher
        )
      );

      setShowModal(false);
      showToastMessage("Teacher updated successfully", "success");
    } catch (err) {
      console.error("Error updating teacher:", err);
      showToastMessage("Failed to update teacher", "error");
    }
  };

  const handleDeleteTeacher = async () => {
    try {
      const token = await localStorage.getItem("token");
      // In a real app, you would DELETE to your API:
      const response = await fetch(
        `${BASE_URL}/api/teachers/${currentTeacher._id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove teacher from state
      setTeachers(
        teachers.filter((teacher) => teacher._id !== currentTeacher._id)
      );

      setShowModal(false);
      showToastMessage("Teacher deleted successfully", "success");
    } catch (err) {
      console.error("Error deleting teacher:", err);
      showToastMessage("Failed to delete teacher", "error");
    }
  };

  const showToastMessage = (message, type) => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);

    // Auto hide toast after 3 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.teacherName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedPassword);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };
  console.log(generatedPassword,"generatedPassword")
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <h1 className="text-3xl font-bold text-white">Teachers Management</h1>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Search and Add Teacher */}
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="Search teachers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button
            onClick={openAddModal}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <UserPlus className="h-5 w-5 mr-2" />
            Add Teacher
          </button>
        </div>

        {/* Teachers List */}
        {loading ? (
          <div className="text-center py-10">
            <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
            <p className="mt-2 text-gray-600">Loading teachers...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {filteredTeachers.length === 0 ? (
                <li className="px-6 py-4 text-center text-gray-500">
                  No teachers found
                </li>
              ) : (
                filteredTeachers.map((teacher) => (
                  <li key={teacher._id} className="px-6 py-4 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <h3 className="text-lg font-medium text-gray-900">
                          {teacher.teacherName}
                        </h3>
                        <div className="mt-1 flex items-center text-sm text-gray-500 space-x-4">
                          <p>{teacher.email}</p>
                          <span>•</span>
                          <p>{teacher.mobileNumber}</p>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm font-medium text-gray-600">
                            Assignments:
                            Password:{generatedPassword}
                          </p>
                          <div className="flex flex-wrap mt-1 gap-2">
                            {teacher.assignments.map((assignment, index) => (
                              <span
                                key={index}
                                className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                              >
                                {assignment.standard} - {assignment.subject}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => openEditModal(teacher)}
                          className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-full"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => openDeleteModal(teacher)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              {modalType === "password" ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                      <Check className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Teacher Created Successfully
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          A temporary password has been generated for this
                          teacher:
                        </p>
                        <div className="p-6 max-w-md mx-auto">
                          <h2 className="text-xl font-semibold mb-4">
                            Generated Password
                          </h2>

                          <div className="mt-2 p-2 bg-gray-100 rounded border border-gray-300 relative">
                            <p className="text-lg font-mono text-center pr-10">
                              {generatedPassword}
                            </p>

                            <button
                              onClick={copyToClipboard}
                              className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-200 rounded transition-colors"
                              title={copied ? "Copied!" : "Copy password"}
                            >
                              {copied ? (
                                <Check className="w-5 h-5 text-green-600" />
                              ) : (
                                <Copy className="w-5 h-5 text-gray-600" />
                              )}
                            </button>
                          </div>

                          {copied && (
                            <p className="text-sm text-green-600 mt-2 text-center">
                              Password copied to clipboard!
                            </p>
                          )}

                          {/* Demo button to generate new password */}
                          <button
                            onClick={() =>
                              setGeneratedPassword(
                                Math.random().toString(36).slice(-8) + "123!"
                              )
                            }
                            className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
                          >
                            Generate New Password
                          </button>
                        </div>
                        <p className="mt-2 text-sm text-gray-500">
                          Please share this password with the teacher. They will
                          be prompted to change it on first login.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              ) : modalType === "delete" ? (
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                      <AlertCircle className="h-6 w-6 text-red-600" />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Delete Teacher
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          Are you sure you want to delete{" "}
                          {currentTeacher?.teacherName}? This action cannot be
                          undone.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleDeleteTeacher}
                    >
                      Delete
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-medium text-gray-900">
                        {modalType === "add"
                          ? "Add New Teacher"
                          : "Edit Teacher"}
                      </h3>
                      <button
                        onClick={() => setShowModal(false)}
                        className="text-gray-400 hover:text-gray-500"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <form className="space-y-4">
                      <div>
                        <label
                          htmlFor="teacherName"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Teacher Name
                        </label>
                        <input
                          type="text"
                          name="teacherName"
                          id="teacherName"
                          value={formData.teacherName}
                          onChange={handleInputChange}
                          className="mt-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md p-2"
                          required
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          name="email"
                          id="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="mt-2 p-2  focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                          required
                          disabled={modalType === "edit"}
                        />
                        {modalType === "edit" && (
                          <p className="mt-1 text-xs text-gray-500">
                            Email cannot be changed after creation
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="mobileNumber"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Mobile Number
                        </label>
                        <input
                          type="text"
                          name="mobileNumber"
                          id="mobileNumber"
                          value={formData.mobileNumber}
                          onChange={handleInputChange}
                          className="mt-2 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border rounded-md"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Assignments
                        </label>

                        <div className="mb-2">
                          <div className="flex space-x-2">
                            <div className="w-1/2">
                              <label htmlFor="standard" className="sr-only">
                                Standard
                              </label>
                              <div className="relative">
                                <select
                                  name="standard"
                                  id="standard"
                                  value={tempAssignment.standard}
                                  onChange={handleTempAssignmentChange}
                                  className="block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                  <option value="">Select Standard</option>
                                  {standards.map((std) => (
                                    <option key={std} value={std}>
                                      {std}
                                    </option>
                                  ))}
                                </select>
                                
                              </div>
                            </div>

                            <div className="w-1/2">
                              <label htmlFor="subject" className="sr-only">
                                Subject
                              </label>
                              <div className="relative">
                                <select
                                  name="subject"
                                  id="subject"
                                  value={tempAssignment.subject}
                                  onChange={handleTempAssignmentChange}
                                  className="block w-full pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                >
                                  <option value="">Select Subject</option>
                                  {subjects.map((subj) => (
                                    <option key={subj} value={subj}>
                                      {subj}
                                    </option>
                                  ))}
                                </select>
                                
                              </div>
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={addAssignment}
                            className="mt-2 w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Add Assignment
                          </button>
                        </div>

                        {formData.assignments.length > 0 ? (
                          <div className="space-y-2">
                            {formData.assignments.map((assignment, index) => (
                              <div
                                key={index}
                                className="flex justify-between items-center p-2 bg-gray-50 rounded-md"
                              >
                                <span>
                                  {assignment.standard} - {assignment.subject}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => removeAssignment(index)}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500 text-center py-2">
                            No assignments added
                          </p>
                        )}
                      </div>
                    </form>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      onClick={
                        modalType === "add"
                          ? handleCreateTeacher
                          : handleUpdateTeacher
                      }
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      {modalType === "add"
                        ? "Create Teacher"
                        : "Update Teacher"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowModal(false)}
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {showToast && (
        <div className="fixed bottom-5 right-5 flex items-center p-4 mb-4 w-full max-w-xs rounded-lg shadow-lg">
          <div
            className={`inline-flex flex-shrink-0 justify-center items-center w-8 h-8 rounded-lg ${
              toastType === "success"
                ? "bg-green-100 text-green-500"
                : "bg-red-100 text-red-500"
            }`}
          >
            {toastType === "success" ? (
              <Check className="w-5 h-5" />
            ) : (
              <AlertCircle className="w-5 h-5" />
            )}
          </div>
          <div className="ml-3 text-sm font-normal">{toastMessage}</div>
          <button
            type="button"
            className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg p-1.5 hover:bg-gray-100 inline-flex h-8 w-8"
            onClick={() => setShowToast(false)}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
