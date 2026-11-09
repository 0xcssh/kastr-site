import { Check, Flame } from "@phosphor-icons/react/dist/ssr";
import type { Car } from "@/lib/cars";

// Web versions of the app's shared building blocks (Diecast/Design/Components.swift), so the site
// reads like the app: carbon cards with a hairline, red-bar section labels, studio photo tiles,
// green "in garage" check, gold medal for hunted cars, ring progress.

/** SectionHeader: a short red bar, then the label in wide caps. */
export function SectionLabel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`flex items-center gap-2.5 font-display text-[13px] font-extrabold uppercase tracking-[0.08em] text-ink ${className}`}>
      <span aria-hidden="true" className="h-4 w-1 rounded-[2px] bg-accent" />
      {children}
    </p>
  );
}

/** ScreenTitle's speed stripes: three red capsules of shrinking length. */
export function SpeedStripes({ className = "" }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`inline-flex flex-col items-end gap-[0.12em] ${className}`}>
      <span className="h-[0.16em] w-[0.95em] rounded-full bg-[linear-gradient(#e10a1e,#a3000f)]" />
      <span className="h-[0.16em] w-[0.62em] rounded-full bg-[linear-gradient(#e10a1e,#a3000f)]" />
      <span className="h-[0.16em] w-[0.33em] rounded-full bg-[linear-gradient(#e10a1e,#a3000f)]" />
    </span>
  );
}

/** RarityMark: the round gold medal with a flame, on the corner of a hunted car's photo. */
export function HuntMedal({ size = "md", tone = "gold" }: { size?: "md" | "lg"; tone?: "gold" | "silver" }) {
  const box = size === "lg" ? "h-11 w-11" : "h-7 w-7";
  const icon = size === "lg" ? "h-6 w-6" : "h-4 w-4";
  // Gold for a Super Treasure Hunt, silver for a Treasure Hunt, like the logos on the cards.
  const finish =
    tone === "gold"
      ? "spectraflame shadow-[0_0_14px_rgba(248,197,65,0.45)]"
      : "bg-[linear-gradient(115deg,#ffffff,#c9ced6_45%,#8a919c_70%,#e6e9ee)] shadow-[0_0_12px_rgba(201,206,214,0.35)]";
  return (
    <span
      className={`${finish} inline-flex ${box} items-center justify-center rounded-full text-[#16161b] ring-[0.5px] ring-white/40`}
    >
      <Flame weight="fill" aria-hidden="true" className={icon} />
    </span>
  );
}

/** OwnedBadge: green circle with a dark check. */
export function OwnedCheck() {
  return (
    <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-chrono text-[#0b0b0e]">
      <Check weight="bold" aria-hidden="true" className="h-4 w-4" />
    </span>
  );
}

/** The plain studio tile every catalog photo sits on; stays light in both themes, like the app. */
export function StudioPhoto({
  car,
  alt,
  className = "",
  priority = false,
  sizes = "200px",
  children,
}: {
  car: Car;
  alt: string;
  className?: string;
  priority?: boolean;
  /** Rendered width of the car image, for picking the half-size copy (<file>-sm.webp). */
  sizes?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-2xl bg-studio ${className}`}>
      <div aria-hidden="true" className="absolute inset-x-[8%] bottom-[13%] h-[16%] bg-[radial-gradient(closest-side,rgba(0,0,0,0.25),transparent)]" />
      {/* Static export: images are served as is (next.config images.unoptimized). */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={car.file}
        srcSet={`${car.file.replace(/\.webp$/, "-sm.webp")} ${Math.floor(car.width / 2)}w, ${car.file} ${car.width}w`}
        sizes={sizes}
        alt={alt}
        width={car.width}
        height={car.height}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="relative w-[84%] drop-shadow-[0_6px_8px_rgba(0,0,0,0.18)]"
      />
      {children}
    </div>
  );
}

/** CarCard from the garage grid: studio photo, brand and year eyebrow, name, series. */
export function CarCard({ car, owned = true, brand = "Hot Wheels" }: { car: Car; owned?: boolean; brand?: string }) {
  return (
    <figure
      className={`flex w-full flex-col rounded-[20px] border bg-surface p-2 ${owned ? "border-chrono/45" : "border-ink/10"}`}
    >
      <StudioPhoto car={car} alt="" className="aspect-[4/3]">
        {car.rarity === "sth" && (
          <span className="absolute left-2.5 top-2.5">
            <HuntMedal />
          </span>
        )}
        {owned && (
          <span className="absolute right-2.5 top-2.5">
            <OwnedCheck />
          </span>
        )}
      </StudioPhoto>
      <figcaption className="px-2 pb-2 pt-3">
        <span className="block font-display text-[10.5px] font-semibold uppercase tracking-[0.1em] text-muted">
          {brand} · {car.year}
        </span>
        <span className="mt-1 block truncate font-semibold leading-tight text-ink">{car.name}</span>
        <span className="mt-0.5 block truncate text-sm text-muted">{car.series}</span>
      </figcaption>
    </figure>
  );
}

/** ProgressRing: titanium track, red arc (gold for the hunt), figure in the middle. */
export function ProgressRing({
  value,
  total,
  tone = "accent",
  className = "",
}: {
  value: number;
  total: number;
  tone?: "accent" | "gold";
  className?: string;
}) {
  const r = 42;
  const c = 2 * Math.PI * r;
  const arc = c * Math.min(1, value / total);
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="ring-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffefa0" />
          <stop offset="0.5" stopColor="#f8c541" />
          <stop offset="1" stopColor="#b07a12" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r={r} fill="none" strokeWidth="9" className="stroke-ink/10" />
      <circle
        cx="50"
        cy="50"
        r={r}
        fill="none"
        strokeWidth="9"
        strokeLinecap="round"
        strokeDasharray={`${arc} ${c}`}
        transform="rotate(-90 50 50)"
        stroke={tone === "gold" ? "url(#ring-gold)" : "#e10a1e"}
      />
    </svg>
  );
}
