// Cars shown on the site, cut out from the catalog photos the app displays (photo authors in the
// catalog's photo_author column; the founder holds their permission, CLAUDE.md §9). Names, series and
// rarities checked against the catalog (data/out/catalog.sqlite in the app repo).

export type Rarity = "mainline" | "sth";

export type Car = {
  file: string;
  name: string;
  series: string;
  year: number;
  rarity: Rarity;
  width: number;
  height: number;
};

const car = (file: string, name: string, series: string, width: number, height: number, rarity: Rarity = "mainline"): Car => ({
  file: `/cars/${file}.webp`,
  name,
  series,
  year: 2026,
  rarity,
  width,
  height,
});

export const ram = car("ram-1500-sth", "'23 Ram 1500", "HW Dirt 9/10", 720, 451, "sth");
export const impala = car("impala", "'64 Impala", "Layin' Low 4/5", 346, 136, "sth");

export const garageWall: Car[] = [
  car("miata", "'04 Mazda Mazdaspeed Miata", "Neon Speeders 8/8", 478, 227),
  ram,
  car("shelby-gt500", "'10 Ford Shelby GT500 Super Snake", "ZAMAC Themed Multipack", 476, 246),
  car("subaru-wrx", "'03 Subaru Impreza WRX Wagon Bugeye", "Pull-Back Speeders 9/32", 442, 254),
  car("sierra-cosworth", "'87 Ford Sierra Cosworth", "HW Euro 5/10", 470, 215),
  car("corvette-stingray", "'14 Corvette Stingray Convertible", "Multipack Exclusive", 469, 262),
  impala,
  car("bmw-m3", "'10 BMW M3", "Multi-Pack Exclusive", 424, 200),
  car("f40", "Ferrari F40 Competizione", "Ferrari 3/5", 480, 230),
  car("pontiac-gto", "'06 Pontiac GTO", "Pontiac 100th Anniversary 2/5", 449, 200),
  car("corvette-gs", "Corvette Grand Sport", "Then and Now", 474, 231),
  car("custom-otto", "Custom Otto", "Mattel 5/5", 472, 218),
];
