/* ───────────────────────────────────────────────────────────
   Bilder im Vollbild (Lightbox mit <dialog>, ohne Bibliothek)
   Markup: <figure data-zoom> <a href="gross.webp"><img></a> <figcaption> </figure>
   Ohne JS öffnet der Link einfach das große Bild.
   Pfeiltasten blättern innerhalb derselben [data-gallery].
   ─────────────────────────────────────────────────────────── */
(() => {
  const figs = [...document.querySelectorAll('figure[data-zoom]')];
  if (!figs.length || typeof HTMLDialogElement !== 'function') return;

  const dlg = document.createElement('dialog');
  dlg.className = 'lightbox';
  dlg.setAttribute('aria-label', 'Bild im Vollbild');
  dlg.innerHTML =
    '<figure class="lb-figure"><img alt="" /><figcaption></figcaption></figure>' +
    '<p class="lb-count" aria-live="polite"></p>' +
    '<button class="lb-btn lb-close" type="button" aria-label="Schließen"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></svg></button>' +
    '<button class="lb-btn lb-prev" type="button" aria-label="Vorheriges Bild"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m15 5-7 7 7 7"/></svg></button>' +
    '<button class="lb-btn lb-next" type="button" aria-label="Nächstes Bild"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m9 5 7 7-7 7"/></svg></button>';
  document.body.append(dlg);

  const img = dlg.querySelector('img');
  const cap = dlg.querySelector('figcaption');
  const cnt = dlg.querySelector('.lb-count');
  const prev = dlg.querySelector('.lb-prev');
  const next = dlg.querySelector('.lb-next');
  let set = [], i = 0, opener = null;

  const bigSrc = (f) => {
    const a = f.querySelector('a[href]');
    return a ? a.href : f.querySelector('img').currentSrc;
  };

  function show(n) {
    i = (n + set.length) % set.length;
    const f = set[i];
    img.src = bigSrc(f);
    img.alt = f.querySelector('img').alt;
    const fc = f.querySelector('figcaption');
    cap.replaceChildren(...(fc ? fc.cloneNode(true).childNodes : []));
    const multi = set.length > 1;
    prev.hidden = next.hidden = !multi;
    cnt.textContent = multi ? `Bild ${i + 1} von ${set.length}` : '';
    if (multi) new Image().src = bigSrc(set[(i + 1) % set.length]);
  }

  function open(f, from) {
    const g = f.closest('[data-gallery]');
    set = g ? [...g.querySelectorAll('figure[data-zoom]')] : [f];
    opener = from;
    show(set.indexOf(f));
    dlg.showModal();
    dlg.querySelector('.lb-close').focus();
  }

  figs.forEach((f) => {
    const link = f.querySelector('a[href]');
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'zoom-btn';
    btn.setAttribute('aria-label', 'Bild im Vollbild ansehen');
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg><span>Vollbild</span>';
    (f.querySelector('.photo-frame') || f).append(btn);
    btn.addEventListener('click', () => open(f, btn));
    if (link) {
      link.setAttribute('tabindex', '-1');
      link.addEventListener('click', (e) => { e.preventDefault(); open(f, btn); });
    }
  });

  dlg.querySelector('.lb-close').addEventListener('click', () => dlg.close());
  prev.addEventListener('click', () => show(i - 1));
  next.addEventListener('click', () => show(i + 1));
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('keydown', (e) => {
    if (set.length < 2) return;
    if (e.key === 'ArrowLeft') { e.preventDefault(); show(i - 1); }
    if (e.key === 'ArrowRight') { e.preventDefault(); show(i + 1); }
  });
  dlg.addEventListener('close', () => {
    img.removeAttribute('src');
    if (opener) opener.focus();
  });
})();
