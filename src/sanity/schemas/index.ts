import type { SchemaTypeDefinition } from 'sanity';

import example from './documents/example';

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [example],
};
