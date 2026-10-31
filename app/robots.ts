export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search and AI crawlers are welcome: being cited by answer engines is part of the plan (GEO).
    rules: [{ userAgent: "*", allow: "/" }],
    sitemap: `${config.siteUrl}/sitemap.xml`,
    host: config.siteUrl,
  };
}
