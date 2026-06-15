import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Phone, User, CheckCircle2, ChevronRight, ChevronLeft, Loader2, Sparkles, MessageSquare } from 'lucide-react';

export default function BookingWizard({ cart, grandTotal, onBookingSuccess }) {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    address: '',
    date: '',
    time: '',
    serviceSpeed: 'standard', // standard (48hr) or express (24hr, +50% charge or similar - let's keep it simple)
    notes: ''
  });

  // Pre-populate date and time (matching original page script behavior)
  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    const formattedTime = today.toTimeString().split(':').slice(0, 2).join(':');
    
    setFormData(prev => ({
      ...prev,
      date: formattedDate,
      time: formattedTime
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    // Validate inputs per step
    if (step === 2 && (!formData.date || !formData.time)) {
      alert('Please select a valid date and time for pickup.');
      return;
    }
    if (step === 3 && (!formData.name || !formData.mobile || !formData.address)) {
      alert('Please fill in your name, mobile number, and address.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handlePrevStep = () => {
    setStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API request (e.g. send-mail.php)
    setTimeout(() => {
      setLoading(false);
      setIsSuccess(true);
      if (onBookingSuccess) {
        onBookingSuccess();
      }
    }, 2000);
  };

  const stepsLabel = [
    { num: 1, label: 'Summary' },
    { num: 2, label: 'Schedule' },
    { num: 3, label: 'Delivery Details' },
    { num: 4, label: 'Confirm' }
  ];

  return (
    <section id="booking" className="py-20 lg:py-28 bg-[#014e9a] text-white relative overflow-hidden">
      {/* Decorative dynamic wave element */}
      <div className="absolute inset-0 opacity-10 pointer-events-none z-0">
        <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0,50 Q25,70 50,50 T100,50 L100,100 L0,100 Z" fill="#ffffff" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 max-w-4xl">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-secondary font-black tracking-wider uppercase text-xs sm:text-sm block mb-3">
            Hassle-Free Booking
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">
            Fill in to Book Your Services
          </h2>
          <p className="text-blue-100 text-sm sm:text-base leading-relaxed">
            Fill in your details to schedule a quick and hassle-free laundry service with Waves. Our team will arrange a fast pickup, handle your garments with expert care, and deliver them fresh and ready—right to your doorstep.
          </p>
        </div>

        {/* Wizard Form Wrapper */}
        <div className="bg-white text-slate-800 rounded-[32px] p-6 sm:p-10 shadow-2xl border border-white/10 relative overflow-hidden">
          
          {/* Step Progress Tracker */}
          {!isSuccess && (
            <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-100 overflow-x-auto no-scrollbar">
              {stepsLabel.map((s, idx) => (
                <React.Fragment key={s.num}>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all ${
                      step >= s.num 
                        ? 'bg-primary text-white ring-4 ring-primary/20' 
                        : 'bg-slate-100 text-slate-400'
                    }`}>
                      {s.num}
                    </div>
                    <span className={`text-xs sm:text-sm font-bold ${
                      step >= s.num ? 'text-primary' : 'text-slate-400'
                    }`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < stepsLabel.length - 1 && (
                    <div className={`h-1 flex-1 min-w-[30px] mx-2 transition-all ${
                      step > s.num ? 'bg-primary' : 'bg-slate-100'
                    }`} />
                  )}
                </React.Fragment>
              ))}
            </div>
          )}

          {/* Form Processing */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center gap-4">
              <Loader2 className="w-12 h-12 text-primary animate-spin" />
              <p className="font-bold text-slate-700 text-lg">Scheduling Your Pickup...</p>
              <p className="text-sm text-slate-400">Connecting you with Dubai's top rated laundry care.</p>
            </div>
          ) : isSuccess ? (
            /* SUCCESS MESSAGE PANEL */
            <div className="py-12 text-center max-w-md mx-auto animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 text-green-500">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-3">Booking Confirmed!</h3>
              <p className="text-slate-600 text-sm leading-relaxed mb-6">
                Thank you, <span className="font-bold text-slate-800">{formData.name}</span>! Your pickup has been scheduled for <span className="font-bold text-slate-800">{formData.date}</span> at <span className="font-bold text-slate-800">{formData.time}</span>. Our driver will contact you 30 minutes before arrival.
              </p>
              
              <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left text-xs text-slate-500 mb-8 space-y-2">
                <p><strong>Pickup Address:</strong> {formData.address}</p>
                <p><strong>Mobile Number:</strong> {formData.mobile}</p>
                <p><strong>Order Estimate:</strong> {grandTotal > 0 ? `${grandTotal} AED` : 'Custom Bag (Calculated on receipt)'}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => {
                    setIsSuccess(false);
                    setStep(1);
                  }}
                  className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-sm transition-all"
                >
                  Book Another Pickup
                </button>
                <a
                  href={`https://wa.me/971523033446?text=Hello Waves Laundry! I just booked a pickup for ${formData.name} at ${formData.date} - ${formData.time}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl text-sm transition-all flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Message WhatsApp
                </a>
              </div>
            </div>
          ) : (
            /* WIZARD STEPS CONTENT */
            <form onSubmit={handleSubmit} className="text-left">
              
              {/* STEP 1: SUMMARY / SPEED PREFERENCE */}
              {step === 1 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-brandSlate-dark text-xl mb-2">Review Your Items</h3>
                    <p className="text-xs text-brandSlate-body">Check selected items or proceed with a general/empty bag pickup.</p>
                  </div>

                  {cart.length === 0 ? (
                    <div className="p-6 bg-slate-50 border border-dashed border-slate-200 rounded-2xl text-center text-slate-500">
                      <p className="font-bold text-sm text-slate-700">Empty Bag Pickup</p>
                      <p className="text-xs max-w-md mx-auto mt-1 leading-relaxed">
                        No specific items selected. No worries! Our team will collect all your clothes, sort them, and provide an invoice upon processing at our facility.
                      </p>
                    </div>
                  ) : (
                    <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-sm">
                      <div className="max-h-[220px] overflow-y-auto divide-y divide-slate-100 no-scrollbar">
                        {cart.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 text-sm">
                            <span className="font-semibold text-slate-700">{item.quantity} x {item.name}</span>
                            <span className="text-slate-400 text-xs italic capitalize">
                              {item.serviceType === 'cleanPress' ? 'Clean & Press' : 'Press Only'}
                            </span>
                            <span className="font-bold text-slate-700">{item.itemTotal} AED</span>
                          </div>
                        ))}
                      </div>
                      <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between font-bold text-slate-800 text-base">
                        <span>Estimated Order Cost:</span>
                        <span className="text-primary font-black">{grandTotal} AED</span>
                      </div>
                    </div>
                  )}

                  {/* Delivery Speed Selector */}
                  <div className="space-y-3">
                    <label className="font-bold text-slate-700 text-sm block">Choose Service Delivery Option</label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className={`border-2 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                        formData.serviceSpeed === 'standard' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}>
                        <div className="text-left">
                          <span className="font-bold text-slate-800 text-sm block">Standard Delivery</span>
                          <span className="text-xs text-slate-400">Doorstep delivery in 48 hours</span>
                        </div>
                        <input 
                          type="radio" 
                          name="serviceSpeed" 
                          value="standard" 
                          checked={formData.serviceSpeed === 'standard'} 
                          onChange={handleChange}
                          className="w-4 h-4 text-primary"
                        />
                      </label>
                      <label className={`border-2 rounded-2xl p-4 flex items-center justify-between cursor-pointer transition-all ${
                        formData.serviceSpeed === 'express' ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white hover:border-slate-200'
                      }`}>
                        <div className="text-left flex items-center gap-1.5">
                          <div>
                            <span className="font-bold text-slate-800 text-sm flex items-center gap-1">
                              Express Delivery <Sparkles className="w-3.5 h-3.5 text-yellow-500 fill-current" />
                            </span>
                            <span className="text-xs text-slate-400">Emergency delivery in 24 hours</span>
                          </div>
                        </div>
                        <input 
                          type="radio" 
                          name="serviceSpeed" 
                          value="express" 
                          checked={formData.serviceSpeed === 'express'} 
                          onChange={handleChange}
                          className="w-4 h-4 text-primary"
                        />
                      </label>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-end">
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                    >
                      Schedule Pickup
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 2: PICKUP SCHEDULING */}
              {step === 2 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-brandSlate-dark text-xl mb-2">Select Date & Time</h3>
                    <p className="text-xs text-brandSlate-body">Choose when you want our team to pickup your laundry bags.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Date Input */}
                    <div className="space-y-2">
                      <label htmlFor="date" className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-primary" /> Pickup Date:
                      </label>
                      <input 
                        type="date" 
                        id="date" 
                        name="date" 
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Time Input */}
                    <div className="space-y-2">
                      <label htmlFor="time" className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <Clock className="w-4 h-4 text-primary" /> Pickup Time:
                      </label>
                      <input 
                        type="time" 
                        id="time" 
                        name="time" 
                        value={formData.time}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold transition-all flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                    >
                      Enter Contact Details
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT & LOCATION */}
              {step === 3 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-brandSlate-dark text-xl mb-2">Location & Details</h3>
                    <p className="text-xs text-brandSlate-body">Enter your details so we can locate you for pickup and dropoff.</p>
                  </div>

                  <div className="space-y-4">
                    {/* Name */}
                    <div className="space-y-2">
                      <label htmlFor="name" className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <User className="w-4 h-4 text-primary" /> Your Full Name:
                      </label>
                      <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="e.g. John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Mobile */}
                    <div className="space-y-2">
                      <label htmlFor="mobile" className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <Phone className="w-4 h-4 text-primary" /> Mobile Number:
                      </label>
                      <input 
                        type="tel" 
                        id="mobile" 
                        name="mobile" 
                        placeholder="e.g. +971 52 303 3446"
                        value={formData.mobile}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                        required
                      />
                    </div>

                    {/* Address */}
                    <div className="space-y-2">
                      <label htmlFor="address" className="font-bold text-slate-700 text-sm flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-primary" /> Pickup & Delivery Address:
                      </label>
                      <textarea 
                        id="address" 
                        name="address" 
                        placeholder="Flat/Villa No, Building Name, Street, Area in Dubai"
                        rows="3"
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                        required
                      ></textarea>
                    </div>

                    {/* Special Notes */}
                    <div className="space-y-2">
                      <label htmlFor="notes" className="font-bold text-slate-700 text-sm block">Special Instructions (Optional):</label>
                      <input 
                        type="text" 
                        id="notes" 
                        name="notes" 
                        placeholder="e.g. Ring bell, fragile items, leave with security"
                        value={formData.notes}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm font-medium"
                      />
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold transition-all flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all flex items-center gap-2 group"
                    >
                      Review Order
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                    </button>
                  </div>
                </div>
              )}

              {/* STEP 4: REVIEW & CONFIRM */}
              {step === 4 && (
                <div className="space-y-6 animate-fade-in">
                  <div>
                    <h3 className="font-black text-brandSlate-dark text-xl mb-2">Final Review</h3>
                    <p className="text-xs text-brandSlate-body">Confirm your details and schedule your free waves pickup.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100 text-sm">
                    {/* Summary Info */}
                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-800 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wider">
                        Client Information
                      </h4>
                      <p><strong>Name:</strong> {formData.name}</p>
                      <p><strong>Mobile:</strong> {formData.mobile}</p>
                      <p><strong>Pickup Speed:</strong> <span className="capitalize font-bold text-primary">{formData.serviceSpeed} Delivery</span></p>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-extrabold text-slate-800 border-b border-slate-200 pb-1 mb-2 text-xs uppercase tracking-wider">
                        Location & Time
                      </h4>
                      <p><strong>Date:</strong> {formData.date}</p>
                      <p><strong>Time:</strong> {formData.time}</p>
                      <p className="truncate"><strong>Address:</strong> {formData.address}</p>
                    </div>

                    {formData.notes && (
                      <div className="sm:col-span-2 pt-2 border-t border-slate-200 text-xs text-slate-500">
                        <strong>Notes:</strong> "{formData.notes}"
                      </div>
                    )}
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex justify-between">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-6 py-3 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl text-sm font-bold transition-all flex items-center gap-1"
                    >
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button
                      type="submit"
                      className="px-8 py-3.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-sm font-extrabold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2"
                    >
                      Confirm Booking & Schedule Pickup
                    </button>
                  </div>
                </div>
              )}

            </form>
          )}

        </div>
      </div>
    </section>
  );
}
