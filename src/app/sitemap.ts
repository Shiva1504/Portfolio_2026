import type { MetadataRoute } from "next";
import { getLastModified } from "@/lib/last-modified";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${SITE_URL}/`,
      lastModified: getLastModified(["src/app/page.tsx", "src/components/sections", "src/data"]),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/playground`,
      lastModified: getLastModified(["src/app/playground", "src/components/terminal", "src/data"]),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
