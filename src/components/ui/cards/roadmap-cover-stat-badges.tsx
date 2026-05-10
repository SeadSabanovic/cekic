import { Clock3, Wallet } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type RoadmapCoverStatBadgesProps = {
  zarada: string;
  vrijeme: string;
  className?: string;
};

/**
 * Zarada + vrijeme kao overlay donji lijevi kut naslovne slike (karusel / lista putokaza).
 */
export function RoadmapCoverStatBadges({
  zarada,
  vrijeme,
  className,
}: RoadmapCoverStatBadgesProps) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-1 h-28 rounded-b-2xl bg-linear-to-t from-black/45 via-black/20 to-transparent"
        aria-hidden
      />
      <div
        className={cn(
          'pointer-events-none absolute bottom-3 left-3 z-10 flex max-w-[calc(100%-1.5rem)] flex-wrap gap-1 sm:bottom-3.5 sm:left-3.5 sm:gap-1.5',
          className
        )}
        role="group"
        aria-label="Zarada i vrijeme do samostalne zarade"
      >
        <Badge
          variant="outline"
          title={`Zarada: ${zarada}`}
          className="h-auto min-h-6 min-w-0 border-green-300/30 bg-green-300/10 text-green-300 shadow-sm backdrop-blur-sm"
        >
          <Wallet className="shrink-0" aria-hidden />
          <span className="min-w-0 truncate">{zarada}</span>
        </Badge>
        <Badge
          variant="outline"
          title={`Vrijeme: ${vrijeme}`}
          className="h-auto min-h-6 min-w-0 border-yellow-300/30 bg-yellow-300/10 text-yellow-300 shadow-sm backdrop-blur-sm"
        >
          <Clock3 className="shrink-0" aria-hidden />
          <span className="min-w-0 truncate">{vrijeme}</span>
        </Badge>
      </div>
    </>
  );
}
