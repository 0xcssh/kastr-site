export const dynamic = "force-static";

import { ImageResponse } from "next/og";
import { getDict } from "@/lib/dictionaries";
import { isLocale, locales } from "@/lib/i18n";

// Default Open Graph / Twitter image (1200x630) for every page of a locale.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Kastr";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const d = getDict(isLocale(locale) ? locale : "en");
  const squares = Array.from({ length: 36 }, (_, i) => i);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#0b0b0e",
          color: "#f4f4f5",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", top: 0, right: 0, display: "flex", flexWrap: "wrap", width: 240, opacity: 0.08 }}>
          {squares.map((i) => (
            <div
              key={i}
              style={{ width: 40, height: 40, background: (Math.floor(i / 6) + i) % 2 === 0 ? "#ffffff" : "#0b0b0e" }}
            />
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, transform: "skewX(-10deg)" }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
            <div style={{ display: "flex", width: 40, height: 6, borderRadius: 3, background: "#e10a1e" }} />
            <div style={{ display: "flex", width: 27, height: 6, borderRadius: 3, background: "#e10a1e" }} />
            <div style={{ display: "flex", width: 16, height: 6, borderRadius: 3, background: "#e10a1e" }} />
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 900, letterSpacing: 2 }}>KASTR</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 92, fontWeight: 900, lineHeight: 1, letterSpacing: -3, textTransform: "uppercase" }}>
            {d.hero.title}
          </div>
          <div style={{ marginTop: 28, fontSize: 34, color: "#a1a1aa", maxWidth: 960, lineHeight: 1.3 }}>
            {d.hero.subtitle}
          </div>
        </div>
        <div style={{ display: "flex", height: 10, width: 220, background: "#e10a1e" }} />
      </div>
    ),
    { ...size },
  );
}
