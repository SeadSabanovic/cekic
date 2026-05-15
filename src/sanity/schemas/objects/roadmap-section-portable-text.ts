import { defineField, defineType } from 'sanity';

/**
 * Reusable blok sadržaja za poglavlja hub mape — Portable Text.
 * Dodaj više puta u niz „Sadržaj stranice” na poglavlju.
 */
export default defineType({
  name: 'roadmapSectionPortableText',
  title: 'Tekst',
  type: 'object',
  fields: [
    defineField({
      name: 'content',
      title: 'Sadržaj',
      type: 'array',
      of: [{ type: 'block' }, { type: 'horizontalRule' }],
    }),
  ],
  preview: {
    select: { blocks: 'content' },
    prepare({ blocks }) {
      const first = Array.isArray(blocks)
        ? blocks.find((b) => b?._type === 'block')
        : null;
      const text =
        first?.children
          ?.map((c: { text?: string }) => c?.text ?? '')
          .join('')
          .trim() ?? '';
      return {
        title: text ? text.slice(0, 72) + (text.length > 72 ? '…' : '') : 'Tekst',
        subtitle: 'Portable Text',
      };
    },
  },
});
