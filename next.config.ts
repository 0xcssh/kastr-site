import type { NextConfig } from "next";

// A fully static marketing site, exported to `out/` and served by a Cloudflare Worker
// (worker/index.ts). Locale redirects and security headers live in the Worker, because
// `redirects()` and `headers()` do not apply to a static export.
const nextConfig: NextConfig = {
  output: "export",
  poweredByHeader: false,
  experimental: {
    // The root layout lives under app/[locale], so unmatched URLs need app/global-not-found.tsx.
    globalNotFound: true,
  },
  turbopack: {
    // Pin the workspace root (a stray lockfile in the user folder confuses root detection).
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
