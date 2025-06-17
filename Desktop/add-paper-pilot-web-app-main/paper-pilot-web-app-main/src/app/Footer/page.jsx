'use client'
import React from 'react';
import Link from 'next/link';
import {  Mail, Heart } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className=" border-t bg-[#040a1a] ">
      <div className="max-w-7xl mx-auto py-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex justify-center md:justify-start space-x-6">
            
            <Link 
              href="/"
              className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 flex items-center justify-center gap-3"
              aria-label="Email"
            >
              <Mail size={20} /> @paperpilott@gmail.com
            </Link>
          </div>
          
          <div className="mt-8 md:mt-0">
            <p className="text-center md:text-right text-base text-gray-400 dark:text-gray-500">
              &copy; {currentYear} paperpilott. All rights reserved.
            </p>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <div className="md:flex md:items-center md:justify-between">
            <div className="flex justify-center md:justify-start space-x-6">
             
              <Link href="/Privacy" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                Privacy
              </Link>
              <Link href="/TermsAndCondition" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                Terms
              </Link>
              <Link href="/HowItWork" className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200">
                How It Works
              </Link>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center justify-center md:justify-end">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> for Teacher's
              </span>
            </div>
          </div>
        </div>

        
      </div>
    </footer>
  );
};

export default Footer;