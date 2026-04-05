import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import PostContent from '../_components/post-content';
import RelatedPosts from '../_components/related-posts';
import { postBySlugQuery, postSlugsQuery } from '@/sanity/lib/queries/documents/post';
import type { AllPostsQueryResult, PostBySlugQueryResult, PostSlugsQueryResult } from '../../../../../sanity.types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch<PostSlugsQueryResult>({
    query: postSlugsQuery,
  });
  return data ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: post } = await sanityFetch<PostBySlugQueryResult | null>({
    query: postBySlugQuery,
    params: await params,
  });

  if (!post) { return {} };

  return processMetadata({ data: post as PostBySlugQueryResult });
}

export default async function PostPage({ params }: PageProps) {
  const { data: post } = await sanityFetch<PostBySlugQueryResult | null>({ 
    query: postBySlugQuery, 
    params: await params
  });

  if (post === null) notFound();

  const showRelatedPosts = post?.relatedPosts && 
    post.relatedPosts.length > 0 && 
    post.settings?.showRelatedPosts;

  return (
    <>
      <PostContent post={post} />
      {showRelatedPosts && (
        <RelatedPosts posts={post.relatedPosts as AllPostsQueryResult} />
      )}
    </>
  )
}