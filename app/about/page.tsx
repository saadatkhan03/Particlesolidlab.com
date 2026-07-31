import type { Metadata } from "next";
import Link from "next/link";
import { Figure } from "../components/lightbox";
import { PageHero, SectionIntro } from "../components/site-shell";
import {
  conferences,
  contact,
  education,
  grants,
  photos,
  profiles,
  recognition,
} from "../data/site-data";

export const metadata: Metadata = {
  title: "About Dr. M. S. S. Khan",
  description:
    "Biography, education, research funding, conferences, and recognition of computational physicist Dr. Muhammad Saadat Shakoor Khan.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dr. M. S. S. Khan · Particle Solid Lab",
    description:
      "Computational physicist working on Monte Carlo particle transport, radiation damage, scientific software, and trustworthy simulation.",
    url: "/about",
  },
};

const totalFundingCny = grants.reduce(
  (total, grant) => total + grant.amountCny,
  0,
);
const piGrantCount = grants.filter(
  (grant) => grant.role === "Principal Investigator",
).length;

const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  name: "About Dr. Muhammad Saadat Shakoor Khan",
  url: "https://www.particlesolidlab.com/about",
  mainEntity: {
    "@type": "Person",
    name: contact.name,
    alternateName: contact.shortName,
    jobTitle: contact.role,
    description:
      "Computational physicist specialising in Monte Carlo particle transport, radiation damage, scientific software, and uncertainty quantification.",
    image: `https://www.particlesolidlab.com${contact.profileImage}`,
    affiliation: {
      "@type": "Organization",
      name: contact.affiliation,
    },
    alumniOf: [
      {
        "@type": "CollegeOrUniversity",
        name: "University of Science and Technology of China",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "University of the Punjab",
      },
      {
        "@type": "CollegeOrUniversity",
        name: "Anhui Normal University",
      },
    ],
    knowsAbout: [
      "Monte Carlo simulation",
      "Particle–solid interactions",
      "Electron transport",
      "Ion irradiation",
      "Radiation materials science",
      "Scientific software",
      "Uncertainty quantification",
      "Three-dimensional geometry and meshing",
    ],
    sameAs: profiles.map((profile) => profile.href),
  },
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About"
        title="A computational physicist working from particle collisions to material response"
        summary="Dr. Muhammad Saadat Shakoor Khan develops physics-based Monte Carlo models, scientific software, and multiscale workflows for semiconductor metrology and radiation-material research."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/research">
            Explore the research →
          </Link>
          <Link className="button button-secondary" href="/contact">
            Contact Dr. Khan
          </Link>
        </div>
      </PageHero>

      <section className="content-section">
        <div className="shell about-grid">
          <div className="prose">
            <p>
              Dr. Khan builds Monte Carlo simulations to investigate what
              happens when energetic electrons and ions strike matter. The work
              began with computational physics at the University of the Punjab
              and continued through graduate study in condensed-matter physics
              at the University of Science and Technology of China.
            </p>
            <p>
              One scientific thread connects that trajectory: particle–solid
              interactions modelled from fundamental scattering events upward.
              The programme now spans electron transport for semiconductor
              metrology, three-dimensional simulation geometry, uncertainty
              quantification, collision cascades, and radiation-tolerant
              materials.
            </p>
            <p>
              Much of the output is computational infrastructure: elastic- and
              inelastic-scattering libraries, Monte Carlo workflows,
              cascade-annealing routines, geometry and meshing pipelines, and
              cross-code coupling between IM3D, chemical rate theory, and
              MMonCa. Machine-learning methods support that physics-led
              programme through manifold learning, denoising, and surrogate
              modelling.
            </p>
            <div className="profile-links" aria-label="Academic profiles">
              {profiles.map((profile) => (
                <a
                  key={profile.href}
                  href={profile.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {profile.label} ↗
                </a>
              ))}
            </div>
          </div>
          <Figure
            src={contact.profileImage}
            alt={contact.name}
            caption={`${contact.name} — ${contact.role}`}
            source={`${contact.affiliation} · ${contact.location}`}
          />
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Education"
            title="Training across computational and condensed-matter physics"
            text="The timeline keeps graduate research and the present programme connected rather than splitting the work into degree-stage portfolios."
          />
          <div className="timeline">
            {education.map((entry) => (
              <article
                className="timeline-item education-entry"
                key={`${entry.degree}-${entry.period}`}
              >
                <time>{entry.period}</time>
                <div className="education-entry-body">
                  <img
                    className="education-logo"
                    src={entry.logo}
                    alt={`${entry.institution} logo`}
                    width={58}
                    height={58}
                    loading="lazy"
                  />
                  <div>
                    <h3>{entry.degree}</h3>
                    <p>
                      {entry.institution} · {entry.location}
                    </p>
                    <p>{entry.focus}</p>
                    {"award" in entry && entry.award ? (
                      <div className="tag-list">
                        <span className="tag">{entry.award}</span>
                      </div>
                    ) : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section" id="funding">
        <div className="shell">
          <SectionIntro
            eyebrow="Research funding"
            title="Four funded projects across national and provincial programmes"
            text="The supplied record identifies two awards led as Principal Investigator and two projects joined as Participant or Co-Investigator."
          />
          <div className="metrics-grid about-metrics">
            <article className="metric">
              <strong>{grants.length}</strong>
              <span>Funded projects</span>
            </article>
            <article className="metric">
              <strong>{piGrantCount}</strong>
              <span>As Principal Investigator</span>
            </article>
            <article className="metric">
              <strong>{grants.length - piGrantCount}</strong>
              <span>As participant / Co-I</span>
            </article>
            <article className="metric">
              <strong>¥{(totalFundingCny / 1_000_000).toFixed(2)}M</strong>
              <span>Combined listed funding</span>
            </article>
          </div>
          <div className="grid-2 funding-grid">
            {grants.map((grant) => (
              <article className="card funding-card" key={grant.id}>
                <p className="funding-role">{grant.role}</p>
                <h3>{grant.title}</h3>
                <p>{grant.agency}</p>
                <div className="tag-list" aria-label={`${grant.title} details`}>
                  {"period" in grant && grant.period ? (
                    <span className="tag">{grant.period}</span>
                  ) : null}
                  <span className="tag">Grant {grant.grantNumber}</span>
                  <span className="tag">
                    ¥{grant.amountCny.toLocaleString("en-US")}
                  </span>
                  <span className="tag">
                    ~${grant.amountUsdApprox.toLocaleString("en-US")} USD
                  </span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Recognition"
            title="Awards, posters, and scientific contributions"
            text="Certificates and posters are shown as supplied evidence. The IM3D manual acknowledgment documents a contribution to the software’s user documentation."
          />
          <div className="figure-grid">
            {recognition.map((item) => (
              <Figure
                key={item.id}
                src={item.image}
                alt={item.title}
                caption={`${item.title} — ${item.description}`}
                source={item.meta}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Conferences"
            title="Conference activity across methods and materials"
          />
          <div className="timeline">
            {conferences.map((conference) => (
              <article
                className="timeline-item"
                key={`${conference.year}-${conference.name}`}
              >
                <time>{conference.year}</time>
                <div>
                  <h3>{conference.name}</h3>
                  <p>
                    {conference.format}
                    {"location" in conference && conference.location
                      ? ` · ${conference.location}`
                      : ""}
                  </p>
                  <p>{conference.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Research life"
            title="Conferences, the group, and graduation"
          />
          <div className="grid-3">
            {photos.map((photo) => (
              <Figure
                key={photo.src}
                src={photo.src}
                alt={photo.alt}
                caption={photo.title}
                source={photo.caption}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <aside className="content-notice about-quote">
            <strong>External recognition</strong>
            <p>
              “Recognised for outstanding scientific contributions to
              particle–solid interactions, with rigour, innovation, and clarity
              of communication that make him an asset to any research group.”
            </p>
            <p>
              — Prof. Maurizio Dapor, ECT* / Fondazione Bruno Kessler, on Dr.
              Khan’s research
            </p>
          </aside>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell cta-band">
          <div>
            <h2>Looking for expertise in transport or radiation modelling?</h2>
            <p>
              Dr. Khan is open to joint research, scientific-software
              development, and student co-supervision.
            </p>
          </div>
          <Link className="button button-primary" href="/contact">
            Discuss collaboration →
          </Link>
        </div>
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />
    </>
  );
}
