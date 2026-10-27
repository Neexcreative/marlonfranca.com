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
  /** Live link shown in the popup (e.g. a launched website) */
  url?: string;
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
    slug: "revival-youth-conference",
    title: "Revival Youth Conference",
    client: "Self-initiated concept",
    year: 2025,
    category: "Brand Strategy & Design",
    services: ["Naming", "Brand Identity", "Art Direction", "Event Applications"],
    summary: "Brand concept for a youth conference built to revive and reconnect a young audience.",
    description: [
      "A self-initiated brand concept for a youth conference, inspired by the youth conferences I have taken part in. The name Revival carries the core idea: reviving young people, bringing back their energy, faith and sense of belonging.",
      "The challenge: youth events compete for attention with everything young people see online, and many conferences still look dated next to the brands this audience follows. The solution: an identity that speaks their visual language, with a vibrant purple, pink and blue gradient, glassmorphism layers, film grain and sparkles, and a bold condensed wordmark paired with a handwritten Youth script, so the event feels like something worth showing up for and sharing.",
      "I created the whole project: naming, logo, art direction, campaign graphics and applications across save the date banners, social posts, the official poster, staff badges, lanyards and merchandise. Imagery was produced with AI image generation and finished in Photoshop and Illustrator.",
      "Self-initiated portfolio concept. The event, location and dates are fictional.",
    ],
    tone: "#c9a7d8",
    cover: "/projects/revival-youth-conference/cover-banner.jpg",
    images: [
      { src: "/projects/revival-youth-conference/01-save-the-date.jpg", full: true },
      { src: "/projects/revival-youth-conference/02-logo.jpg" },
      { src: "/projects/revival-youth-conference/03-staff-badge.jpg" },
      { src: "/projects/revival-youth-conference/04-poster.jpg" },
      { src: "/projects/revival-youth-conference/05-t-shirt.jpg" },
      { src: "/projects/revival-youth-conference/06-workspace.jpg", full: true },
    ],
  },
  {
    slug: "estudio-inx",
    title: "Estúdio IN-X",
    client: "Estúdio IN-X, Curitiba (Brazil)",
    year: 2026,
    category: "Websites & Landing Pages",
    services: ["Web Design", "UI Refinement", "Responsive Build"],
    summary: "Website for a new aerial imaging and drone survey studio in Curitiba, Brazil.",
    description: [
      "Estúdio IN-X is a new aerial solutions studio in Curitiba, Brazil, offering drone photography, construction monitoring, technical inspections, mapping and visual documentation for architecture, engineering and construction projects.",
      "The challenge: as a brand new business, Estúdio IN-X had no online presence, and its services are technical and easy to misunderstand. Clients in architecture, engineering, construction and law needed to understand quickly what each service delivers and trust the studio before asking for a quote. The solution: a site that explains every service in plain language on its own page, shows the work through aerial imagery and leads visitors straight to a simple quote request.",
      "The founder came with an initial design direction. I refined it into a complete, minimalist interface: dark, precise and built around strong aerial imagery, with a clear service structure, a simple three-step process and a quote request form that makes getting in touch easy.",
      "I designed the site in Figma and built it with an AI-assisted development workflow, delivering responsive pages for desktop and mobile, including a dedicated page for each service. Delivered through Neex Creative.",
      "The site is live, with entirely positive feedback from the client.",
    ],
    tone: "#1a1a1a",
    url: "https://www.estudioinx.com.br",
    cover: "/projects/inx-studio/cover-laptop.jpg",
    images: [
      { src: "/projects/inx-studio/01-moodboard.jpg", full: true },
      { src: "/projects/inx-studio/02-mobile-home-v2.jpg" },
      { src: "/projects/inx-studio/03-mobile-services.jpg" },
      { src: "/projects/inx-studio/05-logo-variations.jpg", full: true },
    ],
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
    services: ["Brand Identity", "Vehicle Wrap Design", "Large Format Print"],
    summary: "Brand launch and full van wrap fleet for a new Irish drainage company.",
    description: [
      "The Drain Team is a new drainage company launching in Ireland. The goal was to turn their vans into moving billboards, so the brand is instantly recognisable on the road and on every job site.",
      "The challenge: a brand new company with no recognition, in a market where people usually call whoever they see or remember first. The vans are on the road every day, so they had to work as advertising as well as transport. The solution: a wrap that is bold, legible from a distance and impossible to miss, putting the brand, phone number and website up front with an illustration that explains the service in a second.",
      "Bold red panels carry the wordmark and contact details, while an illustrated system of blue pipes and flowing water wraps around each vehicle. It reads at a glance and tells people exactly what the company does.",
      "I handled the project end to end: brand and illustration in Illustrator with AI-assisted exploration, vehicle measurements, production files, large-format printing and lamination. Delivered through Neex Creative.",
      "Both vans are now on the road, with entirely positive feedback from the client.",
    ],
    tone: "#d9d4cc",
    cover: "/projects/the-drain-team/cover.jpg",
    images: [
      { src: "/projects/the-drain-team/01-design.jpg", full: true },
      { src: "/projects/the-drain-team/02-print.jpg" },
      { src: "/projects/the-drain-team/03-lamination.jpg" },
      { src: "/projects/the-drain-team/04-rear-detail.jpg", full: true },
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
      "The challenge: collection launches usually happen online, which makes it hard to build a real connection with the community or let people see and feel the product before buying. The solution: a space that brings together the two sides of the brand, fitness and coffee culture, giving fans a reason to stay, meet and pre-order on the spot.",
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
      "The challenge: the client needed a short run of special edition cans for an event, which called for applied labels rather than printed cans. Each label had to fit the can perfectly and look like a finished product, not a sticker. The solution: adapting the artwork precisely to the can's dimensions, testing the wrap on real cans until the fit was clean, then producing and applying every label by hand.",
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
      { src: "/projects/fanta-kerry/06-print-roll.jpg", full: true },
      { src: "/projects/fanta-kerry/07-screen.jpg", full: true },
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
