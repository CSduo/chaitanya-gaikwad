import projectsData from "./projects.json";

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  subcategory: string;
  year: string;
  dateRange: string;
  location: string;
  role: string;
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  thumbnail: string;
  poster: string;
  media?: string;
  spreadsheetPreview?: string;
  spreadsheetDownload?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
  status?: string;
  featured: boolean;
  order: number;
  aspectRatio?: string;
  duration?: string;
  sheetCount?: number;
  sheetNames?: string[];
}

export const WEBSITES: Project[] = [
  {
    id: "personal-portfolio-website",
    slug: "personal-portfolio-website",
    title: "Personal Portfolio Website",
    client: "Chaitanya Gaikwad",
    category: "Websites Developed",
    subcategory: "Responsive Portfolio, Brand & Business Websites",
    year: "2026",
    dateRange: "2026",
    location: "Remote",
    role: "Designer & Front-End Website Developer",
    shortDescription: "A refined editorial portfolio designed and developed to present cinematic content, B2B research systems, visualisations, professional experience, and digital-development work through one responsive experience.",
    fullDescription: "A refined editorial portfolio designed and developed to present cinematic content, B2B research systems, visualisations, professional experience, and digital-development work through one responsive experience.",
    tags: [
      "Portfolio",
      "Responsive Design",
      "Front-End Development",
      "Project Architecture",
      "Media Presentation",
      "Contact Integration",
      "Vercel Deployment"
    ],
    thumbnail: "/ig-thumb-2.png", // Uses showroom visual as a premium poster frame
    poster: "/ig-thumb-2.png",
    liveUrl: "https://chaitanya-gaikwad.vercel.app/",
    featured: true,
    order: 1
  },
  {
    id: "export-brand-website",
    slug: "export-brand-website",
    title: "Export Brand Website",
    client: "International Bedding & Hotel-Linen Client",
    category: "Websites Developed",
    subcategory: "Responsive Portfolio, Brand & Business Websites",
    year: "2025",
    dateRange: "2025",
    location: "Global",
    role: "Front-End Website Developer & Digital Presentation Specialist",
    shortDescription: "A complete responsive brand website originally developed for an international bedding and hotel-linen export opportunity.",
    fullDescription: "A complete responsive brand website originally developed for an international bedding and hotel-linen export opportunity. The original commercial opportunity is now proceeding independently, while the finished website build remains available for acquisition, licensing, or adaptation by a suitable business.",
    tags: [
      "Export Business",
      "Responsive Website",
      "Front-End Development",
      "B2B Presentation",
      "Lead Capture",
      "International Brand",
      "Foreign Trade"
    ],
    thumbnail: "/sakura-bg.png", // Reuses sakura visual as a premium background style
    poster: "/sakura-bg.png",
    status: "Completed",
    featured: true,
    order: 2,
    liveUrl: "https://xiyora.vercel.app"
  },
  {
    id: "anvikshiki-journal",
    slug: "anvikshiki-journal",
    title: "Anvikshiki Journal",
    client: "Academic & Research Community",
    category: "Websites Developed",
    subcategory: "Responsive Portfolio, Brand & Business Websites",
    year: "2026",
    dateRange: "2026",
    location: "Global",
    role: "Full-Stack Developer & Technical Administrator",
    shortDescription: "A clean, responsive academic journal platform designed and developed to manage and publish scholarly articles, indexing, peer-reviewed research papers, and author submissions.",
    fullDescription: "A clean, responsive academic journal platform designed and developed to manage and publish scholarly articles, indexing, peer-reviewed research papers, and author submissions.",
    tags: [
      "Academic Journal",
      "Publication Platform",
      "Full-Stack Development",
      "Responsive Layout",
      "Scholarly Research",
      "Database Integration"
    ],
    thumbnail: "/ig-thumb-1.png", // Reuses render visual as a premium poster frame
    poster: "/ig-thumb-1.png",
    liveUrl: "https://anvikshikijournal.in/",
    featured: true,
    order: 3
  }
];

export const CATEGORIES = [
  {
    id: "videos",
    title: "Cinematic Videos",
    subtitle: "AI-Assisted Films, Reels & Product Stories",
    desc: "Cinematic short-form videos, product campaigns, interior walkthroughs, and brand stories created through AI-assisted production, visual direction, editing, prompt engineering, and structured storytelling.",
    route: "/projects/videos"
  },
  {
    id: "b2b-research",
    title: "B2B Research & Excel Systems",
    subtitle: "Lead Intelligence, Market Mapping & Outreach Workflows",
    desc: "Structured research and spreadsheet systems created for lead generation, buyer mapping, supplier discovery, competitor research, outreach tracking, sample evaluation, and cross-border business development.",
    route: "/projects/b2b-research"
  },
  {
    id: "visualisations",
    title: "3D Renders & Visualisations",
    subtitle: "Interior Concepts, Product Mockups & Spatial Studies",
    desc: "A curated collection of interior renders, architectural concepts, product visualisations, material studies, showroom previews, and presentation-ready imagery created for client communication and design exploration.",
    route: "/projects/visualisations"
  },
  {
    id: "websites",
    title: "Websites Developed",
    subtitle: "Responsive Portfolio, Brand & Business Websites",
    desc: "Complete responsive websites developed through page planning, visual direction, content organisation, front-end implementation, mobile optimisation, contact integrations, and deployment.",
    route: "/projects/websites"
  }
];

export const getAllProjects = () => {
  return [
    ...(projectsData.videos as Project[]),
    ...(projectsData.spreadsheets as Project[]),
    ...(projectsData.renders as Project[]),
    ...WEBSITES
  ];
};

export const getProjectsByCategory = (category: string) => {
  if (category === "Websites Developed") {
    return WEBSITES;
  }
  if (category === "Cinematic Videos") {
    return projectsData.videos as Project[];
  }
  if (category === "B2B Research & Excel Systems") {
    return projectsData.spreadsheets as Project[];
  }
  if (category === "3D Renders & Visualisations") {
    return projectsData.renders as Project[];
  }
  return [];
};
