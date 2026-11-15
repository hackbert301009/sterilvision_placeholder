# Hero-Feinschliff und neue Schrift (15.11.2026)

Ziel: Der Einstieg der Startseite soll nicht mehr nach Standardvorlage aussehen und auf Investoren sachlich und belastbar wirken. Dunkles Design, 3D-Partikelschere, Effekte, Abschnitte und ihre Reihenfolge bleiben.

## Was geändert wurde

| Bereich | Vorher | Nachher |
|---|---|---|
| Schrift | Inter, Inter Display, JetBrains Mono (6 Dateien) | Archivo Variable, eine Datei (`assets/fonts/Archivo-Variable.woff2`, 90 kB), Breitenachse 62 bis 125, Gewicht 100 bis 900 |
| Überschriften | Inter Display 700, Laufweite -0.035em | Archivo 600, Breite 108 %, Laufweite -0.02em |
| Hero-Headline | dreizeilig, bis 7.2rem | zweizeilig ("Der zweite Blick" / "für jedes Instrument"), Breite 112 %, Gewicht 560, bis 4.5rem |
| Hero-Text | Werbesatz | beschreibender Satz: was die Prüfzelle ist, was sie prüft, wer freigibt |
| Hero-Aktionen | zwei Pillen-Buttons (Kontakt, Team) | Button "Film ansehen" (`#film`) und Textlink "Gespräch vereinbaren" (`kontakt.html`) |
| Unter der Headline | nichts | Haarlinie und drei Fakten: Stand, Team, Schutzrecht |
| Buttons | Radius 999px, Hover mit Anheben und Leuchten, Glas | Radius 8px, Hover nur Farbwechsel |
| Labels | Mono, Versalien, gesperrt | Archivo, normale Schreibung |
| Verlaufstext "30 Sekunden" | Farbverlauf | normaler Text |
| Pfeile → und ↗ | Schriftzeichen (fehlen in Archivo) | kleines Inline-SVG `.ico-arr` |
| 3D-Schere | Höhenfaktor 0.72, Lage 0.27 / 0.16 | Höhenfaktor 0.80, Lage 0.26 / 0.21. Modell, Shader und Verhalten unverändert |

Entfernt aus `styles.css`: `.grad`, `.eyebrow`, `.finale-pill`, `.hud*`, `.scroll-cue`, `.reticle*`, Token `--f-mono`. Kein Hinweis auf den Sonderpreis im Hero (Wunsch vom 15.11.2026), der Preis steht weiter auf der Finale-Karte, unter "In den Medien" und auf `presse.html`.

## Belege für die Fakten im Hero

Alle Angaben stammen aus der Truth Base des Projekts (`pitch_2026/docs/01_TRUTH_BASE.md`) und den bestehenden Seiten:

- Prüfzelle aus Roboter, Kamera und KI, aufgebaut in Hemmingstedt
- Prüfung nach der Reinigung in der Aufbereitung (nicht nach der Sterilisation)
- Forschungsprototyp, kein Medizinprodukt, Freigabe durch eine Fachkraft
- Team: Albert Heruth und Jakob Rudolph
- Gebrauchsmuster DE 20 2026 001 663, eingetragen, nicht auf Neuheit geprüft (nie "Patent")

Keine Kennzahlen, Kunden, Erkennungsraten oder Marktgrößen.

## Schrift: Quelle und Lizenz

- Archivo, Omnibus-Type, SIL Open Font License 1.1: https://github.com/Omnibus-Type/Archivo
- Datei aus dem npm-Paket `@fontsource-variable/archivo` 5.3.0: https://www.npmjs.com/package/@fontsource-variable/archivo
  - `files/archivo-latin-wdth-normal.woff2`, sha256 `e3a28eade21a900c7155a247757f4b2834c07bb7ef07ad7efa55cebaac1e8f5e`
  - `LICENSE` liegt als `assets/fonts/OFL-Archivo.txt` bei
- Lizenztext: https://openfontlicense.org/
- Enthalten: ä ö ü Ä Ö Ü ß „ “ · und Tabellenziffern (`tnum`). Nicht enthalten: → und ↗, deshalb die SVG-Pfeile.
- Die Schrift wird nur vom eigenen Webspace geladen (ein Preload je Seite), kein Google Fonts, kein CDN. Datenschutzerklärung Abschnitt 4 und README sind angepasst.

## Technik

- `script.js`: SplitText zerlegt die Headline erst, wenn die Schrift geladen ist (`document.fonts.ready`, höchstens 1,2 s Wartezeit). So brechen die Zeilen nicht mit der Ersatzschrift um. Die Haarlinie zieht einmal von links auf. Ohne GSAP oder mit reduzierter Bewegung ist alles sofort sichtbar.
- Mobil ist die Canvas fest `100svh` hoch, damit die Schere über der Headline bleibt, auch wenn der Hero durch die Fakten länger wird. Die Scroll-Strecke der Partikel hängt deshalb an der Canvas-Höhe, und der Hero-Text blendet erst aus, wenn die Unterkante des Heros den unteren Bildschirmrand erreicht (`start: 'bottom bottom'`). Auf dem Desktop ist beides gleich wie zuvor.
- Die Klasse `.mono` heißt weiter so, damit die Footer unverändert bleiben. Sie setzt keine Mono-Schrift mehr.

## Geprüft

- Chromium headless bei 1440x900, 1440x700 und 390x844: Headline zweizeilig, Schere frei, Fakten höchstens zweizeilig, Button mobil im ersten Bildschirm.
- `presse.html` und `kontakt.html` bei 1440 und 390: Schrift greift, nichts überlappt.
- Nach dem Intro stellt `split.revert()` die beiden `.h1-row` wieder her.

## Offen (Entscheidung beim Team)

- "Für jedes Instrument" in der Headline kann als Leistungsversprechen gelesen werden. Der Satz darunter mit der Freigabe durch die Fachkraft fängt das auf.
- "Gespräch vereinbaren" führt zur Kontaktseite mit einer Gmail-Adresse. Eine Adresse unter sterilvision.de wirkt vertrauenswürdiger.
- Meta-Beschreibung und `og:description` in `index.html` enthalten noch "Für mehr Patientensicherheit".
