import React from "react";

const HowItWorkPage = () => {
  return (
    <div className="w-[100%] bg-gray-50 flex items-center justify-center h-[100vh]">
      <div className=" w-[100%] bg-white rounded-2xl shadow-lg overflow-hidden h-[100vh]">
        <div className="flex flex-col lg:flex-row">
          {/* Left Container - Image */}
          <div className="lg:w-1/2 bg-gradient-to-br from-blue-50 to-purple-50 p-8 flex items-center justify-center relative">
            

            
            <div className="relative">
           
              <div className="relative w-64 h-64 bg-gradient-to-br from-amber-100 to-orange-200 rounded-full flex items-center justify-center">
                
                <div className="text-center flex gap-2">
                  <div className="text-2xl font-bold text-gray-700 mb-1">
                    Paper
                  </div>
                  <div className="text-2xl font-bold text-blue-600">Pilot</div>
                </div>
              </div>

              {/* Number cards */}
              <div className="absolute -top-4 -left-8 w-16 h-12 bg-red-500 rounded-lg flex items-center justify-center shadow-lg transform -rotate-12">
                <span className="text-white text-2xl font-bold">1</span>
              </div>
              <div className="absolute -top-8 left-20 w-16 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-6">
                <span className="text-white text-2xl font-bold">2</span>
              </div>
              <div className="absolute -top-2 right-8 w-16 h-12 bg-green-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
                <span className="text-white text-2xl font-bold">3</span>
              </div>
              <div className="absolute top-14 -right-8 w-16 h-12 bg-purple-500 rounded-lg flex items-center justify-center shadow-lg transform rotate-12">
                <span className="text-white text-2xl font-bold">4</span>
              </div>
            </div>
          </div>


          <div className="w-[50%] h-[100vh] p-8 lg:p-16 flex justify-start items-center ">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Four Simple Steps
              </h2>
              <p className="text-gray-600 mb-8">
                Follow these steps to create your papers.
              </p>

              <div className="space-y-2">
           
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 ">
                      Login is compulsory to access the system.
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Each user will receive a unique and secure key ID after
                      successful authentication, ensuring data privacy and
                      security.
                    </p>
                  </div>
                </div>

        
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800 ">
                      Fill Proper Details
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Enter all details correctly such as selecting the grade,
                      subject, and exam details.
                    </p>
                  </div>
                </div>

       
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800  leading-tight">
                      Please select the questions you need. You also have the
                      option to add new questions.
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Based on the selected class, subject, and exam type, you
                      can filter and choose questions like fill-ups, match the
                      pair, one-sentence answers, answer in brief, etc.
                    </p>
                  </div>
                </div>

         
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">
                      Create and Download Question Paper
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      There will be two download options: download only the
                      questions or download the questions with their answers.
                      Printing is also available.
                    </p>
                  </div>
                </div>
              </div>

     
              <a href='/TestHistorySavedDashboard' >
                <button className="group px-8 py-4 mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105 duration-300 flex items-center justify-center">
                  <span>Start Creating Papers</span>
                  <svg className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
                
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorkPage;