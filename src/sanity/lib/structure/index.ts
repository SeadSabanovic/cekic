import type { StructureBuilder, StructureResolver, StructureResolverContext } from "sanity/structure";
import { SettingsItem } from "./items/settings-item";
import { PagesItem } from "./items/pages-item";
import { BlogItem } from "./items/blog-item";
export const structure: StructureResolver = (
  S: StructureBuilder, 
  context: StructureResolverContext
) => (
  S.list()
    .title('Content')
    .items([
      S.divider(),
      SettingsItem(S),
      S.divider(),
      PagesItem(S),
      S.divider(),
      BlogItem(S, context),
      S.divider(),
    ])
)