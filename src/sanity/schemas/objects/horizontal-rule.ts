import { defineField, defineType } from 'sanity';

/** Vizualni razdjelnik (horizontalna linija) za Portable Text sadržaj. */
export default defineType({
  name: 'horizontalRule',
  title: 'Horizontalna linija',
  type: 'object',
  fields: [
    defineField({
      name: 'hr',
      title: 'HR',
      type: 'boolean',
      hidden: true,
      readOnly: true,
      initialValue: true,
    }),
  ],
  preview: {
    prepare: () => ({ title: '---' }),
  },
});
