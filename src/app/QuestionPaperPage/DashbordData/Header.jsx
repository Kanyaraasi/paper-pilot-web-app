'use client'
import React from 'react';
import { useContext } from 'react';
import {useQuestionBank} from './Context/QuestionBankContext'
import { Download, PlusCircle, Settings, ChevronLeft, ChevronRight } from 'lucide-react';

const Header = ({ onAddNew, selectedCount }) => {
  const { showSidebar, toggleSidebar } = useQuestionBank(useContext);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="flex items-center px-4 py-3">
        <a href="/">
         <button>
          <ChevronLeft size={20}/>
         </button>
        </a>
        
        <h1 className="text-xl font-semibold text-gray-800 flex items-center">
          Question Bank
         
        </h1>
        
        <div className="ml-auto flex items-center gap-3">
          <button 
            className="bg-green-500 text-white flex items-center gap-1 px-3 py-1.5 rounded-md text-sm hover:bg-green-600 transition-all font-medium"
          >
            <Download size={15} />
            Save ({selectedCount})
          </button>
          
          <button 
            onClick={onAddNew}
            className="bg-purple-600 text-white flex items-center gap-1 px-3 py-1.5 rounded-md text-sm hover:bg-purple-700 transition-all font-medium"
          >
            <PlusCircle size={15} />
            Add New
          </button>
          
          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Settings size={18} />  
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;