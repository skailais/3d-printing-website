# CaliPrint

A multi-page site for a professional 3D printing studio, drawn in an ink-and-paper
idiom: washi ground, sumi-ink type, vermilion seals and jade pigment washes.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, hover states and the between-page ink wipe
- No image assets: every illustration is hand-authored SVG (`src/components/art`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route        | Contents                                              |
| ------------ | ----------------------------------------------------- |
| `/`          | Hero, manifesto, service preview, featured work, materials marquee, stats, CTA |
| `/work`      | Filterable gallery of generated sumi-e plates          |
| `/services`  | The six processes, with specs                          |
| `/materials` | Twelve materials as pigment-flooded cards              |
| `/process`   | Four steps, with a brush line that fills on scroll     |
| `/studio`    | Philosophy, principles, contact                        |
| `/quote`     | Drag-and-drop upload, quote form (UI only), FAQ        |

## Structure

- `src/app` — routes, root layout, `template.tsx` (page transition), SEO routes (sitemap, robots, manifest, OG image)
- `src/components/art` — the ink layer: `Enso`, `BrushStroke`, `InkWash`, `InkPlate`, `Seal`, `VerticalLabel`
- `src/components/layout` — `Navbar`, `Footer`, `PageHeader`
- `src/components/sections` — one component per page section
- `src/components/ui` — `Button`, `Reveal`, `SectionHeading`, `Logo`
- `src/lib/data.ts` — all site copy as typed data

## Scripts

- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — ESLint
