import type { Metadata } from "next";
import { MentoringOpportunityMap } from "../components/mentoring-map";
import { PageHero, SectionIntro } from "../components/site-shell";
import {
  contact,
  mentoringDestinations,
  mentoringDurations,
  mentoringServices,
} from "../data/site-data";

export const metadata: Metadata = {
  title: "Academic Mentoring",
  description:
    "One-to-one academic application, research-proposal, publication, and interview mentoring for students and researchers.",
  alternates: { canonical: "/mentoring" },
  openGraph: {
    title: "Academic Mentoring · Particle Solid Lab",
    description:
      "Individual guidance for evidence-based academic applications, documents, and interviews.",
    url: "/mentoring",
  },
};

const consultationHref = `mailto:${contact.personalEmail}?subject=${encodeURIComponent(
  "Mentoring consultation request",
)}&body=${encodeURIComponent(
  [
    "Hello Dr. Khan,",
    "",
    "I would like to request a mentoring consultation.",
    "",
    "Current stage:",
    "Target programme or role:",
    "Country / institution:",
    "Application deadline:",
    "Specific support needed:",
    "",
    "I will attach my current CV.",
  ].join("\n"),
)}`;

const process = [
  {
    title: "Share the evidence",
    text: "Send your current CV, target, deadline, and the document or question you want to improve.",
  },
  {
    title: "Define the fit",
    text: "Clarify which programmes, supervisors, or roles match your preparation and constraints.",
  },
  {
    title: "Review together",
    text: "Work through structure, evidence, omissions, and language for the specific application.",
  },
  {
    title: "Leave with actions",
    text: "Finish with a prioritised revision list and a clear next step you can carry forward.",
  },
] as const;

export default function MentoringPage() {
  return (
    <>
      <PageHero
        eyebrow="Academic mentoring"
        title="Build an application around evidence, not slogans"
        summary="One-to-one guidance for students and researchers preparing academic applications, research documents, publications, and interviews. Recommendations are tailored to the record you can support; admissions, funding, publication, and hiring outcomes are never guaranteed."
      >
        <div className="button-row">
          <a className="button button-primary" href={consultationHref}>
            Request a consultation
          </a>
          <a className="button button-secondary" href="#services">
            See the mentoring scope
          </a>
        </div>
      </PageHero>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Opportunity mapping"
            title="The target changes; the evidence must remain honest"
            text="A strong profile is not copied into every application. It is interpreted against the requirements of each programme, supervisor, fellowship, or role."
          />
          <MentoringOpportunityMap />
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell grid-2">
          <article className="card">
            <h2>Individual review, grounded in research experience</h2>
            <p>
              I mentor from experience as an international researcher and as a
              recipient of a China Scholarship Council scholarship and a
              CAS–TWAS Presidential Fellowship. The purpose is to help you
              understand how your evidence may be read, then present it clearly
              and responsibly.
            </p>
            <p>
              The work is collaborative: you remain the author of your
              application and responsible for the accuracy of every claim.
            </p>
          </article>

          <article className="card">
            <h2>What mentoring does not promise</h2>
            <p>
              Mentoring cannot guarantee admission, funding, publication,
              employment, a visa, or an immigration outcome. Decisions remain
              with universities, funders, journals, employers, and public
              authorities.
            </p>
            <p>
              Immigration-related discussion is general academic-career
              guidance, not legal advice. Formal immigration questions should
              be checked with the relevant authority or a qualified adviser.
            </p>
          </article>
        </div>
      </section>

      <section className="content-section" id="services">
        <div className="shell">
          <SectionIntro
            eyebrow="Services"
            title="Support at the points where applications usually weaken"
            text="Choose a focused review or combine several areas into a wider application package."
          />
          <div className="grid-3">
            {mentoringServices.map((service) => (
              <article className="card" key={service.title}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Working method"
            title="A transparent four-step review"
            text="The process begins with your actual record and ends with decisions you can act on."
          />
          <ol className="method-flow method-flow-four">
            {process.map((step, index) => (
              <li className="method-step" key={step.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="content-section">
        <div className="shell">
          <SectionIntro
            eyebrow="Sessions"
            title="Typical review duration"
            text="Duration is a planning guide. The required scope depends on the document, target, and state of the draft."
          />
          <div className="grid-3">
            {mentoringDurations.map((item) => (
              <article className="card" key={item.service}>
                <h3>{item.service}</h3>
                <p>{item.duration}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Destinations"
            title="Guidance across major research destinations"
            text="Country experience helps frame the search, but every requirement must be checked against the current official programme or immigration source."
          />
          <div className="tag-list" aria-label="Mentoring destinations">
            {mentoringDestinations.map((destination) => (
              <span className="tag" key={destination}>
                {destination}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section narrow">
        <div className="shell cta-band">
          <div>
            <h2>Start with your CV, target, and deadline</h2>
            <p>
              Send a short account of your current stage and the decision you
              are trying to make. Attach your latest CV so the first response
              can be specific.
            </p>
          </div>
          <a className="button button-primary" href={consultationHref}>
            Prepare mentoring email
          </a>
        </div>
      </section>
    </>
  );
}
