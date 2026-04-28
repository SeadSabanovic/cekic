import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { schema } from '@/sanity/schemas';
import { structure } from '@/sanity/lib/structure';
import {
  apiVersion,
  dataset,
  projectId,
  studioUrl,
  useCdn,
} from '@/sanity/lib/api';

const config = defineConfig({
  title: process.env.NEXT_PUBLIC_SITE_NAME ?? 'Studio',
  useCdn,
  dataset,
  basePath: studioUrl,
  projectId,
  apiVersion,
  plugins: [structureTool({ structure })],
  schema,
});

export default config;
