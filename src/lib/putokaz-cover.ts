import { urlForImage } from '@/sanity/lib/utils';

/** Minimalni oblik `coverImage` polja iz Sanity upita. */
export type PutokazCoverImageInput = {
  asset?: { _ref?: string } | null;
  alt?: string | null;
} | null;

type PutokazCoverDoc = {
  title: string;
  coverImage?: PutokazCoverImageInput;
};

/** URL za karticu, zaglavlje stranice i Open Graph. */
export function resolvePutokazCover(
  doc: PutokazCoverDoc,
  size: { w: number; h: number } = { w: 1200, h: 675 }
): { url: string; alt: string } | null {
  const ref = doc.coverImage?.asset?._ref;
  if (!ref || !doc.coverImage) return null;

  const built = urlForImage(
    doc.coverImage as {
      asset: { _ref: string };
      hotspot?: unknown;
      crop?: unknown;
    }
  );
  const url = built?.width(size.w).height(size.h).fit('crop').url();
  if (!url) return null;

  const alt = doc.coverImage.alt?.trim() || doc.title;
  return { url, alt };
}
