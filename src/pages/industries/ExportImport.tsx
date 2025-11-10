import React from "react";
import { Plane, Box } from "lucide-react";

const ExportImport: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#071226] via-[#0a2b3a] to-[#16425a] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 right-8 w-80 h-80 bg-violet-500/6 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-4 shadow-md mb-6">
          <Plane className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Export & Import — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Intelligent logistics: documentation automation, route optimization, risk analytics and trade insights.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Docs Automation","Auto-fill, validate & track shipments."],
          ["Supply Chain Opt.","Optimize routes & reduce delays."],
          ["Risk Assessment","AI-based compliance & risk scanning."],
          ["Trade Analytics","Market demand forecasting."],
          ["Customs Optimization","Reduce clearance times."],
          ["Real-time Tracking","End-to-end visibility."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-violet-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 px-8 py-3 rounded-2xl font-semibold">
          Schedule Logistics Call
        </button>
      </div>
    </section>
  );
};

export default ExportImport;
