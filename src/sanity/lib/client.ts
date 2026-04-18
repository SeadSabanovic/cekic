import { createClient } from 'next-sanity';
import { apiVersion, dataset, projectId } from './api';

/**
 * Javni čitač CMS-a. Bez `perspective: 'published'` — na mnogim projektima taj
 * mod prazni odgovor bez posebnog Content Lake podešavanja. Nacrte isključujemo
 * u GROQ-u (`!(_id in path("drafts.**"))`). Za privatni dataset postavi
 * `SANITY_API_READ_TOKEN` u okruženju.
 */
export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: process.env.NODE_ENV === 'production',
  token: process.env.SANITY_API_READ_TOKEN,
});
