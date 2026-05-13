import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { CircleCheck } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import {
  BlockButtonRow,
  type BlockLinkItem,
} from '@/components/blocks/block-button-row';

export type FeatureCardsBlockFeature = {
  id: string;
  imageSrc: string;
  imageAlt?: string;
  title: string;
  description?: string;
  items?: string[];
  cta?: { label: string; href: string };
};

export type FeatureCardsBlockProps = {
  anchorId?: string;
  heading?: string;
  headerActions?: BlockLinkItem[];
  features?: FeatureCardsBlockFeature[];
  showCallToAction?: boolean;
  callToAction?: {
    title: string;
    body: ReactNode;
    actions?: BlockLinkItem[];
  };
};

export default function FeatureCardsBlock(props: FeatureCardsBlockProps) {
  const {
    heading,
    headerActions,
    features,
    showCallToAction,
    anchorId,
    callToAction,
  } = props;

  return (
    <section {...(anchorId ? { id: anchorId } : {})} className="px-4 xl:px-10">
      <Container className="space-y-8 border-x border-dashed px-4 py-16 md:space-y-6 md:py-28">
        <div className="pattern-bg--2 relative mx-auto flex max-w-240 flex-col items-center justify-between gap-8 border-y border-dashed py-2 md:flex-row md:gap-6 md:py-4">
          <Heading
            tag="h2"
            size="xl"
            className="relative col-span-7 py-1.5 leading-normal text-balance"
          >
            <span className="relative z-10">{heading}</span>
          </Heading>
          {headerActions && headerActions.length > 0 && (
            <BlockButtonRow
              className="z-20 hidden md:flex"
              items={headerActions}
            />
          )}
          <EdgeBlur />
        </div>
        <div className="mx-auto grid max-w-240 grid-cols-1 gap-6 md:grid-cols-2">
          {features?.map((feature) => (
            <div key={feature.id} className="col-span-2 md:col-span-1">
              <FeatureCard feature={feature} />
            </div>
          ))}
          {showCallToAction && callToAction && (
            <CallToAction section={callToAction} />
          )}
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({ feature }: { feature: FeatureCardsBlockFeature }) {
  return (
    <div className="rounded-3xl border border-dashed">
      <div className="p-3">
        <Image
          src={feature.imageSrc}
          width={600}
          height={400}
          alt={feature.imageAlt ?? feature.title}
          className="h-[280px] overflow-hidden rounded-2xl object-cover"
        />
      </div>
      <div className="mt-5 px-6 pb-2 md:px-8">
        <div className="space-y-6">
          <Heading
            tag="h3"
            size="sm"
            className="pattern-bg relative border-y border-y-gray-200/40 py-2 font-semibold"
          >
            {feature.title}
          </Heading>
          {feature.description && (
            <p className="text-sm text-balance text-gray-500">
              {feature.description}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 space-y-3 border-t border-dashed">
        {feature.items?.map((item, index) => (
          <div
            key={`${feature.id}-item-${index}`}
            className={cn(
              'flex items-start gap-2 border-b border-dashed px-6 py-4 md:items-center md:px-8',
              {
                'border-none pb-6': index === (feature.items?.length ?? 0) - 1,
              }
            )}
          >
            <CircleCheck className="h-4 w-4 shrink-0 text-green-600" />
            <span className="text-sm text-balance">{item}</span>
          </div>
        ))}
      </div>
      {feature.cta && (
        <div className="border-t border-dashed px-4 py-4">
          <Link
            href={feature.cta.href}
            className={cn(
              buttonVariants({ variant: 'default' }),
              'h-12 w-full'
            )}
          >
            {feature.cta.label}
          </Link>
        </div>
      )}
    </div>
  );
}

function CallToAction({
  section,
}: {
  section: NonNullable<FeatureCardsBlockProps['callToAction']>;
}) {
  return (
    <div className="pattern-bg--2 col-span-2 flex w-full flex-col items-center gap-8 rounded-3xl border p-8 md:flex-row">
      <div className="space-y-5 md:space-y-3">
        <div className="text-xl font-medium text-balance">{section.title}</div>
        <div className="text-sm text-balance text-gray-500 md:text-base">
          {section.body}
        </div>
      </div>
      {section.actions && section.actions.length > 0 && (
        <BlockButtonRow
          className="items-center md:justify-center"
          items={section.actions}
        />
      )}
    </div>
  );
}

function EdgeBlur() {
  return (
    <div className="absolute inset-0 flex items-center justify-between">
      <div className="relative h-full w-[100px] bg-linear-to-r from-background to-transparent" />
      <div className="h-full w-[100px] bg-linear-to-l from-background to-transparent" />
    </div>
  );
}
