/* ───────────────────────────────────────────────────────────
   STERILVISION · Hero 3D
   Eine chirurgische Schere aus Partikeln. Ein Scanstrahl fährt
   darüber, färbt geprüfte Bereiche cyan und markiert einen Befund.
   three.js wird lokal geladen (vendor/), kein Drittanbieter.
   ─────────────────────────────────────────────────────────── */

const host = document.getElementById('hero-canvas');
const reticle = document.getElementById('reticle');
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

function webglOk() {
  try { const c = document.createElement('canvas'); return !!(c.getContext('webgl2') || c.getContext('webgl')); }
  catch { return false; }
}

if (host && webglOk()) {
  // Erst nach dem ersten Paint laden, damit Text und Layout sofort stehen
  const start = () => import('../../vendor/three.module.min.js').then(init).catch(() => {});
  if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 600 }); else setTimeout(start, 120);
}

/* Silhouette einer Schere auf ein Offscreen-Canvas zeichnen und abtasten */
function sampleScissors(count) {
  const W = 1024, H = 512;
  const c = document.createElement('canvas'); c.width = W; c.height = H;
  const g = c.getContext('2d');
  g.fillStyle = '#fff'; g.strokeStyle = '#fff'; g.lineCap = 'round'; g.lineJoin = 'round';

  // Griffringe
  g.lineWidth = 20;
  g.beginPath(); g.ellipse(150, 176, 72, 58, -0.25, 0, Math.PI * 2); g.stroke();
  g.beginPath(); g.ellipse(150, 338, 72, 58, 0.25, 0, Math.PI * 2); g.stroke();
  // Schenkel zum Gelenk
  g.lineWidth = 24;
  g.beginPath(); g.moveTo(214, 204); g.quadraticCurveTo(380, 236, 520, 262); g.stroke();
  g.beginPath(); g.moveTo(214, 310); g.quadraticCurveTo(380, 280, 520, 250); g.stroke();
  // Klingen, leicht geöffnet und spitz zulaufend
  g.beginPath(); g.moveTo(505, 244); g.quadraticCurveTo(760, 226, 972, 236); g.lineTo(975, 241); g.quadraticCurveTo(760, 252, 520, 268); g.closePath(); g.fill();
  g.beginPath(); g.moveTo(520, 246); g.quadraticCurveTo(760, 262, 975, 276); g.lineTo(972, 281); g.quadraticCurveTo(760, 288, 505, 270); g.closePath(); g.fill();
  // Gelenkschraube
  g.beginPath(); g.arc(518, 257, 22, 0, Math.PI * 2); g.fill();

  const data = g.getImageData(0, 0, W, H).data;
  const px = [];
  for (let y = 0; y < H; y += 2) for (let x = 0; x < W; x += 2) if (data[(y * W + x) * 4 + 3] > 128) px.push(x, y);

  const n = Math.min(count, px.length / 2);
  const pos = new Float32Array(n * 3), rnd = new Float32Array(n * 3), size = new Float32Array(n), defect = new Float32Array(n);
  const S = 8 / W; // Breite ca. 8 Einheiten
  const D = { x: 790, y: 270, r: 26 }; // Befundstelle auf der unteren Klinge
  for (let i = 0; i < n; i++) {
    const k = (Math.random() * (px.length / 2)) | 0;
    const x = px[k * 2] + Math.random() * 2, y = px[k * 2 + 1] + Math.random() * 2;
    pos[i * 3] = (x - W / 2) * S;
    pos[i * 3 + 1] = -(y - H / 2) * S;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 0.14;
    // Startpunkt der Intro-Animation: weit verstreut auf einer Kugelschale
    const th = Math.random() * Math.PI * 2, ph = Math.acos(Math.random() * 2 - 1), r = 6 + Math.random() * 6;
    rnd[i * 3] = r * Math.sin(ph) * Math.cos(th); rnd[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th); rnd[i * 3 + 2] = r * Math.cos(ph);
    size[i] = 0.6 + Math.random() * 1.2;
    const dx = x - D.x, dy = y - D.y;
    defect[i] = dx * dx + dy * dy < D.r * D.r ? 1 : 0;
  }
  return { pos, rnd, size, defect, n, defectLocal: [(D.x - W / 2) * S, -(D.y - H / 2) * S, 0] };
}

function init(THREE) {
  const mobile = innerWidth < 760;
  const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, mobile ? 1.5 : 1.75));
  host.appendChild(renderer.domElement);
  document.documentElement.classList.add('webgl');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
  camera.position.set(0, 0, 11);

  const rig = new THREE.Group();      // Maus-Parallaxe und Scroll
  const tool = new THREE.Group();     // die Schere selbst
  rig.add(tool); scene.add(rig);
  tool.rotation.set(-0.42, 0.28, 0.32);

  /* Partikel der Schere */
  const P = sampleScissors(mobile ? 9000 : 18000);
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(P.pos, 3));
  geo.setAttribute('aRandom', new THREE.BufferAttribute(P.rnd, 3));
  geo.setAttribute('aSize', new THREE.BufferAttribute(P.size, 1));
  geo.setAttribute('aDefect', new THREE.BufferAttribute(P.defect, 1));

  const uniforms = {
    uTime: { value: 0 }, uAssemble: { value: reduce ? 1 : 0 }, uScan: { value: -6 }, uExplode: { value: 0 },
    uPR: { value: renderer.getPixelRatio() }, uMark: { value: 0 },
    cBase: { value: new THREE.Color('#4a8fd6') }, cScan: { value: new THREE.Color('#35d6e8') },
    cDone: { value: new THREE.Color('#9cc4f5') }, cBad: { value: new THREE.Color('#ff4d61') },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    vertexShader: /* glsl */`
      uniform float uTime, uAssemble, uScan, uExplode, uPR, uMark;
      uniform vec3 cBase, cScan, cDone, cBad;
      attribute vec3 aRandom; attribute float aSize; attribute float aDefect;
      varying vec3 vColor; varying float vAlpha;
      float ease(float t){ return 1.0 - pow(1.0 - clamp(t,0.0,1.0), 3.0); }
      void main(){
        float delay = fract(sin(dot(aRandom.xy, vec2(12.9898,78.233))) * 43758.5453) * 0.35;
        float a = ease((uAssemble - delay) / (1.0 - 0.35));
        vec3 p = mix(aRandom, position, a);
        p += aRandom * 0.18 * uExplode * uExplode;
        p.z += sin(uTime * 1.3 + position.x * 2.0) * 0.03 * a;

        float d = p.x - uScan;
        float beam = exp(-d * d * 18.0);
        float done = smoothstep(0.05, -0.05, d);
        vec3 col = mix(cBase, cDone, done * 0.55);
        col = mix(col, cBad, aDefect * done * uMark);
        col = mix(col, cScan, beam);
        vColor = col;
        vAlpha = (0.6 + beam * 0.9 + aDefect * done * uMark * 0.6) * (0.35 + 0.65 * a);

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_Position = projectionMatrix * mv;
        gl_PointSize = aSize * uPR * (1.0 + beam * 1.6 + aDefect * done * uMark) * (26.0 / -mv.z);
      }`,
    fragmentShader: /* glsl */`
      varying vec3 vColor; varying float vAlpha;
      void main(){
        float r = length(gl_PointCoord - 0.5);
        if (r > 0.5) discard;
        gl_FragColor = vec4(vColor, vAlpha * smoothstep(0.5, 0.0, r));
      }`,
  });
  tool.add(new THREE.Points(geo, mat));

  /* Scanstrahl: schmale helle Linie plus weicher Lichtschleier */
  const beamMat = (w, op) => new THREE.ShaderMaterial({
    transparent: true, depthWrite: false, blending: THREE.AdditiveBlending,
    uniforms: { uOp: { value: op }, uFade: { value: 0 } },
    vertexShader: 'varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }',
    fragmentShader: `uniform float uOp, uFade; varying vec2 vUv;
      void main(){ float x = 1.0 - abs(vUv.x - 0.5) * 2.0; float y = smoothstep(0.0, 0.25, vUv.y) * smoothstep(1.0, 0.75, vUv.y);
      gl_FragColor = vec4(0.21, 0.84, 0.91, pow(x, ${w}) * y * uOp * uFade); }`,
  });
  const beamCore = new THREE.Mesh(new THREE.PlaneGeometry(0.05, 4.6), beamMat('2.0', 0.95));
  const beamGlow = new THREE.Mesh(new THREE.PlaneGeometry(1.4, 4.6), beamMat('3.0', 0.22));
  tool.add(beamGlow, beamCore);

  /* Schwebender Staub im Raum */
  const dustN = mobile ? 260 : 600;
  const dpos = new Float32Array(dustN * 3);
  for (let i = 0; i < dustN; i++) { dpos[i * 3] = (Math.random() - 0.5) * 26; dpos[i * 3 + 1] = (Math.random() - 0.5) * 16; dpos[i * 3 + 2] = (Math.random() - 0.5) * 14 - 3; }
  const dgeo = new THREE.BufferGeometry(); dgeo.setAttribute('position', new THREE.BufferAttribute(dpos, 3));
  const dust = new THREE.Points(dgeo, new THREE.PointsMaterial({ color: 0x4a9fe0, size: 0.035, transparent: true, opacity: 0.5, depthWrite: false, blending: THREE.AdditiveBlending }));
  scene.add(dust);

  /* Layout: Desktop rechts oben neben dem Text, Mobil oben mittig */
  let W = 0, H = 0;
  function resize() {
    W = host.clientWidth; H = host.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H; camera.updateProjectionMatrix();
    const narrow = W < 860;
    const visH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const visW = visH * camera.aspect;
    const s = narrow ? Math.min(1, (visW * 0.84) / 8) : Math.min(1, visW * 0.5 / 8, visH * 0.72 / 8);
    tool.scale.setScalar(s);
    rig.position.set(narrow ? 0 : visW * 0.27, narrow ? 1.5 : visH * 0.16, 0);
  }
  resize();
  addEventListener('resize', resize);

  /* Maus und Gyro-freie Parallaxe */
  const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
  addEventListener('pointermove', (e) => { target.x = e.clientX / innerWidth - 0.5; target.y = e.clientY / innerHeight - 0.5; }, { passive: true });

  /* Scroll: Partikel lösen sich beim Verlassen des Heros */
  let scrollP = 0;
  const hero = document.getElementById('hero');
  const onScroll = () => { const r = hero.getBoundingClientRect(); scrollP = Math.min(1, Math.max(0, -r.top / (r.height * 0.9))); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Nur rendern, wenn sichtbar */
  let visible = true;
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(hero);

  const v3 = new THREE.Vector3();
  const CYCLE = 6.5;          // Sekunden pro Scan
  const t0 = performance.now();

  function frame() {
    requestAnimationFrame(frame);
    if (!visible || document.hidden) return;
    const t = (performance.now() - t0) / 1000;
    uniforms.uTime.value = t;

    // Intro: Partikel fliegen zur Schere zusammen
    if (!reduce) uniforms.uAssemble.value = Math.min(1.35, (performance.now() - t0) / 2600);

    // Scan-Zyklus startet, sobald die Schere steht
    const st = Math.max(0, t - 2.2);
    const ph = (st % CYCLE) / CYCLE;
    const sweep = Math.min(1, ph / 0.62);
    const sx = -4.6 + sweep * 9.2;
    uniforms.uScan.value = st > 0 ? sx : -6;
    const fadeBeam = st > 0 ? Math.min(1, ph * 12) * (ph < 0.62 ? 1 : Math.max(0, 1 - (ph - 0.62) * 8)) : 0;
    beamCore.material.uniforms.uFade.value = fadeBeam;
    beamGlow.material.uniforms.uFade.value = fadeBeam;
    beamCore.position.x = beamGlow.position.x = sx;

    // Befund aufleuchten lassen, wenn der Strahl die Stelle passiert
    const hit = st > 0 && sx > P.defectLocal[0];
    const fadeOut = ph > 0.93 ? 0 : 1;
    uniforms.uMark.value += (((hit ? 1 : 0) * fadeOut) - uniforms.uMark.value) * 0.12;

    uniforms.uExplode.value = scrollP * 3.0;

    cur.x += (target.x - cur.x) * 0.05; cur.y += (target.y - cur.y) * 0.05;
    rig.rotation.y = cur.x * 0.5 + Math.sin(t * 0.25) * 0.06;
    rig.rotation.x = cur.y * 0.35 + scrollP * 0.4;
    dust.rotation.y = t * 0.015;

    renderer.render(scene, camera);

    // Fadenkreuz am Befund positionieren
    if (reticle) {
      v3.set(...P.defectLocal).applyMatrix4(tool.matrixWorld).project(camera);
      reticle.style.left = `${(v3.x * 0.5 + 0.5) * W}px`;
      reticle.style.top = `${(-v3.y * 0.5 + 0.5) * H}px`;
      reticle.classList.toggle('on', hit && fadeOut === 1 && scrollP < 0.3 && uniforms.uAssemble.value > 1);
    }
  }
  frame();
}
