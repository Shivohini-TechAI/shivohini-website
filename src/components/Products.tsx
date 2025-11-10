import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Brain, Eye, Plane, MessageCircle, Globe, ChevronRight } from "lucide-react";

interface Product {
  id: number;
  title: string;
  description: string;
  icon: string; // will map icon name to component
  features: string[];
}

const iconMap: { [key: string]: React.FC<any> } = {
  Brain,
  Eye,
  Plane,
  MessageCircle,
  Globe
};

const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [hovered, setHovered] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/api/products") // your backend endpoint
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error("Error fetching products:", err));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-[#1E2A78] to-[#020617] relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl lg:text-5xl font-bold text-white mb-8">
          Our <span className="text-cyan-400">AI Solutions</span>
        </h2>
        <p className="text-gray-300 max-w-3xl mx-auto mb-16 text-lg leading-relaxed">
          Discover next-generation AI products designed to accelerate your business growth.
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => {
            const Icon = iconMap[product.icon] || Brain;
            return (
              <div
                key={product.id}
                onClick={() => navigate(`/solutions/${product.id}`)}
                onMouseEnter={() => setHovered(product.id)}
                onMouseLeave={() => setHovered(null)}
                className={`group bg-white/5 backdrop-blur-xl rounded-3xl p-8 border border-white/10 cursor-pointer overflow-hidden transition-all duration-500 ${
                  hovered === product.id ? "shadow-[0_0_25px_rgba(59,130,246,0.4)]" : ""
                }`}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-cyan-500 mb-6 group-hover:scale-110 transition-transform duration-500">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{product.title}</h3>
                <p className="text-gray-400 group-hover:text-gray-200 transition-all duration-300">{product.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Products;
