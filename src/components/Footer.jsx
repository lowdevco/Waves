import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin, MessageSquare } from 'lucide-react';

export default function Footer({ onSectionClick }) {
  return (
    <footer className="bg-primary-dark text-white pt-16 pb-8 rounded-t-[40px] relative overflow-hidden">
      {/* Wave decoration on top */}
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-secondary to-primary pointer-events-none"></div>

      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-12">
        
        {/* Col 1: Logo & Brand Description */}
        <div className="lg:col-span-4 text-left">
          <img 
            src="/images/logo.webp" 
            alt="Waves Premium Laundry Logo" 
            className="h-12 w-auto mb-6 bg-white/10 p-2 rounded-xl"
          />
          <p className="text-slate-300 text-sm leading-relaxed mb-6">
            Premium laundry and dry cleaning services in Dubai, delivered with precision, care, and ultimate doorstep convenience. We make your garments look and feel their best—every single time.
          </p>
          <div className="flex gap-4">
            <a href="https://www.facebook.com/share/1DjJnwd1Ly/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all flex items-center justify-center text-slate-300">
              <Facebook className="w-4 h-4" />
            </a>
            <a href="https://www.instagram.com/waveslaundry.ae?igsh=MWJ4MHdzNTd2dHhlag==" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all flex items-center justify-center text-slate-300">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="https://www.linkedin.com/company/waves-laundry/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white hover:text-primary transition-all flex items-center justify-center text-slate-300">
              <Linkedin className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="lg:col-span-2 text-left">
          <h4 className="font-extrabold text-sm uppercase tracking-wider mb-6 text-slate-150">Quick Links</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Home', 'About', 'Services', 'Pricing Estimator', 'Locations', 'FAQ'].map((link, idx) => {
              const ids = ['home', 'about', 'services', 'estimator', 'locations', 'faq'];
              return (
                <li key={idx}>
                  <button 
                    onClick={() => onSectionClick(ids[idx])} 
                    className="hover:text-white hover:underline transition-colors"
                  >
                    {link}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Col 3: Served Locations */}
        <div className="lg:col-span-3 text-left">
          <h4 className="font-extrabold text-sm uppercase tracking-wider mb-6 text-slate-150">Served Areas</h4>
          <ul className="space-y-3 text-sm text-slate-300">
            {['Sobha Hartland', 'Creek Harbour', 'Business Bay', 'Downtown Dubai', 'Dubai Hills Estate'].map((loc, idx) => (
              <li key={idx}>
                <button 
                  onClick={() => onSectionClick('locations')} 
                  className="hover:text-white hover:underline transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary"></span>
                  {loc}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Contact Info Details */}
        <div className="lg:col-span-3 text-left">
          <h4 className="font-extrabold text-sm uppercase tracking-wider mb-6 text-slate-150">Contact Info</h4>
          <ul className="space-y-4 text-sm text-slate-300">
            <li className="flex gap-3">
              <Phone className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Call Support</p>
                <a href="tel:+971523033446" className="hover:text-white transition-colors">+971 52 303 3446</a>
              </div>
            </li>
            <li className="flex gap-3">
              <MessageSquare className="w-4 h-4 text-green-400 mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">WhatsApp 24/7</p>
                <a href="https://wa.me/971523033446" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-green-400 font-bold">+971 52 303 3446</a>
              </div>
            </li>
            <li className="flex gap-3">
              <Mail className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Email Us</p>
                <a href="mailto:waveslaundrydubai@gmail.com" className="hover:text-white transition-colors truncate">waveslaundrydubai@gmail.com</a>
              </div>
            </li>
            <li className="flex gap-3">
              <MapPin className="w-4 h-4 text-secondary mt-1 flex-shrink-0" />
              <div>
                <p className="font-semibold text-white">Head Office Address</p>
                <p className="text-slate-300">Dubai Sobha Hartland, Nad Al Sheba 1, Dubai</p>
              </div>
            </li>
          </ul>
        </div>

      </div>

      {/* Copyright Footer */}
      <div className="border-t border-white/10 pt-8 mt-8 text-center text-xs text-slate-400">
        <div className="container mx-auto px-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>Copyright © {new Date().getFullYear()} Waves Laundry, Dubai. All Rights Reserved.</p>
          <div className="flex gap-6">
            <a href="#faq" onClick={() => onSectionClick('faq')} className="hover:text-white hover:underline transition-colors">Privacy Policy</a>
            <a href="#faq" onClick={() => onSectionClick('faq')} className="hover:text-white hover:underline transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
