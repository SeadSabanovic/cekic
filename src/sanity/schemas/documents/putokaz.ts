import { defineField, defineType } from 'sanity';

import { putokaziTradeCategoryOptions } from '@/lib/putokazi-trade-categories';

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
      name: 'sekcija',
      title: 'Sekcija',
      description: 'Odaberi gdje se dokument prikazuje: Putokazi ili Projekti.',
      type: 'string',
      options: {
        list: [
          { title: 'Putokazi', value: 'putokazi' },
          { title: 'Projekti', value: 'projekti' },
        ],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'putokazi',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'kategorija',
      title: 'Kategorija (filter na sajtu)',
      description:
        'Odaberi jednu kategoriju da se putokaz pojavi pod odgovarajućim filterom na /putokazi. Ako ostane prazno, vidi se samo pod „Sve”.',
      type: 'string',
      options: {
        list: putokaziTradeCategoryOptions.map((o) => ({
          title: o.title,
          value: o.value,
        })),
        layout: 'dropdown',
      },
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
      sekcija: 'sekcija',
      kategorija: 'kategorija',
      media: 'coverImage',
    },
    prepare({ title, slug, sekcija, kategorija, media }) {
      const zone = sekcija === 'projekti' ? 'Projekti' : 'Putokazi';
      const kat = kategorija ? ` • ${kategorija}` : '';
      return {
        title: title ?? 'Bez naslova',
        subtitle: `${zone}${slug ? ` • /${slug}` : ''}${kat}`,
        media,
      };
    },
  },
});
