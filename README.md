# sterilvision.de

Öffentliche Website von **SterilVision**: KI-Sichtprüfung für sterile Instrumente.
Statisch (HTML, CSS, JS), kein Build-Schritt, gehostet über GitHub Pages.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Startseite: Hero mit 3D-Modell, Instrumentenkreislauf und Ablauf in drei Schritten, Film, Stimmen aus der Praxis, Projektstand, Team, Einladung an AEMP-Fachleute |
| `presse.html` | Presse: Übersicht mit Datum, BWKI-Sonderpreis, NDR, Mitteldeutscher Rundfunk (MDR), Boyens Medien, Vortrag, Gebrauchsmuster. Fotos mit Vollbildansicht. Neue Berichte oben in `.media-index` und als eigener Abschnitt eintragen. Fotocredit BWKI immer „Foto: Bundeswettbewerb KI / Ale Zea“ |
| `kontakt.html` | Kontaktformular (Formspree) mit Einwilligung |
| `impressum.html`, `datenschutz.html` | Rechtliches |
| `styles.css` | Design: heller Grund, ein Akzent, ein Radius. Alle Farben und Abstände als Tokens in `:root` |
| `script.js` | Menü, Ankerscrollen, Videos, Zwei-Klick-Video, Formular. Social-Links oben im Array `SOCIALS` |
| `assets/js/hero3d.js` | 3D-Modell einer Edelstahl-Schere (three.js), drehbar, Foto als Rückfall |
| `assets/js/lightbox.js` | Vollbildansicht für `figure[data-zoom]` mit `<dialog>` |
| `assets/brand/` | Logo als Vektor (Farbe über CSS) |
| `assets/fonts/` | Inter, Inter Display als woff2 (selbst gehostet) |
| `assets/img/`, `assets/logos/`, `assets/video/` | Bilder (WebP), Logos, Videos |
| `vendor/` | three.js 0.187.0 |
| `docs/relaunch-2026/` | Planung, Recherchen, ToDos |

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
Dann http://localhost:8000 öffnen. (Direktes Öffnen der Datei zeigt statt 3D-Modell das Foto, weil ES-Module einen Server brauchen.)

## Deployment (GitHub Pages)
Settings, Pages, Source: Deploy from a branch, Branch `main`, Ordner `/ (root)`.
`CNAME` enthält `sterilvision.de`.
