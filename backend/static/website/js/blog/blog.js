/**
 * Waves Laundry - Blog Section Dynamic Data & Rendering
 * Defines the blog post items and handles rendering inside blog.html
 */

// 1. BLOG DATA
const BLOG_POSTS = [
  {
    id: 1,
    title: "The Ultimate Guide to Stain Removal at Home",
    excerpt:
      "Learn how to tackle tough stains like coffee, red wine, and grease using common household ingredients before calling the pros.",
    date: "June 25, 2026",
    readTime: "4 Min Read",
    category: "Stain Removal",
    image: "", // Empty as requested, user will add later
  },
  {
    id: 2,
    title: "Dry Cleaning vs. Wet Cleaning: What's the Difference?",
    excerpt:
      "Explore the technical differences, environmental impacts, and fabric care advantages of professional dry cleaning vs. modern wet cleaning.",
    date: "June 18, 2026",
    readTime: "5 Min Read",
    category: "Expert Care",
    image: "", // Empty as requested, user will add later
  },
  {
    id: 3,
    title: "How to Safely Store Your Silk & Cashmere Garments",
    excerpt:
      "Protect your luxury fabrics from moths, humidity, and stretching with our expert seasonal storage guide for silk and cashmere.",
    date: "June 10, 2026",
    readTime: "6 Min Read",
    category: "Fabric Guide",
    image: "", // Empty as requested, user will add later
  },
];

// 2. INITIALIZATION ON DOM LOAD
document.addEventListener("DOMContentLoaded", () => {
  renderBlogPosts();
});

// 3. RENDERING FUNCTION
function renderBlogPosts() {
  const blogGrid = document.getElementById("blog-grid");
  if (!blogGrid) return;

  // Clear current skeleton/contents
  blogGrid.innerHTML = "";

  if (BLOG_POSTS.length === 0) {
    blogGrid.innerHTML = `
      <div style="grid-column: 1/-1; text-align: center; padding: 60px; color: var(--slate-light);">
        <i class="fa-solid fa-newspaper" style="font-size: 3.5rem; margin-bottom: 20px; display: block; opacity: 0.5;"></i>
        <p>No blog posts found. Check back soon for updates!</p>
      </div>
    `;
    return;
  }

  // Iterate over blog data to generate cards
  blogGrid.innerHTML = BLOG_POSTS.map((post) => {
    // Generate image HTML (renders placeholder design if image path is empty)
    let imageHtml = "";
    if (post.image && post.image.trim() !== "") {
      imageHtml = `<img src="${post.image}" alt="${post.title}" class="blog-card-img" loading="lazy" />`;
    } else {
      // Premium icon fallback based on post category
      let fallbackIcon = "fa-solid fa-newspaper";
      if (post.category === "Stain Removal")
        fallbackIcon = "fa-solid fa-wand-magic-sparkles";
      else if (post.category === "Expert Care")
        fallbackIcon = "fa-solid fa-soap";
      else if (post.category === "Fabric Guide")
        fallbackIcon = "fa-solid fa-shirt";

      imageHtml = `
        <div class="blog-card-img-placeholder">
          <i class="${fallbackIcon}"></i>
          <span class="placeholder-text">Image to be added</span>
        </div>
      `;
    }

    return `
      <article class="blog-card animate-fade-in">
        <div class="blog-card-img-wrapper">
          ${imageHtml}
          <span class="blog-card-category">${post.category}</span>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="meta-item">
              <i class="fa-regular fa-calendar"></i> ${post.date}
            </span>
            <span class="meta-item">
              <i class="fa-regular fa-clock"></i> ${post.readTime}
            </span>
          </div>
          <h3 class="blog-card-title">
            <a href="#">${post.title}</a>
          </h3>
          <p class="blog-card-excerpt">${post.excerpt}</p>
          <a href="#" class="blog-card-link">
            Read More <i class="fa-solid fa-arrow-right-long"></i>
          </a>
        </div>
      </article>
    `;
  }).join("");
}
