import type { Metadata } from "next";
import { Container, ButtonLink, Eyebrow, TextLink } from "@/components/ui/primitives";

/*
  Next.js adds <meta name="robots" content="noindex"> to the not-found page by
  itself, so no robots value is set here (it produced a second, duplicate robots
  meta). The root layout declares no canonical, so none is inherited either.
*/
export const metadata: Metadata = {
  title: "Page not found",
  description: "The page you requested could not be found.",
};

export default function NotFound() {
  return (
    <Container width="page" className="py-24 sm:py-32 lg:py-40">
      <div className="max-w-2xl">
        <Eyebrow>Error 404</Eyebrow>
        <h1 className="display mt-5 text-4xl sm:text-5xl">This page could not be found.</h1>
        <p className="mt-6 text-base leading-relaxed text-ink-soft">
          The address may be out of date, or the page may have been removed. The sections
          below cover everything currently published.
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink href="/">Return home</ButtonLink>
          <ButtonLink href="/#capabilities" variant="secondary">
            View portfolio &amp; capabilities
          </ButtonLink>
        </div>

        <ul className="mt-14 border-t border-rule">
          {[
            { href: "/#capabilities", label: "Work & Portfolio", note: "Published work and capabilities across all disciplines" },
            { href: "/services", label: "Services", note: "Technical production, growth operations, visual content" },
            { href: "/company", label: "Company", note: "How XIYÀTO operates" },
            { href: "/contact", label: "Contact", note: "Start a project enquiry" },
          ].map((item) => (
            <li key={item.href} className="border-b border-rule py-5">
              <TextLink href={item.href}>{item.label}</TextLink>
              <p className="mt-1 text-sm text-ink-muted">{item.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
