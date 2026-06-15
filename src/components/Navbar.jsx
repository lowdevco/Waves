import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare } from 'lucide-react';

export default function Navbar({ onBookClick, onSectionClick }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Services', id: 'services' },
    { name: 'Pricing Estimator', id: 'estimator' },
    { name: 'Locations', id: 'locations' },
    { name: 'FAQ', id: 'faq' },
  ];

  const handleLinkClick = (id) => {
    setIsOpen(false);
    onSectionClick(id);
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white/90 shadow-md backdrop-blur-md py-3' : 'bg-transparent py-5'
    }`}>
      {/* Top Bar for desktop */}
      {!isScrolled && (
        <div className="hidden lg:block border-b border-white/10 pb-3 mb-3">
          <div className="container mx-auto px-6 flex justify-between items-center text-xs text-brandSlate-body">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-primary" /> +971 52 303 3446
              </span>
              <span className="flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5 text-green-500" /> WhatsApp Available 24/7
              </span>
            </div>
            <div>
              <span>Premium Laundry & Dry Cleaning Dubai</span>
            </div>
          </div>
        </div>
      )}

      <div className="container mx-auto px-6 flex justify-between items-center">
        {/* Logo */}
        <a href="#home" onClick={() => handleLinkClick('home')} className="flex items-center gap-2">
          <img 
            src="/images/logo.webp" 
            alt="Waves Laundry Logo" 
            className="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 hover:scale-105" 
          />
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-brandSlate-dark hover:text-primary transition-colors text-sm lg:text-base relative group"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/971523033446"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 border border-green-500 text-green-600 rounded-full text-sm font-semibold hover:bg-green-50 transition-colors"
          >
            <MessageSquare className="w-4 h-4" />
            WhatsApp
          </a>
          <button
            onClick={onBookClick}
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-sm font-bold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5"
          >
            Book Free Pickup
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-brandSlate-dark hover:text-primary transition-colors"
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl border-t border-slate-100 flex flex-col py-6 px-6 gap-4 animate-fade-in">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleLinkClick(link.id)}
              className="text-left py-2 text-base font-semibold text-brandSlate-dark hover:text-primary border-b border-slate-50 transition-colors"
            >
              {link.name}
            </button>
          ))}
          <div className="flex flex-col gap-3 pt-4">
            <a
              href="https://wa.me/971523033446"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-3 bg-green-500 text-white rounded-xl text-base font-bold shadow-lg shadow-green-500/20 hover:bg-green-600 transition-colors"
            >
              <MessageSquare className="w-5 h-5" />
              WhatsApp Us
            </a>
            <button
              onClick={() => {
                setIsOpen(false);
                onBookClick();
              }}
              className="w-full py-3 bg-primary text-white rounded-xl text-base font-bold shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
            >
              Book Free Pickup
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
