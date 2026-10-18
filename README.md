# Bloom & Rise Foundation site
`npm install && npm run dev`

- Copy, nav, footer, socials, steps, roles, status: `src/config/site.ts`
- Team members: `src/data/team.ts` (photos in `public/team/`)
- Colours, fonts, radii: tokens at top of `src/app/globals.css`
- Motion helpers (Reveal, SplitWords, useMouseParallax, Cycle): `src/components/motion.tsx`
- Add a page: new folder in `src/app/`, use `PageHero` + `Section`, add to `nav`/`footer`.
