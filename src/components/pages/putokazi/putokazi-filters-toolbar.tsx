'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
export type PutokaziFilterChip = {
  id: string;
  label: string;
};

type PutokaziFiltersToolbarProps = {
  items: PutokaziFilterChip[];
  /** Bazna putanja liste, npr. `/putokazi` ili `/projekti`. */
  pathnameBase?: string;
};

function hrefForFilter(id: string, pathnameBase: string) {
  if (id === 'sve') return pathnameBase;
  const params = new URLSearchParams({ sekcija: id });
  return `${pathnameBase}?${params.toString()}`;
}

function isFilterActive(id: string, sekcija: string | null) {
  if (id === 'sve') return !sekcija || sekcija === 'sve';
  return sekcija === id;
}

export default function PutokaziFiltersToolbar({
  items,
  pathnameBase = '/putokazi',
}: PutokaziFiltersToolbarProps) {
  const searchParams = useSearchParams();
  const sekcija = searchParams.get('sekcija');

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
          const active = isFilterActive(item.id, sekcija);
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
