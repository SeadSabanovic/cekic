export const token = process.env.SANITY_API_READ_TOKEN;

if (!token) {
  throw new Error(
    'Missing SANITY_API_READ_TOKEN. Copy .env.example to .env.local and add a read token (Viewer) from sanity.io/manage → API → Tokens.',
  );
}