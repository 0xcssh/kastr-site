import type { Dictionary } from "./en";

// French copy. Same keys as en.ts (enforced by the Dictionary type). Same rules: no em dashes, no prices.

export const fr: Dictionary = {
  meta: {
    title: "Kastr : appli collection Hot Wheels, scanner et cote",
    description:
      "Combien vaut ta Hot Wheels ? Scanne le blister pour voir ses ventes récentes et si tu l'as déjà. 78 256 voitures hors ligne, recherche gratuite, sans pub.",
  },
  nav: {
    features: "Fonctions",
    faq: "FAQ",
    support: "Aide",
    language: "Langue",
    home: "Accueil Kastr",
    skip: "Aller au contenu",
  },
  badge: {
    line1: "Télécharger dans",
    soon: "Bientôt dans",
    line2: "l'App Store",
    aria: "Télécharger Kastr dans l'App Store",
  },
  hero: {
    eyebrow: "L'appli de collection Hot Wheels et miniatures",
    title: ["Cette Hot Wheels, elle vaut combien ?", "Tu l'as déjà ?"],
    cta: "Scanne-la pour le savoir.",
    subtitle:
      "L'appli de collection des chasseurs de miniatures. Les ventes récentes dans ta devise, les doublons signalés avant d'acheter, et les Treasure Hunt de l'année dans une liste. 78 256 voitures, hors ligne.",
    note: "Téléchargement gratuit · Sans pub · Hors ligne",
    imageAlt: "Fiche Kastr de la '23 Ram 1500 Super Treasure Hunt 2026 : médiane de 24 ventes sous blister avec le graphique des ventes, déjà au garage",
  },
  reveal: {
    title: "Super Treasure Hunt",
    added: "Ajoutée à ton garage",
    alt: "La '23 Ram 1500 Super Treasure Hunt 2026 en Spectraflame Plum Crazy",
  },
  wall: {
    label: "Le catalogue",
  },
  answer: {
    question: "Qu'est-ce que Kastr ?",
    text: "Kastr est une app iPhone pour les collectionneurs de voitures miniatures. Elle embarque un catalogue hors ligne de 78 256 voitures, de 1968 à aujourd'hui : Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions. En rayon, elle lit le blister, te dit si la voiture est déjà dans ton garage et si c'est une Treasure Hunt, et affiche les ventes récentes dans ta devise.",
  },
  stats: [
    { value: "78 256", label: "voitures au catalogue" },
    { value: "1968", label: "jusqu'aux sorties de l'année" },
    { value: "7", label: "marques, Hot Wheels en tête" },
    { value: "Hors ligne", label: "recherche, garage et liste de chasse" },
  ],
  hunt: {
    label: "Chasse",
    title: "Scanne le rayon. Sache-le avant de payer.",
    body: "Enchaîne les blisters sans t'arrêter et fais le tri après. Chaque résultat te dit si la voiture est déjà dans ton garage, si ce serait un doublon et si c'est une Treasure Hunt. La liste TH et STH de l'année reste en haut, avec une coche sur celles que tu as trouvées.",
    chips: {
      owned: "Dans ton garage",
      duplicate: "Doublon",
      th: "Treasure Hunt",
      sth: "Super Treasure Hunt",
    },
    chipsLabel: "Ce que Kastr affiche sur une voiture scannée",
    imageAlt: "Écran Chasse de Kastr : 2 des 15 Super Treasure Hunt 2026 trouvées, avec la liste de l'année en grille de photos",
  },
  garage: {
    label: "Garage",
    title: "Ton garage, comme un portefeuille.",
    body: "Ce que tu as payé, ce que ça vaut aujourd'hui et l'écart entre les deux. Tes constructeurs, tes décennies, tes raretés, et les séries que tu es près de finir. Import et export CSV, pour que ton tableur te suive.",
    imageAlt: "Garage Kastr : valeur du garage face au prix payé, 39 voitures, progression des Super Treasure Hunt et les voitures en cartes photo",
  },
  features: {
    label: "Fonctions",
    title: "Tout ce qu'il faut à un collectionneur.",
    items: {
      catalog: {
        title: "Toutes les voitures depuis 1968",
        body: "78 256 voitures stockées dans l'app. Cherche par nom, année, série ou numéro de jouet, même au sous-sol d'un magasin sans réseau.",
      },
      brands: {
        title: "Sept marques, un seul garage",
        body: "Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions.",
      },
      prices: {
        label: "Ventes récentes",
        title: "Des valeurs avec les ventes derrière",
        body: "Les ventes eBay récentes et ce que les collectionneurs ont payé, dans ta devise avec le prix d'origine à côté. Tu vois de combien de ventes vient chaque valeur.",
      },
      where: {
        title: "Où la trouver",
        row: "En direct sur eBay",
        body: "Il t'en manque une ? Kastr affiche les annonces eBay ouvertes en ce moment pour cette voiture précise, pour compléter ta série.",
      },
      completion: {
        ringLabel: "Super Treasure Hunt 2026",
        title: "Des médailles à gagner",
        body: "Vois quelle part de la chasse de l'année tu possèdes, et de toutes les Treasure Hunt jamais sorties. Finis une série et sa médaille s'allume.",
      },
      looks: {
        dark: "Sombre",
        light: "Clair",
        title: "Sombre ou clair",
        body: "Noir paddock par défaut, un thème clair si tu préfères, et une carte à partager pour tes plus belles trouvailles.",
      },
    },
  },
  soon: {
    title: "En route",
    tag: "Bientôt",
    items: {
      community: {
        title: "Un fil pour les collectionneurs",
        body: "Montre une trouvaille, joins une voiture de ton garage, signale une erreur du catalogue. Signalement et blocage intégrés dès le premier jour.",
      },
    },
  },
  principles: {
    label: "Nos règles",
    title: "Pensée comme les collectionneurs l'ont demandé.",
    items: [
      {
        title: "La recherche reste gratuite",
        body: "Chercher une voiture et l'ajouter depuis le catalogue est gratuit et illimité.",
      },
      {
        title: "Des valeurs vérifiables",
        body: "La valeur d'une voiture est visible gratuitement, à côté du nombre de ventes dont elle vient.",
      },
      {
        title: "Pas de publicité",
        body: "Aucune publicité dans Kastr et aucun pistage publicitaire. C'est Kastr Pro qui fait vivre l'app.",
      },
      {
        title: "Ton garage reste sur ton téléphone",
        body: "Pas besoin de compte pour construire ta collection. Le compte ne sert qu'à la communauté et aux retours, et tu peux le supprimer depuis l'app.",
      },
    ],
  },
  faq: {
    title: "Les questions des collectionneurs",
    items: [
      {
        q: "Qu'est-ce que Kastr ?",
        a: "Kastr est une app iPhone pour les collectionneurs de miniatures. Elle contient un catalogue hors ligne de 78 256 voitures, de 1968 à aujourd'hui, et te dit en rayon si une voiture est déjà dans ton garage, si c'est une Treasure Hunt et à combien elle s'est vendue récemment.",
      },
      {
        q: "Kastr marche-t-elle sans réseau ?",
        a: "Oui. Tout le catalogue est stocké sur ton iPhone : la recherche, ton garage et la liste de chasse marchent dans un magasin sans aucun réseau. Les valeurs et les annonces se mettent à jour quand tu retrouves une connexion.",
      },
      {
        q: "Quelles marques sont au catalogue ?",
        a: "Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions. Hot Wheels est la plus complète, Treasure Hunt et Super Treasure Hunt comprises.",
      },
      {
        q: "Comment marche le scan ?",
        a: "Kastr lit le numéro de jouet et le code-barres du blister directement sur ton iPhone. S'il n'y arrive pas, et si tu es d'accord, la photo passe par notre serveur vers un service d'IA qui identifie la voiture. Chaque scan utilise un crédit, et un scan qui ne trouve rien te le rend. La recherche par nom reste gratuite et illimitée.",
      },
      {
        q: "D'où viennent les valeurs ?",
        a: "Des ventes eBay récentes et des prix partagés par les collectionneurs dans Kastr. Chaque valeur indique de combien de ventes elle vient, et elle est convertie dans ta devise avec les taux de la Banque centrale européenne, le prix d'origine affiché à côté.",
      },
      {
        q: "Kastr est-elle gratuite ?",
        a: "Kastr se télécharge gratuitement, et la recherche dans le catalogue est gratuite et illimitée. Kastr Pro est un abonnement facultatif avec des extras comme les scans illimités, plusieurs garages et la valeur totale de ton garage. Le prix est affiché dans l'app avant de t'abonner, et tu peux résilier à tout moment dans les réglages de ton identifiant Apple.",
      },
      {
        q: "Comment Kastr sait-elle qu'une voiture est une Treasure Hunt ?",
        a: "Les Treasure Hunt et Super Treasure Hunt sont repérées dans le catalogue pour chaque année. Quand tu cherches ou scannes une voiture, Kastr affiche sa rareté, et la liste de chasse montre les TH et STH de l'année en photos pour les repérer en rayon.",
      },
      {
        q: "Faut-il un compte ?",
        a: "Non. Tu peux construire ton garage sans compte. Un compte avec Se connecter avec Apple n'est nécessaire que pour la communauté et les retours dans l'app.",
      },
      {
        q: "Puis-je importer ma collection ?",
        a: "Oui. Enregistre ton tableur en CSV et importe-le dans ton garage. Tu peux aussi exporter ton garage en CSV à tout moment.",
      },
      {
        q: "Kastr existe-t-elle sur Android ?",
        a: "Pas encore. Kastr fonctionne sur iPhone avec iOS 17 ou plus récent.",
      },
      {
        q: "Kastr est-elle liée à Mattel ?",
        a: "Non. Kastr est une app indépendante, non affiliée à Mattel, Inc. Hot Wheels et Matchbox sont des marques de Mattel, Inc.",
      },
    ],
  },
  cta: {
    title: "Ton garage, dans ta poche.",
    body: "Téléchargement gratuit. Pour iPhone avec iOS 17 ou plus récent.",
  },
  footer: {
    disclaimer: "Kastr est indépendante et n'est pas affiliée à Mattel, Inc.",
    trademarks:
      "Hot Wheels et Matchbox sont des marques de Mattel, Inc. Tomica, Mini GT, M2 Machines, Maisto et Racing Champions appartiennent à leurs propriétaires respectifs. Les noms de marques servent uniquement à décrire les voitures du catalogue.",
    links: {
      privacy: "Confidentialité",
      terms: "Conditions",
      support: "Aide",
      credits: "Crédits",
    },
    publisher: "Éditeur",
  },
  legalChrome: {
    updated: "Dernière mise à jour",
    contents: "Sur cette page",
    back: "Retour à Kastr",
  },
  notFound: {
    title: "Cette page a pris la mauvaise sortie.",
    body: "La page que tu cherches n'existe pas.",
    home: "Retour à Kastr",
  },
  blog: {
    title: "Guides",
    empty: "Des guides pour les collectionneurs arrivent bientôt.",
  },
};
