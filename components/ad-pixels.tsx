"use client";

import { useEffect, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import { config, hasPixels } from "@/lib/config";
import type { Dictionary } from "@/lib/dictionaries";

// Ad measurement for the day paid campaigns start: the Meta and TikTok pixels, loaded only for an id set
// in lib/config.ts and only after the visitor says yes. With no id the component renders nothing, loads
// nothing and stores nothing, which is what the privacy page says in that case.
// Events: a page view on every page, a lead when the early access form goes through. No email address
// or other form value is ever handed to a pixel.

type Choice = "yes" | "no" | "ask";
type Fbq = ((...args: unknown[]) => void) & { queue: unknown[][]; loaded: boolean; version: string; push: Fbq; callMethod?: (...args: unknown[]) => void };
type Ttq = unknown[][] & { page: () => void; track: (event: string) => void };
type PixelWindow = Window & { fbq?: Fbq; _fbq?: Fbq; ttq?: Ttq; TiktokAnalyticsObject?: string };

const KEY = "kastr-ads-consent";
const CHANGED = "kastr-ads-consent-changed";

function read(): Choice {
  try {
    const stored = window.localStorage.getItem(KEY);
    return stored === "yes" || stored === "no" ? stored : "ask";
  } catch {
    // Storage blocked: never ask on every page, never load.
    return "no";
  }
}

function write(choice: "yes" | "no") {
  try {
    window.localStorage.setItem(KEY, choice);
  } catch {
    // Nothing to keep: the answer holds for this page only.
  }
  window.dispatchEvent(new Event(CHANGED));
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGED, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CHANGED, onChange);
    window.removeEventListener("storage", onChange);
  };
}

function script(src: string) {
  const tag = document.createElement("script");
  tag.async = true;
  tag.src = src;
  document.head.appendChild(tag);
}

/** The stub each vendor documents: calls queue up until its script arrives. */
function loadMeta(id: string) {
  const w = window as PixelWindow;
  if (w.fbq) return;
  const fbq = function (...args: unknown[]) {
    if (fbq.callMethod) fbq.callMethod(...args);
    else fbq.queue.push(args);
  } as Fbq;
  fbq.push = fbq;
  fbq.loaded = true;
  fbq.version = "2.0";
  fbq.queue = [];
  w.fbq = fbq;
  w._fbq = fbq;
  script("https://connect.facebook.net/en_US/fbevents.js");
  fbq("init", id);
}

function loadTikTok(id: string) {
  const w = window as PixelWindow;
  if (w.ttq) return;
  w.TiktokAnalyticsObject = "ttq";
  const ttq = [] as unknown as Ttq;
  for (const method of ["page", "track"] as const) {
    (ttq as unknown as Record<string, unknown>)[method] = (...args: unknown[]) => ttq.push([method, ...args]);
  }
  Object.assign(ttq, { _i: { [id]: Object.assign([], { _u: "https://analytics.tiktok.com/i18n/pixel/events.js" }) }, _t: { [id]: Date.now() }, _o: { [id]: {} } });
  w.ttq = ttq;
  script(`https://analytics.tiktok.com/i18n/pixel/events.js?sdkid=${encodeURIComponent(id)}&lib=ttq`);
}

/** The early access form went through. Does nothing unless a pixel is loaded. */
export function trackLead() {
  const w = window as PixelWindow;
  w.fbq?.("track", "Lead");
  w.ttq?.track("SubmitForm");
}

export function AdPixels({ d, locale }: { d: Dictionary; locale: string }) {
  const choice = useSyncExternalStore<Choice>(subscribe, read, () => "no");
  const path = usePathname();

  useEffect(() => {
    if (!hasPixels || choice !== "yes") return;
    if (config.pixels.meta) loadMeta(config.pixels.meta);
    if (config.pixels.tiktok) loadTikTok(config.pixels.tiktok);
    const w = window as PixelWindow;
    w.fbq?.("track", "PageView");
    w.ttq?.page();
  }, [choice, path]);

  if (!hasPixels || choice !== "ask") return null;

  return (
    <div
      role="region"
      aria-label={d.consent.label}
      className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-xl rounded-2xl border border-line bg-surface p-4 shadow-lg sm:inset-x-auto sm:right-5 sm:bottom-5"
    >
      <p className="text-sm leading-relaxed text-muted">
        {d.consent.text}{" "}
        <a className="underline decoration-line underline-offset-2 hover:text-ink" href={`/${locale}/privacy#website`}>
          {d.consent.more}
        </a>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => write("no")}
          className="h-10 flex-1 rounded-lg border border-line text-sm font-semibold text-ink hover:border-ink/50"
        >
          {d.consent.decline}
        </button>
        <button type="button" onClick={() => write("yes")} className="h-10 flex-1 rounded-lg bg-ink text-sm font-semibold text-carbon">
          {d.consent.accept}
        </button>
      </div>
    </div>
  );
}
