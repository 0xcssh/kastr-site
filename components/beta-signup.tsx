"use client";

import { useId, useState, type FormEvent } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { trackLead } from "./ad-pixels";

// Early access before the app is on the App Store: an email address and the phone the visitor owns.
// The Worker (/api/beta) hands the post to the app's beta-signup function, which sends the TestFlight
// link to iPhone owners and keeps everyone for the launch-day email. Shown in place of the App Store
// badge while lib/config.ts has no appStoreUrl.

type State = "idle" | "sending" | "done" | "error" | "slow";

export function BetaSignup({ d, locale }: { d: Dictionary; locale: string }) {
  const [email, setEmail] = useState("");
  const [platform, setPlatform] = useState<"ios" | "android">("ios");
  const [website, setWebsite] = useState("");
  const [state, setState] = useState<State>("idle");
  const copy = d.beta;
  // The form is on the page twice (hero and closing section).
  const field = useId();

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    try {
      const response = await fetch("/api/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, platform, locale, website }),
      });
      setState(response.ok ? "done" : response.status === 429 ? "slow" : "error");
      if (response.ok) trackLead();
    } catch {
      setState("error");
    }
  }

  if (state === "done") {
    return (
      <p role="status" className="max-w-md rounded-2xl border border-chrono/40 bg-surface px-5 py-4 text-base text-ink">
        {platform === "ios" ? copy.doneIphone : copy.doneAndroid}
      </p>
    );
  }

  const choice = (value: "ios" | "android", label: string) => (
    <button
      type="button"
      aria-pressed={platform === value}
      onClick={() => setPlatform(value)}
      className={`h-10 flex-1 rounded-lg text-sm font-semibold transition-colors ${
        platform === value ? "bg-ink text-carbon" : "text-muted hover:text-ink"
      }`}
    >
      {label}
    </button>
  );

  return (
    <form onSubmit={submit} data-beta-signup className="w-full max-w-md">
      <p className="font-display text-sm font-bold uppercase italic tracking-wide text-accent-ink">{copy.title}</p>
      <div role="group" aria-label={copy.platform} className="mt-3 flex gap-1 rounded-xl border border-line bg-surface p-1">
        {choice("ios", copy.iphone)}
        {choice("android", copy.android)}
      </div>
      <div className="mt-3 flex flex-col gap-3 sm:flex-row">
        <label className="sr-only" htmlFor={field}>
          {copy.email}
        </label>
        <input
          id={field}
          type="email"
          name="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder={copy.placeholder}
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="h-12 w-full min-w-0 shrink-0 rounded-xl sm:w-auto sm:flex-1 sm:shrink border border-line bg-surface px-4 text-base text-ink placeholder:text-faint focus:border-ink/50 focus:outline-none"
        />
        {/* A field people never see: whatever fills it is not a person. */}
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          value={website}
          onChange={(event) => setWebsite(event.target.value)}
          className="absolute -left-[9999px] h-0 w-0 opacity-0"
        />
        <button
          type="submit"
          disabled={state === "sending"}
          className="h-12 shrink-0 rounded-xl bg-accent px-5 text-base font-semibold text-white transition-transform duration-200 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98] disabled:opacity-60"
        >
          {state === "sending" ? copy.sending : copy.submit}
        </button>
      </div>
      <p className="mt-3 text-sm text-muted" role={state === "error" || state === "slow" ? "alert" : undefined}>
        {state === "error" ? copy.error : state === "slow" ? copy.slow : platform === "ios" ? copy.noteIphone : copy.noteAndroid}{" "}
        <a className="underline decoration-line underline-offset-2 hover:text-ink" href={`/${locale}/privacy#beta`}>
          {copy.privacy}
        </a>
      </p>
    </form>
  );
}
