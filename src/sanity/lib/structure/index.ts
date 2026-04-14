import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sadržaj')
    .items([
      S.listItem()
        .title('Primjeri')
        .schemaType('example')
        .child(S.documentTypeList('example').title('Primjeri')),
    ]);
