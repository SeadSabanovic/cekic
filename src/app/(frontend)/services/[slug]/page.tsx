import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { processMetadata } from '@/lib/utils';
import { sanityFetch } from '@/sanity/lib/sanity-fetch';
import { PageBuilder } from '@/components/page-builder';
import { serviceBySlugQuery, serviceSlugsQuery } from '@/sanity/lib/queries/documents/service';
import type { ServiceBySlugQueryResult, ServiceSlugsQueryResult } from '../../../../../sanity.types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { data } = await sanityFetch<ServiceSlugsQueryResult>({
    query: serviceSlugsQuery,
  });
  return data ?? [];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { data: service } = await sanityFetch<ServiceBySlugQueryResult | null>({
    query: serviceBySlugQuery,
    params: await params,
  });

  if (!service) { return {} };

  return processMetadata({ data: service});
}

export default async function ServicePage({ params }: PageProps) {
  const { data: service } = await sanityFetch<ServiceBySlugQueryResult | null>({ 
    query: serviceBySlugQuery, 
    params: await params
  });
  
  if (service === null) notFound();

  return (
    <PageBuilder pageBuilder={service?.pageBuilder ?? []} />
  )
}