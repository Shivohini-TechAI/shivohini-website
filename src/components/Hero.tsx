import React, { useEffect, useState } from 'react';
import { Brain, Zap, Cpu, ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-cyan-400/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: `${20 + mousePosition.x * 0.02}%`,
            top: `${10 + mousePosition.y * 0.02}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />
        <div 
          className="absolute w-80 h-80 bg-purple-400/20 rounded-full blur-3xl animate-pulse delay-1000"
          style={{
            right: `${15 + mousePosition.x * 0.03}%`,
            bottom: `${20 + mousePosition.y * 0.03}%`,
            transform: 'translate(50%, 50%)',
          }}
        />
      </div>

      {/* Floating Icons */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 animate-float">
          <Brain className="w-8 h-8 text-cyan-400/60" />
        </div>
        <div className="absolute top-1/3 right-1/4 transform translate-x-1/2 -translate-y-1/2 animate-float-delayed">
          <Zap className="w-6 h-6 text-blue-400/60" />
        </div>
        <div className="absolute bottom-1/3 left-1/3 transform -translate-x-1/2 translate-y-1/2 animate-float-slow">
          <Cpu className="w-10 h-10 text-purple-400/60" />
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="text-white">Transforming Ideas into</span>
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 animate-gradient">
                  Intelligent Solutions
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0">
                Shivohoni TechAI revolutionizes businesses with cutting-edge AI technology, 
                custom solutions, and innovative automation across all industries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25">
                Explore Our Solutions
                <ArrowRight className="inline-block ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="border-2 border-cyan-400 text-cyan-400 px-8 py-4 rounded-2xl font-semibold text-lg hover:bg-gradient-to-r hover:from-cyan-500 hover:to-blue-600 hover:text-white hover:border-transparent transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-lg hover:shadow-cyan-400/25">
                Watch Demo
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-gray-200">
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-cyan-400">500+</div>
                <div className="text-gray-300">Projects Delivered</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-cyan-400">50+</div>
                <div className="text-gray-300">Happy Clients</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-bold text-cyan-400">10+</div>
                <div className="text-gray-300">Industries</div>
              </div>
            </div>
          </div>

          {/* 3D Visual */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Central Hub */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-full shadow-2xl shadow-cyan-500/50 animate-pulse-slow flex items-center justify-center">
                  <Brain className="w-16 h-16 text-white" />
                </div>
              </div>

              {/* Orbiting Elements */}
              <div className="absolute inset-0 animate-spin-slow">
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl shadow-cyan-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-8 h-8 text-cyan-600" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl shadow-purple-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Zap className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl shadow-blue-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Brain className="w-8 h-8 text-blue-600" />
                  </div>
                </div>
                <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2">
                  <div className="w-16 h-16 bg-white/90 backdrop-blur-sm rounded-full shadow-2xl shadow-indigo-500/25 flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <Cpu className="w-8 h-8 text-indigo-600" />
                  </div>
                </div>
              </div>

              {/* Connection Lines */}
              <div className="absolute inset-0">
                <svg className="w-full h-full">
                  <circle
                    cx="50%"
                    cy="50%"
                    r="120"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="2"
                    strokeDasharray="10,5"
                    className="animate-spin-reverse"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.4" />
                      <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.4" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;