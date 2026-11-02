export const dynamic = "force-static";

import type { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    // Search and AI crawlers are welcome: being cited by answer engines is part of the plan (GEO).
    rules: [{ userAgent: "*", allow: "/" }],
    // Collector pages (kastr.app/@username) are listed by the Worker, only once they have content.
    sitemap: [`${config.siteUrl}/sitemap.xml`, `${config.siteUrl}/sitemap-profiles.xml`],
    host: config.siteUrl,
  };
}
