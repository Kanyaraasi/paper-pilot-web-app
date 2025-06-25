'use client'
import React from 'react';
import { ArrowLeft, Lock, Shield, Key, UserCheck, Clock, Database, AlertTriangle } from 'lucide-react';
import Link from 'next/link';

const PrivacyPage = () => {
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
            <h1 className="text-2xl md:text-3xl font-bold text-white">Privacy Policy</h1>
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
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-lg font-semibold text-gray-800">Privacy Policy</h2>
                <p className="text-gray-500 text-sm">Last updated: April 15, 2025</p>
              </div>
            </div>
            
            <div className="prose max-w-none text-gray-700">
              <p>At Question Bank Dashboard, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Question Bank Dashboard service.</p>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <Shield className="h-5 w-5 mr-2 text-blue-600" />
                Information We Collect
              </h3>
              <p>We collect several types of information from and about users of our website, including:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>Personal Data:</strong> Name, email address, phone number, and billing information when you register for an account.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, such as the questions you create, edit, or delete.</li>
                <li><strong>Technical Data:</strong> IP address, browser type, operating system, and other technology on the devices you use to access our website.</li>
                <li><strong>Cookies Data:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
              </ul>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <Database className="h-5 w-5 mr-2 text-blue-600" />
                How We Use Your Information
              </h3>
              <p>We may use the information we collect from you for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Process your transactions and manage your account</li>
                <li>Send you technical notices, updates, security alerts, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze trends, usage, and activities in connection with our website</li>
                <li>Develop new products and services</li>
                <li>Personalize your experience by delivering content and product offerings relevant to your interests</li>
              </ul>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                Information Sharing and Disclosure
              </h3>
              <p>We may share your information in the following situations:</p>
              <ul className="list-disc pl-6 mb-4">
                <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.</li>
                <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business to another company.</li>
                <li><strong>With Your Consent:</strong> We may disclose your personal information for any other purpose with your consent.</li>
                <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
              </ul>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <Key className="h-5 w-5 mr-2 text-blue-600" />
                Data Security
              </h3>
              <p>We have implemented appropriate technical and organizational security measures designed to protect the security of any personal information we process. However, despite our safeguards and efforts to secure your information, no electronic transmission over the Internet or information storage technology can be guaranteed to be 100% secure.</p>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <Clock className="h-5 w-5 mr-2 text-blue-600" />
                Data Retention
              </h3>
              <p>We will only keep your personal information for as long as it is necessary for the purposes set out in this Privacy Policy, unless a longer retention period is required or permitted by law. No purpose in this policy will require us keeping your personal information for longer than the period of time in which users have an account with us.</p>
              
              <h3 className="flex items-center text-lg font-medium text-gray-900 mt-6 mb-3">
                <AlertTriangle className="h-5 w-5 mr-2 text-blue-600" />
                Your Privacy Rights
              </h3>
              <p>Depending on your location, you may have certain rights regarding your personal information, such as:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>The right to access personal information we hold about you</li>
                <li>The right to request correction of your personal information</li>
                <li>The right to request deletion of your personal information</li>
                <li>The right to object to processing of your personal information</li>
                <li>The right to data portability</li>
                <li>The right to withdraw consent</li>
              </ul>
              <p>To exercise these rights, please contact us using the contact information provided below.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Changes to This Privacy Policy</h3>
              <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date at the top. You are advised to review this Privacy Policy periodically for any changes.</p>
              
              <h3 className="text-lg font-medium text-gray-900 mt-6 mb-3">Contact Us</h3>
              <p>If you have any questions or concerns about this Privacy Policy, please contact us at:</p>
              <p>Email: <a href="mailto:privacy@questionbank.com" className="text-blue-600 hover:text-blue-800">privacy@questionbank.com</a></p>
              <p>Phone: <a href="tel:+1-800-123-4567" className="text-blue-600 hover:text-blue-800">+1-800-123-4567</a></p>
              <p>Address: Question Bank Inc., 1234 Dashboard Street, Suite 500, San Francisco, CA 94107, USA</p>
              
              
             
            </div>
          </div>
          
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">© 2025 Question Bank Dashboard. All rights reserved.</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;