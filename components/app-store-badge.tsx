import { AppleLogo } from "@phosphor-icons/react/dist/ssr";
import { config } from "@/lib/config";
import type { Dictionary } from "@/lib/dictionaries";

// Download button. Before launch, replace with Apple's official badge artwork
// (https://developer.apple.com/app-store/marketing/guidelines/) saved in public/badges/.
// The link target lives in lib/config.ts (appStoreUrl).
export function AppStoreBadge({ d, size = "lg" }: { d: Dictionary; size?: "sm" | "lg" }) {
  const big = size === "lg";
  return (
    <a
      href={config.appStoreUrl}
      aria-label={d.badge.aria}
      className={`group inline-flex items-center gap-3 rounded-xl border border-white/20 bg-black text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:border-white/40 active:translate-y-0 active:scale-[0.98] ${
        big ? "h-14 px-5" : "h-10 px-3.5"
      }`}
    >
      <AppleLogo weight="fill" className={big ? "h-7 w-7" : "h-5 w-5"} aria-hidden="true" />
      <span className="flex flex-col items-start leading-none">
        <span className={big ? "text-[11px]" : "text-[9px]"}>{d.badge.line1}</span>
        <span className={`font-semibold tracking-tight ${big ? "text-xl" : "text-[15px]"}`}>{d.badge.line2}</span>
      </span>
    </a>
  );
}
