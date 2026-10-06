"use client";

import { useState } from "react";
import Image from "next/image";
import type { ServiceSlug } from "@/lib/services";
import { VISUALS } from "@/lib/visuals";
import styles from "./ServicePreview.module.css";

type PreviewProps = { slug: ServiceSlug; compact?: boolean; fill?: boolean };

const RENDERS = [
  { ...VISUALS[0], label: "Interiors" },
  { ...(VISUALS.find((visual) => visual.group === "artwork") ?? VISUALS[1]), label: "Artwork" },
];

function PreviewBar({ title, badge }: { title: string; badge: string }) {
  return <div className={styles.bar}><span className={styles.dots} aria-hidden="true"><i /><i /><i /></span><span className={styles.barTitle}>{title}</span><span className={styles.barBadge}>{badge}</span></div>;
}

function RenderPreview({ compact }: { compact: boolean }) {
  const [selected, setSelected] = useState(0);
  const render = RENDERS[selected];
  return <div className={`${styles.preview} ${styles.render} ${compact ? styles.compact : ""}`}>
    <div className={styles.imageWell}>
      <Image src={render.src} alt={render.alt} fill sizes={compact ? "(min-width: 1024px) 380px, 90vw" : "(min-width: 1024px) 800px, 95vw"} className={styles.cover} />
      <div className={styles.imageShade} />
      <div className={styles.imageTop}><span className={styles.glassTag}>Selected visual studies</span><span className={styles.crosshair} aria-hidden="true">+</span></div>
      <div className={styles.imageBottom}><p>Spaces that sell<br /><em>the feeling.</em></p></div>
    </div>
    <div className={styles.imageSwitch} aria-label="Render selection">{RENDERS.map((item, index) => <button key={item.label} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}>{item.label}</button>)}</div>
  </div>;
}

function FilmPreview({ compact }: { compact: boolean }) {
  return <div className={`${styles.preview} ${styles.film} ${compact ? styles.compact : ""}`}>
    <PreviewBar title="Bingxi · factory-to-showroom" badge="Film" />
    <div className={styles.filmWell}>
      <video controls playsInline preload="metadata" className={styles.video} poster="/media/posters/bingxi-factory-video-poster.webp" aria-label="Play Bingxi factory-to-showroom film">
        <source src="/media/video/bingxi-factory-video.mp4" type="video/mp4" />
        Your browser cannot play this film. <a href="/media/video/bingxi-factory-video.mp4">Open the video</a>.
      </video>
    </div>
  </div>;
}

function WebsitePreview({ compact }: { compact: boolean }) {
  const [mobile, setMobile] = useState(false);
  return <div className={`${styles.preview} ${styles.web} ${compact ? styles.compact : ""}`}>
    <PreviewBar title="Anvikshiki Journal" badge="Live project" />
    <div className={styles.siteCapture} tabIndex={0} aria-label="Anvikshiki website screenshot; scroll to explore">
      <Image src={mobile ? "/media/web/anvikshiki-mobile.webp" : "/media/web/anvikshiki-desktop.webp"} alt={mobile ? "Anvikshiki Journal mobile website presentation" : "Anvikshiki Journal homepage and recent submissions"} width={1600} height={mobile ? 1111 : 3428} sizes={compact ? "(min-width: 768px) 380px, 42vw" : "(min-width: 1024px) 700px, 90vw"} className={styles.siteScreenshot} />
    </div>
    <div className={styles.switcher} aria-label="Website preview size"><button type="button" aria-pressed={!mobile} onClick={() => setMobile(false)}>Desktop</button><button type="button" aria-pressed={mobile} onClick={() => setMobile(true)}>Mobile</button></div>
  </div>;
}

function CadPreview({ compact }: { compact: boolean }) {
  const [details, setDetails] = useState(false);
  return <div className={`${styles.preview} ${styles.cad} ${compact ? styles.compact : ""}`}>
    <PreviewBar title="Joinery / production drawing" badge="DWG → PDF" />
    <button type="button" className={`${styles.blueprint} ${details ? styles.blueprintActive : ""}`} aria-pressed={details} aria-label={details ? "Hide CAD drawing detail overlay" : "Inspect CAD drawing detail overlay"} onClick={() => setDetails((value) => !value)}>
      <Image src="/media/cad/sw-joinery-detail.png" alt="Produced joinery detail drawing with elevation, setting-out dimensions and construction sections" fill sizes="(min-width: 1024px) 700px, 90vw" className={styles.blueprintImage} />
      <svg className={styles.blueprintOverlay} viewBox="0 0 640 330" fill="none" aria-hidden="true"><path d="M70 48H565M70 40v16M565 40v16M65 74v198M57 74h16M57 272h16" stroke="currentColor" strokeWidth="1" /><rect x="165" y="94" width="232" height="170" stroke="currentColor" strokeDasharray="5 5" /><circle cx="397" cy="94" r="8" stroke="currentColor" /><path d="M405 86l48-35h80" stroke="currentColor" /></svg>
      <span className={styles.drawingNote}>JOINERY DETAIL / REVIEW LAYER</span>
      <span className={styles.inspectionNote}>{details ? "Detail overlay on −" : "Inspect the detail +"}</span>
    </button>
    <div className={styles.cadFooter}><span><i /> Native geometry</span><span>Layers · Dimensions · Handoff</span></div>
  </div>;
}

const EXAMPLE_SHEETS = [
  { name: "Target accounts", columns: ["Company", "Market", "Fit"], rows: [["Example Studio A", "UK · Interiors", "High"], ["Example Atelier B", "UAE · Fit-out", "High"], ["Example Group C", "KSA · Hospitality", "Review"]] },
  { name: "Buying roles", columns: ["Company", "Role", "Next step"], rows: [["Example Studio A", "Design director", "Research"], ["Example Atelier B", "Procurement", "Research"], ["Example Group C", "Project lead", "Research"]] },
];

function MarketingPreview({ compact }: { compact: boolean }) {
  const [selected, setSelected] = useState(0);
  const sheet = EXAMPLE_SHEETS[selected];
  return <div className={`${styles.preview} ${styles.marketing} ${compact ? styles.compact : ""}`}>
    <PreviewBar title="Opportunity workbook.xlsx" badge="EXCEL" />
    <div className={styles.sheetHeadline}><div><span className={styles.eyebrow}>From research to reach</span><h4>Your next conversation<br />starts with the right data.</h4></div><div className={styles.metric}><strong>03</strong><span>Example accounts</span></div></div>
    <div className={styles.sheetScroll} tabIndex={0} aria-label="Illustrative prospect workbook, scroll horizontally to view columns">
      <table className={styles.sheet}><caption className="sr-only">Illustrative workbook with fictional companies. {sheet.name}.</caption><thead><tr><th scope="col">#</th>{sheet.columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{sheet.rows.map((row, index) => <tr key={row[0]}><th scope="row">{index + 1}</th>{row.map((cell, cellIndex) => <td key={cell}>{cellIndex === 2 ? <span className={styles.cellBadge}>{cell}</span> : cell}</td>)}</tr>)}</tbody></table>
    </div>
    <div className={styles.sheetTabs} aria-label="Workbook sheets">{EXAMPLE_SHEETS.map((item, index) => <button type="button" key={item.name} aria-pressed={selected === index} onClick={() => setSelected(index)}><span aria-hidden="true">▦</span> {item.name}</button>)}</div>
    <p className={styles.exampleNote}>Illustrative sample · fictional companies, not client results.</p>
  </div>;
}

const WORKFLOW_STAGES = [
  { label: "Capture", type: "Trigger", icon: "↙", title: "A new enquiry arrives.", description: "Collect a website form, inbox message or approved data source in one place." },
  { label: "Qualify", type: "Condition", icon: "◇", title: "Give every enquiry a clear next step.", description: "Check the brief against your rules, flag missing information and remove duplicate entries." },
  { label: "Route", type: "Action", icon: "⇄", title: "Put the brief in the right hands.", description: "Create a CRM record and assign the right owner with the context they need." },
  { label: "Follow up", type: "Action", icon: "↗", title: "Keep the next action moving.", description: "Schedule the agreed follow-up or create a reminder for your team to review." },
];

function AutomationPreview({ compact }: { compact: boolean }) {
  const [selected, setSelected] = useState(0);
  const active = WORKFLOW_STAGES[selected];
  return <div className={`${styles.preview} ${styles.automation} ${compact ? styles.compact : ""}`}>
    <PreviewBar title="Enquiry → opportunity" badge="Workflow demo" />
    <div className={styles.workflowCanvas}>
      <div className={styles.workflowHeading}><span className={styles.eyebrow}>Less busywork. More momentum.</span><span className={styles.workflowStatus}><i /> Step 0{selected + 1} / 04</span></div>
      <div className={styles.nodes} aria-label="Explore workflow steps">{WORKFLOW_STAGES.map((stage, index) => <button type="button" key={stage.label} onClick={() => setSelected(index)} aria-pressed={selected === index} className={`${styles.node} ${selected === index ? styles.activeNode : ""} ${index < selected ? styles.completeNode : ""}`}><span className={styles.nodeIcon} aria-hidden="true">{index < selected ? "✓" : stage.icon}</span><strong>{stage.label}</strong><span>{stage.type}</span></button>)}</div>
      <div className={styles.workflowDetail} aria-live="polite"><span className={styles.stepNumber}>0{selected + 1}</span><div><h4>{active.title}</h4><p>{active.description}</p></div></div>
    </div>
    <div className={styles.toolbar}><span>Illustrative flow · select a step</span><button type="button" className={styles.runDemo} onClick={() => setSelected((value) => (value + 1) % WORKFLOW_STAGES.length)}>{selected === WORKFLOW_STAGES.length - 1 ? "Restart demo ↻" : "Next step →"}</button></div>
  </div>;
}

/** Small, interactive portfolio and illustrative previews. Keep outside wrapping links. */
export function ServicePreview({ slug, compact = false, fill = false }: PreviewProps) {
  let content;
  if (slug === "visualisation-image-production") content = <RenderPreview compact={compact} />;
  else if (slug === "ai-video-production" || slug === "video-ai-film-editing") content = <FilmPreview compact={compact} />;
  else if (slug === "website-design-development") content = <WebsitePreview compact={compact} />;
  else if (slug === "cad-technical-production") content = <CadPreview compact={compact} />;
  else if (slug === "automation-workflow-systems") content = <AutomationPreview compact={compact} />;
  else content = <MarketingPreview compact={compact} />;
  return fill ? <div className={styles.fill}>{content}</div> : content;
}
