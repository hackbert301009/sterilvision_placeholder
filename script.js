/* ───────────────────────────────────────────────────────────
   STERILVISION — Wartungsseite · Intro & Kontakt
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

const body = document.body;
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── Intro / Preloader ─────────────────────────────────── */
(function intro() {
  const el = document.getElementById('intro');
  const finish = () => { body.classList.remove('preload'); body.classList.add('ready'); };

  if (reduced || !el) { finish(); if (el) el.style.display = 'none'; return; }

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
