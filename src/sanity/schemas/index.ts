import type { SchemaTypeDefinition } from 'sanity';

import putokaz from './documents/putokaz';
import roadmap from './documents/roadmap';
import roadmapSection from './objects/roadmap-section';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roadmapSection, roadmap, putokaz],
};
