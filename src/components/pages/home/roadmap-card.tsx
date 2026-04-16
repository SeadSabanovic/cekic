import Link from 'next/link';

import { cn } from '@/lib/utils';
import { difficultyLabel, type RoadmapItem } from '@/lib/home-roadmaps-data';

import { RoadmapBookmarkButton } from './roadmap-bookmark-button';

interface RoadmapCardProps {
  map: RoadmapItem;
  /** Kada je false, karta nije klikabilna i izgleda onemogućeno (npr. izvan MVP opsega). */
  enabled?: boolean;
  className?: string;
}

export default function RoadmapCard({
  map,
  enabled = true,
  className,
}: RoadmapCardProps) {
  const Icon = map.icon;
  const titleId = `roadmap-title-${map.id}`;

  const shellClassName = cn(
    'group relative flex flex-col rounded-xl border p-5 transition-all duration-200 h-full',
    enabled
      ? ['border-border/70 bg-background/80', 'hover:border-primary/45']
      : [
          'cursor-not-allowed border-dashed border-muted-foreground/30 bg-muted/40 opacity-[0.72] saturate-[0.65]',
          'select-none',
        ],
    className
  );

  const body = (
    <>
      <div
        className={cn(
          'mb-4 inline-flex size-11 items-center justify-center rounded-lg border text-foreground transition-colors',
          enabled
            ? 'border-border/60 bg-muted/40 group-hover:border-primary/30 group-hover:bg-primary/5'
            : 'border-muted-foreground/20 bg-muted/50 text-muted-foreground'
        )}
      >
        <Icon className="size-5" aria-hidden />
      </div>

      <h3
        id={titleId}
        className={cn(
          'pr-10 text-base leading-snug font-semibold tracking-tight',
          enabled ? 'text-foreground' : 'text-foreground/80'
        )}
      >
        {map.title}
      </h3>
      <p
        className={cn(
          'mt-2 flex-1 text-sm leading-relaxed',
          enabled ? 'text-muted-foreground' : 'text-muted-foreground/85'
        )}
      >
        {map.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span
          className={cn(
            'rounded-md border px-2 py-0.5 font-medium',
            enabled
              ? 'border-border/60 bg-muted/30 text-foreground/90'
              : 'border-muted-foreground/25 bg-muted/40 text-foreground/70'
          )}
        >
          {difficultyLabel[map.difficulty]}
        </span>
        <span
          className={
            enabled ? 'text-muted-foreground/90' : 'text-muted-foreground/70'
          }
        >
          {map.duration}
        </span>
      </div>
    </>
  );

  if (!enabled) {
    return (
      <div
        className={shellClassName}
        aria-disabled="true"
        aria-label={`${map.title} — uskoro dostupno`}
      >
        <div className="pointer-events-none relative z-[1]">{body}</div>
        <span
          className="absolute top-2 right-2 z-[2] rounded-md border border-border/80 bg-background/95 px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase shadow-sm"
          aria-hidden
        >
          Uskoro
        </span>
      </div>
    );
  }

  return (
    <div className={shellClassName}>
      <Link
        href={`/mape/${map.id}`}
        className="absolute inset-0 z-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-labelledby={titleId}
      />
      <div className="pointer-events-none relative z-[1]">{body}</div>
      <RoadmapBookmarkButton mapTitle={map.title} />
    </div>
  );
}
