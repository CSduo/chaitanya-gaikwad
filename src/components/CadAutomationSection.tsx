import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileCode, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  X, 
  Sliders, 
  ShieldCheck, 
  FolderCheck,
  FileText,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCcw
} from "lucide-react";

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

export interface CadImageItem {
  src: string;
  title: string;
  category?: string;
}

export function CadAutomationSection() {
  // Lightbox carousel & zoom state
  const [activeGallery, setActiveGallery] = useState<CadImageItem[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to discuss an AutoCAD drafting project ($1,000 package value). I have a plan/reference and need editable CAD drawings."
  );

  // Gallery collections for each project
  const HERO_GALLERY: CadImageItem[] = [
    { src: "/portfolio/cad-automation/hero-plan.webp", title: "Master Bathroom - General Layout Plan", category: "Plan Drawing" },
    { src: "/portfolio/cad-automation/hero-elevation.webp", title: "Master Bathroom - Bathtub & Window Elevation", category: "Wall Elevation" },
    { src: "/portfolio/cad-automation/cigar-lounge-ceiling.webp", title: "Cigar Lounge - Reflected Ceiling Plan (RCP)", category: "Ceiling Plan" },
    { src: "/portfolio/cad-automation/cigar-lounge-flooring.webp", title: "Cigar Lounge - Herringbone Flooring Plan", category: "Flooring Plan" }
  ];

  const MASTER_BATHROOM_GALLERY: CadImageItem[] = [
    { src: "/portfolio/cad-automation/master-bathroom-plan.webp", title: "Master Bathroom - General Arrangement Plan ($1,000 Full CAD Package)", category: "Plan Drawing" },
    { src: "/portfolio/cad-automation/master-bathroom-elevation.webp", title: "Master Bathroom - Wall 1: Bathtub & Window Elevation", category: "Elevation" },
    { src: "/portfolio/cad-automation/master-bathroom-vanity.webp", title: "Master Bathroom - Wall 2: Vanity & WC Wall Elevation", category: "Elevation" },
    { src: "/portfolio/cad-automation/master-bathroom-shower.webp", title: "Master Bathroom - Wall 3: Walk-in Shower Wall Elevation", category: "Elevation" },
    { src: "/portfolio/cad-automation/master-bathroom-render-input.webp", title: "Client Reference - 3D Visual Render", category: "Input Material" },
    { src: "/portfolio/cad-automation/master-bathroom-plan-input.webp", title: "Client Reference - Measured Hand Sketch & CAD Notes", category: "Input Material" }
  ];

  const CIGAR_LOUNGE_GALLERY: CadImageItem[] = [
    { src: "/portfolio/cad-automation/cigar-lounge-layout.webp", title: "Cigar Lounge - General Furniture Layout ($1,000 Full CAD Package)", category: "Plan Drawing" },
    { src: "/portfolio/cad-automation/cigar-lounge-ceiling.webp", title: "Cigar Lounge - Reflected Ceiling Plan (RCP)", category: "Ceiling Plan" },
    { src: "/portfolio/cad-automation/cigar-lounge-flooring.webp", title: "Cigar Lounge - Herringbone Flooring Layout", category: "Flooring Plan" }
  ];

  const FEATURE_WALL_GALLERY: CadImageItem[] = [
    { src: "/portfolio/cad-automation/feature-wall-overview.webp", title: "Custom Interior Walls - General Arrangement & Layout ($1,000 Full Package)", category: "General Layout" },
    { src: "/portfolio/cad-automation/toilet-elevations.webp", title: "Toilet Feature Wall - Vanity & Mirror Elevation Details", category: "Elevation" },
    { src: "/portfolio/cad-automation/wash-elevations.webp", title: "Wash Feature Wall - Decorative Panelling & Fixture Elevation", category: "Elevation" },
    { src: "/portfolio/cad-automation/stair-wall-detail.webp", title: "Stair Feature Wall - Architectural Joinery Construction Detail", category: "Construction Detail" }
  ];

  const BEFORE_AFTER_GALLERY: CadImageItem[] = [
    { src: "/portfolio/cad-automation/master-bathroom-render-input.webp", title: "Client Input - Visual 3D Render Reference", category: "Client Reference" },
    { src: "/portfolio/cad-automation/master-bathroom-plan-input.webp", title: "Client Input - Dimensioned Layout & Markups", category: "Client Reference" },
    { src: "/portfolio/cad-automation/master-bathroom-plan.webp", title: "Editable CAD Output - Vector General Arrangement Plan ($1,000 Value)", category: "Vector DWG / DXF" },
    { src: "/portfolio/cad-automation/master-bathroom-elevation.webp", title: "Editable CAD Output - Vector Wall Elevation with Dimensions", category: "Vector DWG / DXF" }
  ];

  const openLightbox = (gallery: CadImageItem[], index: number = 0) => {
    setActiveGallery(gallery);
    setCurrentIndex(index);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleNext = () => {
    if (!activeGallery) return;
    setCurrentIndex((prev) => (prev + 1) % activeGallery.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handlePrev = () => {
    if (!activeGallery) return;
    setCurrentIndex((prev) => (prev - 1 + activeGallery.length) % activeGallery.length);
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleZoomIn = () => {
    setZoomScale((prev) => Math.min(prev + 0.5, 3.5));
  };

  const handleZoomOut = () => {
    setZoomScale((prev) => {
      const nextScale = Math.max(prev - 0.5, 1);
      if (nextScale === 1) setPanPosition({ x: 0, y: 0 });
      return nextScale;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleToggleZoom = () => {
    if (zoomScale > 1) {
      handleResetZoom();
    } else {
      setZoomScale(2);
    }
  };

  // Mouse Wheel Zoom
  const handleWheel = (e: React.WheelEvent) => {
    if (e.deltaY < 0) {
      handleZoomIn();
    } else {
      handleZoomOut();
    }
  };

  // Keyboard navigation & escape/backspace handling
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGallery) return;
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "Escape" || e.key === "Backspace") setActiveGallery(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeGallery]);

  return (
    <section id="cad-automation" className="py-24 border-b border-warm-ink/10 scroll-mt-20 space-y-24">
      {/* 1. MAIN AUTOMATION HERO INTRODUCTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-warm-accent">
              <span className="w-2 h-2 rounded-full bg-warm-accent" />
              <span>Architectural & Interior CAD Drafting</span>
            </div>
            <span className="bg-warm-accent/10 text-warm-accent border border-warm-accent/20 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase">
              $1,000 Package Value
            </span>
          </div>

          <h2 className="serif text-5xl lg:text-6xl leading-tight">
            Architectural & Interior CAD Drafting
          </h2>

          <p className="text-base font-medium text-warm-ink/90 leading-snug">
            From design references and measured layouts to editable AutoCAD drawing packages.
          </p>

          <p className="text-sm text-warm-ink/75 leading-relaxed">
            I combine structured design inputs, professional CAD scripting, and detailed quality checks to produce editable architectural and interior drawings faster. Plans, elevations, ceiling layouts, flooring patterns, and custom interior details are developed from supplied measurements, engineering drawings, and visual references, then delivered as editable DWG, DXF, and presentation-ready PDF files.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-warm-ink/10 shadow-sm flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <ShieldCheck className="w-5 h-5 text-warm-accent flex-shrink-0" />
              <p className="text-xs font-semibold text-warm-ink tracking-wide">
                Designed for client review. Fully editable for professional refinement.
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-warm-accent bg-warm-accent/10 px-2.5 py-1 rounded-lg border border-warm-accent/20 flex-shrink-0">
              $1,000
            </span>
          </div>
        </div>

        {/* Hero Layered Composition Preview */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white border border-warm-ink/10 shadow-xl p-4 flex flex-col justify-between group">
            <div className="grid grid-cols-2 gap-3 h-full">
              {HERO_GALLERY.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => openLightbox(HERO_GALLERY, idx)}
                  className="relative rounded-2xl overflow-hidden bg-warm-ink/5 border border-warm-ink/10 cursor-pointer group/card aspect-[4/3] shadow-sm"
                >
                  <img 
                    src={img.src} 
                    alt={img.title}
                    loading="eager"
                    className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/65 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                    {img.category}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-3 flex justify-between items-center text-[10px] text-warm-ink/60 uppercase tracking-wider font-semibold border-t border-warm-ink/5">
              <span>AutoCAD DWG / DXF Output ($1,000 Set)</span>
              <span className="text-warm-accent font-bold">Click any preview to browse carousel →</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FEATURED PROJECTS SHOWCASE */}
      <div className="space-y-12">
        <div className="border-b border-warm-ink/10 pb-6 flex justify-between items-end">
          <div>
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block mb-2">Selected CAD Packages</span>
            <h3 className="serif text-4xl">Featured Projects</h3>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-mono font-bold bg-warm-accent/10 text-warm-accent px-3 py-1 rounded-full border border-warm-accent/20">
              Project Package Value: $1,000
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PROJECT 1 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-all duration-300 group">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div 
                onClick={() => openLightbox(MASTER_BATHROOM_GALLERY, 0)}
                className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10 cursor-pointer relative"
              >
                {MASTER_BATHROOM_GALLERY.slice(0, 4).map((img, idx) => (
                  <img 
                    key={idx}
                    src={img.src} 
                    alt={img.title}
                    loading="eager"
                    onClick={(e) => {
                      e.stopPropagation();
                      openLightbox(MASTER_BATHROOM_GALLERY, idx);
                    }}
                    className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300"
                    style={{ imageRendering: "-webkit-optimize-contrast" }}
                  />
                ))}
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold">
                  + 6 Drawings
                </div>
                <div className="absolute top-3 left-3 bg-warm-accent text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold shadow-md">
                  $1,000 Package
                </div>
              </div>

              <div>
                <div className="flex justify-between items-start mb-1">
                  <h4 
                    onClick={() => openLightbox(MASTER_BATHROOM_GALLERY, 0)}
                    className="serif text-2xl font-semibold cursor-pointer hover:text-warm-accent transition-colors"
                  >
                    Master Bathroom CAD Package
                  </h4>
                </div>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  An editable bathroom drawing package developed from a measured plan and interior-design references. The package included the general arrangement, four wall elevations, sanitary-fixture coordination, window setting-out and professional presentation sheets. Total project value: $1,000.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["PLAN", "4 ELEVATIONS", "FIXTURE LAYOUT", "DWG + DXF", "$1,000 VALUE"].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 text-warm-ink/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT 2 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-all duration-300 group">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div 
                onClick={() => openLightbox(CIGAR_LOUNGE_GALLERY, 0)}
                className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10 cursor-pointer relative"
              >
                <img 
                  src={CIGAR_LOUNGE_GALLERY[0].src} 
                  alt={CIGAR_LOUNGE_GALLERY[0].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(CIGAR_LOUNGE_GALLERY, 0);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300 col-span-2 aspect-[16/9]"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <img 
                  src={CIGAR_LOUNGE_GALLERY[1].src} 
                  alt={CIGAR_LOUNGE_GALLERY[1].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(CIGAR_LOUNGE_GALLERY, 1);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <img 
                  src={CIGAR_LOUNGE_GALLERY[2].src} 
                  alt={CIGAR_LOUNGE_GALLERY[2].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(CIGAR_LOUNGE_GALLERY, 2);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold">
                  3 CAD Drawings
                </div>
                <div className="absolute top-3 left-3 bg-warm-accent text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold shadow-md">
                  $1,000 Package
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => openLightbox(CIGAR_LOUNGE_GALLERY, 0)}
                  className="serif text-2xl font-semibold mb-2 cursor-pointer hover:text-warm-accent transition-colors"
                >
                  Cigar Lounge Ceiling & Flooring
                </h4>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  A reflected ceiling and flooring package created from a supplied furniture layout and luxury interior references. The work included a coordinated coffered-ceiling concept, lighting arrangement and editable herringbone flooring pattern. Total project value: $1,000.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["RCP", "COFFERED CEILING", "LIGHTING LAYOUT", "HERRINGBONE FLOOR", "$1,000 VALUE"].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 text-warm-ink/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT 3 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-all duration-300 group">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div 
                onClick={() => openLightbox(FEATURE_WALL_GALLERY, 0)}
                className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10 cursor-pointer relative"
              >
                <img 
                  src={FEATURE_WALL_GALLERY[0].src} 
                  alt={FEATURE_WALL_GALLERY[0].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(FEATURE_WALL_GALLERY, 0);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300 col-span-2 aspect-[16/9]"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <img 
                  src={FEATURE_WALL_GALLERY[1].src} 
                  alt={FEATURE_WALL_GALLERY[1].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(FEATURE_WALL_GALLERY, 1);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <img 
                  src={FEATURE_WALL_GALLERY[3].src} 
                  alt={FEATURE_WALL_GALLERY[3].title}
                  loading="eager"
                  onClick={(e) => {
                    e.stopPropagation();
                    openLightbox(FEATURE_WALL_GALLERY, 3);
                  }}
                  className="w-full h-full object-cover rounded-xl hover:scale-[1.04] transition-transform duration-300"
                  style={{ imageRendering: "-webkit-optimize-contrast" }}
                />
                <div className="absolute bottom-3 right-3 bg-black/75 backdrop-blur-md text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold">
                  4 Wall Packages
                </div>
                <div className="absolute top-3 left-3 bg-warm-accent text-white px-2.5 py-1 rounded-full text-[9px] font-mono font-bold shadow-md">
                  $1,000 Package
                </div>
              </div>

              <div>
                <h4 
                  onClick={() => openLightbox(FEATURE_WALL_GALLERY, 0)}
                  className="serif text-2xl font-semibold mb-2 cursor-pointer hover:text-warm-accent transition-colors"
                >
                  Custom Interior Wall Drafting
                </h4>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  Editable feature-wall drawings developed from interior references, confirmed overall dimensions and project-specific design instructions. The workflow supports TV units, display walls, decorative panelling, cabinetry, mirrors and under-stair wall compositions. Total project value: $1,000.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["FEATURE WALLS", "CABINETRY", "PANELLING", "DIMENSIONS", "$1,000 VALUE"].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 text-warm-ink/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. BEFORE-TO-EDITABLE-CAD PRESENTATION COMPARISON */}
      <div className="p-8 md:p-12 rounded-[3rem] bg-white border border-warm-ink/5 shadow-sm space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block">Transformation Workflow</span>
          <h3 className="serif text-3xl md:text-4xl">Client Input to Editable CAD Output</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Side: Client Input */}
          <div 
            onClick={() => openLightbox(BEFORE_AFTER_GALLERY, 0)}
            className="lg:col-span-5 space-y-4 p-6 rounded-[2rem] bg-warm-ink/5 border border-warm-ink/10 cursor-pointer hover:border-warm-accent/40 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-warm-ink/60">Client Input</span>
              <span className="text-[9px] font-mono bg-warm-ink/10 px-2 py-0.5 rounded text-warm-ink/60">Reference Materials</span>
            </div>
            <div className="grid grid-cols-2 gap-3 aspect-[4/3] rounded-2xl overflow-hidden bg-white p-2 border border-warm-ink/10">
              <img 
                src="/portfolio/cad-automation/master-bathroom-render-input.webp" 
                alt="Client 3D Render Reference"
                loading="eager"
                className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-300"
              />
              <img 
                src="/portfolio/cad-automation/master-bathroom-plan-input.webp" 
                alt="Client Dimension Sketch Input"
                loading="eager"
                className="w-full h-full object-cover rounded-xl opacity-90 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <ul className="text-xs text-warm-ink/70 space-y-1 font-mono">
              <li>• Supplied hand sketch / PDF layout</li>
              <li>• Measured room dimensions & constraints</li>
              <li>• Interior visual renders & material specs</li>
            </ul>
          </div>

          {/* Center Transition Arrow */}
          <div className="lg:col-span-2 flex flex-col items-center justify-center space-y-2 text-center">
            <div className="w-12 h-12 rounded-full bg-warm-accent/10 border border-warm-accent/20 flex items-center justify-center text-warm-accent">
              <ArrowRight className="w-6 h-6 rotate-90 lg:rotate-0" />
            </div>
            <span className="text-[9px] uppercase tracking-wider font-bold text-warm-accent">CAD Drafting & Scripting</span>
          </div>

          {/* Right Side: Editable CAD Output */}
          <div 
            onClick={() => openLightbox(BEFORE_AFTER_GALLERY, 2)}
            className="lg:col-span-5 space-y-4 p-6 rounded-[2rem] bg-white border border-warm-accent/20 shadow-md cursor-pointer hover:border-warm-accent transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent">Editable CAD Output</span>
              <span className="text-[9px] font-mono bg-warm-accent/10 text-warm-accent px-2 py-0.5 rounded font-bold">DWG / DXF / PDF ($1,000)</span>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-warm-ink/5 p-1 border border-warm-ink/10 relative">
              <img 
                src="/portfolio/cad-automation/master-bathroom-plan.webp" 
                alt="Clean Vector CAD Plan Output"
                loading="eager"
                className="w-full h-full object-cover rounded-xl hover:scale-105 transition-transform duration-300"
                style={{ imageRendering: "-webkit-optimize-contrast" }}
              />
              <div className="absolute top-3 right-3 bg-black/75 text-white backdrop-blur-md px-3 py-1 rounded-full text-[9px] font-mono">
                Editable Geometry + Layers
              </div>
            </div>
            <ul className="text-xs text-warm-ink/80 space-y-1 font-mono">
              <li>✓ Clean plan, elevations & dimensions</li>
              <li>✓ Organised CAD layers, blocks & hatches</li>
              <li>✓ Presentation PDF & editable DWG/DXF files</li>
            </ul>
          </div>
        </div>

        <p className="text-center text-xs text-warm-ink/75 leading-relaxed max-w-xl mx-auto italic pt-2">
          Reference plans, dimensions and design images are converted into structured, editable CAD documentation—not simply placed as flat images.
        </p>
      </div>

      {/* 4. WORKFLOW SECTION */}
      <div className="space-y-12">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block">Structured Process</span>
          <h3 className="serif text-4xl">4-Step Production Workflow</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: "Step 01",
              title: "Project Inputs",
              desc: "The client supplies measurements, plans, markups, sketches, renders or reference images.",
              icon: FileText
            },
            {
              step: "Step 02",
              title: "Technical Specification",
              desc: "The requirements are organised into fixed dimensions, design rules, editable assumptions and drawing deliverables.",
              icon: Sliders
            },
            {
              step: "Step 03",
              title: "CAD Drafting & Production",
              desc: "Precision CAD scripting, layer setting-out, and professional drafting create plans, elevations, ceiling layouts, flooring patterns, dimensions, layers, and presentation sheets.",
              icon: Layers
            },
            {
              step: "Step 04",
              title: "Verification & Delivery",
              desc: "The package is reviewed through dimensional checks, visual comparison and file-integrity testing before delivery as editable DWG, DXF and PDF files.",
              icon: FolderCheck
            }
          ].map((item, idx) => (
            <div 
              key={idx}
              className="p-8 rounded-[2rem] bg-white border border-warm-ink/5 shadow-sm space-y-4 hover:border-warm-accent transition-colors"
            >
              <div className="flex justify-between items-center">
                <span className="text-[10px] uppercase tracking-widest font-mono font-bold text-warm-accent">{item.step}</span>
                <item.icon className="w-5 h-5 text-warm-ink/40" />
              </div>
              <h4 className="serif text-xl font-semibold">{item.title}</h4>
              <p className="text-xs text-warm-ink/70 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* 5. QUALITY CONTROL & CAPABILITIES GRID */}
      <div className="space-y-16 pt-6">
        {/* Quality Control Subsection */}
        <div className="p-8 md:p-12 rounded-[3rem] bg-warm-ink/5 border border-warm-ink/10 space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block">Quality Control & Verification</span>
              <h3 className="serif text-3xl md:text-4xl">Quality Control With Verification</h3>
              <p className="text-sm text-warm-ink/75 leading-relaxed">
                Professional drafting is only useful when the result remains measurable, editable, and reviewable. Each package is checked for confirmed dimensions, room geometry, door and fixture relationships, layer organisation, file editability, annotation clarity, and presentation quality. Any dimensions estimated from visual references remain clearly editable for final professional adjustment.
              </p>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3">
              {[
                "DIMENSION CHECKED",
                "EDITABLE GEOMETRY",
                "LAYER ORGANIZED",
                "VISUALLY REVIEWED",
                "PDF PRESENTATION",
                "REVISION READY"
              ].map((indicator) => (
                <div key={indicator} className="p-3.5 rounded-2xl bg-white border border-warm-ink/10 flex items-center gap-2.5 shadow-sm">
                  <CheckCircle2 className="w-4 h-4 text-green-700 flex-shrink-0" />
                  <span className="text-[9px] uppercase tracking-wider font-bold text-warm-ink/80">{indicator}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Capabilities Grid */}
        <div className="space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-[10px] uppercase tracking-[0.2em] text-warm-accent font-bold block">Capabilities</span>
            <h3 className="serif text-4xl">Supported CAD Deliverables</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Architectural Plans", desc: "Dimensioned general arrangement and layout plans." },
              { title: "Interior Elevations", desc: "Vertical wall drawings with fixture and material setting-out." },
              { title: "Furniture & Cabinet Drawings", desc: "Custom millwork, joinery divisions and cabinet elevations." },
              { title: "TV and Feature Walls", desc: "Media units, panelling, display niches and feature walls." },
              { title: "Reflected Ceiling Plans", desc: "Coffered ceilings, coving, soffits and modular grids." },
              { title: "Flooring Patterns", desc: "Herringbone, stone layouts, tile bounds and flooring setting-out." },
              { title: "Bathroom Layouts", desc: "Sanitary fixture placement, wall tile divisions and window alignment." },
              { title: "Lighting Coordination", desc: "Downlight layouts, LED strip channels and fixture positions." },
              { title: "Dimensioned CAD Drafts", desc: "Fully dimensioned, annotated and scaled CAD geometry." },
              { title: "DWG / DXF Conversion", desc: "Renders, sketches and markups converted to editable CAD vectors." },
              { title: "Presentation PDFs", desc: "Client-ready title sheets and clean vectorized drawing sets." },
              { title: "Revision Packages", desc: "Structured CAD drawing sets ready for client review and designer refinement." }
            ].map((cap, idx) => (
              <div key={idx} className="p-6 rounded-2xl bg-white border border-warm-ink/5 shadow-sm hover:border-warm-accent/30 transition-colors space-y-2">
                <h4 className="serif text-lg font-semibold text-warm-ink">{cap.title}</h4>
                <p className="text-xs text-warm-ink/65 leading-relaxed">{cap.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Deliverables Display */}
        <div className="p-8 rounded-[2.5rem] bg-white border border-warm-ink/10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent">Flexible File Formats</span>
            <div className="flex flex-wrap gap-2">
              {["DWG", "DXF", "PDF", "PNG PREVIEW", "CUSTOM LISP SCRIPT (INCLUDED)"].map((fmt) => (
                <span key={fmt} className="text-xs font-mono font-bold bg-warm-ink text-white px-3 py-1 rounded-lg">
                  {fmt}
                </span>
              ))}
            </div>
            <p className="text-xs text-warm-ink/70 pt-1">
              Flexible deliverables for review, editing, presentation and continued development by the client’s design team. Total project drawing set value: $1,000.
            </p>
          </div>
        </div>
      </div>

      {/* 6. CALL TO ACTION */}
      <div className="p-12 md:p-16 rounded-[3rem] bg-white border border-warm-ink/10 shadow-lg text-center max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <div className="inline-block bg-warm-accent/10 text-warm-accent px-4 py-1.5 rounded-full text-xs font-mono font-bold border border-warm-accent/20 mb-2">
            Full Drawing Package Value: $1,000
          </div>
          <h3 className="serif text-4xl md:text-5xl">Have a plan, reference or design that needs drafting?</h3>
          <p className="text-sm text-warm-ink/70 leading-relaxed max-w-xl mx-auto">
            Send the available layout, measurements and design references. I will review the material, identify what is confirmed or missing, and propose the appropriate editable CAD package ($1,000 project value).
          </p>
        </div>

        <div className="flex flex-wrap gap-4 justify-center items-center">
          {/* Primary Button */}
          <a 
            href={`https://wa.me/447882746212?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-warm-accent text-white px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-warm-accent/90 transition-all shadow-md group/cta"
          >
            <span className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-white">
              <WhatsAppIcon className="w-3 h-3" />
            </span>
            <span>Start a CAD Project ($1,000)</span>
          </a>

          {/* Secondary Button */}
          <button 
            onClick={() => openLightbox(MASTER_BATHROOM_GALLERY, 0)}
            className="border border-warm-ink/20 text-warm-ink px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-warm-ink/5 transition-colors"
          >
            View Drawing Samples
          </button>
        </div>
      </div>

      {/* DISCREET TRUST AND DISCLAIMER NOTE */}
      <div className="max-w-3xl mx-auto text-center px-4 pt-4">
        <p className="text-[11px] text-warm-ink/50 leading-relaxed font-mono">
          CAD packages are developed from the measurements and references supplied for each project ($1,000 total package value). Provisional details remain editable and should be reviewed by the project’s qualified designer, draftsman or technical consultant before construction.
        </p>
      </div>

      {/* 100% FULL-SCREEN LIGHTBOX OVERLAY WITH SMOOTH ZOOM, PAN & KEYBOARD EXIT */}
      <AnimatePresence>
        {activeGallery && activeGallery.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveGallery(null)}
            onWheel={handleWheel}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl flex flex-col justify-between p-3 md:p-6 cursor-pointer select-none overflow-hidden w-screen h-screen"
          >
            {/* Top Toolbar: Drawing Title, Zoom Controls & Close (X) Button */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex justify-between items-center px-4 py-3 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md z-30 flex-shrink-0"
            >
              <div className="space-y-0.5 max-w-[60%]">
                <span className="text-[10px] font-mono uppercase tracking-widest text-warm-accent font-bold block">
                  {activeGallery[currentIndex].category || "CAD Drawing Package"} • Sheet {currentIndex + 1} of {activeGallery.length}
                </span>
                <h3 className="serif text-base md:text-xl text-white font-semibold line-clamp-1">
                  {activeGallery[currentIndex].title}
                </h3>
              </div>

              {/* Controls Group */}
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-white/10 p-1.5 rounded-full border border-white/15">
                  <button
                    onClick={handleZoomOut}
                    title="Zoom Out"
                    className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all"
                  >
                    <ZoomOut size={18} />
                  </button>
                  <button
                    onClick={handleToggleZoom}
                    title="Toggle 100% / Fit Zoom"
                    className="text-[10px] font-mono text-white/90 px-2.5 py-1 rounded-full font-bold hover:bg-white/20 transition-all"
                  >
                    {Math.round(zoomScale * 100)}%
                  </button>
                  <button
                    onClick={handleZoomIn}
                    title="Zoom In"
                    className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all"
                  >
                    <ZoomIn size={18} />
                  </button>
                  {zoomScale !== 1 && (
                    <button
                      onClick={handleResetZoom}
                      title="Reset Zoom"
                      className="text-white/70 hover:text-white p-2 rounded-full hover:bg-white/20 transition-all ml-1 border-l border-white/15"
                    >
                      <RotateCcw size={16} />
                    </button>
                  )}
                </div>

                <button 
                  onClick={() => setActiveGallery(null)}
                  className="text-white/80 hover:text-white bg-white/15 hover:bg-white/30 p-2.5 rounded-full transition-all border border-white/20"
                  aria-label="Close drawing viewer (Esc or Backspace)"
                  title="Close (Esc or Backspace)"
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* Main Interactive Zoom & Pan Workspace */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative flex-1 rounded-3xl overflow-hidden bg-black/60 flex items-center justify-center my-3 p-2 border border-white/10"
            >
              {/* Left Navigation Arrow */}
              {activeGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all z-40 hover:scale-110 border border-white/20 shadow-xl"
                  aria-label="Previous drawing"
                >
                  <ChevronLeft size={28} />
                </button>
              )}

              {/* Right Navigation Arrow */}
              {activeGallery.length > 1 && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/15 hover:bg-white/30 text-white p-3 md:p-4 rounded-full backdrop-blur-md transition-all z-40 hover:scale-110 border border-white/20 shadow-xl"
                  aria-label="Next drawing"
                >
                  <ChevronRight size={28} />
                </button>
              )}

              {/* Draggable & Zoomable Crisp CAD Image */}
              <motion.div
                drag
                dragConstraints={{ left: -1000, right: 1000, top: -800, bottom: 800 }}
                dragElastic={0.1}
                className="w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing overflow-visible"
              >
                <img 
                  key={currentIndex}
                  src={activeGallery[currentIndex].src} 
                  alt={activeGallery[currentIndex].title}
                  loading="eager"
                  onDoubleClick={handleToggleZoom}
                  style={{ 
                    transform: `scale(${zoomScale})`,
                    transition: "transform 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
                    imageRendering: "-webkit-optimize-contrast"
                  }}
                  className="max-h-[82vh] w-auto max-w-full object-contain rounded-lg shadow-2xl pointer-events-auto"
                />
              </motion.div>
            </div>

            {/* Bottom Controls Bar: Thumbnail Strip & Keyboard Hint */}
            <div 
              onClick={(e) => e.stopPropagation()}
              className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-2 bg-neutral-900/90 border border-white/10 rounded-2xl backdrop-blur-md z-30 flex-shrink-0"
            >
              <div className="flex gap-2 overflow-x-auto py-1 scrollbar-none max-w-full">
                {activeGallery.map((thumb, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrentIndex(idx);
                      setZoomScale(1);
                    }}
                    className={`relative w-14 h-10 md:w-16 md:h-11 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all duration-200 ${
                      idx === currentIndex 
                        ? "border-warm-accent scale-105 shadow-lg opacity-100" 
                        : "border-transparent opacity-40 hover:opacity-100"
                    }`}
                  >
                    <img 
                      src={thumb.src} 
                      alt={thumb.title}
                      className="w-full h-full object-cover"
                      style={{ imageRendering: "-webkit-optimize-contrast" }}
                    />
                  </button>
                ))}
              </div>

              <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest hidden md:block">
                Press <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">Esc</kbd> or <kbd className="bg-white/10 px-1.5 py-0.5 rounded text-white font-bold">Backspace</kbd> to exit • Double click / Wheel to zoom
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
