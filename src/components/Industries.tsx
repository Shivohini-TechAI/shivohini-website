import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Building2, Utensils, ShoppingCart, Plane, GraduationCap, Home, DollarSign, Users, Trophy, Truck } from "lucide-react";

interface Industry {
  id: number;
  title: string;
  description: string;
  icon: string;
  solutions: string[];
}

const iconMap: { [key: string]: React.FC<any> } = {
  Building2,
  Utensils,
  ShoppingCart,
  Plane,
  GraduationCap,
  Home,
  DollarSign,
  Users,
  Trophy,
  Truck
};

const Industries: React.FC = () => {
  const [industries, setIndustries] = useState<Industry[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const itemsPerSlide = 4;

  useEffect(() => {
    fetch("http://localhost:5000/api/industries")
      .then(res => res.json())
      .then(data => setIndustries(data))
      .catch(err => console.error(err));
  }, []);

  const totalSlides = Math.ceil(industries.length / itemsPerSlide);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  const getCurrentIndustries = () => {
    const start = currentSlide * itemsPerSlide;
    return industries.slice(start, start + itemsPerSlide);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Industries We <span className="text-blue-400">Serve</span>
          </h2>
        </div>

        <div className="relative">
          <button onClick={prevSlide} className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button onClick={nextSlide} className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110">
            <ChevronRight className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12">
            {getCurrentIndustries().map(industry => {
              const Icon = iconMap[industry.icon] || Building2;
              return (
                <div key={industry.id} className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 cursor-pointer">
                  <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl transform group-hover:scale-110 transition-all duration-500 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{industry.title}</h3>
                  <p className="text-gray-300 text-sm mb-4">{industry.description}</p>
                  <div className="space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    {industry.solutions.map((solution, idx) => (
                      <div key={idx} className="flex items-center text-xs text-blue-300">
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {solution}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;
