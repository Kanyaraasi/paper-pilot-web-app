"use client";
import React, { useState } from "react";
import {
  Bell,
  Search,
  Plus,
  Filter,
  CheckCircle,
  Bookmark,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
 
  User,
} from "lucide-react";
import Link from "next/link";
import Footer from "../Footer/page";

const TestDashboard = () => {
  const [selectedTest, setSelectedTest] = useState(null);

  const testData = [
    {
      id: 1,
      name: "Physics",
      subject: "Science",
      board: "Maharashtra State Board",
      medium: "English",
      standard: "XII",
      questions: 45,
      duration: "3h",
      status: "history",
      
      completed: 89,
 
    },
    {
      id: 2,
      name: "Chemistry",
      subject: "Science",
      board: "Maharashtra State Board",
      medium: "English",
      standard: "XII",
      questions: 40,
      duration: "2.5h",
      status: "saved",
      
      completed: 67,
    
    },
    {
      id: 3,
      name: "Biology",
      subject: "Science",
      board: "Maharashtra State Board",
      medium: "English",
      standard: "XII",
      questions: 50,
      duration: "3h",
      status: "history",
      
      completed: 189,
   
    },
   
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "history":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "saved":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "history":
        return <CheckCircle className="h-3 w-3" />;
      case "saved":
        return <Bookmark className="h-3 w-3 fill-current" />;
      default:
        return <CheckCircle className="h-3 w-3" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-sky-600 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">P</span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Paper Pilot</h1>
                  <p className="text-sm text-gray-500">
                    Manage your test assessments
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search tests..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 w-64"
                />
              </div>
              <button className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                <Bell className="h-5 w-5" />
              </button>
              <div className="w-8 h-8 bg-gradient-to-br from-sky-400 to-sky-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium"><User/></span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Tests</h2>
          <p className="mt-2 text-gray-600">
            Create, manage, and track your examination question papers
          </p>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-3">
            <Link href={'/TestCreationFlow'}>
              <button className="bg-sky-600 hover:bg-sky-700 text-white px-6 py-3 rounded-lg flex items-center space-x-2 transition-colors shadow-sm">
                <Plus className="h-4 w-4" />
                <span className="font-medium">Create Test</span>
              </button>
            </Link>
          </div>
          <div className="flex items-center space-x-3">
            <button className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Test List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900">
              Exam Question Paper Management
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              View and manage your saved drafts and examination history
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Test Name
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Questions
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  
                
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {testData.map((test) => (
                  <tr key={test.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {test.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {test.board} • {test.standard} • {test.medium}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.subject}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.questions}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {test.duration}
                    </td>
                   
                   
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button className="text-sky-600 hover:text-sky-900 p-1.5 rounded-md hover:bg-sky-50 transition-colors">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-50 transition-colors">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors">
                          <Trash2 className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-50 transition-colors">
                          <MoreHorizontal className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      
       
      </main>
       <Footer/>
    </div>
  );
};

export default TestDashboard;
