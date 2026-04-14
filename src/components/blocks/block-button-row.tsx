import Link from 'next/link';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import type { VariantProps } from 'class-variance-authority';

export type BlockLinkItem = {
  label: string;
  href: string;
  variant?: VariantProps<typeof buttonVariants>['variant'];
};

type BlockButtonRowProps = {
  items: BlockLinkItem[];
  className?: string;
};

/** Red dugmadi kao linkova — samo UI, bez CMS-a. */
export function BlockButtonRow({ items, className }: BlockButtonRowProps) {
  if (!items.length) return null;
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      {items.map((item, i) => (
        <Link
          key={`${item.href}-${i}`}
          href={item.href}
          className={buttonVariants({
            variant: item.variant ?? 'default',
          })}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
