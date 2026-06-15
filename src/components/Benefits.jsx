import React from "react";
import {
  Truck,
  ShieldCheck,
  Clock,
  Award,
  Sparkles,
  Check,
} from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      title: "Free Contactless Pickup & Delivery",
      desc: "Book online, drop at your door or lobby, and we take care of the rest without any physical contact.",
    },
    {
      title: "Fastest 30-Minute Pickups",
      desc: "Enjoy lightning-fast pickups. Once scheduled, our driver can arrive at your Dubai location within 30 minutes.",
    },
    {
      title: "Flexible Booking Calendars",
      desc: "Schedule pickups and drop-offs according to your custom availability—morning, noon, or night.",
    },
    {
      title: "Express Delivery in 24 Hours",
      desc: "Need clothes cleaned for a meeting or flight? Opt for our express service to get items back within 24 hours.",
    },
    {
      title: "Hygienic Fabric Sanitization",
      desc: "Deep sanitation cleaning methods that remove odors, germs, and bacteria, returning garments fresh and soft.",
    },
    {
      title: "Affordable & Transparent Pricing",
      desc: "No hidden fees. Free delivery all over service points. Check rates upfront via our interactive estimator.",
    },
  ];

  return (
    <section className="py-20 lg:py-28 bg-white relative">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          {/* Left: Benefits plant image */}
          <div className="lg:col-span-5 relative">
            <div className="absolute inset-0 bg-primary/10 rounded-[40px] blur-2xl z-0 transform translate-x-4 translate-y-4"></div>
            <div className="relative z-10 bg-slate-50 p-4 rounded-[40px] border border-slate-100 shadow-2xl">
              <img
                src="/images/laundry-premium-plant.png"
                alt="Waves Premium Laundry Cleaning Facility Plant"
                className="w-full h-auto object-cover rounded-[32px] shadow-md"
              />
            </div>

            {/* Overlay badge */}
            <div className="absolute -top-6 -right-6 bg-white p-4 rounded-2xl shadow-lg border border-slate-50 z-20 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-slate-800">
                  Latest Technology
                </p>
                <p className="text-[10px] text-slate-400">
                  German-engineered facility
                </p>
              </div>
            </div>
          </div>

          {/* Right: List of Benefits */}
          <div className="lg:col-span-7 text-left">
            <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">
              Why Choose Waves
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-6">
              Dubai’s Top-Rated Laundry Service For A Reason
            </h2>
            <p className="text-brandSlate-body text-sm sm:text-base leading-relaxed mb-10">
              We operate an advanced, eco-friendly laundry facility. By handling
              our processes in-house (not outsourcing), we guarantee
              high-quality fabric care, express turnarounds, and hygienic
              handling.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {benefits.map((b, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary mt-1">
                    <Check className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 text-base mb-1">
                      {b.title}
                    </h3>
                    <p className="text-xs text-brandSlate-body leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
