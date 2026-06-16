/**
 * Waves Laundry Website Interactivity & Cart Logic
 * Built with Plain JS
 */

// PRICE_LIST is loaded globally from Price-items.js

// 2. APPLICATION STATE
const state = {
  cart: [], // items array: { id, name, image, serviceType, quantity, unitPrice, itemTotal }
  formData: {
    name: '',
    mobile: '',
    address: '',
    date: '',
    time: '',
    serviceSpeed: 'standard',
    notes: ''
  },
  currentStep: 1,
  activeServiceTab: 'all',
  filterCategory: 'all',
  faqSearchQuery: ''
};

// 3. CORE INITIALIZATION
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHeroCarousel();
  initServicesSlider();
  initPriceEstimator();
  initBookingWizard();
  initFAQs();
});

// ---------------------------------------------------------------------
// 4. NAVBAR CONTROLLER
// ---------------------------------------------------------------------
function initNavbar() {
  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileToggleIcon = mobileToggle.querySelector('i');

  // Scroll header styling (Pill navbar turns to regular header after 300px scroll)
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu drawer toggle
  mobileToggle.addEventListener('click', () => {
    const isActive = mobileDrawer.classList.toggle('active');
    if (isActive) {
      mobileToggleIcon.className = 'fa-solid fa-xmark';
    } else {
      mobileToggleIcon.className = 'fa-solid fa-bars';
    }
  });

  // Smooth scroll and Drawer closing on link clicks
  const scrollButtons = document.querySelectorAll('[data-scroll-to]');
  scrollButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = btn.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
      
      // Close mobile drawer if open
      mobileDrawer.classList.remove('active');
      mobileToggleIcon.className = 'fa-solid fa-bars';

      if (targetElement) {
        // Offset scroll for fixed header
        const headerOffset = 110;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Scroll Spy logic to update active class on scroll
  const sections = document.querySelectorAll('section[id], div[id="about"]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer .mobile-nav-link');

  function updateActiveLinkOnScroll() {
    let currentActiveId = '';
    const scrollPosition = window.scrollY + 160; // offset for fixed header trigger

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentActiveId = sectionId;
      }
    });

    // Handle home fallback if scrolled to top
    if (window.scrollY < 100) {
      currentActiveId = 'home';
    }

    if (currentActiveId) {
      desktopNavLinks.forEach(link => {
        if (link.getAttribute('data-scroll-to') === currentActiveId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      mobileNavLinks.forEach(link => {
        if (link.getAttribute('data-scroll-to') === currentActiveId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }
  }

  window.addEventListener('scroll', updateActiveLinkOnScroll);
  // Run once on load to highlight the active section initially
  updateActiveLinkOnScroll();
}

// ---------------------------------------------------------------------
// 5. SERVICES CAROUSEL CONTROLLER
// ---------------------------------------------------------------------
function initServicesSlider() {
  const track = document.getElementById('services-track');
  const prevBtn = document.getElementById('services-prev');
  const nextBtn = document.getElementById('services-next');
  
  if (!track || !prevBtn || !nextBtn) return;

  // 1. Dynamically render service cards from SERVICES_DATA with clones for seamless looping
  if (typeof SERVICES_DATA !== 'undefined' && SERVICES_DATA.length > 0) {
    const originalCardsHTML = SERVICES_DATA.map(service => `
      <div class="service-card-new" data-service-id="${service.id}">
        <div class="service-img-wrapper">
          <div class="service-img-mask">
            <img src="${service.image}" alt="${service.title}" class="service-img" />
          </div>
          <div class="service-circle-icon ${service.iconColorClass || 'icon-blue'}">
            ${service.iconSvg}
          </div>
        </div>
        <div class="service-body">
          <h3 class="service-title-new">${service.title}</h3>
          <p class="service-desc-new">
            ${service.description}
          </p>
          <button class="btn-read-more">READ MORE</button>
        </div>
      </div>
    `);

    // Clone the last 3 cards and the first 3 cards to build the seamless loop buffer
    const clonesPrepend = originalCardsHTML.slice(-3);
    const clonesAppend = originalCardsHTML.slice(0, 3);
    
    // Populate the track with: last 3 clones + 10 original cards + first 3 clones
    track.innerHTML = [...clonesPrepend, ...originalCardsHTML, ...clonesAppend].join('');

    // Bind scroll events to new buttons
    const readMoreButtons = track.querySelectorAll('.btn-read-more');
    readMoreButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetElement = document.getElementById('estimator');
        if (targetElement) {
          const headerOffset = 110;
          const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
  
  const cards = Array.from(track.children);
  if (cards.length === 0) return;
  
  // Start at index 3 (first original card, skipping the 3 prepended clones)
  let currentIndex = 3;
  let isTransitioning = false;
  
  function getVisibleCardsCount() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  }
  
  function updateSliderPosition() {
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = 32; // Matches gap in CSS
    const amountToMove = currentIndex * (cardWidth + gap);
    
    track.style.transform = `translateX(-${amountToMove}px)`;
  }
  
  // Transition-end listener to reset index instantly without animation when clone limits are crossed
  track.addEventListener('transitionend', (e) => {
    // Prevent bubbling transitionend events from cards from triggering this
    if (e.target !== track) return;
    
    isTransitioning = false;
    const N = SERVICES_DATA.length;
    
    if (currentIndex >= N + 3) {
      // Reached the right clones buffer -> instantly jump back to original card 1 (index 3)
      track.style.transition = 'none';
      currentIndex = 3;
      updateSliderPosition();
      track.offsetHeight; // force DOM reflow
      track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    } else if (currentIndex <= 2) {
      // Reached the left clones buffer -> instantly jump back to original card N (index N + 2)
      track.style.transition = 'none';
      currentIndex = N + 2;
      updateSliderPosition();
      track.offsetHeight; // force DOM reflow
      track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
    }
  });
  
  prevBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSliderPosition();
  });
  
  nextBtn.addEventListener('click', () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSliderPosition();
  });
  
  // Responsive resize update
  window.addEventListener('resize', () => {
    updateSliderPosition();
  });
  
  // Set initial position without animation
  track.style.transition = 'none';
  updateSliderPosition();
  track.offsetHeight; // force reflow
  track.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
}

// ---------------------------------------------------------------------
// 6. PRICE ESTIMATOR & BAG CONTROLLER
// ---------------------------------------------------------------------
// Render estimator item cards dynamically
function renderEstimatorItems() {
  const container = document.getElementById('estimator-items-panel');
  if (!container) return;

  container.innerHTML = PRICE_LIST.map(item => {
    // Determine the label for the primary service
    const primaryServiceName = item.id === 'shoecleaning' ? 'Deep Clean' : 'Clean & Press';
    const hasSecondaryService = item.prices.press !== null;

    let servicesHtml = `
      <div class="item-service-row">
        <div class="item-service-info">
          <span class="item-service-name">${primaryServiceName}</span>
          <span class="item-service-price">${item.prices.cleanPress} AED</span>
        </div>
        <div class="item-qty-control">
          <button class="item-qty-btn" data-qty-action="decrease" data-item-id="${item.id}" data-service-type="cleanPress">
            <i class="fa-solid fa-minus"></i>
          </button>
          <span class="item-qty-val" data-item-id="${item.id}" data-service-type="cleanPress">0</span>
          <button class="item-qty-btn" data-qty-action="increase" data-item-id="${item.id}" data-service-type="cleanPress">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    `;

    if (hasSecondaryService) {
      servicesHtml += `
        <div class="item-service-row">
          <div class="item-service-info">
            <span class="item-service-name">Press Only</span>
            <span class="item-service-price">${item.prices.press} AED</span>
          </div>
          <div class="item-qty-control">
            <button class="item-qty-btn" data-qty-action="decrease" data-item-id="${item.id}" data-service-type="press">
              <i class="fa-solid fa-minus"></i>
            </button>
            <span class="item-qty-val" data-item-id="${item.id}" data-service-type="press">0</span>
            <button class="item-qty-btn" data-qty-action="increase" data-item-id="${item.id}" data-service-type="press">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>
      `;
    }

    let categoryDisplay = 'garments care';
    if (item.category === 'bedding') categoryDisplay = 'bedding care';
    if (item.category === 'footwear') categoryDisplay = 'footwear care';

    return `
      <div class="item-card" data-category="${item.category}" data-item-id="${item.id}">
        <div class="item-card-header">
          <div class="item-image-box">
            <img src="${item.image}" alt="${item.name}" onerror="this.src='https://placehold.co/100x100/e0f0fe/046bd2?text=${encodeURIComponent(item.name)}'" />
          </div>
          <div class="item-info">
            <h3 class="item-info-name">${item.name}</h3>
            <p class="item-info-cat">${categoryDisplay}</p>
          </div>
          <div class="item-active-badge" data-item-id="${item.id}">
            <i class="fa-solid fa-circle-check"></i>
          </div>
        </div>
        <div class="item-services-list">
          ${servicesHtml}
        </div>
      </div>
    `;
  }).join('');
}

// Synchronize card active class border and badge visibility
function syncCardActiveState(itemId) {
  const itemCard = document.querySelector(`.item-card[data-item-id="${itemId}"]`);
  const activeBadge = document.querySelector(`.item-active-badge[data-item-id="${itemId}"]`);

  const totalQty = state.cart
    .filter(c => c.id === itemId)
    .reduce((sum, c) => sum + c.quantity, 0);

  if (itemCard) {
    if (totalQty > 0) {
      itemCard.classList.add('active');
    } else {
      itemCard.classList.remove('active');
    }
  }

  if (activeBadge) {
    if (totalQty > 0) {
      activeBadge.classList.add('visible');
    } else {
      activeBadge.classList.remove('visible');
    }
  }
}

function initPriceEstimator() {
  // Render dynamic list of items first
  renderEstimatorItems();

  const filterButtons = document.querySelectorAll('.estimator-filters .filter-btn');
  const itemCards = document.querySelectorAll('.estimator-items-panel .item-card');

  // Filter items by category click handlers
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');
      state.filterCategory = category;

      itemCards.forEach(card => {
        const cardCat = card.getAttribute('data-category');
        if (category === 'all' || cardCat === category) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Quantity modification click events (plus/minus)
  const qtyButtons = document.querySelectorAll('[data-qty-action]');
  qtyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const itemId = btn.getAttribute('data-item-id');
      const serviceType = btn.getAttribute('data-service-type');
      const action = btn.getAttribute('data-qty-action');
      const amount = action === 'increase' ? 1 : -1;

      updateCartQuantity(itemId, serviceType, amount);
    });
  });

  // Clear cart button handler
  const clearBtn = document.getElementById('bag-clear-btn');
  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      clearCart();
    });
  }

  // Initial render of cart & initial active states check
  renderCart();
  PRICE_LIST.forEach(item => {
    syncCardActiveState(item.id);
  });
}

function updateCartQuantity(itemId, serviceType, amount) {
  const itemInfo = PRICE_LIST.find(p => p.id === itemId);
  const price = serviceType === 'cleanPress' ? itemInfo.prices.cleanPress : itemInfo.prices.press;
  
  const cartIdx = state.cart.findIndex(c => c.id === itemId && c.serviceType === serviceType);

  if (cartIdx > -1) {
    const newQty = state.cart[cartIdx].quantity + amount;

    if (newQty <= 0) {
      state.cart.splice(cartIdx, 1); // Remove item
    } else {
      state.cart[cartIdx].quantity = newQty;
      state.cart[cartIdx].itemTotal = newQty * price;
    }
  } else if (amount > 0) {
    state.cart.push({
      id: itemId,
      name: itemInfo.name,
      image: itemInfo.image,
      serviceType,
      quantity: 1,
      unitPrice: price,
      itemTotal: price
    });
  }

  // Update DOM changes
  syncItemQuantitiesDOM(itemId, serviceType);
  syncCardActiveState(itemId);
  renderCart();
  syncWizardReviewCart();
}

// Keep the count inside quantity selector widgets in sync with state
function syncItemQuantitiesDOM(itemId, serviceType) {
  const cartItem = state.cart.find(c => c.id === itemId && c.serviceType === serviceType);
  const qtyValue = cartItem ? cartItem.quantity : 0;
  
  const qtyIndicator = document.querySelector(
    `.item-qty-val[data-item-id="${itemId}"][data-service-type="${serviceType}"]`
  );
  if (qtyIndicator) {
    qtyIndicator.textContent = qtyValue;
    
    // Toggle active has-qty class on container
    const qtyControl = qtyIndicator.closest('.item-qty-control');
    if (qtyControl) {
      if (qtyValue > 0) {
        qtyControl.classList.add('has-qty');
      } else {
        qtyControl.classList.remove('has-qty');
      }
    }
  }
}

// Empty entire shopping cart bag
function clearCart() {
  state.cart = [];
  
  // Reset all quantity selector HTML text values back to 0
  const qtyIndicators = document.querySelectorAll('.item-qty-val');
  qtyIndicators.forEach(ind => {
    ind.textContent = '0';
    const qtyControl = ind.closest('.item-qty-control');
    if (qtyControl) {
      qtyControl.classList.remove('has-qty');
    }
  });

  // Reset all active card styles
  PRICE_LIST.forEach(item => {
    syncCardActiveState(item.id);
  });

  renderCart();
  syncWizardReviewCart();
}

// Render the right side "Your Laundry Bag" summary container
function renderCart() {
  const emptyBag = document.getElementById('bag-empty-state');
  const activeBagList = document.getElementById('bag-items-list');
  const bagSummary = document.getElementById('bag-summary-card-body');
  const clearBtn = document.getElementById('bag-clear-btn');
  
  const totalItemsSpan = document.getElementById('bag-total-items');
  const estimatedCostSpan = document.getElementById('bag-estimated-cost');

  if (state.cart.length === 0) {
    // Show empty placeholder layout
    emptyBag.style.display = 'block';
    bagSummary.style.display = 'none';
    if (clearBtn) clearBtn.style.display = 'none';
  } else {
    // Show itemized summary lists
    emptyBag.style.display = 'none';
    bagSummary.style.display = 'block';
    if (clearBtn) clearBtn.style.display = 'flex';

    // Calculate sum metrics
    const grandTotal = state.cart.reduce((sum, item) => sum + item.itemTotal, 0);
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update totals displays
    totalItemsSpan.textContent = `${totalItems} items`;
    estimatedCostSpan.textContent = `${grandTotal} AED`;

    // Render laundry items inside bag using template literals
    activeBagList.innerHTML = state.cart.map(item => {
      const displayName = item.serviceType === 'cleanPress' 
        ? (item.id === 'shoecleaning' ? 'Deep Clean' : 'Clean & Press') 
        : 'Press Only';
      
      return `
        <div class="bag-item-row">
          <div class="bag-item-left">
            <img src="${item.image}" alt="${item.name}" class="bag-item-img" onerror="this.src='https://placehold.co/50x50?text=${item.name}'" />
            <div class="bag-item-details">
              <p class="bag-item-name">${item.name}</p>
              <p class="bag-item-service">${displayName}</p>
            </div>
          </div>
          <div class="bag-item-right">
            <p class="bag-item-total">${item.itemTotal} AED</p>
            <p class="bag-item-qtyprice">${item.quantity} x ${item.unitPrice} AED</p>
          </div>
        </div>
      `;
    }).join('');
  }
}

// ---------------------------------------------------------------------
// 7. BOOKING WIZARD CONTROLLER
// ---------------------------------------------------------------------
function initBookingWizard() {
  const steps = document.querySelectorAll('.wizard-step-content');
  const nextBtns = document.querySelectorAll('[data-wizard-next]');
  const prevBtns = document.querySelectorAll('[data-wizard-prev]');
  const form = document.getElementById('booking-wizard-form');
  const loadingPanel = document.getElementById('wizard-loading-panel');
  const successPanel = document.getElementById('wizard-success-panel');

  // Pre-fill Today Date and Current Time
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  const formattedTime = today.toTimeString().split(':').slice(0, 2).join(':');
  
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');
  
  if (dateInput) dateInput.value = formattedDate;
  if (timeInput) timeInput.value = formattedTime;

  // Sync state values with form inputs
  state.formData.date = formattedDate;
  state.formData.time = formattedTime;

  // Track service speed radio cards selection clicks
  const speedRadioCards = document.querySelectorAll('.radio-card');
  speedRadioCards.forEach(card => {
    card.addEventListener('click', () => {
      speedRadioCards.forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      
      const radioInput = card.querySelector('input[type="radio"]');
      if (radioInput) {
        radioInput.checked = true;
        state.formData.serviceSpeed = radioInput.value;
      }
    });
  });

  // Next steps navigation trigger clicks
  nextBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (validateStepInputs()) {
        changeWizardStep(state.currentStep + 1);
      }
    });
  });

  // Previous steps navigation trigger clicks
  prevBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      changeWizardStep(state.currentStep - 1);
    });
  });

  // Listen to form input changes to keep state up to date
  const formInputs = form.querySelectorAll('input:not([type="radio"]), textarea');
  formInputs.forEach(input => {
    input.addEventListener('change', (e) => {
      state.formData[e.target.name] = e.target.value;
    });
  });

  // Form checkout submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Hide form content and show loading animation panel
    form.style.display = 'none';
    loadingPanel.classList.add('active');

    // Simulate API request timeout for 2 seconds
    setTimeout(() => {
      loadingPanel.classList.remove('active');
      successPanel.classList.add('active');
      renderSuccessConfirmation();
    }, 2000);
  });

  // Restart Wizard booking flow click handler
  const resetBtn = document.getElementById('success-book-again-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      // Clear cart items
      clearCart();
      
      // Reset state form inputs
      state.formData = {
        name: '',
        mobile: '',
        address: '',
        date: formattedDate,
        time: formattedTime,
        serviceSpeed: 'standard',
        notes: ''
      };

      // Reset DOM input boxes text values
      form.reset();
      if (dateInput) dateInput.value = formattedDate;
      if (timeInput) timeInput.value = formattedTime;

      // Reset speed radio selections
      speedRadioCards.forEach(c => c.classList.remove('selected'));
      const stdRadio = document.querySelector('.radio-card input[value="standard"]');
      if (stdRadio) {
        stdRadio.checked = true;
        stdRadio.closest('.radio-card').classList.add('selected');
      }

      // Return to step 1 and show form markup
      successPanel.classList.remove('active');
      form.style.display = 'block';
      changeWizardStep(1);
    });
  }

  // Initial synchronizations
  syncWizardReviewCart();
}

function validateStepInputs() {
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const addressInput = document.getElementById('address');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');

  if (state.currentStep === 2) {
    if (!dateInput.value || !timeInput.value) {
      alert('Please select a valid date and time for pickup.');
      return false;
    }
    state.formData.date = dateInput.value;
    state.formData.time = timeInput.value;
  }
  
  if (state.currentStep === 3) {
    if (!nameInput.value.trim() || !mobileInput.value.trim() || !addressInput.value.trim()) {
      alert('Please fill in your name, mobile number, and address.');
      return false;
    }
    state.formData.name = nameInput.value;
    state.formData.mobile = mobileInput.value;
    state.formData.address = addressInput.value;
    
    const notesInput = document.getElementById('notes');
    if (notesInput) state.formData.notes = notesInput.value;
  }

  return true;
}

function changeWizardStep(stepNum) {
  state.currentStep = stepNum;

  // Toggle active step divs
  const stepContents = document.querySelectorAll('.wizard-step-content');
  stepContents.forEach(div => {
    const divStep = parseInt(div.getAttribute('data-wizard-step'));
    if (divStep === stepNum) {
      div.classList.add('active');
    } else {
      div.classList.remove('active');
    }
  });

  // Update active status classes inside progress line nodes
  const nodes = document.querySelectorAll('.wizard-step-node');
  const lines = document.querySelectorAll('.wizard-tracker-line');

  nodes.forEach(node => {
    const nodeNum = parseInt(node.getAttribute('data-step'));
    node.classList.remove('active', 'completed');
    
    if (nodeNum === stepNum) {
      node.classList.add('active');
    } else if (nodeNum < stepNum) {
      node.classList.add('completed');
    }
  });

  lines.forEach((line, index) => {
    const lineIndex = index + 1; // line between index and index + 1
    line.classList.remove('active');
    if (lineIndex < stepNum) {
      line.classList.add('active');
    }
  });

  // Trigger content-specific renders based on steps
  if (stepNum === 4) {
    renderFinalOrderReview();
  }
}

// Synchronize selected estimator items into step 1 reviews
function syncWizardReviewCart() {
  const emptyReview = document.getElementById('wizard-empty-cart');
  const summaryBox = document.getElementById('wizard-summary-box');
  const itemsReviewList = document.getElementById('wizard-summary-items');
  const summaryTotalSpan = document.getElementById('wizard-summary-total');

  if (state.cart.length === 0) {
    emptyReview.style.display = 'block';
    summaryBox.style.display = 'none';
  } else {
    emptyReview.style.display = 'none';
    summaryBox.style.display = 'block';

    const grandTotal = state.cart.reduce((sum, item) => sum + item.itemTotal, 0);
    summaryTotalSpan.textContent = `${grandTotal} AED`;

    itemsReviewList.innerHTML = state.cart.map(item => {
      const serviceDisplay = item.serviceType === 'cleanPress' 
        ? (item.id === 'shoecleaning' ? 'Deep Clean' : 'Clean & Press') 
        : 'Press Only';
      return `
        <div class="wizard-summary-items-row">
          <span class="wizard-summary-item-name">${item.quantity} x ${item.name}</span>
          <span class="wizard-summary-item-service">${serviceDisplay}</span>
          <span class="wizard-summary-item-total">${item.itemTotal} AED</span>
        </div>
      `;
    }).join('');
  }
}

// Render review checklist in step 4
function renderFinalOrderReview() {
  const reviewClient = document.getElementById('review-info-client');
  const reviewLocation = document.getElementById('review-info-location');
  const reviewNotesRow = document.getElementById('review-info-notes');

  const speedDisplay = state.formData.serviceSpeed === 'express' ? 'Express Delivery' : 'Standard Delivery';

  reviewClient.innerHTML = `
    <h4 class="wizard-review-col-title">Client Information</h4>
    <p><strong>Name:</strong> ${state.formData.name}</p>
    <p><strong>Mobile:</strong> ${state.formData.mobile}</p>
    <p><strong>Pickup Speed:</strong> <span class="text-highlight-green">${speedDisplay}</span></p>
  `;

  reviewLocation.innerHTML = `
    <h4 class="wizard-review-col-title">Location & Time</h4>
    <p><strong>Date:</strong> ${state.formData.date}</p>
    <p><strong>Time:</strong> ${state.formData.time}</p>
    <p class="review-address-text"><strong>Address:</strong> ${state.formData.address}</p>
  `;

  if (state.formData.notes.trim()) {
    reviewNotesRow.innerHTML = `<strong>Notes:</strong> "${state.formData.notes}"`;
    reviewNotesRow.style.display = 'block';
  } else {
    reviewNotesRow.style.display = 'none';
  }
}

// Populate success checkout panels and set WhatsApp link contents
function renderSuccessConfirmation() {
  const userNameSpan = document.getElementById('success-user-name');
  const userDateSpan = document.getElementById('success-pickup-date');
  const userTimeSpan = document.getElementById('success-pickup-time');
  const summaryBox = document.getElementById('success-details-summary');
  const whatsappAnchor = document.getElementById('success-whatsapp-link');

  const grandTotal = state.cart.reduce((sum, item) => sum + item.itemTotal, 0);

  userNameSpan.textContent = state.formData.name;
  userDateSpan.textContent = state.formData.date;
  userTimeSpan.textContent = state.formData.time;

  summaryBox.innerHTML = `
    <p><strong>Pickup Address:</strong> ${state.formData.address}</p>
    <p><strong>Mobile Number:</strong> ${state.formData.mobile}</p>
    <p><strong>Order Estimate:</strong> ${grandTotal > 0 ? `${grandTotal} AED` : 'Custom Bag (Calculated on receipt)'}</p>
  `;

  // WhatsApp prefilled URL
  const waText = encodeURIComponent(
    `Hello Waves Laundry! I just booked a pickup for ${state.formData.name} at ${state.formData.date} - ${state.formData.time}.`
  );
  whatsappAnchor.href = `https://wa.me/971523033446?text=${waText}`;
}

// ---------------------------------------------------------------------
// 8. FAQ ACCORDIONS CONTROLLER
// ---------------------------------------------------------------------
function initFAQs() {
  const searchInput = document.getElementById('faq-search-input');
  const faqItems = document.querySelectorAll('.faq-list .faq-item');
  const emptyState = document.getElementById('faq-empty-results');

  // Filter items in accordion list using search text
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      state.faqSearchQuery = query;
      let matchCount = 0;

      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();

        if (question.includes(query) || answer.includes(query)) {
          item.style.display = 'block';
          matchCount++;
        } else {
          item.style.display = 'none';
          // Close it if hidden
          item.classList.remove('active');
          const panel = item.querySelector('.faq-content-pane');
          if (panel) panel.style.maxHeight = '0';
        }
      });

      if (matchCount === 0 && query !== '') {
        emptyState.style.display = 'block';
        emptyState.querySelector('span').textContent = query;
      } else {
        emptyState.style.display = 'none';
      }
    });
  }

  // Toggle Accordion Collapse heights
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const contentPane = item.querySelector('.faq-content-pane');

    trigger.addEventListener('click', () => {
      const isAlreadyActive = item.classList.contains('active');

      // Collapse all other accordion nodes
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const pane = otherItem.querySelector('.faq-content-pane');
        if (pane) pane.style.maxHeight = '0';
      });

      // Toggle clicked node state
      if (!isAlreadyActive) {
        item.classList.add('active');
        contentPane.style.maxHeight = contentPane.scrollHeight + 'px';
      } else {
        item.classList.remove('active');
        contentPane.style.maxHeight = '0';
      }

      // Update all eye/eye-slash icons
      faqItems.forEach(i => {
        const icon = i.querySelector('.faq-trigger i');
        if (icon) {
          if (i.classList.contains('active')) {
            icon.className = 'fa-regular fa-eye-slash';
          } else {
            icon.className = 'fa-regular fa-eye';
          }
        }
      });
    });
  });

  // Open active items by default based on HTML
  faqItems.forEach(item => {
    const pane = item.querySelector('.faq-content-pane');
    const icon = item.querySelector('.faq-trigger i');
    if (item.classList.contains('active')) {
      if (pane) pane.style.maxHeight = pane.scrollHeight + 'px';
      if (icon) icon.className = 'fa-regular fa-eye-slash';
    } else {
      if (pane) pane.style.maxHeight = '0';
      if (icon) icon.className = 'fa-regular fa-eye';
    }
  });
}

// ---------------------------------------------------------------------
// 12. HERO CAROUSEL CONTROLLER
// ---------------------------------------------------------------------
function initHeroCarousel() {
  const bgSlides = document.querySelectorAll('.hero-bg-slide');
  const contentSlides = document.querySelectorAll('.hero-content-slide');
  const dots = document.querySelectorAll('.hero-dot');
  
  if (bgSlides.length === 0) return;

  let currentIndex = 0;
  let slideInterval;
  const SLIDE_DURATION = 15000; // 15 seconds slide change interval

  // Transitions the carousel to a specific slide index
  function showSlide(index) {
    // 1. Cycle background image slides
    bgSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // 2. Cycle matching text content blocks
    contentSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    // 3. Cycle corresponding dot controls on the right
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add('active');
      } else {
        dot.classList.remove('active');
      }
    });

    currentIndex = index;
  }

  // Advance automatically to the next slide
  function nextSlide() {
    let nextIndex = (currentIndex + 1) % bgSlides.length;
    showSlide(nextIndex);
  }

  // Starts the autoplay transition timer
  function startAutoplay() {
    stopAutoplay();
    slideInterval = setInterval(nextSlide, SLIDE_DURATION);
  }

  // Stops the autoplay transition timer
  function stopAutoplay() {
    if (slideInterval) {
      clearInterval(slideInterval);
    }
  }

  // Add click events to the right-side dot controllers
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.getAttribute('data-slide'), 10);
      showSlide(targetIndex);
      startAutoplay(); // Reset the 15s autoplay interval timer on click
    });
  });

  // Start with first slide initialized
  showSlide(0);
  startAutoplay();
}
