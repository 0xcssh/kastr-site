// English copy for the landing page and the shared site chrome.
// Rules (CLAUDE.md §1, §11, §16.5): human voice, no em dashes, no prices, no earnings promises,
// no resale angle, only features that ship or are clearly marked "coming soon".

export const en = {
  meta: {
    title: "Kastr: the diecast collector app for the aisle",
    description:
      "Know in two seconds if you already own a diecast car, if it's a Treasure Hunt, and what it's worth. Offline catalog of about 78,000 cars, iPhone.",
  },
  nav: {
    features: "Features",
    faq: "FAQ",
    support: "Support",
    language: "Language",
    home: "Kastr home",
    skip: "Skip to content",
  },
  badge: {
    line1: "Download on the",
    line2: "App Store",
    aria: "Download Kastr on the App Store",
  },
  hero: {
    eyebrow: "The diecast collector app",
    title: "Know in two seconds.",
    subtitle:
      "If you already own it, if it's a Treasure Hunt, and what it's worth. Right in front of the pegs.",
    imageAlt: "Hands holding a carded diecast car above a store peg, seen from above",
  },
  answer: {
    question: "What is Kastr?",
    text: "Kastr is an iPhone app for diecast car collectors. It carries an offline catalog of about 78,000 cars from 1968 to today: Hot Wheels first, plus Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions. In the store aisle it tells you whether a car is already in your garage and whether it is a Treasure Hunt.",
  },
  stats: [
    { value: "78,000+", label: "cars in the catalog" },
    { value: "1968", label: "to this year's releases" },
    { value: "7", label: "brands, Hot Wheels first" },
    { value: "Offline", label: "search, garage and hunt guide" },
  ],
  aisle: {
    title: "Already in your garage?",
    body: "Type a name, a year or the toy number on the card. Kastr checks your garage on the spot, with no signal, and flags a double before you pay for it.",
    chips: {
      owned: "In your garage",
      duplicate: "Duplicate",
      th: "Treasure Hunt",
      sth: "Super Treasure Hunt",
    },
    chipsLabel: "What Kastr shows on a search result",
    imageAlt: "A thumb scrolling a search result while the other hand holds a car, top view",
  },
  features: {
    title: "Everything a hunter needs, offline.",
    items: {
      catalog: {
        title: "Every car since 1968",
        body: "About 78,000 cars stored in the app. Search by name, year, series or toy number, even in a store basement.",
      },
      brands: {
        title: "Seven brands, one garage",
        body: "Hot Wheels first, then Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions.",
      },
      garage: {
        title: "Your garage, your notes",
        body: "What you paid, where you found it, its condition. A wishlist for the ones you're after. CSV import and export, so your spreadsheet comes with you.",
      },
      hunt: {
        title: "This year's Treasure Hunts",
        body: "The year's TH and STH as a photo grid, with a tick on the ones you already have.",
      },
      completion: {
        title: "Medals you earn",
        body: "See how much of this year's hunt you hold, and of every Treasure Hunt ever made. Finish a set and its medal lights up.",
      },
    },
  },
  reveal: {
    title: "Find a Super Treasure Hunt. Feel it.",
    body: "When the car is a Treasure Hunt or a Super Treasure Hunt, Kastr doesn't hide it in a small label. The screen lights up in Spectraflame gold and your iPhone answers with a firm tap.",
    imageAlt: "A Super Treasure Hunt car with Spectraflame paint, held between two fingers",
  },
  soon: {
    title: "On the way",
    tag: "Coming soon",
    items: {
      scan: {
        title: "Scan it",
        body: "Point at the barcode or the card, or snap a loose car. Shoot a whole peg in a row and review later.",
      },
      values: {
        title: "Values, with the sales behind them",
        body: "A value in your own currency, the number of sales it comes from, and the sales themselves. Carded, loose and lots kept apart.",
      },
      community: {
        title: "A feed for collectors",
        body: "Show a find, attach a car from your garage, flag a catalog mistake. Reporting and blocking built in from day one.",
      },
    },
  },
  principles: {
    title: "Built the way collectors asked for it.",
    items: [
      {
        title: "Search stays free",
        body: "Looking up a car and adding it from the catalog is free and unlimited.",
      },
      {
        title: "Values you can check",
        body: "When values arrive, the value of a car will be free to see, next to the number of sales it comes from.",
      },
      {
        title: "No ads",
        body: "There are no ads in Kastr and no ad tracking. Kastr Pro is how the app pays for itself.",
      },
      {
        title: "Your garage stays on your phone",
        body: "No account needed to build your collection. An account is only for community features, and you can delete it from the app.",
      },
    ],
  },
  faq: {
    title: "Questions collectors ask",
    items: [
      {
        q: "What is Kastr?",
        a: "Kastr is an iPhone app for diecast collectors. It holds an offline catalog of about 78,000 cars from 1968 to today and tells you, in the aisle, whether a car is already in your garage and whether it is a Treasure Hunt.",
      },
      {
        q: "Does Kastr work without a signal?",
        a: "Yes. The whole catalog is stored on your iPhone, so search, your garage and the hunt guide work in a store with no signal at all.",
      },
      {
        q: "Which brands are in the catalog?",
        a: "Hot Wheels first, then Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions. Hot Wheels has the deepest coverage, including Treasure Hunts and Super Treasure Hunts.",
      },
      {
        q: "Is Kastr free?",
        a: "Kastr is free to download, and searching the catalog is free and unlimited. Kastr Pro is an optional subscription with extras such as several garages. The price is shown in the app before you subscribe, and you can cancel any time in your Apple ID settings.",
      },
      {
        q: "How does Kastr know a car is a Treasure Hunt?",
        a: "Treasure Hunts and Super Treasure Hunts are marked in the catalog for each year. When you look a car up, Kastr shows its rarity, and the hunt guide lists the year's TH and STH with photos so you can spot them on the pegs.",
      },
      {
        q: "Do I need an account?",
        a: "No. You can build your garage without one. An account with Sign in with Apple will only be needed for the community and in-app feedback.",
      },
      {
        q: "Can I bring my existing collection?",
        a: "Yes. Save your spreadsheet as CSV and import it into your garage. You can export your garage to CSV at any time too.",
      },
      {
        q: "When does scanning arrive?",
        a: "Scanning, values and the community are being built now. They will come in an app update, and this page will say so when they do.",
      },
      {
        q: "Is Kastr on Android?",
        a: "Not yet. Kastr runs on iPhone with iOS 17 or later.",
      },
      {
        q: "Is Kastr affiliated with Mattel?",
        a: "No. Kastr is an independent app and is not affiliated with Mattel, Inc. Hot Wheels and Matchbox are trademarks of Mattel, Inc.",
      },
    ],
  },
  cta: {
    title: "Your garage, in your pocket.",
    body: "Free to download. For iPhone with iOS 17 or later.",
  },
  footer: {
    disclaimer: "Kastr is independent and not affiliated with Mattel, Inc.",
    trademarks:
      "Hot Wheels and Matchbox are trademarks of Mattel, Inc. Tomica, Mini GT, M2 Machines, Maisto and Racing Champions belong to their respective owners. Brand names are used only to describe the cars in the catalog.",
    links: {
      privacy: "Privacy",
      terms: "Terms",
      support: "Support",
      credits: "Credits",
    },
    publisher: "Published by",
  },
  legalChrome: {
    updated: "Last updated",
    contents: "On this page",
    back: "Back to Kastr",
  },
  notFound: {
    title: "This page took a wrong turn.",
    body: "The page you were looking for does not exist.",
    home: "Back to Kastr",
  },
  blog: {
    title: "Guides",
    empty: "Guides for collectors are on the way.",
  },
};

export type Dictionary = typeof en;
