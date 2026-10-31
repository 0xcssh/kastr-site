import type { Metadata } from "next";
import { Barlow_Condensed, Geist } from "next/font/google";
import Link from "next/link";
import { config } from "@/lib/config";
import { en } from "@/lib/dictionaries/en";
import { fr } from "@/lib/dictionaries/fr";
import "./globals.css";

// 404 for URLs that match no route (the root layout lives under [locale], so it cannot be used here).
const barlow = Barlow_Condensed({ subsets: ["latin"], weight: ["900"], style: ["italic"], variable: "--font-barlow" });
const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });

export const metadata: Metadata = {
  metadataBase: new URL(config.siteUrl),
  title: "404 · Kastr",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${barlow.variable} ${geist.variable}`}>
      <body className="min-h-dvh">
        <main className="mx-auto flex min-h-dvh max-w-3xl flex-col justify-center px-5 sm:px-8">
          <h1 className="font-display text-6xl font-black uppercase italic leading-none tracking-tight text-ink">
            {en.notFound.title}
          </h1>
          <p className="mt-5 text-lg text-muted">{en.notFound.body}</p>
          <p lang="fr" className="mt-2 text-muted">
            {fr.notFound.body}
          </p>
          <div className="mt-8 flex gap-3">
            <Link href="/en" className="rounded-xl bg-accent px-5 py-3 font-semibold text-carbon">
              {en.notFound.home}
            </Link>
            <Link href="/fr" lang="fr" className="rounded-xl border border-line px-5 py-3 font-semibold text-ink">
              {fr.notFound.home}
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
