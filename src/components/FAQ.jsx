import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, MessageSquare } from 'lucide-react';

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      q: 'Do you provide free pickup and delivery in Dubai?',
      a: 'Yes! Waves provides free contactless pickup and delivery for all standard and express laundry orders across our served areas in Dubai (Downtown, Business Bay, Creek Harbour, Sobha Hartland, Dubai Hills, etc.).'
    },
    {
      q: 'What is your turnaround time for cleaning?',
      a: 'Our standard turnaround time is 48 hours. If you need your clothes urgently, we offer an Express Delivery option where your items are cleaned, pressed, and returned to your doorstep within 24 hours.'
    },
    {
      q: 'How do I calculate the price of my laundry order?',
      a: 'You can use our interactive Cost Planner / Price Estimator tool above. Simply select your items (shirts, trousers, suits, blankets) and preferred service (Clean & Press vs Press Only) to calculate your estimated total before booking.'
    },
    {
      q: 'Do you clean delicate or designer fabrics?',
      a: 'Absolutely. We operate a state-of-the-art facility equipped with customized fabric programs. Our specialists inspect each item, handling delicate silk, lace, wool, and designer apparel with material-safe, eco-friendly detergents.'
    },
    {
      q: 'Do you clean household furniture, carpets, and shoes?',
      a: 'Yes, we do! In addition to garments, we specialize in curtain deep cleaning (zero shrinkage), carpet stain extraction, sofa/upholstery shampooing, and detailing for branded sneakers/shoes.'
    },
    {
      q: 'What are your working hours and contact details?',
      a: 'We operate 7 days a week, from 09:00 AM to 10:00 PM. For any custom requests, you can contact us via phone at +971 52 303 3446 or send us a WhatsApp message at any time.'
    }
  ];

  const filteredFaqs = faqs.filter(
    faq => faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
           faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-brandSlate-body text-sm sm:text-base leading-relaxed">
            Got questions? We have answers. If you don't find what you're looking for, feel free to contact our support team.
          </p>

          {/* Search bar */}
          <div className="relative mt-8 max-w-md mx-auto">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
            <input 
              type="text" 
              placeholder="Search questions..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm text-slate-800"
            />
          </div>
        </div>

        {/* Accordions */}
        <div className="space-y-4">
          {filteredFaqs.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              <p>No results found for "{searchQuery}"</p>
            </div>
          ) : (
            filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={idx}
                  className={`border border-slate-100 rounded-3xl overflow-hidden transition-all ${
                    isOpen ? 'bg-slate-50 shadow-sm border-primary/10' : 'bg-white hover:border-slate-200'
                  }`}
                >
                  <button
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full px-6 py-5 flex justify-between items-center text-left"
                  >
                    <span className="font-extrabold text-slate-800 text-sm sm:text-base">{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-primary flex-shrink-0 ml-4" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-slate-400 flex-shrink-0 ml-4" />
                    )}
                  </button>

                  <div className={`transition-all duration-300 overflow-hidden ${
                    isOpen ? 'max-h-40 border-t border-slate-100' : 'max-h-0'
                  }`}>
                    <div className="p-6 text-sm text-brandSlate-body leading-relaxed text-left">
                      {faq.a}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Quick WhatsApp Support trigger */}
        <div className="mt-12 text-center">
          <p className="text-sm text-brandSlate-body mb-4">Still have unanswered questions?</p>
          <a
            href="https://wa.me/971523033446"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-sm shadow-md transition-colors"
          >
            <MessageSquare className="w-4 h-4" /> Chat With Us on WhatsApp
          </a>
        </div>

      </div>
    </section>
  );
}
