'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';

export type TestimonialItem = {
  id: string;
  quote: string;
  name: string;
  jobTitle?: string;
  company?: string;
  avatarSrc: string;
  logoSrc?: string;
};

export type TestimonialBlockProps = {
  anchorId?: string;
  eyebrow?: string;
  heading?: string;
  testimonials?: TestimonialItem[];
  cornerRadiusTop?: 'flat' | 'rounded';
  cornerRadiusBottom?: 'flat' | 'rounded';
};

export default function TestimonialBlock(props: TestimonialBlockProps) {
  const {
    heading,
    eyebrow,
    testimonials,
    anchorId,
    cornerRadiusTop,
    cornerRadiusBottom,
  } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn(
        'pattern-bg border-y border-dashed pb-10 md:pb-0 xl:px-10',
        {
          'rounded-t-4xl': cornerRadiusTop === 'rounded',
          'rounded-b-4xl': cornerRadiusBottom === 'rounded',
        }
      )}
    >
      <Container className="space-y-10 border-x border-dashed py-16 md:py-28">
        <div>
          {eyebrow && (
            <div className="mx-auto flex h-6 w-fit items-center justify-between rounded-full bg-black px-2 text-center text-sm font-medium tracking-tight text-white">
              {eyebrow}
            </div>
          )}
          {heading && (
            <h2 className="mx-auto mt-6 w-fit border-y bg-linear-to-r from-white/0 via-green-400/15 to-white/0 py-2 text-center text-xl font-semibold md:text-2xl">
              {heading}
            </h2>
          )}
        </div>
        <div className="mx-auto flex max-w-176 flex-col gap-8">
          {testimonials?.map((t) => (
            <TestimonialCard key={t.id} testimonial={t} />
          ))}
        </div>
      </Container>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  classNames,
}: {
  testimonial: TestimonialItem;
  classNames?: string;
}) {
  return (
    <div
      className={cn(
        'mx-auto flex h-full max-w-176 flex-col justify-between space-y-10 bg-white p-8 md:space-y-20 md:p-12',
        classNames
      )}
    >
      <h2 className="text-pretty text-base md:text-xl">{testimonial.quote}</h2>
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
        <div className="flex items-center gap-4">
          <Image
            src={testimonial.avatarSrc}
            width={50}
            height={50}
            alt={testimonial.name}
            className="h-12 w-12 rounded-full"
          />
          <div className="-space-y-0.5">
            <h3 className="text-sm font-medium md:text-base">
              {testimonial.name}
            </h3>
            {testimonial.jobTitle && (
              <p className="text-sm text-gray-500">{testimonial.jobTitle}</p>
            )}
          </div>
        </div>
        {testimonial.logoSrc && (
          <div>
            <Image
              src={testimonial.logoSrc}
              width={80}
              height={40}
              alt={`${testimonial.company ?? ''} logo`}
              className="hidden md:block"
            />
          </div>
        )}
      </div>
    </div>
  );
}
