import React from 'react';
import { X, Phone, Mail } from 'lucide-react';

function ContactModal({ onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-xl p-8 w-full max-w-md mx-auto shadow-2xl relative">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
        >
          <X className="h-6 w-6" />
        </button>
        
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Contact Our Team</h3>
        <p className="text-gray-600 mb-8">Fill out the form below and we'll get back to you within 24 hours.</p>
        
        <form className="space-y-5">
          <div>
            <label htmlFor="contactName" className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="contactName"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your name"
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="contactEmail"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your email"
              required
            />
          </div>
          
          <div>
            <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="contactPhone"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="Your phone number"
            />
          </div>
          
          <div>
            <label htmlFor="contactMessage" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="contactMessage"
              rows="4"
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              placeholder="How can we help you?"
              required
            ></textarea>
          </div>
          
          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium transform hover:scale-105"
          >
            Send Message
          </button>
        </form>
        
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex items-center mb-4">
            <Phone className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">+91 98765 43210</span>
          </div>
          <div className="flex items-center">
            <Mail className="h-5 w-5 text-blue-600 mr-3" />
            <span className="text-gray-700">contact@paperpilot.edu</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactModal;