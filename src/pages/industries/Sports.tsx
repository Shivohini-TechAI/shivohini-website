import React from "react";
import { Trophy, Activity } from "lucide-react";

const Sports: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#041025] via-[#08223e] to-[#0b3758] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-14 left-12 w-80 h-80 bg-orange-500/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-orange-400 to-amber-500 rounded-full p-4 shadow-md mb-6">
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Sports — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Performance analytics, talent scouting, fan engagement and event management powered by AI.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Performance Analytics","Biomechanics and match analytics."],
          ["Fan Engagement","Personalized experiences and content."],
          ["Event Management","Intelligent scheduling & ticketing."],
          ["Talent Scouting","Data-driven scouting & profiling."],
          ["Injury Prevention","Predictive models to reduce injuries."],
          ["Sponsorship Analytics","Measure sponsor ROI."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-orange-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-orange-400 to-amber-500 px-8 py-3 rounded-2xl font-semibold">
          Explore Sports Analytics
        </button>
      </div>
    </section>
  );
};

export default Sports;
