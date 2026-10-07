# Albert — site statique (HTML / CSS / JS)
Ouvrir le dossier dans VS Code, puis clic droit sur `index.html` → **Open with Live Server** (ou double-clic sur index.html).

## Structure
- `index.html`, `pages/` (mission, blog, article, `produits/*.html`), `css/`, `js/`, `assets/`
- Produits, prix, formats et articles : `js/data.js`
- Textes ALT des images : `js/main.js` (objet `ALT`)
- SEO (title, description, Open Graph, JSON-LD) : `python tools/seo.py` après toute modification de `PAGES` / `PRODUCTS` dans ce fichier
- Police des titres : ajouter `Vabedo.woff2` dans `assets/fonts/` (sinon Fredoka est utilisée)
- Favoris et panier : stockés dans le navigateur (localStorage). Paiement non branché.
