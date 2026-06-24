/**
 * Waves Laundry - Services Page Interactive Logic
 * Renders the interactive pricing list dynamically from the global PRICE_LIST
 */

document.addEventListener("DOMContentLoaded", () => {
  initPricingTabs();
});

/**
 * Initializes pricing tab click handlers and renders initial items
 */
function initPricingTabs() {
  const pricingGrid = document.getElementById("pricing-grid");
  const tabButtons = document.querySelectorAll(".pricing-tab-btn");

  if (!pricingGrid) return;

  // Render all items initially
  renderPricingItems("all");

  // Add click listeners to filter buttons
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Remove active class from all buttons and add to the clicked one
      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items
      const category = btn.getAttribute("data-category");
      renderPricingItems(category);
    });
  });
}

/**
 * Renders pricing items based on the selected category
 * @param {string} category Category to filter by ('all', 'garments', 'bedding', 'footwear')
 */
function renderPricingItems(category) {
  const pricingGrid = document.getElementById("pricing-grid");
  if (!pricingGrid) return;

  // Clear current items
  pricingGrid.innerHTML = "";

  // Filter the price list
  const filteredList =
    category === "all"
      ? PRICE_LIST
      : PRICE_LIST.filter((item) => item.category === category);

  // If no items found
  if (filteredList.length === 0) {
    pricingGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--slate-light);">
        <i class="fa-solid fa-folder-open" style="font-size: 3rem; margin-bottom: 15px; display: block; opacity: 0.5;"></i>
        <p>No pricing items available in this category.</p>
      </div>
    `;
    return;
  }

  // Generate cards
  filteredList.forEach((item) => {
    const card = document.createElement("div");
    card.className = "price-item-card animate-fade-in";

    // Clean & Press Price HTML
    const cleanPressPriceHtml = item.prices.cleanPress
      ? `<span class="price-rate-value">${item.prices.cleanPress} AED</span>`
      : `<span class="price-rate-value not-available">—</span>`;

    // Press Only Price HTML
    const pressPriceHtml = item.prices.press
      ? `<span class="price-rate-value">${item.prices.press} AED</span>`
      : `<span class="price-rate-value not-available">—</span>`;

    card.innerHTML = `
      <div class="price-image-wrapper">
        <img src="${item.image}" alt="${item.name}" loading="lazy" />
      </div>
      <h3 class="price-item-title">${item.name}</h3>
      <div class="price-details-box">
        <div class="price-rate-row">
          <span class="price-rate-label">
            <i class="fa-solid fa-wand-magic-sparkles"></i> Clean & Press
          </span>
          ${cleanPressPriceHtml}
        </div>
        <div class="price-rate-row">
          <span class="price-rate-label">
            <i class="fa-solid fa-shirt"></i> Press Only
          </span>
          ${pressPriceHtml}
        </div>
      </div>
    `;

    pricingGrid.appendChild(card);
  });
}
