/**
 * Waves Laundry - Common Operations (Navbar & Booking Wizard)
 */

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
  initBookingWizard();
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
      const targetId = btn.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        e.preventDefault();
        
        // Close mobile drawer if open
        mobileDrawer.classList.remove('active');
        mobileToggleIcon.className = 'fa-solid fa-bars';

        // Offset scroll for fixed header
        const headerOffset = 110;
        const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
        const offsetPosition = elementPosition - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      } else {
        // If target element doesn't exist, let it navigate by default (but close drawer)
        mobileDrawer.classList.remove('active');
        mobileToggleIcon.className = 'fa-solid fa-bars';
      }
    });
  });

  // Scroll Spy logic to update active class on scroll
  const sections = document.querySelectorAll('section[id], div[id="about"]');
  const desktopNavLinks = document.querySelectorAll('.nav-links .nav-link-btn');
  const mobileNavLinks = document.querySelectorAll('.mobile-drawer .mobile-nav-link');

  function updateActiveLinkOnScroll() {
    // Skip scroll spy on about.html to preserve active state of the About menu item
    if (window.location.pathname.includes('about.html')) {
      return;
    }

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

function showToast(message, type = 'error') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  
  const icon = type === 'error' ? 'fa-solid fa-triangle-exclamation' : 'fa-solid fa-circle-check';
  
  toast.innerHTML = `
    <i class="${icon} toast-icon"></i>
    <span class="toast-message">${message}</span>
  `;

  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => {
    toast.classList.add('show');
  }, 10);

  // Remove toast after 4 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => {
      toast.remove();
    }, 400);
  }, 4000);
}

function validateStepInputs() {
  const nameInput = document.getElementById('name');
  const mobileInput = document.getElementById('mobile');
  const addressInput = document.getElementById('address');
  const dateInput = document.getElementById('date');
  const timeInput = document.getElementById('time');

  // Clear previous validation states
  const inputs = [nameInput, mobileInput, addressInput, dateInput, timeInput];
  inputs.forEach(input => {
    if (!input) return;
    input.classList.remove('is-invalid');
    const existingMsg = input.parentNode.querySelector('.validation-error-msg');
    if (existingMsg) existingMsg.remove();
  });

  function markInvalid(input, msg) {
    input.classList.add('is-invalid');
    
    // Add real-time listener to clear validation state on input
    const clearError = () => {
      input.classList.remove('is-invalid');
      const errEl = input.parentNode.querySelector('.validation-error-msg');
      if (errEl) errEl.remove();
      input.removeEventListener('input', clearError);
      input.removeEventListener('change', clearError);
    };
    input.addEventListener('input', clearError);
    input.addEventListener('change', clearError);

    // Only add error message if it doesn't already exist
    let errorMsg = input.parentNode.querySelector('.validation-error-msg');
    if (!errorMsg) {
      errorMsg = document.createElement('span');
      errorMsg.className = 'validation-error-msg';
      errorMsg.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${msg}`;
      input.parentNode.appendChild(errorMsg);
    }
  }

  if (state.currentStep === 2) {
    let hasError = false;
    if (!dateInput.value) {
      markInvalid(dateInput, 'Pickup date is required');
      hasError = true;
    }
    if (!timeInput.value) {
      markInvalid(timeInput, 'Pickup time is required');
      hasError = true;
    }
    if (hasError) {
      showToast('Please select a valid date and time for pickup.');
      return false;
    }
    state.formData.date = dateInput.value;
    state.formData.time = timeInput.value;
  }
  
  if (state.currentStep === 3) {
    let hasError = false;
    if (!nameInput.value.trim()) {
      markInvalid(nameInput, 'Full name is required');
      hasError = true;
    }
    if (!mobileInput.value.trim()) {
      markInvalid(mobileInput, 'Mobile number is required');
      hasError = true;
    }
    if (!addressInput.value.trim()) {
      markInvalid(addressInput, 'Delivery address is required');
      hasError = true;
    }
    if (hasError) {
      showToast('Please fill in all required contact details.');
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

