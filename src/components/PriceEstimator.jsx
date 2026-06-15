import React, { useState } from 'react';
import { Plus, Minus, Trash2, ShoppingBag, Calculator, ChevronRight } from 'lucide-react';

const PRICE_LIST = [
  { id: 'shirt', name: 'Shirt', image: '/images/items/shirt.png', category: 'garments', prices: { cleanPress: 9, press: 5 } },
  { id: 'tshirt', name: 'T-Shirt', image: '/images/items/tshirt.png', category: 'garments', prices: { cleanPress: 9, press: 5 } },
  { id: 'trousers', name: 'Trousers', image: '/images/items/trousers.png', category: 'garments', prices: { cleanPress: 12, press: 6 } },
  { id: 'sweater', name: 'Sweater', image: '/images/items/sweater.png', category: 'garments', prices: { cleanPress: 15, press: 8 } },
  { id: 'jacket', name: 'Jacket', image: '/images/items/jacket.png', category: 'garments', prices: { cleanPress: 23, press: 15 } },
  { id: 'suit', name: 'Suit', image: '/images/items/suit.png', category: 'garments', prices: { cleanPress: 35, press: 21 } },
  { id: 'dishdasha', name: 'Dishdasha', image: '/images/items/dishdasha.png', category: 'garments', prices: { cleanPress: 12, press: 6 } },
  { id: 'blouse', name: 'Blouse', image: '/images/items/blouse.png', category: 'garments', prices: { cleanPress: 10, press: 6 } },
  { id: 'skirt', name: 'Skirt', image: '/images/items/skirt.png', category: 'garments', prices: { cleanPress: 12, press: 8 } },
  { id: 'dress', name: 'Dress', image: '/images/items/dress.png', category: 'garments', prices: { cleanPress: 20, press: 10 } },
  { id: 'long_dress', name: 'Long Dress', image: '/images/items/long_dress.png', category: 'garments', prices: { cleanPress: 30, press: 20 } },
  { id: 'bedsheet', name: 'Bedsheet', image: '/images/items/bedsheet.png', category: 'bedding', prices: { cleanPress: 10, press: 8 } },
  { id: 'bedcover', name: 'Bed Cover', image: '/images/items/bedcover.png', category: 'bedding', prices: { cleanPress: 18, press: 13 } },
  { id: 'pillowcase', name: 'Pillow Case', image: '/images/items/pillowcase.png', category: 'bedding', prices: { cleanPress: 4, press: 2 } },
  { id: 'blanket', name: 'Blanket', image: '/images/items/blanket.png', category: 'bedding', prices: { cleanPress: 30, press: null } },
  { id: 'shoecleaning', name: 'Shoe Cleaning', image: '/images/items/shoecleaning.png', category: 'footwear', prices: { cleanPress: 40, press: null } },
];

export default function PriceEstimator({ cart, setCart, onProceedToBooking }) {
  const [filterCategory, setFilterCategory] = useState('all');

  const categories = [
    { key: 'all', label: 'All Items' },
    { key: 'garments', label: 'Garments' },
    { key: 'bedding', label: 'Bedding & Home' },
    { key: 'footwear', label: 'Footwear & Accessories' }
  ];

  const updateQuantity = (itemId, serviceType, amount) => {
    const itemInfo = PRICE_LIST.find(p => p.id === itemId);
    const price = serviceType === 'cleanPress' ? itemInfo.prices.cleanPress : itemInfo.prices.press;
    
    // Find index of matching item in cart
    const cartIdx = cart.findIndex(c => c.id === itemId && c.serviceType === serviceType);

    if (cartIdx > -1) {
      const updatedCart = [...cart];
      const newQty = updatedCart[cartIdx].quantity + amount;

      if (newQty <= 0) {
        updatedCart.splice(cartIdx, 1); // Remove item
      } else {
        updatedCart[cartIdx].quantity = newQty;
        updatedCart[cartIdx].itemTotal = newQty * price;
      }
      setCart(updatedCart);
    } else if (amount > 0) {
      setCart([
        ...cart,
        {
          id: itemId,
          name: itemInfo.name,
          image: itemInfo.image,
          serviceType,
          quantity: 1,
          unitPrice: price,
          itemTotal: price
        }
      ]);
    }
  };

  const getQuantity = (itemId, serviceType) => {
    const item = cart.find(c => c.id === itemId && c.serviceType === serviceType);
    return item ? item.quantity : 0;
  };

  const clearCart = () => setCart([]);

  const grandTotal = cart.reduce((sum, item) => sum + item.itemTotal, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredItems = filterCategory === 'all' 
    ? PRICE_LIST 
    : PRICE_LIST.filter(item => item.category === filterCategory);

  return (
    <section id="estimator" className="py-20 lg:py-28 bg-[#f0f5fa] relative overflow-hidden">
      {/* Visual wave backdrop decoration */}
      <div className="absolute inset-0 opacity-30 pointer-events-none z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-secondary/15 blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-primary font-bold tracking-wider uppercase text-xs sm:text-sm block mb-3">Cost Planner</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-brandSlate-dark mb-4">
            Interactive Price Planner
          </h2>
          <p className="text-brandSlate-body text-sm sm:text-base leading-relaxed">
            Estimate your laundry service costs before booking. Build your bag by selecting items and choosing the service type below.
          </p>

          {/* Categories Filter Selector */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map(cat => (
              <button
                key={cat.key}
                onClick={() => setFilterCategory(cat.key)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all ${
                  filterCategory === cat.key 
                    ? 'bg-primary text-white shadow-md' 
                    : 'bg-white text-brandSlate-body hover:text-primary hover:border-primary/20 border border-slate-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Pricing Layout Split: Items List on Left, Bag Summary on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left panel: List of items */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6 max-h-[750px] overflow-y-auto pr-2 no-scrollbar">
            {filteredItems.map(item => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4 items-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-background p-2 flex items-center justify-center border border-slate-100 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="max-w-full max-h-full object-contain"
                      onError={(e) => {
                        // Fallback image in case path fails
                        e.target.src = "https://placehold.co/100x100/e0f0fe/046bd2?text=" + item.name;
                      }}
                    />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-brandSlate-dark text-base sm:text-lg">{item.name}</h3>
                    <p className="text-xs text-brandSlate-body capitalize">{item.category} care</p>
                  </div>
                </div>

                <div className="space-y-3 pt-3 border-t border-slate-100">
                  {/* Clean & Press Option */}
                  {item.prices.cleanPress !== null && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-left">
                        <span className="font-medium text-brandSlate-dark">
                          {item.id === 'shoecleaning' ? 'Deep Clean' : 'Clean & Press'}
                        </span>
                        <p className="text-xs text-brandSlate-body font-bold text-primary">{item.prices.cleanPress} AED</p>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-full px-3 py-1.5">
                        <button 
                          onClick={() => updateQuantity(item.id, 'cleanPress', -1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-brandSlate-dark">
                          {getQuantity(item.id, 'cleanPress')}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 'cleanPress', 1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Press Only Option */}
                  {item.prices.press !== null && (
                    <div className="flex items-center justify-between text-sm">
                      <div className="text-left">
                        <span className="font-medium text-brandSlate-dark">Press Only</span>
                        <p className="text-xs text-brandSlate-body font-bold text-primary">{item.prices.press} AED</p>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200/60 rounded-full px-3 py-1.5">
                        <button 
                          onClick={() => updateQuantity(item.id, 'press', -1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center font-bold text-brandSlate-dark">
                          {getQuantity(item.id, 'press')}
                        </span>
                        <button 
                          onClick={() => updateQuantity(item.id, 'press', 1)}
                          className="w-5 h-5 rounded-full bg-white hover:bg-slate-100 flex items-center justify-center text-slate-600 shadow-sm transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Right panel: Summary card */}
          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <div className="bg-white rounded-[32px] p-6 border border-slate-100 shadow-xl relative overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-primary" />
                  <h3 className="font-extrabold text-brandSlate-dark text-lg">Your Laundry Bag</h3>
                </div>
                {cart.length > 0 && (
                  <button 
                    onClick={clearCart}
                    className="text-xs font-bold text-red-500 hover:text-red-600 hover:underline flex items-center gap-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Clear All
                  </button>
                )}
              </div>

              {/* Items in bag */}
              {cart.length === 0 ? (
                <div className="py-16 text-center text-brandSlate-body">
                  <div className="w-16 h-16 rounded-full bg-background flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <Calculator className="w-8 h-8" />
                  </div>
                  <p className="font-bold mb-1">Your bag is empty</p>
                  <p className="text-xs max-w-[200px] mx-auto leading-relaxed">
                    Select clothing items on the left to start building your order estimate.
                  </p>
                </div>
              ) : (
                <>
                  {/* Cart Item List */}
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 no-scrollbar mb-6">
                    {cart.map((cartItem, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm border-b border-slate-50 pb-3">
                        <div className="flex gap-3 items-center">
                          <img 
                            src={cartItem.image} 
                            alt={cartItem.name} 
                            className="w-8 h-8 object-contain rounded-lg bg-background p-1"
                            onError={(e) => { e.target.src = "https://placehold.co/50x50?text=" + cartItem.name; }}
                          />
                          <div className="text-left">
                            <p className="font-bold text-brandSlate-dark">{cartItem.name}</p>
                            <p className="text-[10px] text-brandSlate-body capitalize font-medium">
                              {cartItem.serviceType === 'cleanPress' 
                                ? (cartItem.id === 'shoecleaning' ? 'Deep Clean' : 'Clean & Press') 
                                : 'Press Only'}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-brandSlate-dark">{cartItem.itemTotal} AED</p>
                          <p className="text-[10px] text-brandSlate-body font-semibold">
                            {cartItem.quantity} x {cartItem.unitPrice} AED
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Pricing Summary calculations */}
                  <div className="space-y-3 p-4 bg-background rounded-2xl mb-6 text-sm">
                    <div className="flex justify-between font-semibold text-brandSlate-body">
                      <span>Total Selected Items</span>
                      <span>{totalItems} items</span>
                    </div>
                    <div className="flex justify-between font-semibold text-brandSlate-body">
                      <span>Pickup & Delivery</span>
                      <span className="text-green-600 font-bold">FREE</span>
                    </div>
                    <div className="flex justify-between pt-3 border-t border-slate-200 text-brandSlate-dark font-extrabold text-lg">
                      <span>Estimated Cost</span>
                      <span className="text-primary font-black">{grandTotal} AED</span>
                    </div>
                  </div>

                  {/* Proceed CTA button */}
                  <button
                    onClick={onProceedToBooking}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-2xl text-base font-extrabold shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all flex items-center justify-center gap-2 group"
                  >
                    Proceed to Free Pickup
                    <ChevronRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </button>
                  <p className="text-[10px] text-center text-brandSlate-body mt-3 leading-relaxed">
                    * Final pricing checked upon receipt at cleaning facility. Free pickup applies to order areas in Dubai.
                  </p>
                </>
              )}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
