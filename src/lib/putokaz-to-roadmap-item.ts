import { MapPinned } from 'lucide-react';

import type { RoadmapItem } from '@/lib/home-roadmaps-data';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import {
  isPutokaziTradeKategorija,
  putokaziTradeCategoryLabels,
} from '@/lib/putokazi-trade-categories';
import type { PutokazListItem } from '@/sanity/lib/queries/putokaz-list';

/** Pretvara Sanity `putokaz` u oblik koji očekuje `RoadmapCard` (ikona i placeholder polja). */
export function putokazListItemToRoadmapItem(doc: PutokazListItem): RoadmapItem {
  const thumb = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 720, h: 400 }
  );

  const tradeLabel =
    doc.kategorija && isPutokaziTradeKategorija(doc.kategorija)
      ? putokaziTradeCategoryLabels[doc.kategorija]
      : null;

  return {
    listSource: 'putokaz',
    id: doc.slug,
    title: doc.title,
    description:
      doc.lead?.trim() ||
      'Putokaz iz CMS-a; sadržaj koraka i detalja se dodaje u studiju.',
    category: 'uradi-sam',
    difficulty: 'pocetni',
    duration: '\u2014',
    icon: MapPinned,
    tradeLabel,
    cover: thumb,
  };
}
