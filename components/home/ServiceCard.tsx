"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/lib/services";
import { VISUALS } from "@/lib/visuals";
import { getServicePricing } from "@/lib/pricing";
import { getServiceWhatsAppHref } from "@/lib/site";
import styles from "./ServicesCarousel.module.css";

const ARTWORK = VISUALS.find((visual) => visual.group === "artwork") ?? VISUALS[1];
const CARD_WORDS: Record<string, string> = {
  "visualisation-image-production": "VISUALISE",
  "ai-video-production": "FILM",
  "website-design-development": "WEB",
  "cad-technical-production": "DRAFT",
  "b2b-lead-generation": "RESEARCH",
  "automation-workflow-systems": "CONNECT",
};

function ResearchArtwork() {
  return <div className={styles.researchArt} aria-hidden="true">
    <div className={styles.workbookHeading}><span>PROSPECT RESEARCH</span><span>↗</span></div>
    <div className={styles.workbookGrid}>
      <span>ACCOUNT</span><span>MARKET</span><span>RESEARCH</span>
      {["Design studio", "Hospitality group", "Furniture brand", "Interior practice", "Retail group"].map((label, index) =>
        <div className={styles.workbookRow} key={label}><span>{label}</span><span>{["UK", "UAE", "India", "Saudi Arabia", "Qatar"][index]}</span><span><i /> Sample</span></div>
      )}
    </div>
    <p className={styles.sampleLabel}>Illustrative workbook</p>
  </div>;
}

function WorkflowArtwork() {
  return <svg className={styles.workflowArt} viewBox="0 0 480 420" fill="none" aria-hidden="true">
    <path d="M-30 80H108V156H254V76H508M254 156V250H382V338H500M108 156V315H30" stroke="currentColor" strokeOpacity=".3" />
    <path d="M108 80V156H254V250H382" stroke="currentColor" strokeWidth="2" strokeDasharray="4 7" />
    {[
      { x: 60, y: 48, label: "CAPTURE", icon: "+" },
      { x: 204, y: 124, label: "QUALIFY", icon: "◇" },
      { x: 334, y: 218, label: "ROUTE", icon: "↗" },
    ].map((node) => <g key={node.label}>
      <rect x={node.x} y={node.y} width="96" height="68" rx="6" fill="#142725" stroke="currentColor" strokeOpacity=".6" />
      <text x={node.x + 48} y={node.y + 31} textAnchor="middle" fill="currentColor" fontSize="25">{node.icon}</text>
      <text x={node.x + 48} y={node.y + 54} textAnchor="middle" fill="currentColor" fontSize="9" letterSpacing="1">{node.label}</text>
    </g>)}
    <circle cx="254" cy="76" r="5" fill="currentColor" /><circle cx="108" cy="315" r="5" fill="currentColor" />
  </svg>;
}

export function ServiceCard({ service, onInteract }: { service: Service; onInteract: () => void }) {
  const [alternate, setAlternate] = useState(false);
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const prices = getServicePricing(service.slug);
  const price = prices[0];
  const isRender = service.slug === "visualisation-image-production";
  const isFilm = service.slug === "ai-video-production";
  const isWeb = service.slug === "website-design-development";
  const isCad = service.slug === "cad-technical-production";
  const render = alternate ? ARTWORK : VISUALS[0];
  const imageSizes = "(min-width: 1280px) 355px, (min-width: 768px) 30vw, 90vw";

  const playFilm = () => {
    setPlaying(true);
    // Call play in the original user gesture; native controls remain available if blocked.
    void videoRef.current?.play().catch(() => undefined);
  };
  const closeFilm = () => { videoRef.current?.pause(); setPlaying(false); };

  return <article className={styles.card} data-service={service.slug} onClickCapture={onInteract} onPlayCapture={onInteract}>
    <div className={styles.artwork}>
      {isRender ? <Image src={render.src} alt={render.alt} fill sizes={imageSizes} className={styles.cover} /> : null}
      {isFilm ? <Image src="/media/posters/bingxi-factory-video-poster.webp" alt="Bingxi furniture factory-to-showroom film" fill sizes={imageSizes} className={styles.cover} /> : null}
      {isWeb ? <Image src={alternate ? "/media/web/anvikshiki-mobile.webp" : "/media/web/anvikshiki-desktop.webp"} alt={alternate ? "Anvikshiki Journal mobile website presentation" : "Anvikshiki Journal website"} fill sizes={imageSizes} className={`${styles.cover} ${styles.websiteImage}`} /> : null}
      {isCad ? <Image src="/media/cad/sw-joinery-detail.png" alt="Produced architectural joinery drawing" fill sizes={imageSizes} className={`${styles.cover} ${styles.cadImage}`} /> : null}
      {service.slug === "b2b-lead-generation" ? <ResearchArtwork /> : null}
      {service.slug === "automation-workflow-systems" ? <WorkflowArtwork /> : null}
    </div>
    <div className={styles.shade} aria-hidden="true" />
    <span className={styles.identity} aria-hidden="true">{CARD_WORDS[service.slug]}</span>

    {!playing ? <div className={styles.cardTop}>
      <span className={styles.number}>0{service.order} / {service.motif}</span>
      {isRender || isWeb ? <div className={styles.switcher} aria-label={isRender ? "Render selection" : "Website preview size"}>
        <button type="button" aria-pressed={!alternate} onClick={() => setAlternate(false)}>{isRender ? "Interiors" : "Desktop"}</button>
        <button type="button" aria-pressed={alternate} onClick={() => setAlternate(true)}>{isRender ? "Artwork" : "Mobile"}</button>
      </div> : null}
      {isFilm ? <button type="button" className={styles.playButton} onClick={playFilm} aria-label="Play Bingxi factory-to-showroom film"><span aria-hidden="true">▷</span> Play film</button> : null}
    </div> : null}

    <div className={styles.body} hidden={playing}>
      <h3 className={styles.title}><Link href={`/services/${service.slug}`}>{service.name}</Link></h3>
      <p className={styles.summary}>{service.summary}</p>
      <p className={styles.price}>{price?.label ?? "CAD packages · scoped quote"}</p>
      {prices.slice(1).map(tier => <a key={tier.id} href={tier.href} target="_blank" rel="noopener noreferrer" className={styles.secondaryPrice}>{tier.name} from ${tier.amount}</a>)}
      <a href={price?.href ?? getServiceWhatsAppHref(service.slug)} target="_blank" rel="noopener noreferrer" className={styles.cta}><span>{price?.cta ?? "Get a CAD Quote"}</span><span aria-hidden="true">↗</span></a>
    </div>

    {isFilm ? <>
      <video ref={videoRef} hidden={!playing} controls playsInline preload="none" className={styles.video} poster="/media/posters/bingxi-factory-video-poster.webp" aria-label="Bingxi factory-to-showroom film" onEnded={() => setPlaying(false)}>
        <source src="/media/video/bingxi-factory-video.mp4" type="video/mp4" />
        <a href="/media/video/bingxi-factory-video.mp4">Open the film</a>
      </video>
      {playing ? <button type="button" className={styles.closeFilm} onClick={closeFilm}>Close film ×</button> : null}
    </> : null}
  </article>;
}
