import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import { PageBuilder } from '@/components/page-builder';
import { pageBySlugQuery, pageSlugsQuery } from '@/sanity/lib/queries/documents/page';
import type { PageBySlugQueryResult, PageSlugsQueryResult } from '../../../../sanity.types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data: pages } = await sanityFetch<PageSlugsQueryResult>({
    query: pageSlugsQuery,
  });
  return pages ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: page } = await sanityFetch<PageBySlugQueryResult | null>({
    query: pageBySlugQuery,
    params: await params,
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
}

export default async function Page({ params }: PageProps) {
  const { data: page } = await sanityFetch<PageBySlugQueryResult | null>({ 
    query: pageBySlugQuery, 
    params: await params,
  });

  if (page === null) notFound();

  return (
    <PageBuilder pageBuilder={page?.pageBuilder ?? []} />
  )
}