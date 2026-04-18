import { defineField, defineType } from 'sanity';

/**
 * Osnovni putokaz (mapa puta) — proširivo kasnije koracima, blokovima, itd.
 */
export default defineType({
  name: 'putokaz',
  title: 'Putokaz',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Putanja (slug)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Uvod',
      description: 'Kratak tekst za kartice, pretragu i SEO.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'coverImage',
      title: 'Naslovna slika',
      description:
        'Za karticu na listi putokaza i zaglavlje stranice pojedinačnog putokaza.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativni tekst',
          description: 'Kratko opiši šta je na slici (pristupačnost i SEO).',
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      media: 'coverImage',
    },
    prepare({ title, slug, media }) {
      return {
        title: title ?? 'Bez naslova',
        subtitle: slug ? `/${slug}` : '',
        media,
      };
    },
  },
});
