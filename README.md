# CaliPrint

A premium, animated marketing site for a professional 3D printing service — upload a model, choose a material, get a quote.

## Stack

- [Next.js](https://nextjs.org) (App Router) + TypeScript
- Tailwind CSS v4
- [Framer Motion](https://www.framer.com/motion/) for scroll reveals, hover states and micro-interactions
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) for the animated hero object (lazy-loaded, disabled under `prefers-reduced-motion`)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Structure

- `src/app` — routes, layout, global styles
- `src/components/sections` — one component per landing page section (Hero, Services, How It Works, Materials, Portfolio, Why Choose Us, Quote/Upload, FAQ, Final CTA)
- `src/components/layout` — Navbar, Footer
- `src/components/ui` — shared primitives (Button, Reveal animation wrapper, section heading, icons)
- `src/components/three` — the hero 3D scene
- `src/lib/data.ts` — site copy/content as typed data

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run lint` — ESLint
