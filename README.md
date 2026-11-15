# sterilvision.de

Öffentliche Website von **SterilVision**: KI-Sichtprüfung für sterile Instrumente.
Statisch (HTML, CSS, JS), kein Build-Schritt, gehostet über GitHub Pages.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Startseite (Live-Design): Hero mit 3D-Partikelschere und Sonderpreis-Pill (Link zur Presse), Finale (BWKI-Karte verlinkt auf `presse.html#bwki`), BWKI-Film, Anlage-Videos als Kacheln, Klinikstimmen (WKK, UKSH), Team, Abschnitt „In den Medien“ (`#medien`, Teaser-Karten mit Datum und Link auf den jeweiligen Bericht), Wegbegleiter |
| `presse.html` | Presse im dunklen Design: BWKI-Sonderpreis mit Fotos, NDR, Mitteldeutscher Rundfunk (MDR) mit Zwei-Klick-Video, Boyens Medien, Vortrag Juli 2026, Gebrauchsmuster, Kontakt-Aufruf. Alle Fotos mit Vollbildansicht. Neue Berichte als eigenen Abschnitt mit `id` eintragen, Datum und Medium im ersten Satz als `<time>`, und auf der Startseite unter `#medien` als Karte ergänzen. Fotocredit BWKI immer „Foto: Bundeswettbewerb KI / Ale Zea“ |
| `kontakt.html` | Kontaktformular (Formspree) mit Einwilligung |
| `impressum.html`, `datenschutz.html` | Rechtliches |
| `styles.css` | Corporate Design (dunkel). Alle Farben, Schriften und Abstände als Tokens in `:root`. Regeln für die Presse-Seite und die Lightbox am Ende der Datei |
| `script.js` | Smooth Scroll (Lenis), Animationen (GSAP, Reveals), Videos, Stimmen-Umschalter, Zwei-Klick-Video, Menü, Formular. Social-Links oben im Array `SOCIALS` |
| `assets/js/hero3d.js` | 3D-Partikelschere mit Scanstrahl (three.js) |
| `assets/js/lightbox.js` | Vollbildansicht für `figure[data-zoom]` mit `<dialog>`, Pfeiltasten innerhalb von `[data-gallery]` |
| `assets/brand/` | Logo als Vektor: `sv-mark.svg`, `sv-wordmark.svg`, `sv-logo.svg` (Farbe über CSS) |
| `assets/fonts/` | Inter, Inter Display, JetBrains Mono als woff2 (selbst gehostet) |
| `assets/img/`, `assets/img/presse/`, `assets/logos/`, `assets/video/` | Bilder (WebP), Pressefotos, Partnerlogos, Videos (H.264, faststart, mit eingebranntem SterilVision-Wasserzeichen) |
| `vendor/` | GSAP 3.15.1 (ScrollTrigger, SplitText), Lenis 1.3.27, three.js 0.187.0 |
| `docs/relaunch-2026/` | Planung, Recherchen, ToDos |

## Navigation
Kopf auf allen Seiten gleich: Startseite, Presse und Button Kontakt, aktive Seite mit `aria-current="page"`. Mobil bleibt „Presse“ im Kopf sichtbar, dazu das Menü mit drei Einträgen. Abschnittslinks der Startseite stehen nur im Footer („Auf der Startseite“). Hintergrund: [docs/relaunch-2026/PRESSE-VERKNUEPFUNG-2026.md](docs/relaunch-2026/PRESSE-VERKNUEPFUNG-2026.md)

## Datenschutz by Design
Keine Cookies, kein Tracking, keine externen Requests beim Seitenaufruf.
Schriften, Bibliotheken und Videos liegen alle im Repository. Bitte keine CDN-Links,
Google Fonts oder YouTube-Embeds ergänzen, ohne die Datenschutzerklärung anzupassen.

## Schreibregeln
Wenig Text. Keine Gedankenstriche (– oder —) als Satzzeichen, stattdessen Punkt, Komma oder „·“.

## Lokal ansehen
```bash
python -m http.server 8000
```
Dann http://localhost:8000 öffnen. (Direktes Öffnen der Datei zeigt statt 3D-Modell nur das Logo, weil ES-Module einen Server brauchen.)

## Deployment (GitHub Pages)
Settings, Pages, Source: Deploy from a branch, Branch `main`, Ordner `/ (root)`.
`CNAME` enthält `sterilvision.de`.
