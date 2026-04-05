import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import { PageBuilder } from '@/components/page-builder';
import { servicesPageQuery } from '@/sanity/lib/queries/documents/service';
import type { ServicesPageQueryResult } from '../../../../sanity.types';

export async function generateMetadata(): Promise<Metadata> {
  const { data: page } = await sanityFetch<ServicesPageQueryResult | null>({
    query: servicesPageQuery,
  });

  if (!page) { return {} };

  return processMetadata({ data: page });
}

export default async function ServicesPage() {

  const { data: page } = await sanityFetch<ServicesPageQueryResult | null>({
    query: servicesPageQuery,
  });

  if (page === null) notFound();

  return (
    <PageBuilder pageBuilder={page?.pageBuilder ?? []} />
  )
}