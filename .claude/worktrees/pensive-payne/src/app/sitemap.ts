import { cases } from "@/data/cases";
import type { MetadataRoute } from "next";

const siteUrl = "https://portfolio-cristiano-iota.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const casePages = cases.pt.map((c) => ({
    url: `${siteUrl}/case/${c.id}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...casePages,
  ];
}
