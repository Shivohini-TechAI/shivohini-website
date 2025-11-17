import React from "react";
import IndustryTemplate from "./IndustryTemplate";
// import educationImage from "../../assets/industry/education.png";

const Education: React.FC = () => {
  const features = [
    { title: "Personalized Learning", description: "Tailored study plans and resources for students." },
    { title: "AI Grading & Assessment", description: "Automated grading and analytics for teachers." },
    { title: "Virtual Tutors", description: "Interactive AI tutors for 24/7 assistance." },
  ];

  return (
    <IndustryTemplate
     industryTitle="Education Industry — AI Agent"
      description="Enhancing teaching and learning with AI-driven personalized and automated solutions."
      // image={educationImage}
      features={features}
    />
  );
};

export default Education;
