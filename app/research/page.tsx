import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, SectionIntro } from "../components/site-shell";
import { researchAreas } from "../data/site-data";

export const metadata: Metadata = {
  title: "Research Programme",
  description:
    "One connected research programme spanning scattering physics, particle transport, 3D geometry, uncertainty, and radiation-material design.",
  alternates: { canonical: "/research" },
  openGraph: {
    title: "Research Programme · Particle Solid Lab",
    description:
      "From fundamental scattering physics to radiation-tolerant materials.",
    url: "/research",
  },
};

const pathway = [
  {
    title: "Scattering physics",
    text: "Elastic cross sections and dielectric energy-loss functions.",
    href: "/electron-transport",
  },
  {
    title: "Particle transport",
    text: "Monte Carlo trajectories, emission, and primary-knock-on events.",
    href: "/electron-transport",
  },
  {
    title: "Complex geometry",
    text: "Experimental morphology translated into simulation-ready meshes.",
    href: "/geometry",
  },
  {
    title: "Uncertainty",
    text: "Model-form and statistical confidence evaluated systematically.",
    href: "/uncertainty",
  },
  {
    title: "Materials design",
    text: "Damage and defect evolution connected to microstructure.",
    href: "/fenial",
  },
];

export default function ResearchPage() {
  return (
    <>
      <PageHero
        eyebrow="Research programme"
        title="One scientific programme, from collisions to materials"
        summary="The work is organised by physical dependency rather than by PhD or postdoctoral stage. Fundamental scattering models feed transport simulations; geometry and uncertainty make those simulations credible; radiation-material studies turn them into design insight."
      >
        <div className="button-row">
          <Link className="button button-primary" href="/fenial">
            Start with alloy design →
          </Link>
          <Link className="button button-secondary" href="/publications">
            Browse publications
          </Link>
        </div>
      </PageHero>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Scientific pathway"
            title="How the themes connect"
            text="Each stage supplies assumptions, geometry, or data to the next. This is why the research is presented as one continuous body of work."
          />
          <ol className="research-pathway">
            {pathway.map((item, index) => (
              <li key={item.title}>
                <Link href={item.href}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Research areas"
            title="Four complementary areas"
            text="The same computational methods recur across semiconductor metrology, radiation damage, scientific software, and data-driven analysis."
          />
          <div className="grid-2 research-area-grid">
            {researchAreas.map((area) => (
              <article className="research-area" key={area.id}>
                <span>{area.index}</span>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <ul>
                  {area.tags.slice(0, 4).map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>
                <div>
                  {area.gateways.map((gateway) => (
                    <Link href={gateway.href} key={gateway.href}>
                      {gateway.label} →
                    </Link>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell cta-band">
          <div>
            <h2>Methods that move across scientific domains</h2>
            <p>
              The enabling stack includes Monte Carlo simulation, C++ and
              Fortran physics libraries, Python analysis, MPI campaigns, Gmsh
              geometry, IM3D, CRT, and MMonCa.
            </p>
          </div>
          <Link className="button button-primary" href="/software">
            Explore software →
          </Link>
        </div>
      </section>
    </>
  );
}

