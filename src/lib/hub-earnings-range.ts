import type { EarningsByRegion } from '@/sanity/lib/queries/roadmap';

export type CompleteEarningsByRegion = {
  balkanMin: number;
  balkanMax: number;
  euMin: number;
  euMax: number;
};

const DEFAULT = {
  balkanMin: 800,
  balkanMax: 3000,
  euMin: 1800,
  euMax: 5500,
} as const;

/** Sanity / JSON ponekad vrate broj kao string — normalizuj prije logike. */
export function toFinitePositive(n: unknown): number | null {
  if (typeof n === 'number' && Number.isFinite(n) && n > 0) return n;
  if (typeof n === 'string') {
    const t = n.trim().replace(/\s/g, '').replace(',', '.');
    if (t === '') return null;
    const parsed = Number(t);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

/** Čisti `earningsByRegion` nakon dohvata (npr. iz GROQ-a). */
export function normalizeEarningsByRegion(
  raw?: EarningsByRegion | null
): EarningsByRegion | null {
  if (!raw) return null;
  const balkanMin = toFinitePositive(raw.balkanMin);
  const balkanMax = toFinitePositive(raw.balkanMax);
  const euMin = toFinitePositive(raw.euMin);
  const euMax = toFinitePositive(raw.euMax);
  const scaleMax = toFinitePositive(raw.scaleMax);
  const out: EarningsByRegion = {};
  if (balkanMin != null) out.balkanMin = balkanMin;
  if (balkanMax != null) out.balkanMax = balkanMax;
  if (euMin != null) out.euMin = euMin;
  if (euMax != null) out.euMax = euMax;
  if (scaleMax != null) out.scaleMax = scaleMax;
  return Object.keys(out).length > 0 ? out : null;
}

function coalescePositive(n: unknown, fallback: number): number {
  return toFinitePositive(n) ?? fallback;
}

/** Sva četiri broja postavljena u CMS-u (bez fallbacka za badge / copy). */
export function isEarningsByRegionComplete(
  e?: EarningsByRegion | null
): e is CompleteEarningsByRegion {
  if (!e) return false;
  return (
    toFinitePositive(e.balkanMin) != null &&
    toFinitePositive(e.balkanMax) != null &&
    toFinitePositive(e.euMin) != null &&
    toFinitePositive(e.euMax) != null
  );
}

function defaultScaleMax(balkanMax: number, euMax: number): number {
  const hi = Math.max(balkanMax, euMax, 1);
  return Math.ceil(hi / 500) * 500 + 500;
}

/** Vrijednosti za grafikon; nedostajući brojevi padaju na ilustrativni default. */
export function resolveEarningsRangeForChart(e?: EarningsByRegion | null) {
  const normalized = normalizeEarningsByRegion(e);
  const balkanMin = coalescePositive(normalized?.balkanMin, DEFAULT.balkanMin);
  const balkanMax = coalescePositive(normalized?.balkanMax, DEFAULT.balkanMax);
  const euMin = coalescePositive(normalized?.euMin, DEFAULT.euMin);
  const euMax = coalescePositive(normalized?.euMax, DEFAULT.euMax);
  const scaleFromCms = toFinitePositive(normalized?.scaleMax);
  const scaleMax =
    scaleFromCms != null ? scaleFromCms : defaultScaleMax(balkanMax, euMax);

  return {
    balkan: { min: balkanMin, max: Math.max(balkanMin, balkanMax), label: 'Balkan' as const },
    eu: { min: euMin, max: Math.max(euMin, euMax), label: 'EU' as const },
    scaleMax,
    usesCmsValues: isEarningsByRegionComplete(normalized),
  };
}
