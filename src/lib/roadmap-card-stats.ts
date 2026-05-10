import type { RoadmapCardStats } from '@/lib/home-roadmaps-data';
import type { EarningsByRegion, RoadmapHubStats } from '@/sanity/lib/queries/roadmap';

import {
  isEarningsByRegionComplete,
  normalizeEarningsByRegion,
} from '@/lib/hub-earnings-range';

function formatEuroShort(n: number): string {
  if (n >= 1000) {
    const k = n / 1000;
    const s =
      k % 1 === 0
        ? String(Math.round(k))
        : k.toLocaleString('de-DE', { maximumFractionDigits: 1 });
    return `€${s}k`;
  }
  return `€${n.toLocaleString('de-DE')}`;
}

/** Jednolinijski tekst za minikarticu „Zarada”: apsolutni min–max preko oba regiona. */
export function earningsToCardBadgeLine(
  earnings?: EarningsByRegion | null
): string {
  const n = normalizeEarningsByRegion(earnings);
  if (!isEarningsByRegionComplete(n)) return '--';
  const absMin = Math.min(n.balkanMin, n.euMin);
  const absMax = Math.max(n.balkanMax, n.euMax);
  return `${formatEuroShort(absMin)} – ${formatEuroShort(absMax)}`;
}

/** Normalizuje CMS stats u tekst za minikartice (`--` ako je prazno). */
export function toRoadmapCardStats(
  stats?: RoadmapHubStats | null
): RoadmapCardStats {
  return {
    zarada: earningsToCardBadgeLine(stats?.earningsByRegion),
    vrijeme: stats?.vrijeme?.trim() || '--',
    potraznja: stats?.potraznja?.trim() || '--',
  };
}
