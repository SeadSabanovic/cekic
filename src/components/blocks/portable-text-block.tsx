import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';

export type PortableTextBlockProps = {
  anchorId?: string;
  alignment?: 'left' | 'center' | 'right';
  children: ReactNode;
};

/** Sekcija za tekst / sadržaj — proizvoljan `children` (npr. paragrafi, lista), bez Portable Text paketa. */
export default function PortableTextBlock(props: PortableTextBlockProps) {
  const { children, alignment, anchorId } = props;

  return (
    <section {...(anchorId ? { id: anchorId } : {})} className="px-4 md:px-10">
      <Container
        className={cn('flex border-x border-dashed py-16 md:py-28', {
          'justify-start': alignment === 'left',
          'justify-center': alignment === 'center' || !alignment,
          'justify-end': alignment === 'right',
        })}
      >
        <div
          className={cn('max-w-3xl text-balance text-gray-600', {
            'border-l border-dashed pl-10': alignment === 'left',
            'border-r border-dashed': alignment === 'right',
          })}
        >
          {children}
        </div>
      </Container>
    </section>
  );
}
