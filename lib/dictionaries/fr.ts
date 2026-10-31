import type { Dictionary } from "./en";

// French copy. Same keys as en.ts (enforced by the Dictionary type). Same rules: no em dashes, no prices.

export const fr: Dictionary = {
  meta: {
    title: "Kastr : l'app des collectionneurs de miniatures, au rayon",
    description:
      "Sache en deux secondes si tu as déjà une voiture miniature, si c'est une Treasure Hunt et combien elle vaut. Catalogue hors ligne d'environ 78 000 voitures, iPhone.",
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
    line2: "l'App Store",
    aria: "Télécharger Kastr dans l'App Store",
  },
  hero: {
    eyebrow: "L'app des collectionneurs de miniatures",
    title: "Sache-le en deux secondes.",
    subtitle:
      "Si tu l'as déjà, si c'est une Treasure Hunt, et combien elle vaut. Directement devant le rayon.",
    imageAlt: "Écran de recherche de Kastr pour F40 : six résultats, une Super Treasure Hunt, deux voitures déjà au garage",
  },
  mockup: {
    search: "Recherche",
    garage: "Garage",
    hunt: "Chasse",
    inGarage: "Au garage",
    toGarage: "Au garage",
    wishlist: "Liste d'envies",
    results: "6 résultats",
    th: "Treasure Hunt",
    sth: "Super Treasure Hunt",
    added: "Ajoutée à ton garage",
    guide: "Super Treasure Hunt 2026",
    year: "Année",
    series: "Série",
    colour: "Couleur",
    toyNumber: "N° de jouet",
  },
  answer: {
    question: "Qu'est-ce que Kastr ?",
    text: "Kastr est une app iPhone pour les collectionneurs de voitures miniatures. Elle embarque un catalogue hors ligne d'environ 78 000 voitures, de 1968 à aujourd'hui : Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions. Au rayon, elle te dit si une voiture est déjà dans ton garage et si c'est une Treasure Hunt.",
  },
  stats: [
    { value: "78 000+", label: "voitures au catalogue" },
    { value: "1968", label: "jusqu'aux sorties de l'année" },
    { value: "7", label: "marques, Hot Wheels en tête" },
    { value: "Hors ligne", label: "recherche, garage et guide de chasse" },
  ],
  aisle: {
    title: "Déjà dans ton garage ?",
    body: "Tape un nom, une année ou le numéro de jouet du blister. Kastr vérifie ton garage sur place, sans réseau, et te signale un doublon avant que tu passes en caisse.",
    chips: {
      owned: "Dans ton garage",
      duplicate: "Doublon",
      th: "Treasure Hunt",
      sth: "Super Treasure Hunt",
    },
    chipsLabel: "Ce que Kastr affiche sur un résultat de recherche",
    imageAlt: "Fiche Kastr d'une Honda Civic Custom 2026, marquée comme déjà au garage",
  },
  features: {
    title: "Tout ce qu'il faut pour chasser, hors ligne.",
    items: {
      catalog: {
        title: "Toutes les voitures depuis 1968",
        body: "Environ 78 000 voitures stockées dans l'app. Recherche par nom, année, série ou numéro de jouet, même au sous-sol d'un magasin.",
      },
      brands: {
        title: "Sept marques, un seul garage",
        body: "Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions.",
      },
      garage: {
        title: "Ton garage, tes notes",
        body: "Le prix payé, le lieu de la trouvaille, l'état. Une liste d'envies pour celles que tu cherches. Import et export CSV : ton tableur te suit.",
      },
      hunt: {
        title: "Les Treasure Hunts de l'année",
        body: "Les TH et STH de l'année en grille de photos, avec une coche sur celles que tu as déjà.",
      },
      completion: {
        title: "Des médailles à gagner",
        body: "Vois où tu en es sur la chasse de l'année, et sur toutes les Treasure Hunts jamais sorties. Complète une série et sa médaille s'allume.",
      },
    },
  },
  reveal: {
    title: "Trouve une Super Treasure Hunt. Ressens-le.",
    body: "Quand la voiture est une Treasure Hunt ou une Super Treasure Hunt, Kastr ne la cache pas dans une petite étiquette. L'écran s'illumine d'or Spectraflame et ton iPhone répond d'une vibration franche.",
    imageAlt: "Écran de révélation de Kastr pour une Super Treasure Hunt, à côté du guide de chasse 2026",
  },
  soon: {
    title: "En route",
    tag: "Bientôt",
    items: {
      scan: {
        title: "Scanne-la",
        body: "Vise le code-barres ou le blister, ou photographie une voiture loose. Photographie tout un présentoir à la suite et trie après.",
      },
      values: {
        title: "Des valeurs, avec les ventes derrière",
        body: "Une valeur dans ta devise, le nombre de ventes d'où elle vient, et les ventes elles-mêmes. Blister, loose et lots séparés.",
      },
      community: {
        title: "Un fil pour les collectionneurs",
        body: "Montre une trouvaille, joins une voiture de ton garage, signale une erreur du catalogue. Signalement et blocage dès le premier jour.",
      },
    },
  },
  principles: {
    title: "Construite comme les collectionneurs l'ont demandé.",
    items: [
      {
        title: "La recherche reste gratuite",
        body: "Chercher une voiture et l'ajouter depuis le catalogue est gratuit et illimité.",
      },
      {
        title: "Des valeurs vérifiables",
        body: "Quand les valeurs arriveront, celle d'une voiture sera visible gratuitement, avec le nombre de ventes d'où elle vient.",
      },
      {
        title: "Pas de publicité",
        body: "Pas de pub dans Kastr, ni de pistage publicitaire. C'est Kastr Pro qui fait vivre l'app.",
      },
      {
        title: "Ton garage reste sur ton téléphone",
        body: "Pas besoin de compte pour construire ta collection. Le compte sert seulement aux fonctions communautaires, et tu peux le supprimer depuis l'app.",
      },
    ],
  },
  faq: {
    title: "Les questions des collectionneurs",
    items: [
      {
        q: "Qu'est-ce que Kastr ?",
        a: "Kastr est une app iPhone pour les collectionneurs de voitures miniatures. Elle contient un catalogue hors ligne d'environ 78 000 voitures, de 1968 à aujourd'hui, et te dit au rayon si une voiture est déjà dans ton garage et si c'est une Treasure Hunt.",
      },
      {
        q: "Kastr marche-t-elle sans réseau ?",
        a: "Oui. Tout le catalogue est stocké sur ton iPhone : la recherche, ton garage et le guide de chasse marchent dans un magasin sans aucun réseau.",
      },
      {
        q: "Quelles marques sont au catalogue ?",
        a: "Hot Wheels d'abord, puis Matchbox, Mini GT, Tomica, M2 Machines, Maisto et Racing Champions. Hot Wheels est la mieux couverte, Treasure Hunts et Super Treasure Hunts comprises.",
      },
      {
        q: "Kastr est-elle gratuite ?",
        a: "Kastr se télécharge gratuitement, et la recherche dans le catalogue est gratuite et illimitée. Kastr Pro est un abonnement facultatif qui ajoute des extras, comme plusieurs garages. Le prix est affiché dans l'app avant de t'abonner, et tu peux résilier à tout moment dans les réglages de ton identifiant Apple.",
      },
      {
        q: "Comment Kastr sait-elle qu'une voiture est une Treasure Hunt ?",
        a: "Les Treasure Hunts et Super Treasure Hunts sont repérées dans le catalogue, année par année. Quand tu cherches une voiture, Kastr affiche sa rareté, et le guide de chasse liste les TH et STH de l'année en photos pour les repérer au rayon.",
      },
      {
        q: "Faut-il un compte ?",
        a: "Non. Tu peux construire ton garage sans compte. Un compte avec Se connecter avec Apple ne servira qu'à la communauté et aux retours dans l'app.",
      },
      {
        q: "Puis-je reprendre ma collection existante ?",
        a: "Oui. Enregistre ton tableur en CSV et importe-le dans ton garage. Tu peux aussi exporter ton garage en CSV à tout moment.",
      },
      {
        q: "Quand arrive le scan ?",
        a: "Le scan, les valeurs et la communauté sont en construction. Ils arriveront dans une mise à jour de l'app, et cette page le dira.",
      },
      {
        q: "Kastr existe-t-elle sur Android ?",
        a: "Pas encore. Kastr fonctionne sur iPhone avec iOS 17 ou plus récent.",
      },
      {
        q: "Kastr est-elle affiliée à Mattel ?",
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
