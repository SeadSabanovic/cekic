'use client';

import type { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import Heading from '@/components/shared/heading';
import Container from '@/components/global/container';
import PlayVideo from '@/components/shared/play-video';
import {
  BlockButtonRow,
  type BlockLinkItem,
} from '@/components/blocks/block-button-row';

export type HeroBlockProps = {
  anchorId?: string;
  heading?: string;
  body?: ReactNode;
  mediaType?: 'none' | 'image';
  bottomCornerRadius?: 'flat' | 'rounded';
  image?: { src: string; alt: string; short?: boolean };
  overlayType?: 'none' | 'dark';
  dialogType?: 'none' | 'video';
  videoUrl?: string;
  actions?: BlockLinkItem[];
};

export default function HeroBlock(props: HeroBlockProps) {
  const {
    heading,
    body,
    mediaType,
    bottomCornerRadius,
    actions,
    image,
    dialogType,
    videoUrl,
    overlayType,
    anchorId,
  } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('pattern-bg border-b px-4 md:px-10', {
        'rounded-3xl md:rounded-4xl': bottomCornerRadius === 'rounded',
      })}
    >
      <Container
        className={cn('space-y-10 border-x border-dashed xl:-space-y-6', {
          'pb-7 md:pb-12': mediaType === 'image',
        })}
      >
        <div
          className={cn(
            'grid grid-cols-12 gap-3 pt-36 pb-16 md:gap-6 md:border-x md:border-dashed md:px-14 md:pt-52 md:pb-24 xl:gap-14 xl:pb-36',
            { 'pb-6': mediaType === 'image' }
          )}
        >
          <div className="col-span-12 xl:col-span-7">
            <Heading
              size="xxxl"
              tag="h1"
              className="leading-tight text-balance md:max-w-160"
            >
              {heading}
            </Heading>
          </div>
          <div className="col-span-12 xl:col-span-5">
            {body && (
              <div className="mt-3 text-balance text-foreground md:text-lg">
                {body}
              </div>
            )}
            {actions && actions.length > 0 && (
              <div className="mt-8 md:mt-10">
                <BlockButtonRow items={actions} />
              </div>
            )}
          </div>
        </div>
        {mediaType === 'image' && image?.src && (
          <div className="pattern-bg--2 rounded-3xl border border-dashed p-4 md:rounded-4xl md:p-6">
            <div className="relative h-full w-full overflow-hidden rounded-3xl md:rounded-4xl">
              <Image
                priority
                width={1400}
                height={800}
                src={image.src}
                alt={image.alt}
                className={cn(
                  'w-full rounded-2xl object-cover md:rounded-3xl',
                  {
                    'max-h-120': image.short,
                  }
                )}
              />
              {overlayType === 'dark' && <DarkOverlay />}
              {dialogType === 'video' && videoUrl && (
                <PlayVideo videoUrl={videoUrl} />
              )}
            </div>
          </div>
        )}
      </Container>
    </section>
  );
}

function DarkOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-black/20" />
      <div className="absolute right-0 bottom-0 left-0 h-[50%] w-full bg-linear-to-t from-black/40 to-transparent" />
    </>
  );
}
