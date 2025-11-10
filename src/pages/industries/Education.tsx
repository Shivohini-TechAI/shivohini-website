import React from "react";
import { GraduationCap, BookOpen } from "lucide-react";

const Education: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#041427] via-[#0c3246] to-[#163f6a] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-12 left-10 w-80 h-80 bg-indigo-500/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-indigo-400 to-blue-500 rounded-full p-4 shadow-md mb-6">
          <GraduationCap className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Education — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          EdTech: personalized learning paths, automated assessments, student analytics and virtual tutoring assistants.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Personalized Learning","Tailor content to each learner."],
          ["Assessment Automation","Auto-grade and give feedback."],
          ["Student Analytics","Track engagement & progress."],
          ["Virtual Classrooms","AI-enabled tutoring & chatbots."],
          ["Curriculum Insights","Identify gaps & adapt content."],
          ["Admissions Support","Automate application processing."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-blue-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-blue-400 to-indigo-600 px-8 py-3 rounded-2xl font-semibold">
          Learn About Edu Solutions
        </button>
      </div>
    </section>
  );
};

export default Education;
