# Navigation und Verknüpfung zur Presse-Seite (15.11.2026)

Kurzfassung der Recherche (Muster im Web, Code, Barrierefreiheit, Recht) und was davon umgesetzt ist. Keine Rechtsberatung.

## Wunsch

- `presse.html`: Übersichtsliste unter „Presse“ und die kleinen Quellenzeilen über den Abschnitten entfernen. Fotocredits bleiben (Pflicht).
- Kopfnavigation nur mit den beiden Seiten Startseite und Presse, Button Kontakt bleibt.
- Mehr Wege zur Presse-Seite, modern und im bestehenden dunklen Stil.

## Umgesetzt

| Stelle | Was | Warum |
|---|---|---|
| Kopf, alle Seiten | Startseite, Presse, Button Kontakt. Aktive Seite mit `aria-current="page"` und Pill-Hintergrund plus feiner Kontur | Nicht nur Farbe als Merkmal (WCAG 1.4.1). Textlink „Startseite“ zusätzlich zum Logo (NN/g) |
| Kopf, mobil | „Presse“ bleibt sichtbar, Menü mit drei Einträgen | Versteckte Navigation wird seltener genutzt (NN/g). Bei 320 px kein Überlauf im Kopf |
| Footer, alle Seiten | „Seiten“ und „Auf der Startseite“ (Abschnittslinks inkl. „In den Medien“) | Abschnitte bleiben ohne Ankerlinks im Kopf erreichbar |
| Hero | Pill „Sonderpreis · „No risk, no fun!“ beim Bundeswettbewerb KI 2026“ mit Link auf `presse.html#bwki` | Wer nicht scrollt, sieht den Preis. Ohne Pulspunkt und Glow, weil genau das als Template-Merkmal gilt |
| Finale | BWKI-Karte verlinkt auf `presse.html#bwki`, Zeile „Fotos und Berichte vom Finale“. Stations-Chip „Sonderpreis und Presse“ entfällt | Nachweis direkt an der passenden Aussage, kein doppelter Link |
| Neuer Abschnitt „In den Medien“ (`#medien`) | Eine große Karte mit Foto (Sonderpreis), drei schmale Karten (NDR 1 Welle Nord und ndr.de, Mitteldeutscher Rundfunk (MDR), Boyens Medien), Link „Alle Berichte und Fotos“ | Ungleich gewichtet statt gleicher Icon-Karten. Jede Karte ist genau ein Link auf ihre Fundstelle |
| `kontakt.html` | Eintrag „Presse“ in der Direktliste | Medienanfragen finden Fotos und Berichte |
| `presse.html` | Übersicht und Quellenzeilen entfernt, Datum und Medium im ersten Satz als `<time>` | Zitatquelle (§ 63 UrhG) und Zeitbezug bleiben erhalten, nur unauffälliger |

## Bewusst nicht umgesetzt

- Ankündigungsleiste über dem Kopf, Toast oder Pop-up: wirkt wie Shop oder Werbung, stört Hero und Mobilansicht.
- Zitat-Karussell oder laufende Leiste: wird übersehen, automatische Bewegung über 5 s braucht eine Pause-Funktion (WCAG 2.2.2).
- Logos von NDR, Mitteldeutscher Rundfunk (MDR) und Boyens Medien als „Bekannt aus“-Leiste: Der Name als Text genügt (BGH I ZR 33/10). Eine öffentliche Logo-Freigabe der Sender wurde nicht gefunden.
- „Bekannt aus“ als Formulierung: „In den Medien“ ist sachlicher. Wer mit Medien wirbt, sollte je Medium die Fundstelle nennen (OLG Hamburg 15 U 108/22), deshalb verlinkt jede Karte auf ihren Abschnitt.

## Offen

- Stations-Chip „Sonderpreis und Presse“ endgültig weglassen? Empfehlung: ja.
- `assets/logos/boyens.webp` im Marquee: Boyens Medien kurz um Erlaubnis fragen.
- NDR-Zitat: Wer spricht? Erst prüfen, dann ggf. als `<cite>` ergänzen.

## Quellen

Muster und Gestaltung
- https://www.shadcn.io/components/layout/announcement
- https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026
- https://codemyspec.com/blog/vibe-coded-websites-look-the-same
- https://jeangalea.com/ai-ui-looks-generic/
- https://capitalandcompute.net/blog/fix-ai-slop-design/
- https://huemor.rocks/glossary/logo-bar/
- https://signalscore.pages.dev/blog/proof-stack-social-proof-b2b
- https://wisernotify.com/blog/add-announcement-bar-to-html/
- https://shopify.dev/docs/apps/build/checkout/thank-you-order-status/ux-for-announcement-bar
- https://usability.yale.edu/usability-best-practices/hero-imagescarousels
- https://www.med.unc.edu/webguide/accessibility/carousels
- https://www.nngroup.com/news/type/press-mentions/

Barrierefreiheit und Nutzbarkeit
- W3C, WCAG 2.2 Understanding: 1.3.1, 1.4.1, 1.4.10, 1.4.11, 2.2.2, 2.4.4, 2.4.7, 2.4.11, 2.5.3, 2.5.8 (https://www.w3.org/WAI/WCAG22/Understanding/)
- W3C WAI-ARIA Authoring Practices, Navigation und `aria-current`; WAI Tutorial „Menus“
- NN/g: „Hamburger Menus and Hidden Navigation Hurt UX Metrics“, „Homepage Links: Still Necessary“, „Learn More Links: You Can Do Better“, „Cards: UI-Component Definition“
- GOV.UK Design System (Header, Footer) und Content Design „Links“

Recht
- BGH, Urteil vom 14.04.2011, I ZR 33/10 („Große Inspektion für alle“)
- OLG Hamburg, Urteil vom 21.09.2023, 15 U 108/22, Fundstellen bei Werbung mit Medien: https://www.ra-plutte.de/olg-hamburg-vorsicht-bei-werbung-mit-bekannt-aus/amp/
- https://www.it-recht-kanzlei.de/werbung-mediale-berichterstattung-rechtliche-anforderungen.html
- https://www.it-recht-kanzlei.de/benutzung-marke-werbung.html
- https://www.e-recht24.de/artikel/blog-foren-web20/7095-youtube-twitter-facebook-logonutzung.html
- https://www.srd-rechtsanwaelte.de/blog/auszeichnungen-guetesiegel-und-ehrungen-in-der-werbung-wann-liegt-eine-irrefuehrung-vor
