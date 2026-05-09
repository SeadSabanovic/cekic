import type { RoadmapCardStats } from '@/lib/home-roadmaps-data';
import type { RoadmapHubStats } from '@/sanity/lib/queries/roadmap';

/** Normalizuje CMS stats u tekst za minikartice (`--` ako je prazno). */
export function toRoadmapCardStats(
  stats?: RoadmapHubStats | null
): RoadmapCardStats {
  return {
    zarada: stats?.zarada?.trim() || '--',
    vrijeme: stats?.vrijeme?.trim() || '--',
    potraznja: stats?.potraznja?.trim() || '--',
  };
}
