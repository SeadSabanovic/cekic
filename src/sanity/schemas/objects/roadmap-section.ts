import { defineField, defineType } from 'sanity';

/** Jedno poglavlje unutar mape puta (hub) — vlastiti URL segment ispod /putokazi/[hub]/…. */
export default defineType({
  name: 'roadmapSection',
  title: 'Poglavlje',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Naslov',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL segment)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lead',
      title: 'Uvod',
      description: 'Kratki tekst za TOC i SEO.',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Sadržaj',
      description: 'Glavni tekst poglavlja (opciono).',
      type: 'array',
      of: [{ type: 'block' }, { type: 'horizontalRule' }],
    }),
  ],
  preview: {
    select: { title: 'title', slug: 'slug.current' },
    prepare({ title, slug }) {
      return {
        title: title ?? 'Bez naslova',
        subtitle: slug ? `/${slug}` : '',
      };
    },
  },
});
