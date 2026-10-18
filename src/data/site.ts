// Global site info — update email, socials and location here.
// Everything SEO-related (metadata, JSON-LD, llms.txt, OG image) reads from this file.
export const site = {
  name: "Marlon França",
  role: "Designer",
  jobTitle: "Multidisciplinary Designer",
  url: "https://www.marlonfranca.com",
  /** ~155 characters — used as the default meta description */
  description:
    "Marlon França is a Dublin-based designer working across brand strategy, websites, 3D design, photo & video production, large print and multimedia.",
  email: "hello@marlonfranca.com",
  city: "Dublin",
  country: "Ireland",
  countryCode: "IE",
  location: "Dublin, Ireland",
  year: 2026,
  /** Bump when content changes — used as lastModified in the sitemap */
  updated: "2026-10-18",
  /** Replace with full profile URLs — bare domains are left out of structured data */
  socials: [
    { label: "Instagram", href: "https://instagram.com/" },
    { label: "LinkedIn", href: "https://linkedin.com/" },
    { label: "Behance", href: "https://behance.net/" },
  ],
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/about#contact" },
  ],
  keywords: [
    "Marlon França",
    "designer Dublin",
    "brand identity designer",
    "brand strategy",
    "web designer Ireland",
    "3D designer",
    "3D animation",
    "motion design",
    "multimedia designer",
    "large format print",
    "photo and video production",
    "graphic design portfolio",
  ],
};

/** Social profiles that point to a real account (not just a homepage) */
export const profiles = site.socials
  .map((s) => s.href)
  .filter((href) => new URL(href).pathname.replace(/\/$/, "").length > 0);

export const disciplines = [
  "Brand Strategy & Design",
  "Websites & Landing Pages",
  "Photo & Video Production",
  "Large Print",
  "3D Design",
  "Multimedia Design",
];
