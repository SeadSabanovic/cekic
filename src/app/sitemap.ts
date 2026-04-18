import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.VERCEL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

  const now = new Date();

  return [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1 },
    {
      url: new URL('/putokazi', baseUrl).toString(),
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
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
}
