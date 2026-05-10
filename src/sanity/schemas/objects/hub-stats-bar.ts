import { defineField, defineType } from 'sanity';

/**
 * Zajednički stats bar za hub (`roadmap`) i kartice (`putokaz`):
 * raspon zarade po regiji (EUR) + vrijeme + potražnja.
 */
export default defineType({
  name: 'hubStatsBar',
  title: 'Stats bar',
  type: 'object',
  fields: [
    defineField({
      name: 'earningsByRegion',
      title: 'Raspon zarade po regiji (EUR)',
      description:
        'Minimalna i maksimalna mjesečna zarada po regiji — prikazuje se grafikon na hub stranici.',
      type: 'object',
      fields: [
        defineField({
          name: 'balkanMin',
          title: 'Balkan — minimum',
          type: 'number',
          validation: (Rule) => Rule.positive().integer(),
        }),
        defineField({
          name: 'balkanMax',
          title: 'Balkan — maksimum',
          type: 'number',
          validation: (Rule) => Rule.positive().integer(),
        }),
        defineField({
          name: 'euMin',
          title: 'EU — minimum',
          type: 'number',
          validation: (Rule) => Rule.positive().integer(),
        }),
        defineField({
          name: 'euMax',
          title: 'EU — maksimum',
          type: 'number',
          validation: (Rule) => Rule.positive().integer(),
        }),
        defineField({
          name: 'scaleMax',
          title: 'Maksimum skale grafikona (EUR)',
          description:
            'Opcionalno. Ako ostane prazno, skala se automatski prilagođava iznad najvećeg max.',
          type: 'number',
          validation: (Rule) => Rule.positive().integer(),
        }),
      ],
      options: { collapsible: true, collapsed: false },
    }),
    defineField({
      name: 'vrijeme',
      title: 'Vrijeme',
      description: 'Npr. vrijeme do samostalne zarade.',
      type: 'string',
      initialValue: '3 – 4 mjeseca',
    }),
    defineField({
      name: 'potraznja',
      title: 'Potražnja',
      type: 'string',
      initialValue: 'Jako visoka',
    }),
  ],
  initialValue: () => ({
    earningsByRegion: {
      balkanMin: 800,
      balkanMax: 3000,
      euMin: 1800,
      euMax: 5500,
      scaleMax: 6000,
    },
    vrijeme: '3 – 4 mjeseca',
    potraznja: 'Jako visoka',
  }),
});
