import { groq } from 'next-sanity';

import type { PutokaziTradeKategorija } from '@/lib/putokazi-trade-categories';
import { client } from '@/sanity/lib/client';

export type PutokazSekcija = 'putokazi' | 'projekti';

export type PutokaziListTradeFilter = 'sve' | PutokaziTradeKategorija;

/** Samo objavljeni dokumenti (bez nacrta u `drafts.**`). */
const publishedPutokazFilter = groq`
  _type == "putokaz"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

const sekcijaFilter = groq`
  select(
    $sekcija == "putokazi" => !defined(sekcija) || sekcija == "putokazi",
    sekcija == $sekcija
  )
`;

/** Filter po `?sekcija=` na listi: „sve” ili prazno = svi; inače samo `kategorija == trade`. */
const tradeListFilter = groq`
  (!defined($trade) || $trade == "" || $trade == "sve" || kategorija == $trade)
`;

const putokaziListQuery = groq`
  *[${publishedPutokazFilter} && ${sekcijaFilter} && ${tradeListFilter}] | order(title asc) {
    _id,
    title,
    "slug": slug.current,
    sekcija,
    kategorija,
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
  *[${publishedPutokazFilter} && ${sekcijaFilter} && slug.current == $slug][0]{
    _id,
    title,
    "slug": slug.current,
    sekcija,
    kategorija,
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
  *[${publishedPutokazFilter} && ${sekcijaFilter}].slug.current
`;

export type PutokazListItem = {
  _id: string;
  title: string;
  slug: string;
  sekcija?: PutokazSekcija;
  kategorija?: PutokaziTradeKategorija | null;
  lead: string | null;
  coverImage?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
};

export async function fetchPutokaziList(
  sekcija: PutokazSekcija = 'putokazi',
  options?: { trade?: PutokaziListTradeFilter }
): Promise<PutokazListItem[]> {
  const trade = options?.trade ?? 'sve';
  return client.fetch(putokaziListQuery, { sekcija, trade });
}

export async function fetchPutokazBySlug(
  slug: string,
  sekcija: PutokazSekcija = 'putokazi'
): Promise<PutokazListItem | null> {
  return client.fetch(putokazBySlugQuery, { slug, sekcija });
}

export async function fetchPutokaziSlugs(
  sekcija: PutokazSekcija = 'putokazi'
): Promise<string[]> {
  return client.fetch(putokaziSlugsQuery, { sekcija });
}
