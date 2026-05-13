import { Wallet } from 'lucide-react';

import { resolveEarningsRangeForChart } from '@/lib/hub-earnings-range';
import { cn } from '@/lib/utils';
import type { EarningsByRegion } from '@/sanity/lib/queries/roadmap';

function formatEuro(value: number, plus = false) {
  const n = value.toLocaleString('de-DE');
  return `€${n}${plus ? '+' : ''}`;
}

function RangeRow({
  label,
  min,
  max,
  scaleMax,
}: {
  label: string;
  min: number;
  max: number;
  scaleMax: number;
}) {
  const leftPct = (min / scaleMax) * 100;
  const widthPct = ((max - min) / scaleMax) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
        <span className="font-medium tracking-wide text-foreground uppercase">
          {label}
        </span>
        <span className="tabular-nums">
          min {formatEuro(min)} · max {formatEuro(max, true)}
        </span>
      </div>
      <div
        className="relative h-2.5 w-full overflow-hidden rounded-full bg-accent/10"
        role="presentation"
        aria-hidden
      >
        <div
          className="absolute top-0 h-full rounded-full bg-accent"
          style={{
            left: `${leftPct}%`,
            width: `${widthPct}%`,
            minWidth: '4px',
          }}
        />
      </div>
    </div>
  );
}

type HubEarningsRangeChartProps = {
  className?: string;
  /** Podaci iz Sanity `stats.earningsByRegion`; prazno = ilustrativni default u grafikonu. */
  earningsByRegion?: EarningsByRegion | null;
};

export default function HubEarningsRangeChart({
  className,
  earningsByRegion,
}: HubEarningsRangeChartProps) {
  const { balkan, eu, scaleMax, usesCmsValues } =
    resolveEarningsRangeForChart(earningsByRegion);

  const ariaSummary = `Grafikon: ${balkan.label} od ${balkan.min} do ${balkan.max} eura, ${eu.label} od ${eu.min} do ${eu.max} eura, skala do ${scaleMax} eura`;

  return (
    <article
      className={cn(
        'rounded-xl border border-border/80 bg-background/60 p-5 md:p-6',
        usesCmsValues ? 'border-solid' : 'border-dashed',
        className
      )}
      aria-labelledby="hub-earnings-chart-title"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p
            id="hub-earnings-chart-title"
            className="text-xs font-medium tracking-wide text-muted-foreground uppercase"
          >
            Raspon zarade po regiji
          </p>
        </div>
        <span
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"
          aria-label="Zarada"
        >
          <Wallet className="size-4" aria-hidden />
        </span>
      </div>

      <div className="mt-6 space-y-6" role="img" aria-label={ariaSummary}>
        <RangeRow
          label={balkan.label}
          min={balkan.min}
          max={balkan.max}
          scaleMax={scaleMax}
        />
        <RangeRow
          label={eu.label}
          min={eu.min}
          max={eu.max}
          scaleMax={scaleMax}
        />
      </div>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 border-t border-dashed border-border/60 pt-4 text-[11px] tabular-nums">
        <span>Skala: 0 – {formatEuro(scaleMax)}</span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span>
          Balkan: {formatEuro(balkan.min)} – {formatEuro(balkan.max, true)}
        </span>
        <span className="hidden sm:inline" aria-hidden>
          ·
        </span>
        <span>
          EU: {formatEuro(eu.min)} – {formatEuro(eu.max, true)}
        </span>
      </div>
    </article>
  );
}
