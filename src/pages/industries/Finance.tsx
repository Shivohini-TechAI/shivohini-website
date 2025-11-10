import React from "react";
import { DollarSign, TrendingUp } from "lucide-react";

const Finance: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#0a0912] via-[#102036] to-[#123054] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-14 left-10 w-80 h-80 bg-yellow-400/6 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-amber-400 to-yellow-500 rounded-full p-4 shadow-md mb-6">
          <DollarSign className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Finance & Accounting — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Fintech automation: bookkeeping, fraud detection, investment insights and risk management using AI.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Automated Bookkeeping","Reduce manual ledger entries with AI."],
          ["Fraud Detection","Real-time anomaly detection."],
          ["Investment Analysis","AI-driven portfolio insights."],
          ["Risk Management","Quantified risk scoring & alerts."],
          ["Expense Automation","Auto-categorize and reconcile."],
          ["Forecasting","Cashflow & revenue prediction."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10">
            <div className="mb-3 text-lg font-semibold text-amber-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-amber-400 to-yellow-500 px-8 py-3 rounded-2xl font-semibold">
          Explore Finance AI
        </button>
      </div>
    </section>
  );
};

export default Finance;
