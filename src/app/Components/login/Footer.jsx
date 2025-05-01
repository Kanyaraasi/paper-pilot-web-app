import React from 'react';
import { Mail, Phone } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/logo.jpg" 
                alt="PaperPilot Logo" 
                className="h-10 w-auto mr-3 rounded-md"
              />
              
            </div>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Helping educators create professional question papers quickly and efficiently.
            </p>
           
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-200">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="/" className="text-gray-400 hover:text-white transition-colors duration-300 block">Home</a></li>
              {/* <li><a href="#features" className="text-gray-400 hover:text-white transition-colors duration-300 block">Features</a></li> */}
              <li><a href="/HowItWork" className="text-gray-400 hover:text-white transition-colors duration-300 block">How It Works</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">Pricing</a></li> */}
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">About Us</a></li> */}
            </ul>
          </div>
          
          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-200">Resources</h3>
            <ul className="space-y-3">
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">Blog</a></li> */}
              <li><a href="/HowItWork" className="text-gray-400 hover:text-white transition-colors duration-300 block">Tutorials</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">FAQ</a></li> */}
              <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">Support</a></li>
              {/* <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300 block">Documentation</a></li> */}
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5 text-gray-200">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center text-gray-400 group">
                <Mail className="h-5 w-5 mr-2 group-hover:text-blue-400 transition-colors duration-300" />
                <a href="mailto:contact@paperpilot.edu" className="hover:text-white transition-colors duration-300">
                  paperpilott@gmail.com
                </a>
              </li>
              <li className="flex items-center text-gray-400 group">
                <Phone className="h-5 w-5 mr-2 group-hover:text-blue-400 transition-colors duration-300" />
                <a href="tel:+919876543210" className="hover:text-white transition-colors duration-300">
                  +91 9021951461
                </a>
              </li>
              
            </ul>
          </div>
        </div>
        
        <div className="mt-6 pt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
          <p>&copy; {currentYear} PaperPilot Education Technologies. All rights reserved.</p>
          <div className="mt-2 flex flex-wrap justify-center gap-6">
            <a href="/Privacy" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="/TermsAndCondition" className="text-gray-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="/Help" className="text-gray-400 hover:text-white transition-colors duration-300">Help</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;