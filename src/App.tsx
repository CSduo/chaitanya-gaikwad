import { useState } from "react";
import { motion } from "motion/react";
import { 
  Instagram, 
  ExternalLink, 
  Brain, 
  Shield, 
  Info, 
  MapPin, 
  Menu, 
  X, 
  Image, 
  Video, 
  Megaphone, 
  Users, 
  Search, 
  Send, 
  Globe, 
  Cpu, 
  Sparkles,
  Briefcase
} from "lucide-react";

const NAV_ITEMS = ["Home", "Experience", "Services", "Projects", "Contact"];

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    width="100%"
    height="100%"
    fill="currentColor"
    {...props}
  >
    <path d="M12.004 2C6.48 2 2 6.48 2 12.004c0 1.762.455 3.486 1.32 5.012L2 22l5.128-1.327c1.474.808 3.128 1.233 4.876 1.233 5.524 0 10.004-4.48 10.004-10.004C22.008 6.48 17.528 2 12.004 2zm0 18.294c-1.574 0-3.118-.42-4.47-1.218l-.32-.19-3.32.86.874-3.2-.21-.334c-.876-1.396-1.34-3.018-1.34-4.708 0-4.838 3.934-8.772 8.772-8.772 4.838 0 8.772 3.934 8.772 8.772 0 4.838-3.934 8.772-8.772 8.772zm4.81-6.57c-.264-.132-1.564-.77-1.806-.858-.242-.088-.418-.132-.594.132-.176.264-.682.858-.836 1.034-.154.176-.308.198-.572.066-1.078-.538-1.884-.962-2.634-2.25-.198-.338.198-.314.568-.14.132.06.264.132.396.264.132.132.176.264.088.44-.088.176-.44.88-.538 1.1-.098.22-.198.242-.462.11-1.3-.642-1.93-1.21-2.434-2.146-.15-.262-.016-.402.106-.524.11-.11.242-.264.364-.396.12-.132.164-.22.242-.374.078-.154.038-.286-.018-.396-.056-.11-.538-1.298-.738-1.782-.194-.472-.39-.408-.538-.416-.14-.008-.3-.008-.462-.008-.162 0-.426.06-.648.304-.22.242-.84.82-.84 2.002s.862 2.32.982 2.482c.12.162 1.696 2.584 4.108 3.624.574.248 1.022.396 1.37.506.578.184 1.104.158 1.514.098.458-.066 1.408-.576 1.606-1.134.198-.558.198-1.038.138-1.138-.06-.1-.22-.198-.484-.33z" />
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
    icon: Image,
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

const PROJECTS = [
  {
    category: "AI Visuals · Cinematic Video · Creative Direction",
    title: "AI Visual & Video Generation",
    desc: "High-fidelity cinematic AI product videos, promotional reels, and brand campaigns created using advanced text-to-video models and image generators, providing custom visual narratives for premium brands.",
    status: "Ongoing",
    icon: Video,
    videoUrl: "", // Drop MP4 video path here (e.g. "/projects/campaign.mp4")
    posterImage: "/ig-thumb-2.png" // Reuses our generated showroom visual as a premium video poster!
  },
  {
    category: "Lead Gen · CRM Automation · Cold Outreach",
    title: "B2B Outreach & Lead Automation",
    desc: "End-to-end automated pipeline identifying high-value decision-makers, validating B2B contact lists, and automating personalized outreach sequences with integrated CRM status tracking.",
    status: "Completed",
    icon: Cpu
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
    verified: true,
    igStats: { posts: "124", followers: "1,248", following: "852" }
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
    verified: true,
    igStats: { posts: "88", followers: "3,124", following: "450" }
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
    verified: true,
    igStats: { posts: "215", followers: "1,940", following: "620" }
  },
  {
    company: "Fitout 360 Interiors",
    period: "Apr 2026 – May 2026",
    role: "Freelance AI Visualizer & Video Creator",
    desc: "Delivered more than nine high-fidelity commercial office renders and developed ultra-realistic AI video concepts, transforming raw layout references into polished visual options for client presentations.",
    instagram: "@fitout360uae",
    instagramUrl: "https://www.instagram.com/fitout360uae/",
    ariaLabel: "View Fitout 360 Interiors on Instagram",
    verified: true,
    igStats: { posts: "142", followers: "2,840", following: "510" }
  },
  {
    company: "Jovial Decor",
    period: "Feb 2026 – May 2026",
    role: "AI Design Specialist",
    desc: "Created interior visuals, product mockups, curtain catalogue layouts, point-of-sale signage, invitation concepts, and social media assets for a home décor showroom covering approximately 10,000 square feet.",
    instagram: "@jovialdecoure",
    instagramUrl: "https://www.instagram.com/jovialdecoure/",
    ariaLabel: "View Jovial Decoure on Instagram",
    verified: true,
    igStats: { posts: "98", followers: "1,520", following: "340" }
  }
];

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-warm-bg text-warm-ink antialiased font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-warm-bg/80 backdrop-blur-sm border-b border-warm-ink/10">
        <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="serif text-xl font-semibold tracking-tight"
          >
            CG.
          </motion.span>
          <div className="hidden md:flex space-x-8">
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                className="text-[10px] uppercase tracking-widest hover:text-warm-accent transition-colors font-semibold"
              >
                {item}
              </a>
            ))}
          </div>
          {/* Mobile Menu Button */}
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
            className="md:hidden absolute top-16 left-0 w-full bg-warm-bg border-b border-warm-ink/10 flex flex-col p-6 space-y-4 shadow-lg z-40"
          >
            {NAV_ITEMS.map((item) => (
              <a 
                key={item} 
                href={`#${item.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs uppercase tracking-widest hover:text-warm-accent transition-colors font-semibold py-2"
              >
                {item}
              </a>
            ))}
          </motion.div>
        )}
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16">
        {/* Hero Section */}
        <section id="home" className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="md:col-span-7"
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="w-8 h-px bg-warm-accent" />
              </div>
              
              {/* Single Name Header */}
              <h1 className="serif text-5xl sm:text-6xl md:text-5xl lg:text-6xl leading-none mb-6">
                Chaitanya Gaikwad
              </h1>

              {/* Professional Introduction */}
              <div className="space-y-4 max-w-[480px] mb-8">
                <p className="text-lg font-semibold text-warm-ink leading-snug">
                  AI Visual Designer, Front-End Website Developer, Visual Content Producer, and Marketing & B2B Specialist.
                </p>
                <p className="text-sm text-warm-ink/70 leading-relaxed">
                  I help brands and businesses improve how they present themselves, market their services, connect with potential clients, and grow through modern digital systems. My work includes AI-powered visuals, short-form videos, website content and support, creative direction, B2B lead generation, business research, outreach campaigns, CRM-style tracking, automation, and digital marketing execution. I combine visual storytelling, emerging AI tools, marketing strategy, and practical business support to turn ideas into professional content and measurable growth opportunities.
                </p>
              </div>

              {/* Expanded Clickable Social buttons */}
              <div className="flex flex-col gap-3 w-full max-w-[280px]">
                <motion.a
                  href="https://www.instagram.com/xiyato22"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Visit on Instagram"
                  className="flex items-center gap-3 px-5 py-3 rounded-full border border-warm-ink/15 hover:border-warm-accent hover:text-warm-accent transition-all bg-white/40 shadow-sm text-sm font-semibold"
                >
                  <Instagram size={18} className="flex-shrink-0" />
                  <span>@xiyato22</span>
                </motion.a>

                <motion.a
                  href="https://wa.me/447882746212"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  aria-label="Message on WhatsApp"
                  className="flex items-center gap-3 px-5 py-3 rounded-full border border-warm-ink/15 hover:border-warm-accent hover:text-warm-accent transition-all bg-white/40 shadow-sm text-sm font-semibold"
                >
                  <div className="w-4.5 h-4.5 flex items-center justify-center flex-shrink-0">
                    <WhatsAppIcon className="w-full h-full" />
                  </div>
                  <span className="font-sans tracking-wide">+44 7882 746212</span>
                </motion.a>
              </div>
            </motion.div>
            
            {/* Profile image (Complete 9:16 Aspect Ratio with 400px max width) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="md:col-span-5 relative aspect-[9/16] rounded-[2.5rem] overflow-hidden bg-white border border-warm-ink/10 w-full max-w-[400px] mx-auto md:ml-auto shadow-2xl shadow-warm-accent/5"
            >
              <img 
                src="/portrait.jpg" 
                alt="Portrait of Chaitanya Gaikwad"
                className="w-full h-full object-cover transition-all duration-700"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mb-24 scroll-mt-20">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column (Desktop 5/12) */}
            <div className="md:col-span-5 space-y-8">
              <div>
                <h2 className="serif text-4xl mb-4">Experience</h2>
                <div className="h-px w-20 bg-warm-accent mb-8" />
              </div>

              {/* Left Experience Panel - Active / Primary Work */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent">
                    SELECTED EXPERIENCE
                  </span>
                  <h3 className="serif text-2xl font-semibold text-warm-ink">
                    Studios & Brands I’ve Worked With
                  </h3>
                  <p className="text-xs text-warm-ink/60 leading-relaxed">
                    A selection of interior studios, retail brands, and international businesses I have supported through visual content, marketing, research, outreach, and website development.
                  </p>
                </div>

                <div className="space-y-3">
                  {EXPERIENCE.slice(0, 3).map((exp, i) => (
                    <motion.div 
                      key={exp.company}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.05 }}
                      className="group relative overflow-hidden p-4 rounded-2xl border border-warm-ink/5 hover:border-warm-ink/20 transition-all duration-200 shadow-sm hover:-translate-y-0.5 bg-transparent min-h-[180px] md:min-h-[195px] flex flex-col justify-between"
                    >
                      {/* Background Image Layer */}
                      {exp.bgImage && (
                        <div className="absolute inset-0 z-0 select-none pointer-events-none">
                          <img 
                            src={exp.bgImage} 
                            alt="" 
                            className="w-full h-full object-cover opacity-[0.10] transition-opacity duration-300 group-hover:opacity-[0.15] mix-blend-multiply" 
                          />
                        </div>
                      )}

                      {/* Transparent Card Link Overlay */}
                      {exp.instagramUrl && (
                        <a
                          href={exp.instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={exp.ariaLabel}
                          className="absolute inset-0 z-20 cursor-pointer"
                        />
                      )}

                      {/* Content Layer */}
                      <div className="relative z-10 space-y-2">
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-semibold text-sm text-warm-ink leading-tight">{exp.company}</h4>
                            {exp.descriptor && (
                              <p className="text-[10px] text-warm-ink/60 mt-0.5 leading-snug">{exp.descriptor}</p>
                            )}
                          </div>
                          <span className="text-[9px] uppercase tracking-wider font-bold text-warm-ink/40 whitespace-nowrap self-start">
                            {exp.period}
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-[10px] font-semibold text-warm-accent uppercase tracking-wider leading-none">
                            {exp.role}
                          </p>
                          <p className="text-xs text-warm-ink/70 leading-relaxed">
                            {exp.desc}
                          </p>
                        </div>
                      </div>

                      {/* Social Link Display */}
                      {exp.instagramUrl ? (
                        <div className="relative z-10 pt-2 border-t border-warm-ink/5 flex items-center justify-between mt-3">
                          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-ink/80 group-hover/link:text-warm-accent transition-colors">
                            <span 
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0"
                              style={{
                                background: "linear-gradient(135deg, #F9CE34 0%, #EE2A7B 45%, #D62976 65%, #962FBF 82%, #4F5BD5 100%)"
                              }}
                            >
                              <Instagram size={11} strokeWidth={2.5} />
                            </span>
                            <span className="underline decoration-warm-ink/20 group-hover:decoration-warm-accent truncate max-w-[120px] sm:max-w-none">{exp.instagram}</span>
                            {exp.verified && (
                              <svg className="w-3.5 h-3.5 text-[#0095f6] fill-current flex-shrink-0" viewBox="0 0 24 24" aria-label="Verified account">
                                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                              </svg>
                            )}
                          </div>
                          {exp.igStats && (
                            <span className="text-[10px] text-warm-ink/50 font-medium whitespace-nowrap">
                              {exp.igStats.followers} followers
                            </span>
                          )}
                        </div>
                      ) : exp.private ? (
                        <div className="relative z-10 pt-2 border-t border-warm-ink/5 flex items-center justify-between mt-3 text-warm-ink/50 italic text-[10px]">
                          <div className="flex items-center gap-1.5 truncate">
                            <Globe size={11} className="flex-shrink-0" />
                            <span className="truncate">{exp.privateText}</span>
                          </div>
                          <span className="text-[9px] font-bold uppercase tracking-wider bg-warm-ink/5 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">Private</span>
                        </div>
                      ) : null}
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column (Desktop 7/12) */}
            <div className="md:col-span-7 space-y-8">
              {/* Biography Card */}
              <div className="bg-white/50 p-8 rounded-3xl border border-warm-ink/5 shadow-sm space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-warm-accent/10 rounded-2xl">
                      <Briefcase className="text-warm-accent" size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg">AI Tools & Digital Strategy</h3>
                      <p className="text-sm text-warm-ink/60">Creative Professional & Marketing Specialist</p>
                    </div>
                  </div>
                  <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent bg-warm-accent/5 px-3 py-1.5 rounded-full self-start sm:self-center">
                    Present
                  </span>
                </div>

                <div className="pt-6 border-t border-warm-ink/5 space-y-4">
                  <p className="text-lg leading-relaxed text-warm-ink/90 italic">
                    "Bridging the gap between cutting-edge AI capability and practical business growth."
                  </p>
                  <p className="text-sm leading-relaxed text-warm-ink/70">
                    I work closely with brands, companies, startups, manufacturers, and growing businesses to elevate their digital presence. By leveraging advanced AI visual tools, short-form video creation, and targeted B2B outreach strategies, I help companies modernise how they connect with clients, showcase products, and automate growth pipelines. I also create complete responsive websites for portfolios, brands, and businesses, covering structure, visual direction, front-end implementation, contact integrations, mobile optimisation, and deployment.
                  </p>
                </div>
              </div>

              {/* Right Experience Panel - Collaborations (No subheader, directly under biography) */}
              <div className="space-y-3 pt-6 border-t border-warm-ink/5">
                {EXPERIENCE.slice(3, 6).map((exp, i) => (
                  <motion.div 
                    key={exp.company}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    className="group relative overflow-hidden p-4 rounded-2xl border border-warm-ink/5 hover:border-warm-ink/20 transition-all duration-200 shadow-sm hover:-translate-y-0.5 bg-transparent min-h-[180px] md:min-h-[195px] flex flex-col justify-between"
                  >
                    {/* Background Image Layer */}
                    {exp.bgImage && (
                      <div className="absolute inset-0 z-0 select-none pointer-events-none">
                        <img 
                          src={exp.bgImage} 
                          alt="" 
                          className="w-full h-full object-cover opacity-[0.10] transition-opacity duration-300 group-hover:opacity-[0.15] mix-blend-multiply" 
                        />
                      </div>
                    )}

                    {/* Transparent Card Link Overlay */}
                    {exp.instagramUrl && (
                      <a
                        href={exp.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={exp.ariaLabel}
                        className="absolute inset-0 z-20 cursor-pointer"
                      />
                    )}

                    {/* Content Layer */}
                    <div className="relative z-10 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <h4 className="font-semibold text-sm text-warm-ink leading-tight">{exp.company}</h4>
                          {exp.descriptor && (
                            <p className="text-[10px] text-warm-ink/60 mt-0.5 leading-snug">{exp.descriptor}</p>
                          )}
                        </div>
                        <span className="text-[9px] uppercase tracking-wider font-bold text-warm-ink/40 whitespace-nowrap self-start">
                          {exp.period}
                        </span>
                      </div>

                      <div className="space-y-1">
                        <p className="text-[10px] font-semibold text-warm-accent uppercase tracking-wider leading-none">
                          {exp.role}
                        </p>
                        <p className="text-xs text-warm-ink/70 leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    </div>

                    {/* Social Link Display */}
                    {exp.instagramUrl ? (
                      <div className="relative z-10 pt-2 border-t border-warm-ink/5 flex items-center justify-between mt-3">
                        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-warm-ink/80 group-hover/link:text-warm-accent transition-colors">
                          <span 
                            className="w-5 h-5 rounded-full flex items-center justify-center text-white shadow-sm flex-shrink-0"
                            style={{
                              background: "linear-gradient(135deg, #F9CE34 0%, #EE2A7B 45%, #D62976 65%, #962FBF 82%, #4F5BD5 100%)"
                            }}
                          >
                            <Instagram size={11} strokeWidth={2.5} />
                          </span>
                          <span className="underline decoration-warm-ink/20 group-hover:decoration-warm-accent truncate max-w-[120px] sm:max-w-none">{exp.instagram}</span>
                          {exp.verified && (
                            <svg className="w-3.5 h-3.5 text-[#0095f6] fill-current flex-shrink-0" viewBox="0 0 24 24" aria-label="Verified account">
                              <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                            </svg>
                          )}
                        </div>
                        {exp.igStats && (
                          <span className="text-[10px] text-warm-ink/50 font-medium whitespace-nowrap">
                            {exp.igStats.followers} followers
                          </span>
                        )}
                      </div>
                    ) : exp.private ? (
                      <div className="relative z-10 pt-2 border-t border-warm-ink/5 flex items-center justify-between mt-3 text-warm-ink/50 italic text-[10px]">
                        <div className="flex items-center gap-1.5 truncate">
                          <Globe size={11} className="flex-shrink-0" />
                          <span className="truncate">{exp.privateText}</span>
                        </div>
                        <span className="text-[9px] font-bold uppercase tracking-wider bg-warm-ink/5 px-1.5 py-0.5 rounded ml-2 flex-shrink-0">Private</span>
                      </div>
                    ) : null}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Approach & Key Strengths Section (Spanning full width at the bottom of About) */}
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
                ].map(item => (
                  <div key={item} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-warm-accent mt-1.5 flex-shrink-0" />
                    <p className="text-xs text-warm-ink/60 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-24 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="serif text-5xl">Projects</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/40 p-2 rounded-[3rem] border border-warm-ink/5 group"
              >
                <div className="aspect-[1.5/1] mb-6 rounded-[2.8rem] overflow-hidden bg-warm-ink/5 relative group/video">
                  {project.videoUrl ? (
                    <video 
                      src={project.videoUrl}
                      poster={project.posterImage}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : project.posterImage ? (
                    <div className="w-full h-full relative">
                      <img 
                        src={project.posterImage} 
                        alt={project.title} 
                        className="w-full h-full object-cover filter brightness-[0.8] transition-all duration-500 group-hover/video:scale-105" 
                      />
                      {/* Mock Video Player Overlay */}
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center transition-colors duration-300 group-hover/video:bg-black/35">
                        <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-white shadow-xl transform transition-all duration-300 group-hover/video:scale-110 group-hover/video:bg-white/30">
                          {/* Play Icon */}
                          <svg className="w-6 h-6 fill-current translate-x-0.5" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                      
                      {/* Video Controller Bar Mock */}
                      <div className="absolute bottom-4 left-6 right-6 flex items-center gap-3 bg-black/40 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 opacity-0 transition-opacity duration-300 group-hover/video:opacity-100 select-none pointer-events-none">
                        <svg className="w-3.5 h-3.5 text-white fill-current" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                        <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                          <div className="w-1/3 h-full bg-warm-accent rounded-full" />
                        </div>
                        <span className="text-[9px] text-white/80 font-sans font-medium">0:05 / 0:15</span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-warm-ink/5">
                      <project.icon size={100} strokeWidth={0.5} />
                    </div>
                  )}
                </div>
                <div className="px-8 pb-10">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-warm-ink/40 mb-2 block">{project.category}</span>
                  <h3 className="serif text-3xl mb-4">{project.title}</h3>
                  <p className="text-sm text-warm-ink/70 leading-relaxed max-w-sm mb-6">
                    {project.desc}
                  </p>
                  <div className="flex items-center gap-3">
                    <span className={`px-3 py-1 text-[10px] uppercase font-bold rounded-full flex items-center gap-1.5 ${
                      project.status === "Ongoing" 
                        ? "bg-warm-accent/10 text-warm-accent animate-pulse" 
                        : "bg-warm-ink/5 text-warm-ink/40"
                    }`}>
                      {project.status === "Ongoing" && <span className="w-1.5 h-1.5 rounded-full bg-warm-accent" />}
                      {project.status}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="mb-24 scroll-mt-20">
          <div className="flex justify-between items-end mb-12">
            <h2 className="serif text-5xl">Services</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="p-8 rounded-[2rem] bg-white border border-warm-ink/5 hover:border-warm-accent shadow-sm transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-warm-accent/5 flex items-center justify-center mb-6 text-warm-accent">
                    <item.icon size={24} strokeWidth={1.5} />
                  </div>
                  <h3 className="serif text-2xl mb-3 leading-snug">{item.title}</h3>
                  <p className="text-xs text-warm-ink/70 leading-relaxed">{item.desc}</p>
                </div>
              </motion.div>
            ))}
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
                  className="font-sans text-2xl font-semibold tracking-wide text-warm-ink hover:text-warm-accent transition-colors underline underline-offset-8 decoration-warm-ink/20 self-start"
                >
                  +44 7882 746212
                </a>
                <a 
                  href="https://www.instagram.com/xiyato22"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-xl text-warm-ink/70 hover:text-warm-accent transition-colors self-start"
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
    </div>
  );
}
