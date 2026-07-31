import type { Metadata } from "next";
import Link from "next/link";
import { CollisionCascadeAnimation } from "./components/scientific-animations";
import { PublicationRow } from "./components/publication-row";
import { SectionIntro } from "./components/site-shell";
import { selectedPublications } from "./data/site-data";

export const metadata: Metadata = {
  title: "Computational Particle Transport & Radiation Damage",
  description:
    "Monte Carlo methods, scientific software, and multiscale simulation for electron-solid interaction, radiation damage, and radiation-tolerant materials.",
  alternates: { canonical: "/" },
};

const gateways = [
  {
    title: "Radiation-tolerant alloys",
    summary:
      "Collision cascades and defect evolution in FeNiAl nanoprecipitate alloys.",
    href: "/fenial",
    eyebrow: "FeNiAl · radiation",
  },
  {
    title: "Simulation uncertainty",
    summary:
      "17,280 model combinations used to quantify confidence in CD-SEM predictions.",
    href: "/uncertainty",
    eyebrow: "Metrology · reliability",
  },
  {
    title: "Full-3D geometry",
    summary:
      "Experimental morphology translated into Gmsh and FETM transport domains.",
    href: "/geometry",
    eyebrow: "Geometry · meshing",
  },
  {
    title: "Electron transport",
    summary:
      "Scattering cross sections, energy-loss functions, backscattering, and emission.",
    href: "/electron-transport",
    eyebrow: "Physics libraries",
  },
];

export default function Home() {
  return (
    <>
      <section className="home-hero">
        <div className="shell hero-layout">
          <div>
            <div className="identity-line">
              <img
                src="/assets/img/profile.jpg"
                alt="Dr. Muhammad Saadat Shakoor Khan"
              />
              <p>
                <strong>Dr. M. S. S. Khan</strong>
                Postdoctoral Researcher · ISSP–CAS · Hefei
              </p>
            </div>
            <p className="eyebrow">
              Monte Carlo transport · radiation materials
            </p>
            <h1>Computational models for particle transport and radiation damage</h1>
            <p className="home-thesis">
              I develop Monte Carlo methods, physics libraries, and multiscale
              workflows for particle–solid interactions in experimentally
              derived 3D geometries, semiconductor metrology, ion irradiation,
              and radiation-tolerant materials.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="/research">
                Explore research →
              </Link>
              <Link className="button button-secondary" href="/contact">
                Discuss collaboration
              </Link>
            </div>
            <p className="home-role">
              C++ · Fortran · Python · MPI · IM3D · MMonCa · Gmsh
            </p>
          </div>
          <CollisionCascadeAnimation />
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Why this matters"
            title="Simulation that connects fundamental events to engineering decisions"
          />
          <div className="impact-list">
            <article className="impact-item">
              <span>01</span>
              <div>
                <h3>Longer-lived materials</h3>
                <p>
                  Radiation-tolerant alloys can extend component life in fusion
                  and fission environments.
                </p>
              </div>
            </article>
            <article className="impact-item">
              <span>02</span>
              <div>
                <h3>Geometry that matches the specimen</h3>
                <p>
                  TEM-derived, material-aware 3D meshes let transport codes
                  follow particles across Si, Cr, Pt, and vacuum instead of
                  replacing real structures with simple blocks.
                </p>
              </div>
            </article>
            <article className="impact-item">
              <span>03</span>
              <div>
                <h3>More accurate chip metrology</h3>
                <p>
                  Electron-transport simulation supports measurement of
                  nanoscale semiconductor features.
                </p>
              </div>
            </article>
            <article className="impact-item">
              <span>04</span>
              <div>
                <h3>Predictions with honest confidence</h3>
                <p>
                  Uncertainty quantification reveals when physical-model choices
                  materially change a simulated result.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Research programme"
            title="Four questions, one connected body of work"
            text="The programme is organised by scientific theme, not by degree or job stage. Each project page combines the full development of the work."
          />
          <div className="gateway-grid">
            {gateways.map((gateway, index) => (
              <Link className="gateway-card" href={gateway.href} key={gateway.href}>
                <span className="gateway-index">
                  {String(index + 1).padStart(2, "0")} · {gateway.eyebrow}
                </span>
                <h3>{gateway.title}</h3>
                <p>{gateway.summary}</p>
                <strong>Explore project →</strong>
              </Link>
            ))}
          </div>
          <Link className="text-link standalone-link" href="/research">
            See how the programme connects →
          </Link>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Selected publications"
            title="Peer-reviewed work"
            text="Five papers spanning electron transport, uncertainty, nanostructures, and simulation physics."
          />
          <div className="publication-list">
            {selectedPublications.map((publication, index) => (
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
          <Link className="text-link standalone-link" href="/publications">
            View all 12 publications →
          </Link>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Credibility"
            title="A concise evidence trail"
          />
          <div className="metrics-grid">
            <article className="metric">
              <strong>12</strong>
              <span>Peer-reviewed papers</span>
              <a
                href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Verify ↗
              </a>
            </article>
            <article className="metric">
              <strong>160</strong>
              <span>Citations</span>
              <a
                href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Scholar ↗
              </a>
            </article>
            <article className="metric">
              <strong>9</strong>
              <span>h-index</span>
              <a
                href="https://scholar.google.com/citations?user=kneeK7cAAAAJ"
                target="_blank"
                rel="noreferrer"
              >
                Scholar ↗
              </a>
            </article>
            <article className="metric">
              <strong>4</strong>
              <span>Funded projects</span>
              <Link href="/about#funding">Details →</Link>
            </article>
            <article className="metric">
              <strong>IM3D</strong>
              <span>Manual contributor</span>
              <Link href="/im3d">Evidence →</Link>
            </article>
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell cta-band">
          <div>
            <h2>Looking for a simulation collaborator?</h2>
            <p>
              I am open to joint work in particle transport, radiation
              materials, scientific software, uncertainty quantification, and
              multiscale modelling.
            </p>
          </div>
          <Link className="button button-primary" href="/contact">
            Discuss a project →
          </Link>
        </div>
      </section>
    </>
  );
}
