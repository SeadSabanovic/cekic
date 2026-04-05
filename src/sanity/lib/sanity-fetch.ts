import { client } from "./client";

export async function sanityFetch<TResult>(options: {
  query: string;
  params?: Record<string, unknown>;
}): Promise<{ data: TResult }> {
  const { query, params } = options;
  const data = await client.fetch<TResult>(query, params ?? {});
  return { data };
}
