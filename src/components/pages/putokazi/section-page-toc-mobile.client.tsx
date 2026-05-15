'use client';

import { Fragment, useCallback, useEffect, useState } from 'react';

import AnimatedUnderline from '@/components/shared/animated-underline';
import type { PortableTextHeading } from '@/lib/portable-text-headings';
import { cn } from '@/lib/utils';

type SectionPageTocMobileProps = {
  className?: string;
  headings: PortableTextHeading[];
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

export function SectionPageTocMobile({
  className,
  headings,
}: SectionPageTocMobileProps) {
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
    <nav
      className={cn(
        'mb-8 border-b border-dashed border-border/80 pb-5 lg:hidden',
        className
      )}
      aria-label="Sadržaj poglavlja"
    >
      <p className="text-sm leading-relaxed text-pretty text-foreground md:text-base">
        <span>Na stranici: </span>
        {headings.map((heading, index) => {
          const active = activeId === heading.id;

          return (
            <Fragment key={heading.id}>
              <a
                href={`#${heading.id}`}
                className={cn(
                  'group relative inline font-medium text-muted-foreground transition-colors hover:text-foreground',
                  active && 'text-foreground'
                )}
                aria-current={active ? 'location' : undefined}
              >
                {index + 1}. {heading.title}
                <AnimatedUnderline active={active} />
              </a>{' '}
            </Fragment>
          );
        })}
      </p>
    </nav>
  );
}
