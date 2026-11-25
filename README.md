# Bloom & Rise Foundation site
`npm install && npm run dev` (Next 16, React 19, deployed on Vercel)

- Copy, nav, footer, socials, steps, roles, status: `src/config/site.ts`
- Closing call-to-action per page: `src/config/closing.ts`
- Team members: `src/data/team.ts` (photos in `public/team/`)
- Colours, fonts, radii: tokens at the top of `src/styles/base.css` (palette: Midnight, Denim, Deep wine, Old rose, Apricot dawn, Marshmallow, Sky; the token names `--pink/--beet/--blue/--lemon/--rum/--leaf` map onto them)
- Fonts: Playfair Display (brand) + Montserrat (body), loaded in `src/app/layout.tsx`
- Styles: `src/styles/{base,chrome,sections,credential}.css`
- Add a page: new folder in `src/app/`, use `PageHero` + `Section`, add to `nav`/`footer`.

## How motion works (no animation library)
- Almost everything is a Server Component; motion is CSS.
- Scroll effects (`animation-timeline: view()/scroll()`): word-lit statement, pinned focus tiles, steps rail, header pill, footer wordmark, scroll reveals. Each has a plain fallback where unsupported.
- `data-reveal="up|left|right|scale|tilt"` (via `Reveal` in `components/ui.tsx`): CSS-only where scroll timelines exist, otherwise the shared observer in `RevealRoot.tsx`.
- `data-fx="mag|tilt|glow|light"`: one delegated pointer handler (`Pointer.tsx`, mouse only) drives magnetic buttons, card tilt, tile glow and the spotlight room.
- Falling petals are plain CSS (`Petals` in `Decor.tsx`, transform-only keyframes). The flower cursor and pointer effects load after the page is idle (`Lazy.tsx`), mouse users only.
- The hero bloom plays once per session (`html.seen`, set in the boot script in `layout.tsx`); it never blocks the page.

## Credentials
`src/lib/credentials.ts` looks up Airtable server-side (set `AIRTABLE_TOKEN` and `AIRTABLE_BASE_ID`; without them a demo record `demo-credential` is used). `src/proxy.ts` shows `/verify` at `/` on any host starting with `verify`.
