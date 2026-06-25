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
// 6. PRICE LIST ACCORDION CONTROLLER
// ---------------------------------------------------------------------

function getItemSvgIcon(iconName) {
  const paths = {
    shirt: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/>',
    tshirt: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M9 10h6"/>',
    polo: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M12 2v6"/><path d="M9 5h6"/>',
    pants: '<path d="M5 2h14v2.5L16.5 22h-3L12 9.5 10.5 22h-3L5 4.5V2z"/>',
    suit: '<path d="M4 2v20h16V2H4z"/><path d="M12 2l4 8H8l4-8z"/><path d="M12 10v12"/><path d="M10 13h4"/>',
    jacket: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M12 8v14"/>',
    'jacket-winter': '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M12 8v14"/><path d="M4 14h16M4 18h16"/>',
    tie: '<path d="M10 2h4l1 4-2 14-2-14 1-4z"/><path d="M10 6h4"/>',
    waistcoat: '<path d="M4 2h16v8c0 4-3 8-8 12-5-4-8-8-8-12V2z"/><path d="M12 2v20"/><path d="M4 8h16"/>',
    robe: '<path d="M6 2h12v18a2 2 0 01-2 2H8a2 2 0 01-2-2V2z"/><path d="M6 6h12"/><path d="M12 2v20"/>',
    guthra: '<path d="M12 2L4 8v10l8 4 8-4V8l-8-6z"/><path d="M12 2v20"/><path d="M4 12h16"/>',
    sweater: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M6 8h12"/>',
    pullover: '<path d="M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.62 2V9a2 2 0 002 2h2v10a2 2 0 002 2h8a2 2 0 002-2V11h2a2 2 0 002-2V5.46a2 2 0 00-1.62-2z"/><path d="M12 6a3 3 0 00-3 3h6a3 3 0 00-3-3z"/>',
    blouse: '<path d="M12 2a3 3 0 00-3 3v2H6l1 13a2 2 0 002 2h6a2 2 0 002-2l1-13h-3V5a3 3 0 00-3-3z"/>',
    abaya: '<path d="M6 2h12v18a2 2 0 01-2 2H8a2 2 0 01-2-2V2z"/><path d="M6 8h12"/><path d="M12 2v20"/>',
    dress: '<path d="M12 2a3 3 0 00-3 3v2H6l2 13a2 2 0 002 2h4a2 2 0 002-2L18 7h-3V5a3 3 0 00-3-3z"/>',
    'dress-long': '<path d="M12 2a3 3 0 00-3 3v2H6l3 15a2 2 0 002 2h2a2 2 0 002-2L18 7h-3V5a3 3 0 00-3-3z"/>',
    'wedding-dress': '<path d="M12 2a3 3 0 00-3 3v2H6l4 15H5l7 2 7-2h-5l4-15h-3V5a3 3 0 00-3-3z"/>',
    skirt: '<path d="M8 2h8l3 18H5L8 2z"/>',
    scarf: '<path d="M18 2H6a2 2 0 00-2 2v12a4 4 0 004 4h8a4 4 0 004-4V4a2 2 0 00-2-2z"/><path d="M8 22V10"/><path d="M16 22V10"/>',
    undergarment: '<path d="M3 5h18v4c0 4-3 7-9 10-6-3-9-6-9-10V5z"/><path d="M3 9h18"/>',
    towel: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M3 15h18"/>',
    footmat: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M6 8h12v8H6V8z"/>',
    bathrobe: '<path d="M6 2h12v18a2 2 0 01-2 2H8a2 2 0 01-2-2V2z"/><path d="M6 10h12M6 14h12M12 2v20"/>',
    pillowcase: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M6 6c0 3 1.5 6 3 6s3-3 3-6"/><path d="M18 6c0 3-1.5 6-3 6s-3-3-3-6"/>',
    bedsheet: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M6 10v6"/>',
    bedcover: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 10h20"/><path d="M6 10l3 3 3-3 3 3 3-3"/>',
    blanket: '<rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 8c4 0 4 4 8 4s4-4 8-4"/><path d="M3 14c4 0 4 4 8 4s4-4 8-4"/>',
    apron: '<path d="M6 6h12v12c0 3-3 6-9 6s-9-3-9-6V6zm0 0l3-4h6l3 4"/><path d="M3 12h18"/>',
    tablecloth: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="M2 12h20M6 4v16M18 4v16"/>',
    pillow: '<rect x="3" y="6" width="18" height="12" rx="3"/><path d="M3 12h18"/>'
  };

  const pathStr = paths[iconName] || paths['shirt'];
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${pathStr}</svg>`;
}

function renderPriceCategory(categoryId) {
  const gridContainer = document.getElementById("price-grid-container");
  if (!gridContainer || typeof PRICE_LIST === "undefined") return;

  const category = PRICE_LIST.find((c) => c.id === categoryId);
  if (!category) return;

  gridContainer.style.opacity = "0";

  setTimeout(() => {
    const totalItems = category.items.length;
    const remainder = totalItems % 3;

    gridContainer.innerHTML = category.items.map((item, index) => {
      const hasCleanIron = item.cleanIron !== null;
      const hasSteamIron = item.steamIron !== null;
      const iconSvg = getItemSvgIcon(item.icon);

      let spanClass = "";
      if (remainder === 1 && index === totalItems - 1) {
        spanClass = "span-6";
      } else if (remainder === 2 && index >= totalItems - 2) {
        spanClass = "span-3";
      }

      let pricesHtml = "";

      if (hasCleanIron && hasSteamIron) {
        pricesHtml = `
          <div class="card-price-grid">
            <div class="price-pill-row">
              <span class="price-pill-lbl"><i class="fa-solid fa-soap"></i> Clean & iron</span>
              <span class="price-pill-val">${parseFloat(item.cleanIron).toFixed(2)} AED</span>
            </div>
            <div class="price-pill-row">
              <span class="price-pill-lbl"><i class="fa-solid fa-shirt"></i> Steam & iron</span>
              <span class="price-pill-val">${parseFloat(item.steamIron).toFixed(2)} AED</span>
            </div>
          </div>
        `;
      } else if (hasCleanIron) {
        // Clean & Iron Only
        pricesHtml = `
          <div class="single-price-pill">
            <span class="price-pill-lbl"><i class="fa-solid fa-soap"></i> Clean & iron Only</span>
            <span class="price-pill-val">${parseFloat(item.cleanIron).toFixed(2)} AED</span>
          </div>
        `;
      }

      return `
        <div class="price-item-card ${spanClass}">
          <div class="card-top-row">
            <div class="card-icon-bubble">
              ${iconSvg}
            </div>
            <h4 class="card-title-text">${item.name}</h4>
          </div>
          ${pricesHtml}
        </div>
      `;
    }).join("");

    gridContainer.style.opacity = "1";
  }, 200);
}

function initPriceEstimator() {
  const tabsContainer = document.getElementById("price-list-tabs-container");
  const tabButtons = document.querySelectorAll(".price-tab");
  const indicator = document.getElementById("active-tab-indicator");

  if (!tabsContainer || tabButtons.length === 0) return;

  // Function to align indicator slide position
  function updateIndicator(activeTab) {
    if (!indicator || window.innerWidth <= 768) return;
    indicator.style.left = activeTab.offsetLeft + "px";
    indicator.style.width = activeTab.offsetWidth + "px";
  }

  // Bind click event triggers to tab switcher buttons
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const categoryId = btn.getAttribute("data-category-id");

      // Reset active states
      tabButtons.forEach((b) => {
        b.classList.remove("active", "men-active", "women-active", "home-active");
      });

      // Reset background indicators classes
      if (indicator) {
        indicator.className = "active-tab-indicator";
        indicator.classList.add(`indicator-${categoryId}`);
      }

      // Reset outer theme class
      tabsContainer.className = "price-list-tabs-container";
      tabsContainer.classList.add(`theme-${categoryId}`);

      // Set active classes
      btn.classList.add("active", `${categoryId}-active`);
      updateIndicator(btn);

      // Render the items
      renderPriceCategory(categoryId);
    });
  });

  // Render initial Men category on page load
  const initialActiveTab = document.querySelector(".price-tab.active");
  if (initialActiveTab) {
    const categoryId = initialActiveTab.getAttribute("data-category-id");
    renderPriceCategory(categoryId);
    
    // Set initial indicator position after rendering complete (need short delay for client rect layout calculations)
    setTimeout(() => {
      updateIndicator(initialActiveTab);
    }, 150);
  }

  // Handle window resizing to adjust sliding indicator width dynamically
  window.addEventListener("resize", () => {
    const activeTab = document.querySelector(".price-tab.active");
    if (activeTab) {
      updateIndicator(activeTab);
    }
  });
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
