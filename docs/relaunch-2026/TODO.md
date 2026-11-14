# ToDos SterilVision Website

Stand: 14.11.2026. Grundlage ist die Recherche in [RECHERCHE-DESIGN-2026.md](RECHERCHE-DESIGN-2026.md) (alle Quellen dort, die wichtigsten hier direkt verlinkt).

Leitlinie: weniger Dekoration, mehr Beleg, eine bewusste typografische Entscheidung. Ein einzelnes "KI-Muster" ist kein Problem, die Häufung ist es ([Auswertung von 1.590 Landingpages](https://adriankrebs.ch/blog/design-slop/), [Anthropic: Frontend Aesthetics](https://platform.claude.com/cookbook/coding-prompting-for-frontend-aesthetics), [Anthropic Blog](https://claude.com/blog/improving-frontend-design-through-skills)).

## Erledigt (Branch `redesign/hero-ohne-ki-look`)

- [x] 3D-Partikelschere (three.js) aus dem Hero entfernt, echtes Video der Prüfzelle als Hauptbild
- [x] Asymmetrisches Layout: Text links (5/12), Video rechts (7/12), Bildunterschrift wie in einer Zeitschrift
- [x] Leuchteffekte und Verläufe im Hero entfernt, H1 ruhiger (Medium statt Bold), keine Wort-für-Wort-Animation (SplitText entfernt)
- [x] Lead-Text konkret: Roboter, Siebkorb, Kamera, Blut, Proteinreste, Schäden
- [x] Belegzeile unter dem Hero (Finale BWKI, Gründungswelle, Klinikstimmen)
- [x] Lenis Smooth Scroll auf allen Seiten entfernt, natives Scrollen, weiches Ankerscrollen nur ohne reduzierte Bewegung ([Lenis und Barrierefreiheit](https://frontendchecklist.io/rules/accessibility/scrolljacking))
- [x] Pause-Button am Hero-Video ([WCAG 2.2.2 Pause, Stop, Hide](https://www.w3.org/WAI/WCAG22/Understanding/pause-stop-hide.html)), Video pausiert außerhalb des Sichtbereichs, bei reduzierter Bewegung und im Datensparmodus nur Standbild
- [x] Poster des Videos mit `fetchpriority="high"` vorgeladen ([Fetch Priority](https://web.dev/articles/fetch-priority), [Video und LCP](https://www.debugbear.com/blog/optimize-video-lcp))

## Neue Inhalte (warten auf Material)

- [ ] **BWKI-Finale Tübingen, Sonderpreis "No risk, no fun!"**: Belegzeile im Hero und Abschnitt "Zweimal im Finale" aktualisieren. Als Fakt mit Kontext statt Badge (Datum, Ort, wofür der Preis steht). Link auf offizielle Mitteilung, sobald veröffentlicht ([bw-ki.de](https://www.bw-ki.de/), [Pressemitteilungen Uni Tübingen](https://uni-tuebingen.de/universitaet/aktuelles-und-publikationen/pressemitteilung/deutschlands-ki-nachwuchs-beim-bundeswettbewerb-kuenstliche-intelligenz-ausgezeichnet/), [Preisbeschreibung heise](https://heise.de/-9979191)). Eigenes Foto der Verleihung mit Bildunterschrift ist der stärkste Beleg.
- [ ] **Interview Mitteldeutscher Rundfunk**: immer "Mitteldeutscher Rundfunk (MDR)" ausschreiben, sonst Verwechslung mit der EU-Medizinprodukteverordnung (MDR). Eintrag mit Sendung, Datum, einer Zeile Inhalt und Link zur Mediathek. Kein YouTube-/Mediathek-Embed ohne Anpassung der Datenschutzerklärung, lieber verlinken.
- [ ] Abschnitt "Über uns berichtet" bzw. kleine Zeitleiste (Datum, Ereignis, Quelle) statt Logoleiste ([Evidence auf Webseiten](https://www.orbitmedia.com/blog/evidence-webpages/), [Social Proof](https://www.orbitmedia.com/blog/social-proof-web-design/))

## Hero, nächste Schritte

- [ ] **Headline-Schrift bewusst wählen** (Entscheidung offen): Inter nur noch für Fließtext. Kandidaten mit technischer oder redaktioneller Anmutung, selbst gehostet als WOFF2. Keine Zweitdefaults wie Space Grotesk, Geist, Instrument Serif ([Slop-Muster](https://www.925studios.co/blog/ai-slop-design-tells), [Font Best Practices](https://web.dev/articles/font-best-practices))
- [ ] Video als WebM (AV1/VP9) vor MP4 ausliefern, Tonspur entfernen (`ffmpeg -an`), Poster als AVIF/WebP ([Video-Performance](https://web.dev/learn/performance/video-performance))
- [ ] Ein Satz zum Stand: Schülerforschungsprojekt, Prototyp, kein zugelassenes Medizinprodukt ([Vertrauen in regulierten Branchen](https://www.kunocreative.com/blog/building-trust-regulated-industry-web-design-best-practices-medical-devices))
- [ ] Optional: echtes Kamerabild mit Befundmarkierung ("Proteinrest erkannt") als zweites Motiv, nur mit echten Daten
- [ ] Header-Button "Kontakt" an eckige Buttons im Hero angleichen (aktuell noch Pill)

## Ganze Seite: KI-Look abbauen

- [ ] Dekorative Ebenen entfernen oder stark reduzieren: `.grain`, `.bg-dots`, schwebende Instrument-SVGs, Logo-Wasserzeichen
- [ ] Gradient-Text `.grad` in "SterilVision in 30 Sekunden" entfernen
- [ ] Finale-Karten (zwei identische Karten mit Chips und Maus-Licht) aufbrechen: eine Hauptaussage groß, die zweite anders gesetzt
- [ ] Reveal-Animation nicht auf jeder Sektion, höchstens eine bewusste Sequenz
- [ ] Mono-Versalien-Labels nur dort, wo echte Messwerte stehen
- [ ] Logo-Marquee durch ruhige Partnerzeile mit Beschreibung der Zusammenarbeit ersetzen ("Feedback aus der ZSVA des WKK Heide" statt "Partner"). Kliniklogos nur mit Freigabe
- [ ] Palette aus dem Kontext ableiten (Edelstahl, Sterilverpackungs-Blau, Indikatorfarben), ein Akzent, kein Verlauf
- [ ] Anlage-Abschnitt: nutzt dasselbe Video wie der Hero, Motiv dort tauschen oder Abschnitt umbauen
- [ ] Ungenutzte Dateien löschen: `assets/js/hero3d.js`, `vendor/three.*.js`, `vendor/SplitText.min.js`, `vendor/lenis.min.js`, Hero-Fallback- und Reticle-CSS. Datenschutzerklärung (nennt Lenis und three.js) und README anpassen
- [ ] Optional: Slop-Scanner als Diskussionsgrundlage ([avoid-ai-design](https://github.com/funboy322/avoid-ai-design))

## Moderne Webtechnik (Status laut [webstatus.dev](https://webstatus.dev/), 14.11.2026)

- [ ] Cross-document View Transitions `@view-transition { navigation: auto; }` auf allen Seiten, Firefox lädt normal ([Chrome Docs](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/@view-transition))
- [ ] ScrollTrigger für einfache Effekte durch CSS `animation-timeline: view()` ersetzen, in `@supports`. Seit 27.10.2026 in allen Browsern ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_scroll-driven_animations), [web.dev 10/2026](https://web.dev/blog/web-platform-10-2026)). Danach GSAP evtl. ganz entfernen
- [ ] `text-wrap: pretty` für Fließtext, `hyphens: auto` für deutsche Komposita testen ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/text-wrap))
- [ ] Farben in `oklch()`, Abstufungen mit `color-mix()` ([MDN oklch](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/oklch), [MDN color-mix](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/color-mix))
- [ ] Mobilmenü mit Popover API und `@starting-style` ([Popover](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API), [@starting-style](https://developer.mozilla.org/en-US/docs/Web/CSS/@starting-style))
- [ ] Speculation Rules für interne Seiten, `eagerness: moderate` ([Prerender](https://developer.chrome.com/docs/web-platform/prerender-pages), [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Speculation_Rules_API))
- [ ] `content-visibility: auto` für Abschnitte unter dem Hero, CLS prüfen ([web.dev](https://web.dev/articles/content-visibility))
- [ ] Kontaktformular: `field-sizing: content` für das Textfeld ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/field-sizing))
- [ ] CSS Nesting und Container Queries beim Aufräumen von `styles.css` ([Nesting](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_nesting), [Container Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries))

## Performance und Barrierefreiheit

- [ ] Felddaten messen statt nur Lighthouse: LCP bis 2,5 s, INP bis 200 ms, CLS bis 0,1 ([Web Vitals](https://web.dev/articles/vitals), [INP](https://web.dev/articles/inp), [LCP optimieren](https://web.dev/articles/optimize-lcp))
- [ ] WCAG 2.2 prüfen: Fokus nicht vom Sticky Header verdeckt (2.4.11), Klickziele mindestens 24x24 px (2.5.8), Kontrast der grauen Texte mindestens 4,5:1 ([Neu in WCAG 2.2](https://www.w3.org/WAI/standards-guidelines/wcag/new-in-22/), [Target Size](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html), [Focus Not Obscured](https://www.w3.org/WAI/WCAG22/Understanding/focus-not-obscured-minimum.html))
- [ ] Untertitel für Film und Klinikstimmen
- [ ] Nur sichtbare Schriftschnitte vorladen, Fallback mit `size-adjust` gegen Layout-Sprünge
- [ ] BFSG: reine Infoseite fällt sehr wahrscheinlich nicht darunter, WCAG 2.2 AA trotzdem als Ziel (keine Rechtsberatung) ([e-recht24](https://www.e-recht24.de/ecommerce/13236-barrierefreiheitsstaerkungsgesetz.html), [IHK München](https://www.ihk-muenchen.de/de/Service/Recht-und-Steuern/Werbung-Fairer-Wettbewerb/barrierefreiheitsstaerkungsgesetz/))

## Positionierung

- [ ] Namensähnlichkeit beachten: Yale New Haven Health hat ein Projekt "SterileVision" (Award 2026), Wettbewerber Censis "Final Check" und Scalpel AI. Abgrenzung über Ort, Team und konkrete Anlage ([YNHHS](https://www.ynhhs.org/about/innovation-initiatives/health-innovation/2026-Award-Winners/SterileVision), [Censis](https://www.marketscale.com/industries/healthcare/ai-in-sterile-processing-whats-next-censis-assembly-copilot-final-check), [Scalpel AI](https://siliconcanals.com/medtech-startup-scalpel-ai-secures-e4-5m/))
- [ ] Referenzen für Bildsprache: [Hesai](https://www.hesaitech.com/), [German Bionic](https://www.germanbionic.com/), [Butterfly](https://www.butterflynetwork.com/), [PathAI](https://www.pathai.com/), [Viz.ai](https://www.viz.ai/)
