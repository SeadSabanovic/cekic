import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import {
  BlockButtonRow,
  type BlockLinkItem,
} from '@/components/blocks/block-button-row';
import AnimatedUnderline from '@/components/shared/animated-underline';

export type ServiceCardItem = {
  id: string;
  href: string;
  title: string;
  description?: string;
  imageSrc: string;
  imageAlt?: string;
};

export type ServicesBlockProps = {
  anchorId?: string;
  heading?: string;
  services?: ServiceCardItem[];
  background?: 'default' | 'pattern';
  topCornerRadius?: 'flat' | 'rounded';
  headerActions?: BlockLinkItem[];
  paddingTop?: 'none' | 'small' | 'medium' | 'default' | 'large';
  paddingBottom?: 'none' | 'small' | 'medium' | 'default' | 'large';
};

export default function ServicesBlock(props: ServicesBlockProps) {
  const {
    heading,
    services,
    background,
    topCornerRadius,
    headerActions,
    anchorId,
    paddingTop,
    paddingBottom,
  } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('px-4 xl:px-10', {
        'pattern-bg': background === 'pattern',
        'rounded-t-4xl border-t border-t-gray-200/60':
          topCornerRadius === 'rounded',
      })}
    >
      <Container
        paddingTop={paddingTop}
        paddingBottom={paddingBottom}
        className="space-y-10 border-x border-dashed"
      >
        <div className="flex items-center justify-between gap-6 border-y border-dashed py-4">
          <Heading
            tag="h2"
            size="xl"
            className="max-w-160 leading-tight text-balance"
          >
            {heading}
          </Heading>
          {headerActions && headerActions.length > 0 && (
            <div className="hidden md:block">
              <BlockButtonRow items={headerActions} />
            </div>
          )}
        </div>
        <div className="grid gap-x-6 gap-y-10 md:grid-cols-3">
          {services?.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
        {headerActions && headerActions.length > 0 && (
          <div className="pt-4 md:hidden">
            <BlockButtonRow items={headerActions} />
          </div>
        )}
      </Container>
    </section>
  );
}

function ServiceCard({ service }: { service: ServiceCardItem }) {
  return (
    <div
      aria-label={service.title}
      className="group relative border-b border-dashed pb-8"
    >
      <Link href={service.href} className="relative space-y-4 md:space-y-6">
        <div className="rounded-3xl border border-dashed p-4 backdrop-blur-md backdrop-opacity-50">
          <Image
            src={service.imageSrc}
            width={800}
            height={800}
            alt={service.imageAlt ?? service.title}
            className="aspect-3/2 rounded-2xl"
          />
        </div>
        <Heading tag="h2" size="md" className="pt-1 text-balance md:pt-0">
          {service.title}
        </Heading>
        {service.description && (
          <p className="text-sm text-neutral-500 md:text-base md:text-balance">
            {service.description}
          </p>
        )}
      </Link>
      <AnimatedUnderline className="-translate-y-0.5" />
    </div>
  );
}
