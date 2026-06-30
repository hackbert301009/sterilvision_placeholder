# sterilvision.de — Wartungsseite

Statische „Coming Soon" / Wartungsseite für **sterilvision.de** (plain HTML/CSS/JS,
keine Build-Tools). Gehostet kostenlos über GitHub Pages.

## Bearbeiten
- **Texte:** direkt in `index.html`
- **Social-/Kontakt-Links:** oben in `script.js` im `SOCIALS`-Array (eine Stelle)
- **Farben/Design:** CSS-Variablen ganz oben in `styles.css` (`:root`)
- **Bilder:** im Ordner `assets/`

## Lokal ansehen
Einfach `index.html` im Browser öffnen, oder:
```bash
python3 -m http.server 8000
```

## Deployment (GitHub Pages)
1. Repo auf GitHub anlegen und diese Dateien pushen.
2. Settings → Pages → Source: **Deploy from a branch** → Branch `main` / `/ (root)`.
3. `CNAME` enthält `sterilvision.de` → Custom Domain.
4. DNS: `sterilvision.de` auf GitHub-Pages-IPs zeigen (A-Records 185.199.108–111.153)
   bzw. `www` als CNAME auf `<user>.github.io`.
