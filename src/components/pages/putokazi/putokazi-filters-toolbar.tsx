import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import type { PutokaziListTradeFilter } from '@/sanity/lib/queries/putokaz-list';

export type PutokaziFilterChip = {
  id: string;
  label: string;
};

type PutokaziFiltersToolbarProps = {
  items: PutokaziFilterChip[];
  /** Bazna putanja liste, npr. `/putokazi` ili `/projekti`. */
  pathnameBase?: string;
  /** Aktivni filter iz URL-a (`?sekcija=`), određen na serveru. */
  activeTrade: PutokaziListTradeFilter;
};

function hrefForFilter(id: string, pathnameBase: string) {
  if (id === 'sve') return pathnameBase;
  const params = new URLSearchParams({ sekcija: id });
  return `${pathnameBase}?${params.toString()}`;
}

function isFilterActive(id: string, activeTrade: PutokaziListTradeFilter) {
  if (id === 'sve') return activeTrade === 'sve';
  return activeTrade === id;
}

/** Server komponenta — bez `useSearchParams`, nema potrebe za `Suspense`. */
export default function PutokaziFiltersToolbar({
  items,
  pathnameBase = '/putokazi',
  activeTrade,
}: PutokaziFiltersToolbarProps) {
  return (
    <div
      className={cn(
        'relative z-20 overflow-x-auto border border-dashed px-4 py-3 md:px-10',
        'pattern-bg--2 backdrop-blur-md'
      )}
      role="navigation"
      aria-label="Filtriranje putokaza po kategoriji (zidovi, podovi, …)"
    >
      <ul className="relative z-20 flex w-max min-w-full items-center justify-start gap-2 lg:w-auto">
        {items.map((item) => {
          const active = isFilterActive(item.id, activeTrade);
          return (
            <li key={item.id} className="text-nowrap">
              <Button
                asChild
                variant={active ? 'default' : 'outline'}
                size="sm"
              >
                <Link
                  href={hrefForFilter(item.id, pathnameBase)}
                  scroll={false}
                  aria-current={active ? 'true' : undefined}
                >
                  {item.label}
                </Link>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
