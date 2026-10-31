// Real catalog rows (CLAUDE.md §8.1, Fandom import of 2026-10-31) used by the phone mockups.
// `paint` drives the tile gradient while there is no photo. To use a real photo, drop it in
// public/media/cars/ and set `photo` (e.g. "/media/cars/cuda-sth-2026.jpg"); the tile switches to it.

export type MockRarity = "mainline" | "th" | "sth";

export type MockCar = {
  name: string;
  year: number;
  series: string;
  colour: string;
  toyNumber: string;
  rarity: MockRarity;
  paint: [string, string];
  photo?: string;
};

export const cars = {
  f40Sth: {
    name: "Ferrari F40 Competizione",
    year: 2026,
    series: "Ferrari",
    colour: "Spectraflame Grigio Nardo",
    toyNumber: "JJM17",
    rarity: "sth",
    paint: ["#c9ccd1", "#5d636b"],
  },
  f40Nero: {
    name: "Ferrari F40 Competizione",
    year: 2026,
    series: "Ferrari",
    colour: "Nero DS",
    toyNumber: "JJJ31",
    rarity: "mainline",
    paint: ["#3a3a40", "#0f0f12"],
  },
  f40Rosso: {
    name: "Ferrari F40 Competizione",
    year: 2025,
    series: "HW Exotics",
    colour: "Rosso Corsa",
    toyNumber: "HYW59",
    rarity: "mainline",
    paint: ["#e3262b", "#7a0c10"],
  },
  f40Giallo: {
    name: "Ferrari F40 Competizione",
    year: 2025,
    series: "HW Exotics",
    colour: "Giallo Modena",
    toyNumber: "JBB92",
    rarity: "mainline",
    paint: ["#ffd23a", "#b88a00"],
  },
  f40ToyFair: {
    name: "Ferrari F40 Competizione",
    year: 2027,
    series: "Toy Fair",
    colour: "Spectraflame Rosso Corsa",
    toyNumber: "JKD44",
    rarity: "mainline",
    paint: ["#ff4a4f", "#8f0d14"],
  },
  f40Scuderia: {
    name: "Ferrari F40 Competizione",
    year: 2026,
    series: "Ferrari 5-Pack",
    colour: "Rosso Scuderia",
    toyNumber: "JKG16",
    rarity: "mainline",
    paint: ["#f0353a", "#760b10"],
  },
  civic: {
    name: "Honda Civic Custom",
    year: 2026,
    series: "Drag Racers",
    colour: "Metalflake teal",
    toyNumber: "JJJ81",
    rarity: "mainline",
    paint: ["#25b8b0", "#0b5653"],
  },
  cudaSth: {
    name: "'70 Plymouth AAR Cuda",
    year: 2026,
    series: "HW Torque",
    colour: "Spectraflame gold",
    toyNumber: "JJM28",
    rarity: "sth",
    paint: ["#ffe08a", "#a8700f"],
  },
  firebirdSth: {
    name: "'67 Pontiac Firebird 400",
    year: 2026,
    series: "Cool Classics",
    colour: "Spectraflame sky blue",
    toyNumber: "JJM29",
    rarity: "sth",
    paint: ["#9fd8ff", "#2a6fa8"],
  },
  civicSth: {
    name: "Honda Civic Custom",
    year: 2026,
    series: "Drag Racers",
    colour: "Spectraflame teal",
    toyNumber: "JJM20",
    rarity: "sth",
    paint: ["#6ff0e4", "#0d6f69"],
  },
  maximaSth: {
    name: "Nissan Maxima Drift Car",
    year: 2026,
    series: "Wagons",
    colour: "Spectraflame Black",
    toyNumber: "JJM26",
    rarity: "sth",
    paint: ["#4b4b57", "#08080b"],
  },
} satisfies Record<string, MockCar>;
