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
