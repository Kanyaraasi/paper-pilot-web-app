import React from "react";

// Feature card component with proper image handling
const FeatureCard = ({ image, title, description, accent = "blue" }) => {
  const accentColors = {
    blue: "text-blue-500",
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  return (
    <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="mb-6">
        <div className="relative">
          <img src={image} alt={title} className="w-16 h-16 object-contain" />
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
  <div
    className={`inline-flex items-center justify-center w-8 h-6 ${color} text-white text-xs font-bold rounded mr-2 mb-2`}
  >
    {type}
  </div>
);

export default function FeatureShowcase() {
  // Since we can't import actual images in this environment, I'll use placeholder URLs
  // Replace these with your actual image paths
  const images = {
    saving: "/saving.png",
    webdesign: "/web-design.png",
    quality: "/quality.png",
    pdf: "/pdf.png",
    textbooks: "/textbooks.png",
    professionaldevelopment: "/professionaldevelopment.png",
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            image={images.saving}
            title="Save Time"
            description="Discover how PaperPilot reduces hours of question paper preparation into minutes, letting teachers focus more on students and less on paperwork."
            accent="blue"
          />

          <FeatureCard
            image={images.webdesign}
            title="Fully Customizable Papers"
            description="Whether it’s marks distribution, number of questions, or layout—PaperPilot gives you complete control over every detail."
            accent="orange"
          />

          <div className="bg-white rounded-lg p-8 shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="mb-6">
              <div className="relative">
                <img
                  src={images.pdf}
                  alt="PDF Format"
                  className="w-16 h-16 object-contain mb-4"
                />
              </div>
            </div>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Start From Any Format
            </h3>
            <p className="text-gray-600 leading-relaxed">
              That’s why we built a platform that delivers fully customizable question papers, designed to match your exact teaching goals, exam formats, and curriculum standards.
            </p>
          </div>

          {/* Make Tests on Any Device */}
          <FeatureCard
            image={images.textbooks}
            title=" All Subjects Covered"
            description="We’re talking about complete coverage, from core academics to optional subjects, across grades and boards.  PaperPilot supports your subject, your syllabus, your way."
            accent="blue"
          />

          {/* High Quality */}
          <FeatureCard
            image={images.quality}
            title="Fully Customizable Papers"
            description="Whether it’s marks distribution, number of questions, or layout—PaperPilot gives you complete control over every detail."
            accent="orange"
          />

          {/* Professional Development */}
          <FeatureCard
            image={images.professionaldevelopment}
            title="Professional Format"
            description="Tailor question papers to your specific curriculum, difficulty level, and format requirements with ease."
            accent="yellow"
          />
        </div>
      </div>
    </div>
  );
}
