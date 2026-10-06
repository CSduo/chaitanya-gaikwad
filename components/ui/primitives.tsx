import Link from "next/link";
import type { ReactNode } from "react";

/* ------------------------------------------------------------------ */
/* Layout                                                              */
/* ------------------------------------------------------------------ */

type Width = "reading" | "page" | "wide";

const widthClass: Record<Width, string> = {
  reading: "max-w-(--container-reading)",
  page: "max-w-(--container-page)",
  wide: "max-w-(--container-wide)",
};

export function Container({
  children,
  width = "page",
  className = "",
  id,
}: {
  children: ReactNode;
  width?: Width;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={`mx-auto w-full px-6 sm:px-8 lg:px-12 ${widthClass[width]} ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className = "",
  id,
  bordered = false,
  tone = "paper",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  bordered?: boolean;
  tone?: "paper" | "surface" | "deep" | "ink";
}) {
  const toneClass = {
    paper: "",
    surface: "bg-surface",
    deep: "bg-paper-deep",
    ink: "bg-ink text-paper",
  }[tone];

  return (
    <section
      id={id}
      className={`py-12 sm:py-20 lg:py-28 ${toneClass} ${
        bordered ? "border-t border-rule" : ""
      } ${className}`}
    >
      {children}
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Typography                                                          */
/* ------------------------------------------------------------------ */

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={`label ${className}`}>{children}</p>;
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  action,
  align = "left",
  as: Tag = "h2",
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: { label: string; href: string };
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
}) {
  const centered = align === "center";
  return (
    <div
      className={`flex flex-col gap-5 ${
        centered ? "items-center text-center" : ""
      } ${action ? "sm:flex-row sm:items-end sm:justify-between sm:gap-10" : ""}`}
    >
      <div className={`max-w-2xl ${centered ? "mx-auto" : ""}`}>
        {eyebrow ? <Eyebrow className="mb-4">{eyebrow}</Eyebrow> : null}
        <Tag className="display text-3xl sm:text-4xl lg:text-[2.75rem]">{title}</Tag>
        {intro ? (
          <p className="mt-5 text-base leading-relaxed text-ink-soft sm:text-lg">{intro}</p>
        ) : null}
      </div>
      {action ? (
        <div className="shrink-0">
          <TextLink href={action.href}>{action.label}</TextLink>
        </div>
      ) : null}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Actions                                                             */
/* ------------------------------------------------------------------ */

type ButtonVariant = "primary" | "secondary" | "ghost" | "inverse";

const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-xs px-6 py-3 text-sm font-medium tracking-tight transition-colors duration-150 min-h-[44px]";

const buttonVariants: Record<ButtonVariant, string> = {
  primary: "bg-ink text-paper hover:bg-accent",
  secondary: "border border-rule-strong text-ink hover:border-ink hover:bg-surface",
  ghost: "text-ink hover:text-accent underline underline-offset-4 decoration-rule-strong",
  inverse: "bg-paper text-ink hover:bg-accent hover:text-paper",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className = "",
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  external?: boolean;
}) {
  const cls = `${buttonBase} ${buttonVariants[variant]} ${className}`;
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function TextLink({
  href,
  children,
  external = false,
  className = "",
}: {
  href: string;
  children: ReactNode;
  external?: boolean;
  className?: string;
}) {
  const cls = `group inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-accent ${className}`;
  const inner = (
    <>
      <span className="underline decoration-rule-strong underline-offset-4 group-hover:decoration-accent">
        {children}
      </span>
      <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
        &rarr;
      </span>
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {inner}
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Structure                                                           */
/* ------------------------------------------------------------------ */

export function Rule({ className = "" }: { className?: string }) {
  return <hr className={`border-0 border-t border-rule ${className}`} />;
}

/** Numbered steps with large numerals and a leading rule — process and workflow sequences. */
export function ProcessList({
  steps,
  className = "",
}: {
  steps: { step: string; title: string; body: string }[];
  className?: string;
}) {
  return (
    <ol className={`grid gap-4 sm:grid-cols-2 ${className}`}>
      {steps.map((s) => (
        <li key={s.step} className="relative flex flex-col rounded-sm border border-rule bg-paper p-6 shadow-[0_1px_0_rgba(0,0,0,0.03)] lg:p-7">
          <div className="flex items-center gap-4">
            <span className="display text-[2.5rem] leading-none text-accent">{s.step}</span>
            <span aria-hidden="true" className="h-px flex-1 bg-rule-strong" />
          </div>
          <h3 className="mt-5 text-base font-semibold tracking-tight text-ink">{s.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}

/** Capabilities and deliverables as tiles with a check mark, not a plain bullet list. */
export function CapabilityList({
  items,
  columns = 1,
  className = "",
}: {
  items: string[];
  columns?: 1 | 2;
  className?: string;
}) {
  return (
    <ul className={`grid gap-2 ${columns === 2 ? "sm:grid-cols-2 lg:grid-cols-3" : ""} ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className="flex items-start gap-2.5 rounded-sm border border-rule bg-paper px-3.5 py-3 text-[0.8125rem] leading-snug text-ink-soft"
        >
          <span
            aria-hidden="true"
            className="mt-px inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent-wash text-accent"
          >
            <svg viewBox="0 0 16 16" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3.5 8.5l3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <span className="min-w-0">{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Key/value evidence row. Only rendered when real data exists. */
export function EvidenceRow({
  items,
  className = "",
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  if (items.length === 0) return null;
  return (
    <dl className={`grid gap-px border border-rule bg-rule sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {items.map((m) => (
        <div key={m.label} className="bg-paper px-5 py-6">
          <dt className="label">{m.label}</dt>
          <dd className="display mt-2 text-2xl text-ink">{m.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export function Breadcrumbs({
  trail,
}: {
  trail: { name: string; path: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb" className="mb-10">
      <ol className="meta flex flex-wrap items-center gap-x-2 gap-y-1">
        {trail.map((item, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={item.path} className="flex items-center gap-2">
              {isLast ? (
                <span aria-current="page" className="text-ink">
                  {item.name}
                </span>
              ) : (
                <>
                  <Link href={item.path} className="inline-flex min-h-[44px] items-center hover:text-accent hover:underline underline-offset-4 lg:min-h-[24px]">
                    {item.name}
                  </Link>
                  <span aria-hidden="true" className="text-rule-strong">
                    /
                  </span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // Structured data is generated from typed internal data, never user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
