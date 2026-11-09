import { CheckCircle } from "@phosphor-icons/react/dist/ssr";
import { garageWall, ram, type Car } from "@/lib/cars";
import { CarCard, HuntMedal, StudioPhoto } from "./kit";

// Two rows of garage cards drifting in opposite directions. Each row is rendered twice so the loop is
// seamless; the copy is hidden from assistive tech. With reduced motion the rows stand still and scroll.
function Row({ cars, reverse = false }: { cars: Car[]; reverse?: boolean }) {
  const card = (car: Car, i: number) => (
    <li key={`${car.file}-${i}`} className="w-[13.5rem] shrink-0 sm:w-[15rem]">
      <CarCard car={car} />
    </li>
  );
  return (
    <div className="marquee overflow-x-auto [scrollbar-width:none] motion-safe:overflow-hidden">
      <div className={`marquee-track flex w-max gap-4 ${reverse ? "marquee-reverse" : ""}`}>
        <ul className="flex gap-4">{cars.map(card)}</ul>
        <ul aria-hidden="true" className="flex gap-4 motion-reduce:hidden">
          {cars.map(card)}
        </ul>
      </div>
    </div>
  );
}

export function GarageWall({ label }: { label: string }) {
  const half = Math.ceil(garageWall.length / 2);
  return (
    <section aria-label={label} className="relative space-y-4">
      {/* Edge fades as overlays: a mask over moving content is repainted on every frame. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-[6%] bg-gradient-to-r from-carbon to-transparent" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-[6%] bg-gradient-to-l from-carbon to-transparent" />
      <Row cars={garageWall.slice(0, half)} />
      <Row cars={[...garageWall.slice(half), ...garageWall.slice(0, 2)]} reverse />
    </section>
  );
}

/** The reward screen shown for the first copy of a TH or STH added to the garage, by search or scan (Diecast/Views/RevealView.swift). */
export function RevealCard({ title, added, alt }: { title: string; added: string; alt: string }) {
  return (
    <div className="relative w-full max-w-[19rem] rounded-[28px] border border-gold/35 bg-[#0b0b0e] p-5 pb-6 text-center shadow-[0_30px_80px_-20px_rgba(0,0,0,0.8)]">
      <div
        aria-hidden="true"
        className="absolute inset-0 rounded-[28px] bg-[radial-gradient(60%_55%_at_50%_38%,rgba(248,197,65,0.42),transparent_70%)]"
      />
      <div className="relative">
        <StudioPhoto car={ram} alt={alt} priority sizes="260px" className="aspect-[5/4] shadow-[0_0_40px_rgba(248,197,65,0.35)] ring-2 ring-gold/70">
          <span className="absolute right-2.5 top-2.5">
            <HuntMedal size="lg" />
          </span>
        </StudioPhoto>
        <p className="text-spectraflame mt-5 font-display text-base font-black sm:text-lg uppercase leading-none tracking-[0.02em]">{title}</p>
        <p className="mt-2 text-sm font-semibold text-white">{ram.name}</p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2bd46a]">
          <CheckCircle weight="fill" aria-hidden="true" className="h-4 w-4" />
          {added}
        </p>
      </div>
    </div>
  );
}
