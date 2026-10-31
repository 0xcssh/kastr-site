import { CheckCircle, Copy, Flame } from "@phosphor-icons/react/dist/ssr";

// Styled after the badges the app shows on a search result (Diecast/Views/RarityBadge.swift,
// OwnershipBar.swift): green owned, orange duplicate, silver TH, Spectraflame gold STH.
type Kind = "owned" | "duplicate" | "th" | "sth";

const styles: Record<Kind, string> = {
  owned: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
  duplicate: "border-accent/40 bg-accent/10 text-accent",
  th: "border-white/25 bg-[linear-gradient(135deg,#ffffff,#d9d9d9_45%,#8c8c8c)] text-carbon",
  sth: "spectraflame border-gold/50 text-carbon",
};

export function RarityChip({ kind, label }: { kind: Kind; label: string }) {
  const Icon = kind === "owned" ? CheckCircle : kind === "duplicate" ? Copy : Flame;
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-bold uppercase tracking-wide ${styles[kind]}`}
    >
      <Icon weight="fill" aria-hidden="true" className="h-4 w-4" />
      {label}
    </span>
  );
}
