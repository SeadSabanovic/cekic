import { Metadata } from 'next';
import { processMetadata } from '@/lib/utils';
import PostGrid from './_components/post-grid';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import { allPostsQuery, blogPageQuery } from '@/sanity/lib/queries/documents/post';
import type { AllPostsQueryResult, BlogPageQueryResult } from '../../../../sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch<BlogPageQueryResult | null>({
    query: blogPageQuery,
  });

  if (!page) { return {} };

  return processMetadata({ data: page as BlogPageQueryResult });
}

export default async function BlogArchivePage() {
  const { data: posts } = await sanityFetch<AllPostsQueryResult | null>({
    query: allPostsQuery,
  });

  return (
    <PostGrid posts={posts ?? []} />
  )
}