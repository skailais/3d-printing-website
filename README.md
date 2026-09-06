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

## Running this machine as the server

Double-click **`start.bat`**, or:

```bash
npm run setup:admin -- "your chosen password"   # once per machine
npm run serve                                    # build, then serve on :4000
```

| | |
|---|---|
| On this machine | `http://localhost:4000` |
| On the local network | `http://<this-computer>:4000` |
| Control page | `http://localhost:4000/master` |

`setup:admin` writes two values to `.env.local` (gitignored): a salted scrypt
hash of the password — the password itself is never stored — and a random
session secret. Restart after running it. Re-running signs out open sessions.

Windows will ask to allow Node through the firewall the first time; that prompt
is what makes the site reachable from other machines on the network.

### Where things are kept

Everything lives in `data/`, which is gitignored and is the only thing you need
to back up:

```
data/quotes.json          quote requests
data/events.json          page-view log (rolling, capped)
data/uploads/<id>/…       the models people attached
```

Uploads sit outside `public/` on purpose — the only route to them is
`/api/quotes/<id>/files/<name>`, which checks the session first.

### What is counted

Page views are counted first-party, with no cookie, no third party and no
address stored. A visitor is a daily-rotating salted hash of address plus
user-agent, which is enough to count sessions and useless for following anyone
between days. `/master` is not counted.

### Before putting it on the open internet

Fine as it stands on a home or office network. Beyond that:

- **Plain HTTP sends the admin password and session cookie in clear text.**
  Put it behind HTTPS (a reverse proxy, or a Cloudflare Tunnel) — the session
  cookie sets `Secure` automatically once the request arrives over HTTPS.
- The login limiter is per-process and in memory, so restarting clears it.
- `data/` has no automated backup. Copy it somewhere.

## Pages

| Route        | Contents                                              |
| ------------ | ----------------------------------------------------- |
| `/`          | Hero, manifesto, service preview, featured work, materials marquee, stats, CTA |
| `/work`      | Filterable gallery of generated sumi-e plates          |
| `/services`  | The six processes, with specs                          |
| `/materials` | Twelve materials as pigment-flooded cards              |
| `/process`   | Four steps, with a brush line that fills on scroll     |
| `/studio`    | Philosophy, principles, contact                        |
| `/quote`     | Drag-and-drop upload and quote form — posts to the server |
| `/master`    | Back of house: traffic, funnel, material demand, the queue. Password-gated, `noindex`, absent from the nav and sitemap |

## API

| Route | |
|---|---|
| `POST /api/quotes` | public — a quote request with up to 5 models (25 MB each, `.stl .obj .step .stp`) |
| `GET /api/quotes` | admin — the queue |
| `PATCH /api/quotes/:id` | admin — change status |
| `GET /api/quotes/:id/files/:name` | admin — download an attachment |
| `POST /api/auth/login` · `POST /api/auth/logout` | session in an HttpOnly cookie |
| `POST /api/track` | public — one page view, no cookie, no address stored |

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
