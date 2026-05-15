import type { PortableTextBlock } from '@portabletext/types';

import type { PutokazCoverImageInput } from '@/lib/putokaz-cover';

/** Blok „Tekst” u nizu sadržaja. */
export type RoadmapSectionPortableTextBlock = {
  _key: string;
  _type: 'roadmapSectionPortableText';
  content?: PortableTextBlock[] | null;
};

/** Globalni blok „Slika” (hero okvir). */
export type ContentImageBlockData = {
  _key: string;
  _type: 'contentImage';
  image?: PutokazCoverImageInput;
  compact?: boolean | null;
};

export type RoadmapSectionContentBlock =
  | RoadmapSectionPortableTextBlock
  | ContentImageBlockData;

export type RoadmapSectionWithContent = {
  content?: RoadmapSectionContentBlock[] | null;
};

function isPortableTextBlock(
  block: RoadmapSectionContentBlock
): block is RoadmapSectionPortableTextBlock {
  return block._type === 'roadmapSectionPortableText';
}

function isContentImageBlock(
  block: RoadmapSectionContentBlock
): block is ContentImageBlockData {
  return block._type === 'contentImage';
}

/** Svi Portable Text blokovi poglavlja (samo iz „Tekst” blokova). */
export function flattenSectionPortableText(
  section: RoadmapSectionWithContent
): PortableTextBlock[] {
  return (section.content ?? []).flatMap((block) => {
    if (!isPortableTextBlock(block)) return [];
    return block.content ?? [];
  });
}

export function hasSectionContent(section: RoadmapSectionWithContent): boolean {
  return (section.content ?? []).some((block) => {
    if (isPortableTextBlock(block)) {
      return Array.isArray(block.content) && block.content.length > 0;
    }
    if (isContentImageBlock(block)) {
      return Boolean(block.image?.asset?._ref);
    }
    return false;
  });
}
