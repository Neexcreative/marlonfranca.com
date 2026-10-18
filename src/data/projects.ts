// Placeholder projects — replace titles and copy when the real work is ready.
//
// The home grid is a fixed bento of 8 slots, filled in this order:
//   1 Brand Strategy & Design (wide)   2 Websites & Landing Pages
//   3 Photo & Video Production         4 Large Print
//   5 3D Design (tall)                 6–8 Multimedia Design
//
// Media: put files in /public/projects/<slug>/ and reference them from the root:
//   cover:  "/projects/halden-coffee/cover.mp4"   ← 3D animation plays in the card + popup
//   poster: "/projects/halden-coffee/cover.jpg"   ← first frame, shown while the video loads
//   images: ["/projects/halden-coffee/01.jpg", "/projects/halden-coffee/02.mp4", ...]
// Images and videos (.mp4 / .webm) can be mixed anywhere. See public/projects/README.md.

export type Category =
  | "Brand Strategy & Design"
  | "Websites & Landing Pages"
  | "Photo & Video Production"
  | "Large Print"
  | "3D Design"
  | "Multimedia Design";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: Category;
  services: string[];
  /** Short briefing shown on the card — max 2 lines */
  summary: string;
  description: string[];
  /** Placeholder tone used in the popup gallery until real media exists */
  tone: string;
  /** Image or video path from /public — leave empty to show a placeholder */
  cover?: string;
  /** Still image shown before the cover video loads */
  poster?: string;
  /** Gallery inside the popup. Images and videos can be mixed.
   *  A plain path follows the half / half / full pattern; use { src, full: true }
   *  to force a full-width item, or { src } for half width. */
  images?: (string | { src: string; full?: boolean })[];
};

const lorem = [
  "A short paragraph about the brief: who the client is, what problem they had and what the project needed to achieve.",
  "Then the approach: the idea behind the work, key decisions on typography, colour and system, and how it was rolled out across touchpoints.",
];

export const projects: Project[] = [
  {
    slug: "halden-coffee",
    title: "Halden Coffee",
    client: "Halden Coffee Co.",
    year: 2026,
    category: "Brand Strategy & Design",
    services: ["Brand Strategy", "Visual Identity", "Packaging"],
    summary: "Positioning and identity system for a specialty coffee roaster.",
    description: lorem,
    tone: "#d8cfc0",
  },
  {
    slug: "northline-studio",
    title: "Northline Studio",
    client: "Northline Architects",
    year: 2026,
    category: "Websites & Landing Pages",
    services: ["Web Design", "Development"],
    summary: "Portfolio website for an architecture practice.",
    description: lorem,
    tone: "#c9d0cc",
  },
  {
    slug: "atlas-festival",
    title: "Atlas Festival",
    client: "Atlas Music Festival",
    year: 2025,
    category: "Photo & Video Production",
    services: ["Video Production", "Photography", "Editing"],
    summary: "Campaign film and photography for a music festival.",
    description: lorem,
    tone: "#e2c9bf",
  },
  {
    slug: "the-drain-team",
    title: "The Drain Team",
    client: "The Drain Team",
    year: 2026,
    category: "Large Print",
    services: ["Brand Identity", "Vehicle Wrap Design", "Large Format Print", "Installation"],
    summary: "Brand launch and full van wrap fleet for a new Irish drainage company.",
    description: [
      "The Drain Team is a new drainage company launching in Ireland. The goal was to turn their vans into moving billboards, so the brand is instantly recognisable on the road and on every job site.",
      "Bold red panels carry the wordmark and contact details, while an illustrated system of blue pipes and flowing water wraps around each vehicle. It reads at a glance and tells people exactly what the company does.",
      "I handled the project end to end: brand and illustration in Illustrator with AI-assisted exploration, vehicle measurements and production files, large-format printing, lamination and installation. Delivered through Neex Creative and WTS Ireland / Hall Print.",
      "Both vans were printed, wrapped and are now on the road, with entirely positive feedback from the client.",
    ],
    tone: "#d9d4cc",
    cover: "/projects/the-drain-team/cover.jpg",
    images: [
      { src: "/projects/the-drain-team/01-design.jpg", full: true },
      { src: "/projects/the-drain-team/02-print.jpg" },
      { src: "/projects/the-drain-team/03-lamination.jpg" },
      { src: "/projects/the-drain-team/04-installation.jpg" },
      { src: "/projects/the-drain-team/05-rear-detail.jpg" },
    ],
  },
  {
    slug: "gym-coffee",
    title: "Gym+Coffee Collection Launch",
    client: "Self-initiated concept",
    year: 2025,
    category: "3D Design",
    services: ["Spatial Design", "3D Modelling & Rendering", "Campaign Graphics"],
    summary: "A 3D brand activation concept for a new Gym+Coffee collection launch.",
    description: [
      "A self-initiated concept exploring how a new Gym+Coffee collection launch could live as a physical space. The brief I set myself: a modern environment where fans and brand enthusiasts can meet, connect over coffee and pre-order the new collection on site.",
      "The layout pairs a lounge and coffee bar with open seating and chilled drinks displays, framed by backlit lightbox walls carrying the campaign. A central counter with point-of-sale screens handles pre-sales, while large-format graphics such as Athleisure to Love and Form Meets Function guide visitors through the space.",
      "I designed the whole project: spatial layout, 3D modelling, materials, lighting and rendering in Blender, plus the campaign artwork and graphic panels in Photoshop.",
      "Self-initiated portfolio concept. Not commissioned by or affiliated with Gym+Coffee or Debenhams.",
    ],
    tone: "#2a2d31",
    cover: "/projects/gym-coffee/cover.mp4",
    images: [
      { src: "/projects/gym-coffee/01-overview.jpg", full: true },
      { src: "/projects/gym-coffee/02-coffee-bar.jpg" },
      { src: "/projects/gym-coffee/03-counter.jpg" },
      { src: "/projects/gym-coffee/04-campaign-panels.jpg", full: true },
    ],
  },
  {
    slug: "fanta-dirty-soda",
    title: "Fanta Dirty Soda Special Edition",
    client: "Kerry Group for Fanta, via Hall Print Solutions",
    year: 2026,
    category: "Multimedia Design",
    services: ["Print Preparation", "Label Production", "Application & Finishing"],
    summary: "Special edition can labels for a Fanta Dirty Soda event release.",
    description: [
      "A limited run of custom can labels for a Fanta Dirty Soda special edition, produced for an event across four flavours, including Blueberry Toasted Pastry and Mango Sticky Rice.",
      "My role was taking the artwork through to production: adjusting the files for print, testing fit and wrap on the can, preparing the print sheets, then finishing and applying the labels by hand.",
      "Delivered through Hall Print Solutions for Kerry Group.",
    ],
    tone: "#e8d9c4",
    cover: "/projects/fanta-kerry/cover.jpg",
    images: [
      { src: "/projects/fanta-kerry/01-artwork.jpg" },
      { src: "/projects/fanta-kerry/02-blueberry.jpg" },
      { src: "/projects/fanta-kerry/03-print-sheet.jpg", full: true },
      { src: "/projects/fanta-kerry/04-mango-orange.jpg" },
      { src: "/projects/fanta-kerry/05-mango.jpg" },
      { src: "/projects/fanta-kerry/06-screen.jpg", full: true },
    ],
  },
  {
    slug: "lumen",
    title: "Lumen",
    client: "Lumen Health",
    year: 2024,
    category: "Multimedia Design",
    services: ["Digital Campaign", "Motion"],
    summary: "Digital campaign assets for a wellbeing app launch.",
    description: lorem,
    tone: "#c7cbd6",
  },
  {
    slug: "form-journal",
    title: "Form Journal",
    client: "Form Publishing",
    year: 2024,
    category: "Multimedia Design",
    services: ["Editorial", "Digital Publishing"],
    summary: "Print and digital editions for an independent culture magazine.",
    description: lorem,
    tone: "#dccdc6",
  },
];
