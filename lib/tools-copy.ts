import type { Locale } from "@/lib/i18n";

// Copy of the two tool landing pages (docs/SEO_STRATEGY.md, step 2): the value lookup (/value) and the
// scanner page (/hot-wheels-scanner). Rules: no promise of gains, no subscription price, no claim that the
// scanner recognizes Super Treasure Hunts, values described exactly as the app computes them.

type QA = { q: string; a: string };

export type ToolsCopy = {
  rarity: Record<string, string>;
  value: {
    title: string;
    description: string;
    intro: string;
    label: string;
    placeholder: string;
    button: string;
    examples: string[];
    searching: string;
    empty: string;
    error: string;
    huntPage: string;
    question: string;
    answer: string;
    how: { title: string; items: string[] };
    isnt: { title: string; body: string };
    faq: QA[];
  };
  scanner: {
    title: string;
    description: string;
    lead: string;
    question: string;
    answer: string;
    stepsLabel: string;
    steps: { title: string; body: string }[];
    alt: { scan: string; detail: string };
    better: { title: string; items: { title: string; body: string }[] };
    free: { title: string; body: string };
    brands: { title: string; body: string };
    faq: QA[];
    links: { value: string; hunts: string; guide: string };
  };
};

const BRANDS_EN = "Hot Wheels, Matchbox, Majorette, Mini GT, Tomica, M2 Machines, Maisto, Racing Champions, Tarmac Works and Pop Race";
const BRANDS_FR = "Hot Wheels, Matchbox, Majorette, Mini GT, Tomica, M2 Machines, Maisto, Racing Champions, Tarmac Works et Pop Race";

const en: ToolsCopy = {
  rarity: {
    mainline: "Mainline",
    treasureHunt: "Treasure Hunt",
    superTreasureHunt: "Super Treasure Hunt",
    redLineClub: "Red Line Club",
    chase: "Chase",
    premium: "Premium",
  },
  value: {
    title: "Hot Wheels value checker",
    description:
      "Look up what a Hot Wheels car is worth: search by name, year or toy number and see the cheapest carded listing on eBay right now. Free, no account, 87,000 diecast cars.",
    intro:
      "Type a car's name, its year, or the toy number printed on the back of the card. Each result shows the value Kastr uses in the app: the cheapest carded Buy It Now listing on eBay right now.",
    label: "Search a car",
    placeholder: "'64 Impala 2026, Twin Mill, JJM18…",
    button: "Search",
    examples: ["'64 Impala 2026", "Datsun 620", "JJM15"],
    searching: "Searching…",
    empty: "No car found. Try fewer words, or the toy number from the back of the card.",
    error: "The search is not answering right now. Try again in a minute.",
    huntPage: "Hunt page",
    question: "How much is my Hot Wheels worth?",
    answer:
      "Most mainline Hot Wheels are worth about what they cost in the store, one to a few dollars. Treasure Hunts usually sell for a few dollars more, Super Treasure Hunts for tens of dollars and sometimes far more, and early Redlines from 1968 to 1977 can reach thousands. Search the car above to see the cheapest carded listing for it right now.",
    how: {
      title: "How the value is worked out",
      items: [
        "We look at the car's live listings on eBay US: carded only, Buy It Now only. Auctions, loose cars and lots are left out.",
        "The value is the cheapest of those listings, the price you would pay for the car today.",
        "A listing under a third of the others' usual price is treated as a mistake and skipped.",
        "Listings are at most a few hours old. When a car has no fresh listing, we show none rather than guess.",
      ],
    },
    isnt: {
      title: "What it is not",
      body:
        "It is not a sale price and not a promise of what you will get if you sell. A rare car with no listing today has no value shown, and a common car can have one silly listing. Condition matters too: a bent card or a loose car sells for less than the value shown here.",
    },
    faq: [
      {
        q: "Where do I find the toy number?",
        a: "On the back of the card, usually near the bar code: a short code like JJM18. It identifies one version of a car, so it gives the most precise result. The number on the front, like 34/250, is the collector number and is shared by a car and its Super Treasure Hunt.",
      },
      {
        q: "Why does my car have no value?",
        a: "Either nobody is selling it carded on eBay right now, or the last listings we saw are more than a few hours old. Try again later, or look at the car in the app, which asks eBay for fresh listings when you open it.",
      },
      {
        q: "Is the value checker free?",
        a: "Yes. The search and the value of each car are free, on this page and in the app, without an account.",
      },
      {
        q: "Does it cover other brands?",
        a: `Yes: ${BRANDS_EN}. Values are only shown where eBay has carded listings for the car.`,
      },
    ],
  },
  scanner: {
    title: "Hot Wheels scanner app",
    description:
      "Kastr scans a Hot Wheels card with your iPhone: it reads the toy number and name, finds the exact car among 87,000, shows its value and tells you if it is already in your collection.",
    lead:
      "Point your iPhone at a card. Kastr reads it, finds the exact car in its catalog of 87,000 diecast cars, and tells you in a second what it is worth and whether it is already in your garage.",
    question: "How does a Hot Wheels scanner app work?",
    answer:
      "Kastr reads the text on the card with your iPhone's camera: the toy number, the name and the year. That reading happens on the phone. When it is not enough, for a loose car or a hard-to-read card, a photo is sent to an AI that identifies the car. Either way you get the exact car, its value and a badge if you already own it.",
    stepsLabel: "Three steps in the aisle",
    steps: [
      {
        title: "Point at the card",
        body: "The camera reads the toy number, the name and the year printed on the card, on the iPhone itself. Tap, and take the next one: scans run in the background.",
      },
      {
        title: "Get the exact car",
        body: "The toy number points to one version of a car, not a whole family. When the card cannot be read, a photo goes to an AI that identifies the car instead.",
      },
      {
        title: "Know before you buy",
        body: "Each result shows the car's value, its case letter for Treasure Hunts, and a badge when it is already in your garage. Review the whole burst later and add everything in one tap.",
      },
    ],
    alt: {
      scan: "The hunt tab in Kastr: the year's Super Treasure Hunt checklist, with the ones already found",
      detail: "A car page in Kastr with its recent carded sales and the In garage button",
    },
    better: {
      title: "Why it is quicker than the others",
      items: [
        {
          title: "No bar code guessing",
          body: "On a mainline card the bar code is shared by every car of the case, so it cannot tell you which car you hold. Kastr reads the toy number printed above it instead.",
        },
        {
          title: "Burst scanning",
          body: "Scan a whole peg without stopping: each tap takes a photo, the analysis runs behind, and you review the list once you are done.",
        },
        {
          title: "Already in your garage?",
          body: "Every result says if you already own the car, so you stop buying the same one twice. That works offline, from the catalog stored on your phone.",
        },
      ],
    },
    free: {
      title: "Free to start",
      body: "Search the catalog for free, as much as you like, with the value of every car. Scanning uses credits: 30 a month for free, unlimited with Kastr Pro. A scan that finds nothing on the phone costs nothing.",
    },
    brands: {
      title: "Not only Hot Wheels",
      body: `The catalog covers ${BRANDS_EN}, from 1968 to the cars announced for next year.`,
    },
    faq: [
      {
        q: "Is there a free Hot Wheels scanner app?",
        a: "Kastr is free to download and gives 30 scans a month for free, plus unlimited search with the value of each car. Kastr Pro removes the scan limit.",
      },
      {
        q: "Can it scan the bar code?",
        a: "It can, but on mainline cards the bar code is the same for every car of a case, so it does not name the car. Kastr relies on the toy number printed on the card, which does.",
      },
      {
        q: "Does it work on loose cars?",
        a: "Yes, through the AI photo identification, but a loose car is harder: several versions of the same casting can look alike. A carded car gives the most precise result.",
      },
      {
        q: "Does it work on Android?",
        a: "Not yet. Kastr is an iPhone app first; an Android version is planned after the iPhone launch.",
      },
      {
        q: "Does it need an internet connection?",
        a: "Reading the card and checking your garage work offline, from the catalog stored on the phone. The AI identification and live values need a connection.",
      },
    ],
    links: { value: "Look up a car's value", hunts: "This year's Super Treasure Hunts", guide: "How to spot a Super Treasure Hunt" },
  },
};

const fr: ToolsCopy = {
  rarity: {
    mainline: "Mainline",
    treasureHunt: "Treasure Hunt",
    superTreasureHunt: "Super Treasure Hunt",
    redLineClub: "Red Line Club",
    chase: "Chase",
    premium: "Premium",
  },
  value: {
    title: "Cote Hot Wheels : combien vaut ta voiture",
    description:
      "Trouve la valeur d'une Hot Wheels : cherche par nom, année ou numéro de jouet et vois l'annonce sous blister la moins chère sur eBay en ce moment. Gratuit, sans compte, 87 000 miniatures.",
    intro:
      "Tape le nom d'une voiture, son année ou le numéro de jouet imprimé au dos du blister. Chaque résultat montre la valeur qu'utilise l'app Kastr : l'annonce sous blister en achat immédiat la moins chère sur eBay en ce moment.",
    label: "Chercher une voiture",
    placeholder: "'64 Impala 2026, Twin Mill, JJM18…",
    button: "Chercher",
    examples: ["'64 Impala 2026", "Datsun 620", "JJM15"],
    searching: "Recherche…",
    empty: "Aucune voiture trouvée. Essaie avec moins de mots, ou le numéro de jouet au dos du blister.",
    error: "La recherche ne répond pas pour l'instant. Réessaie dans une minute.",
    huntPage: "Fiche chasse",
    question: "Combien vaut ma Hot Wheels ?",
    answer:
      "La plupart des Hot Wheels ordinaires valent à peu près leur prix en magasin, de un à quelques euros. Une Treasure Hunt se vend en général quelques euros de plus, une Super Treasure Hunt quelques dizaines d'euros et parfois bien plus, et les premières Redlines de 1968 à 1977 peuvent atteindre des milliers. Cherche la voiture ci-dessus pour voir son annonce sous blister la moins chère en ce moment.",
    how: {
      title: "Comment la valeur est calculée",
      items: [
        "On regarde les annonces en cours de la voiture sur eBay US : sous blister seulement, en achat immédiat seulement. Les enchères, les voitures sans blister et les lots sont exclus.",
        "La valeur est la moins chère de ces annonces, le prix que tu paierais la voiture aujourd'hui.",
        "Une annonce sous le tiers du prix habituel des autres est prise pour une erreur et écartée.",
        "Les annonces ont au plus quelques heures. Quand une voiture n'a pas d'annonce récente, on n'affiche rien plutôt que de deviner.",
      ],
    },
    isnt: {
      title: "Ce que ce n'est pas",
      body:
        "Ce n'est pas un prix de vente, ni une promesse de ce que tu obtiendras en vendant. Une voiture rare sans annonce aujourd'hui n'a pas de valeur affichée, et une voiture courante peut avoir une annonce farfelue. L'état compte aussi : un blister abîmé ou une voiture sortie de son blister se vend moins cher que la valeur affichée ici.",
    },
    faq: [
      {
        q: "Où trouver le numéro de jouet ?",
        a: "Au dos du blister, en général près du code-barres : un code court comme JJM18. Il désigne une seule version d'une voiture, donc il donne le résultat le plus précis. Le numéro de devant, comme 34/250, est le numéro de collection, partagé par une voiture et sa Super Treasure Hunt.",
      },
      {
        q: "Pourquoi ma voiture n'a pas de valeur ?",
        a: "Soit personne ne la vend sous blister sur eBay en ce moment, soit les dernières annonces vues datent de plus de quelques heures. Réessaie plus tard, ou ouvre la voiture dans l'app, qui demande des annonces fraîches à eBay à l'ouverture.",
      },
      {
        q: "La cote est-elle gratuite ?",
        a: "Oui. La recherche et la valeur de chaque voiture sont gratuites, ici comme dans l'app, sans compte.",
      },
      {
        q: "Et les autres marques ?",
        a: `Elles y sont : ${BRANDS_FR}. Une valeur n'apparaît que si eBay a des annonces sous blister pour la voiture.`,
      },
    ],
  },
  scanner: {
    title: "Scanner Hot Wheels : l'app qui lit le blister",
    description:
      "Kastr scanne un blister Hot Wheels avec ton iPhone : il lit le numéro de jouet et le nom, trouve la voiture exacte parmi 87 000, affiche sa valeur et te dit si tu l'as déjà.",
    lead:
      "Vise un blister avec ton iPhone. Kastr le lit, retrouve la voiture exacte dans son catalogue de 87 000 miniatures, et te dit en une seconde combien elle vaut et si elle est déjà dans ton garage.",
    question: "Comment marche une app pour scanner les Hot Wheels ?",
    answer:
      "Kastr lit le texte du blister avec l'appareil photo de ton iPhone : le numéro de jouet, le nom et l'année. Cette lecture se fait sur le téléphone. Quand elle ne suffit pas, pour une voiture sans blister ou un carton difficile à lire, une photo part à une IA qui identifie la voiture. Dans les deux cas tu obtiens la voiture exacte, sa valeur et un badge si tu l'as déjà.",
    stepsLabel: "Trois gestes en rayon",
    steps: [
      {
        title: "Vise le blister",
        body: "L'appareil photo lit le numéro de jouet, le nom et l'année imprimés sur le carton, sur l'iPhone lui-même. Tape, et passe à la suivante : les scans tournent en arrière-plan.",
      },
      {
        title: "La voiture exacte",
        body: "Le numéro de jouet désigne une seule version d'une voiture, pas toute une famille. Quand le carton est illisible, une photo part à une IA qui identifie la voiture à la place.",
      },
      {
        title: "Savoir avant d'acheter",
        body: "Chaque résultat montre la valeur de la voiture, la lettre de sa caisse pour les Treasure Hunt, et un badge si elle est déjà dans ton garage. Tu revois toute la rafale après coup et tu ajoutes tout d'un geste.",
      },
    ],
    alt: {
      scan: "L'onglet Chasse de Kastr : la liste des Super Treasure Hunt de l'année, avec celles déjà trouvées",
      detail: "La fiche d'une voiture dans Kastr, avec ses ventes récentes sous blister et le bouton Au garage",
    },
    better: {
      title: "Pourquoi c'est plus rapide qu'ailleurs",
      items: [
        {
          title: "Pas de code-barres trompeur",
          body: "Sur un blister ordinaire, le code-barres est le même pour toutes les voitures de la caisse : il ne dit pas laquelle tu tiens. Kastr lit plutôt le numéro de jouet imprimé au-dessus.",
        },
        {
          title: "Scan en rafale",
          body: "Scanne tout un présentoir sans t'arrêter : chaque tap prend une photo, l'analyse tourne derrière, et tu revois la liste une fois fini.",
        },
        {
          title: "Déjà dans ton garage ?",
          body: "Chaque résultat dit si tu possèdes déjà la voiture, pour ne plus acheter deux fois la même. Ça marche hors ligne, grâce au catalogue stocké sur ton téléphone.",
        },
      ],
    },
    free: {
      title: "Gratuit pour commencer",
      body: "La recherche dans le catalogue est gratuite et illimitée, avec la valeur de chaque voiture. Le scan utilise des crédits : 30 par mois en gratuit, illimité avec Kastr Pro. Un scan que le téléphone ne reconnaît pas ne coûte rien.",
    },
    brands: {
      title: "Pas seulement Hot Wheels",
      body: `Le catalogue couvre ${BRANDS_FR}, de 1968 aux voitures annoncées pour l'an prochain.`,
    },
    faq: [
      {
        q: "Existe-t-il une app gratuite pour scanner les Hot Wheels ?",
        a: "Kastr se télécharge gratuitement et donne 30 scans par mois en gratuit, plus la recherche illimitée avec la valeur de chaque voiture. Kastr Pro lève la limite de scans.",
      },
      {
        q: "Peut-il scanner le code-barres ?",
        a: "Oui, mais sur les blisters ordinaires le code-barres est le même pour toute une caisse, il ne nomme donc pas la voiture. Kastr s'appuie sur le numéro de jouet imprimé sur le carton, qui la nomme.",
      },
      {
        q: "Et une voiture sans blister ?",
        a: "Oui, par l'identification photo par IA, mais c'est plus difficile : plusieurs versions d'un même modèle se ressemblent. Une voiture sous blister donne le résultat le plus précis.",
      },
      {
        q: "Existe-t-il sur Android ?",
        a: "Pas encore. Kastr sort d'abord sur iPhone ; une version Android est prévue après.",
      },
      {
        q: "Faut-il une connexion internet ?",
        a: "La lecture du blister et la vérification du garage marchent hors ligne, grâce au catalogue stocké sur le téléphone. L'identification par IA et les valeurs en direct demandent une connexion.",
      },
    ],
    links: { value: "Trouver la cote d'une voiture", hunts: "Les Super Treasure Hunt de l'année", guide: "Reconnaître une Super Treasure Hunt" },
  },
};

export function toolsCopy(locale: Locale): ToolsCopy {
  return locale === "fr" ? fr : en;
}
