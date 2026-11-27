---
name: Bloom & Rise Foundation
description: The Alcove. Plaster cream, hairline frames and a wine lacquer shelf; one bloom placed with patience in charged empty space.
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
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  hero:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2.3rem, 3.7vw, 3.6rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  headline:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 5vw, 3.5rem)"
    fontWeight: 500
    lineHeight: 1.05
    letterSpacing: "-0.015em"
  statement:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "clamp(2rem, 4.6vw, 3.9rem)"
    fontWeight: 500
    lineHeight: 1.18
  title:
    fontFamily: "Playfair Display, Georgia, serif"
    fontSize: "1.5rem"
    fontWeight: 500
    lineHeight: 1.05
  body:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.7
  lead:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: "clamp(1.05rem, 2.2vw, 1.3rem)"
    fontWeight: 400
    lineHeight: 1.7
  label:
    fontFamily: "Montserrat, system-ui, sans-serif"
    fontSize: ".74rem"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "0.16em"
rounded:
  hair: "2px"
  frame: "4px"
  menu: "3px"
spacing:
  xs: "8px"
  sm: "14px"
  md: "24px"
  lg: "48px"
  section: "clamp(4.5rem, 10vw, 8rem)"
components:
  button-primary:
    backgroundColor: "{colors.denim}"
    textColor: "{colors.logo-cream}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "16px 24px"
  button-primary-hover:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.logo-cream}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.wine}"
    typography: "{typography.label}"
    rounded: "{rounded.hair}"
    padding: "16px 24px"
  button-ghost-hover:
    backgroundColor: "{colors.wine}"
    textColor: "{colors.logo-cream}"
  header:
    backgroundColor: "{colors.logo-cream}"
    textColor: "{colors.wine}"
    height: "68px"
  card-poster:
    backgroundColor: "{colors.petal}"
    textColor: "{colors.wine}"
    rounded: "{rounded.frame}"
  card-poster-wine:
    backgroundColor: "{colors.mulberry}"
    textColor: "{colors.logo-cream}"
    rounded: "{rounded.frame}"
  input-field:
    backgroundColor: "{colors.logo-cream}"
    textColor: "{colors.wine}"
    rounded: "{rounded.hair}"
    padding: "13.6px 19.2px"
---

# Design System: Bloom & Rise Foundation

## Overview

**Creative North Star: "The Alcove"**

The site is a tokonoma: one thing placed with patience, with charged emptiness around it. A plaster cream ground carries a fine visible grain; everything set on it is drawn in hairlines and square-ish frames; the one living thing, the particle bloom, stands on a wine lacquer shelf. Space does the speaking. Headlines are Playfair at a medium weight set off-centre in wide rooms, and the foundation's honest status is shown as a stem of stages (seed, bud, open) rather than as a wall of equal tiles.

The mood is calm, candid and unhurried, with the warmth of the brand palette kept intact. Petal and old rose are saved for blooms and accents; denim, an iris blue, carries links, primary actions and the active state; wine is both the ink and the lacquered shelf. Four set pieces from the earlier build are preserved and sit inside this new frame: the particle-bloom hero with its dark-room dawn flood, the lamp-pull scroll story, the flower-ornamented posters and stack cards, and the word-by-word lit statement.

Anti-reference carried over: the corporate-charity template (stock hero, equal-weight tile grid, pill buttons, donate-first urgency). Where the Alcove and that template disagree, empty space and plain text win.

**Key Characteristics:**
- Plaster cream ground with a fixed fine-grain overlay; no drifting colour clouds.
- Hairline rules and 1px inset outlines instead of heavy fills and thick borders.
- Square 2px buttons with caps labels and a drawn arrow; frames at 2 to 4px.
- A wine shelf plank under the home bloom and under every page hero.
- Light-to-medium Playfair, small wide-tracked Montserrat caps for controls.
- Shadows are ambient and wine-tinted only; no hard offset shadows.

## Colors

A ten-colour brand palette (binding) used as warm plaster and wine rooms, with petal and rose held back for the bloom.

### Primary
- **Wine** (--rum): Text ink, the shelf plank, the footer, dark rooms, ghost-button outline and hover fill, and the 1px portrait frames.
- **Denim** (--denim): Primary buttons, current-page nav colour and underline, the focus ring, and the denim room section. The one cool voice.

### Secondary
- **Mulberry** (--beet): Dark colour-block rooms and the mulberry poster/stack-card variant; text on it is Logo Cream.
- **Old Rose** (--rose): Italic script accents inside headings, the stage marker "here" bar and word, accents on tinted page heroes.
- **Petal** (--pink, --leaf): The soft petal poster, script accents on dark rooms, selection highlight, bloom particles, dashes in the limits list.

### Tertiary
- **Glacier** (--glacier): The tint source for the blue/denim page heroes; the bloom's cooler counter-tone.
- **Garnet** (--garnet): Brand-palette deep accent for illustration detail; the Alcove stylesheet assigns it no text or surface role.

### Neutral
- **Logo Cream** (--lemon, --bg): The plaster page ground, header band, and text on dark rooms.
- **Blush** (--blush): The ring behind the closing headline.
- **Frozen Blue** (--blue): Quiet blue sections and tiles, always mixed back toward cream, never at full strength.
- **Hairline** (wine at 24% over transparent; cream at 26% on dark rooms): Every rule, header border, and divider.

### Named Rules
**The Plaster Rule.** Tint never greys the cream. Pink and blue sections and page heroes are colour-mixes of the accent into Logo Cream (pink 24%, page hero tone 14 to 40%), so every ground stays warm.

**The One Cool Voice Rule.** Denim is the only cool colour that carries interaction. Links, primary buttons, active nav and the focus ring are denim; petal and rose are never used as link colour.

## Typography

**Display Font:** Playfair Display (with Georgia, serif)
**Body Font:** Montserrat (with system-ui, sans-serif)
**Label Font:** Montserrat, caps

**Character:** Playfair at 500 weight is the quiet, literary voice; its italic is the accent, replacing any handwritten face. Montserrat does the plain talking, and as small wide-tracked caps it labels the controls.

### Hierarchy
- **Display** (500, clamp(2.8rem, 9vw, 6.5rem), 1.05): h1 on inner pages; Playfair at -0.015em tracking.
- **Hero** (500, clamp(2.3rem, 3.7vw, 3.6rem) on desktop; on phones clamp(2rem, (100vw - 2.5rem) / 7.6, 3rem), 1.05): the home headline, off-centre, left two-thirds, kept clear of the bloom.
- **Headline** (500, clamp(2rem, 5vw, 3.5rem), 1.05): h2 section titles.
- **Statement** (500, clamp(2rem, 4.6vw, 3.9rem), 1.18, left-set, max 17em): the word-lit mission paragraph.
- **Title** (500, 1.5rem; posters clamp(1.9rem, 3.2vw, 2.8rem), 1.04): h3 and card titles.
- **Body** (400, 1rem, 1.7): Montserrat running text, lead capped at 56ch (44ch under page heroes).
- **Label** (600, .74rem, 0.16em, uppercase): buttons, nav links, footer column heads, bio "more" toggles, social links.
- **Script** (Playfair italic 500): the italic accent word inside h1/h2, the current stage name.

### Named Rules
**The Light Playfair Rule.** Playfair never goes heavier than 500 in headlines (600 for the small logo only). Weight is spent on space, not boldness.

**The Caps Are Controls Rule.** Tracked uppercase Montserrat is reserved for things you act on or navigate by. Running text, headings and decoration are never set in tracked caps.

## Layout

A top bar and a single centred wrap (max 1120px, 1.25rem minimum gutters, safe-area aware). The first viewport on home is asymmetric: headline, lead and actions occupy the left two-thirds with empty plaster around them; the bloom stands in the right third on the shelf line at the lower third of the viewport. Sections breathe with clamp(4.5rem, 10vw, 8rem) vertical padding; the mission section takes up to 9rem and indents its statement by up to 7rem on wide screens, leaving the right side deliberately empty.

Rooms alternate between plaster, tinted plaster (pink or blue mixed into cream), wine/mulberry and denim; there are no scalloped edges. Poster grids are two columns; stack cards pin and overlap during the scroll story. The stage strip is three equal columns on a hairline (one column with ruled rows on phones). Phone is first-class: at 600px and below the hero actions stack at full width and all three sit above the fold; below 820px the shelf plank under the home bloom and the page-hero art soften or drop out.

## Elevation & Depth

Mostly flat and tonal: depth comes from room colour changes, hairlines and the shelf plank rather than from shadow. Shadows exist only as ambient, wine-tinted glows under structural edges.

### Shadow Vocabulary
- **Shelf glow** (`box-shadow: 0 14px 24px -10px rgba(87,15,29,.4)`): under the 12px home shelf plank.
- **Page shelf glow** (`box-shadow: 0 12px 20px -10px rgba(87,15,29,.35)`): under the 10px page-hero plank.
- **Menu lift** (`box-shadow: 0 14px 30px -12px rgba(87,15,29,.3)`): dropdown nav menu.
- **Stack lift** (`box-shadow: 0 -18px 40px -14px rgba(87,15,29,.28)`): upward shadow on pinned stack cards so they read as overlapping sheets.

### Named Rules
**The Ambient Wine Rule.** Every shadow is soft, negatively spread, and tinted wine. No hard offset shadows and no black shadows; the earlier offset-shadow portrait treatment is removed.

## Shapes

Square-cornered. Buttons, inputs, portraits and nav items sit at 2px; posters, stack cards and tiles at 4px; the dropdown menu at 3px. Frames are drawn, not filled: a 1px inset outline (offset -12px on posters and stack cards at 32% of the current colour, -10px on tiles at 24%) makes a card read as a mounted print. Team portraits are 4:5 with a 1px wine outline offset 8px outside the image. Round forms survive only in the illustrative layer: the bloom, the flowers, the ring behind the closing headline.

## Components

### Buttons
- **Shape:** Square with a hairline radius (2px), caps label (Montserrat 600, .74rem, 0.16em tracking), 1px border.
- **Primary:** Denim fill, Logo Cream text, padding 1rem 1.5rem, then a 1.25rem by .7rem arrow drawn with a CSS mask in the text colour, gap .9rem.
- **Hover (fine pointer only):** Fill moves to Wine, no shadow, and the arrow slides 5px right.
- **Ghost:** Transparent, wine text and wine 1px border; hover fills Wine with cream text. On the home hero it carries equal weight with the primary.
- **Quiet:** No border or fill, 1px underline with .5em offset; hover turns denim. Used for the low-emphasis partner and learn links.
- **Focus:** 2px denim outline, 4px offset, 2px radius.

### Cards / Containers (Posters and Stack Cards)
- **Corner Style:** 4px.
- **Background:** Petal, Frozen Blue, Mulberry or Denim, with Wine or Logo Cream text to suit. The flower ornament stays as a large low-opacity glyph.
- **Shadow Strategy:** None for posters; stack cards use the Stack lift.
- **Border:** 1px inset hairline frame, 12px inside the edge.
- **Internal Padding:** clamp(1.6rem, 3vw, 2.6rem) for posters, clamp(1.8rem, 4vw, 3.4rem) for stack cards. The oversized outlined number is thin (weight 400, 1.5px stroke).

### Tiles
Squared 4px tiles on pink or blue plaster tints, 10px inset hairline, no shadow; the grid card for inner-page content.

### Inputs / Fields
- **Style:** Logo Cream fill, 1px wine border, 2px radius, slight letter-spacing.
- **Focus:** Shared denim outline.
- **Verify form:** a 1px solid-bordered frame (the earlier dashed border is solid now); credential cards carry a 1px border.

### Navigation
A flat Logo Cream band, 68px tall, 1px hairline underneath, no blur or pill. The logo is Playfair 600 at 1.45rem with an italic script half. Links are caps labels in Wine; current page turns Denim with a 1px denim underline. The dropdown is a 3px-radius hairline panel with sentence-case Playfair-sized items and a petal-tinted active row. When the mobile menu opens, the band turns solid Wine.

### Stage Strip (signature)
Three columns on a hairline rule that state where the foundation stands: seed, bud, open. The current stage has a 3px Old Rose top bar and its name set in Old Rose italic Playfair; others are muted wine. It is the visual form of the site's candour and sits on the home page.

### Shelf (signature)
A solid Wine plank (12px under the home bloom, 10px at the base of each tinted page hero) with an ambient glow. The bloom and the page-hero ring art are "placed" on it.

### Ticker
One calm ruled ticker in Playfair: no tilt, no shadow, hairline rules above and below, a single line (the second ribbon is hidden). It scrolls slowly and stops under reduced motion.

### Preserved set pieces
- **Particle bloom hero:** the bloom and the dark-room dawn flood (its entrance runs about 2.6s; the shelf plank fades in at 2.4s).
- **Lamp pull:** the rope-pull scroll story that lights words as the lamp comes on.
- **Flower cards:** posters and stack cards with large flower glyphs.
- **Lit statement:** word-by-word lighting via a CSS view timeline; plain solid text where timelines are unsupported.
- The closing headline is plain solid type on a blush ring (no image-filled text).

## Do's and Don'ts

### Do:
- **Do** draw edges with 1px hairlines and inset outlines; use wine at 24 to 32% for rules.
- **Do** keep buttons square (2px), caps (.74rem, 0.16em), and followed by the masked arrow.
- **Do** tint plaster rooms by mixing accent into Logo Cream; give every page hero its wine shelf plank.
- **Do** leave a room's empty side empty; set statements and headlines left with generous measure.
- **Do** use denim for every link, primary action, active state and focus ring.
- **Do** tint all shadows wine and keep them ambient and negatively spread.
- **Do** keep reduced-motion graceful: movement drops out, colour and opacity feedback stays.

### Don't:
- **Don't** use pill buttons, 32px+ rounded cards, scalloped section edges, tilted ribbons or hard offset shadows; the Alcove retired them.
- **Don't** set Playfair above weight 500 in headlines, or any display face other than Playfair Display.
- **Don't** use tracked caps for headings or running text.
- **Don't** fill text with imagery or gradients; the closing headline is solid type.
- **Don't** drift to the corporate-charity template: stock imagery, equal tile walls, donate-first urgency.
- **Don't** introduce colour beyond the ten-colour brand palette, or let petal and rose become link colours.
- **Don't** add any claim the status list in the site config does not support.
