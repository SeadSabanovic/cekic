import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import HeroBlock from '@/components/blocks/hero-block';
import Container from '@/components/global/container';
import { RoadmapSectionBreadcrumb } from '@/components/pages/putokazi/roadmap-section-breadcrumb';
import { RoadmapSectionContent } from '@/components/pages/putokazi/roadmap-section-content';
import {
  SectionPageTocMobile,
  SectionPageTocSidebar,
} from '@/components/pages/putokazi/section-page-toc';
import { buttonVariants } from '@/components/ui/button';
import {
  flattenSectionPortableText,
  hasSectionContent,
} from '@/lib/roadmap-section-content';
import { extractPortableTextHeadings } from '@/lib/portable-text-headings';
import { cn } from '@/lib/utils';
import {
  fetchRoadmapHubBySlug,
  fetchRoadmapHubSummaries,
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

  const flatPortable = flattenSectionPortableText(section);
  const headings = extractPortableTextHeadings(flatPortable);
  const showToc = headings.length > 0;
  const tocIntro = section.lead?.trim() || undefined;
  const hasContent = hasSectionContent(section);

  return (
    <>
      <HeroBlock
        breadcrumb={
          <RoadmapSectionBreadcrumb
            hubTitle={hub.title}
            hubSlug={hub.slug}
            sectionTitle={section.title}
          />
        }
        heading={section.title}
        body={
          section.lead?.trim() ? (
            <p className="leading-relaxed">{section.lead}</p>
          ) : null
        }
      />

      <div className="pattern-bg px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-16 md:py-24">
          {showToc ? <SectionPageTocMobile headings={headings} /> : null}

          <div
            className={cn(
              showToc &&
                'grid gap-8 lg:grid-cols-[minmax(0,1fr)_min(10rem,28%)] xl:grid-cols-[minmax(0,1fr)_10rem] xl:gap-12'
            )}
          >
            <div className="min-w-0">
              {hasContent ? (
                <RoadmapSectionContent
                  blocks={section.content}
                  imageAltFallback={section.title}
                />
              ) : (
                <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Sadržaj poglavlja dodaj u Sanityju: „Sadržaj stranice” → blok
                  „Tekst” ili „Slika” (možeš dodati više blokova).
                </p>
              )}

              <div className="mt-12 flex flex-col gap-3 border-t border-dashed pt-10 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between">
                <div className="flex flex-wrap items-center gap-3">
                  {prev ? (
                    <Link
                      href={`/karijerni-putokazi/${hub.slug}/${prev.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'default', size: 'lg' }),
                        'group/prev inline-flex max-w-full items-center gap-2 whitespace-normal'
                      )}
                    >
                      <ArrowLeft
                        className="size-4 shrink-0 transition-transform duration-200 group-hover/prev:-translate-x-0.5"
                        aria-hidden
                      />
                      <span className="min-w-0 wrap-break-word">
                        {prev.title}
                      </span>
                    </Link>
                  ) : null}
                  {next ? (
                    <Link
                      href={`/karijerni-putokazi/${hub.slug}/${next.slug}`}
                      className={cn(
                        buttonVariants({ variant: 'default', size: 'lg' }),
                        'group/next inline-flex max-w-full items-center gap-2 whitespace-normal'
                      )}
                    >
                      <span className="min-w-0 wrap-break-word">
                        {next.title}
                      </span>
                      <ArrowRight
                        className="size-4 shrink-0 transition-transform duration-200 group-hover/next:translate-x-0.5"
                        aria-hidden
                      />
                    </Link>
                  ) : null}
                </div>
                <Link
                  href={`/karijerni-putokazi/${hub.slug}`}
                  className={cn(
                    buttonVariants({ variant: 'outline', size: 'lg' }),
                    'sm:ml-auto'
                  )}
                >
                  Sadržaj (sve)
                </Link>
              </div>
            </div>

            {showToc ? (
              <SectionPageTocSidebar headings={headings} intro={tocIntro} />
            ) : null}
          </div>
        </Container>
      </div>
    </>
  );
}
