import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import {
  BlockButtonRow,
  type BlockLinkItem,
} from '@/components/blocks/block-button-row';

export type FeaturesMinimalBlockProps = {
  anchorId?: string;
  heading?: string;
  body?: ReactNode;
  actions?: BlockLinkItem[];
  features?: string[];
  enableBorderTop?: boolean;
  enableBorderBottom?: boolean;
  cornerRadiusTop?: 'flat' | 'rounded';
  cornerRadiusBottom?: 'flat' | 'rounded';
};

export default function FeaturesMinimalBlock(props: FeaturesMinimalBlockProps) {
  const {
    heading,
    body,
    actions,
    features,
    enableBorderTop,
    enableBorderBottom,
    cornerRadiusTop,
    cornerRadiusBottom,
    anchorId,
  } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('bg-gray-50 px-4 xl:px-10', {
        'border-t': enableBorderTop,
        'border-b': enableBorderBottom,
        'rounded-t-4xl': cornerRadiusTop === 'rounded',
        'rounded-b-4xl': cornerRadiusBottom === 'rounded',
      })}
    >
      <Container className="space-y-10 border-x border-dashed py-16 md:space-y-14 md:py-28">
        <div className="grid grid-cols-12 gap-y-12 md:gap-y-20 xl:gap-x-20">
          <div className="col-span-12 max-w-[400px] space-y-10 md:max-w-full xl:col-span-5 md:space-y-10">
            <div className="justify-between lg:flex xl:flex-col">
              <Heading
                tag="h2"
                size="xl"
                className="pattern-bg--2 relative max-w-[420px] border-y border-dashed border-t-gray-200 border-b-gray-200 bg-gray-50 py-3 pr-2.5 leading-normal text-balance"
              >
                <span className="relative z-20">{heading}</span>
                <EdgeBlur />
              </Heading>
              {body && (
                <div className="mt-8 max-w-[400px] text-balance text-gray-500">
                  {body}
                </div>
              )}
            </div>
            {actions && actions.length > 0 && (
              <BlockButtonRow items={actions} />
            )}
          </div>
          <div className="col-span-12 xl:col-span-7">
            <div className="grid gap-y-3 md:grid-cols-2 md:gap-x-10">
              {features?.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-3.5 border-b border-dashed border-b-slate-200/80 pb-3.5"
                >
                  <Check size={18} />
                  <span className="text-sm md:text-base">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

function EdgeBlur() {
  return (
    <div className="absolute inset-0 flex items-center justify-between">
      <div className="relative h-full w-[100px] bg-linear-to-r from-gray-50 to-transparent" />
      <div className="h-full w-[100px] bg-linear-to-l from-gray-50 to-transparent" />
    </div>
  );
}
