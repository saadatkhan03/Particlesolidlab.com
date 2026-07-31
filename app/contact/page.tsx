import type { Metadata } from "next";
import Link from "next/link";
import { ContactForm } from "../components/contact-form";
import { PageHero, SectionIntro } from "../components/site-shell";
import {
  collaborationModes,
  contact,
  profiles,
} from "../data/site-data";

export const metadata: Metadata = {
  title: "Contact & Collaboration",
  description:
    "Contact Dr. Muhammad Saadat Shakoor Khan about computational physics, particle transport, radiation materials, scientific software, and research collaboration.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact & Collaboration · Particle Solid Lab",
    description:
      "Discuss a research proposal, modelling project, software collaboration, or student co-supervision.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let’s define the scientific question first"
        summary="I welcome focused conversations about particle transport, radiation damage, simulation geometry, uncertainty, and scientific software. A useful first message explains the problem, the evidence already available, and the outcome you want to build."
      >
        <div className="button-row">
          <a
            className="button button-primary"
            href={`mailto:${contact.institutionalEmail}?subject=${encodeURIComponent(
              "Research collaboration enquiry",
            )}`}
          >
            Email the research address
          </a>
          <Link className="button button-secondary" href="/mentoring">
            Student mentoring enquiries
          </Link>
        </div>
      </PageHero>

      <section className="content-section tint">
        <div className="shell">
          <SectionIntro
            eyebrow="Ways to collaborate"
            title="Where a conversation could lead"
            text="These are starting points, not fixed packages. The scope should follow the scientific need and the contribution each collaborator can make."
          />
          <div className="grid-3">
            {collaborationModes.map((mode) => (
              <article className="card" key={mode.title}>
                <h3>{mode.title}</h3>
                <p>{mode.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section">
        <div className="shell contact-layout">
          <div>
            <SectionIntro
              eyebrow="Start a conversation"
              title="Send enough context to make the first reply useful"
              text="A short, specific proposal is ideal. Include the physical system, modelling or experimental resources, your intended output, and any practical deadline."
            />

            <div className="grid-2">
              <article className="card">
                <h3>Research contact</h3>
                <p>
                  {contact.role} · {contact.affiliation}
                </p>
                <p>
                  {contact.location} ·{" "}
                  <a href={`mailto:${contact.institutionalEmail}`}>
                    {contact.institutionalEmail}
                  </a>
                </p>
              </article>

              <article className="card">
                <h3>Academic profiles</h3>
                <p>
                  Review the publication record and researcher identifiers
                  before proposing a collaboration.
                </p>
                <div className="profile-links">
                  {profiles.map((profile) => (
                    <a
                      href={profile.href}
                      key={profile.label}
                      rel="noreferrer"
                      target="_blank"
                    >
                      {profile.label} ↗
                    </a>
                  ))}
                </div>
              </article>
            </div>
          </div>

          <ContactForm />
        </div>
      </section>

      <section className="content-section narrow tint">
        <div className="shell grid-2">
          <article className="card">
            <h3>Direct channels</h3>
            <p>
              WhatsApp:{" "}
              <a href={contact.whatsappHref} rel="noreferrer" target="_blank">
                {contact.whatsappDisplay} ↗
              </a>
            </p>
            <p>WeChat: {contact.wechat}</p>
            <p>
              For research proposals, email remains the best channel because it
              preserves technical context and attachments.
            </p>
          </article>

          <article className="card">
            <h3>Mentoring and general enquiries</h3>
            <p>
              Use{" "}
              <a href={`mailto:${contact.personalEmail}`}>
                {contact.personalEmail}
              </a>{" "}
              for application mentoring and non-institutional enquiries.
            </p>
            <p>
              Mentoring is presented separately so that research collaboration
              and individual advising have clear expectations.
            </p>
            <Link className="text-link" href="/mentoring">
              Review mentoring scope →
            </Link>
          </article>
        </div>
      </section>
    </>
  );
}
