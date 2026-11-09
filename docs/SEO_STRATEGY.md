# Stratégie SEO de kastr.app

> Écrite le 9 nov. 2026 pour Cash. Méthode : skills `site-seo-geo` et `site-blog` de La Recette, plus une recherche de mots-clés et de concurrents faite le même jour.
> Limites de la recherche : aucun outil ne donne de volumes de recherche. La demande est déduite de l'autocomplétion de Google (environ 55 requêtes, États-Unis). Qui se classe a été lu sur Bing/DuckDuckGo et dans les sitemaps des concurrents, pas sur une vraie page 1 de Google. Search Console donnera les vrais chiffres quelques semaines après la validation.

## 1. Le constat en une minute

- **Le site n'a qu'une page qui compte (l'accueil).** Il ne peut se classer que sur notre nom et sur « hot wheels collection app ». Sur cette dernière requête, la page 1 est faite de fiches App Store (Die Carz, l'app officielle Hot Wheels Showcase de Mattel, iCollect, Hunt64…). Sur les requêtes d'app, c'est l'ASO qui fera le travail, pas le site.
- **La demande est ailleurs, et elle est forte :**
  - les listes de l'année (« hot wheels super treasure hunt 2026 list », « 2027 », chaque lettre de caisse « 2026 case k ») ;
  - les dates de sortie des caisses ;
  - la valeur : « hot wheels value » se complète en *value scanner, value checker, value app, value lookup* ;
  - le guide « comment reconnaître une STH ».
- **Un site d'app jeune peut y arriver :** l'article de Hunt64 sur les STH 2026 est 9e sur Bing pour « hot wheels super treasure hunt 2026 list ». Les sites en place sont souvent maigres ou datés (hotwheelshub, 164custom, munclemikes).
- **Nos concurrents ont déjà des milliers de pages :**

  | Site | Pages |
  |---|---|
  | Die Carz | 43 000 fiches Hot Wheels et un blog de 13 articles |
  | Hunt64 | 2 177 fiches maigres et 17 articles, dont la liste STH 2026 et « Die Carz vs iCollect vs Hunt64 » |
  | allhotwheels | 37 000 pages |
  | hwpriceguide | 37 000 pages |

  Nous en avons 11.
- **Le calendrier presse :** les recherches sur 2027 ont déjà commencé (première STH 2027 repérée le 21 juillet, caisse A le 13 septembre). Une liste de l'année se cherche de septembre de l'année d'avant jusqu'après sa fin. **Les pages 2027 sont à mettre en ligne maintenant.**
- **Notre avantage, que les autres n'ont pas tous ensemble :**
  - le catalogue complet ;
  - la caisse de 469 TH/STH ;
  - une tâche (`release-watch`) qui détecte chaque jour les nouvelles caisses sur le wiki ;
  - des valeurs réelles (prix plancher eBay, ventes Trawl, historique quotidien) ;
  - des compteurs « l'ont / la veulent » ;
  - des garages publics.

## 2. Les règles qu'on ne casse pas

1. **Pas de copie du wiki en masse.** La politique de Google contre le contenu produit à grande échelle (« scaled content abuse ») cite comme exemples le fait de reprendre et transformer automatiquement le contenu d'autres sites, y compris par traduction. 78 000 pages recopiées de Fandom, ou traduites automatiquement en français, tomberaient dedans. Un site pénalisé pour ça met longtemps à s'en remettre (John Mueller, Google). Une page n'est publiée que si elle apporte quelque chose à nous : valeur, caisse, compteurs, photos, conseils pour reconnaître la voiture.
2. **Chaque page répond d'abord, en une phrase** (bloc réponse de 40 à 60 mots sous le titre), puis une FAQ dont le balisage FAQPage reprend exactement le texte visible. C'est ce que les IA citent (ChatGPT, Perplexity, AI Overviews).
3. **Fraîcheur avant volume.** Une liste mise à jour dans les 48 h après chaque caisse vaut plus que cent pages figées.
4. **Mêmes interdits que l'app :** pas de promesse de gains, pas de discours de revente, la mention « non affilié à Mattel », jamais « Hot Wheels » dans un nom de domaine ou de marque.
5. **Le français suit l'anglais.** Les Français tapent leurs recherches de listes en anglais, et le volume en français est faible. On traduit les pages clés, on n'en fait pas en français seulement.

## 3. Le plan

### Étape 0. Être indexé (cette semaine)

| Fait le 9 nov. | Reste à faire, par Cash |
|---|---|
| HTTPS forcé sur tout le domaine (http://kastr.app restait en clair). | **Google Search Console** (voir §5) : valider le domaine, envoyer les deux sitemaps, demander l'indexation de /en et /fr. |
| IndexNow branché : Bing, Yandex, Seznam et Naver sont prévenus à chaque déploiement (`npm run indexnow`). Bing alimente ChatGPT Search et Copilot. Premier envoi : 11 adresses acceptées. | **Bing Webmaster Tools** : « Importer depuis Google Search Console », un clic une fois la console validée. |
| Lighthouse mobile, accessibilité : 96 → 100 (contraste du rouge, nom du lien de langue). SEO déjà à 100. | |
| Les 404 sur les données de page en prélecture sont corrigés. | |
| Images en demi-taille pour les petits écrans. | |
| Les effets qui repeignaient la page à chaque image sont retirés. | |

Performance mobile : 57 avant ces corrections. Après, mesurée seulement sur un serveur local sans compression (environ 50), le temps de blocage passe d'environ 1,5 s à environ 1,1 s ; la mesure sur le site en ligne reste à refaire. Google classe sur les mesures de vrais visiteurs, que nous n'avons pas encore, donc ce n'est pas bloquant. À reprendre (animations au défilement) si Search Console signale les Core Web Vitals.

### Étape 1. Les pages de chasse (novembre, avant le lancement)

C'est le cœur de la stratégie. Elles sont construites à partir du catalogue Supabase au moment du build et reconstruites chaque jour juste après `release-watch`, avec un envoi IndexNow.

| Page | Adresse | Requêtes visées | Ce qu'elle apporte de plus que les autres |
|---|---|---|---|
| Super Treasure Hunt de l'année | `/en/super-treasure-hunt/2027`, `/2026`, puis chaque année depuis 1995 | « hot wheels super treasure hunt 2027 list », « 2026 sth list with pictures » | Caisse de chaque voiture, valeur actuelle, « l'ont / la veulent », comment la reconnaître (indices de `docs/RARITY_RECOGNITION.md`), date de mise à jour visible |
| Treasure Hunt de l'année | `/en/treasure-hunt/2027`… | « 2026 treasure hunt list », « 2027 treasure hunt list » | Pareil, avec le numéro de jouet et le lien vers la STH de la même caisse |
| Caisse | `/en/case/2026-k`… | « hot wheels 2026 case k », « 2027 a case » | La TH et la STH de la caisse, la date de sortie connue, ce qu'on sait du reste de la caisse |
| Calendrier des sorties | `/en/release-dates` | « hot wheels case release dates 2026 », « next case release date » | Une seule page tenue à jour (personne ne la fait bien) |

On commence par 2027, 2026 et 2025 (TH et STH, environ 12 pages par langue), puis les archives. Ce sont les pages à publier en premier : la demande y est forte, la concurrence faible et nous avons les données.

### Étape 2. Les guides et la page d'app (novembre et décembre)

Huit articles de blog bilingues, écrits avec `/blog`, chacun avec un bloc réponse et une FAQ. Pas de remplissage.

1. How to spot a Super Treasure Hunt (avec nos indices par époque, la seule vraie méthode est le carton et les roues).
2. Treasure Hunt vs Super Treasure Hunt.
3. Hot Wheels case codes explained (A à Q, comment lire le code sur le carton).
4. What are Hot Wheels worth? Comment estimer une voiture : les ventes réelles, le blister, l'état, sans promesse de gain.
5. The most valuable Hot Wheels of 2026, à partir de nos propres prix. Article de données mis à jour chaque mois, qui peut attirer des liens d'autres sites.
6. Real Riders, Spectraflame, Zamac, Chase, RLC : le glossaire.
7. Best Hot Wheels collection apps in 2026 : une comparaison honnête (Die Carz, Hunt64, iCollect, Hot Wheels Showcase, Kastr), qui dit aussi ce que les autres font mieux. Hunt64 a déjà la sienne.
8. How to catalog a Hot Wheels collection (import depuis un tableur ou une autre app).

S'y ajoutent deux pages d'atterrissage pour les requêtes d'outil :
- `/en/hot-wheels-scanner` pour « value scanner », « scanner app » ;
- `/en/value` pour « value checker », « value lookup » : une recherche par nom ou par numéro de jouet qui affiche la valeur et renvoie vers l'app.

### Étape 3. Le lancement (décembre)

- Dès que l'app a son adresse App Store :
  - le vrai badge Apple ;
  - la Smart App Banner ;
  - les données structurées SoftwareApplication avec la note ;
  - un lien depuis chaque page de chasse.
- **Liens entrants :**
  - autoevolution publie chaque caisse et chaque STH : leur proposer nos données (valeurs, caisses) comme source citée ;
  - Orange Track et les créateurs du programme Pro à vie ;
  - Reddit r/HotWheels : répondre avec la liste de l'année quand on la demande, sans spam ;
  - un communiqué de lancement.
- **Garages publics** (`/@pseudo`) : ne laisser indexer que ceux qui ont au moins 20 voitures et une bio ; les autres en `noindex`, sinon ce sont des pages maigres en masse.

### Étape 4. Les fiches voitures (janvier et après, par lots)

Le plus gros gisement, et le plus risqué. Les requêtes de valeur par modèle (« datsun 510 wagon super treasure hunt value », « twin mill value ») sont prises par des sites faibles : underpricedai se classe avec 19 pages. Mais 78 000 fiches d'un coup déclencheraient le filtre anti-volume.

- **Premier lot :** les TH, STH, RLC et Premium depuis 2013 qui ont une valeur (quelques milliers). Une fiche = un modèle avec ses versions, la valeur de chacune et son historique, la caisse, les compteurs et un lien vers le wiki (licence CC BY-SA, attribution sur chaque page).
- **Ensuite :** un lot par mois, seulement si Search Console montre que le lot précédent est indexé et reçoit des clics.

### Étape 5. Mesurer

| Quand | Ce qu'on regarde dans Search Console | Seuil |
|---|---|---|
| 4 semaines après les pages de chasse | Pages indexées, impressions sur « super treasure hunt 2027 » | Au moins 80 % des pages de chasse indexées |
| 3 mois | Clics par semaine, position moyenne des pages de chasse | Pages de chasse en page 1 sur leur année |
| Chaque mois | Requêtes qui apparaissent sans page dédiée | Elles deviennent la prochaine page ou le prochain article |

On suit aussi les visites venant de ChatGPT et Perplexity : c'est le résultat de l'étape 2.

## 4. Décisions à prendre (Cash)

1. **Photos sur le web.** Les pages de chasse sans photos perdront contre « …list with pictures ». Le CDN de Fandom bloque l'affichage de ses photos sur d'autres sites (et on ne contourne pas ce blocage, CLAUDE.md §9). Trois options :
   - attendre l'archive de Grunty89 ;
   - prendre nos propres photos (la caisse achetée, les scans) ;
   - les photos de la communauté avec accord.

   **Recommandation :** lancer sans photos avec un lien vers la fiche du wiki, et ajouter nos photos au fil de l'eau.
2. **Valeurs sur le web.** Afficher le prix plancher eBay sur des pages publiques expose un peu plus à la licence eBay (§9.5 : « modéliser des prix ») que dans l'app. L'annonce réelle la moins chère, avec son lien affilié EPN, est la forme la plus défendable, et elle rapporte des commissions. **Recommandation :** l'annonce la moins chère avec son lien sur les pages de chasse, pas de médiane des ventes eBay sur le web.
3. **Feu vert pour l'étape 1** (pages STH/TH 2027, 2026, 2025 en anglais et en français, reconstruites chaque jour).

## 5. Search Console : la marche à suivre (5 minutes)

1. Ouvrir https://search.google.com/search-console avec le compte Google du projet et cliquer « Ajouter une propriété ».
2. Choisir **Domaine** (pas « Préfixe d'URL ») et taper `kastr.app`.
3. Deux possibilités :
   - si Google propose de valider automatiquement avec Cloudflare, accepter (il demande une connexion à Cloudflare) ;
   - sinon, copier la valeur `google-site-verification=…` et me l'envoyer : je pose l'enregistrement TXT par l'API Cloudflare.

   Cliquer ensuite « Valider ».
4. Menu **Sitemaps** : envoyer `sitemap.xml`, puis `sitemap-profiles.xml`.
5. Menu **Inspection de l'URL** : coller `https://kastr.app/en`, puis « Demander l'indexation » ; même chose pour `https://kastr.app/fr`.
6. Sur https://www.bing.com/webmasters : « Importer depuis Google Search Console ».

Pour me donner la lecture des chiffres plus tard : ajouter l'adresse d'un compte de service Google Cloud comme utilisateur « Restreint » dans Search Console. Je pourrai alors lire les requêtes par l'API sans toucher à ton compte.

## Sources

- Sitemaps : hunt64.app/sitemap-cars.xml, diecarz.com/sitemap.xml, hwpriceguide.com/sitemap.xml, allhotwheels.com/sitemap.xml, hotwheelstreasure.com/sitemap.xml, diecasthub.app/sitemap.xml
- hunt64.app/blog/2026-hot-wheels-super-treasure-hunt-list (publié le 7 oct., mis à jour le 3 nov. 2026)
- autoevolution.com : première STH 2027 (21 juil. 2026), caisse A 2027 (13 sept. 2026)
- orangetrackdiecast.com : rapports de caisses 2026 (A le 22 oct. 2025 … N le 10 sept. 2026)
- Politique anti-spam de Google : developers.google.com/search/docs/essentials/spam-policies
- Baisse des clics avec les AI Overviews : Ahrefs (déc. 2025, environ -58 % pour la 1re place), Pew (juil. 2025)
