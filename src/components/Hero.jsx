import React from 'react';
import { ArrowRight, Phone, MessageSquare, ShieldCheck, Sparkles, Clock } from 'lucide-react';

export default function Hero({ onBookClick, onExploreServicesClick }) {
  return (
    <section id="home" className="relative min-h-screen pt-28 pb-16 lg:pt-36 lg:pb-24 flex items-center bg-gradient-to-b from-[#e0f0fe] via-[#f0f5fa] to-white overflow-hidden">
      {/* Decorative Wave SVGs in Background */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        <svg 
          className="absolute bottom-0 left-0 w-full h-32 lg:h-48" 
          viewBox="0 0 1440 320" 
          preserveAspectRatio="none"
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            fill="#046bd2" 
            fillOpacity="0.1" 
            d="M0,160L48,154.7C96,149,192,139,288,144C384,149,480,171,576,165.3C672,160,768,128,864,128C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Slogan, Text, CTAs */}
          <div className="lg:col-span-7 text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-xs lg:text-sm font-semibold mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span>We Never Let Your Fashion Fade – Premium Laundry in Dubai</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-brandSlate-dark leading-tight tracking-tight mb-6">
              The Job You Hate! <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary-dark">
                We Do It With Love.
              </span>
            </h1>

            <p className="text-base sm:text-lg text-brandSlate-body max-w-xl mb-8 leading-relaxed">
              We pick it messy and drop it clean! Waves is your premium one-stop solution for dry cleaning, ironing, carpet, curtain, and sofa cleaning in Dubai. Clean clothes, delivered to your doorstep in 24-48 hours.
            </p>

            {/* Quick Benefits Tags */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8 max-w-lg">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-brandSlate-dark">Contactless Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-brandSlate-dark">30-Min Rapid Pickup</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <span className="text-sm font-semibold text-brandSlate-dark">Fabric Care Experts</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-primary hover:bg-primary-dark text-white rounded-full text-base font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all transform hover:-translate-y-0.5 group"
              >
                Schedule Free Pickup 
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </button>
              <button
                onClick={onExploreServicesClick}
                className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-slate-50 text-brandSlate-dark border border-slate-200 rounded-full text-base font-bold shadow-sm transition-all transform hover:-translate-y-0.5"
              >
                Explore Services & Prices
              </button>
            </div>

            {/* Quick Contact Info */}
            <div className="flex items-center gap-6 mt-8 pt-8 border-t border-slate-200/60 text-sm">
              <a href="tel:+971523033446" className="flex items-center gap-2 text-brandSlate-dark hover:text-primary transition-colors font-semibold">
                <Phone className="w-4 h-4 text-primary" /> +971 52 303 3446
              </a>
              <a href="https://wa.me/971523033446" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-semibold">
                <MessageSquare className="w-4 h-4 text-green-500" /> Chat WhatsApp
              </a>
            </div>
          </div>

          {/* Right Side: Showcase Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent rounded-3xl blur-2xl z-0 transform scale-110"></div>
            
            {/* Main Premium Floating Card */}
            <div className="relative z-10 bg-white/70 backdrop-blur-md p-4 rounded-3xl border border-white/60 shadow-2xl overflow-hidden hover:scale-[1.01] transition-transform duration-300">
              <img 
                src="/images/doorstep-laundry.png" 
                alt="Waves Premium Doorstep Laundry in Dubai" 
                className="w-full h-auto object-cover rounded-2xl shadow-md"
              />
              
              {/* Floating Badge 1 */}
              <div className="absolute bottom-8 left-8 right-8 glass p-4 rounded-2xl flex items-center justify-between shadow-xl animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                    ⭐
                  </div>
                  <div className="text-left">
                    <p className="text-xs text-brandSlate-body font-medium">Dubai's Choice</p>
                    <p className="text-sm font-bold text-brandSlate-dark">Top Rated Laundry 2026</p>
                  </div>
                </div>
                <div className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
                  100% Quality
                </div>
              </div>
            </div>

            {/* Back card overlay */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-xl z-0 animate-pulse"></div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
