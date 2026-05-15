import { PortableText as SanityPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import {
  createPortableTextComponents,
  portableTextComponents,
} from '@/lib/portable-text-components';

type PortableTextProps = {
  value: PortableTextBlock[];
  /** Mapiranje Sanity `_key` → HTML `id` za naslove (TOC sidra). */
  headingIdByKey?: Record<string, string>;
};

/** Centralizovan renderer za Sanity Portable Text sadržaj. */
export default function PortableText({
  value,
  headingIdByKey,
}: PortableTextProps) {
  const components = headingIdByKey
    ? createPortableTextComponents(headingIdByKey)
    : portableTextComponents;

  return <SanityPortableText value={value} components={components} />;
}
