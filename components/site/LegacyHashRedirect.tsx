"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

/**
 * Compatibility shim for inbound links that still carry the old hash routes.
 *
 * Server-side redirects cannot see a URL fragment, so these have to be caught
 * in the browser. This replaces the fragment with the real path — it does not
 * reintroduce hash routing, and it runs once on mount.
 */
const EXACT: Record<string, string> = {
  "#/cad-automation": "/services/cad-technical-production",
  "#cad-automation": "/services/cad-technical-production",
  "#/projects/videos": "/work?category=visual-content",
  "#/projects/visualisations": "/work?category=visual-content",
  "#/projects/b2b-research": "/work?category=growth-operations",
  "#/projects/websites": "/work?category=multi-disciplinary",
  "#/projects": "/work",
  "#/startup": "/work",
  "#startup": "/work",
  "#projects": "/work",
  "#services": "/services",
  "#about": "/company",
  "#contact": "/contact",
  "#home": "/",
  "#/": "/",
};

export function LegacyHashRedirect() {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;

    // Normalise repeated leading hashes ("##/foo" -> "#/foo").
    const normalised = `#${hash.replace(/^#+/, "")}`;

    let destination = EXACT[normalised];

    // Deep workbook links: #/projects/b2b-research/<slug>
    if (!destination && normalised.startsWith("#/projects/b2b-research/")) {
      destination = "/work?category=growth-operations";
    }

    if (!destination) return;

    // Strip the fragment so it cannot re-trigger, then route.
    window.history.replaceState(null, "", window.location.pathname + window.location.search);
    router.replace(destination);
  }, [router]);

  return null;
}
