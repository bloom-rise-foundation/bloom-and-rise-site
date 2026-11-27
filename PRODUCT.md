# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Two audiences, equally weighted (confirmed):

- **Prospective volunteers, advisers and partners**: students, adults and organisations deciding whether to join, advise or partner with the foundation, and checking that it is honest.
- **Community and beneficiaries**: girls, young people, guardians and schools in Ghana who would take part in future sessions.

A third, narrower job: anyone holding a Bloom & Rise credential who needs to verify it (`/verify`, `/credential/[id]`).

## Product Purpose

Bloom & Rise Foundation is a student-led (Year 12) Ghana non-profit that promotes girls' and women's health, encourages open conversations about overlooked issues, and expands access to STEM education. It supports orphans and vulnerable children to feel safe, valued and able to thrive. The site is the foundation's public face and trust site: it explains who they are, what they plan, what they do and do not have, and how to get involved or make contact.

## Positioning

Undecided. The user declined to name a single differentiating claim in this round. The repo's own copy points to candor about status and limits, listening before planning, and working "beside the community and not merely for it", but none of this is confirmed as the positioning statement.

## Operating Context

- Hosted on Vercel; Next.js App Router, almost entirely Server Components, motion in CSS (see README).
- Copy, nav, footer, socials, steps, roles and status live in `src/config/site.ts`; team in `src/data/team.ts`.
- Credential lookup reads Airtable server-side (`AIRTABLE_TOKEN`, `AIRTABLE_BASE_ID`); a demo record is used without them. `src/proxy.ts` serves `/verify` at `/` on hosts starting with `verify`.
- Current routes: `/`, `/about` (Blueprint), `/programmes`, `/team` (Executive), `/team/heads`, `/get-involved`, `/contact`, `/transparency`, `/verify`, `/credential/[id]`, `/sitemap`.

## Capabilities and Constraints

- **No overclaiming (confirmed).** The foundation is not registered, has no launched programmes, collects no funds, has no formalised partnerships and runs no activities with children until safeguards exist. Copy must never claim registration, funding, partnerships, impact or launched programmes. The status and limits lists in `site.ts` are the source of truth.
- **Minors on the team.** Team members are minors; guardian consent is needed before adding photos, names or bios. (From earlier project notes, not re-asked in this round.)
- Terminology in use: "Blueprint" (about), "Cultivators" (team), "Heads", "Executive", "Rise with us".

## Brand Commitments

Binding (confirmed):

- Name "Bloom & Rise" with suffix "Foundation", and the logo.
- The palette recorded in the README (logo cream, mulberry, wine, petal, frozen blue, denim, old rose, garnet, blush, glacier) with its tokens in `src/styles/base.css`.
- Playfair Display (brand) and Montserrat (body).

Existing voice, visible in current copy: warm, forthright, plain about limits ("We never claim what we do not have").

## Evidence on Hand

- Team photos in `public/team/` (executive and 18 heads).
- Roles PDF: `public/docs/available-roles.pdf`.
- Social accounts: Instagram, TikTok, Linktree, email. X and LinkedIn are empty and hidden.
- Absent, and must not be fabricated: testimonials, beneficiary stories, impact figures, partners, funders, registration numbers, programme outcomes.

## Product Principles

- Say only what is true; show status and limits openly.
- Protect people first, above all children and the minors on the team.
- Start small and listen before planning.
- Serve volunteers/partners and community visitors equally; neither is an afterthought.

## Accessibility & Inclusion

Target WCAG 2.1 AA and respect `prefers-reduced-motion` (confirmed). Note `plans/002-reduced-motion-gentle-not-zero.md` already explores a gentle rather than zero reduced-motion treatment.
