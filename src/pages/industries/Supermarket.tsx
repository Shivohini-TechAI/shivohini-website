import React from "react";
import { ShoppingCart, Tag } from "lucide-react";

const Supermarket: React.FC = () => {
  return (
    <section className="min-h-screen bg-gradient-to-br from-[#02121a] via-[#02343a] to-[#054b5b] text-white py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-12 left-8 w-80 h-80 bg-green-500/8 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-4 shadow-md mb-6">
          <ShoppingCart className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Retail / Supermarket — AI Agent
        </h1>
        <p className="text-gray-300 max-w-3xl mx-auto text-lg">
          Smart retail: inventory forecasting, smart checkout, dynamic pricing and customer behaviour analytics.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          ["Inventory Management","Predict stock needs and auto-replenish."],
          ["Smart Checkout","Frictionless, automated payments."],
          ["Customer Analytics","Segment shoppers & personalize offers."],
          ["Price Optimization","Real-time price tests and adjustments."],
          ["Shelf Analytics","Computer vision for stock levels."],
          ["Promotion Effectiveness","Measure & optimize campaigns."],
        ].map(([t,d],i)=>(
          <div key={i} className="group bg-white/5 p-6 rounded-2xl border border-white/10 transition hover:scale-102">
            <div className="mb-3 text-lg font-semibold text-emerald-300">{t}</div>
            <p className="text-gray-400 text-sm">{d}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-16">
        <button className="bg-gradient-to-r from-emerald-400 to-green-600 px-8 py-3 rounded-2xl font-semibold">
          Talk Retail Transformations
        </button>
      </div>
    </section>
  );
};

export default Supermarket;
