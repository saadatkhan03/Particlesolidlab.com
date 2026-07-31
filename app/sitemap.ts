import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const siteUrl = "https://www.particlesolidlab.com";
const lastModified = new Date("2026-07-31");

const routes = [
  { path: "", priority: 1, changeFrequency: "monthly" },
  { path: "/research", priority: 0.9, changeFrequency: "monthly" },
  { path: "/publications", priority: 0.9, changeFrequency: "monthly" },
  { path: "/software", priority: 0.8, changeFrequency: "monthly" },
  { path: "/about", priority: 0.8, changeFrequency: "yearly" },
  { path: "/contact", priority: 0.7, changeFrequency: "yearly" },
  { path: "/electron-transport", priority: 0.8, changeFrequency: "yearly" },
  { path: "/geometry", priority: 0.8, changeFrequency: "yearly" },
  { path: "/uncertainty", priority: 0.8, changeFrequency: "yearly" },
  { path: "/fenial", priority: 0.8, changeFrequency: "yearly" },
  { path: "/im3d", priority: 0.8, changeFrequency: "yearly" },
  { path: "/mentoring", priority: 0.5, changeFrequency: "yearly" },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${siteUrl}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));
}
