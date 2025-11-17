import React from "react";
import { CheckCircle } from "lucide-react";

interface Feature {
  title: string;
  description: string;
}

interface IndustryPageProps {
  industryTitle: string;
  description: string;
  features: Feature[];
  buttonText?: string;
}

const IndustryPage: React.FC<IndustryPageProps> = ({
  industryTitle,
  description,
  features,
  buttonText = "Get Custom Solution",
}) => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#020617] via-[#0A1A3F] to-[#1E2A78] text-white py-24 px-6 overflow-hidden relative">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">{industryTitle}</h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">{description}</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="group bg-white/5 backdrop-blur-lg p-6 rounded-2xl border border-white/10 hover:border-cyan-400/30 transition-all duration-300"
          >
            <div className="flex items-start gap-3 mb-3">
              <CheckCircle className="w-6 h-6 text-cyan-400 mt-1" />
              <h3 className="text-lg font-semibold">{f.title}</h3>
            </div>
            <p className="text-gray-400 text-sm">{f.description}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition">
          {buttonText}
        </button>
      </div>
    </section>
  );
};

export default IndustryPage;
