'use client'
import React from 'react';
import { ArrowLeft, Search, HelpCircle, BookOpen, MessageCircle, FileText } from 'lucide-react';
import Link from 'next/link';

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-indigo-400 to-blue-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center text-white font-medium hover:text-blue-100">
              <ArrowLeft size={18} className="mr-2" />
              Back to Dashboard
            </Link>
            <h1 className="text-2xl md:text-3xl font-bold text-white">Help Center</h1>
            <div className="w-32"></div> {/* Empty div for flex spacing */}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search for help topics..."
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 bg-white text-gray-800 placeholder-gray-500 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Getting Started */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Getting Started</h2>
              <p className="text-gray-600 mb-4">Learn the basics of using the Question Bank Dashboard, including navigation and creating your first question.</p>
              <div className="space-y-3">
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Dashboard overview
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Creating questions
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Using filters and search
                </Link>
              </div>
            </div>
          </div>

          {/* Question Management */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Question Management</h2>
              <p className="text-gray-600 mb-4">Learn how to organize, edit, and manage your question bank effectively.</p>
              <div className="space-y-3">
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Bulk editing questions
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Tags and categorization
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Import and export
                </Link>
              </div>
            </div>
          </div>

          {/* Support & Troubleshooting */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                <HelpCircle className="h-6 w-6 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Support & Troubleshooting</h2>
              <p className="text-gray-600 mb-4">Having issues? Find solutions to common problems and get support when needed.</p>
              <div className="space-y-3">
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Common issues
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Contact support
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • System requirements
                </Link>
              </div>
            </div>
          </div>

          {/* FAQ */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center mb-4">
                <MessageCircle className="h-6 w-6 text-amber-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-4">Quick answers to the most common questions about using the Question Bank.</p>
              
              <div className="space-y-4 mt-6">
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How do I reset my password?</h3>
                  <p className="text-gray-600">Visit the login page and click on "Forgot Password". Enter your registered email to receive a password reset link.</p>
                </div>
                
                <div className="border-b border-gray-200 pb-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Can I export questions to Word or PDF?</h3>
                  <p className="text-gray-600">Yes, you can export your questions to various formats including Word, PDF, and Excel. Use the Export button in the toolbar.</p>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">How many questions can I store?</h3>
                  <p className="text-gray-600">Free accounts can store up to 500 questions. Premium accounts have unlimited storage.</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Video Tutorials */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="23 7 16 12 23 17 23 7" />
                  <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Video Tutorials</h2>
              <p className="text-gray-600 mb-4">Watch step-by-step tutorials on how to use all features of the Question Bank Dashboard.</p>
              
              <div className="space-y-3">
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Getting started (3:24)
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Advanced filtering (5:12)
                </Link>
                <Link href="#" className="block text-blue-600 hover:text-blue-800 hover:underline">
                  • Creating custom question types (7:45)
                </Link>
              </div>
            </div>
          </div>
          
          {/* Contact Us */}
          <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow text-white">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">Need Further Assistance?</h2>
              <p className="mb-6 text-blue-100">Our support team is available to help you with any questions or issues.</p>
              
              <div className="space-y-4">
                <a href="mailto:support@questionbank.com" className="flex items-center text-white hover:text-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                  support@questionbank.com
                </a>
                
                <a href="tel:+18005551234" className="flex items-center text-white hover:text-blue-100">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  1-800-555-1234
                </a>
                
                <button className="w-full bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
                  Submit a Support Ticket
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-gray-500">
              © 2025 Question Bank Dashboard. All rights reserved.
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/Help" className="text-blue-600 hover:text-blue-800 text-sm">Help</Link>
              <Link href="/TermsAndCondition" className="text-gray-500 hover:text-gray-700 text-sm">Terms</Link>
              <Link href="/Privacy" className="text-gray-500 hover:text-gray-700 text-sm">Privacy</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );    
};

export default HelpPage;