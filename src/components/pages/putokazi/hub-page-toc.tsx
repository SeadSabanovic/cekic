import AnimatedUnderline from '@/components/shared/animated-underline';
import { cn } from '@/lib/utils';

const HUB_PAGE_SECTIONS = [
  { href: '#brzi-podaci', label: 'Brzi podaci' },
  { href: '#o-zanimanju', label: 'O zanimanju' },
  { href: '#karijerni-putokaz', label: 'Karijerni putokaz' },
] as const;

const tocLinkClassName =
  'group relative text-sm font-medium transition-colors md:text-base';

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
      {HUB_PAGE_SECTIONS.map(({ href, label }) => (
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

/** Sticky TOC desno (lg+). */
export function HubPageTocSidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('hidden lg:block', className)}>
      <nav className="sticky top-28 self-start" aria-label="Na stranici">
        <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
          Na stranici
        </p>
        <ul className="mt-3 space-y-2.5">
          {HUB_PAGE_SECTIONS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={cn(tocLinkClassName, 'inline-block')}>
                {label}
                <AnimatedUnderline />
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
