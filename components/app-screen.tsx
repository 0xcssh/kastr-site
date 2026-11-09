// A real app screenshot in an iPhone frame. Screens live in public/screens/ as <name>-dark.webp and,
// when the app has one, <name>-light.webp; the light one shows when the visitor's system is in light
// mode, like the app's "System" appearance. Source: the app's screenshot workflow (DiecastScreens),
// exported at 660 px wide, plus a 330 px copy (<name>-<theme>-sm.webp) for small screens. Never use a screen that shows a brand logo (CLAUDE.md §9).

const SIZE = { width: 660, height: 1434 };
// The phone frames are 250 to 330 CSS px wide on every layout.
const SIZES = "(min-width: 1024px) 330px, 290px";

function srcSet(name: string, theme: "dark" | "light") {
  return `/screens/${name}-${theme}-sm.webp 330w, /screens/${name}-${theme}.webp 660w`;
}

export function AppScreen({
  name,
  alt,
  light = true,
  priority = false,
  className = "",
}: {
  name: string;
  alt: string;
  light?: boolean;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div className={`@container ${className}`}>
      <div className="relative rounded-[14cqw] bg-[linear-gradient(160deg,#3a3a42,#1c1c21)] p-[2.6cqw] shadow-[0_40px_120px_-30px_rgba(0,0,0,0.75)] ring-1 ring-white/10">
        <picture>
          {light && <source srcSet={srcSet(name, "light")} sizes={SIZES} media="(prefers-color-scheme: light)" />}
          <img
            src={`/screens/${name}-dark.webp`}
            srcSet={srcSet(name, "dark")}
            sizes={SIZES}
            alt={alt}
            width={SIZE.width}
            height={SIZE.height}
            loading={priority ? "eager" : "lazy"}
            fetchPriority={priority ? "high" : "auto"}
            decoding="async"
            className="block h-auto w-full rounded-[11.4cqw]"
          />
        </picture>
      </div>
    </div>
  );
}
