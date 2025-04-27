import React, { createContext, useContext, useState } from 'react';

const QuestionBankContext = createContext();

export const QuestionBankProvider = ({ children }) => {
  const [showSidebar, setShowSidebar] = useState(true);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <QuestionBankContext.Provider value={{ showSidebar, toggleSidebar }}>
      {children}
    </QuestionBankContext.Provider>
  );
};

export const useQuestionBank = () => {
  const context = useContext(QuestionBankContext);
 
  return context;
};