import type { SchemaTypeDefinition } from 'sanity';

import putokaz from './documents/putokaz';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [putokaz],
};
