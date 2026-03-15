# Adam Calder Personal Website — Design Spec
**Date:** 2026-03-14
**Status:** Approved by Adam

---

## Overview

A high-quality personal portfolio site for Adam Calder, Platform PM at BambooHR. The site must feel creative, polished, and memorable — communicating "I want that guy on my team" to recruiters, colleagues, and collaborators alike. It is emphatically not a standard portfolio.

**Concept:** "The Contestant" — bold, stadium-energy aesthetic anchored by Beast Games Season 1 (contestant #843) as the personality hook. Dark mode by default with a light mode toggle.

**Primary goal:** Leave visitors thinking Adam is highly creative *and* someone they'd want to work with.

---

## Design Principles

- **Creative wrapper, practical core** — the experience impresses on entry but content remains easy to navigate
- **No emojis** — use Font Awesome icons throughout
- **Light + dark mode** — dark is default; toggle uses Apple liquid glass treatment
- **Company logos** — use official logos for all employers/companies mentioned
- **Single-page scroll** — all sections on one page, smooth scroll navigation

---

## Visual Identity

### Typography
- **Display / Headlines:** Barlow Condensed (900 weight) — bold, condensed, stadium feel
- **Body:** Barlow (300–500 weight) — clean, readable
- **Monospace accents (optional):** JetBrains Mono for data/stat callouts

### Color Tokens

| Token | Dark Mode | Light Mode |
|---|---|---|
| Background | `#060810` | `#f4f1ec` |
| Text | `#ffffff` | `#0e0c0a` |
| Accent (blue) | `#1e50ff` | `#1a3fdd` |
| Text muted | `rgba(255,255,255,0.38)` | `rgba(14,12,10,0.38)` |
| Card border | `rgba(30,80,255,0.18)` | `rgba(26,63,221,0.20)` |

### Motion
- **GSAP + ScrollTrigger** for all scroll-driven animations
- **Three.js** for hero depth/particle effects
- Transitions: 0.4s ease for theme switching; spring physics (cubic-bezier 0.34,1.56,0.64,1) for interactive elements
- Scan line animation on hero (subtle, 10s loop)
- Mouse spotlight follows cursor on hero

### Icons
Font Awesome 6 (CDN) — no emojis anywhere on the site.

---

## Light/Dark Toggle

- Position: top-right of the fixed navigation bar
- Treatment: Apple liquid glass — `backdrop-filter: blur(24px) saturate(180%)`, inner highlight, depth shadow
- Active pill: accent-colored glass with glow
- Icons: `fa-moon` (dark) / `fa-sun` (light)
- Transition: 0.35s spring on pill, 0.4s ease on all color tokens

---

## Site Structure (single-page scroll)

### 01 — Hero
**The wow moment.**

- Full-viewport landing section
- Giant `843` watermark (Barlow Condensed 900, near-transparent stroke, breathing animation)
- Left column: eyebrow label ("Platform PM · Builder · #843"), name in massive condensed type with outline variant, tagline, two CTAs — "View Work" scrolls to Section 02, "My Story" scrolls to Section 05
- Right column: player card (Beast Games badge, #843 ghost number, pulsing availability dot, name)
- Mouse-tracking spotlight radial gradient
- Animated scan line (subtle, top-to-bottom loop)
- Custom cursor (small accent-colored dot)
- Fixed nav appears on scroll (logo mark + nav links + theme toggle)

### 02 — Work
**Career showcase, candycode-style.**

Companies (in order): BambooHR, Travelpass Group, Learnexus, Grow.com, TopGolf

For each company:
- Official logo
- Role title + dates
- 2–3 impact stats (e.g. "30+ A/B experiments", "40% faster design cycles")
- Brief one-liner description

Interaction: Companies cycle automatically with a progress indicator; user can also click to jump. Animated transition between active company (slide or fade with GSAP). Active company displayed large; others shown as smaller nav items.

### 03 — Beast Games
**The hook. Nobody else has this.**

- Full-bleed section, high energy
- Large contestant number `#843` as design element
- Adam's Beast Games photos (provided: blue jersey, stage moments, group shots)
- Brief story: what Beast Games is, how Adam got on it, what it says about him
- Amazon Prime / Beast Games logos
- Tone: confident, fun, self-aware

### 04 — What I'm Building
**Living section — AI experiments, side projects, current explorations.**

- Cards layout with hover interactions
- Each card: project name, brief description, tags (AI / PM / Data / Tool), optional link
- Section framed as "always evolving" — not a static achievement list
- Placeholder-ready: designed so Adam can add cards over time without redesigning
- Initial content: Claude Code automations/skills, AI experiments, this website itself

### 05 — About + Skills
**The human behind the work.**

Career arc narrative: Krispy Kreme → TopGolf → BYU-Idaho research → MBA → Grow.com → Learnexus → Travelpass → BambooHR. Told as a story, not a list.

Personal facts woven in: Eagle Scout, MBA, loves data, building with AI, Claude Code enthusiast.

Skills visualization: Constellation / neural network layout. Skills as floating nodes connected by animated lines — like a brain or knowledge graph. Center node is the core skill (Product), satellites orbit around it. Nodes pulse with a glow animation, connection lines have low opacity. Each node shows skill name. Colors vary by category (blue = PM/strategy, purple = AI/building, green = data/analytics). Animates in on scroll via GSAP.

### 06 — Contact
**Simple, confident, no contact form.**

- One strong closing line (e.g. "Let's build something.")
- Email link
- LinkedIn link
- GitHub: https://github.com/acalder-techpm
- Minimal — don't undercut the rest of the site with a cluttered footer

---

## Navigation

- Fixed nav bar appears after scrolling past hero (not visible on initial load)
- Logo mark "AC" left-aligned — text-based, Barlow Condensed 900, letter-spacing 4px, uppercase
- Section links center or right
- Theme toggle right-aligned (liquid glass)
- Smooth scroll to sections on click
- Active section highlighted in nav

---

## Tech Stack

| Layer | Choice | Reason |
|---|---|---|
| Core | Vanilla HTML/CSS/JS | No framework overhead, full control |
| Scroll animations | GSAP + ScrollTrigger | Industry standard, used by candycode and premium sites |
| 3D / hero depth | Three.js | Particle/depth effects on hero |
| Icons | Font Awesome 6 (CDN) | Consistent, no emojis |
| Fonts | Google Fonts (Barlow Condensed, Barlow, JetBrains Mono) | Display + body type system |
| Hosting | Netlify or Vercel | Easy deploy from git |

---

## File Structure

```
personal-website/
├── index.html
├── css/
│   ├── main.css          # Global tokens, reset, typography
│   ├── hero.css          # Hero section
│   ├── work.css          # Work carousel
│   ├── beast-games.css   # Beast Games section
│   ├── building.css      # What I'm Building section
│   ├── about.css         # About + Skills
│   └── contact.css       # Contact + footer
├── js/
│   ├── main.js           # Init, theme toggle, nav show/hide on scroll
│   ├── hero.js           # Three.js scene, mouse spotlight, scan line, hero entrance animation
│   ├── work.js           # Work carousel: cycling logic, GSAP transitions between companies
│   └── scroll.js         # ScrollTrigger entrance animations for sections 03–06 (Beast Games, Building, About, Contact)
├── assets/
│   ├── images/           # Adam's photos, company logos
│   └── fonts/            # Any self-hosted fonts (fallback)
└── docs/
    └── superpowers/specs/
        └── 2026-03-14-personal-website-design.md
```

---

## Content Inventory

### Photos (provided)
- Beast Games jersey portrait (#843)
- Beast Games stage shots (arms raised, podium)
- St Andrews golf course
- Group Beast Games contestant photo

### Company logos needed
- BambooHR — source from official press kit (SVG preferred)
- Travelpass Group — source from official press kit
- Learnexus — source from official press kit
- Grow.com — use original Grow.com logo (not Epicor)
- TopGolf — source from official press kit

### Copy to write during build
- Hero tagline (finalize)
- Beast Games story paragraph
- About/career arc narrative
- "What I'm Building" card descriptions
- Contact closing line

---

## Responsive Scope

**v1: Desktop-first.** Site is designed and optimized for desktop viewports (1280px+). Content must remain readable at tablet sizes but interactions and animations may be simplified. Mobile is out of scope for v1 and will be addressed in a future iteration.

---

## Success Criteria

- Visitor's immediate reaction: "This is not a standard portfolio"
- Smooth 60fps animations on scroll and interaction
- Light and dark mode both feel equally polished
- Mobile-responsive (content readable, interactions gracefully degraded)
- Loads in under 3 seconds
- Passes basic accessibility (contrast ratios, keyboard nav for toggle/links)
