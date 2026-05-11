'use client';

import { useCallback, useEffect, useState } from 'react';

import AnimatedUnderline from '@/components/shared/animated-underline';
import {
  HUB_PAGE_TOC_ENTRIES,
  type HubPageTocEntryId,
} from '@/components/pages/putokazi/hub-page-toc-data';
import { cn } from '@/lib/utils';

const tocLinkClassName =
  'group relative text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:text-sm';

export type HubPageTocRoadmapChapter = {
  id: string;
  title: string;
};

type HubPageTocSidebarProps = {
  className?: string;
  /** Poglavlja hub mape — sidra `#poglavlje-{slug}` na stranici. */
  roadmapChapters?: HubPageTocRoadmapChapter[];
};

function readLineY(): number {
  return Math.min(200, Math.round(window.innerHeight * 0.28));
}

function resolveActiveMainSectionId(): HubPageTocEntryId {
  const ids = HUB_PAGE_TOC_ENTRIES.map((e) => e.id);
  const line = readLineY();
  let active: HubPageTocEntryId = ids[0]!;
  for (const id of ids) {
    const el = document.getElementById(id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) active = id;
  }
  return active;
}

function resolveActiveChapterId(
  chapters: HubPageTocRoadmapChapter[]
): string | null {
  if (chapters.length === 0) return null;
  const line = readLineY();
  let active: string | null = null;
  for (const ch of chapters) {
    const el = document.getElementById(ch.id);
    if (!el) continue;
    if (el.getBoundingClientRect().top <= line) active = ch.id;
  }
  return active;
}

export function HubPageTocSidebar({
  className,
  roadmapChapters = [],
}: HubPageTocSidebarProps) {
  const [activeMainId, setActiveMainId] = useState<HubPageTocEntryId>(
    HUB_PAGE_TOC_ENTRIES[0]!.id
  );
  const [activeChapterId, setActiveChapterId] = useState<string | null>(null);

  const updateActive = useCallback(() => {
    const main = resolveActiveMainSectionId();
    setActiveMainId(main);
    if (main === 'karijerni-putokaz' && roadmapChapters.length > 0) {
      setActiveChapterId(resolveActiveChapterId(roadmapChapters));
    } else {
      setActiveChapterId(null);
    }
  }, [roadmapChapters]);

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

  return (
    <aside className={cn('hidden lg:block', className)}>
      <nav className="sticky top-28 self-start" aria-label="Na stranici">
        <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase md:text-xs">
          Na stranici
        </p>
        <ul className="mt-3 space-y-2.5">
          {HUB_PAGE_TOC_ENTRIES.map(({ id, href, label }) => {
            const active = activeMainId === id;
            const showChapters =
              id === 'karijerni-putokaz' && roadmapChapters.length > 0;
            const chapterStealsLocation =
              id === 'karijerni-putokaz' && activeChapterId != null;
            const mainAriaCurrent =
              active && !chapterStealsLocation ? 'location' : undefined;
            return (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    tocLinkClassName,
                    'inline-block max-w-full wrap-break-word',
                    active && 'text-foreground'
                  )}
                  aria-current={mainAriaCurrent}
                >
                  {label}
                  <AnimatedUnderline
                    active={active && !chapterStealsLocation}
                  />
                </a>
                {showChapters ? (
                  <ul
                    className="mt-1.5 ml-0.5 max-w-full space-y-1 border-l border-border/50 py-0.5 pl-2.5"
                    aria-label="Poglavlja"
                  >
                    {roadmapChapters.map((ch) => {
                      const subActive = activeChapterId === ch.id;
                      return (
                        <li key={ch.id}>
                          <a
                            href={`#${ch.id}`}
                            className={cn(
                              tocLinkClassName,
                              'inline-block w-fit max-w-full py-0.5 wrap-break-word',
                              subActive && 'text-foreground'
                            )}
                            aria-current={subActive ? 'location' : undefined}
                          >
                            {ch.title}
                            <AnimatedUnderline active={subActive} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : null}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
