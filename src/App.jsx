import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import PriceEstimator from './components/PriceEstimator';
import BookingWizard from './components/BookingWizard';
import Benefits from './components/Benefits';
import Locations from './components/Locations';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import { MessageSquare, Calendar, Phone } from 'lucide-react';

function App() {
  const [cart, setCart] = useState([]);

  // Calculate order metrics
  const grandTotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  // Smooth scroll handler
  const handleScrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleBookClick = () => {
    handleScrollToSection('booking');
  };

  const handleBookingSuccess = () => {
    // Clear cart on successful booking
    setCart([]);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between">
      
      {/* Navigation bar */}
      <Navbar 
        onBookClick={handleBookClick} 
        onSectionClick={handleScrollToSection} 
      />

      {/* Main Sections */}
      <main className="flex-grow">
        
        {/* Hero Section */}
        <Hero 
          onBookClick={handleBookClick} 
          onExploreServicesClick={() => handleScrollToSection('estimator')} 
        />

        {/* Services & About Us Section */}
        <Services onSectionClick={handleScrollToSection} />

        {/* Interactive Estimator / Cost Planner */}
        <PriceEstimator 
          cart={cart} 
          setCart={setCart} 
          onProceedToBooking={handleBookClick} 
        />

        {/* Brand Quality & Facility Benefits */}
        <Benefits />

        {/* Dubai Locations Served */}
        <Locations onBookClick={handleBookClick} />

        {/* Booking & Scheduling wizard */}
        <BookingWizard 
          cart={cart} 
          grandTotal={grandTotal} 
          onBookingSuccess={handleBookingSuccess} 
        />

        {/* Frequently Asked Questions Accordion */}
        <FAQ />

      </main>

      {/* Footer component */}
      <Footer onSectionClick={handleScrollToSection} />

      {/* Floating Action widgets */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-3">
        {/* Float WhatsApp */}
        <a
          href="https://wa.me/971523033446"
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
          aria-label="Contact WhatsApp"
        >
          <MessageSquare className="w-7 h-7" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Chat on WhatsApp
          </span>
        </a>

        {/* Float Quick Booking Trigger */}
        <button
          onClick={handleBookClick}
          className="w-14 h-14 bg-primary hover:bg-primary-dark text-white rounded-full shadow-2xl flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
          aria-label="Book Pickup Now"
        >
          <Calendar className="w-6 h-6" />
          <span className="absolute right-full mr-3 bg-slate-900 text-white text-xs font-bold py-1.5 px-3 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-md pointer-events-none">
            Book Free Pickup
          </span>
        </button>
      </div>

    </div>
  );
}

export default App;
