# Dr. Muhammad Saadat Shakoor Khan — Research Website

A self-contained static website. No build step, no dependencies — just open or upload the folder.

## Quick start

- **View it:** double-click `index.html` (opens in any browser).
- **Publish it:** upload this whole `website/` folder to any static host — GitHub Pages, Netlify, Cloudflare Pages, or university web space. `index.html` is the entry point.

## Folder structure

```
website/
├── index.html          ← all page content (text, sections, cards)
├── css/
│   └── styles.css       ← all styling (colours, fonts, layout)
├── js/
│   └── main.js          ← all interactivity (nav, animations, gallery filter, lightbox)
├── assets/
│   └── img/             ← every image: figures, photos, logos, posters, profile
├── papers/              ← downloadable PDF of each publication
└── guides/              ← citable technical user guides (CRT, MMonCa)
```

Everything is plain HTML/CSS/JS, so any part can be edited in a text editor.

## How to update common things

**Edit text (titles, bios, captions):** open `index.html` and edit the words directly. Each section is marked with a comment, e.g. `<!-- ============ EDUCATION & SCHOLARSHIPS ============ -->`.

**Restyle (colours, spacing, fonts):** edit `css/styles.css`. The colour palette is at the very top under `:root` (e.g. `--accent` is the teal, `--ink` the dark navy).

**Add a new publication with a downloadable PDF:**
1. Put the PDF in `papers/` (use a clear name like `khan-2026-title.pdf`).
2. In `index.html`, find the Publications section and copy an existing `<div class="pub …">` block.
3. Update its title, venue, authors, the DOI link, and set the download button’s `href` to `papers/your-file.pdf`.

**Add a figure to the gallery:**
1. Put the image in `assets/img/` (e.g. `assets/img/my_new_figure.jpg`).
2. In `index.html`, find `<div class="gal-grid" id="galGrid">` and copy an existing `<figure class="figcard …">` block.
3. Point its `<img src="assets/img/my_new_figure.jpg">`, update the caption, and (optionally) set `data-cat` so it responds to the filter chips.

**Swap a crest for an official university/agency logo:**
1. Put the logo in `assets/img/` (e.g. `assets/img/logo_punjab.png`).
2. In `index.html` (Education section), replace that card’s `<svg class="edu-crest">…</svg>` with `<img class="edu-logo" src="assets/img/logo_punjab.png" alt="University of the Punjab logo">`. (The USTC logo is already done this way as a reference.)

**Add a whole new section:** copy any `<section>…</section>` block in `index.html`, give it a new `id`, and add a matching link in the top navigation (`<nav class="nav-links">`).

## Notes

- The site is fully responsive and works offline.
- Publication PDFs are the author’s own works, provided for direct download alongside the official DOI links.
- The Technical Guides section (CRT, MMonCa) shows a ready-made citation whose URL fills in automatically to wherever the site is hosted, so the guides can be cited in a submitted manuscript. For a permanent identifier, archive each guide on Zenodo to mint a DOI and paste it into the citation.
- Booking/newsletter buttons open the visitor’s email client; connect a Calendly/Google Calendar link in the Mentorship section when ready.
- This website was assembled with the assistance of an AI system; all research claims, data, and credentials are the author’s own.
