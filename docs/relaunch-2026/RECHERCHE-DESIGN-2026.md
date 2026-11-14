# Recherche: Startseite SterilVision, Relaunch Hero/Above-the-fold

Stand: 14.11.2026. Alle Links wurden bei der Recherche aufgerufen oder in Suchergebnissen gefunden. Support-Angaben stammen direkt aus der API von webstatus.dev (abgefragt am 14.11.2026).

Kurzfazit: Der aktuelle Hero hat schon die wichtigsten Zutaten gegen den KI-Look (echtes Video der Prüfzelle, konkrete Ortsangabe, kurze konkrete Lead-Copy, selbst gehostete Fonts). Der "KI-generiert"-Eindruck kommt vermutlich aus den Default-Signalen drumherum: Inter als einzige Schrift, dekorative Hintergrund-Ornamente (Grain, Punkte, schwebende Instrument-Icons), gleichförmige Karten mit Chips, einheitliche Fade-up-Reveals über SplitText/ScrollTrigger und Smooth Scroll. Die Empfehlung ist daher: weniger Dekoration, mehr Beleg, eine bewusste typografische Entscheidung.

---

## 1. "AI Slop" im Webdesign: Erkennungsmerkmale

### Was die Quellen übereinstimmend nennen

Anthropic selbst beschreibt das Problem als "distributional convergence": Ohne Vorgaben landen LLM-Seiten bei Inter, lila Verläufen auf Weiß und minimaler Animation. Explizit genannte Anti-Patterns: überstrapazierte Schriften (Inter, Roboto, Arial, Systemfonts), klischeehafte Farbschemata (besonders lila Verläufe auf Weiß), vorhersehbare Layouts und Komponenten, Baukasten-Design ohne kontextspezifischen Charakter. Zusätzlich die Warnung, dass Modelle auf neue Defaults ausweichen (genannt: Space Grotesk).

Weitere Kataloge (Designer-Blogs, Linter-Tools) ergänzen:

- Zentrierter Hero mit Pill-Badge über der H1 ("Neu", "Beta", "Now with AI"), Subline, zwei Buttons
- Gradient-Text in der Headline oder in großen Zahlen
- Drei gleich hohe, abgerundete Feature-Karten mit Icon im abgerundeten Quadrat, Titel, Zweizeiler
- Standard-Abschnittsreihenfolge: Hero, Logos, Features, Stats, Pricing, CTA
- `rounded-2xl` + `shadow-lg` überall, reflexhaftes Glassmorphism (`backdrop-blur`), große farbige Glows
- Count-up-Statistiken, Stat-Banner-Reihen, "Fake-Metriken"
- Dasselbe Fade-up auf jeder Sektion, Bounce-Easing, Animation ignoriert `prefers-reduced-motion`
- Lucide-Icons, Sparkle-Icons für "KI", Emoji-Icons in Navigation
- Copy wie "Elevate your workflow", "Seamless", "Powerful", "Build faster. Ship smarter.", generische CTAs ("Get Started") mit Pfeil
- Durchgehend Dark Mode mit grauem Fließtext unter WCAG-Kontrast
- "Geschmackvolle" Zweitdefaults, die inzwischen ebenfalls als KI-Look gelten: Creme-Hintergrund mit Terrakotta-Akzent, Fast-Schwarz mit einem Säuregrün-Akzent, Haarlinien im Zeitungsstil, Versalien-Mono-Labels, ein farbig hervorgehobenes Wort in der Headline, dekorative Nummerierung 01/02/03, Fake-Fensterpunkte auf Mockups, Serif-Italic-Akzentwort im Hero, Schriften wie Geist, Instrument Serif, Fraunces ohne echtes Pairing

Eine datengetriebene Auswertung (1.590 Show-HN-Landingpages, April 2026) fand bei 22 % vier oder mehr dieser Muster, bei 46 % höchstens eines. Strittig ist laut mehreren Quellen, ob Bento-Grids und Glassmorphism allein noch stören; Konsens ist: ein einzelnes Muster ist kein Problem, die Häufung ist es. Wichtig: Die Tools werten jedes Merkmal als "Default, den niemand gewählt hat", nicht als Beweis für KI.

### Checkliste für SterilVision

- [ ] Inter nicht mehr als einzige Schrift einsetzen. Eine Display-/Headline-Schrift bewusst wählen (Kriterium: passt zu Medizintechnik/Industrie, z. B. eine Grotesk mit technischer Anmutung oder eine nüchterne Serif für Editorial-Ton), Inter höchstens für Fließtext oder UI behalten. JetBrains Mono nur dort, wo echte Messwerte/Daten stehen, nicht als Deko-Label.
- [ ] Prüfen, ob "Geschmacks-Defaults" der zweiten Generation drin sind: Mono-Versalien-Labels, Haarlinien-Cosplay, ein farbiges Wort in der H1, 01/02/03-Nummerierung. Wo vorhanden, nur behalten, wenn es eine inhaltliche Funktion hat.
- [ ] Dekorative Hintergrundebenen (`.grain`, `.bg-dots`, schwebende Instrument-SVGs, Logo-Wasserzeichen) im Hero entfernen oder stark reduzieren. Das echte Video ist die Atmosphäre, es braucht keine zweite.
- [ ] Keine Pill-Badges über der H1, kein Gradient-Text, keine Glows, kein Glassmorphism.
- [ ] Gleichförmige Kartenreihen (Finale-Karten mit Chips) aufbrechen: eine Hauptaussage groß, die zweite klein und anders gesetzt, statt zweier identischer Karten.
- [ ] Keine Count-up-Zahlen, keine Statistiken ohne Quelle. Nur Zahlen nennen, die belegt sind (z. B. Anzahl geprüfter Instrumente im Test, Datum, Ort).
- [ ] Reveal-Animationen nicht auf jede Sektion legen. Eine orchestrierte Einstiegsanimation reicht (so auch Anthropics Empfehlung), danach statischer Inhalt.
- [ ] Copy-Check: jede Headline muss etwas sagen, das nur SterilVision sagen kann. Die aktuelle H1 "Der zweite Blick für jedes Instrument" und die Lead-Copy erfüllen das bereits gut, beibehalten.
- [ ] Pfeil-Glyphen an Links sparsam einsetzen ("Die Anlage ansehen →" ist vertretbar, aber nicht an jedem CTA).
- [ ] Optional: Seite einmal durch einen der Slop-Scanner laufen lassen (z. B. avoid-ai-design) und die Funde als Diskussionsgrundlage nutzen, nicht als Urteil.

Quellen:
- https://claude.com/blog/improving-frontend-design-through-skills
- https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics
- https://skills.sh/anthropics/claude-code/frontend-design
- https://adriankrebs.ch/blog/design-slop/
- https://github.com/funboy322/avoid-ai-design
- https://www.925studios.co/blog/ai-slop-design-tells
- https://dev.to/kenimo49/3-ui-slop-patterns-in-ai-ui-generators-purple-gradients-inter-fonts-uniform-cards-11l6
- https://superdesign.dev/blog/why-ai-design-looks-generic
- https://jc-aiwiki.pages.dev/ai-web-design/unslop-ui
- https://21st.dev/blog/website-not-look-ai-generated

---

## 2. Was glaubwürdig, menschlich und hochwertig wirkt

### Erkenntnisse

- Anthropics eigene Gegenrezepte: eine Ästhetik festlegen und durchziehen, Farben als CSS-Variablen, dominante Farbe mit scharfem Akzent statt gleichverteilter Palette, harte Kontraste in Schriftgewicht (z. B. 200 gegen 800 statt 400 gegen 600) und Größe (Sprünge von 3x und mehr), Hintergründe mit Tiefe statt Flächenfarbe, eine starke Einstiegsanimation statt vieler Mikroeffekte.
- Medtech-Agenturen betonen: echte Gerätefotografie statt Stock, klinische Belege leicht auffindbar statt im Archiv, Hero muss sagen, was das Gerät ist und für wen. Der Ton liegt zwischen "klinisch steril" (wirkt veraltet) und "Consumer-Tech" (wirkt unseriös). Aussagen müssen belegt sein, Medizinprodukte-Claims sind regulatorisch heikel.
- Hardware-Websites, die herausstechen, zeigen das Produkt selbst zuerst (Lidar-Hersteller Hesai mit Industrie-Look, German Bionic mit echtem Exoskelett im Arbeitskontext und Werkerstimmen).
- Gute Medtech-Referenzen (Agenturliste, mit Vorsicht, da Eigenwerbung): Viz.ai (Dringlichkeit ohne Alarmismus, Workflow-Integration, Klinik-Adoption), Butterfly Network (Produkt in echten klinischen Situationen), PathAI (wissenschaftlicher Stil mit echten Schnittbildern), Neuralink (minimalistisch, starke Typografie, dokumentierte Meilensteine), Intuitive (Video-Storytelling, Zielgruppen-Segmentierung).
- Wichtiger Fund zur Positionierung: Yale New Haven Health führt ein internes Projekt namens "SterileVision" (Computer Vision zur Defekterkennung bei der Instrumentenaufbereitung, Award 2026). Kommerziell gibt es Censis "Final Check" (Computer Vision prüft Siebe vor Verlassen der Packzone) und Scalpel AI. Der Name ist also nicht exklusiv. Das spricht dafür, dass der Hero über Ort, Team und konkrete Anlage unterscheidbar wird, nicht über den Namen.

### Checkliste für SterilVision

- [ ] Das Hero-Video der echten Prüfzelle bleibt das zentrale Element. Ergänzend ein echtes Standbild mit Menschen (Team an der Anlage, Hand am Siebkorb) statt Illustrationen oder 3D.
- [ ] Asymmetrisches Layout: Video groß und randabfallend (z. B. 7/12 Spalten, bis zum Viewport-Rand), Text schmal links. Kein zentrierter Hero.
- [ ] Bildunterschrift wie in einer Zeitschrift behalten und aufwerten (Ort, Datum, was zu sehen ist). Das ist ein starkes "echt"-Signal, das generische Seiten nie haben.
- [ ] Palette aus dem Kontext ableiten: Edelstahl-Grau, Siebkorb-Metall, Sterilverpackungs-Blau oder Indikator-Farben (z. B. Farbumschlag von Sterilisationsindikatoren) als Akzent. Eine dominante Neutrale plus ein einziger Signalakzent. Kein Lila, kein Verlauf.
- [ ] Typografische Hierarchie mit deutlichen Sprüngen: große H1, kleiner Lead, viel Weißraum. Zeilenlängen von etwa 60 bis 75 Zeichen im Lead.
- [ ] "Industrie-/Laborlook" als Bildsprache: technische Zeichnungen, echte Kamerabilder der Prüfung mit Markierungen (Befund "Proteinrest erkannt"), Messwerte in Mono. Das zeigt die Technik ehrlicher als ein 3D-Modell.
- [ ] Belege direkt im Hero-Bereich, klein aber konkret: Wettbewerbsfinale mit Datum, Klinikstimmen mit Namen und Funktion (nur mit Einverständnis), Link zur Quelle.
- [ ] Ehrlichkeit über den Stand: Schülerforschungsprojekt, Prototyp, kein zugelassenes Medizinprodukt. Das schafft mehr Vertrauen bei Klinikpersonal als Startup-Superlative und vermeidet regulatorische Fallen.
- [ ] Kurzer "Was es ist, für wen, Stand"-Satz direkt unter dem Lead (Medtech-Best-Practice).

Quellen:
- https://claude.com/blog/improving-frontend-design-through-skills
- https://www.kunocreative.com/blog/building-trust-regulated-industry-web-design-best-practices-medical-devices
- https://www.lowcode.agency/blog/medtech-website-redesign
- https://azurodigital.com/medtech-website-examples/
- https://createtoday.io/examples?category=hardware
- https://www.hesaitech.com/
- https://www.germanbionic.com/
- https://www.viz.ai/
- https://www.butterflynetwork.com/
- https://www.pathai.com/
- https://neuralink.com/
- https://www.intuitive.com/
- https://www.ynhhs.org/about/innovation-initiatives/health-innovation/2026-Award-Winners/SterileVision (in Suchergebnissen gefunden, Abruf mit 403 blockiert)
- https://www.marketscale.com/industries/healthcare/ai-in-sterile-processing-whats-next-censis-assembly-copilot-final-check
- https://siliconcanals.com/medtech-startup-scalpel-ai-secures-e4-5m/

---

## 3. Moderne Webtechniken 2025/2026 mit Support-Status

Baseline-Status laut webstatus.dev API am 14.11.2026. "Weit verfügbar" = Baseline Widely available, "Neu verfügbar" = Baseline Newly available (seit Datum in allen Kernbrowsern), "Eingeschränkt" = nicht in allen Engines.

| Feature | Status | Fehlt in | Nutzen für SterilVision |
|---|---|---|---|
| Cross-document View Transitions (`@view-transition`) | Eingeschränkt | Firefox | Weiche Übergänge Startseite zu Kontakt/Impressum ohne SPA. Progressive Enhancement, Firefox lädt einfach normal. |
| Same-document View Transitions | Neu verfügbar seit 14.10.2025 | | Für Zustandswechsel innerhalb einer Seite (z. B. Galerie, Vorher/Nachher-Befund). |
| Scroll-driven Animations (`animation-timeline`) | Neu verfügbar seit 27.10.2026 (Firefox 159) | | Kann ScrollTrigger für einfache Effekte ersetzen (Fortschrittsbalken, Parallax des Videos, Reveal), läuft off-main-thread. |
| Container Queries | Weit verfügbar | | Karten und Zitat-Blöcke passen sich an ihren Platz an statt an den Viewport. |
| `:has()` | Weit verfügbar seit 19.06.2026 | | Zustandsstyling ohne JS (z. B. Header-Stil, wenn Menü offen; Formular-Validierung). |
| `text-wrap: balance` | Neu verfügbar seit 05/2024 | | Ausgewogene Umbrüche in H1/H2, wichtig für deutsche Komposita. |
| `text-wrap: pretty` | Eingeschränkt | Firefox | Keine einzelnen Wörter in der letzten Zeile von Absätzen. Unkritisch als Enhancement. |
| CSS Nesting | Weit verfügbar seit 11.06.2026 | | `styles.css` (43 KB) lesbarer strukturieren, kein Präprozessor nötig. |
| `@property` | Neu verfügbar seit 07/2024 | | Animierbare Custom Properties, z. B. für einen Scan-Linien-Effekt über dem Kamerabild. |
| `light-dark()` | Neu verfügbar seit 05/2024 | | Hell/Dunkel-Theme mit einer Variablendefinition. |
| `color-mix()` / `oklch()` | Weit verfügbar | | Wahrnehmungsgleiche Palette aus einem Akzent ableiten (Hover, Flächen, Linien). |
| `@starting-style` | Neu verfügbar seit 08/2024 | | Einblend-Animation des Mobilmenüs/Popovers rein in CSS. |
| Popover API | Neu verfügbar seit 01/2025 | | Mobilmenü oder Quellen-/Presse-Details ohne eigene JS-Logik, Fokus und Esc gratis. |
| Anchor Positioning | Eingeschränkt (aggregiertes Feature) | Firefox laut webstatus.dev; MDN führt die Funktion `anchor()` als Baseline 2026 | Tooltips an Fachbegriffen (z. B. "Siebkorb", "ZSVA"), mit Fallback. |
| `field-sizing` | Neu verfügbar seit 16.06.2026 | | Mitwachsendes Textfeld im Kontaktformular. |
| `interpolate-size` | Eingeschränkt | Firefox, Safari | Animiertes Auf-/Zuklappen auf `height: auto` (FAQ). Nur als Enhancement. |
| Speculation Rules API | Eingeschränkt | Firefox, Safari | Prerender von Kontakt/Unterseiten beim Hovern, fast sofortige Navigation. |
| `fetchpriority` | Neu verfügbar seit 10/2024 | | Poster-Bild des Hero-Videos priorisieren (bereits umgesetzt). |
| `content-visibility` | Neu verfügbar seit 15.09.2025 | | Rendering von Abschnitten unterhalb des Folds aufschieben. |

### Checkliste

- [ ] `@view-transition { navigation: auto; }` in alle Seiten aufnehmen (gleiche Origin sterilvision.de ist gegeben). In `@media (prefers-reduced-motion: reduce)` die Übergänge deaktivieren.
- [ ] Einfache Scroll-Effekte von ScrollTrigger auf CSS `animation-timeline: view()` umstellen, eingepackt in `@supports (animation-timeline: view())`. Ohne Support bleibt der Inhalt einfach sichtbar.
- [ ] `text-wrap: balance` auf `h1, h2, h3`, `text-wrap: pretty` auf Fließtext. Zusätzlich `hyphens: auto` mit `lang="de"` für lange Komposita testen.
- [ ] Farben in `oklch()` definieren, Abstufungen mit `color-mix()`, Theme mit `light-dark()` und `color-scheme`.
- [ ] Mobilmenü auf Popover API plus `@starting-style` umbauen, reduziert JS und verbessert Tastaturbedienung.
- [ ] Speculation Rules ergänzen, zurückhaltend:
  ```html
  <script type="speculationrules">
  { "prerender": [{ "where": { "href_matches": "/*" }, "eagerness": "moderate" }] }
  </script>
  ```
  Externe Links (bw-ki.de, fh-westkueste.de) sind ohnehin ausgeschlossen, da nicht same-origin.
- [ ] `content-visibility: auto` mit `contain-intrinsic-size` für lange Abschnitte unterhalb des Hero (Team, Klinikstimmen), Layout-Shift prüfen.
- [ ] Container Queries für Zitat- und Finale-Blöcke statt Viewport-Breakpoints.
- [ ] Anchor Positioning und `interpolate-size` nur als Enhancement mit `@supports`, nie für Kernfunktion.

Quellen:
- https://webstatus.dev/ (API: https://api.webstatus.dev/v1/features/scroll-driven-animations)
- https://web.dev/baseline/2025
- https://web.dev/blog/web-platform-10-2026
- https://web.dev/blog/web-platform-06-2026
- https://web.dev/blog/baseline-digest-jan-2026
- https://web.dev/blog/same-document-view-transitions-are-now-baseline-newly-available
- https://developer.chrome.com/docs/web-platform/view-transitions/cross-document
- https://developer.chrome.com/blog/view-transitions-in-2025
- https://developer.chrome.com/docs/web-platform/prerender-pages
- https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations
- https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries
- https://developer.mozilla.org/en-US/docs/Web/CSS/:has
- https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting
- https://developer.mozilla.org/en-US/docs/Web/CSS/@property
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix
- https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch
- https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style
- https://developer.mozilla.org/en-US/docs/Web/API/Popover_API
- https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_anchor_positioning
- https://developer.mozilla.org/docs/Web/CSS/anchor
- https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing
- https://developer.mozilla.org/en-US/docs/Web/CSS/interpolate-size
- https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API
- https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#fetchpriority
- https://developer.mozilla.org/en-US/docs/Web/CSS/content-visibility
- https://web.dev/articles/fetch-priority
- https://web.dev/articles/content-visibility
- https://caniuse.com/view-transitions
- https://caniuse.com/css-scroll-driven-animations
- https://developer.mozilla.org/en-US/Firefox/Releases/144

---

## 4. Performance, Accessibility, Core Web Vitals, Recht

### Core Web Vitals

Schwellen unverändert: LCP bis 2,5 s, INP bis 200 ms, CLS bis 0,1, jeweils am 75. Perzentil, gleiche Werte für Mobil und Desktop. Behauptungen über "verschärfte Schwellen 2025" in Blogs ließen sich nicht durch web.dev bestätigen.

- [ ] LCP-Element ist das Video-Poster. Poster weiter mit `fetchpriority="high"` vorladen (bereits umgesetzt), als AVIF/WebP in passender Größe, `width`/`height` am `<video>` setzen. Das Poster nie lazy laden.
- [ ] Video: `muted loop playsinline`, WebM (AV1/VP9) vor MP4 in der Source-Reihenfolge, Tonspur entfernen (`ffmpeg -an`), kurze Loop-Dauer. Autoplay erst nach dem ersten Paint starten (aktuell per JS, beibehalten) und bei `prefers-reduced-motion` gar nicht.
- [ ] Sichtbaren Pause-Button für das Hero-Video ergänzen. WCAG 2.2.2 (Pause, Stop, Hide) verlangt das für automatisch startende Bewegung länger als 5 Sekunden.
- [ ] INP: kein schweres JS beim ersten Input. Three.js (Core plus Module liegt in `vendor/`) nur laden, wenn es wirklich gebraucht wird, und dann nach LCP, per IntersectionObserver, mit Rendering nur bei Sichtbarkeit und gedrosselter Bildrate.
- [ ] Mit Felddaten messen (CrUX/PageSpeed Insights, web-vitals-Bibliothek), nicht nur mit Lighthouse, das INP nur annähert.

### Three.js, Lenis, GSAP: sinnvoll oder Overkill?

- Three.js: Für eine Seite, deren stärkstes Asset ein echtes Video der echten Anlage ist, ist ein 3D-Hero eher Overkill und zugleich ein KI-/Template-Signal. Mehrere Praxisberichte zeigen Probleme auf Mobilgeräten, besonders in Kombination mit ScrollTrigger und Video. Empfehlung: im Hero entfernen. Falls 3D bleiben soll, dann als bewusst ausgelöste Interaktion weiter unten ("Anlage in 3D drehen"), lazy geladen, mit statischem Fallback.
- Lenis: Smooth Scroll verändert das native Scrollgefühl, kann bei vestibulären Störungen Beschwerden auslösen, Firefox schaltet sein eigenes Smooth Scrolling bei reduzierter Bewegung ab. Empfehlung: entfernen. Native `scroll-behavior: smooth` für Ankerlinks reicht, innerhalb von `@media (prefers-reduced-motion: no-preference)`.
- GSAP: Seit April 2025 inklusive SplitText und aller Plugins kostenlos, auch kommerziell, Lizenz ist also kein Problem. Trotzdem: Zeichenweise SplitText-Animationen auf Headlines gehören zu den generischen Mustern und verzögern die Lesbarkeit. Empfehlung: GSAP nur behalten, falls eine einzelne, inhaltlich motivierte Sequenz (z. B. Ablauf Roboter greift, Kamera prüft, Freigabe) es braucht. Alles andere mit CSS (scroll-driven animations, View Transitions, `@starting-style`).

### Accessibility (WCAG 2.2) und BFSG

- [ ] `prefers-reduced-motion: reduce` global respektieren: keine Autoplay-Videos, keine Scroll-Animationen, Inhalte im Endzustand rendern.
- [ ] WCAG 2.2 Neuerungen prüfen: 2.4.11 Focus Not Obscured (der sticky Header darf fokussierte Elemente nicht verdecken, `scroll-padding-top` setzen), 2.5.8 Target Size Minimum (Klickziele mindestens 24x24 CSS-Pixel, z. B. Menü-Button, Textlinks im Footer), 2.4.13 Focus Appearance (AAA, aber guter Maßstab: Fokusindikator mit 3:1 Kontrast). 4.1.1 Parsing ist entfallen.
- [ ] Kontrast von Fließtext und Bildunterschriften auf mindestens 4,5:1 prüfen, besonders auf dem Video-Poster.
- [ ] Video-`aria-label` ist gut. Zusätzlich sichtbare Bildunterschrift beibehalten. Falls Videos mit Ton (Film-Abschnitt) existieren: Untertitel.
- [ ] BFSG (seit 28.06.2025): Betrifft Dienstleistungen im elektronischen Geschäftsverkehr für Verbraucher (Shop, Buchung, Online-Vertragsschluss). Eine reine Informations- und Kontaktseite eines Schülerprojekts fällt nach den gefundenen Ratgebern sehr wahrscheinlich nicht darunter, Kleinstunternehmen (unter 10 Beschäftigte, höchstens 2 Mio. Euro Umsatz) sind bei Dienstleistungen ohnehin ausgenommen. Keine Rechtsberatung. Trotzdem WCAG 2.2 AA als Ziel anlegen: Kliniken und Hochschulen als Partner erwarten das, und bei späterer Ausgründung mit Online-Angeboten wäre es Pflicht.
- [ ] Schriften bleiben selbst gehostet (bereits so). Keine Google-Fonts-CDN-Einbindung, da das LG München I 2022 die dynamische Einbindung ohne Einwilligung als DSGVO-Verstoß gewertet hat (spätere Entscheidung desselben Gerichts 2023 anders, Rechtslage also nicht einheitlich, Selbsthosting bleibt die sichere Wahl).

### Font-Loading

- [ ] Nur die Schnitte vorladen, die im Hero sichtbar sind (aktuell zwei Inter-Preloads, plus künftig die neue Display-Schrift). Preload immer mit `crossorigin`, sonst doppelter Abruf.
- [ ] WOFF2, Subsetting auf Latin plus deutsche Sonderzeichen, Variable Font nur, wenn drei oder mehr Gewichte genutzt werden.
- [ ] `font-display: swap` für Headlines, für Fließtext optional `font-display: optional` mit gut abgestimmtem Fallback (`size-adjust`, `ascent-override`), um CLS zu vermeiden.

Quellen:
- https://web.dev/articles/vitals
- https://web.dev/articles/defining-core-web-vitals-thresholds
- https://web.dev/articles/inp
- https://web.dev/articles/lcp
- https://web.dev/articles/optimize-lcp
- https://web.dev/learn/performance/video-performance
- https://www.debugbear.com/blog/optimize-video-lcp
- https://web.dev/articles/font-best-practices
- https://www.specification.website/spec/performance/font-loading/
- https://www.hontran.dev/blog/core-web-vitals-for-animation-heavy-sites
- https://discourse.threejs.org/t/three-js-gsap-scrolltrigger-video-performance-issue-on-low-end-devices/78051
- https://gsap.com/blog/3-13/
- https://webflow.com/updates/gsap-becomes-free
- https://github.com/darkroomengineering/lenis
- https://frontendchecklist.io/rules/accessibility/scrolljacking
- https://bugzilla.mozilla.org/show_bug.cgi?id=1753565
- https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion
- https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/
- https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html
- https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html
- https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html
- https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html
- https://www.gesetze-im-internet.de/bfsg/
- https://www.bundesfachstelle-barrierefreiheit.de/
- https://www.e-recht24.de/ecommerce/13236-barrierefreiheitsstaerkungsgesetz.html
- https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Werbung-Fairer-Wettbewerb/barrierefreiheitsstaerkungsgesetz/
- https://www.ra-plutte.de/lg-muenchen-dynamische-einbindung-google-web-fonts-ist-dsgvo/
- https://www.dr-datenschutz.de/schadensersatz-urteil-google-fonts-und-die-dsgvo/

---

## 5. Presse und Auszeichnungen glaubwürdig zeigen

### Erkenntnisse

- Logoleisten wirken nur, wenn Besucher die Logos kennen. Unbekannte Logos schaden eher, Logos allein erzählen nichts über Ergebnisse. Besser: benannte Zitate mit Person, Funktion und konkretem Inhalt, plus Link zur Quelle. Nichts erfinden, keine Fake-Logos.
- Fakten zum BWKI: Der Sonderpreis "No risk, no fun!" ist mit 750 Euro dotiert und zeichnet laut heise die innovativste Idee oder eine besonders ungewöhnliche Hardware-Lösung aus. 2024 und 2025 ging er an andere Teams (2025: "Glucodastra"). Das Finale 2026 fand laut bw-ki.de am 13.11.2026 in Tübingen statt. Eine Pressemitteilung mit den Preisträgern 2026 konnte ich am 14.11.2026 noch nicht finden. Den Preis erst auf der Seite nennen, wenn eine offizielle Quelle (Uni Tübingen, bw-ki.de) verlinkbar ist, oder bis dahin ein eigenes Foto der Preisverleihung als Beleg zeigen.
- Ein MDR-Beitrag über das Projekt ließ sich per Websuche nicht finden. Achtung Mehrdeutigkeit: In einem Medtech-Kontext liest Klinikpersonal "MDR" zuerst als EU-Medizinprodukteverordnung (MDR 2017/745). "Bekannt aus: MDR" kann daher wie eine Zulassungsbehauptung wirken. Immer "Mitteldeutscher Rundfunk" ausschreiben.

### Checkliste

- [ ] Keine "Bekannt aus"-Logoleiste. Stattdessen ein redaktioneller Block "Über uns berichtet" mit 1 bis 3 Einträgen: Medium ausgeschrieben, Sendung/Format, Datum, eine kurze Zeile zum Inhalt, Link zum Beitrag bzw. zur Mediathek.
- [ ] "MDR" immer als "Mitteldeutscher Rundfunk (MDR)" ausschreiben, um Verwechslung mit der Medical Device Regulation auszuschließen.
- [ ] Auszeichnung als Fakt mit Kontext, nicht als Badge: z. B. "Sonderpreis 'No risk, no fun!' beim Finale des Bundeswettbewerbs Künstliche Intelligenz, Tübingen, 13. November 2026. Der Preis würdigt besonders mutige Ideen und ungewöhnliche Hardware." Mit Link zur offiziellen Pressemitteilung, sobald veröffentlicht.
- [ ] Ein echtes Foto von der Preisverleihung oder vom Stand im Finale ist stärker als jedes Logo. Mit Bildunterschrift (wer, wo, wann, Fotonachweis).
- [ ] Partnernennungen (UKSH, Westküstenklinikum, FH Westküste) nur mit Freigabe der Institutionen und in der Form, die die Zusammenarbeit tatsächlich beschreibt ("Feedback aus der ZSVA des WKK Heide" statt "Partner"). Logos von Kliniken nur mit ausdrücklicher Erlaubnis, die meisten Häuser haben Markenrichtlinien.
- [ ] Klinikstimmen als echte Zitate mit Name, Funktion und Haus, im Fließtext gesetzt (Zitatblock), nicht als Testimonial-Karussell.
- [ ] Belege chronologisch als kleine Zeitleiste (Datum, Ereignis, Quelle) statt als Kartenreihe. Das wirkt dokumentarisch und lässt sich leicht fortschreiben.
- [ ] Im Hero höchstens eine Zeile Beleg (z. B. "Sonderpreis beim Bundeswettbewerb KI 2026"), der Rest in einem eigenen Abschnitt darunter.

Quellen:
- https://stanconsulting.pages.dev/learn/conversion-diy/landing-page-trust-signals-placement
- https://signalscore.pages.dev/blog/proof-stack-social-proof-b2b
- https://www.orbitmedia.com/blog/evidence-webpages/
- https://www.orbitmedia.com/blog/social-proof-web-design/
- https://echai.ventures/startingup/website-landing/what-testimonials-or-logos-can-i-put-on-my-page-when-i-have-zero-customers-yet
- https://www.bw-ki.de/
- https://heise.de/-9979191
- https://uni-tuebingen.de/universitaet/aktuelles-und-publikationen/pressemitteilung/deutschlands-ki-nachwuchs-beim-bundeswettbewerb-kuenstliche-intelligenz-ausgezeichnet/
- https://uni-tuebingen.de/news-default/article/schuelerinnen-und-schueler-beim-bundeswettbewerb-kuenstliche-intelligenz-geehrt
- https://is.mpg.de/news/schulerinnen-und-schuler-beim-bundeswettbewerb-kunstliche-intelligenz-geehrt

---

## Priorisierte Umsetzung für den Hero

1. [ ] Dekorative Hintergrundebenen im Hero entfernen, Video größer und asymmetrisch setzen.
2. [ ] Eine bewusst gewählte Headline-Schrift einführen, Inter auf Fließtext begrenzen.
3. [ ] Lenis entfernen, SplitText-Headline-Animation entfernen, Three.js aus dem Hero nehmen.
4. [ ] Pause-Button am Video, `prefers-reduced-motion` vollständig umsetzen, Fokus/Target-Size prüfen.
5. [ ] Hero-Belegzeile auf eine konkrete, verlinkte Aussage reduzieren. "MDR" ausschreiben, Preis erst mit offizieller Quelle nennen.
6. [ ] CSS-Enhancements: `text-wrap: balance`, oklch-Palette, cross-document View Transitions, Speculation Rules.
