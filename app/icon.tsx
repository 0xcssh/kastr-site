export const dynamic = "force-static";

import { ImageResponse } from "next/og";

// Favicon / logo (also used as Organization.logo). Replace with the real app icon once it exists
// (diecast/Diecast/Assets.xcassets/AppIcon is still empty).
export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#e10a1e",
          color: "#ffffff",
          fontSize: 380,
          fontWeight: 900,
          fontStyle: "italic",
          borderRadius: 112,
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
