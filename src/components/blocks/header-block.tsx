import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';

export type HeaderBlockProps = {
  anchorId?: string;
  heading?: string;
  body?: ReactNode;
  bottomCornerRadius?: 'flat' | 'rounded';
};

export default function HeaderBlock(props: HeaderBlockProps) {
  const { heading, body, bottomCornerRadius, anchorId } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('pattern-bg border-b px-4 md:px-10', {
        'rounded-4xl': bottomCornerRadius === 'rounded',
      })}
    >
      <Container className="border-x border-dashed">
        <div className="pt-36 pb-20 md:pt-52 md:pb-36">
          <Heading tag="h1" size="xxl" className="text-balance leading-normal">
            {heading}
          </Heading>
          {body && (
            <div className="mt-6 text-balance text-gray-600 md:mt-8 md:text-xl">
              {body}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
