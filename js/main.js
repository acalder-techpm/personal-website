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
