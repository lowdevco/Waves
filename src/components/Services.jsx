import React, { useState } from 'react';
import { Sparkles, Shirt, Sofa, Trash2, ShieldCheck, Heart, Award } from 'lucide-react';

export default function Services({ onSectionClick }) {
  const [activeTab, setActiveTab] = useState('all');

  const services = [
    {
      id: 'dry-clean',
      title: 'Laundry & Dry Cleaning',
      icon: <Shirt className="w-8 h-8 text-primary" />,
      category: 'garments',
      description: 'Comprehensive garment care including washing, folding, steam pressing, and organic dry cleaning. Spotless execution with professional care.',
      detailText: 'Free pickup, premium packaging, delivery in 24-48 hours.'
    },
    {
      id: 'curtain',
      title: 'Curtain Cleaning',
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      category: 'home',
      description: 'Deep cleaning for curtains with zero shrinkage. Special treatment matching every fabric type to extract dust, odors, and indoor pollutants.',
      detailText: 'Eco-friendly solvents, color preservation.'
    },
    {
      id: 'carpet',
      title: 'Top Carpet Cleaning',
      icon: <Award className="w-8 h-8 text-primary" />,
      category: 'home',
      description: 'Targeted carpet extraction washing that lifts deep-seated dirt, dust mites, and stubborn stains without compromising backing fibers.',
      detailText: 'Tailored formulas per fiber type.'
    },
    {
      id: 'sofa',
      title: 'Expert Sofa Cleaning',
      icon: <Sofa className="w-8 h-8 text-primary" />,
      category: 'home',
      description: 'Deep extraction shampooing and sanitization of upholstery, reaching tight seams and restoring fabric luster to look brand new.',
      detailText: 'Stain pre-treatment, odor sanitization.'
    },
    {
      id: 'shoe',
      title: 'Premium Shoe Care',
      icon: <Sparkles className="w-8 h-8 text-primary" />,
      category: 'garments',
      description: 'Meticulous cleaning of branded sneakers, leather shoes, and suede boots. Odor elimination, detailing, and stain extraction.',
      detailText: 'Material-specific cleaning agents, hand detailing.'
    },
    {
      id: 'fashion',
      title: 'Designer Accessories & Bags',
      icon: <ShieldCheck className="w-8 h-8 text-primary" />,
      category: 'garments',
      description: 'Gentle cleaning for high-value fashion products like designer bags, hats, and leather accessories. Preserves dyes and integrity.',
      detailText: 'Experienced technicians, safe care.'
    }
  ];

  const filteredServices = activeTab === 'all' 
    ? services 
    : services.filter(service => service.category === activeTab);

  return (
    <section id="services" className="py-20 lg:py-28 bg-white relative">
      <div className="container mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">Our Offerings</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-4">
            Professional Cleaning Services Tailored For You
          </h2>
          <p className="text-brandSlate-body text-sm sm:text-base leading-relaxed">
            From your daily clothing to premium rugs, leather shoes, and home sofas, we ensure hygienic, spotless cleanliness at affordable prices.
          </p>
          
          {/* Tabs */}
          <div className="flex justify-center gap-2 mt-8 p-1 bg-background rounded-full max-w-sm mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                activeTab === 'all' ? 'bg-primary text-white shadow-md' : 'text-brandSlate-body hover:text-primary'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setActiveTab('garments')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                activeTab === 'garments' ? 'bg-primary text-white shadow-md' : 'text-brandSlate-body hover:text-primary'
              }`}
            >
              Garments & Shoes
            </button>
            <button
              onClick={() => setActiveTab('home')}
              className={`flex-1 py-2 text-xs sm:text-sm font-bold rounded-full transition-all ${
                activeTab === 'home' ? 'bg-primary text-white shadow-md' : 'text-brandSlate-body hover:text-primary'
              }`}
            >
              Home & Furniture
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {filteredServices.map((service, idx) => (
            <div 
              key={service.id}
              className="group relative bg-background hover:bg-white rounded-3xl p-8 border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Decorative Accent on Hover */}
              <div className="absolute top-0 left-0 w-full h-1.5 bg-primary rounded-t-3xl scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>
              
              <div>
                <div className="w-14 h-14 bg-white group-hover:bg-primary/10 rounded-2xl flex items-center justify-center shadow-sm group-hover:shadow-inner transition-all mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-brandSlate-dark mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                <p className="text-brandSlate-body text-sm leading-relaxed mb-4">
                  {service.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 mt-4 flex items-center justify-between">
                <span className="text-xs text-brandSlate-body font-semibold">{service.detailText}</span>
                <button
                  onClick={() => onSectionClick('estimator')}
                  className="text-xs font-bold text-primary hover:text-primary-dark hover:underline flex items-center gap-1"
                >
                  Check Rates →
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* About Waves Integration */}
        <div id="about" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-background rounded-[40px] p-8 lg:p-16 border border-slate-100">
          
          {/* Left: About Text */}
          <div className="lg:col-span-7 text-left">
            <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">About Us</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-6">
              We Pick It Messy and Drop It Clean!
            </h2>
            
            <div className="space-y-4 text-brandSlate-body text-sm sm:text-base leading-relaxed">
              <p>
                We are stirring the waves as the fast-paced laundry and dry cleaners in Dubai! Waves is a team of expert laundry service providers covering everything related to dry cleaning and professional garment care. Our love of pristine cleanliness and customer satisfaction marked the beginning of our adventure.
              </p>
              <p>
                Today, with dedication and striving, we have emerged as **Dubai’s top-rated laundry service vendor**. Waves operates all across Dubai, serving both commercial and residential clients in Sobha Hartland, Business Bay, Downtown, Creek Harbour, and beyond.
              </p>
              <p>
                At Waves, we provide a set of well-structured, contactless, and affordable laundry services, including premium fabric care and express 24-hour delivery, ensuring your clothing and home fabrics are decluttered professionally and efficiently.
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 mt-8 pt-8 border-t border-slate-200">
              <div className="text-left">
                <p className="text-2xl lg:text-3xl font-extrabold text-primary">30 Min</p>
                <p className="text-xs font-medium text-brandSlate-body mt-1">Average Pickup Time</p>
              </div>
              <div className="text-left">
                <p className="text-2xl lg:text-3xl font-extrabold text-primary">100%</p>
                <p className="text-xs font-medium text-brandSlate-body mt-1">Contactless & Safe</p>
              </div>
              <div className="text-left">
                <p className="text-2xl lg:text-3xl font-extrabold text-primary">10k+</p>
                <p className="text-xs font-medium text-brandSlate-body mt-1">Happy Clients</p>
              </div>
            </div>
          </div>

          {/* Right: Premium About Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl bg-white p-3 border border-white/60">
              <img 
                src="/images/about-dry-cleaning.png" 
                alt="Waves Premium Laundry Processing Facility" 
                className="w-full h-auto object-cover rounded-2xl"
              />
            </div>
            
            {/* Small Floating Card */}
            <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl border border-slate-100 shadow-lg flex items-center gap-3 z-20 max-w-[200px]">
              <Heart className="w-6 h-6 text-red-500 fill-current" />
              <div className="text-left">
                <p className="text-xs font-bold text-brandSlate-dark">Expert Care</p>
                <p className="text-[10px] text-brandSlate-body">Gentle on fabrics, tough on dirt</p>
              </div>
            </div>
            
            {/* Background design circle */}
            <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-primary/10 rounded-full blur-2xl z-0"></div>
          </div>

        </div>

      </div>
    </section>
  );
}
