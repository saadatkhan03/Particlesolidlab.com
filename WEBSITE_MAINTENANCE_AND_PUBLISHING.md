# Particle Solid Lab: change history, maintenance, and publishing guide

This file explains what was changed, why the folder became large, how to edit
the website safely, and how to replace the current site at
`particlesolidlab.com` through GitHub Pages.

## 1. What this project is

This is a source-code project for a static academic website. It is not a single
HTML file and it is not a desktop application. The pages are written with
Next.js and React, and the scientific animations are drawn in the browser with
React, SVG, and CSS.

The same source supports two build targets:

- `npm run build` creates the vinext/Cloudflare-compatible build used for local
  validation and Sites-compatible hosting.
- `npm run build:github` creates a completely static website in `out/` for
  GitHub Pages.

Never edit the generated `dist/` or `out/` files. Edit the source under `app/`
and `public/`, then build again.

## 2. The story of the redesign

The old website was reorganised into one connected research programme instead
of separating work by degree or career stage. The site now has these public
pages:

- Home
- Research
- FeNiAl alloy design
- Full-3D geometry
- Uncertainty quantification
- Electron transport
- IM3D
- Publications
- Software
- About
- Mentoring
- Contact

The major scientific corrections made during the redesign were:

1. The flagship animation was divided into two explicit physical mechanisms.
   Electron–solid scattering produces secondary electrons, backscattered
   electrons, characteristic X-rays, and material-dependent optical photons.
   Ion or neutron irradiation produces a primary knock-on atom, recoil cascade,
   vacancies, and interstitials.
2. Elastic and inelastic scattering labels were placed beside the correct
   events. Electron-signal labels are not mixed with ion-induced displacement
   damage.
3. The hero section was shortened so the introduction and flagship animation
   fit much better on common screens.
4. The importance of experimental geometry was added to the homepage.
5. The FeNiAl page now uses spherical lattice/precipitate concepts and the
   morphology-performance figures that identify the best-performing regimes.
6. The FeNiAl manuscript title was corrected to “Morphological Effect of
   Microstructures on Anti-irradiation Tolerance of FeNiAl Superlattice
   Alloys.”
7. The uncertainty animation now has horizontal and vertical axes and a
   position-dependent uncertainty band rather than a constant-width band.
8. The geometry animation now follows the real workflow: TEM evidence,
   measured parameters, the layered Si–Cr–Pt model, and a tagged triangular
   mesh with material ownership and interface/vacuum logic.
9. The elastic model description now states that Salvat's ELSEPA code was used,
   not authored in this research. The site distinguishes 384 elastic-potential
   combinations, the broader 3 × 4 = 12 inelastic catalogue, and the published
   17,280-profile campaign (384 × 3 × 5 × 3).
10. The displayed metrics were updated to 160 citations and an h-index of 9.
11. The Ningbo, Wuhan, and CD-SEM posters are all represented.
12. The IM3D animation is restricted to the homogeneous bulk Fe–Cr campaign;
    unrelated wave-structure figures are not used there.

## 3. Why the folder was about 1.21 GB

Most of the large folder was not unique website content.

| Folder | Approximate size before cleanup | Meaning |
|---|---:|---|
| `node_modules/` | 759 MB | Downloaded programming packages; fully reinstallable |
| `dist/` | 89 MB | Generated build, including a second copy of the public PDFs and images |
| `public/` | 87 MB | Real website figures, papers, guides, profile images, and posters |
| `.git/` | 77 MB | Orphaned local Git objects; there were no commits or configured remote |
| `app/` | 340 KB | The actual page and animation source |

The deployable source is roughly 87–90 MB, not 1.21 GB. Most of that is the
downloadable research-paper and guide collection. The largest individual file
is about 13 MB, comfortably below GitHub's 100 MB single-file limit.

The cleanup removed only material that was generated, reinstallable, orphaned,
or genuinely unused:

- `node_modules/`
- `dist/`, `out/`, `.next/`, `.vinext/`, `.wrangler/`, and `work/`
- orphaned loose Git objects from an unborn repository
- unused database example/scaffolding and its packages
- `fenial_dpa.jpg` and `xps_np_gallery.jpg`, which were not referenced anywhere
- Finder `.DS_Store` files

All papers and guides used by the site were preserved.

To clean generated files later:

```bash
npm run clean
```

To also remove the large, reinstallable dependency folder:

```bash
npm run clean:full
```

After `clean:full`, restore the dependencies before previewing or building:

```bash
npm install
```

## 4. Files to edit

### Most website content

Edit `app/data/site-data.ts` for:

- research areas
- publications
- grants
- all five detailed research projects
- software and technical guides
- education
- conferences
- awards, posters, and photos
- mentoring and collaboration opportunities
- academic profile links and contact information

The important sections are named clearly: `publications`, `grants`, `projects`,
`tools`, `guides`, `education`, `conferences`, `recognition`, `photos`, and
`contact`.

Project references must remain consistent:

- `publicationIds` must match publication `id` values.
- `fundingGrantIds` must match grant `id` values.
- image and PDF paths must match real files under `public/`.

### Homepage

Edit `app/page.tsx` for:

- the main headline and introduction
- homepage research cards
- “Why this matters”
- citation count, h-index, paper count, and other homepage metrics

### Publications page

Edit `app/publications/page.tsx` for the page introduction, metrics, and current
manuscript cards. Publication records themselves are in
`app/data/site-data.ts`.

When metrics change, update both `app/page.tsx` and
`app/publications/page.tsx` so they remain consistent.

### About, contact, and navigation

- `app/about/page.tsx`: biography paragraphs and page-specific metadata
- `app/contact/page.tsx`: contact-page wording and layout
- `app/components/contact-form.tsx`: email-form behaviour and destination
- `app/components/site-shell.tsx`: visible header navigation, footer, email,
  location, and copyright

### Scientific animations

Edit `app/components/scientific-animations.tsx` carefully:

- `CollisionCascadeAnimation`: homepage and FeNiAl animation
- `ElectronTransportAnimation`: electron-transport views
- `GeometryPipelineAnimation`: TEM-to-mesh stages
- `UncertaintyEnsembleAnimation`: line-scan ensemble and uncertainty band
- `IM3DWorkflowAnimation`: bulk Fe–Cr workflow

This file contains scientific labels, animation timing, SVG paths, legends, and
readouts. After any change, inspect both desktop and mobile views.

The separate mentoring animation is in
`app/components/mentoring-map.tsx`.

### Appearance and spacing

Edit `app/globals.css` for colours, fonts, spacing, cards, responsive layout,
and animation-frame sizes.

### Search engines and sharing

- `app/layout.tsx`: global title, description, canonical domain, social image,
  favicon, and Person schema
- `app/<page>/page.tsx`: page-specific SEO title and description
- `app/sitemap.ts`: public route list and modification date
- `app/robots.ts`: sitemap and production domain
- `app/manifest.ts`: installable-site name, colours, and icon

## 5. Media and document locations

- `public/assets/img/`: research figures, posters, certificates, logos, and
  photographs
- `public/papers/`: downloadable publication PDFs
- `public/guides/`: downloadable technical guides
- `public/favicon.png`: browser icon
- `public/og.png`: social-media preview image

The public URL omits the word `public`. Examples:

```ts
src: "/assets/img/new-result.webp"
pdf: "/papers/khan-2027-new-paper.pdf"
```

Use lowercase filenames with hyphens and no spaces, for example:

- `fenial-vacancy-profile-2027.webp`
- `khan-2027-electron-transport-jap.pdf`

Compress photographs and posters before adding them. Preserve enough
resolution for the enlarged lightbox view.

Before deleting any image or PDF, search for its filename throughout `app/`.
Deleting a referenced file produces a broken image or download link.

## 6. Common future changes

### Add a publication

1. Put the PDF in `public/papers/`.
2. Add one publication object to `publications` in
   `app/data/site-data.ts`.
3. Add the new publication ID to the relevant project's `publicationIds`.
4. Use `selected: true` only if it should appear on the homepage.
5. Update the displayed publication count in `app/page.tsx` and
   `app/publications/page.tsx`.
6. Preview and test the site.

### Replace or add a research figure

1. Put the optimized image in `public/assets/img/`.
2. Change or add the figure record under the appropriate project in
   `app/data/site-data.ts`.
3. Write an accurate `alt`, `caption`, and `eyebrow`.
4. Confirm the new figure works before deleting the old file.

### Update citations or h-index

Search for the old number and update all visible occurrences, especially:

- `app/page.tsx`
- `app/publications/page.tsx`

### Add a new research project

1. Extend `ProjectSlug` and `projects` in `app/data/site-data.ts`.
2. Add `app/<new-slug>/page.tsx`.
3. Add its method labels and animation choice in
   `app/components/project-page.tsx`.
4. Add it to the homepage and research page where appropriate.
5. Add the route to `app/sitemap.ts` and
   `tests/rendered-html.test.mjs`.

### Change the name, role, email, or domain

Update the relevant values in:

- `app/data/site-data.ts`
- `app/layout.tsx`
- `app/components/site-shell.tsx`
- `app/components/contact-form.tsx`
- `app/robots.ts` and `app/sitemap.ts` for a domain change
- page-specific schema and tests

Search the entire `app/` folder afterward because important identity and domain
values intentionally appear in both visible content and structured metadata.

## 7. Preview and test changes locally

Install Node.js 22.13 or newer. In Terminal, enter the project folder and run:

```bash
npm install
npm run dev
```

Open the local address printed in Terminal. The server updates as files are
saved.

Before publishing, run:

```bash
npm run lint
npm test
npm run build:github
```

- `npm run lint` checks source quality.
- `npm test` creates the normal production build and verifies every public
  route, `robots.txt`, and the sitemap.
- `npm run build:github` creates the static GitHub Pages artifact in `out/`.

## 8. Replacing the current GitHub Pages website

The live domain was checked on 31 July 2026:

- `particlesolidlab.com` is currently served by GitHub Pages.
- The apex domain redirects to `www.particlesolidlab.com`.
- `www.particlesolidlab.com` currently points to
  `saadatkhan03.github.io`.

Therefore, when replacing the old website through the same GitHub account and
Pages repository, the DNS records should normally remain unchanged.

The repository currently serving the old site is
`saadatkhan03/Particlesolidlab.com`. The local project has no commit and no
GitHub remote, so it is not yet connected to that repository. Do not force-push
this folder blindly.

### Safest replacement procedure

1. In GitHub, open `saadatkhan03/Particlesolidlab.com`. Open
   **Settings → Pages** and confirm that its custom domain is
   `www.particlesolidlab.com`.
2. Create a backup branch named something like
   `old-site-backup-2026-07-31`. This gives you an immediate rollback point.
3. Clone that existing repository with GitHub Desktop or regular Git.
4. Copy the cleaned contents of this `My_Website` folder into the cloned
   repository. Preserve the cloned repository's hidden `.git` folder. Do not
   copy `node_modules/`, `dist/`, `out/`, `.next/`, `.vinext/`, `.wrangler/`,
   or `work/`.
5. Commit the replacement to the repository's `main` branch and push it.
6. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as
   the source.
7. The included `.github/workflows/deploy-pages.yml` workflow will install the
   dependencies, build `out/`, and deploy it automatically.
8. In the repository's **Actions** tab, wait for “Deploy Particle Solid Lab to
   GitHub Pages” to finish successfully.
9. Return to **Settings → Pages**, keep the custom domain as
   `www.particlesolidlab.com`, and enable **Enforce HTTPS**.
10. Check both `https://www.particlesolidlab.com` and
    `https://particlesolidlab.com`.

GitHub Actions custom deployments use the custom-domain value saved in the
repository's Pages settings. A `CNAME` file is not required for this workflow.

### If you publish from a different GitHub account

The current `www` DNS record points to `saadatkhan03.github.io`. If the new
Pages site belongs to a different user or organisation, first add and verify
the domain in that new repository's Pages settings, then change the `www`
`CNAME` record at the DNS provider to the new `<account>.github.io` target.
Do not use wildcard DNS records.

### Publishing later updates

After the initial connection, the normal cycle is:

1. Edit source files.
2. Run the local preview and tests.
3. Commit the source changes.
4. Push `main` to GitHub.
5. GitHub Actions rebuilds and publishes the website automatically.

Only source files are committed. Generated folders remain ignored by Git.

## 9. Rollback if a publication is wrong

Do not change DNS during an ordinary website update. To restore the old site:

1. Open the backup branch or the last known good commit in GitHub.
2. Revert the bad commit or restore those files onto `main`.
3. Push `main` again.
4. The same GitHub Pages workflow republishes the restored version.

Keeping the previous site in a backup branch is safer than keeping duplicate
build folders on the computer.

## 10. Things never to edit or upload

Do not edit or commit these generated folders:

- `node_modules/`
- `dist/`
- `out/`
- `.next/`
- `.vinext/`
- `.wrangler/`
- `work/`

Do not put passwords, API keys, private correspondence, unpublished
confidential data, or personal documents in this repository. GitHub Pages is a
public website even when some GitHub plans permit the source repository itself
to be private.

## 11. Quick checklist

Before every publication:

- scientific claims and labels checked
- mobile and desktop appearance checked
- image captions and alt text checked
- publication IDs and project IDs consistent
- citation and h-index values consistent
- `npm run lint` completed
- `npm test` completed
- `npm run build:github` completed
- no generated folders staged for Git
- backup/rollback point available
