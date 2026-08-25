import type { Metadata } from "next";
import { PublicationRow } from "../components/publication-row";
import { PageHero, SectionIntro } from "../components/site-shell";
import { profiles, publications } from "../data/site-data";

export const metadata: Metadata = {
  title: "Publications",
  description:
    "Twelve peer-reviewed publications on Monte Carlo particle transport, electron emission, uncertainty quantification, nanostructures, and data analysis.",
  alternates: { canonical: "/publications" },
  openGraph: {
    title: "Publications · Particle Solid Lab",
    description:
      "Peer-reviewed work in particle transport, metrology, radiation physics, and scientific data analysis.",
    url: "/publications",
  },
};

const scholarlySchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Publications by Muhammad Saadat Shakoor Khan",
  numberOfItems: publications.length,
  itemListElement: publications.map((publication, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "ScholarlyArticle",
      headline: publication.title,
      datePublished: String(publication.year),
      author: publication.authors.map((name) => ({
        "@type": "Person",
        name,
      })),
      isPartOf: { "@type": "Periodical", name: publication.venue },
      sameAs: publication.doi,
      url: publication.doi,
    },
  })),
};

export default function PublicationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Scholarly record"
        title="Publications"
        summary="Twelve peer-reviewed papers spanning electron and ion transport, scattering physics, semiconductor metrology, uncertainty quantification, nanostructures, and data-driven methods."
      >
        <div className="profile-links">
          {profiles.map((profile) => (
            <a
              href={profile.href}
              target="_blank"
              rel="noreferrer"
              key={profile.href}
            >
              {profile.label} ↗
            </a>
          ))}
        </div>
      </PageHero>

      <section className="content-section narrow">
        <div className="shell">
          <div className="metrics-grid publications-metrics">
            <article className="metric">
              <strong>12</strong>
              <span>Peer-reviewed papers</span>
            </article>
            <article className="metric">
              <strong>133</strong>
              <span>Citations</span>
              <a
                href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Verify ↗
              </a>
            </article>
            <article className="metric">
              <strong>7</strong>
              <span>h-index</span>
              <a
                href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Verify ↗
              </a>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Current work"
            title="Manuscripts in progress"
            text="These items are separated from the peer-reviewed record so their status is unambiguous."
          />
          <div className="grid-2">
            <article className="status-card">
              <span>Under review · 2026</span>
              <h3>
                Morphological Effect of Microstructures on Anti-irradiation
                Tolerance of FeNiAl Superlattice Alloys
              </h3>
              <p>
                M. S. S. Khan, Y. X. Xiong, M. Yousaf, F. Cheng, and Y. G. Li.
              </p>
            </article>
            <article className="status-card">
              <span>In preparation</span>
              <h3>Secondary Electron Emission from Carbon Nanotubes</h3>
              <p>
                Spatial emission maps and wall-count scaling are presented as
                work in progress on the electron-transport page.
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Peer reviewed"
            title="Complete publication list"
            text="Publication titles are shown first; journal, year, DOI, and supplied PDF follow as supporting evidence."
          />
          <div className="publication-list">
            {publications.map((publication, index) => (
              <PublicationRow
                key={publication.id}
                index={index}
                publication={{
                  ...publication,
                  authors: publication.authors.join(", "),
                }}
              />
            ))}
          </div>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(scholarlySchema) }}
      />
    </>
  );
}
