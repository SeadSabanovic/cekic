import type { PortableTextBlock } from '@portabletext/types';

export type PortableTextHeading = {
  id: string;
  title: string;
  level: 2 | 3;
  blockKey: string;
};

const HEADING_STYLES = new Set(['h2', 'h3']);

function blockPlainText(block: PortableTextBlock): string {
  const children = block.children;
  if (!Array.isArray(children)) return '';
  return children
    .map((child) => {
      if (child && typeof child === 'object' && 'text' in child) {
        return String(child.text ?? '');
      }
      return '';
    })
    .join('')
    .trim();
}

/** URL-siguran id iz naslova (podrška za čćšđž). */
export function slugifyHeading(text: string): string {
  const base = text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[čć]/g, 'c')
    .replace(/đ/g, 'd')
    .replace(/š/g, 's')
    .replace(/ž/g, 'z')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return base || 'odjeljak';
}

function uniqueId(base: string, used: Set<string>): string {
  let id = base;
  let n = 2;
  while (used.has(id)) {
    id = `${base}-${n}`;
    n += 1;
  }
  used.add(id);
  return id;
}

/** Naslovi h2/h3 iz Portable Text bloka — za TOC i sidra na stranici. */
export function extractPortableTextHeadings(
  blocks: PortableTextBlock[] | null | undefined
): PortableTextHeading[] {
  if (!Array.isArray(blocks)) return [];

  const used = new Set<string>();
  const headings: PortableTextHeading[] = [];

  for (const block of blocks) {
    if (block._type !== 'block') continue;
    const style = block.style;
    if (!style || !HEADING_STYLES.has(style)) continue;

    const title = blockPlainText(block);
    if (!title) continue;

    const level = style === 'h2' ? 2 : 3;
    const id = uniqueId(slugifyHeading(title), used);
    const blockKey = block._key ?? id;

    headings.push({ id, title, level, blockKey });
  }

  return headings;
}

export function portableTextHeadingIdMap(
  headings: PortableTextHeading[]
): Record<string, string> {
  return Object.fromEntries(headings.map((h) => [h.blockKey, h.id]));
}
