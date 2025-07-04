import React from 'react';

// Dummy icon components
const DummyUpload = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded-lg flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">UP</span>
  </div>
);

const DummyStar = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded-full flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">★</span>
  </div>
);

const DummyFileText = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">FILE</span>
  </div>
);

const DummyMonitor = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">MON</span>
  </div>
);

const DummyUsers = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded-full flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">USR</span>
  </div>
);

const DummyLock = ({ className }) => (
  <div className={`${className} bg-gray-300 rounded flex items-center justify-center`}>
    <span className="text-xs font-bold text-gray-600">🔒</span>
  </div>
);

const FeatureCard = ({ icon: Icon, title, description, accent = "blue" }) => {
  const accentColors = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500"
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-6">
        <div className="relative">
          <Icon className={`w-12 h-12 ${accentColors[accent]} mb-4`} />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-300 rounded-full"></div>
        </div>
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
};

const FileTypeIcon = ({ type, color }) => (
  <div className={`inline-flex items-center justify-center w-8 h-6 ${color} text-white text-xs font-bold rounded mr-2 mb-2`}>
    {type}
  </div>
);

export default function FeatureShowcase() {
  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Effortless Test Creation */}
          <FeatureCard
            icon={DummyUpload}
            title="Save Time"
            description="Instantly generate questions from your PDF– no signup required. Simply upload your file and let our AI do the work."
            accent="blue"
          />

          {/* Intuitive Interface */}
          <FeatureCard
            icon={DummyStar}
            title="Intuitive Interface"
            description="Smallpdf is simple and intuitive to use. There is no learning curve, so you can focus on studying for your quiz or grading those tests."
            accent="orange"
          />

          {/* Start From Any Format */}
          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="relative">
                <DummyFileText className="w-12 h-12 text-yellow-500 mb-4" />
                <div className="flex flex-wrap mt-2">
                  
                  <FileTypeIcon type="PDF" color="bg-red-500" />
                  
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold text-gray-800 mb-4">Start From Any Format</h3>
            <p className="text-gray-600 leading-relaxed">
              Need to create questions from a Word document or an image file? No problem. Our AI test generator can also create questions from DOC, PPT, Excel, JPG, PNG, and more.
            </p>
          </div>

          {/* Make Tests on Any Device */}
          <FeatureCard
            icon={DummyMonitor}
            title="Save Time"
            description="Create comprehensive question papers in minutes instead of hours. Focus more on teaching, less on paperwork."
            accent="blue"
          />

          {/* Interactive Learning */}
          <FeatureCard
            icon={DummyUsers}
            title="High Quality"
            description="Generate beautifully formatted question papers with proper layout, numbering, and marking schemes."
            accent="orange"
          />

          {/* Secure & Private */}
          <FeatureCard
            icon={DummyLock}
            title="Fully Customizable"
            description="Tailor question papers to your specific curriculum, difficulty level, and format requirements with ease."
            accent="yellow"
          />

        </div>
      </div>
    </div>
  );
}