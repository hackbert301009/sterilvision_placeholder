# sterilvision.de

Öffentliche Website von **SterilVision**: KI-Sichtprüfung für sterile Instrumente.
Statisch (HTML, CSS, JS), kein Build-Schritt, gehostet über GitHub Pages.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Startseite: Hero (3D), Finale und Wettbewerbe, BWKI-Film, Anlage, Klinikstimmen (WKK, UKSH), Team, Wegbegleiter |
| `kontakt.html` | Kontaktformular (Formspree) mit Einwilligung |
| `impressum.html`, `datenschutz.html` | Rechtliches |
| `styles.css` | Corporate Design. Alle Farben, Schriften und Abstände als Tokens in `:root` |
| `script.js` | Smooth Scroll, Animationen, Videos, Stimmen-Umschalter, Menü, Formular. Social-Links oben im Array `SOCIALS` |
| `assets/js/hero3d.js` | 3D-Partikelschere mit Scanstrahl (three.js) |
| `assets/brand/` | Logo als Vektor: `sv-mark.svg`, `sv-wordmark.svg`, `sv-logo.svg` (Farbe über CSS) |
| `assets/fonts/` | Inter, Inter Display, JetBrains Mono als woff2 (selbst gehostet) |
| `assets/img/`, `assets/logos/`, `assets/video/` | Bilder (WebP), Partnerlogos, Videos (H.264, faststart, mit eingebranntem SterilVision-Wasserzeichen) |
| `vendor/` | GSAP 3.15.1 (ScrollTrigger, SplitText), Lenis 1.3.27, three.js 0.187.0 |

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
Dann http://localhost:8000 öffnen. (Direktes Öffnen der Datei funktioniert ohne 3D, weil ES-Module einen Server brauchen.)

## Deployment (GitHub Pages)
Settings, Pages, Source: Deploy from a branch, Branch `main`, Ordner `/ (root)`.
`CNAME` enthält `sterilvision.de`.
