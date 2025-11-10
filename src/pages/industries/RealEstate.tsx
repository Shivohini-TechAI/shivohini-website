import React from "react";
import { Home, MapPin } from "lucide-react";

const RealEstate: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#06121b] via-[#083044] to-[#11405e] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-12 w-80 h-80 bg-teal-400/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-teal-400 to-cyan-500 rounded-full p-4 shadow-md mb-6">
          <Home className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Real Estate — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Property intelligence: market analysis, virtual tours, client matching and investment analytics.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Market Analysis","AI for pricing & trend forecasting."],
          ["Virtual Tours","Automated virtual walkthroughs."],
          ["Client Matching","Smart lead matching & CRM integration."],
          ["Investment Analytics","ROI & portfolio insights."],
          ["Property Valuation","Automated appraisal models."],
          ["Tenant Analytics","Predict churn and satisfaction."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-teal-200">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-teal-400 to-cyan-500 px-8 py-3 rounded-2xl font-semibold">
          Request Property Demo
        </button>
      </div>
    </section>
  );
};

export default RealEstate;
