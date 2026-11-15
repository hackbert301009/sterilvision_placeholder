/* ───────────────────────────────────────────────────────────
   STERILVISION · Hero 3D
   Eine chirurgische Schere als Edelstahl-Modell, wie ein
   Produktfoto im Studio. Ruhige Pendelbewegung, per Ziehen
   drehbar. Keine Partikel, kein Leuchten.
   three.js liegt lokal in vendor/, kein Drittanbieter.
   ─────────────────────────────────────────────────────────── */

const host = document.getElementById('hero-3d');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch { return false; }
}

// Datensparmodus oder sehr schwache Geräte: das Foto bleibt stehen
const conn = navigator.connection || {};
const lowEnd = conn.saveData || (navigator.deviceMemory && navigator.deviceMemory <= 2) || (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 2);

if (host && webglOk() && !lowEnd) {
  const start = () => import('../../vendor/three.module.min.js').then(init).catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 800 }); else setTimeout(start, 150);
}

/* Umriss der Schere in Pixeln (Zeichenfläche 1024 × 512) */
const PX = 1024, PY = 512, S = 8 / PX;
const P = (x, y) => [(x - PX / 2) * S, -(y - PY / 2) * S];

function shapes(THREE) {
  const V = (x, y) => new THREE.Vector2(...P(x, y));

  // Griffring: Ellipse mit Loch
  const ring = (cx, cy, rot) => {
    const [x, y] = P(cx, cy);
    const s = new THREE.Shape();
    s.absellipse(x, y, 82 * S, 68 * S, 0, Math.PI * 2, false, -rot);
    const h = new THREE.Path();
    h.absellipse(x, y, 61 * S, 47 * S, 0, Math.PI * 2, true, -rot);
    s.holes.push(h);
    return s;
  };

  // Schenkel: gebogenes Band mit Breite w entlang einer quadratischen Kurve
  const band = (a, c, b, w) => {
    const curve = new THREE.QuadraticBezierCurve(V(...a), V(...c), V(...b));
    const pts = curve.getSpacedPoints(32);
    const left = [], right = [];
    pts.forEach((p, i) => {
      const t = curve.getTangentAt(i / 32);
      const n = new THREE.Vector2(-t.y, t.x).multiplyScalar((w / 2) * S);
      left.push(p.clone().add(n)); right.push(p.clone().sub(n));
    });
    return new THREE.Shape([...left, ...right.reverse()]);
  };

  // Klinge: spitz zulaufend
  const blade = (pts) => {
    const s = new THREE.Shape();
    s.moveTo(...P(...pts[0]));
    s.quadraticCurveTo(...P(...pts[1]), ...P(...pts[2]));
    s.lineTo(...P(...pts[3]));
    s.quadraticCurveTo(...P(...pts[4]), ...P(...pts[5]));
    s.closePath();
    return s;
  };

  // Hälfte A: oberer Ring, Schenkel nach unten, untere Klinge
  const A = [
    ring(150, 176, -0.25),
    band([206, 200], [380, 236], [524, 262], 26),
    blade([[520, 246], [760, 262], [975, 276], [972, 281], [760, 290], [505, 272]]),
  ];
  // Hälfte B: unterer Ring, Schenkel nach oben, obere Klinge
  const B = [
    ring(150, 338, 0.25),
    band([206, 314], [380, 280], [524, 252], 26),
    blade([[505, 242], [760, 224], [972, 236], [975, 241], [760, 254], [520, 268]]),
  ];
  return { A, B };
}

/* Studio-Umgebung für die Spiegelungen: heller Raum mit drei Lichtflächen */
function studioEnv(THREE, renderer) {
  const env = new THREE.Scene();
  const room = new THREE.Mesh(new THREE.BoxGeometry(20, 12, 20), new THREE.MeshBasicMaterial({ color: 0x6f7780, side: THREE.BackSide }));
  env.add(room);
  const panel = (w, h, x, y, z, k) => {
    const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide }));
    m.position.set(x, y, z); m.lookAt(0, 0, 0); env.add(m);
  };
  panel(12, 3, 0, 5.5, 0, 5);      // Deckenlicht
  panel(4, 8, -9, 1, 3, 3.2);      // Softbox links
  panel(3, 6, 9, 0, -4, 1.8);      // Kante rechts
  const pm = new THREE.PMREMGenerator(renderer);
  const tex = pm.fromScene(env, 0.035).texture;
  pm.dispose();
  return tex;
}

function init(THREE) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'default' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.toneMapping = THREE.NeutralToneMapping || THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.0;
  renderer.domElement.setAttribute('role', 'img');
  renderer.domElement.setAttribute('aria-label', '3D-Modell einer chirurgischen Schere aus Edelstahl, zum Drehen ziehen');
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.environment = studioEnv(THREE, renderer);
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
  camera.position.set(0, 0, 13);

  const steel = new THREE.MeshPhysicalMaterial({ color: 0xc6ccd3, metalness: 1, roughness: 0.32 });
  const ext = { depth: 0.08, bevelEnabled: true, bevelThickness: 0.03, bevelSize: 0.025, bevelSegments: 4, curveSegments: 64 };
  const { A, B } = shapes(THREE);

  const tool = new THREE.Group();
  const half = (list, z) => {
    const g = new THREE.Group();
    list.forEach((s) => g.add(new THREE.Mesh(new THREE.ExtrudeGeometry(s, ext), steel)));
    g.position.z = z; tool.add(g);
  };
  half(A, 0.07);
  half(B, -0.09);
  // Gelenkschraube
  const [jx, jy] = P(518, 257);
  const screw = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.36, 48), new THREE.MeshPhysicalMaterial({ color: 0xb9c0c8, metalness: 1, roughness: 0.22 }));
  screw.rotation.x = Math.PI / 2; screw.position.set(jx, jy, 0);
  tool.add(screw);

  // Ins Zentrum rücken und in eine ruhige 3/4-Ansicht drehen
  const box = new THREE.Box3().setFromObject(tool);
  const mid = box.getCenter(new THREE.Vector3());
  tool.position.set(-mid.x, -mid.y, 0);
  const pivot = new THREE.Group();
  pivot.add(tool);
  pivot.rotation.set(-0.5, 0.35, 0.42);
  scene.add(pivot);

  /* Größe an die Fläche anpassen */
  let W = 0, H = 0;
  function resize() {
    const nw = host.clientWidth, nh = host.clientHeight;
    if (!nw || !nh || (nw === W && nh === H)) return;
    W = nw; H = nh;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const visW = visH * camera.aspect;
    pivot.scale.setScalar(Math.min((visW * 1.0) / 8, (visH * 1.6) / 8));
    render();
  }

  /* Drehen per Ziehen (Maus und Touch), auf Touch nur waagerecht, damit Scrollen frei bleibt */
  const rot = { x: 0, y: 0 }, goal = { x: 0, y: 0 };
  let drag = null, idle = 0;
  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => {
    drag = { x: e.clientX, y: e.clientY, rx: goal.x, ry: goal.y };
    el.setPointerCapture(e.pointerId);
    host.classList.add('dragging');
    wake();
  });
  el.addEventListener('pointermove', (e) => {
    if (!drag) return;
    goal.y = drag.ry + (e.clientX - drag.x) * 0.01;
    if (e.pointerType !== 'touch') goal.x = Math.max(-0.6, Math.min(0.6, drag.rx + (e.clientY - drag.y) * 0.006));
    wake();
  });
  const end = () => { drag = null; idle = performance.now(); host.classList.remove('dragging'); };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', end);

  /* Tastatur: Pfeiltasten drehen, Pos1 setzt zurück */
  host.addEventListener('keydown', (e) => {
    const k = e.key;
    if (k === 'ArrowLeft') goal.y -= 0.25; else if (k === 'ArrowRight') goal.y += 0.25;
    else if (k === 'ArrowUp') goal.x = Math.max(-0.6, goal.x - 0.15); else if (k === 'ArrowDown') goal.x = Math.min(0.6, goal.x + 0.15);
    else if (k === 'Home') { goal.x = 0; goal.y = 0; } else return;
    e.preventDefault(); idle = performance.now(); wake();
  });

  const reset = document.querySelector('[data-3d-reset]');
  if (reset) reset.addEventListener('click', () => { goal.x = 0; goal.y = 0; idle = performance.now(); wake(); });

  /* Nur rendern, wenn sichtbar und etwas passiert */
  let visible = true, raf = 0;
  const t0 = performance.now();
  function render() { renderer.render(scene, camera); }
  function wake() { if (!raf && visible && !document.hidden) raf = requestAnimationFrame(frame); }
  function frame(now) {
    raf = 0;
    // Ruhiges Pendeln, wenn niemand dreht (nicht bei reduzierter Bewegung)
    const sway = !reduce && !drag && now - idle > 2500;
    const t = (now - t0) / 1000;
    const swayY = sway ? Math.sin(t * 0.35) * 0.32 : 0;
    const k = reduce ? 1 : 0.09;
    rot.x += (goal.x - rot.x) * k;
    rot.y += (goal.y + swayY - rot.y) * k;
    pivot.rotation.set(-0.5 + rot.x, 0.35 + rot.y, 0.42);
    render();
    const moving = Math.abs(goal.x - rot.x) > 0.0005 || Math.abs(goal.y + swayY - rot.y) > 0.0005;
    if (visible && !document.hidden && (sway || drag || moving)) raf = requestAnimationFrame(frame);
  }

  new ResizeObserver(resize).observe(host);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; wake(); }).observe(host);
  document.addEventListener('visibilitychange', wake);
  resize();
  host.classList.add('ready');
  wake();
}
