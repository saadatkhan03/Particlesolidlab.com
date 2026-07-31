import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page-hero">
      <div className="shell">
        <p className="eyebrow">404 · Page not found</p>
        <h1>This route is outside the simulation domain</h1>
        <p className="page-summary">
          The page may have moved during the site rebuild. Return to the
          research programme or use the homepage to choose another path.
        </p>
        <div className="button-row">
          <Link className="button button-primary" href="/research">
            Explore research
          </Link>
          <Link className="button button-secondary" href="/">
            Return home
          </Link>
        </div>
      </div>
    </section>
  );
}
