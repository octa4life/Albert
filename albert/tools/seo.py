"""Injecte meta title / description / Open Graph / JSON-LD dans chaque page. Relancer après modification : python tools/seo.py"""
import re, json
from pathlib import Path
ROOTDIR = Path(__file__).resolve().parent.parent
SITE = "Albert"
PAGES = {
 "index.html": ("Albert — Harnais et friandises pour teckel | Boutique",
   "Harnais pour teckel et 4 friandises ciblées (dos, dents, yeux, ligne). Dès 13,50 €. 0,50 € reversés à Teckels Sans Doux Foyer par article."),
 "pages/mission.html": ("Notre mission : la santé du teckel avant tout | Albert",
   "Albert, marque lifestyle dédiée aux teckels : accessoires sur-mesure, nutrition ciblée et 0,50 € reversés par produit à Teckels Sans Doux Foyer."),
 "pages/blog.html": ("Blog Albert : bien-être, style et engagements du teckel",
   "Bien-être, lifestyle urbain et engagements éco-responsables pour votre teckel : hernie discale, harnais, Paris dog-friendly, transparence."),
 "pages/article.html": ("Article — Albert",
   "Conseils bien-être, style de vie et engagements pour les teckels et leurs propriétaires."),
}
PRODUCTS = {
 "harnais-albert": ("Harnais pour teckel sur-mesure, dès 49 € | Albert",
   "Harnais Albert pensé pour la morphologie du teckel : du XXS au XXL, 3 coloris, 49 €. Guide de mesure inclus. 0,50 € reversés à une association.",
   "Harnais Albert", 49, 49, 7, "Harnais pensé pour la morphologie du teckel."),
 "gaston": ("Gaston : friandise dos & articulations teckel | Albert",
   "Gaston, friandise pour teckel au collagène hydrolysé, chondroïtine, glucosamine et harpagophytum. Sachet 150 g dès 14,50 €. 0,50 € reversés à une association.",
   "Gaston — friandise dos & articulations", 14.5, 24, 2, "Friandise pour teckel : collagène hydrolysé, sulfate de chondroïtine, glucosamine et harpagophytum."),
 "marcel": ("Marcel : friandise dents & haleine pour teckel | Albert",
   "Marcel, friandise pour teckel aux algues, polyphosphates et menthe/persil pour les dents et l’haleine. Sachet 150 g dès 13,50 €. 0,50 € reversés à une association.",
   "Marcel — friandise dents & haleine", 13.5, 22, 2, "Friandise pour teckel : algues, polyphosphates et menthe/persil."),
 "colette": ("Colette : friandise yeux & rétine pour teckel | Albert",
   "Colette, friandise pour teckel à l’extrait de myrtille, lutéine, zéaxanthine et oméga-3 (DHA/EPA). Sachet 150 g dès 15,00 €. 0,50 € reversés à une association.",
   "Colette — friandise yeux & rétine", 15, 25, 2, "Friandise pour teckel : extrait de myrtille, lutéine, zéaxanthine et oméga-3."),
 "lucien": ("Lucien : friandise légère pour teckel, calories faibles | Albert",
   "Lucien, friandise pour teckel aux fibres naturelles, protéines maigres et L-carnitine, à calories faibles. Sachet 150 g dès 13,50 €. 0,50 € reversés à une association.",
   "Lucien — friandise ligne & calories", 13.5, 22, 2, "Friandise légère pour teckel : fibres naturelles, protéines maigres, L-carnitine."),
}
def esc(s): return s.replace("&", "&amp;").replace('"', "&quot;")
def process(path, title, desc, root, extra_head="", noscript=""):
    f = ROOTDIR / path; h = f.read_text(encoding="utf-8")
    h = re.sub(r"<!--seo-->.*?<!--/seo-->\s*", "", h, flags=re.S)
    h = re.sub(r"<title>.*?</title>", "", h, flags=re.S)
    block = f'''<!--seo-->
<title>{esc(title)}</title>
<meta name="description" content="{esc(desc)}">
<meta name="theme-color" content="#4a0b0b">
<link rel="icon" type="image/svg+xml" href="{root}assets/images/favicon.svg">
<meta property="og:type" content="website"><meta property="og:site_name" content="{SITE}"><meta property="og:locale" content="fr_FR">
<meta property="og:title" content="{esc(title)}"><meta property="og:description" content="{esc(desc)}">
{extra_head}<!--/seo-->
'''
    h = h.replace("</head>", block + "</head>", 1)
    h = h.replace("<main>", '<main id="main">')
    if "class=\"skip\"" not in h:
        h = re.sub(r"(<body[^>]*>)", r'\1\n<a class="skip" href="#main">Aller au contenu</a>', h, count=1)
    h = re.sub(r"<noscript>.*?</noscript>\s*", "", h, flags=re.S)
    if noscript: h = h.replace('<div id="site-header"></div>', '<div id="site-header"></div>\n' + noscript, 1)
    f.write_text(h, encoding="utf-8")
for p, (t, d) in PAGES.items(): process(p, t, d, "" if p == "index.html" else "../")
for slug, (t, d, name, lo, hi, n, short) in PRODUCTS.items():
    ld = {"@context": "https://schema.org", "@type": "Product", "name": name, "description": short, "brand": {"@type": "Brand", "name": "Albert"},
          "offers": {"@type": "AggregateOffer" if lo != hi or n > 1 else "Offer", "priceCurrency": "EUR", "lowPrice": lo, "highPrice": hi, "offerCount": n}}
    if lo == hi: ld["offers"] = {"@type": "Offer", "priceCurrency": "EUR", "price": lo}
    ns = f'<noscript><section class="section"><h1>{esc(name)}</h1><p>{esc(short)}</p><p>À partir de {f"{lo:.2f}".replace(".", ",")} €.</p><p>Activez JavaScript pour choisir une taille ou un format et ajouter au panier.</p></section></noscript>'
    process(f"pages/produits/{slug}.html", t, d, "../../", f'<script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>\n', ns)
print("SEO OK")
