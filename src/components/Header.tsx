import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = ['Home', 'About Us', 'Products', 'Industries', 'Blog', 'Contact'];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
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
          <div className="relative">
            <img
              src={logo}
              alt="Shivohini TechAI Logo"
              className={`w-11 h-11 md:w-12 md:h-12 transition-all duration-500 ${
                isScrolled
                  ? "drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                  : "drop-shadow-[0_0_12px_rgba(56,189,248,0.6)]"
              } group-hover:drop-shadow-[0_0_18px_rgba(147,51,234,0.6)]`}
            />
          </div>
          <span
            className={`text-2xl font-bold tracking-tight transition-all duration-500 ${
              isScrolled
                ? "text-slate-900"
                : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            }`}
          >
            Shivohini TechAI
          </span>
        </Link>

        {/* 🔸 Desktop Navbar */}
        <nav className="hidden md:flex items-center gap-10">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`relative text-lg font-medium transition-all duration-300 ${
                location.pathname === item.path
                  ? isScrolled
                    ? "text-blue-600"
                    : "text-white"
                  : isScrolled
                  ? "text-gray-700 hover:text-blue-600"
                  : "text-gray-300 hover:text-white"
              }`}
            >
              {item.name}
              {location.pathname === item.path && (
                <span
                  className={`absolute left-1/2 -bottom-2 w-3/5 h-[3px] rounded-full transform -translate-x-1/2 shadow-[0_0_10px_rgba(59,130,246,0.8)] animate-pulse ${
                    isScrolled
                      ? "bg-gradient-to-r from-blue-500 to-purple-500"
                      : "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500"
                  }`}
                />
              )}
            </Link>
          ))}
        </nav>

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

      {/* 🔸 Mobile Menu Panel */}
      {isMenuOpen && (
        <div
          className={`md:hidden absolute top-full left-0 w-full backdrop-blur-lg shadow-lg animate-fadeIn transition-all duration-500 ${
            isScrolled ? "bg-white/95" : "bg-slate-900/90"
          }`}
        >
          <nav className="flex flex-col items-center py-6 space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-lg font-medium transition-all duration-300 ${
                  location.pathname === item.path
                    ? isScrolled
                      ? "text-blue-600"
                      : "text-cyan-400"
                    : isScrolled
                    ? "text-gray-700 hover:text-blue-600"
                    : "text-gray-300 hover:text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
