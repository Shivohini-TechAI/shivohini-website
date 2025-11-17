import React from "react";
import IndustryTemplate from "./IndustryTemplate";
// import realEstateImage from "../../assets/industry/real-estate.png";

const RealEstate: React.FC = () => {
  const features = [
    { title: "Property Analysis", description: "AI-driven valuation and market prediction." },
    { title: "Virtual Tours", description: "Interactive virtual property exploration." },
    { title: "Client Matching", description: "Match buyers and sellers intelligently." },
  ];

  return (
    <IndustryTemplate
      industryTitle="Real Estate Industry — AI Agent"
      description="Transforming property management, sales, and client engagement with AI solutions."
      // image={realEstateImage}
      features={features}
    />
  );
};

export default RealEstate;
