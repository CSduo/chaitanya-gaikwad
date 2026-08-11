"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PRIMARY_NAV, PRIMARY_CTA, SITE } from "@/lib/site";
import { MobileNav } from "./MobileNav";

function Wordmark() {
  return (
    <Link
      href="/"
      className="display flex min-h-[44px] items-center text-xl tracking-[0.14em] text-ink transition-colors hover:text-accent"
      aria-label={`${SITE.name} — home`}
    >
      {SITE.name}
    </Link>
  );
}

/** Desktop dropdown: hoverable, keyboard operable, Esc-dismissible. */
function NavDropdown({
  label,
  href,
  items,
  isActive,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  isActive: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Close on route change by adjusting state during render rather than in an
  // effect, which avoids a cascading re-render.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        wrapRef.current?.querySelector<HTMLElement>("a")?.focus();
      }
    }
    function onFocusOut(e: FocusEvent) {
      if (!wrapRef.current?.contains(e.relatedTarget as Node)) setOpen(false);
    }
    function onPointerDown(e: PointerEvent) {
      if (!wrapRef.current?.contains(e.target as Node)) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    wrapRef.current?.addEventListener("focusout", onFocusOut);
    const node = wrapRef.current;
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
      node?.removeEventListener("focusout", onFocusOut);
    };
  }, [open]);

  const menuId = `nav-menu-${label.toLowerCase()}`;

  return (
    <div
      ref={wrapRef}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        {/* Parent stays a real, directly clickable link. */}
        <Link
          href={href}
          aria-current={isActive ? "page" : undefined}
          className={`flex min-h-[44px] items-center text-sm tracking-tight transition-colors hover:text-accent ${
            isActive ? "text-accent" : "text-ink"
          }`}
        >
          {label}
        </Link>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={menuId}
          aria-label={`${open ? "Collapse" : "Expand"} ${label} menu`}
          className="flex h-11 w-11 items-center justify-center text-ink-muted transition-colors hover:text-accent"
        >
          <span
            aria-hidden="true"
            className={`block h-1.5 w-1.5 rotate-45 border-b border-r border-current transition-transform duration-150 ${
              open ? "-translate-y-px rotate-[-135deg]" : "-translate-y-0.5"
            }`}
          />
        </button>
      </div>

      {open ? (
        <div
          id={menuId}
          className="absolute left-0 top-full z-50 w-72 border border-rule bg-surface shadow-[0_16px_40px_-24px_rgba(22,19,15,0.35)]"
        >
          <ul className="py-1">
            {items.map((child) => (
              <li key={child.href}>
                <Link
                  href={child.href}
                  aria-current={pathname === child.href ? "page" : undefined}
                  className={`block px-5 py-3 text-sm transition-colors hover:bg-paper-deep hover:text-accent ${
                    pathname === child.href ? "text-accent" : "text-ink-soft"
                  }`}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

export function Header() {
  const pathname = usePathname();

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-rule bg-paper/90 backdrop-blur-sm">
      <div className="mx-auto flex h-16 w-full max-w-(--container-wide) items-center justify-between gap-6 px-6 sm:px-8 lg:px-12">
        <Wordmark />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {PRIMARY_NAV.map((item) =>
              item.children?.length ? (
                <li key={item.label}>
                  <NavDropdown
                    label={item.label}
                    href={item.href}
                    items={item.children}
                    isActive={isActive(item.href)}
                  />
                </li>
              ) : (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={`flex min-h-[44px] items-center text-sm tracking-tight transition-colors hover:text-accent ${
                      isActive(item.href) ? "text-accent" : "text-ink"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <Link
            href={PRIMARY_CTA.href}
            className="inline-flex min-h-[44px] items-center rounded-xs bg-ink px-5 text-sm font-medium tracking-tight text-paper transition-colors hover:bg-accent"
          >
            {PRIMARY_CTA.label}
          </Link>
        </div>

        <MobileNav />
      </div>
    </header>
  );
}
