// A real app screenshot in an iPhone frame. Screens live in public/screens/ as <name>-dark.webp and,
// when the app has one, <name>-light.webp; the light one shows when the visitor's system is in light
// mode, like the app's "System" appearance. Source: the app's screenshot workflow (DiecastScreens),
// exported at 660 px wide. Never use a screen that shows a brand logo (CLAUDE.md §9).

const SIZE = { width: 660, height: 1434 };

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
          {light && <source srcSet={`/screens/${name}-light.webp`} media="(prefers-color-scheme: light)" />}
          <img
            src={`/screens/${name}-dark.webp`}
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
