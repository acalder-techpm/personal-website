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
