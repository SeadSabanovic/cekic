import type { SchemaTypeDefinition } from 'sanity';

import putokaz from './documents/putokaz';
import projekat from './documents/projekat';
import roadmap from './documents/roadmap';
import roadmapSection from './objects/roadmap-section';
import roadmapSectionPortableText from './objects/roadmap-section-portable-text';
import contentImage from './objects/content-image';
import horizontalRule from './objects/horizontal-rule';
import hubStatsBar from './objects/hub-stats-bar';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    horizontalRule,
    hubStatsBar,
    roadmapSectionPortableText,
    contentImage,
    roadmapSection,
    roadmap,
    putokaz,
    projekat,
  ],
};
