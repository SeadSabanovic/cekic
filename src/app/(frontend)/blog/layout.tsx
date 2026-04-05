import React from 'react';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import BlogLayout from './_components/blog-layout';
import { blogPageQuery } from '@/sanity/lib/queries/documents/post';
import type { BlogPageQueryResult } from '../../../../sanity.types';

export default async function BlogArchiveLayout({ children }: {
  children: React.ReactNode;
}) {
  
  const { data: page } = await sanityFetch<BlogPageQueryResult | null>({
    query: blogPageQuery,
  });

  return (
    <BlogLayout page={page}>
      {children}
    </BlogLayout>
  )
}