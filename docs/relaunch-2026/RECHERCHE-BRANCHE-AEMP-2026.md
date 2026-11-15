# Recherche: Branchenstandard AEMP und Abbau des KI-Looks

Stand: 15.11.2026. Drei parallele Recherchen (Herstellerseiten, KI-Look und Code-Audit, Zielgruppe AEMP). Grundlage für das Redesign vom 15.11.2026. Ergänzt [RECHERCHE-DESIGN-2026.md](RECHERCHE-DESIGN-2026.md).

## 1. Was die Hersteller zeigen

Ausgewertet: B. Braun/Aesculap, KLS Martin, Solventum (ehem. 3M), SteelcoBelimed, Getinge, MMM Group, enamentis (Cir.Log), ProReveal. Miele Professional war nicht ladbar (403).

| Hersteller | Hero | Navigation | Farben, Schrift | Auffällig |
|---|---|---|---|---|
| B. Braun / Aesculap | Foto/Video aus der AEMP | 4 Punkte | Hausschrift, Grün, Off-White | Alt-Texte beschreiben echte AEMP-Szenen |
| KLS Martin | Video | 7 Punkte | TradeGothic, Rot, Grau | News mit Datum und Kategorie |
| Solventum | Foto Sterilgutwagen | Rubrik Sterilisationssicherung | Petrol | fehlerhafte Übersetzung wirkt unseriös |
| SteelcoBelimed | Video-Slider | 5 Punkte plus „Contact Us“ | Söhne, Blau, Grün | Termine mit Datum |
| Getinge | Video | 4 Hauptpunkte | AdelleSans 400, Navy, Teal | Gliederung nach Prozessschritt, darunter „Prüfung und Verpackung“ |
| MMM Group | Imagefilm | 9 Punkte | Roboto, Blau, Grün | Produkte nach Prozess, Akademie |
| enamentis | Foto, „Demo buchen“ | 5 Punkte | | Kundenstimmen mit Funktion und Haus |

Quellen: [bbraun.de](https://www.bbraun.de/de/produkte-und-loesungen/therapien/chirurgische-instrumente-und-sterilcontainersysteme.html), [klsmartin.com](https://www.klsmartin.com/de/), [solventum.com](https://www.solventum.com/de-de/home/medical/sterilization-assurance/), [steelcobelimed.com](https://www.steelcobelimed.com/), [getinge.com](https://www.getinge.com/de/produkte-und-loesungen/sterilgutaufbereitung/), [mmmgroup.com](https://www.mmmgroup.com/), [enamentis.de](https://enamentis.de/), [proreveal.com](https://proreveal.com/) (alle abgerufen 15.11.2026).

**Abgeleitete Regeln (umgesetzt):**

1. Heller Grund, Weiß und Edelstahlgrau. Dunkel nur für eine Einladungsfläche.
2. Ein Akzent (Sterilverpackungs-Blau `#0b5ea8`), keine Verläufe, kein Leuchten.
3. Ruhige Groteske (Inter), Überschriften in Medium statt Bold, keine Mono-Versalien.
4. Echte Fotos und Videos aus der Prüfzelle, beschreibende Alt-Texte.
5. Einordnung im Instrumentenkreislauf: SterilVision im Schritt „Prüfung und Verpackung“.
6. Wenige, nüchterne Handlungsaufrufe: „Kontakt aufnehmen“. Kein „Demo buchen“, weil es kein Produkt gibt.
7. Vertrauen über Personen mit Funktion und Haus, nicht über Kennzahlen.
8. Presse als Liste mit Datum, Quelle und Titel.

## 2. KI-Look: Muster und Gegenmittel

Typische Muster 2025/2026: Dark Mode mit Glow, Gradient-Text, Körnung, Versalien-Labels über jeder Überschrift, Pills und Chips, gleiche Fade-up-Animation auf jeder Sektion, Logo-Laufband, schwebende Deko. Gegenmittel: weglassen, ein Akzent, Bewegung nur als Antwort auf eine Aktion, konkrete Belege. Die Quellen sind überwiegend Agentur-Blogs (Meinung, keine Messdaten).

Quellen: [capitalandcompute.net](https://capitalandcompute.net/blog/fix-ai-slop-design/), [noqta.tn](https://noqta.tn/en/blog/ai-design-slop-overused-ui-patterns-fix-2026), [uxdesign.cc](https://uxdesign.cc/how-to-de-slopify-your-designs-4c40c57c1dc9), [thefountaininstitute.com](https://www.thefountaininstitute.com/blog/signs-vibe-coded-ui), [matthewblode.com](https://matthewblode.com/blog/you-dont-have-to-make-ai-slop).

**Entfernt am 15.11.2026:** Körnung, schwebende Instrumenten-SVGs und Wasserzeichen, Gradient-Text, alle Reveal-Animationen samt GSAP/ScrollTrigger/SplitText/Lenis, Finale-Karten mit Maus-Licht und Chips, Logo-Laufband, Glow am Player, Tabs ohne Tab-Semantik, Footer-Wasserzeichen, Pill-Buttons. Kontrast der grauen Texte jetzt mindestens 5,5:1.

**3D-Modell:** statt 13.000 leuchtender Partikel eine Edelstahl-Schere als Mesh (ExtrudeGeometry, MeshPhysicalMaterial metallisch, Studio-Umgebung, Neutral-Tonemapping). Ruhiges Pendeln, per Ziehen, Pfeiltasten und „Zurücksetzen“ drehbar, rendert nur bei Bewegung. Ohne WebGL oder im Datensparmodus bleibt das Foto der Prüfzelle stehen.

**Lightbox:** `<dialog>` mit `showModal()`, Fokus, Escape, Pfeiltasten, Bildunterschrift samt Credit ([Polypane](https://polypane.app/blog/building-a-lightbox-with-the-dialog-element/), [MDN closedBy](https://developer.mozilla.org/docs/Web/API/HTMLDialogElement/closedBy)).

## 3. Zielgruppe AEMP

- DGSV-Kongress 2026 (Wolfsburg) behandelte KI skeptisch: „KI in der AEMP: Zwischen Hype und Handwerk“, „Zwischen Entlastung und Misstrauen“ ([Hauptprogramm](https://www.congress-compact.de/termin/pdf/2026_09_30-10_02_Jahreskongress_DGSV_Hauptprogramm.pdf)).
- KRINKO/BfArM 2012: Sauberkeit jedes Medizinprodukts per Sichtkontrolle, ggf. Lupenlampe ([RKI](https://edoc.rki.de/handle/176904/12400)).
- Glaubwürdig: Assistenz statt Ersatz, Freigabe bei der Fachkraft, Prototyp-Status offen nennen, Einladung zum Mitwirken.
- Abschreckend: „ersetzt Personal“, „100 % sicher“, unbelegte Erkennungsraten, Heilsversprechen, Anglizismen.
- Cir.Log (Fraunhofer IPK) prüft Vollständigkeit der Siebe, nicht Sauberkeit oder Schäden ([management-krankenhaus.de](https://management-krankenhaus.de/de/top-themen/innovatives-ki-basiertes-kamerasystem-fuer-die-aufbereitung-von-medizinprodukten)).

**Rechtliches (keine Rechtsberatung):** Irreführungsverbot nach Art. 7 MDR, § 3 HWG, § 5 UWG. Formulierung auf der Seite: „Forschungsprototyp. Kein Medizinprodukt, keine CE-Kennzeichnung, wird nicht verkauft. Die Freigabe trifft immer eine Fachkraft.“ Gebrauchsmuster nie „Patent“ nennen.

## 4. Presse, geprüft

- bw-ki.de: „SterilVision No Risk No Fun“ unter den Preisträgern des #BWKI2026 (abgerufen 15.11.2026).
- Boyens Medien: Artikel online vom **05.09.2026**, 10:01 Uhr, Autor Burkhard Büsing, Digital Plus (Bezahlschranke). Die Artikelvorschau des Teams zeigt 04.09.2026. [Artikel](https://www.boyens-medien.de/artikelansicht/heide-so-will-albert-heruth-mit-ki-die-op-sterilisation-im-krankenhaus-verbessern-125021.html)
- NDR: 13.11.2026, 16:58 Uhr, NDR 1 Welle Nord.
- Veranstaltung Juli 2026 („Klüger reden als …“): online nichts gefunden, Angabe des Teams (Boyens Medien und FH Westküste).
