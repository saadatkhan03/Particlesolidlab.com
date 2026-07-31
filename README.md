# Particle Solid Lab

The source for [particlesolidlab.com](https://www.particlesolidlab.com), the
academic website of Dr. Muhammad Saadat Shakoor Khan. It presents one connected
research programme in computational particle transport, radiation materials,
scientific software, and uncertainty quantification.

## Prerequisites

- Node.js `>=22.13.0`

## Quick Start

```bash
npm install
npm run dev
```

Then open the local URL printed by vinext. Use `npm run build` for a production
build and `npm test` to crawl every public route.

For editing, cleanup, GitHub Pages publishing, custom-domain replacement, and
rollback instructions, read
[WEBSITE_MAINTENANCE_AND_PUBLISHING.md](./WEBSITE_MAINTENANCE_AND_PUBLISHING.md).

## Site structure

- routes and shared components live under `app/`
- research figures and profile images live under `public/assets/`
- supplied papers and technical guides live under `public/papers/` and
  `public/guides/`
- scientific visualizations share pause, replay, reduced-motion, and off-screen
  suspension behaviour
- `.openai/hosting.json` declares optional Sites D1 and R2 bindings
- `vite.config.ts` simulates declared bindings for local development

## Public routes

- `/` — homepage and research overview
- `/research` — the connected research programme
- `/fenial`, `/geometry`, `/uncertainty`, `/electron-transport`, `/im3d` —
  theme-led research case studies combining work across career stages
- `/publications` — journal papers with PDFs and DOI links
- `/software` — scientific software, guides, and reproducibility resources
- `/about`, `/mentoring`, `/contact` — profile, opportunities, and contact

## Useful Commands

- `npm run dev`: start local development
- `npm run build`: verify the vinext build output
- `npm run build:github`: create the static GitHub Pages site in `out/`
- `npm test`: build and verify every public route plus crawler metadata
- `npm run lint`: run the source linter
- `npm run clean`: remove generated build and preview folders
- `npm run clean:full`: also remove reinstallable `node_modules/`

## Learn More

- [vinext Documentation](https://github.com/cloudflare/vinext)
