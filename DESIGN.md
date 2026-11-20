---
name: paiva-studios-site
description: Visual identity and build notes for the motion-enhanced Instagram portfolio site for @paiva_studios.
---

# Paiva Studios — Design Identity

A link-in-bio / visual journal site for **João Oliveira (@paiva_studios)**. Content comes from the connected Instagram account. Motion is integrated into that content — there is no separate "motion demo" or repository showcase in the UI.

## Principles

1. **Photography first** — warm, low-contrast surfaces let the images carry the color.
2. **Apple precision** — generous whitespace, restrained type, glass surfaces, spring-like easing, compact nav on scroll.
3. **Pixar warmth** — cinematic light, film-strip texture, rounded shapes, playful sparkles and heart bursts.
4. **Accessible by default** — skip link, labeled controls, visible focus, reduced-motion support.
5. **Motion with meaning** — subtle reveals and feedback that guide attention, never decorate without purpose.
6. **Tokens before components** — colors, radii, and shadows are CSS variables.

## Color tokens (dark default)

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0D0C0B` | Page background |
| `--surface` | `#171613` | Cards / panels |
| `--surface-2` | `#211F1B` | Nested surfaces |
| `--text` | `#F7F4EF` | Primary text |
| `--muted` | `#A9A299` | Secondary text |
| `--line` | `#302D27` | Borders |
| `--accent` | `#E8704A` | Actions, highlights |
| `--accent-2` | `#F2B45C` | Gradients, badges |

Light theme swaps neutrals only; the accent pair stays constant.

## Typography

- Display: system sans, 730, -0.06em, clamp(2.8rem, 7vw, 5.2rem)
- Headings: system sans, 650, -0.025em
- Body: system sans, 1rem / 1.65
- Mono: `ui-monospace, SFMono-Regular, Menlo, monospace` for stats and meta

No web fonts — instant load, works offline.

## Shape & depth

- Radius: 10px badges, 18px cards, 26px panels, 999px pills
- Elevation: soft layered shadows, no heavy black boxes

## Content model

- Profile: `paiva_studios`, João Oliveira, Creator account, 246 followers, 18 posts
- Website (live link-in-bio): https://jpaiva-o.github.io/paiva-studios/
- Gallery: 12 real posts (1 reel + 11 carousels), images cached locally in `assets/`
- Raw source data: `data/posts.json`

## Integrated motion

| Place | Effect | Purpose |
|---|---|---|
| Hero copy | Staggered entrance, 90ms ease-out | Leads the eye from badge to headline to actions |
| Hero background | Canvas particles that drift and lean away from the cursor | Depth without distraction |
| Feature card | Floating cards + animated equalizer reel badge | Signals new content, adds life |
| Gallery | Tiles ease in with a 60ms stagger on load and filter change | Makes filtering feel responsive |
| Post click | Heart burst from the click point, then lightbox transition | Playful "like" feedback that links back to Instagram |
| Between sections | Scrolling name ribbon | Keeps the brand present during long scrolls |
| Top edge | Scroll progress bar | Shows position in the archive |
| Stats | Count-up once on view | Draws attention to real account numbers |
| Header | Condenses into glass on scroll | Keeps navigation present without crowding the viewport |
| Hero photo | Gentle scroll parallax + film-strip texture | Adds cinematic depth (Apple restraint, Pixar warmth) |
| CTA | Warm end-card glow + twinkling stars | Gives the page a memorable, storybook finish |

## Motion rules

- Ease-out for entrances, ease-in for exits; nothing runs more than ~0.8s.
- Stagger related elements by 60–90ms to create choreography.
- Pause the particle canvas when the hero is off-screen.
- Under `prefers-reduced-motion: reduce`, all animation is disabled and content renders immediately in its final state.
- No external animation libraries; CSS keyframes, inline canvas, and the Web Animations API keep the site dependency-free.
