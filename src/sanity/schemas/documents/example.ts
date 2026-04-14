import { defineField, defineType } from "sanity";

/**
 * Primjer dokumenta — obriši ili zamijeni kad dodaš prave tipove u `schemas/index.ts`.
 */
export default defineType({
  name: "example",
  title: "Primjer",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Naslov",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
