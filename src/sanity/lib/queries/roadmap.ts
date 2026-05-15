import type { PortableTextBlock } from '@portabletext/types';
import { groq } from 'next-sanity';

import { client } from '@/sanity/lib/client';
import type { RoadmapSectionContentBlock } from '@/lib/roadmap-section-content';

const publishedRoadmap = groq`
  _type == "roadmap"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

export type EarningsByRegion = {
  balkanMin?: number | null;
  balkanMax?: number | null;
  euMin?: number | null;
  euMax?: number | null;
  scaleMax?: number | null;
};

export type RoadmapHubStats = {
  earningsByRegion?: EarningsByRegion | null;
  vrijeme: string | null;
  potraznja: string | null;
};

const statsProjection = groq`{
  vrijeme,
  potraznja,
  earningsByRegion {
    balkanMin,
    balkanMax,
    euMin,
    euMax,
    scaleMax
  }
}`;

export type RoadmapSectionQuery = {
  _key: string;
  title: string;
  slug: string;
  lead: string | null;
  content: RoadmapSectionContentBlock[] | null;
};

export type RoadmapHubQuery = {
  _id: string;
  title: string;
  slug: string;
  lead: string | null;
  aboutOccupation?: PortableTextBlock[] | null;
  coverImage?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  stats?: RoadmapHubStats | null;
  sections: RoadmapSectionQuery[];
};

const roadmapBySlugQuery = groq`
  *[${publishedRoadmap} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    lead,
    aboutOccupation,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },
    stats ${statsProjection},
    sections[]{
      _key,
      title,
      "slug": slug.current,
      lead,
      content[]{
        _key,
        _type,
        content,
        compact,
        image {
          asset,
          alt,
          hotspot,
          crop
        }
      }
    }
  }
`;

export async function fetchRoadmapHubBySlug(
  slug: string
): Promise<RoadmapHubQuery | null> {
  /** Bez API CDN-a — nakon izmjene u Studiju odmah vidiš nove min/max na hubu. */
  return client.fetch(roadmapBySlugQuery, { slug }, { useCdn: false });
}

const roadmapsForSitemapQuery = groq`
  *[${publishedRoadmap}]{
    "hub": slug.current,
    "sections": coalesce(sections[].slug.current, [])
  }
`;

export type RoadmapSitemapRow = {
  hub: string;
  sections: string[];
};

export async function fetchRoadmapsForSitemap(): Promise<RoadmapSitemapRow[]> {
  return client.fetch(roadmapsForSitemapQuery);
}

export type RoadmapHubSummary = {
  _id: string;
  title: string;
  slug: string;
  lead: string | null;
  locked?: boolean | null;
  aboutOccupation?: PortableTextBlock[] | null;
  coverImage?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
  stats?: RoadmapHubStats | null;
};

const roadmapHubsListQuery = groq`
  *[${publishedRoadmap}] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    lead,
    locked,
    aboutOccupation,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    },
    stats ${statsProjection}
  }
`;

export async function fetchRoadmapHubSummaries(): Promise<RoadmapHubSummary[]> {
  return client.fetch(roadmapHubsListQuery);
}
