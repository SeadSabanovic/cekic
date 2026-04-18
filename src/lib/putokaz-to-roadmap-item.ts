import { MapPinned } from 'lucide-react';

import type { RoadmapItem } from '@/lib/home-roadmaps-data';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import type { PutokazListItem } from '@/sanity/lib/queries/putokaz-list';

/** Pretvara Sanity `putokaz` u oblik koji očekuje `RoadmapCard` (ikona i placeholder polja). */
export function putokazListItemToRoadmapItem(doc: PutokazListItem): RoadmapItem {
  const thumb = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 720, h: 400 }
  );

  return {
    id: doc.slug,
    title: doc.title,
    description:
      doc.lead?.trim() ||
      'Putokaz iz CMS-a; sadržaj koraka i detalja se dodaje u studiju.',
    category: 'uradi-sam',
    difficulty: 'pocetni',
    duration: '\u2014',
    icon: MapPinned,
    cover: thumb,
  };
}
