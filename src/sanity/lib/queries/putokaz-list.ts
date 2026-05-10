import { groq } from 'next-sanity';

import type { PutokaziTradeKategorija } from '@/lib/putokazi-trade-categories';
import { client } from '@/sanity/lib/client';
import type { RoadmapHubStats } from '@/sanity/lib/queries/roadmap';

export type PutokaziListTradeFilter = 'sve' | PutokaziTradeKategorija;

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

const tradeCardProjection = groq`{
  _id,
  title,
  "slug": slug.current,
  kategorija,
  lead,
  locked,
  stats ${statsProjection},
  coverImage {
    asset,
    alt,
    hotspot,
    crop
  }
}`;

const publishedPutokazFilter = groq`
  _type == "putokaz"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

const publishedProjekatFilter = groq`
  _type == "projekat"
  && defined(slug.current)
  && !(_id in path("drafts.**"))
`;

/** Filter po kategoriji na listi: „sve” ili prazno = svi; inače samo `kategorija == trade`. */
const tradeListFilter = groq`
  (!defined($trade) || $trade == "" || $trade == "sve" || kategorija == $trade)
`;

const putokaziListQuery = groq`
  *[${publishedPutokazFilter} && ${tradeListFilter}] | order(title asc) ${tradeCardProjection}
`;

const projektiListQuery = groq`
  *[${publishedProjekatFilter} && ${tradeListFilter}] | order(title asc) ${tradeCardProjection}
`;

const putokazBySlugQuery = groq`
  *[${publishedPutokazFilter} && slug.current == $slug][0] ${tradeCardProjection}
`;

const projekatBySlugQuery = groq`
  *[${publishedProjekatFilter} && slug.current == $slug][0] ${tradeCardProjection}
`;

const putokaziSlugsQuery = groq`
  *[${publishedPutokazFilter}].slug.current
`;

const projektiSlugsQuery = groq`
  *[${publishedProjekatFilter}].slug.current
`;

export type TradeCardListItem = {
  _id: string;
  title: string;
  slug: string;
  kategorija?: PutokaziTradeKategorija | null;
  lead: string | null;
  locked?: boolean | null;
  stats?: RoadmapHubStats | null;
  coverImage?: {
    asset?: { _ref: string } | null;
    alt?: string | null;
    hotspot?: unknown;
    crop?: unknown;
  } | null;
};

/** @deprecated Koristi `TradeCardListItem`. */
export type PutokazListItem = TradeCardListItem;

export async function fetchPutokaziList(options?: {
  trade?: PutokaziListTradeFilter;
}): Promise<TradeCardListItem[]> {
  const trade = options?.trade ?? 'sve';
  return client.fetch(putokaziListQuery, { trade });
}

export async function fetchProjektiList(options?: {
  trade?: PutokaziListTradeFilter;
}): Promise<TradeCardListItem[]> {
  const trade = options?.trade ?? 'sve';
  return client.fetch(projektiListQuery, { trade });
}

export async function fetchPutokazBySlug(
  slug: string
): Promise<TradeCardListItem | null> {
  return client.fetch(putokazBySlugQuery, { slug });
}

export async function fetchProjekatBySlug(
  slug: string
): Promise<TradeCardListItem | null> {
  return client.fetch(projekatBySlugQuery, { slug });
}

export async function fetchPutokaziSlugs(): Promise<string[]> {
  return client.fetch(putokaziSlugsQuery);
}

export async function fetchProjektiSlugs(): Promise<string[]> {
  return client.fetch(projektiSlugsQuery);
}
