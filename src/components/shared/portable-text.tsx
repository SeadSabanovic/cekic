import { PortableText as SanityPortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import { portableTextComponents } from '@/lib/portable-text-components';

type PortableTextProps = {
  value: PortableTextBlock[];
};

/** Centralizovan renderer za Sanity Portable Text sadržaj. */
export default function PortableText({ value }: PortableTextProps) {
  return <SanityPortableText value={value} components={portableTextComponents} />;
}
