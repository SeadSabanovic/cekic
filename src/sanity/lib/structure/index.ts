import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sadržaj')
    .items([
      S.documentTypeListItem('roadmap').title('Karijerni putokazi'),
      S.listItem()
        .title('Projekti')
        .schemaType('projekat')
        .child(
          S.documentList()
            .title('Projekti')
            .schemaType('projekat')
            .filter(`_type == "projekat"`)
        ),
    ]);
