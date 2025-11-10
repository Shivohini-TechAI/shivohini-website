import React from "react";
import { Users, Search } from "lucide-react";

const HR: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#051021] via-[#08213a] to-[#0b3a5c] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-12 right-12 w-80 h-80 bg-pink-500/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-pink-400 to-rose-500 rounded-full p-4 shadow-md mb-6">
          <Users className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          HR & People — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Hire smarter with AI recruitment, skill-matching, employee analytics and automated onboarding workflows.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["AI Recruitment","Match candidates to roles with smart scoring."],
          ["Employee Analytics","Track engagement and retention signals."],
          ["Performance Optimization","Data-driven performance reviews."],
          ["Training Automation","Personalized learning & upskilling."],
          ["Onboarding Workflow","Automate paperwork & checklists."],
          ["Skill Gap Analysis","Plan training from analytics."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-pink-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-pink-400 to-rose-500 px-8 py-3 rounded-2xl font-semibold">
          Book HR Consultation
        </button>
      </div>
    </section>
  );
};

export default HR;
