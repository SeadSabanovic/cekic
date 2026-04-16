import { Bookmark } from 'lucide-react';
import Link from 'next/link';

import { cn } from '@/lib/utils';
import {
  difficultyLabel,
  type RoadmapItem,
} from '@/lib/home-roadmaps-data';

interface RoadmapCardProps {
  map: RoadmapItem;
  className?: string;
}

export default function RoadmapCard({ map, className }: RoadmapCardProps) {
  const Icon = map.icon;

  return (
    <Link
      href={`/mape/${map.id}`}
      className={cn(
        'group relative flex flex-col rounded-xl border border-border/70 bg-background/80 p-5 shadow-sm transition-all duration-200',
        'hover:border-primary/45 hover:shadow-lg hover:shadow-primary/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className
      )}
    >
      <span
        className="absolute right-3 top-3 inline-flex rounded-md p-1.5 text-muted-foreground transition-colors group-hover:text-primary"
        aria-hidden
      >
        <Bookmark className="size-4 stroke-[1.5]" />
      </span>

      <div className="mb-4 inline-flex size-11 items-center justify-center rounded-lg border border-border/60 bg-muted/40 text-foreground transition-colors group-hover:border-primary/30 group-hover:bg-primary/5">
        <Icon className="size-5" aria-hidden />
      </div>

      <h3 className="pr-10 text-base font-semibold leading-snug tracking-tight text-foreground">
        {map.title}
      </h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
        {map.description}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
        <span className="rounded-md border border-border/60 bg-muted/30 px-2 py-0.5 font-medium text-foreground/90">
          {difficultyLabel[map.difficulty]}
        </span>
        <span className="text-muted-foreground/90">{map.duration}</span>
      </div>
    </Link>
  );
}
