import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';

export type FreeformColumn = {
  id: string;
  spacing?: 'small' | 'medium' | 'large';
  alignment?: 'left' | 'center' | 'right';
  children: ReactNode;
};

export type FreeformBlockProps = {
  anchorId?: string;
  border?: 'none' | 'topBottom' | 'top' | 'bottom';
  columnsPerRow?: 2 | 3 | 4;
  columns: FreeformColumn[];
};

export default function FreeformBlock(props: FreeformBlockProps) {
  const { columnsPerRow, columns, border, anchorId } = props;

  return (
    <section {...(anchorId ? { id: anchorId } : {})} className="px-4 md:px-10">
      <Container
        className={cn('border-x border-dashed py-16 md:py-28', {
          'border-y': border === 'topBottom',
          'border-t': border === 'top',
          'border-b': border === 'bottom',
        })}
      >
        <div
          className={cn('grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-8', {
            'md:grid-cols-3': columnsPerRow === 3,
            'md:grid-cols-4': columnsPerRow === 4,
          })}
        >
          {columns.map((column) => (
            <div
              key={column.id}
              className={cn('flex flex-col items-start justify-center gap-0', {
                'gap-2': column.spacing === 'small',
                'gap-3': column.spacing === 'medium',
                'gap-4': column.spacing === 'large',
                'items-center': column.alignment === 'center',
                'items-end': column.alignment === 'right',
              })}
            >
              {column.children}
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function FreeformHeading({
  tag = 'h2',
  size = 'lg',
  children,
}: {
  tag?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  size?: React.ComponentProps<typeof Heading>['size'];
  children: ReactNode;
}) {
  return (
    <Heading tag={tag} size={size}>
      {children}
    </Heading>
  );
}

export function FreeformSpacer({
  size = 'medium',
}: {
  size?: 'small' | 'medium' | 'large';
}) {
  return (
    <div
      className={cn('h-0', {
        'h-4': size === 'small',
        'h-6': size === 'medium',
        'h-8': size === 'large',
      })}
    />
  );
}

export function FreeformRichText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn('text-balance', className)}>{children}</div>;
}

export function FreeformImage({
  src,
  alt,
  aspect = 'square',
}: {
  src: string;
  alt: string;
  aspect?: 'square' | 'rectangle' | 'portrait';
}) {
  return (
    <div className="pattern-bg--2 rounded-3xl border border-dashed p-3">
      <Image
        src={src}
        width={800}
        height={800}
        alt={alt}
        className={cn('rounded-2xl object-cover', {
          'aspect-square': aspect === 'square',
          'aspect-3/2': aspect === 'rectangle',
          'aspect-3/4': aspect === 'portrait',
        })}
      />
    </div>
  );
}

export function FreeformButton({
  href,
  children,
  variant = 'default',
  size = 'sm',
}: {
  href: string;
  children: ReactNode;
  variant?: VariantProps<typeof buttonVariants>['variant'];
  size?: VariantProps<typeof buttonVariants>['size'];
}) {
  return (
    <Link href={href} className={buttonVariants({ variant, size })}>
      {children}
    </Link>
  );
}
