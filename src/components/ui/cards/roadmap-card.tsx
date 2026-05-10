import Image from 'next/image';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { difficultyLabel, type RoadmapItem } from '@/lib/home-roadmaps-data';

import { RoadmapBookmarkButton } from './roadmap-bookmark-button';
import { RoadmapCoverStatBadges } from './roadmap-cover-stat-badges';

export type RoadmapCardProps = {
  map: RoadmapItem;
  /** Ako je zadano, link vodi ovdje (npr. `/putokazi/krecenje`). Inače `/mape/{id}`. */
  detailHref?: string;
  /** Kada je false, karta nije klikabilna i izgleda onemogućeno (npr. izvan MVP opsega). */
  enabled?: boolean;
  className?: string;
  /**
   * `putokazi` — kao karusel: slika 5/4, zarada/vrijeme na slici, ispod naslov.
   * `projekti` — isti raspored slike i naslova, bez stat badgeva (projekti nemaju zaradu/vrijeme).
   */
  variant?: 'default' | 'putokazi' | 'projekti';
};

/**
 * Kartica putokaza / mape — kanonska implementacija u `ui/cards`.
 * Na početnoj se trenutno uvozi preko tankog re-exporta u `pages/home`.
 */
export default function RoadmapCard({
  map,
  detailHref,
  enabled = true,
  className,
  variant = 'default',
}: RoadmapCardProps) {
  const Icon = map.icon;
  const titleId = `roadmap-title-${map.id}`;
  const href = detailHref ?? `/mape/${map.id}`;
  const locked = !enabled;

  if (variant === 'putokazi' || variant === 'projekti') {
    const showCoverStatBadges = variant === 'putokazi';
    const cardMedia = (
      <div className="relative aspect-5/4 w-full shrink-0 overflow-hidden rounded-2xl bg-muted/30">
        {map.cover?.url ? (
          <Image
            src={map.cover.url}
            alt={map.cover.alt}
            fill
            className={cn(
              'absolute inset-0 size-full rounded-2xl object-cover transition-transform duration-500',
              !locked && 'group-hover:scale-[1.03]',
              locked && 'opacity-60'
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-b from-muted/80 to-muted">
            <Icon className="size-12 text-muted-foreground" />
          </div>
        )}
        {locked ? (
          <Badge
            className="pointer-events-none absolute top-3 left-3 z-20 h-auto min-h-6 min-w-0 backdrop-blur-sm"
            aria-hidden
          >
            USKORO
          </Badge>
        ) : null}
        {showCoverStatBadges ? (
          <RoadmapCoverStatBadges
            zarada={map.cardStats.zarada}
            vrijeme={map.cardStats.vrijeme}
          />
        ) : null}
      </div>
    );

    const cardFooter = (
      <div className="flex flex-1 flex-col justify-center p-4">
        <p
          id={titleId}
          className="line-clamp-3 text-lg font-semibold tracking-tight text-foreground"
        >
          {map.title}
        </p>
      </div>
    );

    return (
      <article
        className={cn(
          'flex h-full flex-col bg-background',
          locked && 'select-none',
          className
        )}
      >
        {locked ? (
          <div
            className="flex h-full min-h-0 flex-col rounded-2xl outline-none"
            aria-label={`${map.title} — uskoro dostupno`}
          >
            {cardMedia}
            {cardFooter}
          </div>
        ) : (
          <Link
            href={href}
            className="group flex h-full min-h-0 flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            aria-labelledby={titleId}
          >
            {cardMedia}
            {cardFooter}
          </Link>
        )}
      </article>
    );
  }

  const shellClassName = cn(
    'group relative flex h-full flex-col rounded-xl border p-5 transition-all duration-200',
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
      {map.cover?.url ? (
        <div className="relative mb-4 aspect-16/10 w-full overflow-hidden rounded-lg border border-border/50">
          <Image
            src={map.cover.url}
            alt={map.cover.alt}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        </div>
      ) : (
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
      )}

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
        {map.tradeLabel ? (
          <span
            className={cn(
              'rounded-md border px-2 py-0.5 font-medium',
              enabled
                ? 'border-primary/25 bg-primary/5 text-foreground/90'
                : 'border-muted-foreground/25 bg-muted/40 text-foreground/70'
            )}
          >
            {map.tradeLabel}
          </span>
        ) : null}
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
        <div className="pointer-events-none relative z-1">{body}</div>
        <span
          className="absolute top-2 right-2 z-2 rounded-md border border-border/80 bg-background/95 px-2 py-1.5 text-[11px] font-semibold tracking-wide text-muted-foreground uppercase shadow-sm"
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
        href={href}
        className="absolute inset-0 z-0 rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        aria-labelledby={titleId}
      />
      <div className="pointer-events-none relative z-1">{body}</div>
      <RoadmapBookmarkButton mapTitle={map.title} />
    </div>
  );
}
