import AnimatedUnderline from '@/components/shared/animated-underline';
import { HUB_PAGE_TOC_ENTRIES } from '@/components/pages/putokazi/hub-page-toc-data';
import { cn } from '@/lib/utils';

import { HubPageTocSidebar } from '@/components/pages/putokazi/hub-page-toc-sidebar.client';

const tocLinkClassName =
  'group relative text-xs font-medium text-muted-foreground transition-colors hover:text-foreground md:text-sm';

/** Kompaktan TOC ispod heroa na užim ekranima. */
export function HubPageTocMobile({ className }: { className?: string }) {
  return (
    <nav
      className={cn(
        'flex flex-wrap gap-x-5 gap-y-2 border-b border-dashed border-border/80 pb-5 lg:hidden',
        className
      )}
      aria-label="Na stranici"
    >
      {HUB_PAGE_TOC_ENTRIES.map(({ href, label }) => (
        <a
          key={href}
          href={href}
          className={cn(tocLinkClassName, 'inline-block')}
        >
          {label}
          <AnimatedUnderline />
        </a>
      ))}
    </nav>
  );
}

export { HubPageTocSidebar };
