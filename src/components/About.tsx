import React from 'react';
import { Target, Eye, Lightbulb, Users, Award, Rocket } from 'lucide-react';

const About: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Our Mission',
      description: 'To democratize AI technology and make intelligent solutions accessible to businesses of all sizes, driving innovation and efficiency across industries.',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: Eye,
      title: 'Our Vision',
      description: 'To be the leading AI technology partner, transforming how businesses operate through cutting-edge artificial intelligence and automation solutions.',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      icon: Lightbulb,
      title: 'Innovation First',
      description: 'We constantly push the boundaries of what\'s possible with AI, developing unique solutions that address real-world business challenges.',
      color: 'from-purple-500 to-purple-600'
    },
    {
      icon: Users,
      title: 'Client-Centric',
      description: 'Every solution is tailored to our clients\' specific needs, ensuring maximum impact and return on investment for their business goals.',
      color: 'from-teal-500 to-teal-600'
    },
    {
      icon: Award,
      title: 'Quality Excellence',
      description: 'We maintain the highest standards in all our deliverables, from initial concept to final implementation and ongoing support.',
      color: 'from-orange-500 to-orange-600'
    },
    {
      icon: Rocket,
      title: 'Future Ready',
      description: 'Our solutions are built with scalability and future technologies in mind, ensuring long-term value and adaptability.',
      color: 'from-green-500 to-green-600'
    }
  ];

  return (
    <section id="about-us" className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            About <span className="text-blue-600">Shivohoni TechAI</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We are pioneers in artificial intelligence, dedicated to transforming businesses 
            through innovative technology solutions that drive growth, efficiency, and competitive advantage.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
                style={{
                  animationDelay: `${index * 100}ms`
                }}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-500`} />
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                  {feature.description}
                </p>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-200 rounded-2xl transition-colors duration-300" />
              </div>
            );
          })}
        </div>

        {/* Company Stats */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-blue-800 rounded-3xl p-8 lg:p-12 text-white">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold mb-2">5+</div>
              <div className="text-blue-100">Years Experience</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold mb-2">500+</div>
              <div className="text-blue-100">Projects Completed</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold mb-2">50+</div>
              <div className="text-blue-100">Happy Clients</div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="text-4xl lg:text-5xl font-bold mb-2">10+</div>
              <div className="text-blue-100">Industries Served</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;