/* ───────────────────────────────────────────────────────────
   STERILVISION · script.js
   Funktioniert auch ohne GSAP/Lenis: dann ohne Animationen.
   ─────────────────────────────────────────────────────────── */

/* ============================================================
   KONTAKT / SOCIAL LINKS · HIER ANPASSEN
   ============================================================ */
const SOCIALS = [
  { label: 'E-Mail',   url: 'mailto:albert.heruth@gmail.com', icon: 'mail' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/albert-heruth-37aa74379/', icon: 'linkedin' },
  { label: 'GitHub',   url: 'https://github.com/hackbert301009', icon: 'github' },
];

const ICONS = {
  mail: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6" stroke-linecap="round"/></svg>',
  linkedin: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5zM3 9h4v12H3zM10 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.4c0-1.3-.02-2.96-1.8-2.96-1.8 0-2.08 1.4-2.08 2.86V21h-4z"/></svg>',
  github: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.73.5.1.68-.22.68-.49l-.01-1.7c-2.78.62-3.37-1.22-3.37-1.22-.46-1.18-1.11-1.5-1.11-1.5-.91-.64.07-.62.07-.62 1 .07 1.53 1.06 1.53 1.06.9 1.57 2.36 1.12 2.94.86.09-.67.35-1.12.63-1.38-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.03 1.03-2.75-.1-.26-.45-1.3.1-2.71 0 0 .84-.27 2.75 1.05a9.4 9.4 0 0 1 5 0c1.91-1.32 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.63 1.03 2.75 0 3.94-2.35 4.81-4.58 5.06.36.32.68.94.68 1.9l-.01 2.82c0 .27.18.6.69.49A10.02 10.02 0 0 0 22 12.25C22 6.58 17.52 2 12 2z"/></svg>',
};

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const hasGsap = () => window.gsap && window.ScrollTrigger;

/* ── Socials und Jahr ───────────────────────────────────── */
$$('[data-socials]').forEach((wrap) => {
  wrap.innerHTML = SOCIALS.map((s) => {
    const ext = s.url.startsWith('http') ? ' target="_blank" rel="noopener"' : '';
    return `<a href="${s.url}"${ext} aria-label="${s.label}">${ICONS[s.icon] || ''}</a>`;
  }).join('');
});
$$('[data-year]').forEach((el) => { el.textContent = new Date().getFullYear(); });

/* ── Smooth Scroll (Lenis) ──────────────────────────────── */
let lenis = null;
if (window.Lenis && !reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  if (hasGsap()) {
    gsap.registerPlugin(ScrollTrigger);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  } else {
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  }
}

/* Anker-Links weich ansteuern */
$$('a[href^="#"]').forEach((a) => {
  a.addEventListener('click', (e) => {
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const t = $(id);
    if (!t) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(t, { offset: id === '#top' ? 0 : -10, duration: 1.4 });
    else t.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
    history.replaceState(null, '', id);
  });
});

/* ── Header: Hintergrund ab Scroll, versteckt beim Runterscrollen ── */
(() => {
  const h = $('#site-header');
  if (!h) return;
  let last = 0, ticking = false, sc = null, hid = null;
  const upd = () => {
    ticking = false;
    const y = scrollY;
    const s = y > 10;
    let hd = hid;
    if (y > 600 && y > last + 4 && !document.body.classList.contains('menu-open')) hd = true;
    else if (y < last - 4 || y <= 600) hd = false;
    if (s !== sc) { sc = s; h.classList.toggle('scrolled', s); }
    if (hd !== hid) { hid = hd; h.classList.toggle('hidden', hd); }
    last = y;
  };
  upd();
  addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(upd); } }, { passive: true });
})();

/* ── Mobiles Menü ───────────────────────────────────────── */
const menuBtn = $('#menu-btn');
function closeMenu() {
  document.body.classList.remove('menu-open');
  menuBtn && menuBtn.setAttribute('aria-expanded', 'false');
  lenis && lenis.start();
}
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const open = document.body.classList.toggle('menu-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    if (lenis) open ? lenis.stop() : lenis.start();
  });
  addEventListener('keydown', (e) => { if (e.key === 'Escape') closeMenu(); });
  $$('#mobile-menu a').forEach((a) => a.addEventListener('click', closeMenu));
}

/* ── Reveals (IntersectionObserver, CSS-Übergänge) ──────── */
(() => {
  const els = $$('[data-reveal]');
  if (!('IntersectionObserver' in window) || reduce) { els.forEach((el) => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
  els.forEach((el) => io.observe(el));
})();

/* ── GSAP: Hero-Intro ────────── */
function initGsap() {
  if (!hasGsap() || reduce) return;
  gsap.registerPlugin(ScrollTrigger);
  // Mobile Adressleiste löst kein Neuberechnen aller Trigger aus
  ScrollTrigger.config({ ignoreMobileResize: true });

  // Hero-Headline Zeile für Zeile, Wort für Wort
  const h1 = $('[data-split]');
  if (h1 && window.SplitText) {
    gsap.registerPlugin(SplitText);
    const split = new SplitText(h1, { type: 'words,lines', linesClass: 'line', mask: 'lines' });
    // Nach der Intro wieder echter Text, damit die Zeilen bei Größenänderung sauber umbrechen
    gsap.from(split.words, { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: 0.06, delay: 0.2, onComplete: () => split.revert() });
  }
  gsap.from('[data-hero]', { y: 24, opacity: 0, duration: 1.2, ease: 'expo.out', stagger: 0.1, delay: 0.55 });

  // Hero-Text beim Scrollen leicht nach oben und ausblenden
  gsap.to('.hero-inner', { yPercent: -18, opacity: 0, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });

  // Finale-Karten: Licht folgt der Maus
  $$('.finale-card').forEach((c) => c.addEventListener('pointermove', (e) => {
    const r = c.getBoundingClientRect();
    c.style.setProperty('--mx', `${e.clientX - r.left}px`);
    c.style.setProperty('--my', `${e.clientY - r.top}px`);
  }));

  addEventListener('load', () => ScrollTrigger.refresh());
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGsap); else initGsap();

/* ── Logo-Band nur animieren, wenn es zu sehen ist ──────── */
(() => {
  const m = $('.marquee');
  if (!m || !('IntersectionObserver' in window)) return;
  new IntersectionObserver(([e]) => m.classList.toggle('paused', !e.isIntersecting)).observe(m);
})();

/* ── Videos: Loops erst laden, wenn sichtbar ────────────── */
(() => {
  const vids = $$('video[data-lazy]');
  if (!vids.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      const v = e.target;
      if (e.isIntersecting) {
        if (!v.dataset.loaded) {
          $$('source[data-src]', v).forEach((s) => { s.src = s.dataset.src; });
          v.load(); v.dataset.loaded = '1';
        }
        if (!reduce) v.play().catch(() => {});
      } else v.pause();
    });
  }, { rootMargin: '200px 0px' });
  vids.forEach((v) => io.observe(v));
})();

/* ── Stimmen: WKK zuerst, UKSH bei Bedarf ───────────────── */
(() => {
  const tabs = $$('.voice-tab');
  if (!tabs.length) return;
  tabs.forEach((tab) => tab.addEventListener('click', () => {
    const key = tab.dataset.voice;
    tabs.forEach((x) => x.setAttribute('aria-selected', String(x === tab)));
    $$('.voice-stage [data-voice]').forEach((p) => {
      const on = p.dataset.voice === key;
      if (!on) { $('video', p).pause(); p.classList.toggle('playing', false); }
      p.hidden = !on;
    });
  }));
})();

/* ── Player mit Cover (Videostatements) ─────────────────── */
$$('[data-player]').forEach((p) => {
  const v = $('video', p), cover = $('.player-cover', p);
  cover.addEventListener('click', () => {
    // andere Player stoppen
    $$('[data-player] video').forEach((o) => { if (o !== v) o.pause(); });
    p.classList.add('playing');
    v.play().catch(() => {});
    v.focus({ preventScroll: true });
  });
  v.addEventListener('ended', () => { p.classList.remove('playing'); v.currentTime = 0; });
});

/* ── Kontaktformular → Formspree (AJAX) ─────────────────── */
(() => {
  const form = $('#contact-form');
  if (!form) return;
  const status = $('#form-status'), btn = $('#submit-btn');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    btn.disabled = true;
    status.textContent = 'Wird gesendet …'; status.className = 'form-status';
    try {
      const res = await fetch(form.action, { method: 'POST', body: new FormData(form), headers: { Accept: 'application/json' } });
      if (res.ok) {
        form.reset();
        status.textContent = 'Gesendet. Danke, wir melden uns.'; status.className = 'form-status ok';
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
