export const dynamic = "force-static";

import { ImageResponse } from "next/og";

// Home-screen icon for Safari bookmarks. Replace with the real app icon once it exists.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#ff6b00",
          color: "#0d0d0f",
          fontSize: 132,
          fontWeight: 900,
          fontStyle: "italic",
        }}
      >
        K
      </div>
    ),
    { ...size },
  );
}
