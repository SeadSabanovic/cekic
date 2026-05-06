import { MapPinned } from 'lucide-react';

import type { RoadmapItem } from '@/lib/home-roadmaps-data';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import type { RoadmapHubSummary } from '@/sanity/lib/queries/roadmap';

/** Kartica na /putokazi — link vodi na hub rutu `/putokazi/{slug}`. */
export function roadmapHubSummaryToRoadmapItem(
  hub: RoadmapHubSummary
): RoadmapItem {
  const thumb = resolvePutokazCover(
    { title: hub.title, coverImage: hub.coverImage },
    { w: 720, h: 400 }
  );

  return {
    id: hub.slug,
    title: hub.title,
    description:
      hub.lead?.trim() ||
      'Mapa puta s poglavljima — uredi naslov, uvod i poglavlja u studiju.',
    category: 'uradi-sam',
    difficulty: 'pocetni',
    duration: '\u2014',
    icon: MapPinned,
    tradeLabel: 'Zanat',
    listSource: 'roadmapHub',
    cover: thumb,
  };
}
