import React from "react";
import { Utensils, Coffee } from "lucide-react";

const Restaurant: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#081027] via-[#082f3f] to-[#0b3f7a] text-white py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-8 left-12 w-72 h-72 bg-rose-500/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-pink-500 rounded-full p-4 shadow-md mb-6">
          <Utensils className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Restaurant Solutions — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Improve dine-in & delivery operations with menu optimization, order routing, kitchen automation and customer analytics.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Menu Optimization", "Personalize menus based on preferences & demand."],
          ["Order Management", "Intelligent order routing and real-time status."],
          ["Kitchen Automation", "Improve throughput and reduce errors."],
          ["Customer Analytics", "Track behaviour & recommend upsells."],
          ["Waste Reduction", "Forecasting to minimize food waste."],
          ["Reservation Smart Routing", "Optimize seating and wait-times."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10 hover:shadow-[0_8px_40px_rgba(219,39,119,0.06)] transition">
            <div className="mb-3 text-lg font-semibold text-pink-200">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-rose-500 to-fuchsia-500 px-8 py-3 rounded-2xl font-semibold shadow hover:scale-105 transition">
          Speak with Restaurant Expert
        </button>
      </div>
    </section>
  );
};

export default Restaurant;
