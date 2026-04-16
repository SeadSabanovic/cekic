'use client';

import { Bookmark } from 'lucide-react';

import { Button } from '@/components/ui/button';

type RoadmapBookmarkButtonProps = {
  mapTitle: string;
};

/** Klijentski dio — server komponenta ne smije proslijediti onClick u Button. */
export function RoadmapBookmarkButton({ mapTitle }: RoadmapBookmarkButtonProps) {
  return (
    <Button
      type="button"
      variant="ghost"
      size="icon-sm"
      className="pointer-events-auto absolute top-2 right-2 z-[2] text-muted-foreground hover:text-primary"
      aria-label={`Sačuvaj mapu u omiljene: ${mapTitle}`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
    >
      <Bookmark className="size-4 stroke-[1.5]" />
    </Button>
  );
}
