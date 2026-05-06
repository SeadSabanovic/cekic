import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Container from '@/components/global/container';
import { Button } from '@/components/ui/button';
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

const bodyComponents: PortableTextComponents = {
  block: {
    normal: ({ children }) => (
      <p className="mt-4 max-w-2xl text-base leading-relaxed text-neutral-700 first:mt-0 md:text-lg">
        {children}
      </p>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-semibold text-foreground">{children}</strong>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="mt-4 list-disc space-y-2 pl-6 text-neutral-700 md:text-lg">
        {children}
      </ul>
    ),
    number: ({ children }) => (
      <ol className="mt-4 list-decimal space-y-2 pl-6 text-neutral-700 md:text-lg">
        {children}
      </ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
};

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
            <PortableText value={section.body!} components={bodyComponents} />
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
            Sadržaj poglavlja možeš dodati u Sanity polju „Sadržaj” (Portable
            Text).
          </p>
        )}

        <div className="mt-12 flex flex-col gap-3 border-t border-dashed pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            {prev ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/putokazi/${hub.slug}/${prev.slug}`}>
                  ← {prev.title}
                </Link>
              </Button>
            ) : (
              <span />
            )}
            {next ? (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/putokazi/${hub.slug}/${next.slug}`}>
                  {next.title} →
                </Link>
              </Button>
            ) : null}
          </div>
          <Button variant="ghost" size="sm" className="sm:ml-auto" asChild>
            <Link href={`/putokazi/${hub.slug}`}>Sadržaj (sve)</Link>
          </Button>
        </div>
      </Container>
    </div>
  );
}
