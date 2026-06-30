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

/* ── HMI clock ─────────────────────────────────────────── */
(function clock() {
  const el = document.getElementById('clock');
  if (!el) return;
  const pad = (n) => String(n).padStart(2, '0');
  const upd = () => { const d = new Date(); el.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`; };
  upd(); setInterval(upd, 1000);
})();

/* ── Contact form → Formspree (AJAX, no redirect) ──────── */
(function contactForm() {
  const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');
  const btn = document.getElementById('submit-btn');
  if (!form) return;
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    status.textContent = 'Wird gesendet …'; status.className = 'form-status busy';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        status.textContent = 'Gesendet — danke! Wir melden uns.'; status.className = 'form-status ok';
      } else {
        const d = await res.json().catch(() => ({}));
        status.textContent = (d.errors && d.errors[0] && d.errors[0].message) || 'Senden fehlgeschlagen. Bitte per E-Mail versuchen.';
        status.className = 'form-status err';
      }
    } catch {
      status.textContent = 'Senden fehlgeschlagen. Bitte per E-Mail versuchen.';
      status.className = 'form-status err';
    } finally {
      btn.disabled = false;
    }
  });
})();

/* ── HMI date + "Wartung seit" uptime ──────────────────── */
(function dateUptime() {
  const dateEl = document.getElementById('date');
  const upEl = document.getElementById('uptime');
  const pad = (n) => String(n).padStart(2, '0');
  const start = Date.now();
  const upd = () => {
    const d = new Date();
    if (dateEl) dateEl.textContent = `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;
    if (upEl) { const s = Math.floor((Date.now() - start) / 1000); upEl.textContent = `${pad(Math.floor(s / 3600))}:${pad(Math.floor(s / 60) % 60)}:${pad(s % 60)}`; }
  };
  upd(); setInterval(upd, 1000);
})();

/* ── Register tabs + scrollspy (Bildanwahl) ────────────── */
(function tabs() {
  const bar = document.getElementById('hmi-tabs');
  if (!bar) return;
  const tabEls = [...bar.querySelectorAll('.tab')];
  const setActive = (id) => tabEls.forEach((t) => t.classList.toggle('active', t.dataset.target === id));
  tabEls.forEach((t) => t.addEventListener('click', () => {
    document.getElementById(t.dataset.target)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
  const ids = tabEls.map((t) => t.dataset.target).filter((id) => document.getElementById(id));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    ids.forEach((id) => io.observe(document.getElementById(id)));
  }
  setActive(ids[0]);
})();

/* ── Meldezeile (cycling alarm/message line) ───────────── */
(function msgline() {
  const line = document.getElementById('msgline');
  if (!line) return;
  const timeEl = document.getElementById('msg-time'), sevEl = document.getElementById('msg-sev'), txtEl = document.getElementById('msg-text');
  const msgs = [
    { sev: 'WARN', info: false, t: 'HMI-Dashboard pausiert · Wartung aktiv' },
    { sev: 'INFO', info: true, t: 'Vision-Pipeline wird aktualisiert' },
    { sev: 'INFO', info: true, t: 'Verbindung zu Station 01 aktiv' },
    { sev: 'INFO', info: true, t: 'Selbsttest erfolgreich abgeschlossen' },
    { sev: 'WARN', info: false, t: 'Betriebsart WARTUNG · Inspektion gestoppt' },
  ];
  const pad = (n) => String(n).padStart(2, '0');
  let i = 0;
  const show = () => {
    const m = msgs[i % msgs.length];
    txtEl.style.opacity = '0';
    setTimeout(() => {
      const d = new Date();
      timeEl.textContent = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      sevEl.textContent = m.sev; txtEl.textContent = m.t;
      line.classList.toggle('info', m.info);
      txtEl.style.opacity = '1';
    }, 300);
    i++;
  };
  show();
  if (!reduced) setInterval(show, 4200);
})();

/* ── Selbsttest bar (looping diagnostic) ───────────────── */
(function selftest() {
  const bar = document.getElementById('selftest-bar'), pct = document.getElementById('selftest-pct');
  if (!bar || !pct) return;
  if (reduced) { bar.style.width = '100%'; pct.textContent = '100%'; return; }
  bar.style.transition = 'width 0.2s linear';
  let v = 0;
  setInterval(() => {
    v += Math.random() * 6 + 1.5;
    if (v >= 100) v = 100;
    const r = Math.round(v);
    bar.style.width = r + '%'; pct.textContent = r + '%';
    if (v >= 100) setTimeout(() => { v = 0; bar.style.width = '0%'; pct.textContent = '0%'; }, 1100);
  }, 240);
})();

/* ── Function-key shortcuts (F1–F4) ────────────────────── */
(function fkeys() {
  const map = { F1: '#kontakt', F2: 'impressum.html', F3: 'datenschutz.html', F4: 'mailto:albert.heruth@gmail.com' };
  addEventListener('keydown', (e) => {
    const target = map[e.key];
    if (!target) return;
    e.preventDefault();
    if (target.startsWith('#')) document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = target;
  });
})();
