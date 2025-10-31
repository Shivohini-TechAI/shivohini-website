import React, { useState, useRef } from 'react';
import { 
  Building2, 
  Utensils, 
  ShoppingCart, 
  Plane, 
  GraduationCap, 
  Home, 
  DollarSign, 
  Users, 
  Trophy, 
  Truck,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const Industries: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [hoveredIndustry, setHoveredIndustry] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const industries = [
    {
      id: 1,
      title: 'Hotel',
      description: 'AI-powered hotel management systems with smart check-in, personalized guest experiences, and automated operations.',
      icon: Building2,
      solutions: ['Smart Check-in/out', 'Guest Personalization', 'Room Automation', 'Revenue Optimization'],
      color: 'from-blue-500 to-blue-600',
      bgGradient: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      title: 'Restaurant',
      description: 'Intelligent restaurant solutions including menu optimization, order management, and customer experience enhancement.',
      icon: Utensils,
      solutions: ['Menu Optimization', 'Order Management', 'Kitchen Automation', 'Customer Analytics'],
      color: 'from-red-500 to-red-600',
      bgGradient: 'from-red-50 to-red-100'
    },
    {
      id: 3,
      title: 'Supermarket',
      description: 'Smart retail solutions with inventory management, customer behavior analysis, and automated checkout systems.',
      icon: ShoppingCart,
      solutions: ['Inventory Management', 'Smart Checkout', 'Customer Analytics', 'Price Optimization'],
      color: 'from-green-500 to-green-600',
      bgGradient: 'from-green-50 to-green-100'
    },
    {
      id: 4,
      title: 'Export-Import',
      description: 'AI-driven logistics and trade management with documentation automation and supply chain optimization.',
      icon: Plane,
      solutions: ['Documentation Automation', 'Supply Chain Optimization', 'Risk Assessment', 'Trade Analytics'],
      color: 'from-purple-500 to-purple-600',
      bgGradient: 'from-purple-50 to-purple-100'
    },
    {
      id: 5,
      title: 'Education',
      description: 'Educational technology solutions with personalized learning, assessment automation, and student analytics.',
      icon: GraduationCap,
      solutions: ['Personalized Learning', 'Assessment Automation', 'Student Analytics', 'Virtual Classrooms'],
      color: 'from-indigo-500 to-indigo-600',
      bgGradient: 'from-indigo-50 to-indigo-100'
    },
    {
      id: 6,
      title: 'Real Estate',
      description: 'Property management and real estate solutions with market analysis, virtual tours, and client matching.',
      icon: Home,
      solutions: ['Market Analysis', 'Virtual Property Tours', 'Client Matching', 'Investment Analytics'],
      color: 'from-teal-500 to-teal-600',
      bgGradient: 'from-teal-50 to-teal-100'
    },
    {
      id: 7,
      title: 'Finance & Accounting',
      description: 'Financial technology solutions with automated bookkeeping, fraud detection, and investment analysis.',
      icon: DollarSign,
      solutions: ['Automated Bookkeeping', 'Fraud Detection', 'Investment Analysis', 'Risk Management'],
      color: 'from-yellow-500 to-yellow-600',
      bgGradient: 'from-yellow-50 to-yellow-100'
    },
    {
      id: 8,
      title: 'HR',
      description: 'Human resource management with AI-powered recruitment, employee analytics, and performance optimization.',
      icon: Users,
      solutions: ['AI Recruitment', 'Employee Analytics', 'Performance Optimization', 'Training Automation'],
      color: 'from-pink-500 to-pink-600',
      bgGradient: 'from-pink-50 to-pink-100'
    },
    {
      id: 9,
      title: 'Sports',
      description: 'Sports analytics and management solutions with performance tracking, fan engagement, and event management.',
      icon: Trophy,
      solutions: ['Performance Analytics', 'Fan Engagement', 'Event Management', 'Talent Scouting'],
      color: 'from-orange-500 to-orange-600',
      bgGradient: 'from-orange-50 to-orange-100'
    },
    {
      id: 10,
      title: 'Logistics',
      description: 'Smart logistics solutions with route optimization, warehouse automation, and delivery tracking.',
      icon: Truck,
      solutions: ['Route Optimization', 'Warehouse Automation', 'Delivery Tracking', 'Fleet Management'],
      color: 'from-cyan-500 to-cyan-600',
      bgGradient: 'from-cyan-50 to-cyan-100'
    }
  ];

  const itemsPerSlide = 4;
  const totalSlides = Math.ceil(industries.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  const getCurrentIndustries = () => {
    const start = currentSlide * itemsPerSlide;
    return industries.slice(start, start + itemsPerSlide);
  };

  return (
    <section id="industries" className="py-20 bg-gradient-to-br from-gray-900 to-blue-900 relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
            Industries We <span className="text-blue-400">Serve</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Transforming businesses across diverse industries with tailored AI solutions 
            that drive efficiency, innovation, and growth.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-20 bg-white/10 backdrop-blur-md text-white p-3 rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Industries Grid */}
          <div 
            ref={carouselRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-12"
          >
            {getCurrentIndustries().map((industry, index) => {
              const Icon = industry.icon;
              const isHovered = hoveredIndustry === industry.id;
              
              return (
                <div
                  key={industry.id}
                  className={`group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-4 hover:scale-105 cursor-pointer ${
                    isHovered ? 'ring-2 ring-blue-400' : ''
                  }`}
                  onMouseEnter={() => setHoveredIndustry(industry.id)}
                  onMouseLeave={() => setHoveredIndustry(null)}
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {/* 3D Icon */}
                  <div className="mb-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${industry.color} rounded-2xl transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors duration-300">
                    {industry.title}
                  </h3>
                  <p className="text-gray-300 text-sm leading-relaxed mb-4 group-hover:text-gray-200 transition-colors duration-300">
                    {industry.description}
                  </p>

                  {/* Solutions List */}
                  <div className={`space-y-1 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0`}>
                    {industry.solutions.map((solution, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center text-xs text-blue-300"
                        style={{ animationDelay: `${idx * 50}ms` }}
                      >
                        <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2" />
                        {solution}
                      </div>
                    ))}
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity duration-500" />
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 rounded-3xl" />
                </div>
              );
            })}
          </div>

          {/* Slide Indicators */}
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentSlide === index ? 'bg-blue-400 scale-125' : 'bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl cursor-pointer">
            <span className="text-lg font-semibold">Explore Industry-Specific Solutions</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Industries;