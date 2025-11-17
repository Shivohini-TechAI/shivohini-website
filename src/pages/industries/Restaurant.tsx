import React from "react";
import IndustryTemplate from "./IndustryTemplate";
// import restaurantImage from "../../assets/industry/restaurant.png";

const Restaurant: React.FC = () => {
  const features = [
    { title: "AI Menu Recommendations", description: "Personalized dish recommendations to guests." },
    { title: "Inventory Optimization", description: "Automated stock management and waste reduction." },
    { title: "Dynamic Pricing", description: "Adjust prices based on demand and customer behavior." },
  ];

  return (
    <IndustryTemplate
     industryTitle="Restaurant Industry — AI Agent"
      description="Enhancing guest experience and operational efficiency with AI-driven solutions for restaurants."
      // image={restaurantImage}
      features={features}
    />
  );
};

export default Restaurant;
