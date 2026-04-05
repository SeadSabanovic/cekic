import { Image } from "lucide-react";
import { defineField, defineType } from "sanity";
import { fieldsets } from "../../misc/fieldsets";
import { fieldGroups } from "../../misc/field-groups";

export default defineType({
  name: 'mediaBlock',
  title: 'Media',
  type: 'object',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      title: "Background Type",
      name: "backgroundType",
      type: "string",
      options: {
        list: [
          { title: "Image", value: "image" },
        ],
      },
      initialValue: 'image',
    }),
    defineField({
      title: "Background Width",
      name: "backgroundWidth",
      type: "string",
      options: {
        list: [
          { title: "Full-width", value: "full" },
          { title: "Contained", value: "contained" },
        ],
      },
      initialValue: 'full',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      fields: [
        defineField({
          name: 'altText',
          title: 'Alternative Text',
          type: 'string'
        }),
      ],
      hidden: ({ parent }) => parent?.backgroundType !== 'image',
    }),
    defineField({
      title: "Overlay Type",
      name: "overlayType",
      type: "string",
      options: {
        list: [
          { title: "None", value: "none" },
          { title: "Dark", value: "dark" },
        ],
      },
      initialValue: 'none',
    }),
    defineField({
      name: 'anchorId',
      title: 'Anchor ID',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'image.altText',
      media: '',
    },
    prepare(selection) {
      const { title } = selection
      return {
        title: title ?? 'No title set. Add one inside this block',
        subtitle: 'Media',
        media: Image,
      }
    },
  },
})