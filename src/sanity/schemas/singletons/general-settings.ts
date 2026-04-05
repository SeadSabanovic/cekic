import { fieldsets } from "../misc/fieldsets";
import { defineField, defineType } from "sanity";
import { fieldGroups } from "../misc/field-groups";

export default defineType({
  name: 'generalSettings',
  title: 'General Settings',
  type: 'document',
  fieldsets: [ ...fieldsets ],
  groups: [ ...fieldGroups ],
  fields: [
    defineField({
      name: "siteTitle",
      type: "string",
      title: "Site Title",
    }),
    defineField({
      title: 'Logo',
      name: 'siteLogo',
      type: 'image',
    }),
    defineField({
      title: 'Email Address',
      name: 'companyEmailAddress',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      title: 'Phone Number',
      name: 'companyPhoneNumber',
      type: 'string',
      group: 'companyDetails'
    }),
    defineField({
      name: 'companySocialMediaLinks',
      title: 'Social Media Links',
      type: 'array',
      group: 'companyDetails',
      of: [{
        type: 'object',
        fields: [
          defineField({
            name: 'title',
            title: 'Platform Name',
            type: 'string',
          }),
          defineField({
            name: 'profileUrl',
            title: 'Profile URL',
            type: 'url',
          }),
          defineField({
            name: 'icon',
            title: 'Icon',
            type: 'image',
          }),
        ]
      }]
    }),
    defineField({
      name: "copyright",
      type: "string",
      title: "Copyright",
      description: 'Current year and © symbol will be added automatically.'
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'General Settings',
      }
    },
  },
})