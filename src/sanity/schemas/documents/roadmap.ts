import { defineField, defineType } from 'sanity';

/**
 * Hub mapa puta (npr. „Postani moler”) — URL: /putokazi/{slug}.
 * U Studiju: lista „Karijerni putokazi” (structure).
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
      name: 'stats',
      title: 'Stats bar',
      description: 'Brzi podaci iznad sadržaja (npr. zarada, vrijeme, potražnja).',
      type: 'object',
      fields: [
        defineField({
          name: 'zarada',
          title: 'Zarada',
          type: 'string',
          initialValue: '1.200 – 2.500 KM',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'vrijeme',
          title: 'Vrijeme',
          type: 'string',
          initialValue: '3 – 4 mjeseca',
          validation: (Rule) => Rule.required(),
        }),
        defineField({
          name: 'potraznja',
          title: 'Potražnja',
          type: 'string',
          initialValue: 'Jako visoka',
          validation: (Rule) => Rule.required(),
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'aboutOccupation',
      title: 'O zanimanju',
      description: 'Kratko objašnjenje: šta je ovo zanimanje i čime se bavi.',
      type: 'array',
      of: [{ type: 'block' }, { type: 'horizontalRule' }],
    }),
    defineField({
      name: 'sections',
      title: 'Poglavlja',
      description:
        'Redoslijed ovdje = redoslijed u sadržaju i „Sljedeće / Prethodno”.',
      type: 'array',
      of: [{ type: 'roadmapSection' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'locked',
      title: 'Zaključano (Uskoro)',
      description:
        'Ako je uključeno, hub ostaje objavljen, ali na početnoj kartici u karuselu prikazujemo „Uskoro” umjesto običnog linka.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      locked: 'locked',
      media: 'coverImage',
    },
    prepare({ title, slug, locked, media }) {
      const lock = locked ? ' • Uskoro' : '';
      return {
        title: title ?? 'Bez naslova',
        subtitle: slug ? `Putokazi • /${slug}${lock}` : lock || '',
        media,
      };
    },
  },
});
