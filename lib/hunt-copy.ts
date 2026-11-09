import { splitSeries, type Hunt, type HuntRarity } from "@/lib/hunts";
import type { Locale } from "@/lib/i18n";

// Copy of the hunt pages, EN and FR. Rules (CLAUDE.md §1, §11): human voice, no em dashes, no prices,
// no earnings promise, no resale angle. Cues follow docs/RARITY_RECOGNITION.md §2 and say where sources differ.

type Copy = {
  label: Record<HuntRarity, string>; // "Super Treasure Hunt"
  plural: Record<HuntRarity, string>;
  short: Record<HuntRarity, string>; // "STH"
  hubTitle: Record<HuntRarity, string>;
  hubDescription: Record<HuntRarity, string>;
  hubQuestion: Record<HuntRarity, string>;
  hubAnswer: Record<HuntRarity, string>;
  yearsLabel: string;
  cars: (n: number) => string;
  yearTitle: (rarity: HuntRarity, year: number) => string;
  yearDescription: (rarity: HuntRarity, year: number, n: number) => string;
  yearQuestion: (rarity: HuntRarity, year: number) => string;
  yearAnswer: (rarity: HuntRarity, year: number, list: Hunt[]) => string;
  openYear: string;
  updated: (date: string) => string;
  caseHeading: (code: string | null) => string;
  otherList: (rarity: HuntRarity, year: number) => string;
  carTitle: (h: Hunt) => string;
  carDescription: (h: Hunt) => string;
  carQuestion: (h: Hunt) => string;
  carAnswer: (h: Hunt) => string;
  specs: string;
  spec: {
    year: string;
    series: string;
    case: string;
    toyNumber: string;
    colour: string;
    tampo: string;
    wheels: string;
    base: string;
    window: string;
    interior: string;
    country: string;
    notes: string;
  };
  spotTitle: string;
  cues: (h: Pick<Hunt, "rarity" | "year" | "toyNumber">) => string[];
  twinTitle: string;
  twinLine: (h: Hunt) => string;
  noTwin: string;
  caseMatesTitle: (code: string) => string;
  faq: (h: Hunt) => { q: string; a: string }[];
  yearFaq: (rarity: HuntRarity, year: number, list: Hunt[]) => { q: string; a: string }[];
  source: string;
  sourceLink: string;
  noPhoto: string;
  photoCaption: string;
  cta: { title: string; body: string };
  live: {
    title: string;
    note: (minutes: number) => string;
    disclosure: string;
    view: string;
    search: string;
    loading: string;
  };
  breadcrumbHome: string;
  backToYear: (rarity: HuntRarity, year: number) => string;
  navLabel: string;
  cases: {
    hubTitle: string;
    hubDescription: string;
    hubQuestion: string;
    hubAnswer: string;
    yearTitle: (year: number) => string;
    yearDescription: (year: number) => string;
    yearQuestion: (year: number) => string;
    yearAnswer: (year: number, known: string[], next: string | null) => string;
    next: (letter: string) => string;
    noDates: string;
    link: (year: number) => string;
    cases: (n: number) => string;
  };
};

const sthCuesEn = (year: number): string[] => [
  year >= 2016
    ? "A gold circle-flame logo printed on the card, behind the car."
    : year >= 2012
      ? "The card can look like a regular one: the gold flame on the card started in 2015 or 2016 (sources differ), so look at the car."
      : 'The words "TREA$URE HUNT$" on the card.',
  "Spectraflame paint, a deep metallic finish you can spot from a distance.",
  "Real Riders rubber tires instead of plastic wheels.",
  ...(year >= 2012 ? ['A small "TH" logo somewhere in the tampo on the car.'] : []),
];

const sthCuesFr = (year: number): string[] => [
  year >= 2016
    ? "Une flamme dorée dans un cercle, imprimée sur le carton derrière la voiture."
    : year >= 2012
      ? "Le carton peut ressembler à celui d'une voiture ordinaire : la flamme dorée sur le carton date de 2015 ou 2016 (les sources divergent), regarde donc la voiture."
      : "La mention « TREA$URE HUNT$ » sur le carton.",
  "Une peinture Spectraflame, un métallisé profond qui se voit de loin.",
  "Des pneus en caoutchouc Real Riders à la place des roues en plastique.",
  ...(year >= 2012 ? ["Un petit logo « TH » dans les décorations de la voiture."] : []),
];

const thCuesEn = (year: number): string[] =>
  year >= 2013
    ? [
        "A silver circle-flame logo printed on the card, behind the car.",
        "The same flame logo in the tampo on the car.",
        "Regular paint and plastic wheels: that is what sets it apart from a Super.",
      ]
    : year <= 2006
      ? [
          "A dedicated Treasure Hunt card (with a green bar in 1995 and 1996).",
          "Special wheels, often Real Riders rubber tires.",
        ]
      : ["The Treasure Hunt marking on the card of that year.", "The toy number on the back of the card, checked against this page."];

const thCuesFr = (year: number): string[] =>
  year >= 2013
    ? [
        "Une flamme argentée dans un cercle, imprimée sur le carton derrière la voiture.",
        "Le même logo flamme dans les décorations de la voiture.",
        "Une peinture et des roues en plastique ordinaires : c'est ce qui la distingue d'une Super.",
      ]
    : year <= 2006
      ? [
          "Un carton Treasure Hunt dédié (avec une bande verte en 1995 et 1996).",
          "Des roues spéciales, souvent des pneus en caoutchouc Real Riders.",
        ]
      : ["La mention Treasure Hunt sur le carton de l'année.", "Le numéro de jouet au dos du carton, à comparer avec cette page."];

function cueList(locale: Locale, h: Pick<Hunt, "rarity" | "year" | "toyNumber">): string[] {
  const base =
    h.rarity === "sth" ? (locale === "fr" ? sthCuesFr : sthCuesEn)(h.year) : (locale === "fr" ? thCuesFr : thCuesEn)(h.year);
  if (h.year >= 2013 && h.toyNumber) {
    base.push(
      locale === "fr"
        ? `Son propre numéro de jouet au dos du carton : ${h.toyNumber}. Depuis 2013, chaque TH et STH a un numéro différent de la voiture ordinaire.`
        : `Its own toy number on the back of the card: ${h.toyNumber}. Since 2013 every TH and STH has a number of its own, different from the regular car.`,
    );
  }
  return base;
}

function seriesPhraseEn(series: string | null): string {
  const s = splitSeries(series);
  if (!s.name) return "";
  return s.position ? `, car ${s.position.replace("/", " of ")} in the ${s.name} series` : `, from the ${s.name} series`;
}

function seriesPhraseFr(series: string | null): string {
  const s = splitSeries(series);
  if (!s.name) return "";
  return s.position ? `, voiture ${s.position.replace("/", " sur ")} de la série ${s.name}` : `, de la série ${s.name}`;
}

const casesSpan = (list: Hunt[]) => {
  const codes = [...new Set(list.map((h) => h.caseCode).filter((c): c is string => !!c))].sort();
  return codes.length > 1 ? [codes[0], codes[codes.length - 1]] : null;
};

const en: Copy = {
  label: { sth: "Super Treasure Hunt", th: "Treasure Hunt" },
  plural: { sth: "Super Treasure Hunts", th: "Treasure Hunts" },
  short: { sth: "STH", th: "TH" },
  hubTitle: { sth: "Hot Wheels Super Treasure Hunt lists by year", th: "Hot Wheels Treasure Hunt lists by year" },
  hubDescription: {
    sth: "Every Hot Wheels Super Treasure Hunt since 2007, year by year, with the case, toy number and how to spot each one.",
    th: "Every Hot Wheels Treasure Hunt since 1995, year by year, with the case, toy number and how to spot each one.",
  },
  hubQuestion: { sth: "What is a Super Treasure Hunt?", th: "What is a Treasure Hunt?" },
  hubAnswer: {
    sth: "A Super Treasure Hunt (STH) is a Hot Wheels mainline car made in a special version and hidden in a few store cases. It has Spectraflame paint and Real Riders rubber tires, and since 2016 a gold flame logo on the card. Mattel has made about fifteen a year since 2013.",
    th: "A Treasure Hunt (TH) is a Hot Wheels mainline car marked as a hunt and packed into some store cases. Since 2013 it carries a silver flame logo on the card and on the car, with regular paint and plastic wheels. The series started in 1995.",
  },
  yearsLabel: "Years",
  cars: (n) => (n === 1 ? "1 car" : `${n} cars`),
  yearTitle: (r, y) => `${y} Hot Wheels ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} list`,
  yearDescription: (r, y, n) =>
    `All ${n} Hot Wheels ${r === "sth" ? "Super Treasure Hunts" : "Treasure Hunts"} of ${y}, case by case, with toy numbers, colors and how to tell each one from the regular car.`,
  yearQuestion: (r, y) => `How many ${r === "sth" ? "Super Treasure Hunts" : "Treasure Hunts"} are there in ${y}?`,
  yearAnswer: (r, y, list) => {
    const span = casesSpan(list);
    const what = r === "sth" ? "Super Treasure Hunts" : "Treasure Hunts";
    return `Our ${y} list has ${list.length} Hot Wheels ${what}${span ? `, from case ${span[0]} to case ${span[1]}` : ""}. ${
      r === "sth"
        ? "Each one has Spectraflame paint and Real Riders rubber tires."
        : y >= 2013
          ? "Each one has a silver flame logo on the card and on the car."
          : "Each one came on a Treasure Hunt card."
    } Below, every car with its case, toy number and color, from the Hot Wheels Wiki.`;
  },
  openYear: "This year is still being revealed case by case. We update the list as new cases come out.",
  updated: (d) => `Data updated ${d}`,
  caseHeading: (c) => (c ? `Case ${c}` : "Case not known"),
  otherList: (r, y) => `${y} ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} list`,
  carTitle: (h) => `${h.year} ${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}`,
  carDescription: (h) =>
    `The ${h.year} Hot Wheels ${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}${h.toyNumber ? ` (${h.toyNumber})` : ""}${h.caseCode ? `, case ${h.caseCode}` : ""}: color, wheels, how to spot it and live listings.`,
  carQuestion: (h) => `What is the ${h.year} ${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}?`,
  carAnswer: (h) =>
    `The ${h.year} ${h.name} is a Hot Wheels ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}${seriesPhraseEn(h.series)}${
      h.toyNumber ? `, toy number ${h.toyNumber}` : ""
    }${h.caseCode ? `, packed in case ${h.caseCode}` : ""}.${h.colour ? ` It comes in ${h.colour}${h.wheels ? ` with ${h.wheels} wheels` : ""}.` : ""}${
      h.twin?.colour ? ` The regular version is ${h.twin.colour}${h.twin.toyNumber ? ` (${h.twin.toyNumber})` : ""}.` : ""
    } Kastr tells you in the aisle if it is already in your garage.`,
  specs: "Details",
  spec: {
    year: "Year",
    series: "Series",
    case: "Case",
    toyNumber: "Toy number",
    colour: "Color",
    tampo: "Tampo",
    wheels: "Wheels",
    base: "Base",
    window: "Windows",
    interior: "Interior",
    country: "Made in",
    notes: "Notes",
  },
  spotTitle: "How to spot it in the store",
  cues: (h) => cueList("en", h),
  twinTitle: "Hunt or regular car?",
  twinLine: (h) =>
    `The regular ${h.name} of ${h.year} is ${h.twin?.colour ?? "listed on the wiki"}${h.twin?.toyNumber ? `, toy number ${h.twin.toyNumber}` : ""}. ${
      h.rarity === "sth" ? "The Super" : "The Treasure Hunt"
    } is ${h.colour ?? "a different version"}${h.toyNumber ? `, toy number ${h.toyNumber}` : ""}.`,
  noTwin: "No regular version of this car is listed for the same year.",
  caseMatesTitle: (c) => `Also in case ${c}`,
  faq: (h) => [
    {
      q: `Is the ${h.year} ${h.name} a ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}?`,
      a: `Yes. The Hot Wheels Wiki lists the ${h.year} ${h.name}${h.toyNumber ? ` (${h.toyNumber})` : ""} as a ${
        h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"
      }${h.colour ? ` in ${h.colour}` : ""}.`,
    },
    ...(h.caseCode
      ? [{ q: `Which case is the ${h.year} ${h.name} in?`, a: `It ships in the ${h.year} mainline case ${h.caseCode}.` }]
      : []),
    {
      q: `How do I tell it from the regular ${h.name}?`,
      a: h.twin?.colour
        ? `Look at the paint${h.rarity === "sth" ? " and the tires" : " and the flame logo"}: the regular car is ${h.twin.colour}, the ${
            h.rarity === "sth" ? "Super" : "Treasure Hunt"
          } is ${h.colour ?? "different"}.${h.toyNumber && h.year >= 2013 ? ` The toy number on the back of the card is ${h.toyNumber} for the hunt.` : ""}`
        : cueList("en", h).join(" "),
    },
  ],
  yearFaq: (r, y, list) => [
    {
      q: `How many ${r === "sth" ? "Super Treasure Hunts" : "Treasure Hunts"} are there in ${y}?`,
      a: `${list.length} on our list, taken from the Hot Wheels Wiki.${y >= new Date().getFullYear() ? " The year is still being revealed case by case." : ""}`,
    },
    { q: `How do you spot a ${y} ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}?`, a: cueList("en", { rarity: r, year: y, toyNumber: null }).join(" ") },
  ],
  source: "Source",
  sourceLink: "Hot Wheels Wiki page (CC BY-SA)",
  noPhoto: "Photos of this car on the Hot Wheels Wiki",
  photoCaption: "Photo from a live eBay listing (affiliate link)",
  cta: {
    title: "Found one on the pegs?",
    body: "Scan the card with Kastr: it tells you if the car is already in your garage, if it is a hunt, and what it sold for recently.",
  },
  live: {
    title: "On eBay now",
    note: (m) => (m < 2 ? "Listings and photos from eBay, just updated." : `Listings and photos from eBay, updated ${m} min ago.`),
    disclosure: "Affiliate links: Kastr may earn a commission. Prices are set by the sellers.",
    view: "View on eBay",
    search: "See listings on eBay",
    loading: "Loading listings…",
  },
  breadcrumbHome: "Kastr",
  backToYear: (r, y) => `All ${y} ${r === "sth" ? "Super Treasure Hunts" : "Treasure Hunts"}`,
  navLabel: "Hunt lists",
  cases: {
    hubTitle: "Hot Wheels case letters by year",
    hubDescription: "The Treasure Hunt and Super Treasure Hunt of every Hot Wheels mainline case, A to Q, year by year since 2012.",
    hubQuestion: "What is a Hot Wheels case letter?",
    hubAnswer:
      "Mattel ships each year's mainline cars in about fifteen cases lettered A to Q, without I and O. Each case letter has its own Treasure Hunt and Super Treasure Hunt. Collector guides say the code next to the toy number on the back of US cards ends with the case letter; international cards do not print it.",
    yearTitle: (y) => `Hot Wheels ${y} cases: the TH and STH of each case`,
    yearDescription: (y) => `Every Hot Wheels ${y} mainline case, A to Q, with its Treasure Hunt and Super Treasure Hunt, toy numbers and colors.`,
    yearQuestion: (y) => `Which hunts are in each ${y} Hot Wheels case?`,
    yearAnswer: (y, known, next) =>
      `${known.length === 15 ? `All 15 Hot Wheels ${y} mainline cases are known` : `${known.length} Hot Wheels ${y} mainline cases are known so far`}, case ${known[0]} to case ${known[known.length - 1]}. Each case letter has its own Treasure Hunt and Super Treasure Hunt, listed below with toy numbers and colors from the Hot Wheels Wiki.${next ? ` The next case is ${next}.` : ""}`,
    next: (l) => `Next case: ${l}`,
    noDates:
      "Mattel does not publish store dates, and cases reach stores at different times from one country to the next. We add a case as soon as its hunts are confirmed.",
    link: (y) => `${y} cases A to Q`,
    cases: (n) => (n === 1 ? "1 case" : `${n} cases`),
  },
};

const fr: Copy = {
  label: { sth: "Super Treasure Hunt", th: "Treasure Hunt" },
  plural: { sth: "Super Treasure Hunt", th: "Treasure Hunt" },
  short: { sth: "STH", th: "TH" },
  hubTitle: { sth: "Listes des Super Treasure Hunt Hot Wheels par année", th: "Listes des Treasure Hunt Hot Wheels par année" },
  hubDescription: {
    sth: "Toutes les Super Treasure Hunt Hot Wheels depuis 2007, année par année, avec la caisse, le numéro de jouet et comment reconnaître chacune.",
    th: "Toutes les Treasure Hunt Hot Wheels depuis 1995, année par année, avec la caisse, le numéro de jouet et comment reconnaître chacune.",
  },
  hubQuestion: { sth: "C'est quoi une Super Treasure Hunt ?", th: "C'est quoi une Treasure Hunt ?" },
  hubAnswer: {
    sth: "Une Super Treasure Hunt (STH) est une voiture Hot Wheels de la gamme courante produite en version spéciale et glissée dans quelques caisses de magasin. Elle a une peinture Spectraflame et des pneus en caoutchouc Real Riders, et depuis 2016 une flamme dorée sur le carton. Mattel en sort environ quinze par an depuis 2013.",
    th: "Une Treasure Hunt (TH) est une voiture Hot Wheels de la gamme courante marquée comme pièce de chasse et glissée dans certaines caisses. Depuis 2013 elle porte une flamme argentée sur le carton et sur la voiture, avec une peinture et des roues ordinaires. La série existe depuis 1995.",
  },
  yearsLabel: "Années",
  cars: (n) => (n === 1 ? "1 voiture" : `${n} voitures`),
  yearTitle: (r, y) => `Liste des ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} Hot Wheels ${y}`,
  yearDescription: (r, y, n) =>
    `Les ${n} ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} Hot Wheels de ${y}, caisse par caisse, avec les numéros de jouet, les couleurs et comment les distinguer de la voiture ordinaire.`,
  yearQuestion: (r, y) => `Combien de ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} en ${y} ?`,
  yearAnswer: (r, y, list) => {
    const span = casesSpan(list);
    return `Notre liste ${y} compte ${list.length} ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} Hot Wheels${
      span ? `, de la caisse ${span[0]} à la caisse ${span[1]}` : ""
    }. ${
      r === "sth"
        ? "Chacune a une peinture Spectraflame et des pneus en caoutchouc Real Riders."
        : y >= 2013
          ? "Chacune porte une flamme argentée sur le carton et sur la voiture."
          : "Chacune est sortie sur un carton Treasure Hunt."
    } Voici chaque voiture avec sa caisse, son numéro de jouet et sa couleur, d'après le wiki Hot Wheels.`;
  },
  openYear: "Cette année se dévoile encore caisse par caisse. La liste est mise à jour à chaque nouvelle caisse.",
  updated: (d) => `Données mises à jour le ${d}`,
  caseHeading: (c) => (c ? `Caisse ${c}` : "Caisse inconnue"),
  otherList: (r, y) => `Liste des ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${y}`,
  carTitle: (h) => `${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${h.year}`,
  carDescription: (h) =>
    `La Hot Wheels ${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${h.year}${h.toyNumber ? ` (${h.toyNumber})` : ""}${
      h.caseCode ? `, caisse ${h.caseCode}` : ""
    } : couleur, roues, comment la reconnaître et annonces en direct.`,
  carQuestion: (h) => `C'est quoi la ${h.name} ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${h.year} ?`,
  carAnswer: (h) =>
    `La ${h.name} ${h.year} est une Hot Wheels ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"}${seriesPhraseFr(h.series)}${
      h.toyNumber ? `, numéro de jouet ${h.toyNumber}` : ""
    }${h.caseCode ? `, dans la caisse ${h.caseCode}` : ""}.${h.colour ? ` Couleur : ${h.colour}${h.wheels ? `, roues ${h.wheels}` : ""}.` : ""}${
      h.twin?.colour ? ` La version ordinaire est ${h.twin.colour}${h.twin.toyNumber ? ` (${h.twin.toyNumber})` : ""}.` : ""
    } Kastr te dit en rayon si elle est déjà dans ton garage.`,
  specs: "Fiche",
  spec: {
    year: "Année",
    series: "Série",
    case: "Caisse",
    toyNumber: "Numéro de jouet",
    colour: "Couleur",
    tampo: "Décorations",
    wheels: "Roues",
    base: "Châssis",
    window: "Vitres",
    interior: "Intérieur",
    country: "Fabriquée en",
    notes: "Notes",
  },
  spotTitle: "Comment la reconnaître en rayon",
  cues: (h) => cueList("fr", h),
  twinTitle: "Chasse ou voiture ordinaire ?",
  twinLine: (h) =>
    `La ${h.name} ordinaire de ${h.year} est ${h.twin?.colour ?? "listée sur le wiki"}${h.twin?.toyNumber ? `, numéro de jouet ${h.twin.toyNumber}` : ""}. La ${
      h.rarity === "sth" ? "Super" : "Treasure Hunt"
    } est ${h.colour ?? "une autre version"}${h.toyNumber ? `, numéro de jouet ${h.toyNumber}` : ""}.`,
  noTwin: "Aucune version ordinaire de cette voiture n'est listée pour la même année.",
  caseMatesTitle: (c) => `Aussi dans la caisse ${c}`,
  faq: (h) => [
    {
      q: `La ${h.name} ${h.year} est-elle une ${h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ?`,
      a: `Oui. Le wiki Hot Wheels liste la ${h.name} ${h.year}${h.toyNumber ? ` (${h.toyNumber})` : ""} comme ${
        h.rarity === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"
      }${h.colour ? `, couleur ${h.colour}` : ""}.`,
    },
    ...(h.caseCode
      ? [{ q: `Dans quelle caisse est la ${h.name} ${h.year} ?`, a: `Elle sort dans la caisse ${h.caseCode} de la gamme courante ${h.year}.` }]
      : []),
    {
      q: `Comment la distinguer de la ${h.name} ordinaire ?`,
      a: h.twin?.colour
        ? `Regarde la peinture${h.rarity === "sth" ? " et les pneus" : " et le logo flamme"} : la voiture ordinaire est ${h.twin.colour}, la ${
            h.rarity === "sth" ? "Super" : "Treasure Hunt"
          } est ${h.colour ?? "différente"}.${h.toyNumber && h.year >= 2013 ? ` Au dos du carton, le numéro de jouet de la chasse est ${h.toyNumber}.` : ""}`
        : cueList("fr", h).join(" "),
    },
  ],
  yearFaq: (r, y, list) => [
    {
      q: `Combien de ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} en ${y} ?`,
      a: `${list.length} sur notre liste, tirée du wiki Hot Wheels.${y >= new Date().getFullYear() ? " L'année se dévoile encore caisse par caisse." : ""}`,
    },
    {
      q: `Comment reconnaître une ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${y} ?`,
      a: cueList("fr", { rarity: r, year: y, toyNumber: null }).join(" "),
    },
  ],
  source: "Source",
  sourceLink: "Page du wiki Hot Wheels (CC BY-SA)",
  noPhoto: "Photos de cette voiture sur le wiki Hot Wheels",
  photoCaption: "Photo d'une annonce eBay en cours (lien affilié)",
  cta: {
    title: "Tu l'as trouvée en rayon ?",
    body: "Scanne le carton avec Kastr : l'appli te dit si la voiture est déjà dans ton garage, si c'est une pièce de chasse et à combien elle s'est vendue récemment.",
  },
  live: {
    title: "Sur eBay en ce moment",
    note: (m) => (m < 2 ? "Annonces et photos d'eBay, à l'instant." : `Annonces et photos d'eBay, mises à jour il y a ${m} min.`),
    disclosure: "Liens affiliés : Kastr peut toucher une commission. Les prix sont fixés par les vendeurs.",
    view: "Voir sur eBay",
    search: "Voir les annonces sur eBay",
    loading: "Chargement des annonces…",
  },
  breadcrumbHome: "Kastr",
  backToYear: (r, y) => `Toutes les ${r === "sth" ? "Super Treasure Hunt" : "Treasure Hunt"} ${y}`,
  navLabel: "Listes de chasse",
  cases: {
    hubTitle: "Les caisses Hot Wheels par année",
    hubDescription: "La Treasure Hunt et la Super Treasure Hunt de chaque caisse Hot Wheels de la gamme courante, de A à Q, année par année depuis 2012.",
    hubQuestion: "C'est quoi la lettre de caisse Hot Wheels ?",
    hubAnswer:
      "Mattel expédie les voitures de la gamme courante de chaque année dans une quinzaine de caisses notées de A à Q, sans I ni O. Chaque lettre de caisse a sa Treasure Hunt et sa Super Treasure Hunt. Selon les guides de collectionneurs, le code à côté du numéro de jouet au dos des cartons américains se termine par la lettre de caisse ; les cartons internationaux ne l'impriment pas.",
    yearTitle: (y) => `Caisses Hot Wheels ${y} : la TH et la STH de chaque caisse`,
    yearDescription: (y) => `Chaque caisse Hot Wheels ${y} de la gamme courante, de A à Q, avec sa Treasure Hunt et sa Super Treasure Hunt, numéros de jouet et couleurs.`,
    yearQuestion: (y) => `Quelles pièces de chasse dans chaque caisse Hot Wheels ${y} ?`,
    yearAnswer: (y, known, next) =>
      `${known.length === 15 ? `Les 15 caisses Hot Wheels ${y} de la gamme courante sont connues` : `${known.length} caisses Hot Wheels ${y} de la gamme courante sont connues pour l'instant`}, de la caisse ${known[0]} à la caisse ${known[known.length - 1]}. Chaque lettre de caisse a sa Treasure Hunt et sa Super Treasure Hunt, listées ci-dessous avec numéros de jouet et couleurs d'après le wiki Hot Wheels.${next ? ` La prochaine caisse est la ${next}.` : ""}`,
    next: (l) => `Prochaine caisse : ${l}`,
    noDates:
      "Mattel ne publie pas de dates de sortie en magasin, et les caisses arrivent à des moments différents selon les pays. Nous ajoutons une caisse dès que ses pièces de chasse sont confirmées.",
    link: (y) => `Caisses ${y} de A à Q`,
    cases: (n) => (n === 1 ? "1 caisse" : `${n} caisses`),
  },
};

export function huntCopy(locale: Locale): Copy {
  return locale === "fr" ? fr : en;
}
