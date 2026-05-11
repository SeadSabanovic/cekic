import { MetadataRoute } from 'next';

import { fetchRoadmapsForSitemap } from '@/sanity/lib/queries/roadmap';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.VERCEL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const now = new Date();

  const staticEntries: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: new URL('/karijerni-putokazi', baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: new URL('/projekti', baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: new URL('/o-nama', baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: new URL('/kontakt', baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const roadmapEntries: MetadataRoute.Sitemap = [];
  try {
    const rows = await fetchRoadmapsForSitemap();
    for (const row of rows) {
      if (!row.hub) continue;
      roadmapEntries.push({
        url: new URL(`/karijerni-putokazi/${row.hub}`, baseUrl).toString(),
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.85,
      });
      for (const sec of row.sections) {
        if (!sec) continue;
        roadmapEntries.push({
          url: new URL(`/karijerni-putokazi/${row.hub}/${sec}`, baseUrl).toString(),
          lastModified: now,
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }
  } catch {
    // Bez mreže ili tokena — ostaje samo statički dio.
  }

  return [...staticEntries, ...roadmapEntries];
}
