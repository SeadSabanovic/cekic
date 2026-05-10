import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import Container from '@/components/global/container';
import PortableText from '@/components/shared/portable-text';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  fetchRoadmapHubBySlug,
  fetchRoadmapHubSummaries,
  type RoadmapSectionPortable,
} from '@/sanity/lib/queries/roadmap';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string; sectionSlug: string }>;
};

export async function generateStaticParams() {
  const hubs = await fetchRoadmapHubSummaries();
  const entries = await Promise.all(
    hubs.map(async (hub) => {
      const full = await fetchRoadmapHubBySlug(hub.slug);
      return (full?.sections ?? []).map((section) => ({
        slug: hub.slug,
        sectionSlug: section.slug,
      }));
    })
  );
  return entries.flat();
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug, sectionSlug } = await params;
  const hub = await fetchRoadmapHubBySlug(slug);
  const section = hub?.sections?.find((s) => s.slug === sectionSlug);
  if (!section) return { title: 'Putokaz' };
  return {
    title: `${section.title} · ${hub?.title ?? 'Putokaz'}`,
    description: section.lead?.trim() || hub?.lead?.trim() || undefined,
  };
}

function hasPortableBody(body: RoadmapSectionPortable | null | undefined) {
  return Array.isArray(body) && body.length > 0;
}

export default async function RoadmapSectionPage({ params }: PageProps) {
  const { slug, sectionSlug } = await params;
  const hub = await fetchRoadmapHubBySlug(slug);
  if (!hub) notFound();

  const sections = hub.sections ?? [];
  const i = sections.findIndex((s) => s.slug === sectionSlug);
  if (i === -1) notFound();
  const section = sections[i]!;
  const prev = i > 0 ? sections[i - 1]! : null;
  const next = i < sections.length - 1 ? sections[i + 1]! : null;

  return (
    <div className="pattern-bg px-4 xl:px-10">
      <Container className="border-x border-dashed px-4 pt-28 pb-16 md:pt-36 md:pb-24">
        <nav
          className="text-sm text-muted-foreground"
          aria-label="Put navigacije"
        >
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link href="/putokazi" className="hover:text-foreground">
                Putokazi
              </Link>
            </li>
            <li aria-hidden className="text-border">
              /
            </li>
            <li>
              <Link
                href={`/putokazi/${hub.slug}`}
                className="hover:text-foreground"
              >
                {hub.title}
              </Link>
            </li>
            <li aria-hidden className="text-border">
              /
            </li>
            <li className="font-medium text-foreground">{section.title}</li>
          </ol>
        </nav>

        <h1 className="mt-8 max-w-3xl text-3xl font-semibold tracking-tight text-balance md:text-4xl">
          {section.title}
        </h1>
        {section.lead?.trim() ? (
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {section.lead}
          </p>
        ) : null}

        {hasPortableBody(section.body) ? (
          <div className="mt-10 max-w-2xl">
            <PortableText value={section.body!} />
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sadržaj poglavlja možeš dodati u Sanity polju „Sadržaj” (Portable
            Text).
          </p>
        )}

        <div className="mt-12 flex flex-col gap-3 border-t border-dashed pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            {prev ? (
              <Link
                href={`/putokazi/${hub.slug}/${prev.slug}`}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'group/prev inline-flex max-w-full items-center gap-2 whitespace-normal'
                )}
              >
                <ArrowLeft
                  className="size-4 shrink-0 transition-transform duration-200 group-hover/prev:-translate-x-0.5"
                  aria-hidden
                />
                <span className="min-w-0 wrap-break-word">{prev.title}</span>
              </Link>
            ) : null}
            {next ? (
              <Link
                href={`/putokazi/${hub.slug}/${next.slug}`}
                className={cn(
                  buttonVariants({ variant: 'default', size: 'lg' }),
                  'group/next inline-flex max-w-full items-center gap-2 whitespace-normal'
                )}
              >
                <span className="min-w-0 wrap-break-word">{next.title}</span>
                <ArrowRight
                  className="size-4 shrink-0 transition-transform duration-200 group-hover/next:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            ) : null}
          </div>
          <Link
            href={`/putokazi/${hub.slug}`}
            className={cn(
              buttonVariants({ variant: 'outline', size: 'lg' }),
              'sm:ml-auto'
            )}
          >
            Sadržaj (sve)
          </Link>
        </div>
      </Container>
    </div>
  );
}
