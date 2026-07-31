"use client";

import { useEffect, useRef, useState } from "react";

export function Figure({
  src,
  alt,
  caption,
  source,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  source?: string;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const trigger = triggerRef.current;
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.body.classList.add("modal-open");
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.classList.remove("modal-open");
      window.removeEventListener("keydown", onKey);
      trigger?.focus();
    };
  }, [open]);

  return (
    <>
      <figure className={`research-figure ${className}`}>
        <button
          ref={triggerRef}
          type="button"
          className="figure-trigger"
          onClick={() => setOpen(true)}
          aria-label={`Enlarge figure: ${caption}`}
        >
          {/* The supplied research images are raster figures and should retain
              their native proportions, so a plain img is preferable here. */}
          <img src={src} alt={alt} loading="lazy" />
          <span>Enlarge</span>
        </button>
        <figcaption>
          <strong>{caption}</strong>
          {source ? <small>{source}</small> : null}
        </figcaption>
      </figure>
      {open ? (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={caption}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setOpen(false);
          }}
        >
          <button
            ref={closeRef}
            type="button"
            className="lightbox-close"
            onClick={() => setOpen(false)}
          >
            Close
          </button>
          <figure>
            <img src={src} alt={alt} />
            <figcaption>
              <strong>{caption}</strong>
              {source ? <small>{source}</small> : null}
            </figcaption>
          </figure>
        </div>
      ) : null}
    </>
  );
}
