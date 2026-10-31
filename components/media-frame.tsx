import Image from "next/image";
import { CarProfile } from "@phosphor-icons/react/dist/ssr";
import type { MediaSlot } from "@/lib/media";

// A photo frame with a fixed aspect ratio. Shows the real photo once lib/media.ts has a src,
// otherwise a quiet carbon panel with a checkered corner (decorative, hidden from screen readers).
export function MediaFrame({
  slot,
  alt,
  name,
  priority = false,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  slot: MediaSlot;
  alt: string;
  name: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}) {
  const ratio = { aspectRatio: `${slot.width} / ${slot.height}` };
  if (slot.src) {
    return (
      <div className={`relative overflow-hidden rounded-2xl bg-surface ${className}`} style={ratio}>
        <Image src={slot.src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      data-media-slot={name}
      aria-hidden="true"
      className={`relative overflow-hidden rounded-2xl border border-line bg-surface ${className}`}
      style={ratio}
    >
      <div className="checker absolute -right-10 -top-10 h-40 w-40 rotate-12 opacity-[0.07]" />
      <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_20%_100%,rgba(255,107,0,0.16),transparent_60%)]" />
      <CarProfile weight="duotone" className="absolute bottom-6 left-6 h-16 w-16 text-faint" />
    </div>
  );
}
