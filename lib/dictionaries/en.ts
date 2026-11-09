// English copy for the landing page and the shared site chrome.
// Rules (CLAUDE.md §1, §11, §16.5): human voice, no em dashes, no prices, no earnings promises,
// no resale angle, only features that ship or are clearly marked "coming soon".

export const en = {
  meta: {
    title: "Kastr: Hot Wheels Collection App, Scanner & Value Guide",
    description:
      "What's your Hot Wheels worth? Scan the card to see its recent sales and whether it's already in your collection. 78,256 diecast cars offline, free search, no ads.",
  },
  nav: {
    features: "Features",
    hunts: "Hunt lists",
    faq: "FAQ",
    support: "Support",
    language: "Language",
    home: "Kastr home",
    skip: "Skip to content",
  },
  badge: {
    line1: "Download on the",
    soon: "Coming soon to the",
    line2: "App Store",
    aria: "Download Kastr on the App Store",
  },
  hero: {
    eyebrow: "Hot Wheels & diecast collection app",
    // Two questions, one per line, then the call to action in red (the punchline).
    title: ["What's this Hot Wheels worth?", "Got it already?"],
    cta: "Scan it to find out.",
    subtitle:
      "The collection app for diecast hunters. Recent sales in your currency, doubles flagged before you buy, and the year's Treasure Hunts in one list. 78,256 cars, offline.",
    note: "Free to download · No ads · Works offline",
    imageAlt: "Kastr car page for the 2026 '23 Ram 1500 Super Treasure Hunt: median of 24 carded sales with the sales chart, already in the garage",
  },
  reveal: {
    title: "Super Treasure Hunt",
    added: "Added to your garage",
    alt: "The 2026 '23 Ram 1500 Super Treasure Hunt in Spectraflame Plum Crazy",
  },
  wall: {
    label: "The catalog",
  },
  answer: {
    question: "What is Kastr?",
    text: "Kastr is an iPhone app for diecast car collectors. It carries an offline catalog of 78,256 cars from 1968 to today: Hot Wheels first, plus Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions. In the store aisle it reads the card, tells you whether the car is already in your garage and whether it is a Treasure Hunt, and shows recent sales in your own currency.",
  },
  stats: [
    { value: "78,256", label: "cars in the catalog" },
    { value: "1968", label: "to this year's releases" },
    { value: "7", label: "brands, Hot Wheels first" },
    { value: "Offline", label: "search, garage and hunt list" },
  ],
  hunt: {
    label: "Hunt",
    title: "Scan the peg. Know before you pay.",
    body: "Shoot card after card without stopping and review them after. Each result says if the car is already in your garage, if it would be a double, and if it's a Treasure Hunt. The year's TH and STH list sits on top, with a tick on the ones you found.",
    chips: {
      owned: "In your garage",
      duplicate: "Duplicate",
      th: "Treasure Hunt",
      sth: "Super Treasure Hunt",
    },
    chipsLabel: "What Kastr shows on a scanned car",
    imageAlt: "Kastr Hunt screen: 2 of the 15 Super Treasure Hunts of 2026 found, with the year's list as a photo grid",
  },
  garage: {
    label: "Garage",
    title: "Your garage, like a portfolio.",
    body: "What you paid, what it's worth today and the gap between the two. Your makers, your decades, your rarities, and the series you are close to finishing. CSV import and export, so your spreadsheet comes with you.",
    imageAlt: "Kastr garage: garage value against what was paid, 39 cars, Super Treasure Hunt progress and the cars as photo cards",
  },
  features: {
    label: "Features",
    title: "Everything a collector needs.",
    items: {
      catalog: {
        title: "Every car since 1968",
        body: "78,256 cars stored in the app. Search by name, year, series or toy number, even in a store basement with no signal.",
      },
      brands: {
        title: "Seven brands, one garage",
        body: "Hot Wheels first, then Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions.",
      },
      prices: {
        label: "Recent sales",
        title: "Values with the sales behind them",
        body: "Recent eBay sales and what collectors paid, in your own currency with the original price next to it. You see how many sales a value comes from.",
      },
      where: {
        title: "Where to find it",
        row: "Live on eBay",
        body: "Missing one? Kastr shows the eBay listings open right now for that exact car, so you can complete the set.",
      },
      completion: {
        ringLabel: "Super Treasure Hunt 2026",
        title: "Medals you earn",
        body: "See how much of this year's hunt you hold, and of every Treasure Hunt ever made. Finish a set and its medal lights up.",
      },
      looks: {
        dark: "Dark",
        light: "Light",
        title: "Dark or light",
        body: "Paddock black by default, a light look if you prefer, and a share card for your best finds.",
      },
    },
  },
  soon: {
    title: "Now in the app",
    tag: "New",
    items: {
      community: {
        title: "A feed for collectors",
        body: "Share a find with a photo, attach a car from your garage, follow collectors and browse their garages. Reporting, blocking and moderation built in from day one.",
      },
    },
  },
  principles: {
    label: "Our rules",
    title: "Built the way collectors asked for it.",
    items: [
      {
        title: "Search stays free",
        body: "Looking up a car and adding it from the catalog is free and unlimited.",
      },
      {
        title: "Values you can check",
        body: "The value of a car is free to see, next to the number of sales it comes from.",
      },
      {
        title: "No ads",
        body: "There are no ads in Kastr and no ad tracking. Kastr Pro is how the app pays for itself.",
      },
      {
        title: "Your garage stays on your phone",
        body: "No account needed to build your collection. An account is only for the community and feedback, and you can delete it from the app.",
      },
    ],
  },
  faq: {
    title: "Questions collectors ask",
    items: [
      {
        q: "What is Kastr?",
        a: "Kastr is an iPhone app for diecast collectors. It holds an offline catalog of 78,256 cars from 1968 to today and tells you, in the aisle, whether a car is already in your garage, whether it is a Treasure Hunt, and what it sold for recently.",
      },
      {
        q: "Does Kastr work without a signal?",
        a: "Yes. The whole catalog is stored on your iPhone, so search, your garage and the hunt list work in a store with no signal at all. Values and listings refresh when you are back online.",
      },
      {
        q: "Which brands are in the catalog?",
        a: "Hot Wheels first, then Matchbox, Mini GT, Tomica, M2 Machines, Maisto and Racing Champions. Hot Wheels has the deepest coverage, including Treasure Hunts and Super Treasure Hunts.",
      },
      {
        q: "How does scanning work?",
        a: "Kastr reads the toy number and the barcode on the card right on your iPhone. If it cannot, and you agree, the photo goes through our server to an AI service that identifies the car. Each scan uses a credit, and a scan that finds nothing gives it back. Searching by name stays free and unlimited.",
      },
      {
        q: "Where do the values come from?",
        a: "From recent eBay sales and from the prices collectors share in Kastr. Each value says how many sales it comes from, and it is converted to your currency with European Central Bank rates, with the original price shown next to it.",
      },
      {
        q: "Is Kastr free?",
        a: "Kastr is free to download, and searching the catalog is free and unlimited. Kastr Pro is an optional subscription with extras such as unlimited scans, several garages and your garage's total value. The price is shown in the app before you subscribe, and you can cancel any time in your Apple ID settings.",
      },
      {
        q: "How does Kastr know a car is a Treasure Hunt?",
        a: "Treasure Hunts and Super Treasure Hunts are marked in the catalog for each year. When you look a car up or scan it, Kastr shows its rarity, and the hunt list shows the year's TH and STH with photos so you can spot them on the pegs.",
      },
      {
        q: "Do I need an account?",
        a: "No. You can build your garage without one. An account, with Sign in with Apple or your email, backs up and syncs your garage and opens the community.",
      },
      {
        q: "Can I bring my existing collection?",
        a: "Yes. Save your spreadsheet as CSV and import it into your garage. You can export your garage to CSV at any time too.",
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
      sth: "Super Treasure Hunt lists",
      th: "Treasure Hunt lists",
      cases: "Cases A to Q by year",
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
