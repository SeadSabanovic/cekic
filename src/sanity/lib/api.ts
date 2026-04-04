export const useCdn = false;
export const studioUrl = '/studio';

const envHint =
  ' Copy .env.example to .env.local and set your Sanity project values (see README).';

export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  'Missing environment variable: NEXT_PUBLIC_SANITY_DATASET.' + envHint,
);

export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  'Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID.' + envHint,
);

export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-04-16';

function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined || v === '') {
    throw new Error(errorMessage);
  }
  return v;
}