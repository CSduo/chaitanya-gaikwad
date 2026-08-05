import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  FileCode, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Maximize2, 
  X, 
  Sliders, 
  Sparkles, 
  ShieldCheck, 
  FolderCheck,
  FileText
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

export function CadAutomationSection() {
  const [activePreview, setActivePreview] = useState<{ src: string; title: string } | null>(null);

  const whatsappMessage = encodeURIComponent(
    "Hello, I would like to discuss an AI-assisted AutoCAD drafting project. I have a plan/reference and need editable CAD drawings."
  );

  return (
    <section id="cad-automation" className="py-24 border-b border-warm-ink/10 scroll-mt-20 space-y-24">
      {/* 1. MAIN AUTOMATION HERO INTRODUCTION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Intro Copy */}
        <div className="lg:col-span-6 space-y-6">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.25em] font-bold text-warm-accent">
            <span className="w-2 h-2 rounded-full bg-warm-accent animate-pulse" />
            <span>AI-Assisted Architectural & Interior CAD</span>
          </div>

          <h2 className="serif text-5xl lg:text-6xl leading-tight">
            AI-Powered CAD Automation
          </h2>

          <p className="text-base font-medium text-warm-ink/90 leading-snug">
            From design references and measured layouts to editable AutoCAD drawing packages.
          </p>

          <p className="text-sm text-warm-ink/75 leading-relaxed">
            I combine structured design inputs, CAD automation and detailed quality checks to produce editable architectural and interior drawings faster. Plans, elevations, ceiling layouts, flooring patterns and custom interior details can be developed from supplied measurements, engineering drawings and visual references, then delivered as editable DWG, DXF and presentation-ready PDF files.
          </p>

          <div className="p-4 rounded-2xl bg-white border border-warm-ink/10 shadow-sm flex items-center gap-3">
            <ShieldCheck className="w-5 h-5 text-warm-accent flex-shrink-0" />
            <p className="text-xs font-semibold text-warm-ink tracking-wide">
              Designed for client review. Editable for professional refinement.
            </p>
          </div>
        </div>

        {/* Hero Layered Composition Preview */}
        <div className="lg:col-span-6 relative">
          <div className="relative aspect-[4/3] rounded-[2.5rem] overflow-hidden bg-white border border-warm-ink/10 shadow-xl p-4 flex flex-col justify-between group">
            <div className="grid grid-cols-2 gap-3 h-full">
              {/* Plan Card */}
              <div 
                onClick={() => setActivePreview({ src: "/portfolio/cad-automation/hero-plan.webp", title: "General Layout Plan" })}
                className="relative rounded-2xl overflow-hidden bg-warm-ink/5 border border-warm-ink/10 cursor-pointer group/card aspect-[4/3] shadow-sm"
              >
                <img 
                  src="/portfolio/cad-automation/hero-plan.webp" 
                  alt="General Plan CAD Preview"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                  PLAN
                </div>
              </div>

              {/* Elevation Card */}
              <div 
                onClick={() => setActivePreview({ src: "/portfolio/cad-automation/hero-elevation.webp", title: "Wall Elevation" })}
                className="relative rounded-2xl overflow-hidden bg-warm-ink/5 border border-warm-ink/10 cursor-pointer group/card aspect-[4/3] shadow-sm"
              >
                <img 
                  src="/portfolio/cad-automation/hero-elevation.webp" 
                  alt="Wall Elevation CAD Preview"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                  ELEVATION
                </div>
              </div>

              {/* Ceiling Card */}
              <div 
                onClick={() => setActivePreview({ src: "/portfolio/cad-automation/cigar-lounge-ceiling.webp", title: "Reflected Ceiling Plan" })}
                className="relative rounded-2xl overflow-hidden bg-warm-ink/5 border border-warm-ink/10 cursor-pointer group/card aspect-[4/3] shadow-sm"
              >
                <img 
                  src="/portfolio/cad-automation/cigar-lounge-ceiling.webp" 
                  alt="Reflected Ceiling Plan CAD Preview"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                  CEILING
                </div>
              </div>

              {/* Flooring Card */}
              <div 
                onClick={() => setActivePreview({ src: "/portfolio/cad-automation/cigar-lounge-flooring.webp", title: "Herringbone Flooring Plan" })}
                className="relative rounded-2xl overflow-hidden bg-warm-ink/5 border border-warm-ink/10 cursor-pointer group/card aspect-[4/3] shadow-sm"
              >
                <img 
                  src="/portfolio/cad-automation/cigar-lounge-flooring.webp" 
                  alt="Herringbone Flooring Plan CAD Preview"
                  loading="lazy"
                  className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
                />
                <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full text-[9px] font-bold text-white tracking-widest uppercase">
                  FLOORING
                </div>
              </div>
            </div>
            
            <div className="pt-3 flex justify-between items-center text-[10px] text-warm-ink/60 uppercase tracking-wider font-semibold border-t border-warm-ink/5">
              <span>AutoCAD DWG / DXF Output</span>
              <span>Click previews to expand</span>
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
          <span className="text-xs text-warm-ink/50 font-semibold hidden md:block">
            Editable DWG + DXF + Vector PDF Deliverables
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* PROJECT 1 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-colors">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10">
                <img 
                  src="/portfolio/cad-automation/master-bathroom-plan.webp" 
                  alt="Master Bathroom Plan Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/master-bathroom-plan.webp", title: "Master Bathroom Plan" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
                <img 
                  src="/portfolio/cad-automation/master-bathroom-elevation.webp" 
                  alt="Bathtub and Window Elevation Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/master-bathroom-elevation.webp", title: "Bathtub & Window Elevation" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
                <img 
                  src="/portfolio/cad-automation/master-bathroom-vanity.webp" 
                  alt="Vanity and WC Elevation Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/master-bathroom-vanity.webp", title: "Vanity & WC Wall Elevation" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
                <img 
                  src="/portfolio/cad-automation/master-bathroom-shower.webp" 
                  alt="Shower Wall Elevation Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/master-bathroom-shower.webp", title: "Shower Wall Elevation" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div>
                <h4 className="serif text-2xl font-semibold mb-2">Master Bathroom CAD Package</h4>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  An editable bathroom drawing package developed from a measured plan and interior-design references. The package included the general arrangement, four wall elevations, sanitary-fixture coordination, window setting-out and professional presentation sheets.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["PLAN", "4 ELEVATIONS", "FIXTURE LAYOUT", "DWG + DXF", "PDF SET"].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 text-warm-ink/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT 2 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-colors">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10">
                <img 
                  src="/portfolio/cad-automation/cigar-lounge-layout.webp" 
                  alt="General Lounge Layout Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/cigar-lounge-layout.webp", title: "General Lounge Layout" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300 col-span-2 aspect-[16/9]"
                />
                <img 
                  src="/portfolio/cad-automation/cigar-lounge-ceiling.webp" 
                  alt="Reflected Ceiling Plan Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/cigar-lounge-ceiling.webp", title: "Reflected Ceiling Plan" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
                <img 
                  src="/portfolio/cad-automation/cigar-lounge-flooring.webp" 
                  alt="Herringbone Flooring Plan Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/cigar-lounge-flooring.webp", title: "Herringbone Flooring Plan" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div>
                <h4 className="serif text-2xl font-semibold mb-2">Cigar Lounge Ceiling & Flooring</h4>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  A reflected ceiling and flooring package created from a supplied furniture layout and luxury interior references. The work included a coordinated coffered-ceiling concept, lighting arrangement and editable herringbone flooring pattern.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["RCP", "COFFERED CEILING", "LIGHTING LAYOUT", "HERRINGBONE FLOOR", "EDITABLE CAD"].map((tag) => (
                <span key={tag} className="text-[9px] font-semibold bg-warm-ink/5 text-warm-ink/70 px-2.5 py-1 rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* PROJECT 3 */}
          <div className="p-6 rounded-[2.5rem] bg-white border border-warm-ink/5 shadow-sm space-y-6 flex flex-col justify-between hover:border-warm-accent/30 transition-colors">
            <div className="space-y-4">
              {/* Previews Grid */}
              <div className="grid grid-cols-2 gap-2 aspect-[4/3] rounded-[1.8rem] overflow-hidden bg-warm-ink/5 p-1.5 border border-warm-ink/10">
                <img 
                  src="/portfolio/cad-automation/feature-wall-overview.webp" 
                  alt="Three Wall Trial Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/feature-wall-overview.webp", title: "General Arrangement & Feature Wall" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300 col-span-2 aspect-[16/9]"
                />
                <img 
                  src="/portfolio/cad-automation/toilet-elevations.webp" 
                  alt="Toilet Feature Wall Elevation"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/toilet-elevations.webp", title: "Toilet Feature Wall Elevations" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
                <img 
                  src="/portfolio/cad-automation/stair-wall-detail.webp" 
                  alt="Stair Wall Detail Preview"
                  loading="lazy"
                  onClick={() => setActivePreview({ src: "/portfolio/cad-automation/stair-wall-detail.webp", title: "Stair Wall Detail" })}
                  className="w-full h-full object-cover rounded-xl cursor-pointer hover:scale-[1.03] transition-transform duration-300"
                />
              </div>

              <div>
                <h4 className="serif text-2xl font-semibold mb-2">Custom Interior Wall Drafting</h4>
                <p className="text-xs text-warm-ink/75 leading-relaxed">
                  Editable feature-wall drawings developed from interior references, confirmed overall dimensions and project-specific design instructions. The workflow supports TV units, display walls, decorative panelling, cabinetry, mirrors and under-stair wall compositions.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2 border-t border-warm-ink/5">
              {["FEATURE WALLS", "CABINETRY", "PANELLING", "DIMENSIONS", "REVISION READY"].map((tag) => (
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
          <div className="lg:col-span-5 space-y-4 p-6 rounded-[2rem] bg-warm-ink/5 border border-warm-ink/10">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-warm-ink/60">Client Input</span>
              <span className="text-[9px] font-mono bg-warm-ink/10 px-2 py-0.5 rounded text-warm-ink/60">Reference Materials</span>
            </div>
            <div className="grid grid-cols-2 gap-3 aspect-[4/3] rounded-2xl overflow-hidden bg-white p-2 border border-warm-ink/10">
              <img 
                src="/portfolio/cad-automation/master-bathroom-render-input.webp" 
                alt="Client 3D Render Reference"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl opacity-90"
              />
              <img 
                src="/portfolio/cad-automation/master-bathroom-plan-input.webp" 
                alt="Client Dimension Sketch Input"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl opacity-90"
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
            <span className="text-[9px] uppercase tracking-wider font-bold text-warm-accent">CAD Scripting & Automation</span>
          </div>

          {/* Right Side: Editable CAD Output */}
          <div className="lg:col-span-5 space-y-4 p-6 rounded-[2rem] bg-white border border-warm-accent/20 shadow-md">
            <div className="flex justify-between items-center">
              <span className="text-[10px] uppercase tracking-widest font-bold text-warm-accent">Editable CAD Output</span>
              <span className="text-[9px] font-mono bg-warm-accent/10 text-warm-accent px-2 py-0.5 rounded font-bold">DWG / DXF / PDF</span>
            </div>
            <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-warm-ink/5 p-1 border border-warm-ink/10 relative">
              <img 
                src="/portfolio/cad-automation/master-bathroom-plan.webp" 
                alt="Clean Vector CAD Plan Output"
                loading="lazy"
                className="w-full h-full object-cover rounded-xl"
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
              title: "Automated CAD Production",
              desc: "CAD scripts and AI-assisted workflows create plans, elevations, ceiling layouts, flooring patterns, dimensions, layers and presentation sheets.",
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
              <h3 className="serif text-3xl md:text-4xl">Automation With Verification</h3>
              <p className="text-sm text-warm-ink/75 leading-relaxed">
                Automation is only useful when the result remains measurable, editable and reviewable. Each package can be checked for confirmed dimensions, room geometry, door and fixture relationships, layer organisation, file editability, annotation clarity and presentation quality. Any dimensions estimated from visual references remain clearly editable for final professional adjustment.
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
              {["DWG", "DXF", "PDF", "PNG PREVIEW", "SOURCE SCRIPT (WHEN INCLUDED)"].map((fmt) => (
                <span key={fmt} className="text-xs font-mono font-bold bg-warm-ink text-white px-3 py-1 rounded-lg">
                  {fmt}
                </span>
              ))}
            </div>
            <p className="text-xs text-warm-ink/70 pt-1">
              Flexible deliverables for review, editing, presentation and continued development by the client’s design team.
            </p>
          </div>
        </div>
      </div>

      {/* 6. CALL TO ACTION */}
      <div className="p-12 md:p-16 rounded-[3rem] bg-white border border-warm-ink/10 shadow-lg text-center max-w-3xl mx-auto space-y-8">
        <div className="space-y-3">
          <h3 className="serif text-4xl md:text-5xl">Have a plan, reference or design that needs drafting?</h3>
          <p className="text-sm text-warm-ink/70 leading-relaxed max-w-xl mx-auto">
            Send the available layout, measurements and design references. I will review the material, identify what is confirmed or missing, and propose the appropriate editable CAD package.
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
            <span>Start a CAD Project</span>
          </a>

          {/* Secondary Button */}
          <a 
            href="#cad-automation" 
            onClick={() => setActivePreview({ src: "/portfolio/cad-automation/master-bathroom-plan.webp", title: "Master Bathroom Plan Sample" })}
            className="border border-warm-ink/20 text-warm-ink px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-warm-ink/5 transition-colors"
          >
            View Drawing Samples
          </a>
        </div>
      </div>

      {/* DISCREET TRUST AND DISCLAIMER NOTE */}
      <div className="max-w-3xl mx-auto text-center px-4 pt-4">
        <p className="text-[11px] text-warm-ink/50 leading-relaxed font-mono">
          CAD packages are developed from the measurements and references supplied for each project. Provisional details remain editable and should be reviewed by the project’s qualified designer, draftsman or technical consultant before construction.
        </p>
      </div>

      {/* FULLSCREEN CAD PREVIEW LIGHTBOX */}
      <AnimatePresence>
        {activePreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePreview(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <button 
              onClick={() => setActivePreview(null)}
              className="absolute top-6 right-6 text-white/70 hover:text-white transition-colors z-10"
              aria-label="Close preview"
            >
              <X size={28} />
            </button>

            <div 
              onClick={(e) => e.stopPropagation()}
              className="relative max-h-[90vh] max-w-[95vw] md:max-w-5xl bg-white p-3 rounded-[2.5rem] shadow-2xl space-y-3 cursor-default"
            >
              <div className="aspect-[4/3] rounded-[2rem] overflow-hidden bg-neutral-100 flex items-center justify-center max-h-[80vh]">
                <img 
                  src={activePreview.src} 
                  alt={activePreview.title}
                  className="max-h-[80vh] w-auto max-w-full object-contain"
                />
              </div>
              <div className="px-4 py-2 flex justify-between items-center">
                <span className="serif text-xl font-semibold text-warm-ink">{activePreview.title}</span>
                <span className="text-[9px] font-mono uppercase tracking-widest text-warm-accent font-bold">AutoCAD Vector Drawing</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
