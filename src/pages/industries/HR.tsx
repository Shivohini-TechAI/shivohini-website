import React from "react";
import IndustryTemplate from "./IndustryTemplate";
// import hrImage from "../../assets/industry/HR.png";

const HR: React.FC = () => {
  const features = [
    { title: "Recruitment Automation", description: "AI-assisted candidate sourcing and screening." },
    { title: "Employee Analytics", description: "Track performance and engagement using AI." },
    { title: "Training & Development", description: "Personalized AI learning paths for employees." },
  ];

  return (
    <IndustryTemplate
     industryTitle="HR Industry — AI Agent"
      description="Automating HR operations and enhancing employee experience with AI-driven tools."
      // image={hrImage}
      features={features}
    />
  );
};

export default HR;
