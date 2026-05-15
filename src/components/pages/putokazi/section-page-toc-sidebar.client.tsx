'use client';

import { useCallback, useEffect, useState } from 'react';

import AnimatedUnderline from '@/components/shared/animated-underline';
import type { PortableTextHeading } from '@/lib/portable-text-headings';
import { cn } from '@/lib/utils';

const tocLinkClassName =
  'group relative text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:text-sm';

type SectionPageTocSidebarProps = {
  className?: string;
  headings: PortableTextHeading[];
  intro?: string;
};

function readLineY(): number {
  return Math.min(200, Math.round(window.innerHeight * 0.28));
}

function resolveActiveHeadingId(
  headings: PortableTextHeading[]
): string | null {
  if (headings.length === 0) return null;
  const line = readLineY();
  let active: string | null = null;
  for (const { id } of headings) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) active = id;
  }
  return active ?? headings[0]!.id;
}

export function SectionPageTocSidebar({
  className,
  headings,
}: SectionPageTocSidebarProps) {
  const [activeId, setActiveId] = useState<string | null>(
    headings[0]?.id ?? null
  );

  const updateActive = useCallback(() => {
    setActiveId(resolveActiveHeadingId(headings));
  }, [headings]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      updateActive();
    });
    window.addEventListener('scroll', updateActive, { passive: true });
    window.addEventListener('resize', updateActive);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', updateActive);
      window.removeEventListener('resize', updateActive);
    };
  }, [updateActive]);

  if (headings.length === 0) return null;

  return (
    <aside className={cn('hidden lg:block', className)}>
      <nav className="sticky top-28 self-start" aria-label="Na stranici">
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase md:text-xs">
          Na stranici
        </p>
        <ul className="mt-3 space-y-2.5">
          {headings.map(({ id, title, level }) => {
            const active = activeId === id;
            return (
              <li
                key={id}
                className={cn(
                  level === 3 && 'ml-0.5 border-l border-border/50 pl-2.5'
                )}
              >
                <a
                  href={`#${id}`}
                  className={cn(
                    tocLinkClassName,
                    'inline-block max-w-full wrap-break-word',
                    level === 3 && 'py-0.5',
                    active && 'text-foreground'
                  )}
                  aria-current={active ? 'location' : undefined}
                >
                  {title}
                  <AnimatedUnderline active={active} />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
