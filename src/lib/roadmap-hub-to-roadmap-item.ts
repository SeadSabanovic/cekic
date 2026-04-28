import { MapPinned } from 'lucide-react';

import type { RoadmapItem } from '@/lib/home-roadmaps-data';
import type { RoadmapHubSummary } from '@/sanity/lib/queries/roadmap';

/** Kartica na /putokazi — link vodi na hub rutu `/putokazi/{slug}`. */
export function roadmapHubSummaryToRoadmapItem(
  hub: RoadmapHubSummary
): RoadmapItem {
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
    tradeLabel: 'Hub',
    listSource: 'roadmapHub',
    cover: null,
  };
}
