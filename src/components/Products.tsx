import React, { useState } from 'react';
import { Brain, Eye, Bone as Drone, MessageCircle, Globe, ChevronRight } from 'lucide-react';

const Products: React.FC = () => {
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null);

  const products = [
    {
      id: 1,
      title: 'AI Agent',
      description: 'Intelligent autonomous agents that can handle complex tasks, make decisions, and learn from interactions to improve performance over time.',
      icon: Brain,
      features: ['Natural Language Processing', 'Machine Learning', 'Task Automation', 'Decision Making'],
      color: 'from-blue-500 to-blue-600',
      bgColor: 'from-blue-50 to-blue-100'
    },
    {
      id: 2,
      title: 'Face Recognition System',
      description: 'Advanced facial recognition technology with real-time detection, identification, and security features for various applications.',
      icon: Eye,
      features: ['Real-time Detection', 'High Accuracy', 'Security Integration', 'Privacy Compliant'],
      color: 'from-indigo-500 to-indigo-600',
      bgColor: 'from-indigo-50 to-indigo-100'
    },
    {
      id: 3,
      title: 'Customized Drones',
      description: 'AI-powered drones tailored for specific industries with autonomous navigation, data collection, and intelligent analysis capabilities.',
      icon: Drone,
      features: ['Autonomous Flight', 'Data Collection', 'Real-time Analytics', 'Custom Hardware'],
      color: 'from-purple-500 to-purple-600',
      bgColor: 'from-purple-50 to-purple-100'
    },
    {
      id: 4,
      title: 'AI Virtual Assistant',
      description: 'Sophisticated virtual assistants that understand context, provide intelligent responses, and integrate seamlessly with business workflows.',
      icon: MessageCircle,
      features: ['Voice Recognition', 'Context Understanding', 'Multi-language Support', 'API Integration'],
      color: 'from-teal-500 to-teal-600',
      bgColor: 'from-teal-50 to-teal-100'
    },
    {
      id: 5,
      title: 'Interactive Websites',
      description: 'Dynamic, responsive websites with AI-powered features, personalization, and engaging user experiences across all devices.',
      icon: Globe,
      features: ['Responsive Design', 'AI Personalization', 'Interactive Elements', 'Performance Optimized'],
      color: 'from-orange-500 to-orange-600',
      bgColor: 'from-orange-50 to-orange-100'
    }
  ];

  return (
    <section id="products" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* 3D Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-blue-200/20 to-cyan-200/20 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-gradient-to-br from-indigo-200/15 to-blue-200/15 rounded-full blur-3xl animate-pulse-slow" />
      </div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600">Products & Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Cutting-edge AI solutions designed to transform your business operations 
            and drive innovation across multiple industries.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {products.map((product, index) => {
            const Icon = product.icon;
            const isHovered = hoveredProduct === product.id;
            
            return (
              <div
                key={product.id}
                className={`group relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-500 transform hover:-translate-y-6 hover:scale-105 cursor-pointer overflow-hidden border border-white/20 ${
                  isHovered ? 'ring-4 ring-cyan-200/50 shadow-cyan-500/25' : ''
                }`}
                onMouseEnter={() => setHoveredProduct(product.id)}
                onMouseLeave={() => setHoveredProduct(null)}
                style={{
                  animationDelay: `${index * 150}ms`
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${product.bgColor} opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
                
                {/* 3D Depth Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl" />
                
                {/* 3D Floating Icon */}
                <div className="relative mb-6">
                  <div className={`inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br ${product.color} rounded-3xl transform group-hover:scale-125 group-hover:rotate-6 transition-all duration-500 shadow-2xl group-hover:shadow-3xl`}>
                    <Icon className="w-10 h-10 text-white" />
                  </div>
                  
                  {/* Floating animation elements */}
                  <div className="absolute -top-2 -right-2 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping transition-opacity duration-300" />
                  <div className="absolute -bottom-1 -left-1 w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-opacity duration-300 delay-100" />
                  <div className="absolute top-1/2 -right-3 w-2 h-2 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300 delay-200" />
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 group-hover:text-gray-700 transition-colors duration-300">
                    {product.description}
                  </p>

                  {/* Features List */}
                  <div className="space-y-2 mb-6">
                    {product.features.map((feature, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300"
                        style={{ animationDelay: `${idx * 100}ms` }}
                      >
                        <div className={`w-2 h-2 bg-gradient-to-r ${product.color} rounded-full mr-3 transform group-hover:scale-150 group-hover:shadow-lg transition-all duration-300`} />
                        {feature}
                      </div>
                    ))}
                  </div>

                  {/* Learn More Button */}
                  <button className={`flex items-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-blue-600 font-semibold hover:from-cyan-700 hover:to-blue-700 transform group-hover:translate-x-2 transition-all duration-300`}>
                    Learn More
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300" />
                  </button>
                </div>

                {/* 3D Border Effect */}
                <div className="absolute inset-0 border border-transparent group-hover:border-gradient-to-r group-hover:from-cyan-200 group-hover:to-blue-200 rounded-3xl transition-all duration-300" />
                
                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-all duration-1000 rounded-3xl" />
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-4 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 transform hover:scale-105 hover:-translate-y-1 transition-all duration-300 shadow-2xl hover:shadow-cyan-500/25 cursor-pointer">
            <span className="text-lg font-semibold">Ready to Transform Your Business?</span>
            <ChevronRight className="w-5 h-5" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;