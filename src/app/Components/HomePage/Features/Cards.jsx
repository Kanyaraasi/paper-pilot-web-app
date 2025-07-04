import React from "react";
import { useTheme } from "@/contexts/ThemeContext";

// Feature card component with proper image handling
const FeatureCard = ({ image, title, description, accent = "blue", themeClasses }) => {
  const accentColors = {
    blue: themeClasses.iconAccent,
    orange: "text-orange-500",
    yellow: "text-yellow-500",
  };

  return (
    <div className={`${themeClasses.cardBackground} rounded-lg p-8 border shadow-sm hover:shadow-md transition-shadow duration-300`}>
      <div className="mb-6">
        <div className="relative">
          <img src={image} alt={title} className="w-16 h-16 object-contain" />
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full"></div>
          <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-blue-300 rounded-full"></div>
        </div>
      </div>

      <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4`}>{title}</h3>
      <p className={`${themeClasses.textSecondary} leading-relaxed`}>{description}</p>
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
  const { theme } = useTheme();

  const getThemeClasses = () => {
    const isDark = theme === 'dark';
    return {
      pageBackground: isDark ? 'bg-gray-900' : 'bg-gray-50',
      cardBackground: isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200',
      cardHeader: isDark ? 'border-gray-700' : 'border-gray-200',
      textPrimary: isDark ? 'text-gray-100' : 'text-gray-900',
      textSecondary: isDark ? 'text-gray-300' : 'text-gray-600',
      textMuted: isDark ? 'text-gray-400' : 'text-gray-500',
      inputBase: isDark ? 'bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400 focus:border-blue-400 focus:ring-blue-400' : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500',
      inputError: isDark ? 'border-red-400 bg-red-900/20' : 'border-red-300 bg-red-50',
      buttonPrimary: isDark ? 'bg-blue-600 hover:bg-blue-700 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white',
      buttonSecondary: isDark ? 'border-gray-600 text-gray-300 hover:bg-gray-700' : 'border-gray-300 text-gray-700 hover:bg-gray-50',
      buttonBack: isDark ? 'bg-gray-700 hover:bg-gray-600 text-gray-300' : 'bg-gray-100 hover:bg-gray-200 text-gray-600',
      subjectCard: isDark ? 'border-gray-600 bg-gray-700 hover:bg-gray-600' : 'border-gray-200 bg-white hover:bg-gray-50',
      subjectCardSelected: isDark ? 'border-blue-400 bg-blue-900/30 ring-blue-400' : 'border-blue-300 bg-blue-50 ring-blue-200',
      subjectCardHover: isDark ? 'hover:border-gray-500' : 'hover:border-gray-300',
      alertInfo: isDark ? 'bg-blue-900/30 border-blue-700 text-blue-200' : 'bg-blue-50 border-blue-200 text-blue-700',
      alertError: isDark ? 'bg-red-900/30 border-red-700 text-red-200' : 'bg-red-50 border-red-200 text-red-600',
      iconAccent: isDark ? 'text-blue-400' : 'text-blue-600',
      iconSuccess: isDark ? 'text-green-400' : 'text-green-600',
      iconError: isDark ? 'text-red-400' : 'text-red-600',
      gradientBg: isDark ? 'bg-gradient-to-br from-blue-900/20 to-purple-900/20' : 'bg-gradient-to-br from-blue-100 to-purple-100',
    };
  };

  const themeClasses = getThemeClasses();

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
    <div className={`min-h-screen ${themeClasses.pageBackground} py-12 px-4`}>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            image={images.saving}
            title="Save Time"
            description="Discover how PaperPilot reduces hours of question paper preparation into minutes, letting teachers focus more on students and less on paperwork."
            accent="blue"
            themeClasses={themeClasses}
          />

          <FeatureCard
            image={images.webdesign}
            title="Fully Customizable Papers"
            description="Whether it's marks distribution, number of questions, or layout—PaperPilot gives you complete control over every detail."
            accent="orange"
            themeClasses={themeClasses}
          />

          <div className={`${themeClasses.cardBackground} rounded-lg p-8 border shadow-sm hover:shadow-md transition-shadow duration-300`}>
            <div className="mb-6">
              <div className="relative">
                <img
                  src={images.pdf}
                  alt="PDF Format"
                  className="w-16 h-16 object-contain mb-4"
                />
              </div>
            </div>

            <h3 className={`text-xl font-bold ${themeClasses.textPrimary} mb-4`}>
              Start From Any Format
            </h3>
            <p className={`${themeClasses.textSecondary} leading-relaxed`}>
              That's why we built a platform that delivers fully customizable question papers, designed to match your exact teaching goals, exam formats, and curriculum standards.
            </p>
          </div>

          {/* Make Tests on Any Device */}
          <FeatureCard
            image={images.textbooks}
            title=" All Subjects Covered"
            description="We're talking about complete coverage, from core academics to optional subjects, across grades and boards.  PaperPilot supports your subject, your syllabus, your way."
            accent="blue"
            themeClasses={themeClasses}
          />

          {/* High Quality */}
          <FeatureCard
            image={images.quality}
            title="Fully Customizable Papers"
            description="Whether it's marks distribution, number of questions, or layout—PaperPilot gives you complete control over every detail."
            accent="orange"
            themeClasses={themeClasses}
          />

          {/* Professional Development */}
          <FeatureCard
            image={images.professionaldevelopment}
            title="Professional Format"
            description="Tailor question papers to your specific curriculum, difficulty level, and format requirements with ease."
            accent="yellow"
            themeClasses={themeClasses}
          />
        </div>
      </div>
    </div>
  );
}