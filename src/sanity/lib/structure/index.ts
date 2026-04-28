import type { StructureResolver } from 'sanity/structure';

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Sadržaj')
    .items([
      S.listItem()
        .title('Putokazi')
        .child(
          S.documentList()
            .title('Putokazi')
            .id('putokazi-sadrzaj')
            .filter(
              `(_type == "roadmap") || (_type == "putokaz" && (!defined(sekcija) || sekcija == "putokazi"))`
            )
            .defaultOrdering([{ field: 'title', direction: 'asc' }])
        ),
      S.listItem()
        .title('Projekti')
        .schemaType('putokaz')
        .child(
          S.documentList()
            .title('Projekti')
            .schemaType('putokaz')
            .filter(`_type == "putokaz" && sekcija == "projekti"`)
        ),
    ]);
