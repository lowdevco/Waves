/**
 * Waves Laundry - Index-Specific Components (Hero, Services, Price Estimator, FAQ)
 */

document.addEventListener("DOMContentLoaded", () => {
  initHeroCarousel();
  initServicesSlider();
  initPriceEstimator();
  initFAQs();
});

// 5. SERVICES CAROUSEL CONTROLLER
// ---------------------------------------------------------------------
function initServicesSlider() {
  const track = document.getElementById("services-track");
  const prevBtn = document.getElementById("services-prev");
  const nextBtn = document.getElementById("services-next");

  if (!track || !prevBtn || !nextBtn) return;

  // 1. Dynamically render service cards from SERVICES_DATA with clones for seamless looping
  if (typeof SERVICES_DATA !== "undefined" && SERVICES_DATA.length > 0) {
    const originalCardsHTML = SERVICES_DATA.map(
      (service) => `
      <div class="service-card-new" data-service-id="${service.id}">
        <div class="service-img-wrapper">
          <div class="service-img-mask">
            <img src="${service.image}" alt="${service.title}" class="service-img" />
          </div>
          <div class="service-circle-icon ${service.iconColorClass || "icon-blue"}">
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
    `,
    );

    // Clone the last 3 cards and the first 3 cards to build the seamless loop buffer
    const clonesPrepend = originalCardsHTML.slice(-3);
    const clonesAppend = originalCardsHTML.slice(0, 3);

    // Populate the track with: last 3 clones + 10 original cards + first 3 clones
    track.innerHTML = [
      ...clonesPrepend,
      ...originalCardsHTML,
      ...clonesAppend,
    ].join("");

    // Bind scroll events to new buttons
    const readMoreButtons = track.querySelectorAll(".btn-read-more");
    readMoreButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const targetElement = document.getElementById("estimator");
        if (targetElement) {
          const headerOffset = 110;
          const elementPosition =
            targetElement.getBoundingClientRect().top + window.scrollY;
          const offsetPosition = elementPosition - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
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
  track.addEventListener("transitionend", (e) => {
    // Prevent bubbling transitionend events from cards from triggering this
    if (e.target !== track) return;

    isTransitioning = false;
    const N = SERVICES_DATA.length;

    if (currentIndex >= N + 3) {
      // Reached the right clones buffer -> instantly jump back to original card 1 (index 3)
      track.style.transition = "none";
      currentIndex = 3;
      updateSliderPosition();
      track.offsetHeight; // force DOM reflow
      track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    } else if (currentIndex <= 2) {
      // Reached the left clones buffer -> instantly jump back to original card N (index N + 2)
      track.style.transition = "none";
      currentIndex = N + 2;
      updateSliderPosition();
      track.offsetHeight; // force DOM reflow
      track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
    }
  });

  prevBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex--;
    updateSliderPosition();
  });

  nextBtn.addEventListener("click", () => {
    if (isTransitioning) return;
    isTransitioning = true;
    currentIndex++;
    updateSliderPosition();
  });

  // Responsive resize update
  window.addEventListener("resize", () => {
    updateSliderPosition();
  });

  // Set initial position without animation
  track.style.transition = "none";
  updateSliderPosition();
  track.offsetHeight; // force reflow
  track.style.transition = "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
}

// ---------------------------------------------------------------------
// 6. PRICE ESTIMATOR & BAG CONTROLLER
// ---------------------------------------------------------------------
// Render estimator item cards dynamically
function renderEstimatorItems() {
  const container = document.getElementById("estimator-items-panel");
  if (!container) return;

  container.innerHTML = PRICE_LIST.map((item) => {
    // Determine the label for the primary service
    const primaryServiceName =
      item.id === "shoecleaning" ? "Deep Clean" : "Clean & Press";
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

    let categoryDisplay = "garments care";
    if (item.category === "bedding") categoryDisplay = "bedding care";
    if (item.category === "footwear") categoryDisplay = "footwear care";

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
  }).join("");
}

// Synchronize card active class border and badge visibility
function syncCardActiveState(itemId) {
  const itemCard = document.querySelector(
    `.item-card[data-item-id="${itemId}"]`,
  );
  const activeBadge = document.querySelector(
    `.item-active-badge[data-item-id="${itemId}"]`,
  );

  const totalQty = state.cart
    .filter((c) => c.id === itemId)
    .reduce((sum, c) => sum + c.quantity, 0);

  if (itemCard) {
    if (totalQty > 0) {
      itemCard.classList.add("active");
    } else {
      itemCard.classList.remove("active");
    }
  }

  if (activeBadge) {
    if (totalQty > 0) {
      activeBadge.classList.add("visible");
    } else {
      activeBadge.classList.remove("visible");
    }
  }
}

function initPriceEstimator() {
  // Render dynamic list of items first
  renderEstimatorItems();

  const filterButtons = document.querySelectorAll(
    ".estimator-filters .filter-btn",
  );
  const itemCards = document.querySelectorAll(
    ".estimator-items-panel .item-card",
  );

  // Filter items by category click handlers
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const category = btn.getAttribute("data-category");
      state.filterCategory = category;

      itemCards.forEach((card) => {
        const cardCat = card.getAttribute("data-category");
        if (category === "all" || cardCat === category) {
          card.classList.remove("hidden");
        } else {
          card.classList.add("hidden");
        }
      });
    });
  });

  // Quantity modification click events (plus/minus)
  const qtyButtons = document.querySelectorAll("[data-qty-action]");
  qtyButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const itemId = btn.getAttribute("data-item-id");
      const serviceType = btn.getAttribute("data-service-type");
      const action = btn.getAttribute("data-qty-action");
      const amount = action === "increase" ? 1 : -1;

      updateCartQuantity(itemId, serviceType, amount);
    });
  });

  // Clear cart button handler
  const clearBtn = document.getElementById("bag-clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      clearCart();
    });
  }

  // Initial render of cart & initial active states check
  renderCart();
  PRICE_LIST.forEach((item) => {
    syncCardActiveState(item.id);
  });
}

function updateCartQuantity(itemId, serviceType, amount) {
  const itemInfo = PRICE_LIST.find((p) => p.id === itemId);
  const price =
    serviceType === "cleanPress"
      ? itemInfo.prices.cleanPress
      : itemInfo.prices.press;

  const cartIdx = state.cart.findIndex(
    (c) => c.id === itemId && c.serviceType === serviceType,
  );

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
      itemTotal: price,
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
  const cartItem = state.cart.find(
    (c) => c.id === itemId && c.serviceType === serviceType,
  );
  const qtyValue = cartItem ? cartItem.quantity : 0;

  const qtyIndicator = document.querySelector(
    `.item-qty-val[data-item-id="${itemId}"][data-service-type="${serviceType}"]`,
  );
  if (qtyIndicator) {
    qtyIndicator.textContent = qtyValue;

    // Toggle active has-qty class on container
    const qtyControl = qtyIndicator.closest(".item-qty-control");
    if (qtyControl) {
      if (qtyValue > 0) {
        qtyControl.classList.add("has-qty");
      } else {
        qtyControl.classList.remove("has-qty");
      }
    }
  }
}

// Empty entire shopping cart bag
function clearCart() {
  state.cart = [];

  // Reset all quantity selector HTML text values back to 0
  const qtyIndicators = document.querySelectorAll(".item-qty-val");
  qtyIndicators.forEach((ind) => {
    ind.textContent = "0";
    const qtyControl = ind.closest(".item-qty-control");
    if (qtyControl) {
      qtyControl.classList.remove("has-qty");
    }
  });

  // Reset all active card styles
  PRICE_LIST.forEach((item) => {
    syncCardActiveState(item.id);
  });

  renderCart();
  syncWizardReviewCart();
}

// Render the right side "Your Laundry Bag" summary container
function renderCart() {
  const emptyBag = document.getElementById("bag-empty-state");
  const activeBagList = document.getElementById("bag-items-list");
  const bagSummary = document.getElementById("bag-summary-card-body");
  const clearBtn = document.getElementById("bag-clear-btn");

  const totalItemsSpan = document.getElementById("bag-total-items");
  const estimatedCostSpan = document.getElementById("bag-estimated-cost");

  if (state.cart.length === 0) {
    // Show empty placeholder layout
    emptyBag.style.display = "block";
    bagSummary.style.display = "none";
    if (clearBtn) clearBtn.style.display = "none";
  } else {
    // Show itemized summary lists
    emptyBag.style.display = "none";
    bagSummary.style.display = "block";
    if (clearBtn) clearBtn.style.display = "flex";

    // Calculate sum metrics
    const grandTotal = state.cart.reduce(
      (sum, item) => sum + item.itemTotal,
      0,
    );
    const totalItems = state.cart.reduce((sum, item) => sum + item.quantity, 0);

    // Update totals displays
    totalItemsSpan.textContent = `${totalItems} items`;
    estimatedCostSpan.textContent = `${grandTotal} AED`;

    // Render laundry items inside bag using template literals
    activeBagList.innerHTML = state.cart
      .map((item) => {
        const displayName =
          item.serviceType === "cleanPress"
            ? item.id === "shoecleaning"
              ? "Deep Clean"
              : "Clean & Press"
            : "Press Only";

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
      })
      .join("");
  }
}

// ---------------------------------------------------------------------
// 8. FAQ ACCORDIONS CONTROLLER
// ---------------------------------------------------------------------
function initFAQs() {
  const searchInput = document.getElementById("faq-search-input");
  const faqItems = document.querySelectorAll(".faq-list .faq-item");
  const emptyState = document.getElementById("faq-empty-results");

  // Filter items in accordion list using search text
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const query = e.target.value.toLowerCase().trim();
      state.faqSearchQuery = query;
      let matchCount = 0;

      faqItems.forEach((item) => {
        const question = item
          .querySelector(".faq-question")
          .textContent.toLowerCase();
        const answer = item
          .querySelector(".faq-answer")
          .textContent.toLowerCase();

        if (question.includes(query) || answer.includes(query)) {
          item.style.display = "block";
          matchCount++;
        } else {
          item.style.display = "none";
          // Close it if hidden
          item.classList.remove("active");
          const panel = item.querySelector(".faq-content-pane");
          if (panel) panel.style.maxHeight = "0";
        }
      });

      if (matchCount === 0 && query !== "") {
        emptyState.style.display = "block";
        emptyState.querySelector("span").textContent = query;
      } else {
        emptyState.style.display = "none";
      }
    });
  }

  // Toggle Accordion Collapse heights
  faqItems.forEach((item) => {
    const trigger = item.querySelector(".faq-trigger");
    const contentPane = item.querySelector(".faq-content-pane");

    trigger.addEventListener("click", () => {
      const isAlreadyActive = item.classList.contains("active");

      // Collapse all other accordion nodes
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const pane = otherItem.querySelector(".faq-content-pane");
        if (pane) pane.style.maxHeight = "0";
      });

      // Toggle clicked node state
      if (!isAlreadyActive) {
        item.classList.add("active");
        contentPane.style.maxHeight = contentPane.scrollHeight + "px";
      } else {
        item.classList.remove("active");
        contentPane.style.maxHeight = "0";
      }

      // Update all eye/eye-slash icons
      faqItems.forEach((i) => {
        const icon = i.querySelector(".faq-trigger i");
        if (icon) {
          if (i.classList.contains("active")) {
            icon.className = "fa-regular fa-eye-slash";
          } else {
            icon.className = "fa-regular fa-eye";
          }
        }
      });
    });
  });

  // Open active items by default based on HTML
  faqItems.forEach((item) => {
    const pane = item.querySelector(".faq-content-pane");
    const icon = item.querySelector(".faq-trigger i");
    if (item.classList.contains("active")) {
      if (pane) pane.style.maxHeight = pane.scrollHeight + "px";
      if (icon) icon.className = "fa-regular fa-eye-slash";
    } else {
      if (pane) pane.style.maxHeight = "0";
      if (icon) icon.className = "fa-regular fa-eye";
    }
  });
}

// ---------------------------------------------------------------------
// 12. HERO CAROUSEL CONTROLLER
// ---------------------------------------------------------------------
function initHeroCarousel() {
  const bgSlides = document.querySelectorAll(".hero-bg-slide");
  const contentSlides = document.querySelectorAll(".hero-content-slide");
  const dots = document.querySelectorAll(".hero-dot");

  if (bgSlides.length === 0) return;

  let currentIndex = 0;
  let slideInterval;
  const SLIDE_DURATION = 15000; // 15 seconds slide change interval

  // Transitions the carousel to a specific slide index
  function showSlide(index) {
    // 1. Cycle background image slides
    bgSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // 2. Cycle matching text content blocks
    contentSlides.forEach((slide, i) => {
      if (i === index) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    // 3. Cycle corresponding dot controls on the right
    dots.forEach((dot, i) => {
      if (i === index) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
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
  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      const targetIndex = parseInt(dot.getAttribute("data-slide"), 10);
      showSlide(targetIndex);
      startAutoplay(); // Reset the 15s autoplay interval timer on click
    });
  });

  // Start with first slide initialized
  showSlide(0);
  startAutoplay();
}
