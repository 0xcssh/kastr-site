import Image from "next/image";
import {
  CaretLeft,
  CarProfile,
  CheckCircle,
  Copy,
  Flame,
  Garage,
  Heart,
  MagnifyingGlass,
  Minus,
  Plus,
} from "@phosphor-icons/react/dist/ssr";
import type { Dictionary } from "@/lib/dictionaries";
import { cars, type MockCar } from "@/lib/mockup-cars";

// App screens drawn in HTML, after the SwiftUI views (CatalogSearchView, OwnershipBar, TreasureReveal,
// HuntView). They stand in for screenshots until the app has real ones. Everything inside a phone is
// sized in `em` from a font size in container units, so a mockup scales with its column.

type M = Dictionary["mockup"];

function Phone({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    // The outer div is the size container; the frame and screen inside measure against it.
    <div className={`@container ${className}`}>
      <div className="relative aspect-[9/19.5] rounded-[14cqw] bg-[linear-gradient(160deg,#3a3a42,#1c1c21)] p-[2.4cqw] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.9)] ring-1 ring-white/10">
        <div className="relative h-full overflow-hidden rounded-[11.6cqw] bg-carbon text-ink" style={{ fontSize: "4.4cqw" }}>
          <div className="absolute left-1/2 top-[0.6em] z-10 h-[1.6em] w-[5.6em] -translate-x-1/2 rounded-full bg-black" />
          {children}
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-[1.6em] pt-[0.9em] text-[0.8em] font-semibold">
      <span>9:41</span>
      <span className="flex items-center gap-[0.3em]">
        <span className="h-[0.7em] w-[1.1em] rounded-[0.2em] border border-ink/70" />
      </span>
    </div>
  );
}

function CarTile({ car, className = "" }: { car: MockCar; className?: string }) {
  const [light, dark] = car.paint;
  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-[0.6em] ${className}`}
      style={{ background: `linear-gradient(145deg, ${light}, ${dark})` }}
    >
      {car.photo ? (
        <Image src={car.photo} alt="" fill sizes="200px" className="object-cover" />
      ) : (
        <>
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_30%,rgba(255,255,255,0.35)_45%,transparent_60%)]" />
          <CarProfile weight="fill" className="absolute inset-[18%] h-[64%] w-[64%] text-black/45" />
        </>
      )}
    </div>
  );
}

function SthChip({ m, size = "sm" }: { m: M; size?: "sm" | "lg" }) {
  return (
    <span
      className={`spectraflame inline-flex items-center gap-[0.3em] rounded-full font-bold uppercase text-carbon ${
        size === "sm" ? "px-[0.5em] py-[0.15em] text-[0.62em]" : "px-[0.8em] py-[0.3em] text-[0.8em]"
      }`}
    >
      <Flame weight="fill" className="h-[1em] w-[1em]" />
      {size === "sm" ? "STH" : m.sth}
    </span>
  );
}

function TabBar({ m, active }: { m: M; active: "search" | "garage" | "hunt" }) {
  const tabs = [
    { key: "search", label: m.search, Icon: MagnifyingGlass },
    { key: "garage", label: m.garage, Icon: Garage },
    { key: "hunt", label: m.hunt, Icon: Flame },
  ] as const;
  return (
    <div className="absolute inset-x-0 bottom-0 flex justify-around border-t border-line bg-surface/95 px-[1em] pb-[1.6em] pt-[0.6em]">
      {tabs.map(({ key, label, Icon }) => (
        <span key={key} className={`flex flex-col items-center gap-[0.2em] text-[0.62em] ${key === active ? "text-accent" : "text-faint"}`}>
          <Icon weight={key === active ? "fill" : "regular"} className="h-[1.9em] w-[1.9em]" />
          {label}
        </span>
      ))}
    </div>
  );
}

function ResultRow({ car, m, owned, wish }: { car: MockCar; m: M; owned?: number; wish?: boolean }) {
  return (
    <div
      className={`-mx-[0.5em] flex items-center gap-[0.7em] border-b border-line/70 px-[0.5em] py-[0.65em] ${
        car.rarity === "sth" ? "rounded-[0.6em] border-transparent bg-[linear-gradient(90deg,rgba(250,199,64,0.16),transparent_80%)]" : ""
      }`}
    >
      <CarTile car={car} className="h-[2.9em] w-[4.1em]" />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-[0.4em]">
          <p className="truncate text-[0.86em] font-semibold">{car.name}</p>
        </div>
        <p className="truncate text-[0.68em] text-muted">
          {car.year} · {car.series} · {car.colour}
        </p>
        <p className="mt-[0.15em] flex items-center gap-[0.4em] text-[0.62em] text-faint">
          Hot Wheels · {car.toyNumber}
          {car.rarity === "sth" && <SthChip m={m} />}
        </p>
      </div>
      {owned ? (
        <span
          aria-label={m.inGarage}
          className={`flex items-center gap-[0.2em] text-[0.72em] font-bold ${owned > 1 ? "text-accent" : "text-emerald-400"}`}
        >
          {owned > 1 ? <Copy weight="fill" className="h-[1.3em] w-[1.3em]" /> : <CheckCircle weight="fill" className="h-[1.3em] w-[1.3em]" />}
          ×{owned}
        </span>
      ) : (
        <Heart weight={wish ? "fill" : "regular"} aria-label={m.wishlist} className={`h-[1.2em] w-[1.2em] ${wish ? "text-accent" : "text-faint"}`} />
      )}
    </div>
  );
}

/** Hero: the search screen, "F40" typed, owned and STH badges on the results. */
export function SearchMockup({ m, alt, className = "" }: { m: M; alt: string; className?: string }) {
  return (
    <div role="img" aria-label={alt} className={`relative ${className}`}>
      <div aria-hidden="true" className="absolute inset-[8%] rounded-full bg-accent/25 blur-3xl" />
      <div aria-hidden="true" className="checker absolute -right-4 top-10 h-32 w-32 rotate-12 opacity-[0.06]" />
      <Phone className="relative mx-auto w-[78%] max-w-[22rem]">
        <div aria-hidden="true">
          <StatusBar />
          <p className="px-[1.2em] pt-[1.4em] font-display text-[1.9em] font-black uppercase italic leading-none">{m.search}</p>
          <div className="mx-[1.2em] mt-[0.8em] flex items-center gap-[0.5em] rounded-[0.7em] bg-surface-2 px-[0.7em] py-[0.55em] text-[0.9em]">
            <MagnifyingGlass className="h-[1.1em] w-[1.1em] text-faint" />
            <span>F40</span>
            <span className="h-[1.1em] w-[0.1em] animate-pulse bg-accent" />
          </div>
          <p className="ml-[1.75em] pt-[1.3em] text-[0.68em] uppercase tracking-wider text-faint">{m.results}</p>
          <div className="px-[1.2em]">
            <ResultRow car={cars.f40Sth} m={m} />
            <ResultRow car={cars.f40Nero} m={m} owned={1} />
            <ResultRow car={cars.f40Rosso} m={m} owned={2} />
            <ResultRow car={cars.f40Giallo} m={m} wish />
            <ResultRow car={cars.f40ToyFair} m={m} />
            <ResultRow car={cars.f40Scuderia} m={m} owned={1} />
          </div>
          <TabBar m={m} active="search" />
        </div>
      </Phone>
    </div>
  );
}

/** Aisle: a car page with the ownership bar showing it is already in the garage. */
export function DetailMockup({ m, alt, className = "" }: { m: M; alt: string; className?: string }) {
  const car = cars.civic;
  const facts = [
    [m.year, String(car.year)],
    [m.series, car.series],
    [m.colour, car.colour],
    [m.toyNumber, car.toyNumber],
  ];
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(70%_60%_at_50%_100%,rgba(52,211,153,0.16),transparent_70%)]" />
      <div aria-hidden="true" className="checker absolute -left-12 -top-12 h-48 w-48 rotate-12 opacity-[0.05]" />
      <Phone className="relative w-[44%] translate-y-[24%] rotate-[-4deg] sm:w-[40%]">
        <div aria-hidden="true">
          <StatusBar />
          <div className="flex items-center gap-[0.3em] px-[1em] pt-[1.1em] text-[0.8em] text-accent">
            <CaretLeft weight="bold" className="h-[1em] w-[1em]" />
            {m.search}
          </div>
          <CarTile car={car} className="mx-[1em] mt-[0.7em] h-[8em]" />
          <p className="px-[1em] pt-[0.8em] font-display text-[1.35em] font-black uppercase leading-none">{car.name}</p>
          <dl className="mx-[1em] mt-[0.8em] grid grid-cols-2 gap-[0.5em] text-[0.68em]">
            {facts.map(([k, v]) => (
              <div key={k} className="rounded-[0.6em] bg-surface-2 px-[0.6em] py-[0.4em]">
                <dt className="text-faint">{k}</dt>
                <dd className="truncate font-semibold">{v}</dd>
              </div>
            ))}
          </dl>
          <div className="mx-[1em] mt-[0.9em] flex items-center gap-[0.5em]">
            <span className="flex flex-1 items-center justify-center gap-[0.35em] rounded-[0.7em] bg-emerald-500/15 py-[0.6em] text-[0.8em] font-bold text-emerald-300">
              <CheckCircle weight="fill" className="h-[1.2em] w-[1.2em]" />
              {m.inGarage}
            </span>
            <span className="flex items-center gap-[0.5em] rounded-[0.7em] bg-surface-2 px-[0.6em] py-[0.6em] text-[0.8em] font-bold">
              <Minus weight="bold" className="h-[0.9em] w-[0.9em] text-faint" />1
              <Plus weight="bold" className="h-[0.9em] w-[0.9em] text-accent" />
            </span>
          </div>
        </div>
      </Phone>
      <div aria-hidden="true" className="absolute right-[7%] top-[12%] hidden rotate-[3deg] items-center gap-2 rounded-full border border-emerald-400/30 bg-carbon/90 px-4 py-2 text-sm font-bold uppercase tracking-wide text-emerald-300 shadow-xl sm:flex">
        <CheckCircle weight="fill" className="h-4 w-4" />
        {m.inGarage} ×1
      </div>
    </div>
  );
}

function GuideTile({ car, owned }: { car: MockCar; owned: boolean }) {
  return (
    <div className="w-40 rounded-xl border border-gold/20 bg-carbon/80 p-2 shadow-xl">
      <div className="relative">
        <CarTile car={car} className="h-20 w-full" />
        {owned && <CheckCircle weight="fill" className="absolute right-1.5 top-1.5 h-5 w-5 text-emerald-400 drop-shadow" />}
      </div>
      <p className="mt-2 truncate text-xs font-semibold text-ink">{car.name}</p>
      <p className="truncate text-[11px] text-muted">{car.colour}</p>
    </div>
  );
}

/** Reveal: the Super Treasure Hunt moment, flanked by tiles from the year's hunt guide. */
export function RevealMockup({ m, alt, className = "" }: { m: M; alt: string; className?: string }) {
  const car = cars.cudaSth;
  return (
    <div
      role="img"
      aria-label={alt}
      className={`relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-gold/25 bg-surface sm:aspect-[16/9] ${className}`}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-[radial-gradient(55%_70%_at_50%_45%,rgba(250,199,64,0.28),transparent_70%)]" />
      <div aria-hidden="true" className="absolute left-[5%] top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-gold">{m.guide}</p>
        <div className="-rotate-3"><GuideTile car={cars.firebirdSth} owned /></div>
        <div className="translate-x-6 rotate-2"><GuideTile car={cars.civicSth} owned={false} /></div>
      </div>
      <div aria-hidden="true" className="absolute right-[5%] top-1/2 hidden -translate-y-1/2 flex-col gap-4 md:flex">
        <div className="rotate-3"><GuideTile car={cars.f40Sth} owned={false} /></div>
        <div className="-translate-x-6 -rotate-2"><GuideTile car={cars.maximaSth} owned /></div>
      </div>
      <Phone className="relative w-[42%] translate-y-[30%] sm:w-[27%] sm:translate-y-[16%]">
        <div aria-hidden="true" className="flex h-full flex-col items-center bg-black/90 px-[1.4em] pt-[5.5em] text-center">
          <Flame weight="fill" className="h-[5.5em] w-[5.5em] text-gold drop-shadow-[0_0_1.4em_rgba(250,199,64,0.7)]" />
          <p className="text-spectraflame mt-[0.8em] font-display text-[1.7em] font-black uppercase italic leading-[0.95]">{m.sth}</p>
          <p className="mt-[0.8em] text-[0.95em] font-semibold">{car.name}</p>
          <p className="mt-[0.3em] text-[0.75em] text-muted">{m.added}</p>
          <CarTile car={car} className="mt-[1.2em] h-[6.5em] w-full" />
        </div>
      </Phone>
    </div>
  );
}
