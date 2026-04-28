import type { PortableTextBlock } from '@portabletext/types';
import { groq } from 'next-sanity';

import { client } from '@/sanity/lib/client';

const publishedRoadmap = groq`
  _type == "roadmap"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

export type RoadmapSectionPortable = PortableTextBlock[];

export type RoadmapSectionQuery = {
  _key: string;
  title: string;
  slug: string;
  lead: string | null;
  body: RoadmapSectionPortable | null;
};

export type RoadmapHubQuery = {
  _id: string;
  title: string;
  slug: string;
  lead: string | null;
  sections: RoadmapSectionQuery[];
};

const roadmapBySlugQuery = groq`
  *[${publishedRoadmap} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    lead,
    sections[]{
      _key,
      title,
      "slug": slug.current,
      lead,
      body
    }
  }
`;

export async function fetchRoadmapHubBySlug(
  slug: string
): Promise<RoadmapHubQuery | null> {
  return client.fetch(roadmapBySlugQuery, { slug });
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
};

const roadmapHubsListQuery = groq`
  *[${publishedRoadmap}] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    lead
  }
`;

export async function fetchRoadmapHubSummaries(): Promise<RoadmapHubSummary[]> {
  return client.fetch(roadmapHubsListQuery);
}
