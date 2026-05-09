import { MapPinned } from 'lucide-react';

import type { RoadmapItem } from '@/lib/home-roadmaps-data';
import { toRoadmapCardStats } from '@/lib/roadmap-card-stats';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import {
  isPutokaziTradeKategorija,
  putokaziTradeCategoryLabels,
} from '@/lib/putokazi-trade-categories';
import type { TradeCardListItem } from '@/sanity/lib/queries/putokaz-list';

type TradeCardListSource = 'putokaz' | 'projekat';

function tradeCardToRoadmapItem(
  doc: TradeCardListItem,
  listSource: TradeCardListSource
): RoadmapItem {
  const thumb = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 720, h: 400 }
  );

  const tradeLabel =
    doc.kategorija && isPutokaziTradeKategorija(doc.kategorija)
      ? putokaziTradeCategoryLabels[doc.kategorija]
      : null;

  const placeholderLead =
    listSource === 'projekat'
      ? 'Projekt iz CMS-a; sadržaj koraka i detalja se dodaje u studiju.'
      : 'Putokaz iz CMS-a; sadržaj koraka i detalja se dodaje u studiju.';

  return {
    listSource,
    id: doc.slug,
    title: doc.title,
    locked: doc.locked === true,
    description: doc.lead?.trim() || placeholderLead,
    category: 'uradi-sam',
    difficulty: 'pocetni',
    duration: '\u2014',
    icon: MapPinned,
    tradeLabel,
    cover: thumb,
    cardStats: toRoadmapCardStats(doc.stats),
  };
}

/** Kartica za listu putokaza (`/putokazi`). */
export function putokazListItemToRoadmapItem(doc: TradeCardListItem): RoadmapItem {
  return tradeCardToRoadmapItem(doc, 'putokaz');
}

/** Kartica za listu projekata (`/projekti`). */
export function projekatListItemToRoadmapItem(doc: TradeCardListItem): RoadmapItem {
  return tradeCardToRoadmapItem(doc, 'projekat');
}
