
//  * Waves Laundry - Services Data 


const SERVICES_DATA = [
  {
    id: "dry_cleaning",
    title: "Premium Dry Cleaning",
    description:
      "Advanced solvent systems, gentle processing cycles, and expert stain-removal techniques tailored specifically for luxury textiles such as silk, velvet, chiffon, cashmere, and couture garments. Every item is treated with the utmost precision to maintain fabric integrity and color richness.",
    image: "assets/images/common_images/services/service-dryclean.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M22 10H8.5c-1.5 0-3 1.2-3 2.6V19a2 2 0 0 0 2 2h13a2 2 0 0 0 2-2v-6.4c0-1.4-1.5-2.6-3-2.6z"/>
        <path d="M12 5V2"/>
        <path d="M9 2h6"/>
        <path d="M8.5 10c0-1.8 1.5-3.2 3.5-3.2h0c2 0 3.5 1.4 3.5 3.2"/>
      </svg>
    `,
  },
  {
    id: "delicates",
    title: "Designer & Delicate Wear Handling",
    description:
      "A dedicated team manages bridal wear, couture fashion, embellished garments, sequins, beads, and limited-edition designer pieces. Specialized techniques ensure the finest garments retain their elegance, structure, and brilliance.",
    image: "assets/images/common_images/services/service-delicates.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <path d="M12 8v8M8 12h8"/>
      </svg>
    `,
  },
  {
    id: "luxury_laundry",
    title: "Luxury Laundry & Finishing",
    description:
      "Fabric-specific wash programs combined with premium softeners and hand-finished pressing deliver crisp, immaculate, hotel-grade results. Perfect for individuals who expect refined perfection in every fold.",
    image: "assets/images/common_images/services/service-washfold.png",
    iconColorClass: "icon-green",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="4" y="2" width="16" height="20" rx="2" ry="2"/>
        <circle cx="12" cy="13" r="4"/>
        <line x1="8" y1="6" x2="8.01" y2="6"/>
        <line x1="12" y1="6" x2="12.01" y2="6"/>
        <line x1="16" y1="6" x2="16.01" y2="6"/>
      </svg>
    `,
  },
  {
    id: "alterations",
    title: "Professional Alterations & Repairs",
    description:
      "Couture-level tailoring solutions including hemming, tapering, resizing, zip replacements, button fixing, and structural repairs. Your garments receive detailed craftsmanship that enhances both fit and comfort.",
    image: "assets/images/common_images/services/service-alterations.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="6" cy="6" r="3"/>
        <circle cx="6" cy="18" r="3"/>
        <line x1="9.8" y1="8.2" x2="20" y2="18"/>
        <line x1="9.8" y1="15.8" x2="20" y2="6"/>
      </svg>
    `,
  },
  {
    id: "shoe_care",
    title: "Shoe Care & Restoration",
    description:
      "Deep cleaning, deodorizing, polishing, suede revival, color correction, and full sneaker spa treatments. Each pair is rejuvenated using premium materials and expert restoration methods.",
    image: "assets/images/common_images/services/service-shoes.png",
    iconColorClass: "icon-green",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M3 18c0-3 3-5 9-5s9 2 9 5v1H3v-1z"/>
        <path d="M6 13V9c0-2 3-3 6-3s6 1 6 3v4"/>
      </svg>
    `,
  },
  {
    id: "curtain_care",
    title: "Curtain & Drapery Care",
    description:
      "Precision cleaning solutions for sheers, blackout drapes, velvet curtains, and custom installations. Our process preserves fabric richness, drape, and structure while eliminating dust and allergens.",
    image: "assets/images/common_images/services/service-curtain.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 4v16M20 4v16M4 4h16M4 10h16M4 15h16"/>
      </svg>
    `,
  },
  {
    id: "bag_spa",
    title: "Bag Spa & Restoration",
    description:
      "Comprehensive handbag restoration featuring deep cleaning, stain correction, leather conditioning, moisturization treatments, structural reshaping, and hardware polishing. Ideal for luxury leather goods and designer bags.",
    image: "assets/images/common_images/services/service-bag-spa.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2z"/>
        <path d="M16 7V5a4 4 0 0 0-8 0v2"/>
      </svg>
    `,
  },
  {
    id: "carpet_cleaning",
    title: "Carpet Deep Cleaning",
    description:
      "Professional carpet treatment using high-performance extraction, stain removal systems, deep sanitization, and fiber-protection coatings. Suitable for residences and commercial spaces requiring long-lasting freshness and hygiene.",
    image: "assets/images/common_images/services/service-carpet.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
        <path d="M2 12h20"/>
      </svg>
    `,
  },
  {
    id: "leather_care",
    title: "Leather & Suede Care",
    description:
      "Leather and suede are durable and stylish materials often used in clothing, footwear, accessories, and furniture. Specialized cleaning prevents cracking and maintains color.",
    image: "assets/images/common_images/services/service-leather.png",
    iconColorClass: "icon-blue",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M2 17L12 22L22 17M2 12L17L22 12M12 2L2 7L12 12L22 7L12 2Z"/>
      </svg>
    `,
  },
  {
    id: "sofa_cleaning",
    title: "Sofa Cleaning",
    description:
      "Deep extraction shampooing and sanitization of upholstery, reaching tight seams and restoring pristine fabric luster.",
    image: "assets/images/common_images/services/service-sofa.png",
    iconColorClass: "icon-green",
    iconSvg: `
      <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3M3 11v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5M3 11a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4z"/>
      </svg>
    `,
  },
];
