import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Instagram, 
  ExternalLink, 
  Brain, 
  Shield, 
  Info, 
  MapPin, 
  Menu, 
  X, 
  Image as ImageIcon, 
  Video, 
  Megaphone, 
  Users, 
  Search, 
  Send, 
  Globe, 
  Cpu, 
  Sparkles,
  Briefcase,
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  Download,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { CATEGORIES, getProjectsByCategory, Project } from "./data/projects";

const NAV_ITEMS = ["Home", "Projects", "Services", "Experience", "Contact"];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="currentColor"
    {...props}
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const SOCIAL_LINKS = [
  { 
    icon: Instagram, 
    href: "https://www.instagram.com/xiyato22", 
    label: "Instagram",
    ariaLabel: "Visit on Instagram"
  },
  { 
    icon: WhatsAppIcon, 
    href: "https://wa.me/447882746212", 
    label: "WhatsApp",
    ariaLabel: "Message on WhatsApp"
  },
];

const SERVICES = [
  {
    icon: ImageIcon,
    title: "AI Visual Content",
    desc: "AI-generated images, cinematic product visuals, website hero images, mockups, brand visuals, and creative visual direction."
  },
  {
    icon: Video,
    title: "AI Video & Short-Form Content",
    desc: "Short-form videos, reels, product explainers, promotional content, AI-assisted video production, and visual storytelling."
  },
  {
    icon: Megaphone,
    title: "Digital Marketing Support",
    desc: "Content planning, campaign assistance, brand presentation, social media support, marketing execution, and digital growth strategy."
  },
  {
    icon: Users,
    title: "B2B Lead Generation",
    desc: "Researching relevant companies, identifying decision-makers, preparing organized lead lists, and finding potential business opportunities."
  },
  {
    icon: Search,
    title: "Business Research",
    desc: "Company research, market research, competitor research, supplier research, export-business research, and opportunity identification."
  },
  {
    icon: Send,
    title: "Outreach & Follow-Up",
    desc: "Email outreach, WhatsApp outreach, personalized messaging, follow-up systems, CRM-style tracking, and international communication support."
  },
  {
    icon: Globe,
    title: "Website Creation & Development",
    desc: "Complete responsive websites for portfolios, brands, and businesses—from page structure, visual direction, and content placement to front-end development, mobile optimisation, integrations, and deployment."
  },
  {
    icon: Cpu,
    title: "Automation & Workflow Systems",
    desc: "Email automation, outreach workflows, lead-management systems, content workflows, repetitive-task automation, and practical AI-assisted systems."
  }
];

const EXPERIENCE = [
  {
    company: "Sultanah & Co. Interiors",
    period: "Mar 2025 – Present",
    role: "Freelance Cinematic Content Creator",
    desc: "Directed the “Moon Chair” cinematic campaign and created premium factory-to-showroom reel concepts, visual sequences, transitions, and social content designed to strengthen luxury product storytelling.",
    instagram: "@sultanahco",
    instagramUrl: "https://www.instagram.com/sultanahco/",
    ariaLabel: "View Sultanah & Co. Interiors on Instagram",
    bgImage: "/ig-thumb-3.png",
    verified: true
  },
  {
    company: "Red Chandelier Studio",
    period: "Mar 2026 – Present",
    role: "Creative Visual Strategist & AI Content Producer",
    desc: "Created luxury interior visuals, cinematic reels, showroom walkthroughs, campaign assets, advanced architectural prompts, and presentation content for residential, hospitality, and commercial projects.",
    instagram: "@redchandelier.studio",
    instagramUrl: "https://www.instagram.com/redchandelier.studio/",
    ariaLabel: "View Red Chandelier Studio on Instagram",
    bgImage: "/ig-thumb-2.png",
    verified: true
  },
  {
    company: "Chinese Company",
    descriptor: "Hotel Linen & Premium Bedding Export Client",
    period: "Mar 2025 – Present",
    role: "Marketing, Lead Generation & Website Specialist",
    desc: "Built structured buyer databases, cross-border outreach workflows, buyer qualification systems, and sample-evaluation tracking while supporting export communication and a complete brand website project valued at approximately $3,000.",
    private: true,
    privateText: "Instagram account not publicly available",
    bgImage: "/sakura-bg.png"
  },
  {
    company: "Ereno Design Studio",
    period: "Mar 2026 – Jun 2026",
    role: "Freelance AI Visual Designer",
    desc: "Produced high-end interior concept visuals, showroom-style mockups, realistic short-form video concepts, and structured vendor and material research for design proposals and client presentations.",
    instagram: "@erenodesignstudio",
    instagramUrl: "https://www.instagram.com/erenodesignstudio/",
    ariaLabel: "View Ereno Design Studio on Instagram",
    bgImage: "/ig-thumb-1.png",
    verified: true
  },
  {
    company: "Fitout 360 Interiors",
    period: "Apr 2026 – May 2026",
    role: "Freelance AI Visualizer & Video Creator",
    desc: "Delivered more than nine high-fidelity commercial office renders and developed ultra-realistic AI video concepts, transforming raw layout references into polished visual options for client presentations.",
    instagram: "@fitout360uae",
    instagramUrl: "https://www.instagram.com/fitout360uae/",
    ariaLabel: "View Fitout 360 Interiors on Instagram",
    verified: true
  },
  {
    company: "Jovial Decor",
    period: "Feb 2026 – May 2026",
    role: "AI Design Specialist",
    desc: "Created interior visuals, product mockups, curtain catalogue layouts, point-of-sale signage, invitation concepts, and social media assets for a home décor showroom covering approximately 10,000 square feet.",
    instagram: "@jovialdecoure",
    instagramUrl: "https://www.instagram.com/jovialdecoure/",
    ariaLabel: "View Jovial Decoure on Instagram",
    verified: true
  }
];

interface VideoCardProps {
  vid: Project;
  idx: number;
  onExpand: (url: string) => void;
}

function VideoCard({ vid, idx, onExpand }: VideoCardProps) {
  const [playing, setPlaying] = useState(true);
  const [muted, setMuted] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play().catch((err) => console.log(err));
      }
      setPlaying(!playing);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="bg-white/40 p-2 rounded-[2.5rem] border border-warm-ink/5 flex flex-col justify-between group"
    >
      <div 
        onClick={() => onExpand(vid.media || "")}
        className="relative rounded-[2.3rem] overflow-hidden bg-warm-ink/5 cursor-pointer group/vidbox aspect-[9/16] flex items-center justify-center"
      >
        <video
          ref={videoRef}
          src={vid.media}
          poster={vid.poster}
          autoPlay
          loop
          muted={muted}
          playsInline
          className="w-full h-full object-cover"
        />

        {/* Dynamic controls overlay: always visible or on hover, styled as floating glass circles */}
        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black/45 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 opacity-0 group-hover/vidbox:opacity-100 transition-opacity duration-300 z-10">
          <div className="flex items-center gap-3">
            {/* Play/Pause Button */}
            <button 
              onClick={togglePlay}
              className="text-white hover:text-warm-accent transition-colors p-1"
              aria-label={playing ? "Pause video" : "Play video"}
            >
              {playing ? <Pause size={14} className="fill-current" /> : <Play size={14} className="fill-current translate-x-0.5" />}
            </button>

            {/* Mute/Unmute Button */}
            <button 
              onClick={toggleMute}
              className="text-white hover:text-warm-accent transition-colors p-1"
              aria-label={muted ? "Unmute audio" : "Mute audio"}
            >
              {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
            </button>
          </div>

          {/* Play Bigger Button */}
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onExpand(vid.media || "");
            }}
            className="text-white hover:text-warm-accent transition-colors p-1"
            aria-label="Play video full screen"
          >
            <Maximize2 size={14} />
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[9px] uppercase tracking-wider text-warm-ink/40 font-bold">{vid.client}</span>
          <span className="text-[9px] uppercase tracking-wider text-warm-ink/40 font-bold">{vid.year}</span>
        </div>
        <h3 className="serif text-xl mb-3 leading-snug">{vid.title}</h3>
        <p className="text-xs text-warm-ink/75 leading-relaxed mb-4">{vid.fullDescription}</p>
        <div className="flex flex-wrap gap-1.5">
          {vid.tags.map((tag) => (
            <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 px-2 py-0.5 rounded text-warm-ink/60">{tag}</span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState(window.location.hash || "#/");

  // Media Modals & Lightbox states
  const [activeVideoUrl, setActiveVideoUrl] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  
  // Spreadsheet Previewer states
  const [spreadsheetData, setSpreadsheetData] = useState<any>(null);
  const [spreadsheetLoading, setSpreadsheetLoading] = useState(false);
  const [activeSheetIndex, setActiveSheetIndex] = useState(0);
  const [spreadsheetSearchQuery, setSpreadsheetSearchQuery] = useState("");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || "#/";
      setCurrentHash(hash);
      
      // Auto scroll to top if accessing sub-routes
      if (hash.startsWith("#/projects")) {
        window.scrollTo({ top: 0 });
      }
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Fetch Spreadsheet JSON database on route change
  useEffect(() => {
    if (currentHash.startsWith("#/projects/b2b-research/")) {
      const slug = currentHash.replace("#/projects/b2b-research/", "");
      setSpreadsheetLoading(true);
      setSpreadsheetData(null);
      fetch(`/data/spreadsheets/${slug}.json`)
        .then((res) => {
          if (!res.ok) throw new Error("Spreadsheet not found");
          return res.json();
        })
        .then((data) => {
          setSpreadsheetData(data);
          setActiveSheetIndex(0);
          setSpreadsheetSearchQuery("");
          setSpreadsheetLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setSpreadsheetLoading(false);
        });
    }
  }, [currentHash]);

  // Keyboard navigation for renders lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      const renders = getProjectsByCategory("3D Renders & Visualisations");
      if (e.key === "ArrowRight") {
        setLightboxIndex((lightboxIndex + 1) % renders.length);
      } else if (e.key === "ArrowLeft") {
        setLightboxIndex((lightboxIndex - 1 + renders.length) % renders.length);
      } else if (e.key === "Escape") {
        setLightboxIndex(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex]);

  // Check if we are on a project detail page or category page
  const isSubRoute = currentHash.startsWith("#/projects/");

  const handleNavLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, item: string) => {
    setMobileMenuOpen(false);
    if (isSubRoute) {
      // If on a sub-route, let it navigate back to the main homepage sections
      e.preventDefault();
      window.location.hash = `#${item.toLowerCase()}`;
    }
  };

  // RENDER DYNAMIC SUBPAGES
  const renderVideosPage = () => {
    const videos = getProjectsByCategory("Cinematic Videos");
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <a href="#projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors mb-12">
          <ArrowLeft size={12} /> Back to Projects
        </a>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Category Portfolio</span>
          <h1 className="serif text-5xl mb-6">Cinematic Videos</h1>
          <p className="text-sm text-warm-ink/60 leading-relaxed max-w-2xl">
            Short-form films, luxury product campaigns, and retail walkthroughs created using advanced AI text-to-video systems, prompt engineering, custom storyboarding, and pacing edits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <VideoCard key={vid.id} vid={vid} idx={idx} onExpand={(url) => setActiveVideoUrl(url)} />
          ))}
        </div>
      </div>
    );
  };

  const renderB2BResearchPage = () => {
    const spreadsheets = getProjectsByCategory("B2B Research & Excel Systems");
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <a href="#projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors mb-12">
          <ArrowLeft size={12} /> Back to Projects
        </a>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Category Portfolio</span>
          <h1 className="serif text-5xl mb-6">B2B Research & Excel Systems</h1>
          <p className="text-sm text-warm-ink/60 leading-relaxed max-w-2xl">
            Clean, structured lead generation pipelines, buyer shortlists, and competitor market intelligence. Original phone numbers and emails have been safely redacted to safeguard confidentiality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {spreadsheets.map((sheet, idx) => (
            <motion.div
              key={sheet.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white p-8 rounded-[2.5rem] border border-warm-ink/5 shadow-sm hover:border-warm-accent transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <span className="text-[9px] uppercase tracking-wider text-warm-accent font-bold">{sheet.subcategory}</span>
                  <span className="text-[9px] uppercase tracking-wider bg-green-800/10 text-green-800 font-bold px-2 py-0.5 rounded">
                    {sheet.sheetCount} Sheets
                  </span>
                </div>
                <h3 className="serif text-2xl mb-3 leading-snug">{sheet.title}</h3>
                <p className="text-xs text-warm-ink/75 leading-relaxed mb-6">{sheet.shortDescription}</p>
                <div className="flex flex-wrap gap-1.5 mb-8">
                  {sheet.tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-semibold bg-warm-bg px-2 py-0.5 rounded text-warm-ink/60">{tag}</span>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 border-t border-warm-ink/5 pt-6">
                <a
                  href={`#/projects/b2b-research/${sheet.slug}`}
                  className="flex items-center justify-center gap-1.5 bg-warm-accent text-white py-2.5 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-warm-accent/90 transition-colors"
                >
                  <Search size={11} /> View Data
                </a>
                <a
                  href={sheet.spreadsheetDownload}
                  download
                  className="flex items-center justify-center gap-1.5 bg-warm-ink/5 text-warm-ink py-2.5 rounded-full text-[10px] uppercase tracking-wider font-semibold hover:bg-warm-ink/10 transition-colors"
                >
                  <Download size={11} /> Download
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderSpreadsheetViewerPage = () => {
    const slug = currentHash.replace("#/projects/b2b-research/", "");
    const projects = getProjectsByCategory("B2B Research & Excel Systems");
    const currentProject = projects.find((p) => p.slug === slug);

    if (!currentProject) {
      return (
        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <p className="serif text-2xl mb-6">Workbook not found</p>
          <a href="#/projects/b2b-research" className="text-xs uppercase tracking-wider font-semibold underline">Back to list</a>
        </div>
      );
    }

    const activeSheet = spreadsheetData?.sheets?.[activeSheetIndex];
    const headers = activeSheet?.data?.[0] || [];
    const bodyRows = activeSheet?.data?.slice(1) || [];

    // Filter spreadsheet rows
    const filteredRows = bodyRows.filter((row: any[]) =>
      row.some((cell: any) =>
        cell !== null && String(cell).toLowerCase().includes(spreadsheetSearchQuery.toLowerCase())
      )
    );

    return (
      <div className="w-full px-4 sm:px-10 py-24 max-w-[1600px] mx-auto">
        <a href="#/projects/b2b-research" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors mb-12">
          <ArrowLeft size={12} /> Back to B2B Research
        </a>

        {/* Workbook details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10 items-end">
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-2 block">Interactive Spreadsheet Previews</span>
            <h1 className="serif text-4xl mb-4">{currentProject.title}</h1>
            <p className="text-xs text-warm-ink/60 leading-relaxed max-w-2xl">{currentProject.fullDescription}</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
            <div className="px-5 py-3 rounded-2xl bg-white border border-warm-ink/5 flex items-center justify-between gap-6">
              <div className="text-left">
                <p className="text-[8px] uppercase tracking-wider font-bold text-warm-ink/40">Privacy Status</p>
                <p className="text-[10px] font-bold text-green-700">Phone & Email Redacted</p>
              </div>
              <Shield size={16} className="text-green-700" />
            </div>
            <a
              href={currentProject.spreadsheetDownload}
              download
              className="inline-flex items-center justify-center gap-2 bg-warm-accent text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-bold hover:bg-warm-accent/90 transition-all shadow-sm"
            >
              <Download size={14} /> Download Portfolio Copy
            </a>
          </div>
        </div>

        {/* Dynamic Sheets & Search */}
        <div className="bg-white rounded-[2rem] border border-warm-ink/5 shadow-sm overflow-hidden flex flex-col min-h-[500px]">
          {spreadsheetLoading ? (
            <div className="flex-1 flex flex-col items-center justify-center p-20 gap-3">
              <div className="w-6 h-6 border-2 border-warm-accent border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-warm-ink/40 font-bold uppercase tracking-wider">Parsing Worksheet...</p>
            </div>
          ) : spreadsheetData ? (
            <>
              {/* Sheet tabs & Search */}
              <div className="border-b border-warm-ink/10 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-warm-bg/30">
                <div className="flex flex-wrap gap-2">
                  {spreadsheetData.sheets.map((sheet: any, idx: number) => (
                    <button
                      key={sheet.name}
                      onClick={() => {
                        setActiveSheetIndex(idx);
                        setSpreadsheetSearchQuery("");
                      }}
                      className={`px-4 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        activeSheetIndex === idx
                          ? "bg-warm-accent text-white shadow-sm"
                          : "bg-white border border-warm-ink/5 text-warm-ink/60 hover:text-warm-ink"
                      }`}
                    >
                      {sheet.name}
                    </button>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search rows..."
                    value={spreadsheetSearchQuery}
                    onChange={(e) => setSpreadsheetSearchQuery(e.target.value)}
                    className="pl-8 pr-4 py-2 border border-warm-ink/10 rounded-full bg-white text-xs font-medium focus:outline-none focus:border-warm-accent w-full md:w-64 shadow-inner"
                  />
                  <Search size={12} className="absolute left-3 top-2.5 text-warm-ink/30" />
                </div>
              </div>

              {/* Data Table */}
              <div className="flex-1 overflow-auto max-h-[500px]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="sticky top-0 z-10">
                      {headers.map((h: any, i: number) => (
                        <th
                          key={i}
                          className="px-6 py-3.5 bg-warm-accent/5 text-left text-[10px] uppercase font-bold tracking-wider text-warm-accent border-b border-warm-ink/10 whitespace-nowrap"
                        >
                          {h || `Column ${i + 1}`}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredRows.length > 0 ? (
                      filteredRows.map((row: any[], i: number) => (
                        <tr
                          key={i}
                          className="border-b border-warm-ink/5 hover:bg-warm-accent/2 transition-colors"
                        >
                          {row.map((cell: any, j: number) => (
                            <td
                              key={j}
                              className="px-6 py-3 text-xs text-warm-ink/80 whitespace-nowrap font-medium font-sans"
                            >
                              {cell !== null ? (
                                cell
                              ) : (
                                <span className="text-warm-ink/20">-</span>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={headers.length || 1}
                          className="text-center py-20 text-xs text-warm-ink/40 font-bold uppercase tracking-wider"
                        >
                          No matching records found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              
              {/* Row counter footer */}
              <div className="border-t border-warm-ink/5 px-6 py-3 bg-warm-bg/20 flex justify-between items-center text-[10px] text-warm-ink/40 font-bold uppercase tracking-widest">
                <span>Active Sheet: {activeSheet?.name}</span>
                <span>Showing {filteredRows.length} of {bodyRows.length} rows</span>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-20">
              <p className="text-xs text-warm-ink/40 font-bold uppercase tracking-wider">No sheets available</p>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderVisualisationsPage = () => {
    const renders = getProjectsByCategory("3D Renders & Visualisations");
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <a href="#projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors mb-12">
          <ArrowLeft size={12} /> Back to Projects
        </a>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Category Portfolio</span>
          <h1 className="serif text-5xl mb-6">3D Renders & Visualisations</h1>
          <p className="text-sm text-warm-ink/60 leading-relaxed max-w-2xl">
            High-fidelity concept renders exploring texture matching, lighting, and interior planning. Click on any render panel to launch the lightbox.
          </p>
        </div>

        {/* Masonry or structured grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {renders.map((ren, idx) => (
            <motion.div
              key={ren.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              onClick={() => setLightboxIndex(idx)}
              className="bg-white/40 p-2 rounded-[2rem] border border-warm-ink/5 cursor-pointer group flex flex-col justify-between"
            >
              <div className="aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 relative">
                <img
                  src={ren.thumbnail}
                  alt={ren.title}
                  className="w-full h-full object-cover filter brightness-[0.95] group-hover:scale-[1.03] transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="px-4 py-4">
                <span className="text-[8px] uppercase tracking-wider text-warm-accent font-bold block mb-1">
                  {ren.subcategory}
                </span>
                <h3 className="serif text-lg font-semibold">{ren.title}</h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    );
  };

  const renderWebsitesPage = () => {
    const websites = getProjectsByCategory("Websites Developed");
    return (
      <div className="max-w-5xl mx-auto px-6 py-24">
        <a href="#projects" className="inline-flex items-center gap-2 text-[10px] uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors mb-12">
          <ArrowLeft size={12} /> Back to Projects
        </a>

        <div className="mb-16">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Category Portfolio</span>
          <h1 className="serif text-5xl mb-6">Websites Developed</h1>
          <p className="text-sm text-warm-ink/60 leading-relaxed max-w-2xl">
            Complete responsive websites built from layout wireframing, content planning, and visual styling to front-end development, mobile optimisation, and live deployment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {websites.map((web, idx) => {
            const isAcquisition = web.status === "Available for Acquisition";
            return (
              <motion.div
                key={web.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white p-8 rounded-[2.5rem] border border-warm-ink/5 shadow-sm hover:border-warm-accent transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-[9px] uppercase tracking-wider text-warm-accent font-bold">{web.role}</span>
                    {isAcquisition && (
                      <span className="text-[9px] uppercase tracking-wider bg-warm-accent/15 text-warm-accent font-bold px-2 py-0.5 rounded">
                        {web.status}
                      </span>
                    )}
                  </div>
                  <h3 className="serif text-3xl mb-3 leading-snug">{web.title}</h3>
                  <p className="text-xs text-warm-ink/75 leading-relaxed mb-6">{web.fullDescription}</p>
                  <div className="flex flex-wrap gap-1.5 mb-8">
                    {web.tags.map((tag) => (
                      <span key={tag} className="text-[9px] font-semibold bg-warm-bg px-2 py-0.5 rounded text-warm-ink/60">{tag}</span>
                    ))}
                  </div>
                </div>

                <div className="border-t border-warm-ink/5 pt-6">
                  {isAcquisition ? (
                    <a
                      href="https://wa.me/447882746212?text=Hi%20Chaitanya%2C%20I%20am%20inquiring%20about%20acquiring%20the%20Export%20Brand%20Website%20listed%20on%20your%20portfolio."
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-warm-accent text-white py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-warm-accent/90 transition-colors w-full"
                    >
                      <WhatsAppIcon className="w-4 h-4" /> Inquire Website Acquisition
                    </a>
                  ) : (
                    <a
                      href={web.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-1.5 bg-warm-ink/5 text-warm-ink py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-warm-ink/10 transition-colors w-full"
                    >
                      Visit Live Website <ExternalLink size={12} />
                    </a>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  };

  // MAIN HOMEPAGE RENDERING
  const renderMainPage = () => {
    return (
      <main className="max-w-5xl mx-auto px-6 pt-24 font-sans">
        {/* Home Hero Section */}
        <section id="home" className="py-20 md:py-32 flex flex-col justify-center min-h-[70vh] border-b border-warm-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            {/* Bio Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-6 space-y-6"
            >
              <h1 className="serif text-5xl lg:text-7xl leading-none">
                Chaitanya Gaikwad
              </h1>
              <p className="text-[10px] uppercase tracking-[0.3em] font-bold text-warm-accent">
                AI Tools Expert • Visual Content Creator • Marketing & B2B Specialist
              </p>
              
              <div className="space-y-4 text-warm-ink/75 leading-relaxed">
                <p className="text-lg font-semibold text-warm-ink leading-snug">
                  AI Tools Expert, Visual Content Creator, and Marketing & B2B Specialist.
                </p>
                <p className="text-sm">
                  I help brands and businesses improve how they present themselves, market their services, connect with potential clients, and grow through modern digital systems. My work includes AI-powered visuals, short-form videos, website content and support, creative direction, B2B lead generation, business research, outreach campaigns, CRM-style tracking, automation, and digital marketing execution. I combine visual storytelling, emerging AI tools, marketing strategy, and practical business support to turn ideas into professional content and measurable growth opportunities.
                </p>
              </div>
              
              <div className="space-y-4 pt-4">
                <div className="flex flex-wrap gap-4">
                  <a 
                    href="#projects" 
                    className="bg-warm-accent text-white px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-warm-accent/90 transition-colors"
                  >
                    View Portfolio
                  </a>
                  <a 
                    href="#contact" 
                    className="border border-warm-ink/20 text-warm-ink px-6 py-3 rounded-full text-xs uppercase tracking-wider font-semibold hover:bg-warm-ink/5 transition-colors"
                  >
                    Let's Connect
                  </a>
                </div>
                <div className="pt-2">
                  <a 
                    href="https://wa.me/447882746212"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 bg-[#25D366]/10 text-green-800 border border-[#25D366]/20 px-6 py-3 rounded-full text-xs font-semibold hover:bg-[#25D366]/15 transition-all shadow-sm group/wa"
                  >
                    <span className="w-5 h-5 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-sm group-hover/wa:scale-105 transition-transform duration-300">
                      <WhatsAppIcon className="w-3 h-3" />
                    </span>
                    <span className="font-mono tracking-wide underline underline-offset-4 decoration-green-800/20 group-hover/wa:decoration-green-800">+44 7882 746212</span>
                  </a>
                </div>
              </div>
            </motion.div>
            
            {/* Portrait Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-6 relative aspect-[9/16] rounded-[3rem] overflow-hidden bg-warm-ink/5 border border-warm-ink/10 max-w-sm mx-auto md:ml-auto shadow-2xl shadow-warm-accent/5"
            >
              <img 
                src="/portrait.jpg" 
                alt="Portrait of Chaitanya Gaikwad"
                className="w-full h-full object-cover hover:scale-[1.02] transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Projects Category Portal Section */}
        <section id="projects" className="py-24 border-b border-warm-ink/10 scroll-mt-20">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Works & Capabilities</span>
            <h2 className="serif text-5xl">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CATEGORIES.map((cat, idx) => {
              const bgImages = [
                "url('/projects/posters/sultanah-co-moon-chair-cinematic-campaign-poster.webp')",
                "url('/projects/posters/excel-placeholder-poster.webp')",
                "url('/projects/renders/render-2.webp')",
                "url('/sakura-bg.png')"
              ];
              return (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.05 }}
                  className="relative h-80 rounded-[2.5rem] overflow-hidden border border-warm-ink/5 shadow-sm group cursor-pointer"
                  onClick={() => window.location.hash = cat.route}
                >
                  {/* Background overlay images */}
                  <div
                    className="absolute inset-0 bg-cover bg-center filter brightness-[0.4] group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: bgImages[idx] }}
                  />
                  {/* Content */}
                  <div className="absolute inset-0 p-8 flex flex-col justify-between text-white z-10">
                    <div>
                      <span className="text-[9px] uppercase tracking-[0.15em] font-bold text-white/60 mb-2 block">
                        {cat.subtitle}
                      </span>
                      <h3 className="serif text-3xl font-semibold leading-tight">{cat.title}</h3>
                    </div>
                    <div>
                      <p className="text-xs text-white/70 leading-relaxed max-w-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {cat.desc}
                      </p>
                      <span className="inline-flex items-center gap-1 text-[10px] uppercase tracking-wider font-bold text-white group-hover:text-warm-accent transition-colors">
                        Browse Category <ChevronRight size={12} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 border-b border-warm-ink/10 scroll-mt-20">
          <div className="mb-12">
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold mb-3 block">Offerings</span>
            <h2 className="serif text-5xl">Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="p-8 rounded-[2rem] bg-white border border-warm-ink/5 hover:border-warm-accent shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-warm-accent/5 flex items-center justify-center mb-6 text-warm-accent">
                    <item.icon size={20} strokeWidth={1.5} />
                  </div>
                  <h3 className="serif text-2xl mb-3 leading-snug">{item.title}</h3>
                  <p className="text-xs text-warm-ink/60 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 scroll-mt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left side: Bio */}
            <div className="lg:col-span-5 space-y-6">
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block">My Journey</span>
              <h2 className="serif text-5xl tracking-tight">Professional Experience</h2>
              <p className="text-sm text-warm-ink/75 leading-relaxed">
                I partner with interior design studios, manufacturers, and international business startups. My work bridges the gap between high-fidelity media campaigns (videos, renders) and operational business setups (spreadsheets, lead qualification pipelines, and complete website creation).
              </p>
              <p className="text-sm text-warm-ink/75 leading-relaxed">
                By combining digital development and structured outreach with visual content production, I help businesses clarify their presence and build solid lead pipelines that convert.
              </p>
            </div>

            {/* Right side: Studio Work Cards */}
            <div className="lg:col-span-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {EXPERIENCE.map((exp) => (
                  <motion.div
                    key={exp.company}
                    whileHover={{ y: -3 }}
                    className="p-6 rounded-[2rem] border bg-white border-warm-ink/5 flex flex-col justify-between h-[280px] shadow-sm relative overflow-hidden group/card"
                  >
                    {/* Background Transparent Visual Card overlay */}
                    {exp.bgImage && (
                      <div 
                        className="absolute inset-0 bg-cover bg-center filter opacity-5 group-hover/card:scale-105 group-hover/card:opacity-[0.08] transition-all duration-500 pointer-events-none"
                        style={{ backgroundImage: `url('${exp.bgImage}')` }}
                      />
                    )}
                    
                    <div className="space-y-4 relative z-10">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="serif text-xl font-bold leading-tight">{exp.company}</h3>
                          {exp.descriptor && (
                            <p className="text-[9px] text-warm-ink/40 font-bold uppercase mt-0.5">{exp.descriptor}</p>
                          )}
                        </div>
                        <span className="text-[8px] uppercase tracking-wider font-bold text-warm-ink/40 whitespace-nowrap">
                          {exp.period}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[9px] font-bold text-warm-accent uppercase tracking-wider">
                          {exp.role}
                        </p>
                        <p className="text-[11px] text-warm-ink/70 leading-relaxed line-clamp-4">
                          {exp.desc}
                        </p>
                      </div>
                    </div>

                    {/* Social Link Display */}
                    {exp.instagramUrl ? (
                      <div className="relative z-10 pt-3 border-t border-warm-ink/5 flex items-center mt-3">
                        <a 
                          href={exp.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={exp.ariaLabel}
                          className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-ink/80 hover:text-warm-accent transition-colors group/link"
                        >
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0"
                            style={{
                              background: "linear-gradient(135deg, #F9CE34 0%, #EE2A7B 45%, #D62976 65%, #962FBF 82%, #4F5BD5 100%)"
                            }}
                          >
                            <Instagram size={10} strokeWidth={2.5} />
                          </span>
                          <span className="underline decoration-warm-ink/20 group-hover/link:decoration-warm-accent truncate max-w-[150px]">{exp.instagram}</span>
                          {exp.verified && (
                            <svg className="w-3.5 h-3.5 text-[#0095f6] fill-current flex-shrink-0" viewBox="0 0 24 24" aria-label="Verified account">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </a>
                      </div>
                    ) : exp.private ? (
                      <div className="relative z-10 pt-3 border-t border-warm-ink/5 flex items-center justify-between mt-3 text-warm-ink/40 italic text-[10px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <Globe size={11} className="flex-shrink-0" />
                          <span className="truncate">{exp.privateText}</span>
                        </div>
                        <span className="text-[8px] font-bold uppercase tracking-wider bg-warm-ink/5 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">Private</span>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Approach & Key Strengths Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mt-10 pt-10 border-t border-warm-ink/5">
            <div className="md:col-span-5 space-y-4 p-6 rounded-2xl bg-warm-ink/2 border border-warm-ink/5">
              <div className="flex items-center gap-2 text-warm-accent">
                <MapPin size={16} />
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Approach</h4>
              </div>
              <div>
                <p className="text-sm font-semibold mb-1">Visual Storytelling</p>
                <p className="text-xs text-warm-ink/60 leading-relaxed mb-3">
                  Using state-of-the-art AI generation tools to create custom product mockups, cinematic video content, and high-impact visual campaigns.
                </p>
                <p className="text-sm font-semibold mb-1">Systems & Outreach</p>
                <p className="text-xs text-warm-ink/60 leading-relaxed">
                  Building solid B2B lead pipelines, managing CRM trackers, automating follow-up campaigns, and executing cold outreach that converts.
                </p>
              </div>
            </div>

            <div className="md:col-span-7 space-y-4 p-6 rounded-2xl bg-warm-ink/2 border border-warm-ink/5">
              <div className="flex items-center gap-2 text-warm-accent">
                <Sparkles size={16} />
                <h4 className="text-[10px] uppercase tracking-widest font-bold">Key Strengths</h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                {[
                  "AI image & video generation",
                  "Short-form video content & reels",
                  "B2B lead generation & business research",
                  "Email & WhatsApp outreach automation",
                  "CRM tracking & follow-up systems",
                  "Website Creation & Development"
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-warm-ink/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer / Contact */}
        <footer id="contact" className="py-24 border-t border-warm-ink/10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center font-sans">
            <div>
              <h2 className="serif text-5xl mb-8 leading-none">Let's connect.</h2>
              <p className="text-base text-warm-ink/60 mb-10 max-w-sm leading-relaxed">
                Open to creative direction, B2B campaigns, or website support opportunities.
              </p>
              <div className="flex flex-col space-y-4">
                <a 
                  href="https://wa.me/447882746212"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 font-sans text-2xl font-semibold tracking-wide text-warm-ink hover:text-warm-accent transition-colors self-start group/wa"
                >
                  <span className="w-8 h-8 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-md flex-shrink-0 group-hover/wa:scale-105 transition-transform duration-300">
                    <WhatsAppIcon className="w-5 h-5" />
                  </span>
                  <span className="underline underline-offset-8 decoration-warm-ink/20 group-hover/wa:decoration-warm-accent">
                    +44 7882 746212
                  </span>
                </a>
                <a 
                  href="https://www.instagram.com/xiyato22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xl text-warm-ink/70 hover:text-warm-accent transition-colors self-start pl-11"
                >
                  @xiyato22
                </a>
              </div>
            </div>
            
            <div className="flex flex-col items-start md:items-end space-y-12">
              <div className="flex space-x-10">
                {SOCIAL_LINKS.map((link) => (
                  <a 
                    key={link.label} 
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.ariaLabel}
                    className="text-warm-ink/50 hover:text-warm-accent transition-all group flex flex-col items-center gap-2"
                  >
                    <div className="w-6 h-6">
                      <link.icon className="w-full h-full" strokeWidth={1.5} />
                    </div>
                    <span className="text-[9px] uppercase tracking-widest font-semibold opacity-0 group-hover:opacity-100 transition-opacity">{link.label}</span>
                  </a>
                ))}
              </div>
              <div className="text-left md:text-right">
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-ink/50 font-bold mb-2">
                  Portfolio 2026 • Chaitanya Gaikwad
                </p>
                <p className="text-[10px] uppercase tracking-[0.2em] text-warm-ink/40 font-bold">
                  Creative & B2B Strategy
                </p>
              </div>
            </div>
          </div>
        </footer>
      </main>
    );
  };

  return (
    <div className="min-h-screen bg-warm-bg text-warm-ink antialiased font-sans flex flex-col justify-between">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-40 bg-warm-bg/85 backdrop-blur-sm border-b border-warm-ink/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#home" className="serif text-xl font-semibold tracking-tight hover:text-warm-accent transition-colors">
            CG.
          </a>
          
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavLinkClick(e, item)}
                className="text-[10px] uppercase tracking-widest hover:text-warm-accent transition-colors font-semibold"
              >
                {item}
              </a>
            ))}
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-warm-ink hover:text-warm-accent transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden border-t border-warm-ink/10 bg-warm-bg px-6 py-6 space-y-4 flex flex-col"
          >
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={(e) => handleNavLinkClick(e, item)}
                className="text-xs uppercase tracking-widest font-semibold hover:text-warm-accent transition-colors"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      {/* Main Content Router */}
      <div className="flex-1 bg-warm-bg">
        {currentHash === "#/" || !isSubRoute ? (
          renderMainPage()
        ) : currentHash === "#/projects/videos" ? (
          renderVideosPage()
        ) : currentHash === "#/projects/b2b-research" ? (
          renderB2BResearchPage()
        ) : currentHash.startsWith("#/projects/b2b-research/") ? (
          renderSpreadsheetViewerPage()
        ) : currentHash === "#/projects/visualisations" ? (
          renderVisualisationsPage()
        ) : currentHash === "#/projects/websites" ? (
          renderWebsitesPage()
        ) : (
          renderMainPage()
        )}
      </div>

      {/* VIDEO MODAL PLAYER */}
      <AnimatePresence>
        {activeVideoUrl && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveVideoUrl(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <button 
              onClick={() => setActiveVideoUrl(null)}
              className="absolute top-6 right-6 text-white/60 hover:text-white transition-colors"
            >
              <X size={28} />
            </button>
            <div 
              onClick={(e) => e.stopPropagation()} 
              className="relative max-h-[85vh] max-w-[90vw] md:max-w-4xl flex items-center justify-center rounded-[2rem] overflow-hidden bg-black shadow-2xl cursor-default"
            >
              <video
                src={activeVideoUrl}
                autoPlay
                controls
                className="max-h-[85vh] max-w-full block"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* RENDERS LIGHTBOX */}
      <AnimatePresence>
        {lightboxIndex !== null && (
          (() => {
            const renders = getProjectsByCategory("3D Renders & Visualisations");
            const currentRender = renders[lightboxIndex];
            if (!currentRender) return null;
            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setLightboxIndex(null)}
                className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex flex-col items-center justify-between p-6 cursor-pointer"
              >
                {/* Header Controls */}
                <div className="w-full flex justify-between items-center text-white z-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-white/50">
                    Render {lightboxIndex + 1} of {renders.length}
                  </span>
                  <button
                    onClick={() => setLightboxIndex(null)}
                    className="p-2 text-white/60 hover:text-white transition-colors"
                  >
                    <X size={28} />
                  </button>
                </div>

                {/* Center Image with Navigation arrows */}
                <div className="flex-1 w-full max-w-5xl flex items-center justify-between gap-4 relative">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((lightboxIndex - 1 + renders.length) % renders.length);
                    }}
                    className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-all flex-shrink-0 z-10"
                  >
                    <ChevronLeft size={20} />
                  </button>

                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="flex-1 flex items-center justify-center max-h-[70vh] relative"
                  >
                    <img
                      src={currentRender.media || currentRender.thumbnail}
                      alt={currentRender.title}
                      className="max-w-full max-h-[70vh] object-contain rounded-2xl shadow-2xl"
                    />
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxIndex((lightboxIndex + 1) % renders.length);
                    }}
                    className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white/80 transition-all flex-shrink-0 z-10"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>

                {/* Caption Details Footer */}
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="w-full max-w-2xl text-center text-white z-10 pb-6"
                >
                  <h3 className="serif text-2xl font-semibold mb-2">{currentRender.title}</h3>
                  <p className="text-xs text-white/60 leading-relaxed">{currentRender.fullDescription}</p>
                </div>
              </motion.div>
            );
          })()
        )}
      </AnimatePresence>
    </div>
  );
}
