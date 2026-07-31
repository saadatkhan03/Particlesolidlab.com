import Link from "next/link";
import {
  CollisionCascadeAnimation,
  ElectronTransportExplorer,
  GeometryPipelineAnimation,
  IM3DWorkflowAnimation,
  UncertaintyEnsembleAnimation,
} from "./scientific-animations";
import { Figure } from "./lightbox";
import { PublicationRow } from "./publication-row";
import {
  Breadcrumbs,
  PageHero,
  SectionIntro,
} from "./site-shell";
import {
  grants,
  projects,
  publications,
  type ProjectSlug,
} from "../data/site-data";

const projectOrder: ProjectSlug[] = [
  "electron-transport",
  "geometry",
  "uncertainty",
  "fenial",
  "im3d",
];

const methodLabels: Record<ProjectSlug, string[]> = {
  fenial: ["Construct", "Couple", "Validate"],
  geometry: ["Observe", "Measure", "Construct", "Track"],
  uncertainty: ["Enumerate", "Simulate", "Extend", "Quantify"],
  "electron-transport": [
    "Transport",
    "Elastic model",
    "Inelastic model",
    "Quantify",
    "Benchmark",
  ],
  im3d: ["Prepare", "Transport", "Translate"],
};

function ProjectAnimation({ slug }: { slug: ProjectSlug }) {
  if (slug === "fenial") return <CollisionCascadeAnimation focus="damage" />;
  if (slug === "geometry") return <GeometryPipelineAnimation />;
  if (slug === "uncertainty") return <UncertaintyEnsembleAnimation />;
  if (slug === "electron-transport") return <ElectronTransportExplorer />;
  return <IM3DWorkflowAnimation />;
}

export function ProjectPage({ slug }: { slug: ProjectSlug }) {
  const project = projects[slug];
  const projectPublications = project.publicationIds
    .map((id) => publications.find((publication) => publication.id === id))
    .filter((publication) => publication !== undefined);
  const projectGrants = project.fundingGrantIds
    .map((id) => grants.find((grant) => grant.id === id))
    .filter((grant) => grant !== undefined);
  const index = projectOrder.indexOf(slug);
  const previous =
    index > 0 ? projects[projectOrder[index - 1]] : projects[projectOrder.at(-1)!];
  const next =
    index < projectOrder.length - 1
      ? projects[projectOrder[index + 1]]
      : projects[projectOrder[0]];

  const schema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: project.title,
    description: project.summary,
    author: {
      "@type": "Person",
      name: "Dr. Muhammad Saadat Shakoor Khan",
      url: "https://www.particlesolidlab.com",
    },
    mainEntityOfPage: `https://www.particlesolidlab.com/${slug}`,
    image: project.figures.slice(0, 3).map((figure) =>
      `https://www.particlesolidlab.com${figure.src}`,
    ),
    about: project.eyebrow,
  };

  return (
    <>
      <div className="shell">
        <Breadcrumbs
          items={[
            { label: "Research", href: "/research" },
            { label: project.shortTitle },
          ]}
        />
      </div>
      <PageHero
        compact
        eyebrow={project.eyebrow}
        title={project.title}
        summary={project.summary}
      >
        <div className="tag-list" aria-label="Research methods">
          {methodLabels[slug].map((label) => (
            <span className="tag" key={label}>
              {label}
            </span>
          ))}
        </div>
      </PageHero>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Goal"
            title="Why this problem matters"
            text="The research is organised by scientific question rather than career stage, so the methods and results form one continuous programme."
          />
          <div className="goal-grid">
            {project.goal.map((goal, goalIndex) => (
              <article className="goal-statement" key={goal}>
                <span>{String(goalIndex + 1).padStart(2, "0")}</span>
                <p>{goal}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Method"
            title="How the problem is approached"
          />
          <ol className="method-flow">
            {project.method.map((method, methodIndex) => (
              <li className="method-step" key={method}>
                <span>{String(methodIndex + 1).padStart(2, "0")}</span>
                <h3>{methodLabels[slug][methodIndex]}</h3>
                <p>{method}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Results"
            title="What the programme has established"
          />
          <ol className="result-list">
            {project.results.map((result, resultIndex) => (
              <li key={result}>
                <strong>Result {String(resultIndex + 1).padStart(2, "0")}</strong>
                <span>{result}</span>
              </li>
            ))}
          </ol>
          {project.relatedWork ? (
            <aside className="work-status">
              <span>{project.relatedWork.status}</span>
              <div>
                <h3>{project.relatedWork.title}</h3>
                {project.relatedWork.authors ? (
                  <p>{project.relatedWork.authors.join(", ")}</p>
                ) : null}
              </div>
            </aside>
          ) : null}
        </div>
      </section>

      <section className="content-section tint animation-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Scientific animation"
            title="The mechanism, made visible"
            text="This interactive figure is an explanatory schematic. It is clearly separated from the peer-reviewed quantitative figures below."
          />
          <ProjectAnimation slug={slug} />
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Evidence"
            title="Figures from the research"
            text="Each figure is placed beside the scientific programme it supports rather than repeated in a separate gallery."
          />
          <div className="figure-grid">
            {project.figures.map((figure) => (
              <Figure
                key={figure.src}
                src={figure.src}
                alt={figure.alt}
                caption={figure.caption}
                source={figure.eyebrow}
              />
            ))}
          </div>
        </div>
      </section>

      {projectPublications.length > 0 || project.relatedWork ? (
        <section className="content-section tint">
          <div className="shell">
            <SectionIntro
              eyebrow="Publications"
              title="Related scholarly work"
            />
            {projectPublications.length > 0 ? (
              <div className="publication-list">
                {projectPublications.map((publication, publicationIndex) => (
                  <PublicationRow
                    key={publication.id}
                    index={publicationIndex}
                    publication={{
                      ...publication,
                      authors: publication.authors.join(", "),
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="content-notice">
                <strong>Manuscript status</strong>
                <p>
                  The related manuscript is identified above as{" "}
                  {project.relatedWork?.status}. No publisher or preprint link is
                  available in the supplied source material.
                </p>
              </div>
            )}
            <Link className="text-link standalone-link" href="/publications">
              View all publications →
            </Link>
          </div>
        </section>
      ) : null}

      {projectGrants.length > 0 ? (
        <section className="content-section">
          <div className="shell">
            <SectionIntro eyebrow="Funding" title="Supported research" />
            <div className="grid-2">
              {projectGrants.map((grant) => (
                <article className="funding-card" key={grant.id}>
                  <span>{grant.role}</span>
                  <h3>{grant.title}</h3>
                  <p>{grant.agency}</p>
                  <dl>
                    <div>
                      <dt>Grant</dt>
                      <dd>{grant.grantNumber}</dd>
                    </div>
                    <div>
                      <dt>Funding</dt>
                      <dd>¥{grant.amountCny.toLocaleString()}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="content-section narrow">
        <div className="shell previous-next">
          <Link href={`/${previous.slug}`}>
            <small>← Previous theme</small>
            <strong>{previous.shortTitle}</strong>
          </Link>
          <Link href={`/${next.slug}`}>
            <small>Next theme →</small>
            <strong>{next.shortTitle}</strong>
          </Link>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
