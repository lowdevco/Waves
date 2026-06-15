import React from 'react';
import { MapPin, Phone, ExternalLink } from 'lucide-react';

export default function Locations({ onBookClick }) {
  const locations = [
    { name: 'Sobha Hartland', area: 'Nad Al Sheba 1', address: 'Waves Laundry Hub, Sobha Hartland, Dubai' },
    { name: 'Creek Harbour', area: 'Dubai Creek', address: 'Residential Pickup Hub, Creek Harbour, Dubai' },
    { name: 'Business Bay', area: 'Downtown Outer', address: 'Commercial & Executive Laundry Bay, Dubai' },
    { name: 'Down Town', area: 'Downtown Central', address: 'Boulevard Elite Care Center, Downtown, Dubai' },
    { name: 'Dubai Hills', area: 'Dubai Hills Estate', address: 'Villa & Residential Delivery Center, Dubai' }
  ];

  return (
    <section id="locations" className="py-20 lg:py-28 bg-[#f0f5fa] relative">
      <div className="container mx-auto px-6">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">Service Areas</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-4">
            Laundry & Dry Cleaners Near You
          </h2>
          <p className="text-brandSlate-body text-sm sm:text-base leading-relaxed">
            We provide fast, free home pickup and delivery all across major residential and commercial hubs in Dubai. Find your area below.
          </p>
        </div>

        {/* Locations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {locations.map((loc, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-100 hover:border-primary/20 shadow-sm hover:shadow-lg transition-all text-left flex flex-col justify-between"
            >
              <div>
                <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-4">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-extrabold text-brandSlate-dark text-lg mb-1">{loc.name}</h3>
                <p className="text-xs text-brandSlate-body font-semibold mb-3">{loc.area}</p>
                <p className="text-xs text-brandSlate-body leading-relaxed mb-6">{loc.address}</p>
              </div>

              <button
                onClick={onBookClick}
                className="w-full py-2.5 bg-slate-50 hover:bg-primary hover:text-white border border-slate-100 rounded-xl text-xs font-bold text-slate-700 transition-all flex items-center justify-center gap-1.5"
              >
                Book Pickup here <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Footer Area Notice */}
        <div className="mt-12 p-6 bg-white rounded-[24px] border border-slate-100 max-w-2xl mx-auto text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left">
            <p className="font-bold text-slate-800 text-sm">Don't see your area listed?</p>
            <p className="text-xs text-brandSlate-body mt-0.5">We serve almost all parts of Dubai for bulk or custom requests.</p>
          </div>
          <a
            href="tel:+971523033446"
            className="px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-full text-xs font-bold transition-all whitespace-nowrap"
          >
            Call Customer Support
          </a>
        </div>
        
      </div>
    </section>
  );
}
