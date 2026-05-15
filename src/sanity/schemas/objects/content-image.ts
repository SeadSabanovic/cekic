import { defineField, defineType } from 'sanity';

/**
 * Globalna slika u hero okviru (zaokruženi rub, pattern pozadina).
 * Koristi u nizu sadržaja poglavlja, page builderu, itd.
 */
export default defineType({
  name: 'contentImage',
  title: 'Slika',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Slika',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativni tekst',
          description: 'Kratko opiši šta je na slici (pristupačnost i SEO).',
        }),
      ],
    }),
    defineField({
      name: 'compact',
      title: 'Niža slika',
      description: 'Uključi za kraći prikaz (kao „short” na hero bloku).',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: { media: 'image', alt: 'image.alt' },
    prepare({ media, alt }) {
      return {
        title: alt?.trim() || 'Slika',
        subtitle: 'Hero okvir',
        media,
      };
    },
  },
});
