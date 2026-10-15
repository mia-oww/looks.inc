# Look Steal

The Look Steal website: a K-pop fashion source where visitors shop the exact pieces idols wear. Built with React and Vite, using the brand's type (Marcellus, Lora, Overpass) and cream and brown palette.

## Pages

| Route | What's there |
| --- | --- |
| `#/` | Hero, what we offer, feed preview, Outfit Finder, journal, socials, newsletter |
| `#/shop` | Full shoppable feed with group filters. Tap a look to see tagged pieces. |
| `#/journal` | Latest articles from looksteal.com |
| `#/about` | About Us, What We Offer, Meet the Team |
| `#/contact` | Contact form (opens the visitor's email app) and contacts |
| `#/follow` | All social accounts |
| `#/company` | Company facts and mission |
| `#/careers` | Open roles (Photo Editor) |
| `#/legal` | Privacy Policy and Disclaimer |

Routing is hash-based (`src/lib/router.js`), so `dist/` deploys to any static host without rewrite rules.

## Scripts

- `npm run dev` starts the dev server.
- `npm run build` builds into `dist/`.
- `npm run lint` runs oxlint.
- `npm run sync` refreshes the synced content (see below).

## Content

- `src/data/site.js` holds the hand-edited copy: menu, About, socials, company, jobs.
- `src/data/looksteal.json` and `public/media/feed/` hold the shoppable feed, synced from Linkin.bio by `scripts/sync-linkinbio.mjs`.
- `src/data/journal.json` and `public/media/journal/` hold the journal articles, synced from looksteal.com by `scripts/sync-site.mjs`.
- `src/data/legal.json` holds the Privacy Policy and Disclaimer, synced from looksteal.com by `scripts/sync-site.mjs`.

## Newsletter

Set `VITE_NEWSLETTER_URL` to an endpoint that accepts a JSON `{ name, email }` POST, for example a Mailchimp or Brevo form handler, to collect sign-ups there. Without it, the form opens a pre-filled email to hello@looksteal.com. See `src/lib/newsletter.js`.
