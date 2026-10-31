// Photos the landing needs. Style (CLAUDE.md §11): faceless, hands and cars only, shot from above,
// real store aisles. Drop the file in public/media/ and set `src` (e.g. "/media/hero.jpg").
// While `src` is null, the page shows the matching phone mockup (components/phone-mockups.tsx).

export type MediaSlot = { src: string | null; width: number; height: number };

export const media = {
  // Hands holding a carded car in front of a peg wall, top-down. Portrait 4:5.
  hero: { src: null, width: 1200, height: 1500 },
  // Thumb on an iPhone showing a search result with the "In your garage" badge, other hand holding the car.
  aisle: { src: null, width: 1200, height: 900 },
  // Close-up of a Super Treasure Hunt (Spectraflame paint, Real Riders) between two fingers. Wide 16:9.
  reveal: { src: null, width: 1600, height: 900 },
} satisfies Record<string, MediaSlot>;
