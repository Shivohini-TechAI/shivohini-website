import React from "react";
import { Building2, CheckCircle } from "lucide-react";

const Hotel: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0A1A3F] to-[#1E2A78] text-white py-24 px-6 overflow-hidden relative">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-10 w-80 h-80 bg-cyan-400/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-500/10 blur-3xl rounded-full animate-pulse delay-1000" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full p-4 shadow-lg shadow-cyan-500/30 mb-6">
          <Building2 className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Hotel Industry — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Smart hospitality: automated check-in/out, guest personalization, room automation and revenue optimization powered by AI agents.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {[
          { t: "Smart Check-in/out", d: "Frictionless guest onboarding using conversational AI." },
          { t: "Guest Personalization", d: "Dynamic recommendations and in-room personalization." },
          { t: "Room Automation", d: "Voice and mobile control for lighting, temperature and services." },
          { t: "Revenue Optimization", d: "Dynamic pricing driven by demand forecasting." },
          { t: "Sentiment Analysis", d: "Analyze reviews and feedback to improve service." },
          { t: "Ops Automation", d: "Automate housekeeping and maintenance schedules." },
        ].map((f, i) => (
          <div key={i} className="group bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300">
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1" />
              <h3 className="text-lg font-semibold">{f.t}</h3>
            </div>
            <p className="text-gray-400 text-sm">{f.d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
          Get Custom Hotel Solution
        </button>
      </div>
    </section>
  );
};

export default Hotel;
