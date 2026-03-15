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
