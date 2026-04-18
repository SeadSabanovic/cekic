import { groq } from 'next-sanity';

import { client } from '@/sanity/lib/client';

/** Samo objavljeni dokumenti (bez nacrta u `drafts.**`). */
const publishedPutokazFilter = groq`
  _type == "putokaz"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

const putokaziListQuery = groq`
  *[${publishedPutokazFilter}] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    lead,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    }
  }
`;

const putokazBySlugQuery = groq`
  *[${publishedPutokazFilter} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    lead,
    coverImage {
      asset,
      alt,
      hotspot,
      crop
    }
  }
`;

const putokaziSlugsQuery = groq`
  *[${publishedPutokazFilter}].slug.current
`;

export type PutokazListItem = {
  _id: string;
  title: string;
  slug: string;
  lead: string | null;
  coverImage?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
};

export async function fetchPutokaziList(): Promise<PutokazListItem[]> {
  return client.fetch(putokaziListQuery);
}

export async function fetchPutokazBySlug(
  slug: string
): Promise<PutokazListItem | null> {
  return client.fetch(putokazBySlugQuery, { slug });
}

export async function fetchPutokaziSlugs(): Promise<string[]> {
  return client.fetch(putokaziSlugsQuery);
}
