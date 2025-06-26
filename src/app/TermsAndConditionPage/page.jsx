'use client'
import React from 'react';
import { ArrowLeft, FileText } from 'lucide-react';
import Link from 'next/link';

const page = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Terms of Service</h1>
            <div className="w-32"></div> {/* Empty div for flex spacing */}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 md:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Question Bank Dashboard Terms of Service</h2>
                <p className="text-gray-500 text-sm">Last updated: April 10, 2025</p>
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p>Welcome to the Question Bank Dashboard. By accessing or using our service, you agree to be bound by these Terms of Service. Please read them carefully.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">1. Acceptance of Terms</h3>
              <p>By accessing or using the Question Bank Dashboard, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this service.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">2. Use License</h3>
              <p>Permission is granted to temporarily use the Question Bank Dashboard for personal, educational, or commercial purposes, according to your subscription plan. This is the grant of a license, not a transfer of title, and under this license you may not:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Modify or copy the materials except as specifically allowed by your subscription plan;</li>
                <li>Use the materials for any commercial purpose beyond what is specifically allowed by your subscription plan;</li>
                <li>Attempt to decompile or reverse engineer any software contained in the Question Bank Dashboard;</li>
                <li>Remove any copyright or other proprietary notations from the materials; or</li>
                <li>Transfer the materials to another person or "mirror" the materials on any other server.</li>
              </ul>
              <p>This license shall automatically terminate if you violate any of these restrictions and may be terminated by Question Bank Dashboard at any time.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">3. Content Ownership</h3>
              <p>The questions, answers, and other content that you create using the Question Bank Dashboard are your own intellectual property. However, by using our service, you grant us a non-exclusive, worldwide, royalty-free license to use, reproduce, and display such content solely for the purpose of providing and improving our services.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">4. Privacy Policy</h3>
              <p>Your use of the Question Bank Dashboard is also governed by our Privacy Policy, which can be found <Link href="/privacy" className="text-blue-600 hover:text-blue-800">here</Link>.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">5. Disclaimer</h3>
              <p>The materials on the Question Bank Dashboard are provided on an 'as is' basis. Question Bank Dashboard makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.</p>
              
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">6. Governing Law</h3>
              <p>These terms and conditions are governed by and construed in accordance with the laws of your jurisdiction and you irrevocably submit to the exclusive jurisdiction of the courts in that location.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">7. Contact Information</h3>
              <p>If you have any questions about these Terms of Service, please contact us at:</p>
              <p>Email: <a href="mailto:legal@questionbank.com" className="text-blue-600 hover:text-blue-800">legal@questionbank.com</a><br />
              Phone: 1-800-555-1234<br />
              Address: 123 Education Lane, Suite 500, Academic City, AC 12345</p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 flex justify-center">
          <Link href="/" className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>
      </main>

      {/* Footer */}
     
    </div>
  );
};

export default page;