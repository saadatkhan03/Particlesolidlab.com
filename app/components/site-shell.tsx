"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";

const academicLinks = [
  { href: "/research", label: "Research" },
  { href: "/publications", label: "Publications" },
  { href: "/software", label: "Software" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <i />
      <b />
    </span>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Particle Solid Lab home">
          <Mark />
          <span>
            Particle Solid Lab
            <small>M. S. S. Khan · ISSP–CAS</small>
          </span>
        </Link>

        <button
          ref={toggleRef}
          className="menu-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <i />
          <i />
        </button>

        <div
          ref={menuRef}
          className={`site-menu ${open ? "is-open" : ""}`}
          id="site-menu"
        >
          <nav aria-label="Primary navigation">
            {academicLinks.map((item) => {
              const active =
                pathname === item.href ||
                (item.href === "/research" &&
                  [
                    "/fenial",
                    "/geometry",
                    "/uncertainty",
                    "/electron-transport",
                    "/im3d",
                  ].includes(pathname));
              return (
                <Link
                  key={item.href}
                  className={active ? "is-active" : ""}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <span className="menu-separator" aria-hidden="true" />
          <Link
            className={`mentoring-link ${pathname === "/mentoring" ? "is-active" : ""}`}
            href="/mentoring"
            aria-current={pathname === "/mentoring" ? "page" : undefined}
            onClick={() => setOpen(false)}
          >
            Mentoring
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-identity">
          <Link className="brand brand-footer" href="/">
            <Mark />
            <span>Particle Solid Lab</span>
          </Link>
          <p>
            Computational models for particle transport, radiation damage, and
            trustworthy simulation.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <div className="footer-links">
            {academicLinks.map((item) => (
              <Link key={item.href} href={item.href}>
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h2>Academic profiles</h2>
          <div className="footer-links">
            <a
              href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
              target="_blank"
              rel="noreferrer"
            >
              Google Scholar ↗
            </a>
            <a
              href="https://orcid.org/0000-0001-7723-2887"
              target="_blank"
              rel="noreferrer"
            >
              ORCID ↗
            </a>
            <a
              href="https://www.researchgate.net/profile/Saadat-Khan-2"
              target="_blank"
              rel="noreferrer"
            >
              ResearchGate ↗
            </a>
          </div>
        </div>
        <div className="footer-contact">
          <h2>Research contact</h2>
          <a href="mailto:mkhan@theory.issp.ac.cn">
            mkhan@theory.issp.ac.cn
          </a>
          <span>Hefei, Anhui, China</span>
          <Link className="footer-mentoring" href="/mentoring">
            Student advising →
          </Link>
        </div>
      </div>
      <div className="shell footer-base">
        <span>© 2026 Dr. Muhammad Saadat Shakoor Khan</span>
        <span>Research claims and credentials supplied by the author.</span>
      </div>
    </footer>
  );
}

export function Breadcrumbs({
  items,
}: {
  items: Array<{ label: string; href?: string }>;
}) {
  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol>
        <li>
          <Link href="/">Home</Link>
        </li>
        {items.map((item) => (
          <li key={`${item.label}-${item.href ?? "current"}`}>
            {item.href ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function PageHero({
  eyebrow,
  title,
  summary,
  children,
  compact = false,
}: {
  eyebrow: string;
  title: string;
  summary: string;
  children?: ReactNode;
  compact?: boolean;
}) {
  return (
    <section className={`page-hero ${compact ? "page-hero-compact" : ""}`}>
      <div className="shell">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="page-summary">{summary}</p>
        {children}
      </div>
    </section>
  );
}

export function SectionIntro({
  eyebrow,
  title,
  text,
}: {
  eyebrow?: string;
  title: string;
  text?: string;
}) {
  return (
    <div className="section-intro">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}
