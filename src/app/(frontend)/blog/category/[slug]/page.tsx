import { Metadata } from 'next';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import PostGrid from '../../_components/post-grid';
import {
  postCategoryBySlugQuery,
  postCategorySlugsQuery,
  postsByCategoryQuery,
} from '@/sanity/lib/queries/documents/post';
import type {
  PostCategoryBySlugQueryResult,
  PostCategorySlugsQueryResult,
  PostsByCategoryQueryResult,
} from '../../../../../../sanity.types';
import { CircleSlash } from 'lucide-react';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch<PostCategorySlugsQueryResult>({
    query: postCategorySlugsQuery,
  });
  return data ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {

  const { data: category } = await sanityFetch<PostCategoryBySlugQueryResult | null>({
    query: postCategoryBySlugQuery,
    params: await params,
  });

  if (!category) { return {} };

  return {
    title: `${category?.title} Posts`,
    description: `Browse our collection of ${category?.title?.toLowerCase()} posts.`
  }
}

export default async function PostsByCategoryPage(props: {
  params: Promise<{ slug: string }>
}) {

  const params = await props.params;

  const { data: posts } = await sanityFetch<PostsByCategoryQueryResult | null>({ 
    query: postsByCategoryQuery, 
    params: params
  });

  if (!posts?.length) {
    return (
      <div className="py-20 flex items-center justify-center gap-2 border border-dashed rounded-3xl text-center text-gray-600 bg-white">
        <CircleSlash size={20} className='text-red-500' /> <span className='font-medium antialiased'>No posts found in this category.</span>
      </div>
    )
  }

  return (
    <PostGrid posts={posts ?? []} />
  )
}