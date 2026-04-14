'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Container from '@/components/global/container';
import PlayVideo from '@/components/shared/play-video';

export type MediaBlockProps = {
  anchorId?: string;
  backgroundType?: 'image' | 'none';
  backgroundWidth?: 'full' | 'contained';
  image?: { src: string; alt: string };
  overlayType?: 'none' | 'dark';
  dialogType?: 'none' | 'video';
  videoUrl?: string;
};

export default function MediaBlock(props: MediaBlockProps) {
  const {
    backgroundType,
    backgroundWidth,
    image,
    overlayType,
    dialogType,
    videoUrl,
    anchorId,
  } = props;

  return (
    <section
      {...(anchorId ? { id: anchorId } : {})}
      className={cn('pattern-bg--2 border-t border-dashed', {
        'px-4 md:px-10': backgroundWidth === 'contained',
      })}
    >
      <Container
        className={cn('relative h-72 overflow-hidden md:h-192', {
          'border-x border-dashed': backgroundWidth === 'contained',
        })}
      >
        {backgroundType === 'image' && image?.src && (
          <div className="absolute inset-0">
            <Image
              src={image.src}
              width={2400}
              height={1200}
              alt={image.alt}
              className="h-full w-full object-cover"
            />
            {overlayType === 'dark' && <DarkOverlay />}
          </div>
        )}
        {dialogType === 'video' && videoUrl && (
          <PlayVideo videoUrl={videoUrl} />
        )}
      </Container>
    </section>
  );
}

function DarkOverlay() {
  return (
    <>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute right-0 bottom-0 left-0 h-[50%] w-full bg-linear-to-t from-black/80 to-transparent" />
    </>
  );
}
