"use client";

import { useState, useEffect } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">E</span>
            </div>
            <span className="font-display text-2xl font-bold text-textPrimary">
              EasyScale
            </span>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a
              href="#como-funciona"
              className="text-textSecondary hover:text-primary transition-colors font-medium"
            >
              Como Funciona
            </a>
            <a
              href="#beneficios"
              className="text-textSecondary hover:text-primary transition-colors font-medium"
            >
              Benefícios
            </a>
            <a
              href="#precos"
              className="text-textSecondary hover:text-primary transition-colors font-medium"
            >
              Preços
            </a>
            <a
              href="#faq"
              className="text-textSecondary hover:text-primary transition-colors font-medium"
            >
              FAQ
            </a>
          </div>

          {/* CTA Button */}
          <button className="btn-primary bg-primary text-white px-6 py-3 rounded-lg font-semibold">
            Começar Agora
          </button>
        </div>
      </div>
    </nav>
  );
}
