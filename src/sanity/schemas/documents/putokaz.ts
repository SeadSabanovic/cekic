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
      name: 'stats',
      title: 'Brzi podaci (kartice)',
      description:
        'Raspon zarade po regiji (za minikartice), vrijeme i potražnja. Prazno = „--”.',
      type: 'hubStatsBar',
      options: { collapsible: true, collapsed: true },
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
    defineField({
      name: 'locked',
      title: 'Zaključano (Uskoro)',
      description:
        'Ako je uključeno, stranica ostaje objavljena, ali na početnoj kartici u karuselu prikazujemo „Uskoro” umjesto običnog linka.',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      slug: 'slug.current',
      kategorija: 'kategorija',
      locked: 'locked',
      media: 'coverImage',
    },
    prepare({ title, slug, kategorija, locked, media }) {
      const kat = kategorija ? ` • ${kategorija}` : '';
      const lock = locked ? ' • Uskoro' : '';
      return {
        title: title ?? 'Bez naslova',
        subtitle: `Putokazi${slug ? ` • /${slug}` : ''}${kat}${lock}`,
        media,
      };
    },
  },
});
