export type PublicationRecord = {
  year: number;
  venue: string;
  title: string;
  authors: string;
  doi?: string;
  pdf?: string;
  featured?: boolean;
  note?: string;
};

export function PublicationRow({
  publication,
  index,
}: {
  publication: PublicationRecord;
  index?: number;
}) {
  return (
    <article className="publication-row">
      {typeof index === "number" ? (
        <span className="publication-index">
          {String(index + 1).padStart(2, "0")}
        </span>
      ) : null}
      <div className="publication-main">
        <div className="publication-meta">
          <span>{publication.venue}</span>
          <span>{publication.year}</span>
          {publication.note ? <span>{publication.note}</span> : null}
        </div>
        <h3>{publication.title}</h3>
        <p>{publication.authors}</p>
      </div>
      <div className="publication-actions">
        {publication.doi ? (
          <a href={publication.doi} target="_blank" rel="noreferrer">
            DOI ↗
          </a>
        ) : null}
        {publication.pdf ? (
          <a href={publication.pdf} target="_blank" rel="noreferrer">
            PDF ↓
          </a>
        ) : null}
      </div>
    </article>
  );
}

