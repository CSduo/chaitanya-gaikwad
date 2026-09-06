"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, PRIMARY_CTA, SITE, DIRECT_CHANNELS, publishedChannels, WHATSAPP } from "@/lib/site";

const FOCUSABLE =
  'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])';

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  // Close on route change. Adjusting state during render (rather than in an
  // effect) avoids a cascading re-render — the pattern React recommends for
  // deriving state from a changed prop.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
    setExpanded(null);
  }

  // Body scroll lock while the panel is open.
  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Focus management: move focus in, trap it, return it on close.
  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    if (!panel) return;

    const first = panel.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key !== "Tab") return;

      const items = Array.from(panel!.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
        (el) => el.offsetParent !== null,
      );
      if (items.length === 0) return;

      const firstItem = items[0];
      const lastItem = items[items.length - 1];

      if (e.shiftKey && document.activeElement === firstItem) {
        e.preventDefault();
        lastItem.focus();
      } else if (!e.shiftKey && document.activeElement === lastItem) {
        e.preventDefault();
        firstItem.focus();
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  const emailChannels = publishedChannels();

  return (
    <div className="lg:hidden">
      <div className="flex items-center gap-2">
        {/* Compact CTA — hidden on the narrowest screens to avoid crowding.
            The panel always carries the primary CTA. */}
        <a
          href={PRIMARY_CTA.href}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden min-h-[44px] items-center rounded-xs bg-ink px-4 text-xs font-medium tracking-tight text-paper transition-colors hover:bg-accent min-[400px]:inline-flex"
        >
          Start
        </a>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-nav-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          className="inline-flex h-11 w-11 items-center justify-center rounded-xs border border-rule text-ink transition-colors hover:border-ink"
        >
          <span aria-hidden="true" className="relative block h-3.5 w-5">
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 rotate-45" : "top-0"
              }`}
            />
            <span
              className={`absolute left-0 top-1.5 block h-px w-5 bg-current transition-opacity duration-200 ${
                open ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`absolute left-0 block h-px w-5 bg-current transition-transform duration-200 ${
                open ? "top-1.5 -rotate-45" : "top-3"
              }`}
            />
          </span>
        </button>
      </div>

      {open ? (
        <>
          {/* Backdrop — click to dismiss. */}
          <button
            type="button"
            aria-label="Close menu"
            tabIndex={-1}
            onClick={() => {
              setOpen(false);
              triggerRef.current?.focus();
            }}
            className="fixed inset-x-0 top-16 z-40 h-[calc(100dvh-4rem)] cursor-default bg-ink/20"
          />

          {/*
            Height is set explicitly rather than derived from top/bottom insets:
            dvh accounts for mobile browser chrome, and an explicit height keeps
            the scroll container from collapsing.
          */}
          <div
            id="mobile-nav-panel"
            ref={panelRef}
            className="fixed inset-x-0 top-16 z-50 h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-rule bg-paper"
          >
            <nav aria-label="Primary" className="px-6 py-6">
              <ul className="border-t border-rule">
                {PRIMARY_NAV.map((item) => {
                  const hasChildren = Boolean(item.children?.length);
                  const isOpen = expanded === item.label;

                  return (
                    <li key={item.label} className="border-b border-rule">
                      <div className="flex items-stretch justify-between">
                        <Link
                          href={item.href}
                          aria-current={isActive(item.href) ? "page" : undefined}
                          className={`flex min-h-[56px] flex-1 items-center text-lg tracking-tight transition-colors hover:text-accent ${
                            isActive(item.href) ? "text-accent" : "text-ink"
                          }`}
                        >
                          {item.label}
                        </Link>

                        {hasChildren ? (
                          <button
                            type="button"
                            onClick={() => setExpanded(isOpen ? null : item.label)}
                            aria-expanded={isOpen}
                            aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label} menu`}
                            className="flex h-14 w-14 shrink-0 items-center justify-center text-ink-muted transition-colors hover:text-accent"
                          >
                            <span
                              aria-hidden="true"
                              className={`block h-2 w-2 rotate-45 border-b border-r border-current transition-transform duration-200 ${
                                isOpen ? "-translate-y-0.5 rotate-[-135deg]" : "-translate-y-1"
                              }`}
                            />
                          </button>
                        ) : null}
                      </div>

                      {hasChildren && isOpen ? (
                        <ul className="pb-4 pl-4">
                          {item.children!.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                aria-current={pathname === child.href ? "page" : undefined}
                                className={`flex min-h-[44px] items-center border-l border-rule pl-4 text-sm transition-colors hover:text-accent ${
                                  pathname === child.href ? "text-accent" : "text-ink-soft"
                                }`}
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </li>
                  );
                })}
              </ul>

              <div className="mt-8 grid grid-cols-2 gap-2">
                <a
                  href={WHATSAPP.uk.tel}
                  className="flex min-h-[50px] w-full items-center justify-center gap-1.5 rounded-xs border border-rule-strong bg-surface px-3 text-xs font-semibold tracking-tight text-ink transition-colors active:bg-paper-deep"
                  aria-label={`Call XIYÀTO UK at ${WHATSAPP.uk.number}`}
                >
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink-muted">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                  <span>Call UK</span>
                </a>
                <a
                  href={PRIMARY_CTA.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex min-h-[50px] w-full items-center justify-center gap-1.5 rounded-xs bg-ink px-3 text-xs font-semibold tracking-tight text-paper transition-colors hover:bg-accent"
                >
                  <span>WhatsApp</span>
                  <span aria-hidden="true" className="text-xs">&#8599;</span>
                </a>
              </div>

              <Link
                href="/contact"
                className="mt-3 flex min-h-[48px] w-full items-center justify-center rounded-xs border border-rule-strong px-6 text-sm tracking-tight text-ink transition-colors hover:border-ink"
              >
                Detailed enquiry
              </Link>

              <div className="mt-10 space-y-4 border-t border-rule pt-6">
                {emailChannels.map((c) => (
                  <div key={c.id} className="flex flex-col gap-1">
                    <span className="label">{c.label}</span>
                    <a
                      href={`mailto:${c.email}`}
                      className="text-sm text-ink underline decoration-rule-strong underline-offset-4 hover:text-accent"
                    >
                      {c.email}
                    </a>
                  </div>
                ))}

                <div className="flex flex-col gap-1">
                  <span className="label">Direct</span>
                  {DIRECT_CHANNELS.map((c) => (
                    <a
                      key={c.id}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-[44px] items-center text-sm text-ink-soft hover:text-accent"
                    >
                      {c.label} — {c.value}
                    </a>
                  ))}
                </div>

                <p className="meta pt-2">
                  {SITE.name} — United Kingdom &amp; India
                </p>
              </div>
            </nav>
          </div>
        </>
      ) : null}
    </div>
  );
}
