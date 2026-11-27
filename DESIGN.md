---
name: Bloom & Rise Foundation
description: A dark wine room that blooms into cream light; petal-scalloped colour blocks, pill buttons and Playfair italics for a candid, student-led foundation.
colors:
  logo-cream: "#FCF1DA"
  mulberry: "#6F2B34"
  wine: "#570F1D"
  petal: "#E3939B"
  old-rose: "#C65C6A"
  garnet: "#94404F"
  blush: "#F9DAD8"
  frozen-blue: "#D5E3EE"
  denim: "#3A557D"
  glacier: "#7C95B6"
typography:
  display:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.8rem, 9vw, 6.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  script:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "inherit"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 800
    lineHeight: 1.05
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "0.85rem"
    fontWeight: 600
rounded:
  pill: "999px"
  card: "32px"
  poster: "44px"
  stack: "48px"
  menu: "22px"
  menu-item: "14px"
spacing:
  gutter: "1.25rem"
  gap: "1.2rem"
  section: "clamp(4rem, 9vw, 7rem)"
  wrap: "1120px"
components:
  button-primary:
    backgroundColor: "{colors.mulberry}"
    textColor: "{colors.logo-cream}"
    rounded: "{rounded.pill}"
    padding: ".85rem 1.6rem"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.mulberry}"
    rounded: "{rounded.pill}"
    padding: ".85rem 1.6rem"
  button-ghost-hover:
    backgroundColor: "{colors.mulberry}"
    textColor: "{colors.logo-cream}"
  chip:
    backgroundColor: "{colors.frozen-blue}"
    textColor: "{colors.wine}"
    rounded: "{rounded.pill}"
    padding: ".3rem .9rem"
  poster-petal:
    backgroundColor: "{colors.petal}"
    textColor: "{colors.wine}"
    rounded: "{rounded.poster}"
  poster-mulberry:
    backgroundColor: "{colors.mulberry}"
    textColor: "{colors.logo-cream}"
    rounded: "{rounded.poster}"
  poster-denim:
    backgroundColor: "{colors.denim}"
    textColor: "{colors.logo-cream}"
    rounded: "{rounded.poster}"
  nav-menu:
    backgroundColor: "{colors.logo-cream}"
    textColor: "{colors.mulberry}"
    rounded: "{rounded.menu}"
  credential-card:
    backgroundColor: "{colors.blush}"
    textColor: "{colors.wine}"
    rounded: "{rounded.card}"
  verify-input:
    backgroundColor: "{colors.logo-cream}"
    textColor: "{colors.wine}"
    rounded: "{rounded.pill}"
    padding: ".85rem 1.2rem"
---

# Design System: Bloom & Rise Foundation

## Overview

**Creative North Star: "The Dawn Garden"**

A dark wine room that blooms into light. The home page opens in near-black wine, a bud glows, opens, and a circle of cream floods the page; everything after lives in that daylight, broken into colour-blocked rooms whose edges are scalloped like petals. The system is warm, candid and unhurried, with a poster-like playfulness: big Playfair headlines with italic accents, outlined numerals, tilted ribbons of words, stacked cards that settle into place. It should feel grown, not manufactured.

Colour does the structural work. Sections are flat tonal blocks (petal, frozen blue, mulberry, denim, wine) separated by scalloped edges rather than lines or shadows. Motion is the second voice: slow, transform-only, mostly driven by scroll, and always with a plain fallback.

The system explicitly rejects the corporate-charity template: no stock-photo hero with a donate button, no fabricated impact visuals, no counters or testimonials that do not exist.

**Key Characteristics:**
- Cream page, wine ink; dark wine rooms for the hero, statement, band and footer.
- Playfair Display bold for display, its italic for accents; Montserrat for everything read.
- Pill buttons and chips, very large corner radii on posters and cards (32 to 48px).
- Colour-blocked sections with petal-scalloped top edges.
- Outlined (stroked, unfilled) numerals as structural ornament.
- Flower and petal motifs as the recurring decoration; soft wine-tinted ambient shadows only.
- Motion is CSS-first, scroll-linked, and respects reduced motion.

## Colors

A cream-and-wine palette with a rose family for warmth and a cool blue pair as counterweight. Token names in CSS are legacy (`--lemon`, `--beet`, `--rum`, `--pink`, `--leaf`, `--blue`); the descriptive names below are canonical for this document.

### Primary
- **Mulberry** (#6F2B34, `--beet`): headings on cream, primary buttons, focus ring, the mulberry section and poster.
- **Wine** (#570F1D, `--rum`): body text ink on cream and petal, and the dark rooms (hero, band, statement, footer, mobile menu).

### Secondary
- **Petal** (#E3939B, `--pink`, `--leaf`): soft section and poster fill, italic accents on dark, selection highlight, active menu item.
- **Old Rose** (#C65C6A, `--rose`): accents on dark rooms, the top ribbon, hero italic line.
- **Garnet** (#94404F): the outer ring of the closing dome; rare, deepest rose.

### Tertiary
- **Denim** (#3A557D): the cool dark section/poster and the lower ribbon; the only dark that is not wine.
- **Frozen Blue** (#D5E3EE, `--blue`): pale cool section, chips, background mesh.
- **Glacier** (#7C95B6): an accent word colour in the dark statement.

### Neutral
- **Logo Cream** (#FCF1DA, `--lemon`, `--bg`): the page, and text on every dark room.
- **Blush** (#F9DAD8): credential card paper tint, the closing dome fill.

### Named Rules
**The Daylight Rule.** The page is cream; dark wine is a room you enter (hero, statement, band, footer), never the default surface.
**The Two-Ink Rule.** Ink on light surfaces is wine (body) or mulberry (headings, buttons); ink on dark surfaces is cream, with petal or rose for italic accents. Never pure black or white.
**The Tint-Don't-Gray Rule.** Shadows, borders and overlays are tinted from wine or mulberry (e.g. `rgba(87,15,29,.2)`), never neutral gray.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Montserrat (with system-ui, sans-serif)

**Character:** A high-contrast bookish serif at heavy weights gives the foundation gravity and warmth; its italic carries the personality that a handwriting font would. Montserrat stays out of the way.

### Hierarchy
- **Display / h1** (800, `clamp(2.8rem, 9vw, 6.5rem)`, 1.05, -0.02em): page heroes. The home hero is smaller (`clamp(2.3rem, 4.4vw, 4.2rem)`).
- **Headline / h2** (800, `clamp(2rem, 5vw, 3.5rem)`, 1.05): section titles, usually ending in an italic `.script` word.
- **Title / h3** (800, 1.5rem; posters up to 2.8rem, stack cards up to 5.4rem): card and row titles.
- **Script** (italic, 600, tracking -0.01em): the accent word inside a headline, rotating phrases, wordmark.
- **Body** (Montserrat 400, 1rem, 1.7): copy; `.lead` is `clamp(1.05rem, 2.2vw, 1.3rem)`, capped at 60ch.
- **Label** (Montserrat 600, 0.85 to 0.95rem): nav links, chips; footer column titles in petal.
- **Numerals** (Playfair 900, up to 11.5rem, transparent fill with 2px stroke): decorative ordinal on rows, posters and stack cards.

### Named Rules
**The Italic Accent Rule.** Each major headline may carry one italic word or phrase in a contrasting tone. Never italicise whole paragraphs.
**The Balanced Headline Rule.** Headings use `text-wrap: balance`, body copy `text-wrap: pretty`.

## Layout

A single centred column, `--wrap` 1120px, with side gutters of at least 1.25rem plus safe-area insets. Sections are full-bleed colour blocks with generous vertical padding (`clamp(4rem, 9vw, 7rem)`) and are stacked, not gridded into dashboards. Inside: two-column poster grids (one column under 700px), numbered rows (numeral, text, flower), and a 5-column footer collapsing to 2 then 1.

The hero is wider than the column on desktop (up to 1320px) so text sits left and the flower right, and fills at least `100svh`. The header is a fixed floating pill below the top safe area; below 820px (or on coarse pointers) it becomes a burger with a full-screen wine menu. Spacing is rhythmic and relaxed; small gaps are 0.55 to 0.9rem, card gaps 1.2 to 1.6rem. Below-the-fold sections use `content-visibility: auto`. Touch targets are at least 44px.

## Elevation & Depth

Hybrid, but mostly tonal. Depth comes first from colour-blocked rooms and scalloped edges, then from a few soft wine-tinted ambient shadows. Hover lift is small (translate -4px on posters) and mouse-only.

### Shadow Vocabulary
- **Button hover** (`box-shadow: 0 10px 26px rgba(111,43,52,.28)`): primary button, fine pointers only.
- **Header glass** (`0 8px 32px rgba(87,15,29,.12)` plus a 1px inset highlight; frosted `backdrop-filter: blur(14px) saturate(1.6)`): the floating nav pill.
- **Dropdown** (`0 16px 40px rgba(87,15,29,.2)`): the Cultivators menu.
- **Stack card** (`0 -22px 60px rgba(87,15,29,.22)`): the sticky stacking cards.
- **Ribbon / seal** (`0 14px 40px rgba(0,0,0,.28)` / `0 4px 6px rgba(87,15,29,.3)`): ribbons on wine, credential wax seal.

### Named Rules
**The Tonal-First Rule.** Reach for a colour block or scalloped edge before a shadow. A shadow is ambient and tinted, or a response to state.
**The Glass-Once Rule.** Frosted blur is reserved for the floating header; do not scatter glass panels.

## Shapes

Round and petal-like. Buttons, chips, inputs and the header are full pills (999px). Posters are 44px, stack cards 48px, credential and verify cards 32px, dropdowns 22px with 14px items. Petals are elliptical (`50% / 62% 62% 38% 38%`); the closing is a huge circle dome; section tops are scalloped with a 28px radial repeat. Dividers are 2px rules tinted at about 28% of the ink colour. Focus is a 3px mulberry outline with 3px offset and 6px radius.

## Components

### Buttons
- **Shape:** full pill (999px), 2px border, padding .85rem 1.6rem, weight 700.
- **Primary:** mulberry fill, cream text, mulberry border.
- **Hover / Focus:** fine pointers only: ambient mulberry shadow. Press: `scale(.97)`. Magnetic drift via `data-fx="mag"` on mouse.
- **Ghost:** transparent, mulberry text and border; fills mulberry on hover. On the dark hero before the flood, buttons take petal fill, then settle.

### Chips
- **Style:** frozen blue at 55% opacity, wine text, 0.85rem weight 600, full pill.

### Cards / Containers
- **Poster:** 44px radius, solid tone (petal, frozen blue, mulberry, denim), min-height `clamp(340px, 52vh, 480px)`, content bottom-aligned, outlined numeral top-left, oversized translucent flower top-right, cursor-tracking cream glow on hover. On wide screens the posters pin and slide sideways with scroll.
- **Stack card:** 48px radius, sticky with a 1.5rem offset per card and a slight rotation; ambient upward shadow.
- **Credential card:** blush-tinted paper, 2px mulberry border plus an inner 1px offset outline, wax seal stamped in top-right.

### Inputs / Fields
- **Style:** pill, 2px wine border, cream fill, inherited type, 0.04em tracking, min-height 48px on touch.
- **Focus:** the global 3px mulberry outline. Font-size never below 16px.

### Navigation
- **Header:** floating frosted pill, logo (Playfair bold plus italic) left, links right in Montserrat 600 .95rem; an underline grows from the left on hover and stays on the current page. The Cultivators dropdown is a cream rounded panel.
- **Mobile:** burger of two bars; a petal-shaped circle of wine expands from the burger, links in large Playfair stagger in, current page in petal.

### Closing and Footer
Every page ends in a big tile-filled headline growing into frame, over a blush dome ringed in petal and garnet; then the wine footer with petal column titles and a giant cream-and-petal wordmark that rises on scroll.

### Hero Bloom (signature)
A wine room, a glowing bud, a flower of staggered petal rings, and a cream circle (the dawn) that scales out from the bloom; ink colours switch from cream to wine as the light reaches them. Plays once per session.

### Ribbons and Band (signature)
Two tilted ribbons (old rose, denim) of scrolling Playfair words and flower glyphs over a wine band with a particle helix.

## Do's and Don'ts

### Do:
- **Do** keep the page cream (#FCF1DA) and enter wine rooms deliberately.
- **Do** use mulberry for headings and primary buttons, wine for body text.
- **Do** end major headlines with one italic Playfair accent word.
- **Do** separate sections with colour blocks and scalloped edges.
- **Do** use full pills for controls and 32 to 48px radii for cards and posters.
- **Do** make motion transform/opacity only, scroll-linked where supported, with a plain fallback and a gentle reduced-motion path (colour, opacity and shadow feedback kept, movement dropped).
- **Do** keep touch targets at 44px or more, inputs at 16px or more, and focus visible.

### Don't:
- **Don't** use the corporate-charity template: stock-photo hero, donate button, fabricated impact numbers, counters or testimonials.
- **Don't** use pure black, pure white or neutral-gray shadows; tint from wine or mulberry.
- **Don't** add glass panels beyond the header, or heavy shadows as a first resort.
- **Don't** put gradient text on headings or add side-stripe borders to cards; the closing's tile-filled headline is the one image-filled text.
- **Don't** italicise body paragraphs or set display type in Montserrat.
- **Don't** swap the palette or fonts; they are brand commitments.
