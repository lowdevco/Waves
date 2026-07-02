/**
 * Waves Laundry - Services Page Interactive Logic
 * Renders the interactive pricing list dynamically from the global PRICE_LIST
 */

document.addEventListener("DOMContentLoaded", () => {
  initPricingTabs();
});

/**
 * Helper function to map item icons to Font Awesome icons
 */
function getFallbackIconClass(item, groupId) {
  if (item.name === "Shoe Cleaning") return "fa-solid fa-shoe-prints";

  const iconMap = {
    shirt: "fa-solid fa-shirt",
    tshirt: "fa-solid fa-shirt",
    polo: "fa-solid fa-shirt",
    pants: "fa-solid fa-shirt",
    suit: "fa-solid fa-user-tie",
    jacket: "fa-solid fa-shirt",
    "jacket-winter": "fa-solid fa-shirt",
    tie: "fa-solid fa-user-tie",
    waistcoat: "fa-solid fa-shirt",
    robe: "fa-solid fa-person-dress",
    guthra: "fa-solid fa-scroll",
    sweater: "fa-solid fa-shirt",
    pullover: "fa-solid fa-shirt",
    blouse: "fa-solid fa-shirt",
    abaya: "fa-solid fa-person-dress",
    dress: "fa-solid fa-person-dress",
    "dress-long": "fa-solid fa-person-dress",
    "wedding-dress": "fa-solid fa-person-dress",
    skirt: "fa-solid fa-person-dress",
    scarf: "fa-solid fa-scroll",
    undergarment: "fa-solid fa-socks",
  };

  if (iconMap[item.icon]) {
    return iconMap[item.icon];
  }

  // Fallback by group
  if (groupId === "men") return "fa-solid fa-shirt";
  if (groupId === "women") return "fa-solid fa-person-dress";
  return "fa-solid fa-house";
}

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
 * @param {string} category Category to filter by ('all', 'men', 'women', 'bedding', 'footwear')
 */
function renderPricingItems(category) {
  const pricingGrid = document.getElementById("pricing-grid");
  if (!pricingGrid) return;

  // Clear current items
  pricingGrid.innerHTML = "";

  // Flatten the new nested PRICE_LIST into a single list with mapped properties
  const flatItems = [];
  if (typeof PRICE_LIST !== "undefined") {
    PRICE_LIST.forEach((group) => {
      group.items.forEach((item) => {
        // Determine the category for filtering on the service page
        let mappedCategory = "";
        if (item.name === "Shoe Cleaning") {
          mappedCategory = "footwear";
        } else if (group.id === "men") {
          mappedCategory = "men";
        } else if (group.id === "women") {
          mappedCategory = "women";
        } else if (group.id === "home") {
          mappedCategory = "bedding";
        }

        // Prefix gender/category to distinguish identical item names
        let displayName = item.name;
        if (group.id === "men") {
          displayName = "Men's " + item.name;
        } else if (group.id === "women") {
          displayName = "Women's " + item.name;
        }

        flatItems.push({
          ...item,
          displayName: displayName,
          category: mappedCategory,
          groupId: group.id,
        });
      });
    });
  }

  // Filter the flattened list
  const filteredList =
    category === "all"
      ? flatItems
      : flatItems.filter((item) => item.category === category);

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
    card.className = "price-service-card animate-fade-in";

    // Clean & Iron Price HTML
    const cleanIronPriceHtml = item.cleanIron
      ? `<span class="price-rate-value">${parseFloat(item.cleanIron).toFixed(2)} AED</span>`
      : `<span class="price-rate-value not-available">—</span>`;

    // Steam & Iron Price HTML
    const steamIronPriceHtml = item.steamIron
      ? `<span class="price-rate-value">${parseFloat(item.steamIron).toFixed(2)} AED</span>`
      : `<span class="price-rate-value not-available">—</span>`;

    // Image or Fallback Icon HTML
    let imageHtml = "";
    if (item.image && item.image !== "") {
      imageHtml = `<img src="${item.image}" alt="${item.displayName}" loading="lazy" />`;
    } else {
      const fallbackIcon = getFallbackIconClass(item, item.groupId);
      imageHtml = `
        <div class="price-image-fallback">
          <i class="${fallbackIcon}"></i>
        </div>
      `;
    }

    card.innerHTML = `
      <div class="price-image-wrapper">
        ${imageHtml}
      </div>
      <h3 class="price-item-title">${item.displayName}</h3>
      <div class="price-details-box">
        <div class="price-rate-row">
          <span class="price-rate-label">
            <i class="fa-solid fa-soap"></i> Clean & iron
          </span>
          ${cleanIronPriceHtml}
        </div>
        <div class="price-rate-row">
          <span class="price-rate-label">
            <i class="fa-solid fa-shirt"></i> Steam & iron
          </span>
          ${steamIronPriceHtml}
        </div>
      </div>
    `;

    pricingGrid.appendChild(card);
  });
}
