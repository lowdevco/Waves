//  * Waves Laundry - Services Data

const SERVICES_DATA = [
  {
    id: "dry_cleaning",
    title: "Expert Dry Cleaning",
    description:
      "Advanced solvent systems, gentle processing cycles, and expert stain-removal techniques tailored specifically for luxury textiles such as silk, velvet, chiffon, cashmere, and couture garments. Every item is treated with the utmost precision to maintain fabric integrity and color richness.",
    image: "/static/website/images/common_images/services/service-dryclean.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M12 18 L12 56 A 4 4 0 0 0 16 60 L48 60 A 4 4 0 0 0 52 56 L52 18 L32 10 Z" />
                                    <path d="M22 28 L32 38 L42 28" />
                                    <path d="M32 38 L32 60" />
                                    <path d="M26 36 L20 48" />
                                    <path d="M38 36 L44 48" />
                                    <path d="M32 10 V4 A 3 3 0 0 1 35 1 A 1 1 0 0 1 36 2" />
                                    <path d="M46 8 L47 11 L50 12 L47 13 L46 16 L45 13 L42 12 L45 11 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M14 22 L15 24 L17 25 L15 26 L14 28 L13 26 L11 25 L13 24 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "delicates",
    title: "Designer & Delicate Wear Handling",
    description:
      "A dedicated team manages bridal wear, couture fashion, embellished garments, sequins, beads, and limited-edition designer pieces. Specialized techniques ensure the finest garments retain their elegance, structure, and brilliance.",
    image: "/static/website/images/common_images/services/service-delicates.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M20 18 L25 10 L32 13 L39 10 L44 18 L42 34 L22 34 Z" />
                                    <path d="M28 10 A 4 4 0 0 0 36 10" />
                                    <path
                                        d="M10 44 C 14 44, 18 42, 22 47 L 24 50 C 26 53, 30 53, 32 50 C 34 53, 38 53, 40 50 L 42 47 C 46 42, 50 44, 54 44" />
                                    <path d="M12 40 Q 20 38, 25 44" />
                                    <path d="M52 40 Q 44 38, 39 44" />
                                    <path d="M32 2 L33 5 L36 6 L33 7 L32 10 L31 7 L28 6 L31 5 Z" fill="currentColor"
                                        stroke="none" />
                                    <path d="M15 15 L16 17 L18 18 L16 19 L15 21 L14 19 L12 18 L14 17 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M49 15 L50 17 L52 18 L50 19 L49 21 L48 19 L46 18 L48 17 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "luxury_laundry",
    title: "Premium Laundry & Finishing",
    description:
      "Fabric-specific wash programs combined with premium softeners and hand-finished pressing deliver crisp, immaculate, hotel-grade results. Perfect for individuals who expect refined perfection in every fold.",
    image: "/static/website/images/common_images/services/service-washfold.png",
    iconColorClass: "icon-green",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M32 14 L18 20 L22 36 L42 36 L46 20 Z" />
                                    <path d="M32 14 V8 A 3 3 0 0 1 35 5" />
                                    <path d="M26 20 A 6 6 0 0 0 38 20" />
                                    <path d="M14 42 H50 C54 42, 54 46, 50 46 H14 C10 46, 10 42, 14 42 Z" />
                                    <path d="M14 48 H50 C54 48, 54 52, 50 52 H14 C10 52, 10 48, 14 48 Z" />
                                    <path d="M14 54 H50 C54 54, 54 58, 50 58 H14 C10 58, 10 54, 14 54 Z" />
                                    <path d="M52 12 L53 14 L55 15 L53 16 L52 18 L51 16 L49 15 L51 14 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "alterations",
    title: "Professional Alterations ",
    description:
      "Couture-level tailoring solutions including hemming, tapering, resizing, zip replacements, and button fixing. Your garments receive detailed craftsmanship that enhances both fit and comfort.",
    image: "/static/website/images/common_images/services/service-alterations.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M8 52 H56 V56 H8 Z" />
                                    <path d="M16 52 V20 H40 C46 20, 48 24, 48 28 V52" />
                                    <path d="M48 28 H36 V36 H48" />
                                    <path d="M32 20 V14 H28 V20" />
                                    <circle cx="16" cy="28" r="6" />
                                    <path d="M36 36 V46" />
                                    <path d="M34 46 H38" />
                                    <rect x="28" y="10" width="8" height="4" />
                                    <path d="M32 10 C 24 10, 20 18, 36 28" />
                                </svg>
    `,
  },
  {
    id: "shoe_care",
    title: "Shoe Care",
    description:
      "Deep cleaning, deodorizing, polishing, suede revival, color correction, and full sneaker spa treatments. Each pair is rejuvenated using premium materials and expert care methods.",
    image: "/static/website/images/common_images/services/service-shoes.png",
    iconColorClass: "icon-green",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M10 46 L24 46 C28 46, 32 40, 36 38 L48 38 C54 38, 56 42, 56 46 V50 H10 Z" />
                                    <path d="M26 32 L34 38" />
                                    <path d="M30 30 L36 36" />
                                    <path d="M48 38 C48 32, 44 26, 38 26 L28 26 C24 26, 20 30, 18 34 L10 46" />
                                    <rect x="14" y="14" width="16" height="6" rx="2" />
                                    <path d="M16 20 V26 M20 20 V26 M24 20 V26 M28 20 V26" />
                                    <path d="M46 14 L47 17 L50 18 L47 19 L46 22 L45 19 L42 18 L45 17 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M54 24 L55 26 L57 27 L55 28 L54 30 L53 28 L51 27 L53 26 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "curtain_care",
    title: "Curtain & Drapery Care",
    description:
      "Precision cleaning solutions for sheers, blackout drapes, velvet curtains, and custom installations. Our process preserves fabric richness, drape, and structure while eliminating dust and allergens.",
    image: "/static/website/images/common_images/services/service-curtain.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M6 10 H58" />
                                    <circle cx="5" cy="10" r="2" />
                                    <circle cx="59" cy="10" r="2" />
                                    <path d="M12 10 V52 C12 52, 16 42, 24 46 C28 48, 28 10, 28 10" />
                                    <path d="M52 10 V52 C52 52, 48 42, 40 46 C36 48, 36 10, 36 10" />
                                    <path d="M12 32 C 16 32, 20 30, 24 28" />
                                    <path d="M52 32 C 48 32, 44 30, 40 28" />
                                    <path d="M32 20 L33 22 L35 23 L33 24 L32 26 L31 24 L29 23 L31 22 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M46 16 L47 18 L49 19 L47 20 L46 22 L45 20 L43 19 L45 18 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M18 16 L19 18 L21 19 L19 20 L18 22 L17 20 L15 19 L17 18 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "bag_spa",
    title: "Bag Care",
    description:
      "Comprehensive handbag care featuring deep cleaning, stain correction, leather conditioning, moisturization treatments, and hardware polishing. Ideal for luxury leather goods and designer bags.",
    image: "/static/website/images/common_images/services/service-bag-spa.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M14 26 H50 A 4 4 0 0 1 54 30 L50 54 A 4 4 0 0 1 46 58 H18 A 4 4 0 0 1 14 54 L10 30 A 4 4 0 0 1 14 26 Z" />
                                    <path d="M22 26 V18 C22 12, 42 12, 42 18 V26" />
                                    <rect x="29" y="32" width="6" height="8" rx="1" />
                                    <circle cx="32" cy="36" r="1" />
                                    <path d="M14 16 L15 18 L17 19 L15 20 L14 22 L13 20 L11 19 L13 18 Z"
                                        fill="currentColor" stroke="none" />
                                    <path d="M50 16 L51 18 L53 19 L51 20 L50 22 L49 20 L47 19 L49 18 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
  {
    id: "carpet_cleaning",
    title: "Carpet Deep Cleaning",
    description:
      "Professional carpet treatment using high-performance extraction, stain removal systems, deep sanitization, and fiber-protection coatings. Suitable for residences and commercial spaces requiring long-lasting freshness and hygiene.",
    image: "/static/website/images/common_images/services/service-carpet.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path d="M14 20 L44 12 C52 10, 56 16, 50 20 L20 28 C14 30, 10 24, 16 20" />
                                    <path d="M20 28 L50 50 C56 54, 52 60, 44 56 L14 34 C8 30, 8 24, 14 20" />
                                    <path d="M24 24 L48 42" />
                                    <path d="M28 21 L52 39" />
                                    <path d="M50 50 L54 53 M48 51 L52 54 M46 52 L50 55 M44 53 L48 56" />
                                    <path d="M14 20 L10 17 M16 19 L12 16 M18 18 L14 15 M20 17 L16 14" />
                                </svg>
    `,
  },
  {
    id: "leather_care",
    title: "Leather & Suede Care",
    description:
      "Leather and suede are durable and stylish materials often used in clothing, footwear, accessories, and furniture. Specialized cleaning prevents cracking and maintains color.",
    image: "/static/website/images/common_images/services/service-leather.png",
    iconColorClass: "icon-blue",
    iconSvg: `
                                <svg viewBox="0 0 64 64" fill="none" stroke="currentColor" stroke-linecap="round"
                                    stroke-linejoin="round">
                                    <path
                                        d="M32 6 C24 6, 20 12, 14 10 C8 8, 6 16, 10 22 C6 28, 8 36, 12 40 C10 46, 14 54, 22 52 C28 56, 36 56, 42 52 C50 54, 54 46, 52 40 C56 36, 58 28, 54 22 C58 16, 56 8, 50 10 C44 12, 40 6, 32 6 Z" />
                                    <path d="M24 20 C 28 24, 36 24, 40 20" />
                                    <path d="M24 40 C 28 36, 36 36, 40 40" />
                                    <path d="M32 26 L33 28 L35 29 L33 30 L32 32 L31 30 L29 29 L31 28 Z"
                                        fill="currentColor" stroke="none" />
                                </svg>
    `,
  },
];
