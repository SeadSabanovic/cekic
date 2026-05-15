import { ContentImageBlock } from '@/components/blocks/content-image-block';
import PortableText from '@/components/shared/portable-text';
import type { RoadmapSectionContentBlock } from '@/lib/roadmap-section-content';
import {
  extractPortableTextHeadings,
  portableTextHeadingIdMap,
} from '@/lib/portable-text-headings';
import { cn } from '@/lib/utils';

type RoadmapSectionContentProps = {
  blocks?: RoadmapSectionContentBlock[] | null;
  /** Fallback alt za slike bez opisa u studiju. */
  imageAltFallback?: string;
  className?: string;
};

export function RoadmapSectionContent({
  blocks,
  imageAltFallback = 'Ilustracija',
  className,
}: RoadmapSectionContentProps) {
  const items = blocks ?? [];

  const portableBlocks = items.filter(
    (
      b
    ): b is Extract<
      RoadmapSectionContentBlock,
      { _type: 'roadmapSectionPortableText' }
    > =>
      b._type === 'roadmapSectionPortableText' &&
      Array.isArray(b.content) &&
      b.content.length > 0
  );

  const allHeadings = portableBlocks.flatMap((b) =>
    extractPortableTextHeadings(b.content)
  );
  const headingIdByKey = portableTextHeadingIdMap(allHeadings);

  const rendered = items
    .map((block, index) => {
      if (
        block._type === 'roadmapSectionPortableText' &&
        Array.isArray(block.content) &&
        block.content.length > 0
      ) {
        return (
          <div key={block._key}>
            <PortableText
              value={block.content}
              headingIdByKey={headingIdByKey}
            />
          </div>
        );
      }

      if (block._type === 'contentImage' && block.image?.asset?._ref) {
        return (
          <ContentImageBlock
            key={block._key}
            image={block.image}
            altFallback={imageAltFallback}
            compact={block.compact === true}
            priority={index === 0}
          />
        );
      }

      return null;
    })
    .filter(Boolean);

  if (rendered.length === 0) return null;

  return (
    <div className={cn('space-y-10 md:space-y-12', className)}>{rendered}</div>
  );
}
