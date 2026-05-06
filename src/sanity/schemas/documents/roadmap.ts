import { defineField, defineType } from 'sanity';

/**
 * Hub mapa puta (npr. „Postani moler”) — URL: /putokazi/{slug}.
 * U Studiju živi pod istom listom „Putokazi” kao i kartice `putokaz`.
 */
export default defineType({
  name: 'roadmap',
  title: 'Hub puta',
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
      title: 'Slug hub stranice',
      description: 'Npr. „moler” → /putokazi/moler',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Uvod (hub)',
      description: 'Tekst ispod naslova na početnoj stranici mape puta.',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'coverImage',
      title: 'Naslovna slika',
      description: 'Slika za kartice i hero sekcije ovog zanata.',
      type: 'image',
      options: { hotspot: true },
      fields: [
        defineField({
          name: 'alt',
          type: 'string',
          title: 'Alternativni tekst',
          description: 'Kratak opis slike (pristupacnost i SEO).',
        }),
      ],
    }),
    defineField({
      name: 'sections',
      title: 'Poglavlja',
      description: 'Redoslijed ovdje = redoslijed u sadržaju i „Sljedeće / Prethodno”.',
      type: 'array',
      of: [{ type: 'roadmapSection' }],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current', media: 'coverImage' },
    prepare({ title, slug, media }) {
      return {
        title: title ?? 'Bez naslova',
        subtitle: slug ? `Putokazi • /${slug}` : '',
        media,
      };
    },
  },
});
