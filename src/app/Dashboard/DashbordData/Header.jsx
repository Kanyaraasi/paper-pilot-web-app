'use client'
import React, { useState, useRef, useEffect } from 'react';

import { Settings, HelpCircle, LogOut, ChevronLeft, PlusCircle, Download, Save } from "lucide-react";
import Buttoncard from '../button';
import Link from 'next/link';

const Header = ({  onAddNew }) => {

  const [isOpen, setIsOpen] = useState(false);
 
  const [showPaperModal, setShowPaperModal] = useState(false);
 
  const [showTooltip, setShowTooltip] = useState(false);

  
  const dropdownRef = useRef(null);
  const modalRef = useRef(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
      
      if (showPaperModal && modalRef.current && !modalRef.current.contains(event.target)) {
        setShowPaperModal(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPaperModal]);
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center px-4 py-3">
        <div className='flex items-center gap-1'>
          <div className="relative">
            <Link href="/GradeSelector" className="mt-1 inline-block relative">
              <button 
                className="p-2 rounded-md"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <ChevronLeft size={20} />
              </button>
              
              {showTooltip && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-gray-800 text-white text-xs rounded whitespace-nowrap z-50">
                  Back
                </div>
              )}
            </Link>
          </div>
          
          <h1 className="text-xl font-semibold text-gray-800 flex items-center">
            Question Bank (English)
          </h1>
        </div>
        
        <div className="ml-auto flex items-center gap-3">
          <Buttoncard text={"Genrate the question paper"}/>
          
          
          
          <button 
            onClick={onAddNew}
            className="bg-purple-600 text-white flex items-center gap-1 px-3 py-1.5 rounded-md text-sm hover:bg-purple-700 transition-all font-medium"
          >
            <PlusCircle size={15} />
            Add New
          </button>
          
          <div className="relative" ref={dropdownRef}>
            <button 
              className="text-gray-500 hover:text-gray-700 transition-colors p-2 rounded-full hover:bg-gray-100"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Settings"
            >
              <Settings size={18} />  
            </button>
            
            {isOpen && (
              <div className="absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                <div className="py-1">
                  <div className="px-4 py-2 text-sm font-medium text-gray-700 border-b">
                    Settings
                  </div>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <Save size={16} className="mr-3" />
                    <span>Saved Question Paper</span>
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <a href="HowItWork" className='flex  items-center'>
                    <Download size={16} className="mr-3" />
                    <span>History Download Paper</span>
                    </a>
                  </button>
                  
                  <div className="border-t border-gray-100"></div>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    <a href="/Help" className='flex  items-center'>
                    <HelpCircle size={16} className="mr-3" />
                    <span>Help & Support</span>
                    </a>
                  </button>
                  
                  <button className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                    <LogOut size={16} className="mr-3" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

     
    </header>
  );
};

export default Header;
