import type { ReactNode } from 'react';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';

export type FormBlockProps = {
  anchorId?: string;
  heading?: string;
  intro?: ReactNode;
  /** Npr. vlastiti `<form>` ili kontakt forma */
  children: ReactNode;
};

export default function FormBlock(props: FormBlockProps) {
  const { heading, intro, children, anchorId } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className="pattern-bg px-4 xl:px-10"
    >
      <Container className="border-x border-dashed py-16 md:py-28">
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
          {heading && (
            <Heading
              tag="h2"
              size="xl"
              className="text-center leading-normal text-balance"
            >
              {heading}
            </Heading>
          )}
          {intro && (
            <div className="mb-4 max-w-[320px] text-center text-balance text-gray-600 md:text-xl">
              {intro}
            </div>
          )}
          {children}
        </div>
      </Container>
    </section>
  );
}
