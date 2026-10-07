(function () {
  const D = window.ALBERT, B = document.body, ROOT = B.dataset.root || "", PAGE = B.dataset.page;
  /* clé -> [fichier, largeur, hauteur] */
  const IMG = {
    logo:["albert-logo.svg",829,350], asso:["teckels-sans-doux-foyer.webp",200,240],
    hero:["hero-teckel.webp",900,892], repos:["teckel-repos.webp",900,900], jardin:["teckel-jardin.webp",800,961], quotidien:["teckel-quotidien.webp",736,981],
    harnais:["produit-harnais.webp",1030,878], gaston:["produit-gaston.webp",1000,1167], marcel:["produit-marcel.webp",1000,1167], colette:["produit-colette.webp",1000,1167], lucien:["produit-lucien.webp",1000,1167]
  };
  const PACK = ["gaston", "marcel", "colette", "lucien"];
  /* textes ALT : descriptifs, une phrase. img(clé, "") = image décorative (alt vide) */
  const ALT = {
    logo:"Albert", asso:"Logo de l’association Teckels Sans Doux Foyer",
    hero:"Teckel marron et feu avec une cerise sur de la chantilly posée sur le museau",
    repos:"Teckel noir et feu qui bâille, les pattes posées sur une couverture rose",
    jardin:"Teckel à poil long marron et blanc, en harnais bordeaux et laisse assortie, sur un trottoir",
    quotidien:"Teckel noir et feu en béret rouge et marinière, tenu en laisse dans la rue",
    harnais:"Teckel arlequin portant un harnais matelassé à rayures vertes, roses et crème, avec des boucles bleues",
    gaston:"Sachet bordeaux de friandises Gaston pour le dos et les articulations du teckel",
    marcel:"Sachet crème de friandises Marcel pour les dents et l’haleine du teckel",
    colette:"Sachet rose de friandises Colette pour les yeux et la rétine du teckel",
    lucien:"Sachet vert de friandises Lucien, à calories faibles, pour la ligne du teckel"
  };
  const img = (k, alt) => { const [f, w, h] = IMG[k];
    return `<img${PACK.includes(k) ? ' class="pack"' : ""} src="${ROOT}assets/images/${f}" alt="${alt === "" ? "" : ALT[k]}" width="${w}" height="${h}" loading="lazy" decoding="async">`; };
  const cls = (html, c) => html.includes('class="') ? html.replace('class="', 'class="' + c + ' ') : html.replace("<img", '<img class="' + c + '"');
  const s = (d) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
  const I = {
    search:s('<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>'), heart:s('<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>'),
    bag:s('<path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>'),
    arrow:s('<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>'), left:s('<path d="M19 12H5"/><path d="m12 19-7-7 7-7"/>'),
    play:s('<path d="m6 3 14 9-14 9z"/>'), grid:s('<rect x="3" y="3" width="8" height="8" rx="1"/><rect x="13" y="3" width="8" height="8" rx="1"/><rect x="3" y="13" width="8" height="8" rx="1"/><rect x="13" y="13" width="8" height="8" rx="1"/>'),
    dog:s('<path d="M10 5.2c-1-1.5-3-2.2-5-1.7L3 10l3 2v6h3v-4h6v4h3v-7l3-3-2-4c-2-.5-4 .2-5 1.7"/>'), bone:s('<path d="M17 10c.7-.7 1.7-1 2.5-1a2.5 2.5 0 1 0-2.4-3.1 2.5 2.5 0 1 0-3.1 2.4c0 .8-.3 1.8-1 2.5L9 14c-.7.7-1.7 1-2.5 1a2.5 2.5 0 1 0 2.4 3.1 2.5 2.5 0 1 0 3.1-2.4c0-.8.3-1.8 1-2.5z"/>'),
    smile:s('<circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><path d="M9 9h.01M15 9h.01"/>'), eye:s('<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>'),
    leaf:s('<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.4-6.5C10 13.7 12 12 12 12"/>'),
  };
  const pageOf = (slug) => `${ROOT}pages/produits/${slug}.html`;
  const link = (p) => `${ROOT}pages/${p}.html`;

  /* ---------- Header / Footer ---------- */
  const nav = (id, label, href) => `<a href="${href}" class="${PAGE === id ? "active" : ""}">${label}</a>`;
  document.getElementById("site-header").outerHTML = `<header class="nav">
    <nav class="nav-pages">${nav("boutique","Boutique",ROOT+"index.html")}${nav("mission","Notre mission",link("mission"))}${nav("blog","Blog",link("blog"))}</nav>
    <a href="${ROOT}index.html" class="logo" aria-label="Albert">${img("logo","Albert")}</a>
    <div class="pills"><button class="pill" type="button">${I.search}<span class="lbl">Recherche</span></button>
      <button class="pill" type="button" data-open="fav" aria-label="Favoris">${I.heart}<span class="lbl">Favoris</span><b class="badge" data-b="fav" hidden></b></button>
      <button class="pill" type="button" data-open="cart" aria-label="Panier">${I.bag}<span class="lbl">Panier</span><b class="badge" data-b="cart" hidden></b></button></div></header>`;
  document.getElementById("site-footer").outerHTML = `<footer class="foot"><div class="row">
    <div class="sig"><a href="${ROOT}index.html" class="logo">${img("logo","Albert")}</a><p>Exclusivement pour les teckels.</p></div>
    <div class="links"><a href="${ROOT}index.html">Boutique</a><a href="${link("mission")}">Notre mission</a><a href="${link("mission")}#faq">FAQ</a><a href="${link("blog")}">Blog</a><a href="mailto:contact@albert.fr">Contact</a></div></div>
    <div class="row2"><p>© Albert. Tous droits réservés.</p><p>Les produits ne remplacent pas un suivi vétérinaire.</p></div></footer>`;
  // le logo local manquant → texte de secours
  document.querySelectorAll(".logo img").forEach(i => i.addEventListener("error", () => { if (i.dataset.f && i.complete === false) i.replaceWith("Albert"); }));

  /* ---------- Composants ---------- */
  const btn = (txt, href, cls = "") => `<a class="btn ${cls}" href="${href}">${txt}${I.arrow}</a>`;
  const priceOf = (p) => { const v = p.variants.map(x => x[1]), lo = Math.min(...v); return (lo === Math.max(...v) ? "" : "À partir de ") + fmt(lo); };
  const card = (p, long) => `<article class="card" data-cat="${p.cat}">${img(p.img, p.name)}
    <button type="button" class="fav-btn" data-fav="${p.slug}" aria-pressed="false" aria-label="Ajouter aux favoris : ${p.name}">${I.heart}</button>
    <div class="card-body"><p class="eyebrow">${p.type}</p><h3>${p.name}</h3><p class="tag">${p.need}</p>${long ? `<p class="d">${p.short}</p>` : ""}
    <p class="price">${priceOf(p)}</p>${btn("Découvrir", pageOf(p.slug), "small" + (p.blue ? " blue" : ""))}</div></article>`;
  const others = (cur) => D.products.filter(p => p.slug !== cur.slug);
  const qa = () => D.faq.map(([q, a], i) => `<div class="qa${i === 0 ? " open" : ""}"><button><span>${q}</span><span class="pm"></span></button><p>${a}</p></div>`).join("");
  const mount = (id, html) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };

  /* ---------- Favoris & panier (localStorage) ---------- */
  const fmt = (n) => n.toFixed(2).replace(".", ",") + " €";
  const store = { get(k) { try { return JSON.parse(localStorage.getItem("albert_" + k)) || []; } catch (e) { return []; } }, set(k, v) { try { localStorage.setItem("albert_" + k, JSON.stringify(v)); } catch (e) {} } };
  let favs = store.get("favs"), cart = store.get("cart");
  const pbySlug = (s) => D.products.find(p => p.slug === s);
  const live = document.createElement("div"); live.className = "sr-only"; live.setAttribute("aria-live", "polite"); document.body.append(live);
  const say = (t) => { live.textContent = ""; setTimeout(() => live.textContent = t, 60); };
  const dr = document.createElement("div"); dr.id = "drawer"; dr.hidden = true; document.body.append(dr);
  let mode = "cart", opener = null;
  function flash(kind) {
    const pill = document.querySelector(`[data-open="${kind}"]`); if (!pill) return;
    const el = document.createElement("span"); el.className = "plus1"; el.textContent = "+1"; el.setAttribute("aria-hidden", "true"); pill.append(el); setTimeout(() => el.remove(), 1000);
    const b = pill.querySelector(".badge"); b.classList.remove("pop"); void b.offsetWidth; b.classList.add("pop");
  }
  function sync() {
    const nc = cart.reduce((a, c) => a + c.qty, 0);
    [["fav", favs.length], ["cart", nc]].forEach(([k, n]) => { const b = document.querySelector(`[data-b="${k}"]`); if (b) { b.textContent = n; b.hidden = !n; } });
    document.querySelectorAll("[data-fav]").forEach(b => { const on = favs.includes(b.dataset.fav); b.setAttribute("aria-pressed", on);
      if (b.classList.contains("btn")) b.querySelector(".t").textContent = on ? "Retirer des favoris" : "Ajouter aux favoris";
      else b.setAttribute("aria-label", (on ? "Retirer des favoris : " : "Ajouter aux favoris : ") + pbySlug(b.dataset.fav).name); });
    store.set("favs", favs); store.set("cart", cart);
    if (!dr.hidden) renderDrawer();
  }
  function toggleFav(slug, silent) {
    const i = favs.indexOf(slug);
    if (i > -1) { favs.splice(i, 1); say(pbySlug(slug).name + " retiré des favoris"); } else { favs.push(slug); flash("fav"); say(pbySlug(slug).name + " ajouté aux favoris"); }
    sync();
  }
  function addCart(slug, label, price, color) {
    const id = [slug, label, color].join("|"), it = cart.find(c => c.id === id);
    if (it) it.qty++; else cart.push({ id, slug, label, color, price, qty: 1 });
    flash("cart"); say(pbySlug(slug).name + " ajouté au panier"); sync();
  }
  function renderDrawer() {
    const fav = mode === "fav"; let list, foot = "";
    if (fav) list = favs.map(s => { const p = pbySlug(s); return `<li class="line">${img(p.img, "")}<div><a href="${pageOf(s)}"><strong>${p.name}</strong></a><p class="note">${p.need} · ${priceOf(p)}</p></div><button type="button" class="rm" data-rm-fav="${s}" aria-label="Retirer ${p.name} des favoris">✕</button></li>`; }).join("");
    else {
      list = cart.map(c => { const p = pbySlug(c.slug); return `<li class="line">${img(p.img, "")}<div><a href="${pageOf(c.slug)}"><strong>${p.name}</strong></a><p class="note">${c.label}${c.color ? " · " + c.color : ""} · ${fmt(c.price)}</p>
        <div class="qty"><button type="button" data-q="-1" data-id="${c.id}" aria-label="Retirer un ${p.name}">−</button><span aria-label="Quantité">${c.qty}</span><button type="button" data-q="1" data-id="${c.id}" aria-label="Ajouter un ${p.name}">+</button></div></div>
        <p><strong>${fmt(c.price * c.qty)}</strong></p><button type="button" class="rm" data-rm-cart="${c.id}" aria-label="Supprimer ${p.name} du panier">✕</button></li>`; }).join("");
      const n = cart.reduce((a, c) => a + c.qty, 0), tot = cart.reduce((a, c) => a + c.qty * c.price, 0);
      if (n) foot = `<footer><p class="total"><span>Total</span><strong>${fmt(tot)}</strong></p><p class="note">Dont ${fmt(n * 0.5)} reversés à Teckels Sans Doux Foyer (0,50 € par article).</p><button type="button" class="btn" disabled>Paiement bientôt disponible</button></footer>`;
    }
    dr.innerHTML = `<div class="backdrop" data-close></div><aside role="dialog" aria-modal="true" aria-labelledby="dr-t"><header><h2 id="dr-t">${fav ? "Mes favoris" : "Mon panier"}</h2><button type="button" class="close" data-close aria-label="Fermer">✕</button></header>
      ${list ? `<ul>${list}</ul>` : `<p class="empty">${fav ? "Pas encore de favoris. Touchez le cœur d’un produit pour le retrouver ici." : "Votre panier est vide."}</p>`}${foot}</aside>`;
  }
  document.addEventListener("click", (e) => {
    const t = e.target, c = (s) => t.closest(s);
    if (c("[data-open]")) { opener = c("[data-open]"); mode = opener.dataset.open; renderDrawer(); dr.hidden = false; dr.querySelector(".close").focus(); return; }
    if (c("[data-close]")) { dr.hidden = true; if (opener) opener.focus(); return; }
    if (c("[data-fav]")) return toggleFav(c("[data-fav]").dataset.fav);
    if (c("[data-rm-fav]")) return toggleFav(c("[data-rm-fav]").dataset.rmFav);
    if (c("[data-rm-cart]")) { cart = cart.filter(x => x.id !== c("[data-rm-cart]").dataset.rmCart); return sync(); }
    if (c("[data-q]")) { const b = c("[data-q]"), it = cart.find(x => x.id === b.dataset.id); it.qty += +b.dataset.q; if (it.qty < 1) cart = cart.filter(x => x !== it); return sync(); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && !dr.hidden) { dr.hidden = true; if (opener) opener.focus(); } });

  /* ---------- Boutique ---------- */
  if (PAGE === "boutique") {
    mount("hero-img", img("hero", "x").replace('loading="lazy"', 'loading="eager" fetchpriority="high"'));
    const item = (n) => `<span class="mq-item"${n ? ' aria-hidden="true"' : ""}>${img("asso", n ? "" : "Logo Teckels Sans Doux Foyer")}<span>Pour chaque article acheté, 0,50 € sont reversés à l’association <strong>Teckels Sans Doux Foyer</strong></span><span aria-hidden="true">♥</span></span>`;
    mount("asso-banner", `<div class="asso" role="region" aria-label="Notre engagement solidaire"><div class="marquee"><div class="track">${[0, 1].map(k => `<div class="seq"${k ? ' aria-hidden="true"' : ""}>${[0, 1, 2].map(n => item(n || k)).join("")}</div>`).join("")}</div></div>
      <button type="button" class="mq-pause" aria-pressed="false">Pause</button></div>`);
    const mq = document.querySelector(".mq-pause");
    if (mq) mq.addEventListener("click", () => { const p = mq.getAttribute("aria-pressed") !== "true"; mq.setAttribute("aria-pressed", p); mq.textContent = p ? "Lecture" : "Pause"; document.querySelector(".asso").classList.toggle("paused", p); });
    mount("filters", D.filters.map(([k, l, ic], i) => `<button class="chip${i ? "" : " on"}" data-f="${k}">${I[ic]}${l}</button>`).join(""));
    mount("products", D.products.map(p => card(p, true)).join("") +
      `<aside class="tip"><div class="icon-dot">${I.heart}</div><p class="eyebrow">Le bon réflexe</p><h3>Une friandise reste une friandise.</h3>
      <p>Elle s’inscrit dans le quotidien de votre teckel, en complément de son alimentation. Pour choisir en fonction de sa santé, demandez conseil à votre vétérinaire.</p>
      <a class="btn light" href="${link("mission")}">Nos engagements ${I.play}</a></aside>`);
    mount("help-img", img("repos", "Teckel au repos"));
    const chips = document.querySelectorAll("#filters .chip"), cards = document.querySelectorAll("#products .card");
    chips.forEach(c => c.addEventListener("click", () => {
      chips.forEach(x => x.classList.toggle("on", x === c));
      let n = 0; cards.forEach(k => { const show = c.dataset.f === "all" || k.dataset.cat === c.dataset.f; k.style.display = show ? "" : "none"; if (show) n++; });
      document.getElementById("count").textContent = `${n} produit${n > 1 ? "s" : ""} · ${c.dataset.f === "all" ? "Tous affichés" : "Filtrés"}`;
    }));
  }

  /* ---------- Mission ---------- */
  if (PAGE === "mission") {
    mount("hero-img", img("jardin", "Teckel dans la lumière du jardin"));
    mount("asso-logo", img("asso", "Logo Teckels Sans Doux Foyer"));
    mount("life", [["Chiot","Découvrir le quotidien","repos","Observer sa croissance, ses habitudes et son confort. Les premiers choix d’accessoires et d’alimentation se discutent avec votre vétérinaire."],
      ["Adulte","Trouver son équilibre","quotidien","Adapter les balades et le quotidien à votre teckel. Rester attentif à son ajustement, à son alimentation et à tout changement d’habitude."],
      ["Senior","Écouter son rythme","hero","Ses besoins peuvent changer avec l’âge. Réévaluer le confort des accessoires et l’alimentation avec le vétérinaire qui le suit."]]
      .map(([t, h, im, p]) => `<article class="card">${img(im, t)}<div class="card-body"><p class="eyebrow">${t}</p><h3>${h}</h3><p class="d">${p}</p></div></article>`).join(""));
    carousel(document.getElementById("vet-gallery"), ["repos", "jardin", "quotidien"], false);
    const h = D.products[0];
    mount("preview", `<div class="hz">${img(h.img, h.name)}<div class="stack"><p class="eyebrow">${h.type} · ${h.need}</p><h2>${h.name}</h2><p>${h.tagline}</p></div>${btn("Voir le harnais", pageOf(h.slug))}</div>`);
    mount("four", D.products.slice(1).map(p => card(p, false)).join(""));
    mount("faq", qa()); bindFaq();
  }

  /* ---------- Blog ---------- */
  if (PAGE === "blog") {
    const f = D.posts[0], pl = (id) => D.pillars.find(p => p.id === id);
    mount("featured", `<div class="split"><div>${cls(img(f.img, f.title), "photo")}</div><div class="stack"><p class="eyebrow">À la une · ${f.cat}</p><h2>${f.title}</h2><p>${f.excerpt}</p>${btn("Lire l’article", link("article") + "?a=" + f.slug)}</div></div>`);
    mount("filters", `<button class="chip on" data-f="all">Tous les thèmes</button>` + D.pillars.map(p => `<button class="chip" data-f="${p.id}">${p.n}. ${p.title}</button>`).join(""));
    mount("pillars", D.pillars.map(p => `<section class="section ${p.theme}" data-pillar="${p.id}">
      <div class="stack" style="gap:12px"><p class="eyebrow">${p.n}. ${p.tag}</p><h2>${p.title}</h2><p>${p.intro}</p></div>
      <div class="grid g3">${D.posts.filter(x => x.pillar === p.id).map(x => `<article class="card">${img(x.img, x.title)}<div class="card-body" style="color:var(--brown)"><p class="eyebrow" style="color:var(--green)">${x.cat}</p><h3>${x.title}</h3><p class="post-meta">${x.date}</p><p class="d">${x.excerpt}</p>${btn("Lire", link("article") + "?a=" + x.slug, "small")}</div></article>`).join("")}</div>
      <div class="stack" style="gap:12px"><p class="eyebrow">Expressions clés</p><p class="small-print">${p.kwIntro}</p><div class="tags">${p.kw.map(k => `<span class="kw">${k}</span>`).join("")}</div></div></section>`).join(""));
    const chips = document.querySelectorAll("#filters .chip"), secs = document.querySelectorAll("#pillars [data-pillar]");
    chips.forEach(c => c.addEventListener("click", () => { chips.forEach(x => x.classList.toggle("on", x === c)); secs.forEach(s => s.style.display = c.dataset.f === "all" || s.dataset.pillar === c.dataset.f ? "" : "none"); }));
  }
  if (PAGE === "article") {
    const p = D.posts.find(x => x.slug === new URLSearchParams(location.search).get("a")) || D.posts[0];
    document.title = p.title + " — Albert";
    const md = document.querySelector('meta[name="description"]'); if (md) md.content = p.excerpt;
    mount("article", `<p class="eyebrow">${p.cat} · ${p.date}</p><h1>${p.title}</h1>${cls(img(p.img, p.title), "photo")}${p.body.map(t => `<p>${t}</p>`).join("")}<a class="btn" href="${link("blog")}">Retour au blog</a>`);
    mount("more", D.posts.filter(x => x !== p).slice(0, 3).map(x => `<article class="card">${img(x.img, x.title)}<div class="card-body"><p class="eyebrow">${x.cat}</p><h3>${x.title}</h3>${btn("Lire", link("article") + "?a=" + x.slug, "small")}</div></article>`).join(""));
  }

  /* ---------- Produit ---------- */
  if (PAGE === "produit") {
    const p = D.products.find(x => x.slug === B.dataset.product);
    const gal = p.harness ? [["harnais","Harnais porté"],["jardin","En balade"]] : [[p.img,"Le sachet"],["hero","Pour les gourmands"],["repos","Au repos"]];
    mount("crumbs", `<a href="${ROOT}index.html">Boutique</a> / ${p.harness ? "Accessoires" : "Friandises"} / ${p.name}`);
    carousel(document.getElementById("gallery"), gal.map(g => g[0]), true, gal.map(g => g[1]));
    let vi = p.harness ? -1 : 0, color = "Bordeaux";
    const colors = [["Bordeaux", "#4a0b0b"], ["Vert sapin", "#1e3806"], ["Rose", "#f480bc"]];
    const compo = !p.harness ? `<section class="compo" aria-labelledby="compo-t"><h2 id="compo-t">Composition</h2><ul>${p.compo.split(" — ")[0].replace(/\.$/, "").split(/,\s*|\s+et\s+/).map(i => `<li>${i}</li>`).join("")}</ul>${p.compo.includes(" — ") ? `<p class="compo-note">${p.compo.split(" — ")[1].replace(/\.$/, "")}</p>` : ""}</section>` : "";
    mount("info", `<p class="eyebrow">${p.type} · ${p.need}</p><h1>${p.name}</h1><p class="sub">${p.tagline}</p><p>${p.desc}</p>
      <p class="price" id="price" aria-live="polite"></p>
      <div role="radiogroup" aria-labelledby="l-var" class="opts"><p id="l-var">${p.harness ? "Taille" : "Format"}</p><div class="opt-row">${p.variants.map((v, i) => `<button type="button" class="opt" role="radio" aria-checked="false" data-i="${i}">${v[0]}${p.harness ? "" : " · " + fmt(v[1])}</button>`).join("")}</div>${p.harness ? `<p class="note">Tailles et correspondances officielles à confirmer. <a href="#guide" style="text-decoration:underline">Voir le guide de mesure</a></p>` : ""}</div>
      ${p.harness ? `<div role="radiogroup" aria-labelledby="l-col" class="opts"><p id="l-col">Couleur · aperçu illustratif</p><div class="swatches">${colors.map(([n, c], i) => `<button type="button" class="sw${i ? "" : " on"}" role="radio" aria-checked="${i === 0}" aria-label="${n}" data-c="${n}" style="background:${c}"></button>`).join("")}</div><p class="note">Nuances de maquette, non contractuelles.</p></div>` : compo}
      <div class="actions"><button type="button" class="btn${p.blue ? " blue" : ""}" id="add">Ajouter au panier ${I.bag}</button><button type="button" class="btn light" data-fav="${p.slug}" aria-pressed="false">${I.heart}<span class="t">Ajouter aux favoris</span></button></div>
      <p class="msg" id="msg" role="status"></p>
      <div class="gift">${img("asso", "Logo Teckels Sans Doux Foyer")}<p><strong>0,50 € reversés à Teckels Sans Doux Foyer</strong> pour chaque article acheté, pour aider les teckels abandonnés.</p></div>
      ${p.harness ? "" : `<p class="note">Une friandise ne remplace ni une alimentation complète ni un avis vétérinaire.</p>`}`);
    const priceEl = document.getElementById("price"), msg = document.getElementById("msg"), opts = document.querySelectorAll(".opt");
    const upd = () => { priceEl.textContent = fmt(p.variants[Math.max(vi, 0)][1]); opts.forEach((b, i) => { b.setAttribute("aria-checked", i === vi); b.classList.toggle("on", i === vi); }); };
    opts.forEach((b, i) => b.addEventListener("click", () => { vi = i; msg.textContent = ""; upd(); }));
    document.querySelectorAll(".sw").forEach(b => b.addEventListener("click", () => { color = b.dataset.c; document.querySelectorAll(".sw").forEach(x => { x.classList.toggle("on", x === b); x.setAttribute("aria-checked", x === b); }); }));
    document.getElementById("add").addEventListener("click", () => {
      if (vi < 0) { msg.textContent = "Choisissez d’abord une taille."; opts[0].focus(); return; }
      addCart(p.slug, p.variants[vi][0], p.variants[vi][1], p.harness ? color : ""); msg.textContent = "Ajouté au panier ✓";
    });
    upd();
    if (p.harness) {
      mount("extra", `<section class="section dark"><p class="eyebrow">Sa morphologie d’abord</p><h2>Un teckel n’est pas un chien comme les autres.</h2><div class="grid g3">
        ${[["Une silhouette unique","Un corps allongé, des pattes courtes : sa morphologie guide notre démarche de conception."],["Un choix individuel","L’ajustement doit tenir compte de votre teckel. Sa mesure et son confort passent avant l’aspect du harnais."],["Une démarche accompagnée","Albert conçoit des produits spécifiques à leurs besoins avec l’aide de vétérinaires."]].map(([t, d]) => `<div class="panel g"><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>
        <p class="small-print">Les matériaux, réglages et caractéristiques techniques seront précisés dans la fiche officielle. Aucun effet médical n’est revendiqué.</p></section>
        <section class="section" id="guide"><div class="split"><div class="stack"><p class="eyebrow">Avant de choisir</p><h2>Mesurer, puis trouver le bon ajustement.</h2></div><p>Préparez un mètre souple et installez votre teckel debout, au calme. Ces repères vous aident à préparer votre choix ; ils ne constituent pas un tableau de tailles officiel.</p></div>
        <div class="grid g3">${[["01","Observer","Repérez le thorax derrière les pattes avant, sans forcer votre teckel à prendre une posture inhabituelle."],["02","Relever","Faites le tour du thorax avec le mètre souple, sans serrer. Notez la mesure et vérifiez-la une seconde fois."],["03","Faire confirmer","Conservez vos mesures pour les comparer au guide officiel lorsqu’il sera disponible. En cas de doute, contactez-nous."]].map(([n, t, d]) => `<div class="panel w"><span class="num">${n}</span><h3>${t}</h3><p>${d}</p></div>`).join("")}</div>
        <div class="banner"><p>Pas de taille choisie au hasard. Faisons le point ensemble.</p><a class="btn light" href="mailto:contact@albert.fr">Demander conseil ${I.play}</a></div></section>
        <section class="section green"><div class="split"><div class="stack"><p class="eyebrow">Au quotidien</p><h2>Une balade, un rythme.</h2></div><div class="stack">
        <p>Avant de sortir, vérifiez l’ajustement et observez si votre teckel bouge librement.</p><p>Pendant la promenade, restez attentif à son confort. En cas de gêne, interrompez l’usage et faites vérifier l’ajustement.</p><p>En cas de douleur, de difficulté à se déplacer ou de problème de santé, demandez l’avis de votre vétérinaire.</p></div></div></section>`);
    }
    mount("others", others(p).map(x => card(x, false)).join(""));
  }

  sync();

  /* ---------- Carrousel ---------- */
  function carousel(root, keys, thumbs, labels) {
    if (!root) return; let i = 0;
    root.innerHTML = `<div class="main-wrap"></div><div class="car-bar"><span class="cnt"></span><span class="dots">${keys.map(() => "<i></i>").join("")}</span><span class="arrows"><button class="arrow" data-d="-1" aria-label="Précédent">${I.left}</button><button class="arrow" data-d="1" aria-label="Suivant">${I.arrow}</button></span></div>
      ${thumbs ? `<div class="thumbs">${keys.map((k, n) => `<button class="thumb">${img(k, "")}<span>${labels[n]}</span></button>`).join("")}</div>` : ""}`;
    const wrap = root.querySelector(".main-wrap");
    const show = (n) => { i = (n + keys.length) % keys.length; wrap.innerHTML = cls(img(keys[i]), "main photo"); root.querySelector(".cnt").textContent = `0${i + 1} / 0${keys.length}`;
      root.querySelectorAll(".dots i").forEach((d, x) => d.classList.toggle("on", x === i)); root.querySelectorAll(".thumb").forEach((t, x) => t.classList.toggle("on", x === i)); };
    root.querySelectorAll(".arrow").forEach(a => a.addEventListener("click", () => show(i + +a.dataset.d)));
    root.querySelectorAll(".thumb").forEach((t, x) => t.addEventListener("click", () => show(x)));
    show(0);
  }
  function bindFaq() { document.querySelectorAll(".qa button").forEach(b => b.addEventListener("click", () => b.parentElement.classList.toggle("open"))); }
})();
