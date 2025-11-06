import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  type DropdownKey = "Solutions" | "Industries";
  const [mobilePanel, setMobilePanel] = useState<DropdownKey | null>(null);
  const [activePanel, setActivePanel] = useState<DropdownKey | null>(null);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ['Home', 'About Us', 'Products', 'Industries', 'Blog', 'Contact'];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-xl shadow-xl"
          : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center space-x-2 group focus:outline-none focus:ring-0"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-lg active:scale-95">
              <span className="text-white font-bold text-xl drop-shadow-lg">S</span>
            </div>
            <div className="text-xl lg:text-2xl font-bold transition-colors duration-300 group-hover:text-blue-600">
              <span className="text-blue-600 group-hover:text-blue-700">Shivohoni</span>
              <span className="text-gray-800 ml-1 group-hover:text-gray-900">TechAI</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8 relative">
            {navItems.map((item) => (
              <div
                key={item}
                className="relative"
              >
                <Link
                  to={
                    item === "Home"
                      ? "/"
                      : `/${item.toLowerCase().replace(" ", "-")}`
                  }
                  className={`relative font-medium transition-all duration-300 hover:text-blue-600 focus:outline-none focus:ring-0 ${
                    activeSection.toLowerCase() ===
                    item.toLowerCase().replace(" ", "-")
                      ? "text-blue-600"
                      : "text-gray-700"
                  }`}
                >
                  {item}
                </Link>
              </div>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200 focus:outline-none focus:ring-0"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden fixed inset-0 z-[90] transition-opacity duration-300 ${
            isMenuOpen
              ? "opacity-100 pointer-events-auto"
              : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={() => setIsMenuOpen(false)}
          ></div>

          <div
            className={`absolute right-0 top-0 h-full w-72 bg-white shadow-xl p-6 transform transition-transform duration-300 rounded-l-2xl ${
              isMenuOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              className="mb-4 text-gray-600 focus:outline-none focus:ring-0"
              onClick={() => setIsMenuOpen(false)}
            >
              ← Close
            </button>

            <nav className="space-y-3">
              {navItems.map((item) => (
                <div key={item}>
                  <Link
                    to={
                      item === "Home"
                        ? "/"
                        : `/${item.toLowerCase().replace(" ", "-")}`
                    }
                    className="w-full text-left px-4 py-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg flex justify-between items-center transition-all duration-300 focus:outline-none focus:ring-0"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item}
                  </Link>
                </div>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
