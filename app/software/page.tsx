import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "../components/lightbox";
import { PageHero, SectionIntro } from "../components/site-shell";
import { guides, projects, softwareTools } from "../data/site-data";

export const metadata: Metadata = {
  title: "Scientific Software & Data",
  description:
    "Scientific software, physics libraries, coupled simulation workflows, user guides, and the Fe–Cr radiation-damage database developed or used by Dr. M. S. S. Khan.",
  alternates: { canonical: "/software" },
  openGraph: {
    title: "Scientific Software & Data · Particle Solid Lab",
    description:
      "Monte Carlo simulation, scattering libraries, three-dimensional geometry, coupled defect-evolution workflows, and reproducible user guides.",
    url: "/software",
  },
};

const categoryLabels = {
  simulation: "Simulation",
  "physics library": "Physics library",
  workflow: "Coupled workflow",
  geometry: "Geometry & meshing",
  data: "Research data",
} as const;

const fecrFigures = projects.im3d.figures.filter((figure) =>
  figure.src.includes("/fecr_"),
);

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Scientific Software & Data",
  description:
    "Scientific software, physics libraries, coupled simulation workflows, user guides, and research data used in particle-transport and radiation-material studies.",
  url: "https://www.particlesolidlab.com/software",
  mainEntity: {
    "@type": "ItemList",
    itemListElement: softwareTools.map((tool, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "CreativeWork",
        name: tool.name,
        description: tool.description,
        keywords: tool.technologies.join(", "),
      },
    })),
  },
  hasPart: guides.map((guide) => ({
    "@type": "TechArticle",
    headline: guide.title,
    description: guide.subtitle,
    datePublished: String(guide.year),
    url: `https://www.particlesolidlab.com${guide.pdf}`,
    author: {
      "@type": "Person",
      name: "Dr. Muhammad Saadat Shakoor Khan",
      url: "https://www.particlesolidlab.com",
    },
  })),
};

export default function SoftwarePage() {
  return (
    <>
      <PageHero
        eyebrow="Scientific software · HPC · data"
        title="Tools that carry the physics from one scale to the next"
        summary="The software programme combines Monte Carlo transport, elastic- and inelastic-scattering libraries, three-dimensional geometry, defect-evolution models, and the bridge utilities needed to keep coupled calculations consistent."
      >
        <div className="button-row">
          <a className="button button-primary" href="#tools">
            Explore the toolkit →
          </a>
          <a className="button button-secondary" href="#guides">
            Download user guides
          </a>
        </div>
      </PageHero>

      <section className="content-section" id="tools">
        <div className="shell">
          <SectionIntro
            eyebrow="Computational toolkit"
            title="Simulation engines, libraries, workflows, and data"
            text="These are the tools documented in the supplied research record. Each description distinguishes self-developed components from established codes used within the wider workflow."
          />
          <div className="software-grid">
            {softwareTools.map((tool) => (
              <article className="card software-tool-card" key={tool.id}>
                <p className="software-tool-category">
                  {categoryLabels[tool.category]}
                </p>
                <h3>{tool.name}</h3>
                <p>{tool.description}</p>
                <div className="tag-list" aria-label={`${tool.name} technologies`}>
                  {tool.technologies.map((technology) => (
                    <span className="tag" key={technology}>
                      {technology}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
          <aside className="content-notice software-availability">
            <strong>Availability</strong>
            <p>
              This page documents roles and outputs. No public repository,
              licence, or source-code download was supplied for these tools, so
              none is implied. Use the contact page to discuss research access
              or collaboration.
            </p>
          </aside>
        </div>
      </section>

      <section className="content-section tint" id="guides">
        <div className="shell">
          <SectionIntro
            eyebrow="Reproducible practice"
            title="User guides"
            text="Two downloadable guides record how primary-damage output is prepared, interpreted, and carried into longer-time defect-evolution calculations."
          />
          <div className="grid-2">
            {guides.map((guide) => (
              <article className="card guide-card" key={guide.id}>
                <p className="guide-meta">
                  User guide · {guide.year}
                  {"version" in guide && guide.version
                    ? ` · v${guide.version}`
                    : ""}
                </p>
                <h3>{guide.title}</h3>
                <p>{guide.subtitle}</p>
                <p className="guide-citation">
                  <strong>Citation:</strong> {guide.citation}
                </p>
                <a
                  className="button button-primary"
                  href={guide.pdf}
                  download
                  aria-label={`Download ${guide.title} as a PDF`}
                >
                  Download PDF
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" id="fecr-database">
        <div className="shell">
          <SectionIntro
            eyebrow="Collaborative deliverable · IM3D"
            title="A radiation-damage database for Fe–Cr"
            text="The supplied record describes an IM3D campaign resolving direct ion irradiation and primary-knock-on-atom damage for Fe and Cr across a continuous incident-energy sweep."
          />
          <div className="metrics-grid software-metrics">
            <article className="metric">
              <strong>~1,300</strong>
              <span>Monte Carlo simulations</span>
            </article>
            <article className="metric">
              <strong>1,260</strong>
              <span>Incident energies</span>
            </article>
            <article className="metric">
              <strong>0.1 keV–1 MeV</strong>
              <span>Energy range</span>
            </article>
            <article className="metric">
              <strong>100,000</strong>
              <span>Incident ions per run</span>
            </article>
          </div>
          <div className="figure-grid software-figure-grid">
            {fecrFigures.map((figure) => (
              <Figure
                key={figure.src}
                src={figure.src}
                alt={figure.alt}
                caption={figure.caption}
                source={figure.eyebrow}
              />
            ))}
          </div>
          <div className="cta-band">
            <div>
              <h2>See how IM3D fits into the research programme</h2>
              <p>
                The IM3D project page connects the Fe–Cr dataset to primary
                damage, documentation, and IM3D → CRT → MMonCa workflows.
              </p>
            </div>
            <Link className="button button-primary" href="/im3d">
              Explore IM3D →
            </Link>
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell cta-band">
          <div>
            <h2>Need a new simulation or coupling workflow?</h2>
            <p>
              Collaboration is welcome on particle transport, radiation
              materials, physics libraries, geometry pipelines, and
              reproducible scientific computing.
            </p>
          </div>
          <Link className="button button-primary" href="/contact">
            Discuss a project →
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
      />
    </>
  );
}
