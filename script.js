/* ───────────────────────────────────────────────────────────
   STERILVISION — Wartungsseite · Intro, Cursor & Animation
   ─────────────────────────────────────────────────────────── */

/* ============================================================
   KONTAKT / SOCIAL LINKS  —  HIER ANPASSEN
   ============================================================ */
const SOCIALS = [
  { label: 'E-Mail',   url: 'mailto:albert.heruth@gmail.com', icon: 'mail', primary: true },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/albert-heruth-37aa74379/', icon: 'linkedin' },
  { label: 'GitHub',   url: 'https://github.com/hackbert301009', icon: 'github' },
];

const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6" stroke-linecap="round"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>',
};

(function renderSocials() {
  const wrap = document.getElementById('social-links');
  if (!wrap) return;
  wrap.innerHTML = SOCIALS.map((s) => {
    const ext = s.url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${s.url}"${ext} class="${s.primary ? 'primary' : ''}">${ICONS[s.icon] || ''}<span>${s.label}</span></a>`;
  }).join('');
})();

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const root = document.documentElement;
const body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Telemetry console (typed) — startet nach dem Intro ── */
let consoleStarted = false;
function startConsole() {
  if (consoleStarted) return; consoleStarted = true;
  const el = document.getElementById('console-body');
  if (!el) return;
  const lines = [
    { t: '$ ./system_check --maintenance', c: 'cmd' },
    { t: 'Lade Vision-Modelle ............. [OK]', c: 'ok' },
    { t: 'Initialisiere Kamera-Kalibrierung  [OK]', c: 'ok' },
    { t: 'PaDiM Anomalie-Engine ........... [OK]', c: 'ok' },
    { t: 'HMI-Dashboard ................... [PAUSE]', c: 'warn' },
    { t: 'System-Status ................... WARTUNG', c: 'warn' },
    { t: '> Wir sind bald wieder online.', c: 'cmd' },
  ];
  if (reduced) { el.innerHTML = lines.map((l) => `<span class="${l.c}">${l.t}</span>`).join('\n'); return; }
  let li = 0;
  const next = () => {
    if (li >= lines.length) return;
    const line = lines[li];
    const span = document.createElement('span');
    span.className = line.c; el.appendChild(span);
    let ci = 0;
    const tick = () => {
      span.textContent = line.t.slice(0, ci++);
      if (ci <= line.t.length) setTimeout(tick, 13);
      else { el.appendChild(document.createTextNode('\n')); li++; setTimeout(next, 240); }
    };
    tick();
  };
  setTimeout(next, 400);
}

/* ── Intro / Preloader ─────────────────────────────────── */
(function intro() {
  const el = document.getElementById('intro');
  const finish = () => { body.classList.remove('preload'); body.classList.add('ready'); startConsole(); };

  if (reduced || !el) { finish(); if (el) el.style.display = 'none'; return; }

  // Build slat curtain
  const slats = document.getElementById('intro-slats');
  const N = window.innerWidth < 700 ? 4 : 7;
  for (let i = 0; i < N; i++) {
    const s = document.createElement('div');
    s.className = 'slat'; s.style.setProperty('--i', i);
    slats.appendChild(s);
  }

  const counterEl = document.getElementById('counter');
  const barEl = document.getElementById('intro-bar-fill');
  const dur = 2200;
  let startT = null;
  const closeIntro = () => {
    el.classList.add('done');
    finish();
    setTimeout(() => { el.style.display = 'none'; }, 900 + N * 80 + 120);
  };
  const tick = (now) => {
    if (startT === null) startT = now;
    const t = Math.min((now - startT) / dur, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * 100);
    counterEl.textContent = String(val).padStart(2, '0');
    barEl.style.width = val + '%';
    if (t < 1) requestAnimationFrame(tick);
    else setTimeout(closeIntro, 320);
  };
  requestAnimationFrame(tick);

  // Safety: never trap the user behind the intro
  setTimeout(() => { if (!body.classList.contains('ready')) closeIntro(); }, 6000);
})();

/* ── Custom scanner cursor (desktop only) ──────────────── */
(function cursor() {
  const c = document.getElementById('cursor');
  if (!c || reduced || !matchMedia('(pointer: fine)').matches) return;
  let cx = -100, cy = -100, tx = -100, ty = -100;
  c.style.opacity = '0';
  addEventListener('pointermove', (e) => { tx = e.clientX; ty = e.clientY; c.style.opacity = '1'; }, { passive: true });
  (function loop() {
    cx += (tx - cx) * 0.22; cy += (ty - cy) * 0.22;
    c.style.transform = `translate(${cx}px, ${cy}px)`;
    requestAnimationFrame(loop);
  })();
  addEventListener('pointerover', (e) => { if (e.target.closest('a, button')) root.classList.add('cursor-hover'); });
  addEventListener('pointerout', (e) => { if (e.target.closest('a, button')) root.classList.remove('cursor-hover'); });
})();

/* ── Emblem parallax ───────────────────────────────────── */
(function parallax() {
  const emblem = document.getElementById('emblem');
  if (!emblem || reduced) return;
  addEventListener('pointermove', (e) => {
    const x = (e.clientX / innerWidth - 0.5) * 14;
    const y = (e.clientY / innerHeight - 0.5) * 14;
    emblem.style.transform = `translate(${x}px, ${y}px)`;
  }, { passive: true });
})();

/* ── Canvas scan field ─────────────────────────────────── */
(function field() {
  const canvas = document.getElementById('field');
  if (!canvas || reduced) return;
  const ctx = canvas.getContext('2d');
  let w, h, dpr, nodes, raf;
  const COUNT = () => (innerWidth < 700 ? 46 : 80);
  const LINK = 150;
  const BLUE = '74,159,224';

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = canvas.width = innerWidth * dpr; h = canvas.height = innerHeight * dpr;
    canvas.style.width = innerWidth + 'px'; canvas.style.height = innerHeight + 'px';
  }
  function init() {
    nodes = Array.from({ length: COUNT() }, () => ({
      x: Math.random() * w, y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.18 * dpr, vy: (Math.random() - 0.5) * 0.18 * dpr,
      anomaly: Math.random() < 0.08, r: (Math.random() * 1.4 + 0.8) * dpr, ph: Math.random() * 6.28,
    }));
  }
  function step(time) {
    ctx.clearRect(0, 0, w, h);
    const link = LINK * dpr;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      n.x += n.vx; n.y += n.vy;
      if (n.x < 0 || n.x > w) n.vx *= -1;
      if (n.y < 0 || n.y > h) n.vy *= -1;
      for (let j = i + 1; j < nodes.length; j++) {
        const m = nodes[j];
        const dx = n.x - m.x, dy = n.y - m.y, d = Math.hypot(dx, dy);
        if (d < link) {
          ctx.strokeStyle = `rgba(${BLUE},${(1 - d / link) * 0.26})`;
          ctx.lineWidth = dpr * 0.6;
          ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(m.x, m.y); ctx.stroke();
        }
      }
    }
    for (const n of nodes) {
      const pulse = n.anomaly ? 0.5 + 0.5 * Math.sin(time * 0.004 + n.ph) : 1;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.r * (n.anomaly ? 1.6 : 1), 0, 6.2832);
      if (n.anomaly) { ctx.fillStyle = `rgba(239,68,68,${0.4 + pulse * 0.5})`; ctx.shadowColor = 'rgba(239,68,68,0.8)'; ctx.shadowBlur = 12 * dpr; }
      else { ctx.fillStyle = `rgba(120,180,235,0.7)`; ctx.shadowColor = `rgba(${BLUE},0.6)`; ctx.shadowBlur = 6 * dpr; }
      ctx.fill(); ctx.shadowBlur = 0;
    }
    raf = requestAnimationFrame(step);
  }
  resize(); init(); raf = requestAnimationFrame(step);
  let to;
  addEventListener('resize', () => { clearTimeout(to); to = setTimeout(() => { resize(); init(); }, 200); });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) cancelAnimationFrame(raf); else raf = requestAnimationFrame(step);
  });
})();
