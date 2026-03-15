# Adam Calder Personal Website — Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:subagent-driven-development (if subagents available) or superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a high-quality personal portfolio site for Adam Calder using Vanilla HTML/CSS/JS + GSAP + Three.js with a "The Contestant" aesthetic — dark/light modes, Beast Games as personality anchor, animated work carousel, skills constellation.

**Architecture:** Single `index.html` with all six sections. CSS split by section into focused files imported via `main.css`. JS split into four files: `main.js` (theme/nav), `hero.js` (Three.js + spotlight), `work.js` (GSAP carousel), `scroll.js` (ScrollTrigger for sections 3–6). No build step — all dependencies loaded via CDN.

**Tech Stack:** HTML5, CSS custom properties (design tokens), GSAP 3 + ScrollTrigger, Three.js r160, Font Awesome 6 CDN, Google Fonts (Barlow Condensed, Barlow, JetBrains Mono)

---

## Chunk 1: Foundation — Project Setup, Tokens, Nav

### Task 1: Git init and folder structure

**Files:**
- Create: `index.html`
- Create: `css/main.css`
- Create: `css/hero.css`
- Create: `css/work.css`
- Create: `css/beast-games.css`
- Create: `css/building.css`
- Create: `css/about.css`
- Create: `css/contact.css`
- Create: `js/main.js`
- Create: `js/hero.js`
- Create: `js/work.js`
- Create: `js/scroll.js`
- Create: `assets/images/.gitkeep`

- [ ] **Step 1: Initialize git repo**
```bash
cd /Users/acalder/projects/personal-website
git init
printf "node_modules/\n.DS_Store\n.superpowers/\n" > .gitignore
```

- [ ] **Step 2: Create all empty files**
```bash
mkdir -p css js assets/images assets/fonts
touch css/main.css css/hero.css css/work.css css/beast-games.css css/building.css css/about.css css/contact.css
touch js/main.js js/hero.js js/work.js js/scroll.js
touch assets/images/.gitkeep
```

- [ ] **Step 3: Verify structure**
```bash
find . -not -path './.git/*' -not -path './.superpowers/*' | sort
```
Expected: all files listed above present.

- [ ] **Step 4: Commit**
```bash
git add -A
git commit -m "chore: scaffold project structure"
```

---

### Task 2: HTML skeleton with all six section anchors

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Write the full HTML skeleton**

```html
<!DOCTYPE html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Adam Calder — Platform PM · Builder</title>
  <meta name="description" content="Adam Calder — Platform PM at BambooHR. Builder. Data obsessive. Beast Games Season 1 contestant #843.">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;700;900&family=Barlow:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Icons -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">

  <!-- Styles -->
  <link rel="stylesheet" href="css/main.css">
  <link rel="stylesheet" href="css/hero.css">
  <link rel="stylesheet" href="css/work.css">
  <link rel="stylesheet" href="css/beast-games.css">
  <link rel="stylesheet" href="css/building.css">
  <link rel="stylesheet" href="css/about.css">
  <link rel="stylesheet" href="css/contact.css">
</head>
<body>

  <!-- Custom cursor -->
  <div id="cursor" aria-hidden="true"></div>
  <div id="spotlight" aria-hidden="true"></div>

  <!-- Fixed nav (hidden until scroll) -->
  <nav id="nav" aria-label="Main navigation">
    <div class="nav-inner">
      <a href="#hero" class="nav-logo">AC</a>
      <div class="nav-links">
        <a href="#work" class="nav-link">Work</a>
        <a href="#beast-games" class="nav-link">Beast Games</a>
        <a href="#building" class="nav-link">Building</a>
        <a href="#about" class="nav-link">About</a>
        <a href="#contact" class="nav-link">Contact</a>
      </div>
      <div class="nav-right">
        <button id="theme-toggle" aria-label="Toggle light/dark mode">
          <div class="toggle-track">
            <div class="toggle-slider"></div>
            <span class="toggle-btn" id="dark-btn"><i class="fa-solid fa-moon"></i></span>
            <span class="toggle-btn" id="light-btn"><i class="fa-solid fa-sun"></i></span>
          </div>
        </button>
      </div>
    </div>
  </nav>

  <!-- 01: Hero -->
  <section id="hero" class="section-hero">
    <canvas id="hero-canvas" aria-hidden="true"></canvas>
    <div class="scanline" aria-hidden="true"></div>
    <div class="hero-inner">
      <div class="hero-left">
        <div class="eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">Platform PM · Builder · #843</span>
        </div>
        <h1 class="hero-name">
          <span class="hero-name-solid">Adam</span>
          <span class="hero-name-outline">Calder</span>
        </h1>
        <p class="hero-tagline">Product manager. Builder. Data obsessive.<br>Beast Games contestant. I make things people use.</p>
        <div class="hero-cta">
          <a href="#work" class="btn-primary">View Work</a>
          <a href="#about" class="btn-text">My Story</a>
        </div>
      </div>
      <div class="hero-right">
        <div class="player-card">
          <div class="player-card-header">
            <span class="player-badge">Beast Games S1</span>
            <span class="player-status"><i class="fa-solid fa-circle"></i> Available</span>
          </div>
          <div class="player-card-number" aria-hidden="true">843</div>
          <div class="player-card-name">Adam Calder</div>
        </div>
      </div>
    </div>
    <div class="hero-bg-number" aria-hidden="true">843</div>
  </section>

  <!-- 02: Work -->
  <section id="work" class="section-work">
    <div class="work-inner">
      <div class="section-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">Experience</span>
      </div>
      <div class="work-layout">
        <nav class="work-nav" aria-label="Company navigation">
          <!-- Populated by work.js -->
        </nav>
        <div class="work-display">
          <!-- Populated by work.js -->
        </div>
      </div>
    </div>
  </section>

  <!-- 03: Beast Games -->
  <section id="beast-games" class="section-beast">
    <div class="beast-inner">
      <div class="beast-number" aria-hidden="true">843</div>
      <div class="beast-content">
        <div class="section-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">Beast Games · Season 1</span>
        </div>
        <h2 class="beast-headline">I competed on the<br>world's biggest<br><em>game show.</em></h2>
        <p class="beast-body">
          Beast Games is Amazon Prime's reality competition featuring 1,000 contestants
          competing for $5 million — the largest prize in game show history. I was contestant
          #843. Getting on the show required the same skills that make me good at my job:
          persistence, data, and a willingness to bet on myself.
        </p>
        <div class="beast-logos">
          <img src="assets/images/logo-amazon-prime.svg" alt="Amazon Prime Video" class="beast-logo">
          <img src="assets/images/logo-beast-games.svg" alt="Beast Games" class="beast-logo">
        </div>
      </div>
      <div class="beast-photos">
        <div class="beast-photo-grid">
          <img src="assets/images/beast-jersey-portrait.jpeg" alt="Adam Calder as Beast Games contestant #843" class="beast-photo beast-photo-main">
          <img src="assets/images/beast-stage-arms.jpeg" alt="Adam on stage at Beast Games" class="beast-photo beast-photo-sm">
          <img src="assets/images/beast-stage-podium.jpeg" alt="Adam at the Beast Games podium" class="beast-photo beast-photo-sm">
        </div>
      </div>
    </div>
  </section>

  <!-- 04: What I'm Building -->
  <section id="building" class="section-building">
    <div class="building-inner">
      <div class="section-eyebrow">
        <span class="eyebrow-line"></span>
        <span class="eyebrow-text">What I'm Building</span>
      </div>
      <h2 class="section-headline">Always experimenting.<br>Always shipping.</h2>
      <div class="building-grid">
        <!-- Cards: each card has .build-card with data-tags attribute -->
        <article class="build-card">
          <div class="build-card-header">
            <h3 class="build-card-title">This Website</h3>
            <div class="build-card-tags">
              <span class="tag">Build</span>
              <span class="tag">AI</span>
            </div>
          </div>
          <p class="build-card-desc">Built with Claude Code, GSAP, and Three.js. Zero frameworks, full creative control.</p>
          <a href="https://github.com/acalder-techpm" class="build-card-link" target="_blank" rel="noopener">
            <i class="fa-brands fa-github"></i> View on GitHub
          </a>
        </article>

        <article class="build-card">
          <div class="build-card-header">
            <h3 class="build-card-title">Claude Code Skills</h3>
            <div class="build-card-tags">
              <span class="tag">AI</span>
              <span class="tag">Tool</span>
            </div>
          </div>
          <p class="build-card-desc">Custom Claude Code plugins and automations for PM workflows — MBR drafts, project kickoffs, Jira triage.</p>
        </article>

        <article class="build-card">
          <div class="build-card-header">
            <h3 class="build-card-title">AI Experiments</h3>
            <div class="build-card-tags">
              <span class="tag">AI</span>
              <span class="tag">PM</span>
            </div>
          </div>
          <p class="build-card-desc">Ongoing explorations at the intersection of AI agents, product management, and developer tooling.</p>
        </article>
      </div>
    </div>
  </section>

  <!-- 05: About + Skills -->
  <section id="about" class="section-about">
    <div class="about-inner">
      <div class="about-left">
        <div class="section-eyebrow">
          <span class="eyebrow-line"></span>
          <span class="eyebrow-text">About</span>
        </div>
        <h2 class="section-headline">Builder at heart.<br>PM by trade.</h2>
        <div class="about-story">
          <p>I started my career taking donut orders at Krispy Kreme and running summer programs at TopGolf. I finished my MBA, built an international business database at BYU-Idaho, and stumbled into product management through a love of data and a stubborn need to understand how things work.</p>
          <p>Since then I've shipped data visualization tools at Grow.com, led a video-first AI platform at Learnexus, driven mobile product at Travelpass, and now I'm a Platform PM at BambooHR — working across design systems, AI tooling, and frontend platform infrastructure.</p>
          <p>Eagle Scout. MBA. Beast Games contestant. Chronic builder. I'm most useful at the intersection of product, engineering, and whatever's next.</p>
        </div>
        <div class="about-facts">
          <div class="fact">
            <span class="fact-label">Current role</span>
            <span class="fact-value">Platform PM, BambooHR</span>
          </div>
          <div class="fact">
            <span class="fact-label">Location</span>
            <span class="fact-value">Saratoga Springs, UT</span>
          </div>
          <div class="fact">
            <span class="fact-label">Education</span>
            <span class="fact-value">MBA, Woodbury School of Business</span>
          </div>
          <div class="fact">
            <span class="fact-label">Honors</span>
            <span class="fact-value">Eagle Scout · Beast Games S1 #843</span>
          </div>
        </div>
      </div>
      <div class="about-right">
        <div class="constellation-label">Skills</div>
        <div id="constellation" class="constellation" aria-label="Skills constellation visualization"></div>
      </div>
    </div>
  </section>

  <!-- 06: Contact -->
  <section id="contact" class="section-contact">
    <div class="contact-inner">
      <h2 class="contact-headline">Let's build<br><em>something.</em></h2>
      <p class="contact-sub">Open to conversations about product, AI, platforms, and interesting problems.</p>
      <div class="contact-links">
        <a href="mailto:adam.calder.2018@gmail.com" class="contact-link">
          <i class="fa-solid fa-envelope"></i>
          <span>adam.calder.2018@gmail.com</span>
        </a>
        <a href="https://www.linkedin.com/in/adambcalder/" class="contact-link" target="_blank" rel="noopener">
          <i class="fa-brands fa-linkedin"></i>
          <span>linkedin.com/in/adambcalder</span>
        </a>
        <a href="https://github.com/acalder-techpm" class="contact-link" target="_blank" rel="noopener">
          <i class="fa-brands fa-github"></i>
          <span>github.com/acalder-techpm</span>
        </a>
      </div>
    </div>
  </section>

  <!-- Scripts (CDN) -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r160/three.min.js"></script>

  <!-- App scripts -->
  <script src="js/hero.js"></script>
  <script src="js/work.js"></script>
  <script src="js/scroll.js"></script>
  <script src="js/main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Open in browser to verify structure loads without errors**

Open `index.html` in a browser. Expected: blank page, no console errors, fonts loading (check Network tab).

- [ ] **Step 3: Commit**
```bash
git add index.html
git commit -m "feat: add full HTML skeleton with all six section anchors"
```

---

### Task 3: CSS design tokens and global reset

**Files:**
- Modify: `css/main.css`

- [ ] **Step 1: Write main.css**

```css
/* ─── TOKENS ─── */
:root,
[data-theme="dark"] {
  --bg:           #060810;
  --bg2:          #0c1020;
  --text:         #ffffff;
  --text-muted:   rgba(255, 255, 255, 0.38);
  --text-mid:     rgba(255, 255, 255, 0.6);
  --accent:       #1e50ff;
  --accent-glow:  rgba(30, 80, 255, 0.15);
  --accent-ghost: rgba(30, 80, 255, 0.06);
  --card-bg:      rgba(255, 255, 255, 0.02);
  --card-border:  rgba(30, 80, 255, 0.18);
  --rule:         rgba(255, 255, 255, 0.06);
  --toggle-text:  rgba(255, 255, 255, 0.45);
}

[data-theme="light"] {
  --bg:           #f4f1ec;
  --bg2:          #ede9e1;
  --text:         #0e0c0a;
  --text-muted:   rgba(14, 12, 10, 0.38);
  --text-mid:     rgba(14, 12, 10, 0.55);
  --accent:       #1a3fdd;
  --accent-glow:  rgba(26, 63, 221, 0.08);
  --accent-ghost: rgba(26, 63, 221, 0.04);
  --card-bg:      rgba(255, 255, 255, 0.6);
  --card-border:  rgba(26, 63, 221, 0.2);
  --rule:         rgba(14, 12, 10, 0.08);
  --toggle-text:  rgba(14, 12, 10, 0.45);
}

/* ─── RESET ─── */
*, *::before, *::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg);
  color: var(--text);
  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  line-height: 1.6;
  cursor: none;
  transition: background 0.4s ease, color 0.4s ease;
  overflow-x: hidden;
}

img {
  max-width: 100%;
  display: block;
}

a {
  color: inherit;
  text-decoration: none;
}

/* ─── TYPOGRAPHY ─── */
.display {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  text-transform: uppercase;
  letter-spacing: -0.02em;
}

.mono {
  font-family: 'JetBrains Mono', monospace;
}

.section-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(40px, 5vw, 72px);
  line-height: 1.0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 24px;
}

.section-headline em {
  font-style: italic;
  color: var(--accent);
}

/* ─── SHARED EYEBROW ─── */
.section-eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
}

.eyebrow-line {
  display: block;
  width: 28px;
  height: 1px;
  background: var(--accent);
  flex-shrink: 0;
}

.eyebrow-text {
  font-size: 11px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--accent);
  font-weight: 500;
}

/* ─── SHARED BUTTONS ─── */
.btn-primary {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  background: var(--accent);
  color: #fff;
  padding: 13px 28px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  border: none;
  cursor: none;
  transition: opacity 0.2s, transform 0.15s;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

.btn-text {
  font-size: 11px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 2px;
  cursor: none;
  transition: color 0.2s;
}

.btn-text:hover {
  color: var(--text);
}

/* ─── CUSTOM CURSOR ─── */
#cursor {
  position: fixed;
  width: 7px;
  height: 7px;
  background: var(--accent);
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 9999;
  transition: background 0.4s;
}

/* ─── SPOTLIGHT ─── */
#spotlight {
  position: fixed;
  width: 640px;
  height: 640px;
  border-radius: 50%;
  background: radial-gradient(circle, var(--accent-glow) 0%, transparent 68%);
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 0;
  top: 50%;
  left: 50%;
  transition: background 0.4s;
}

/* ─── NAV ─── */
#nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transform: translateY(-100%);
  transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background 0.4s;
  background: rgba(6, 8, 16, 0.7);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-bottom: 1px solid var(--rule);
}

[data-theme="light"] #nav {
  background: rgba(244, 241, 236, 0.7);
}

#nav.visible {
  transform: translateY(0);
}

.nav-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 48px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: 20px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text);
  transition: color 0.4s;
}

.nav-links {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 10px;
  letter-spacing: 2.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  transition: color 0.2s;
  cursor: none;
}

.nav-link:hover,
.nav-link.active {
  color: var(--text);
}

/* ─── THEME TOGGLE ─── */
#theme-toggle {
  background: none;
  border: none;
  cursor: none;
  padding: 0;
}

.toggle-track {
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  border-radius: 100px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px) saturate(180%);
  -webkit-backdrop-filter: blur(24px) saturate(180%);
  border: 1px solid rgba(255, 255, 255, 0.14);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(0, 0, 0, 0.08),
    0 4px 20px rgba(0, 0, 0, 0.18);
  transition: background 0.4s, border-color 0.4s, box-shadow 0.4s;
}

[data-theme="light"] .toggle-track {
  background: rgba(255, 255, 255, 0.45);
  border-color: rgba(255, 255, 255, 0.7);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(0, 0, 0, 0.04),
    0 4px 20px rgba(0, 0, 0, 0.08);
}

.toggle-slider {
  position: absolute;
  width: 32px;
  height: 26px;
  border-radius: 100px;
  background: var(--accent);
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.3),
    0 2px 8px rgba(30, 80, 255, 0.45);
  transition: transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), background 0.4s;
  pointer-events: none;
}

[data-theme="dark"]  .toggle-slider { transform: translateX(0); }
[data-theme="light"] .toggle-slider { transform: translateX(36px); }

.toggle-btn {
  width: 32px;
  height: 26px;
  border-radius: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: var(--toggle-text);
  position: relative;
  z-index: 1;
  transition: color 0.25s;
}

[data-theme="dark"]  #dark-btn  { color: #fff; }
[data-theme="light"] #light-btn { color: #fff; }

/* ─── SECTION BASE ─── */
section {
  position: relative;
}
```

- [ ] **Step 2: Open in browser, verify body background is dark `#060810`, fonts load**

- [ ] **Step 3: Commit**
```bash
git add css/main.css
git commit -m "feat: add CSS design tokens, reset, nav, and shared components"
```

---

### Task 4: Theme toggle and nav scroll behavior (main.js)

**Files:**
- Modify: `js/main.js`

- [ ] **Step 1: Write main.js**

```js
(function () {
  const html       = document.documentElement;
  const nav        = document.getElementById('nav');
  const toggle     = document.getElementById('theme-toggle');
  const cursor     = document.getElementById('cursor');
  const spotlight  = document.getElementById('spotlight');
  const navLinks   = document.querySelectorAll('.nav-link');
  const sections   = document.querySelectorAll('section[id]');

  // ── Cursor
  document.addEventListener('mousemove', (e) => {
    cursor.style.left     = e.clientX + 'px';
    cursor.style.top      = e.clientY + 'px';
    spotlight.style.left  = e.clientX + 'px';
    spotlight.style.top   = e.clientY + 'px';
  });

  // Only show spotlight on hero
  const heroSection = document.getElementById('hero');
  const spotlightEl = spotlight;

  window.addEventListener('scroll', () => {
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    spotlightEl.style.opacity = heroBottom > 0 ? '1' : '0';
  });

  // ── Nav: show after scrolling past hero
  const heroEl = document.getElementById('hero');
  const navObserver = new IntersectionObserver(
    ([entry]) => nav.classList.toggle('visible', !entry.isIntersecting),
    { threshold: 0 }
  );
  navObserver.observe(heroEl);

  // ── Active nav link on scroll
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
          });
        }
      });
    },
    { threshold: 0.4 }
  );
  sections.forEach((s) => sectionObserver.observe(s));

  // ── Theme toggle
  toggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
  });

  // ── Smooth scroll for anchor links (supplement native scroll-behavior)
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
})();
```

- [ ] **Step 2: Open in browser. Scroll down — nav should slide in. Click theme toggle — background should flip between dark/light. Cursor dot should follow mouse.**

- [ ] **Step 3: Commit**
```bash
git add js/main.js
git commit -m "feat: theme toggle, nav scroll behavior, cursor tracking"
```

---

## Chunk 2: Hero Section

### Task 5: Hero layout and styles

**Files:**
- Modify: `css/hero.css`

- [ ] **Step 1: Write hero.css**

```css
/* ─── HERO SECTION ─── */
.section-hero {
  position: relative;
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  overflow: hidden;
}

#hero-canvas {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  opacity: 0.6;
}

/* Scan line */
.scanline {
  position: absolute;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    var(--accent) 30%,
    var(--accent) 70%,
    transparent 100%
  );
  opacity: 0.18;
  animation: scan 10s linear infinite;
  pointer-events: none;
  z-index: 2;
}

@keyframes scan {
  0%   { top: -2px; opacity: 0; }
  3%   { opacity: 0.18; }
  97%  { opacity: 0.18; }
  100% { top: 100vh; opacity: 0; }
}

/* Giant watermark number */
.hero-bg-number {
  position: absolute;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(240px, 38vw, 540px);
  color: transparent;
  -webkit-text-stroke: 1px var(--card-border);
  line-height: 1;
  right: -2vw;
  top: 50%;
  transform: translateY(-50%);
  user-select: none;
  pointer-events: none;
  z-index: 0;
  animation: breathe 7s ease-in-out infinite;
  transition: -webkit-text-stroke 0.4s;
}

@keyframes breathe {
  0%, 100% { opacity: 0.7; transform: translateY(-50%) scale(1); }
  50%       { opacity: 1;   transform: translateY(-50%) scale(1.015); }
}

/* Hero content wrapper */
.hero-inner {
  position: relative;
  z-index: 5;
  display: contents;
}

/* Left column */
.hero-left {
  padding: 0 6vw;
  position: relative;
  z-index: 5;
}

.eyebrow {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 28px;
}

.hero-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(64px, 9vw, 120px);
  line-height: 0.9;
  letter-spacing: -0.02em;
  text-transform: uppercase;
  margin-bottom: 28px;
}

.hero-name-solid {
  display: block;
  color: var(--text);
  transition: color 0.4s;
}

.hero-name-outline {
  display: block;
  color: transparent;
  -webkit-text-stroke: 1.5px var(--card-border);
  transition: -webkit-text-stroke 0.4s;
}

.hero-tagline {
  font-size: clamp(14px, 1.4vw, 17px);
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 400px;
  margin-bottom: 40px;
  font-weight: 300;
}

.hero-cta {
  display: flex;
  align-items: center;
  gap: 28px;
}

/* Right column: player card */
.hero-right {
  position: relative;
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
}

.player-card {
  position: relative;
  width: clamp(180px, 22vw, 300px);
  aspect-ratio: 2 / 3;
  border: 1px solid var(--card-border);
  background: var(--card-bg);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  padding: 24px;
  overflow: hidden;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: border-color 0.4s, background 0.4s;
}

.player-card::before {
  content: '';
  position: absolute;
  inset: 0;
  border: 1px solid var(--accent-ghost);
  transform: scale(0.93);
  pointer-events: none;
}

.player-card-header {
  position: absolute;
  top: 18px;
  left: 18px;
  right: 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.player-badge {
  font-size: 8px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--card-border);
  padding: 3px 7px;
}

.player-status {
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 8px;
  letter-spacing: 1.5px;
  color: var(--text-muted);
  text-transform: uppercase;
}

.player-status i {
  font-size: 6px;
  color: var(--accent);
  animation: pulse 2.5s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% { opacity: 1;   transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.75); }
}

.player-card-number {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -58%);
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(72px, 11vw, 150px);
  color: var(--text-muted);
  opacity: 0.12;
  letter-spacing: -0.04em;
  line-height: 1;
  user-select: none;
}

.player-card-name {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: clamp(14px, 1.8vw, 20px);
  letter-spacing: 5px;
  text-transform: uppercase;
  color: var(--text-mid);
  text-align: center;
  position: relative;
  z-index: 2;
}
```

- [ ] **Step 2: Open in browser. Verify hero fills viewport, name is large, player card is visible on the right, 843 watermark is behind content.**

- [ ] **Step 3: Commit**
```bash
git add css/hero.css
git commit -m "feat: hero section layout and styles"
```

---

### Task 6: Three.js particle scene (hero.js)

**Files:**
- Modify: `js/hero.js`

- [ ] **Step 1: Write hero.js**

```js
(function () {
  if (typeof THREE === 'undefined') return;

  const canvas   = document.getElementById('hero-canvas');
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);

  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.z = 4;

  // Particle geometry
  const COUNT    = 180;
  const positions = new Float32Array(COUNT * 3);
  for (let i = 0; i < COUNT; i++) {
    positions[i * 3]     = (Math.random() - 0.5) * 10;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 6;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

  const material = new THREE.PointsMaterial({
    color:       0x1e50ff,
    size:        0.025,
    transparent: true,
    opacity:     0.55,
    sizeAttenuation: true,
  });

  const particles = new THREE.Points(geometry, material);
  scene.add(particles);

  // Mouse-reactive rotation
  let targetX = 0;
  let targetY = 0;

  document.addEventListener('mousemove', (e) => {
    targetX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
    targetY = (e.clientY / window.innerHeight - 0.5) * 0.2;
  });

  // Resize
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Sync particle color with theme
  function syncTheme() {
    const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
    material.color.set(isDark ? 0x1e50ff : 0x1a3fdd);
    material.opacity = isDark ? 0.55 : 0.35;
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) themeToggle.addEventListener('click', syncTheme);

  // Animate
  let frameId;
  function animate() {
    frameId = requestAnimationFrame(animate);
    particles.rotation.y += (targetX - particles.rotation.y) * 0.05;
    particles.rotation.x += (targetY - particles.rotation.x) * 0.05;
    particles.rotation.z += 0.0008;
    renderer.render(scene, camera);
  }

  // Only animate when hero is in view
  const heroSection = document.getElementById('hero');
  const visibilityObserver = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        animate();
      } else {
        cancelAnimationFrame(frameId);
      }
    },
    { threshold: 0 }
  );
  visibilityObserver.observe(heroSection);
})();
```

- [ ] **Step 2: Open in browser. Verify subtle blue particles appear behind the hero content. Move mouse — particles should rotate gently. No console errors.**

- [ ] **Step 3: Commit**
```bash
git add js/hero.js
git commit -m "feat: Three.js particle scene on hero with mouse-reactive rotation"
```

---

## Chunk 3: Work Carousel

### Task 7: Work section styles

**Files:**
- Modify: `css/work.css`

- [ ] **Step 1: Write work.css**

```css
.section-work {
  min-height: 100vh;
  padding: 120px 0;
  position: relative;
}

.work-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
}

.work-layout {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 80px;
  align-items: start;
  margin-top: 48px;
}

/* Left: company nav */
.work-nav {
  position: sticky;
  top: 100px;
}

.work-nav-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 0;
  border-bottom: 1px solid var(--rule);
  cursor: none;
  transition: opacity 0.2s;
  opacity: 0.35;
}

.work-nav-item.active {
  opacity: 1;
}

.work-nav-item:hover {
  opacity: 0.7;
}

.work-nav-item.active:hover {
  opacity: 1;
}

.work-nav-logo {
  width: 32px;
  height: 32px;
  object-fit: contain;
  filter: grayscale(1);
  transition: filter 0.3s;
  flex-shrink: 0;
}

.work-nav-item.active .work-nav-logo {
  filter: grayscale(0);
}

[data-theme="light"] .work-nav-logo {
  filter: grayscale(1) brightness(0.4);
}

[data-theme="light"] .work-nav-item.active .work-nav-logo {
  filter: grayscale(0);
}

.work-nav-meta {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.work-nav-company {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  transition: color 0.4s;
}

.work-nav-dates {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--text-muted);
  transition: color 0.4s;
}

/* Progress bar */
.work-nav-progress {
  position: absolute;
  left: -16px;
  top: 0;
  width: 2px;
  height: 0;
  background: var(--accent);
  transition: height 0.6s ease;
}

.work-nav-item.active .work-nav-progress {
  height: 100%;
}

/* Right: active company display */
.work-display {
  min-height: 400px;
  position: relative;
}

.work-entry {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
}

.work-entry.active {
  opacity: 1;
  transform: translateY(0);
  pointer-events: auto;
  position: relative;
}

.work-logo-large {
  height: 48px;
  width: auto;
  object-fit: contain;
  margin-bottom: 24px;
  filter: brightness(0) invert(1);
  transition: filter 0.4s;
}

[data-theme="light"] .work-logo-large {
  filter: brightness(0);
}

.work-role {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 3.5vw, 48px);
  text-transform: uppercase;
  letter-spacing: -0.01em;
  color: var(--text);
  margin-bottom: 4px;
}

.work-dates {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  color: var(--accent);
  margin-bottom: 20px;
  letter-spacing: 1px;
}

.work-desc {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.8;
  max-width: 560px;
  margin-bottom: 32px;
}

.work-stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.work-stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.work-stat-value {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(28px, 3vw, 40px);
  color: var(--text);
  letter-spacing: -0.02em;
}

.work-stat-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  color: var(--text-muted);
  letter-spacing: 1px;
  text-transform: uppercase;
}
```

- [ ] **Step 2: Verify section takes shape (empty until work.js populates it)**

- [ ] **Step 3: Commit**
```bash
git add css/work.css
git commit -m "feat: work section styles"
```

---

### Task 8: Work carousel data and GSAP logic

**Files:**
- Modify: `js/work.js`

- [ ] **Step 1: Source company logos**

Download or inline SVG logos. Save to `assets/images/`:
- `logo-bamboohr.svg` — from bamboohr.com press kit or Clearbit logo API
- `logo-travelpass.svg` — from travelpass press materials
- `logo-learnexus.svg` — from learnexus.com or Clearbit
- `logo-grow.svg` — original Grow.com logo (pre-Epicor)
- `logo-topgolf.svg` — from topgolf.com press kit

Use Clearbit Logo API as a fallback: `https://logo.clearbit.com/bamboohr.com` (returns PNG)

For SVGs not available, use PNG from Clearbit and save as `.png` (update references in work.js accordingly).

- [ ] **Step 2: Write work.js**

```js
(function () {
  const COMPANIES = [
    {
      id:      'bamboohr',
      name:    'BambooHR',
      logo:    'assets/images/logo-bamboohr.svg',
      role:    'Product Manager — Platform & AI',
      dates:   'Jul 2025 — Present',
      desc:    'Leading platform PM work across design systems, AI tooling, accessibility, and frontend infrastructure. Spanning three teams: design system, FE core libs, and AI-assisted SDLC.',
      stats:   [
        { value: '3',    label: 'Teams' },
        { value: 'P2',   label: 'Level' },
        { value: 'AI',   label: 'Focus' },
      ],
    },
    {
      id:      'travelpass',
      name:    'Travelpass Group',
      logo:    'assets/images/logo-travelpass.svg',
      role:    'Senior Product Manager',
      dates:   'Jan 2024 — Jul 2025',
      desc:    'Led mobile product strategy across iOS and Android — content exploration, social engagement, and community. Introduced GPT-powered tools that cut design feedback cycles by 40%.',
      stats:   [
        { value: '30+',  label: 'A/B Experiments' },
        { value: '40%',  label: 'Faster Feedback' },
        { value: '4hr',  label: 'Saved Weekly' },
      ],
    },
    {
      id:      'learnexus',
      name:    'Learnexus',
      logo:    'assets/images/logo-learnexus.svg',
      role:    'Director of Product Management',
      dates:   'Jul 2022 — Jan 2024',
      desc:    'Transformed a talent marketplace into a video-first, AI-driven platform. Championed AI features from content generation to chatbots, improving match accuracy and user satisfaction.',
      stats:   [
        { value: '20%',  label: 'Match Accuracy' },
        { value: '25%',  label: 'User Satisfaction' },
        { value: 'AI',   label: 'First Platform' },
      ],
    },
    {
      id:      'grow',
      name:    'Grow.com',
      logo:    'assets/images/logo-grow.svg',
      role:    'Product Manager — Data Visualization',
      dates:   'May 2021 — Jul 2022',
      desc:    'Led data visualization for a full-stack BI platform. Released 20 new features, reduced customer-reported issues by 50%, and established 25+ KPIs for team and app performance.',
      stats:   [
        { value: '20',   label: 'Features Shipped' },
        { value: '50%',  label: 'Fewer Issues' },
        { value: '25+',  label: 'KPIs Established' },
      ],
    },
    {
      id:      'topgolf',
      name:    'TopGolf',
      logo:    'assets/images/logo-topgolf.svg',
      role:    'Business Strategy Intern',
      dates:   'Apr 2017 — Sep 2019',
      desc:    'Grew the summer academy program by 200%, saved $35K annually through cost analysis, and networked $25K in charitable donations. First lesson in using data to make decisions.',
      stats:   [
        { value: '200%', label: 'Program Growth' },
        { value: '$35K', label: 'Annual Savings' },
        { value: '$25K', label: 'Donations' },
      ],
    },
  ];

  const navEl     = document.querySelector('.work-nav');
  const displayEl = document.querySelector('.work-display');

  if (!navEl || !displayEl) return;

  // Build nav items
  COMPANIES.forEach((co, i) => {
    const item = document.createElement('div');
    item.className = 'work-nav-item' + (i === 0 ? ' active' : '');
    item.dataset.id = co.id;
    item.innerHTML = `
      <div class="work-nav-progress"></div>
      <img src="${co.logo}" alt="${co.name} logo" class="work-nav-logo" onerror="this.style.display='none'">
      <div class="work-nav-meta">
        <span class="work-nav-company">${co.name}</span>
        <span class="work-nav-dates">${co.dates}</span>
      </div>
    `;
    item.addEventListener('click', () => activate(co.id));
    navEl.appendChild(item);
  });

  // Build display entries
  COMPANIES.forEach((co, i) => {
    const entry = document.createElement('div');
    entry.className = 'work-entry' + (i === 0 ? ' active' : '');
    entry.dataset.id = co.id;
    entry.innerHTML = `
      <img src="${co.logo}" alt="${co.name}" class="work-logo-large" onerror="this.style.display='none'">
      <div class="work-role">${co.role}</div>
      <div class="work-dates">${co.dates}</div>
      <p class="work-desc">${co.desc}</p>
      <div class="work-stats">
        ${co.stats.map(s => `
          <div class="work-stat">
            <span class="work-stat-value">${s.value}</span>
            <span class="work-stat-label">${s.label}</span>
          </div>
        `).join('')}
      </div>
    `;
    displayEl.appendChild(entry);
  });

  let currentId = COMPANIES[0].id;
  let autoTimer;
  let isAnimating = false;

  function activate(id) {
    if (id === currentId || isAnimating) return;
    isAnimating = true;

    const outEntry = displayEl.querySelector(`.work-entry[data-id="${currentId}"]`);
    const inEntry  = displayEl.querySelector(`.work-entry[data-id="${id}"]`);

    currentId = id;

    document.querySelectorAll('.work-nav-item').forEach((el) => {
      el.classList.toggle('active', el.dataset.id === id);
    });

    // GSAP crossfade: out current, in next
    gsap.timeline({ onComplete: () => { isAnimating = false; } })
      .to(outEntry, { opacity: 0, y: -12, duration: 0.3, ease: 'power2.in', onComplete: () => {
        outEntry.classList.remove('active');
        inEntry.classList.add('active');
        gsap.set(inEntry, { opacity: 0, y: 16 });
      }})
      .to(inEntry, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
  }

  // Auto-cycle every 5s
  function startAuto() {
    autoTimer = setInterval(() => {
      const idx  = COMPANIES.findIndex((c) => c.id === currentId);
      const next = COMPANIES[(idx + 1) % COMPANIES.length].id;
      activate(next);
    }, 5000);
  }

  navEl.addEventListener('click', () => {
    clearInterval(autoTimer);
  });

  startAuto();
})();
```

- [ ] **Step 3: Open in browser. Verify work section shows first company. Wait 5s — should auto-advance. Click a company in the nav — should jump to it.**

- [ ] **Step 4: Commit**
```bash
git add css/work.css js/work.js assets/images/
git commit -m "feat: work carousel with auto-cycle and GSAP transitions"
```

---

## Chunk 4: Beast Games Section

### Task 9: Beast Games styles and content

**Files:**
- Modify: `css/beast-games.css`

- [ ] **Step 1: Copy Adam's photos to assets/images/**

Photos provided:
- `assets/images/beast-jersey-portrait.jpeg` — the official Amazon Prime portrait (#843)
- `assets/images/beast-stage-arms.jpeg` — arms raised on stage
- `assets/images/beast-stage-podium.jpeg` — leaning on podium

Source files are in `/Users/acalder/Downloads/`. Copy them:
```bash
cp "/Users/acalder/Downloads/1d9ccba7-25ce-4907-8b16-91111c1721b7.jpeg" assets/images/beast-jersey-portrait.jpeg
cp "/Users/acalder/Downloads/IMG_8655.JPG" assets/images/beast-stage-arms.jpeg
cp "/Users/acalder/Downloads/IMG_8656.JPG" assets/images/beast-stage-podium.jpeg
```

- [ ] **Step 2: Write beast-games.css**

```css
.section-beast {
  min-height: 100vh;
  padding: 120px 0;
  background: var(--bg2);
  position: relative;
  overflow: hidden;
  transition: background 0.4s;
}

/* Giant watermark number */
.beast-number {
  position: absolute;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(200px, 35vw, 500px);
  color: transparent;
  -webkit-text-stroke: 1px rgba(30, 80, 255, 0.08);
  line-height: 1;
  left: -2vw;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  user-select: none;
}

.beast-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  position: relative;
  z-index: 2;
}

.beast-content { }

.beast-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(44px, 5.5vw, 80px);
  line-height: 1.0;
  text-transform: uppercase;
  letter-spacing: -0.02em;
  color: var(--text);
  margin-bottom: 24px;
}

.beast-headline em {
  color: var(--accent);
  font-style: italic;
}

.beast-body {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.9;
  max-width: 480px;
  margin-bottom: 36px;
}

.beast-logos {
  display: flex;
  align-items: center;
  gap: 24px;
}

.beast-logo {
  height: 28px;
  width: auto;
  object-fit: contain;
  filter: brightness(0) invert(1);
  opacity: 0.5;
  transition: opacity 0.2s, filter 0.4s;
}

[data-theme="light"] .beast-logo {
  filter: brightness(0);
}

.beast-logo:hover {
  opacity: 0.9;
}

/* Photo grid */
.beast-photos { }

.beast-photo-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: 12px;
}

.beast-photo {
  width: 100%;
  object-fit: cover;
  border-radius: 2px;
}

.beast-photo-main {
  grid-column: 1;
  grid-row: 1 / 3;
  aspect-ratio: 2 / 3;
}

.beast-photo-sm {
  grid-column: 2;
  aspect-ratio: 4 / 3;
}
```

- [ ] **Step 3: Source Amazon Prime and Beast Games logos**

These are referenced in the HTML skeleton. Download or save as SVG/PNG:
```bash
# Amazon Prime Video wordmark (white version)
curl -o assets/images/logo-amazon-prime.svg "https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg"
# Beast Games logo — save a PNG copy from official press materials or use a text fallback
# If logo unavailable, the onerror handler will hide the img tag gracefully
```

If the SVG URLs are unavailable, leave the `<img>` tags in the HTML — they already have `alt` text and will degrade gracefully with a broken-image state. Revisit once official assets are obtained.

- [ ] **Step 4: Open in browser. Verify Beast Games section shows headline, body copy, and photos in a grid layout.**

- [ ] **Step 5: Commit**
```bash
git add css/beast-games.css assets/images/beast-* assets/images/logo-amazon-prime.*
git commit -m "feat: Beast Games section styles and photo grid"
```

---

## Chunk 5: What I'm Building Section

### Task 10: Building section styles

**Files:**
- Modify: `css/building.css`

- [ ] **Step 1: Write building.css**

```css
.section-building {
  min-height: 60vh;
  padding: 120px 0;
}

.building-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
}

.building-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.build-card {
  border: 1px solid var(--rule);
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 12px;
  transition: border-color 0.25s, transform 0.25s;
  cursor: none;
}

.build-card:hover {
  border-color: var(--card-border);
  transform: translateY(-4px);
}

.build-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.build-card-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  color: var(--text);
}

.build-card-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  justify-content: flex-end;
}

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  border: 1px solid var(--card-border);
  padding: 2px 7px;
  border-radius: 2px;
}

.build-card-desc {
  font-size: 13px;
  color: var(--text-muted);
  line-height: 1.7;
  flex: 1;
}

.build-card-link {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 11px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--accent);
  margin-top: 4px;
  transition: opacity 0.2s;
  cursor: none;
}

.build-card-link:hover { opacity: 0.7; }
```

- [ ] **Step 2: Verify three cards display in a row, hover lifts them.**

- [ ] **Step 3: Commit**
```bash
git add css/building.css
git commit -m "feat: What I'm Building section card styles"
```

---

## Chunk 6: About + Skills Constellation

### Task 11: About section styles

**Files:**
- Modify: `css/about.css`

- [ ] **Step 1: Write about.css**

```css
.section-about {
  min-height: 100vh;
  padding: 120px 0;
  background: var(--bg2);
  transition: background 0.4s;
}

.about-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.about-story {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 40px;
}

.about-story p {
  font-size: 15px;
  color: var(--text-muted);
  line-height: 1.9;
}

.about-facts {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px 32px;
}

.fact {
  display: flex;
  flex-direction: column;
  gap: 4px;
  border-top: 1px solid var(--rule);
  padding-top: 12px;
}

.fact-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: var(--text-muted);
}

.fact-value {
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
}

/* ── Constellation ── */
.about-right {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.constellation-label {
  font-size: 9px;
  letter-spacing: 4px;
  text-transform: uppercase;
  color: var(--text-muted);
  align-self: flex-start;
}

.constellation {
  width: 100%;
  aspect-ratio: 1;
  position: relative;
  max-width: 500px;
}

.constellation svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
}

.c-node {
  position: absolute;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 7px;
  cursor: default;
}

.c-dot {
  border-radius: 50%;
  position: relative;
}

.c-dot::after {
  content: '';
  position: absolute;
  inset: -4px;
  border-radius: 50%;
  background: inherit;
  opacity: 0.2;
  animation: ring-pulse 3s ease-in-out infinite;
}

@keyframes ring-pulse {
  0%, 100% { transform: scale(1);   opacity: 0.2; }
  50%       { transform: scale(1.6); opacity: 0; }
}

.c-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: var(--text-muted);
  white-space: nowrap;
  transition: color 0.4s;
}

.c-node:hover .c-label { color: var(--text); }
.c-node:hover .c-dot   { transform: scale(1.2); }
.c-dot { transition: transform 0.2s; }
```

- [ ] **Step 2: Verify about section renders (constellation area will be empty until scroll.js)**

- [ ] **Step 3: Commit**
```bash
git add css/about.css
git commit -m "feat: about section and constellation container styles"
```

---

### Task 12: Constellation SVG + GSAP animation (scroll.js)

**Files:**
- Modify: `js/scroll.js`

- [ ] **Step 1: Write scroll.js**

```js
(function () {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

  gsap.registerPlugin(ScrollTrigger);

  // ── Constellation data
  const NODES = [
    { id: 'product',    label: 'Product',      x: 50,  y: 50,  r: 14, color: '#1e50ff', delay: 0    },
    { id: 'ai',         label: 'AI / LLMs',    x: 22,  y: 24,  r: 10, color: '#1e50ff', delay: 0.1  },
    { id: 'data',       label: 'Data',         x: 78,  y: 24,  r: 10, color: '#3fb950', delay: 0.15 },
    { id: 'building',   label: 'Building',     x: 82,  y: 62,  r: 9,  color: '#bc8cff', delay: 0.2  },
    { id: 'strategy',   label: 'Strategy',     x: 18,  y: 62,  r: 9,  color: '#1e50ff', delay: 0.25 },
    { id: 'analytics',  label: 'Analytics',    x: 50,  y: 84,  r: 8,  color: '#3fb950', delay: 0.3  },
    { id: 'a11y',       label: 'Accessibility',x: 50,  y: 14,  r: 7,  color: '#bc8cff', delay: 0.35 },
    { id: 'testing',    label: 'A/B Testing',  x: 82,  y: 40,  r: 7,  color: '#3fb950', delay: 0.4  },
    { id: 'leadership', label: 'Leadership',   x: 18,  y: 40,  r: 7,  color: '#1e50ff', delay: 0.45 },
  ];

  // Edges: pairs of node IDs
  const EDGES = [
    ['product', 'ai'],
    ['product', 'data'],
    ['product', 'building'],
    ['product', 'strategy'],
    ['product', 'analytics'],
    ['product', 'a11y'],
    ['product', 'testing'],
    ['product', 'leadership'],
    ['ai',      'building'],
    ['data',    'analytics'],
    ['data',    'testing'],
    ['strategy','leadership'],
  ];

  function buildConstellation() {
    const container = document.getElementById('constellation');
    if (!container) return;

    // SVG for edge lines only — positioned absolutely over the container
    const ns  = 'http://www.w3.org/2000/svg';
    const svg = document.createElementNS(ns, 'svg');
    svg.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;overflow:visible;pointer-events:none;';
    container.appendChild(svg);

    // Draw edges (coordinates are percentages of container size, resolved at draw time)
    const rect = container.getBoundingClientRect();
    const W    = rect.width  || 400;
    const H    = rect.height || 400;

    EDGES.forEach(([aId, bId]) => {
      const a = NODES.find((n) => n.id === aId);
      const b = NODES.find((n) => n.id === bId);
      if (!a || !b) return;
      const line = document.createElementNS(ns, 'line');
      line.setAttribute('x1', (a.x / 100) * W);
      line.setAttribute('y1', (a.y / 100) * H);
      line.setAttribute('x2', (b.x / 100) * W);
      line.setAttribute('y2', (b.y / 100) * H);
      line.setAttribute('stroke', 'rgba(30,80,255,0.18)');
      line.setAttribute('stroke-width', '1');
      line.style.opacity = '0';
      line.dataset.edge   = 'true';
      svg.appendChild(line);
    });

    // Draw nodes as absolutely-positioned divs (correct centering, no foreignObject quirks)
    NODES.forEach((node) => {
      const wrapper = document.createElement('div');
      wrapper.className = 'c-node';
      // Position center of node at (x%, y%) of container
      wrapper.style.cssText = `left:${node.x}%;top:${node.y}%;`;
      wrapper.style.opacity = '0';
      wrapper.dataset.nodeDelay = node.delay;

      const dot = document.createElement('div');
      dot.className = 'c-dot';
      dot.style.cssText = `
        width:${node.r * 2}px;
        height:${node.r * 2}px;
        background:${node.color};
        box-shadow:0 0 ${node.r * 2}px ${node.color}66;
        animation-duration:${(2.5 + Math.random()).toFixed(2)}s;
        animation-delay:${node.delay}s;
      `;

      const label = document.createElement('span');
      label.className = 'c-label';
      label.textContent = node.label;

      wrapper.appendChild(dot);
      wrapper.appendChild(label);
      container.appendChild(wrapper);
    });

    return { svg, container };
  }

  const built = buildConstellation();

  // ── Constellation scroll animation
  ScrollTrigger.create({
    trigger: '#constellation',
    start:   'top 75%',
    onEnter: () => {
      if (!built) return;
      const { svg, container } = built;

      const edges = svg.querySelectorAll('[data-edge]');
      const nodes = container.querySelectorAll('.c-node');

      gsap.to(edges, {
        opacity: 1,
        duration: 0.8,
        stagger:  0.05,
        ease:    'power2.out',
      });

      nodes.forEach((node) => {
        gsap.to(node, {
          opacity:  1,
          duration: 0.6,
          delay:    parseFloat(node.dataset.nodeDelay) + 0.2,
          ease:    'back.out(1.4)',
        });
      });
    },
  });

  // ── Section entrance animations
  const fadeUpSections = ['#beast-games', '#building', '#about', '#contact'];

  fadeUpSections.forEach((sel) => {
    const el = document.querySelector(sel);
    if (!el) return;

    gsap.from(el.querySelector('.section-eyebrow, .beast-content, .building-inner, .about-inner, .contact-inner'), {
      scrollTrigger: {
        trigger: sel,
        start:   'top 80%',
      },
      y:        40,
      opacity:  0,
      duration: 0.8,
      ease:     'power3.out',
    });
  });

  // Beast Games: stagger content and photos
  gsap.from('.beast-content > *', {
    scrollTrigger: { trigger: '#beast-games', start: 'top 75%' },
    y:       32,
    opacity: 0,
    duration: 0.7,
    stagger:  0.1,
    ease:    'power3.out',
  });

  gsap.from('.beast-photo', {
    scrollTrigger: { trigger: '#beast-games', start: 'top 65%' },
    y:       24,
    opacity: 0,
    duration: 0.7,
    stagger:  0.12,
    ease:    'power3.out',
  });

  // Building cards
  gsap.from('.build-card', {
    scrollTrigger: { trigger: '#building', start: 'top 75%' },
    y:       32,
    opacity: 0,
    duration: 0.6,
    stagger:  0.1,
    ease:    'power3.out',
  });

  // Work section entrance
  gsap.from('#work .section-eyebrow', {
    scrollTrigger: { trigger: '#work', start: 'top 80%' },
    y:       24,
    opacity: 0,
    duration: 0.7,
    ease:    'power3.out',
  });

  gsap.from('.work-layout', {
    scrollTrigger: { trigger: '#work', start: 'top 70%' },
    y:       40,
    opacity: 0,
    duration: 0.8,
    ease:    'power3.out',
  });

  // Contact entrance
  gsap.from('.contact-inner > *', {
    scrollTrigger: { trigger: '#contact', start: 'top 80%' },
    y:       32,
    opacity: 0,
    duration: 0.7,
    stagger:  0.12,
    ease:    'power3.out',
  });
})();
```

- [ ] **Step 2: Open in browser. Scroll to About section — constellation nodes should fade/scale in, connected by lines. Scroll to other sections — elements should animate up on entry.**

- [ ] **Step 3: Commit**
```bash
git add js/scroll.js css/about.css
git commit -m "feat: skills constellation and ScrollTrigger entrance animations"
```

---

## Chunk 7: Contact Section + Final Polish

### Task 13: Contact section styles

**Files:**
- Modify: `css/contact.css`

- [ ] **Step 1: Write contact.css**

```css
.section-contact {
  min-height: 60vh;
  padding: 120px 0;
  display: flex;
  align-items: center;
}

.contact-inner {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 6vw;
}

.contact-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 900;
  font-size: clamp(56px, 8vw, 120px);
  line-height: 0.95;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  color: var(--text);
  margin-bottom: 24px;
}

.contact-headline em {
  color: var(--accent);
  font-style: italic;
}

.contact-sub {
  font-size: 15px;
  color: var(--text-muted);
  max-width: 480px;
  line-height: 1.8;
  margin-bottom: 48px;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.contact-link {
  display: inline-flex;
  align-items: center;
  gap: 14px;
  font-size: 15px;
  color: var(--text-muted);
  border-bottom: 1px solid var(--rule);
  padding-bottom: 16px;
  max-width: 480px;
  transition: color 0.2s, border-color 0.2s;
  cursor: none;
}

.contact-link:hover {
  color: var(--text);
  border-color: var(--accent);
}

.contact-link i {
  font-size: 18px;
  color: var(--accent);
  width: 22px;
  text-align: center;
  flex-shrink: 0;
  transition: color 0.4s;
}
```

- [ ] **Step 2: Verify contact section shows headline and three link rows.**

- [ ] **Step 3: Commit**
```bash
git add css/contact.css
git commit -m "feat: contact section styles"
```

---

### Task 14: Final polish pass

**Files:**
- Modify: `css/main.css` (minor tweaks)
- Modify: `index.html` (meta, favicon placeholder)

- [ ] **Step 1: Add scroll padding so fixed nav doesn't obscure section anchors**

Add to `css/main.css`:
```css
html {
  scroll-padding-top: 70px;
}
```

- [ ] **Step 2: Verify all six sections render correctly in both light and dark mode**

Toggle the theme — check every section. Confirm:
- Dark mode: dark backgrounds, white text, blue accents
- Light mode: cream background, dark text, blue accents
- Nav toggle glass effect works in both modes

- [ ] **Step 3: Verify Three.js particles don't cause jank**

Open DevTools Performance tab, record 3s of scroll. Confirm no dropped frames on the hero particle scene.

- [ ] **Step 4: Verify GSAP scroll animations fire correctly**

Scroll slowly through the page. Confirm:
- Work section fades up on entry
- Beast Games content staggers in
- Building cards animate in
- Constellation nodes appear on scroll to About
- Contact lines stagger in

- [ ] **Step 5: Final commit**
```bash
git add -A
git commit -m "feat: final polish — scroll padding, cross-browser verification"
```

---

### Task 15: Logo assets and image optimization

**Files:**
- `assets/images/` (all logos)

- [ ] **Step 1: Download company logos**

Use the Clearbit Logo API for quick sourcing. Run:
```bash
cd assets/images
curl -o logo-bamboohr.png "https://logo.clearbit.com/bamboohr.com"
curl -o logo-travelpass.png "https://logo.clearbit.com/travelpass.com"
curl -o logo-learnexus.png "https://logo.clearbit.com/learnexus.com"
curl -o logo-grow.png "https://logo.clearbit.com/grow.com"
curl -o logo-topgolf.png "https://logo.clearbit.com/topgolf.com"
```

Update all five logo references in `work.js` from `.svg` to `.png`:
```bash
sed -i '' 's/logo-bamboohr\.svg/logo-bamboohr.png/g; s/logo-travelpass\.svg/logo-travelpass.png/g; s/logo-learnexus\.svg/logo-learnexus.png/g; s/logo-grow\.svg/logo-grow.png/g; s/logo-topgolf\.svg/logo-topgolf.png/g' js/work.js
```

- [ ] **Step 2: Verify logos appear in the work carousel nav and display**

- [ ] **Step 3: Commit**
```bash
git add assets/images/
git commit -m "feat: company logos via Clearbit"
```

---

### Task 16: Deploy to Vercel

- [ ] **Step 1: Push to GitHub**
```bash
gh repo create acalder-techpm/personal-website --public --source=. --remote=origin --push
```

- [ ] **Step 2: Authenticate and deploy via Vercel**
```bash
npx vercel whoami || npx vercel login
npx vercel --yes
```

- [ ] **Step 3: Verify live URL loads, test in Chrome and Safari**

- [ ] **Step 4: Share live URL**

---

## Summary

| Chunk | Tasks | Output |
|---|---|---|
| 1 — Foundation | 1–4 | Scaffold, tokens, nav, theme toggle |
| 2 — Hero | 5–6 | Hero layout + Three.js particles |
| 3 — Work | 7–8 | Work carousel with GSAP |
| 4 — Beast Games | 9 | Full-bleed section with photos |
| 5 — Building | 10 | Project cards with hover |
| 6 — About + Skills | 11–12 | About story + constellation |
| 7 — Polish + Deploy | 13–16 | Contact, polish, logos, deploy |
