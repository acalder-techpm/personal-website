(function () {
  // ═══════════════════════════════════════════
  // THREE.JS PARTICLE NETWORK
  // ═══════════════════════════════════════════
  var lineMat;
  var pointsMat;

  if (typeof THREE !== 'undefined') {
    var canvas = document.getElementById('hero-canvas');
    var renderer = new THREE.WebGLRenderer({ canvas: canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 4;

    // ── Particles: spherical cloud, flattened Y ──
    var COUNT = 400;
    var positions = new Float32Array(COUNT * 3);
    for (var i = 0; i < COUNT; i++) {
      var theta = Math.random() * Math.PI * 2;
      var phi   = Math.acos(2 * Math.random() - 1);
      var r     = 1.5 + Math.random() * 2.5;
      positions[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.6;
      positions[i * 3 + 2] = r * Math.cos(phi) * 0.8;
    }

    var pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    pointsMat = new THREE.PointsMaterial({
      color:           0x1e50ff,
      size:            0.06,
      transparent:     true,
      opacity:         0.6,
      sizeAttenuation: true,
    });
    var points = new THREE.Points(pointsGeo, pointsMat);

    // ── Lines connecting nearby particles (neural-network effect) ──
    var LINE_DIST_SQ = 1.1 * 1.1;
    var lineVerts = [];
    for (var a = 0; a < COUNT; a++) {
      for (var b = a + 1; b < COUNT; b++) {
        var dx = positions[a * 3]     - positions[b * 3];
        var dy = positions[a * 3 + 1] - positions[b * 3 + 1];
        var dz = positions[a * 3 + 2] - positions[b * 3 + 2];
        if (dx * dx + dy * dy + dz * dz < LINE_DIST_SQ) {
          lineVerts.push(
            positions[a * 3], positions[a * 3 + 1], positions[a * 3 + 2],
            positions[b * 3], positions[b * 3 + 1], positions[b * 3 + 2]
          );
        }
      }
    }

    var lineGeo = new THREE.BufferGeometry();
    lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(lineVerts, 3));
    lineMat = new THREE.LineBasicMaterial({
      color:       0x1e50ff,
      transparent: true,
      opacity:     0.1,
    });
    var lines = new THREE.LineSegments(lineGeo, lineMat);

    // Group so particles + lines rotate together
    var group = new THREE.Group();
    group.add(points);
    group.add(lines);
    scene.add(group);

    // ── Mouse tracking ──
    var targetX = 0, targetY = 0;
    document.addEventListener('mousemove', function (e) {
      targetX = (e.clientX / window.innerWidth  - 0.5) * 0.4;
      targetY = (e.clientY / window.innerHeight - 0.5) * 0.2;
    });

    // ── Resize ──
    window.addEventListener('resize', function () {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // ── Theme sync ──
    function syncTheme() {
      var isDark = document.documentElement.getAttribute('data-theme') !== 'light';
      pointsMat.color.set(isDark ? 0x1e50ff : 0x1a3fdd);
      pointsMat.opacity = isDark ? 0.6  : 0.35;
      lineMat.color.set(isDark ? 0x1e50ff : 0x1a3fdd);
      lineMat.opacity   = isDark ? 0.1 : 0.06;
    }
    var themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) themeToggle.addEventListener('click', syncTheme);

    // ── Render loop ──
    var frameId;
    function animate() {
      frameId = requestAnimationFrame(animate);
      group.rotation.y += (targetX - group.rotation.y) * 0.05;
      group.rotation.x += (targetY - group.rotation.x) * 0.05;
      group.rotation.z += 0.0006;
      renderer.render(scene, camera);
    }

    // Only animate when hero visible
    var heroSection = document.getElementById('hero');
    var obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) animate();
      else cancelAnimationFrame(frameId);
    }, { threshold: 0 });
    obs.observe(heroSection);
  }

  // ═══════════════════════════════════════════
  // HERO ENTRANCE ANIMATION
  // ═══════════════════════════════════════════
  if (typeof gsap !== 'undefined') {
    // Set initial hidden states
    gsap.set('.hero-bg-number',    { opacity: 0, scale: 0.85 });
    gsap.set('.eyebrow',           { opacity: 0, x: -30 });
    gsap.set('.hero-name-solid',   { opacity: 0, y: 50 });
    gsap.set('.hero-name-outline', { opacity: 0, y: 50 });
    gsap.set('.hero-tagline',      { opacity: 0, y: 24 });
    gsap.set('.hero-cta',          { opacity: 0, y: 24 });
    gsap.set('.player-card',       { opacity: 0, x: 80, rotateY: -8 });
    gsap.set('#hero-canvas',       { opacity: 0 });

    // Build entrance timeline
    var tl = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });

    tl.to('#hero-canvas',       { opacity: 0.6, duration: 1.8, ease: 'power2.inOut' }, 0)
      .to('.hero-bg-number',    { opacity: 0.7, scale: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .to('.eyebrow',           { opacity: 1, x: 0, duration: 0.8 }, 0.3)
      .to('.hero-name-solid',   { opacity: 1, y: 0, duration: 0.7 }, 0.45)
      .to('.hero-name-outline', { opacity: 1, y: 0, duration: 0.7 }, 0.6)
      .to('.hero-tagline',      { opacity: 1, y: 0, duration: 0.65 }, 0.8)
      .to('.hero-cta',          { opacity: 1, y: 0, duration: 0.55 }, 0.95)
      .to('.player-card',       { opacity: 1, x: 0, rotateY: 0, duration: 1.0, ease: 'power2.out' }, 0.5);

    // If terminal intro exists, store timeline for deferred playback
    // Otherwise play immediately (e.g. direct page navigation)
    if (document.getElementById('terminal-intro')) {
      window.__heroTimeline = tl;
    } else {
      tl.delay(0.3).play();
    }
  }
})();
