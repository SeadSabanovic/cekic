import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { unstable_noStore as noStore } from 'next/cache';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  ChevronDown,
  Clock3,
  TrendingUp,
  type LucideIcon,
} from 'lucide-react';
import Container from '@/components/global/container';
import HeroBlock from '@/components/blocks/hero-block';
import Heading from '@/components/shared/heading';
import HubEarningsRangeChart from '@/components/pages/putokazi/hub-earnings-range-chart';
import {
  HubPageTocMobile,
  HubPageTocSidebar,
} from '@/components/pages/putokazi/hub-page-toc';
import PortableText from '@/components/shared/portable-text';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { resolvePutokazCover } from '@/lib/putokaz-cover';
import {
  fetchRoadmapHubBySlug,
  fetchRoadmapHubSummaries,
} from '@/sanity/lib/queries/roadmap';
import {
  fetchPutokazBySlug,
  fetchPutokaziSlugs,
} from '@/sanity/lib/queries/putokaz-list';
import type { RoadmapHubStats } from '@/sanity/lib/queries/roadmap';

export const revalidate = 60;

type PageProps = {
  params: Promise<{ slug: string }>;
};

type HubStatItem = {
  label: string;
  value: string;
  icon: LucideIcon;
};

const defaultHubTimeDemandStats: HubStatItem[] = [
  { label: 'Vrijeme', value: '--', icon: Clock3 },
  { label: 'Potražnja', value: '--', icon: TrendingUp },
];

/** Stat kartice ispod raspona zarade (bez „Zarade” — ona je u grafikonu). */
function getHubTimeDemandStats(stats?: RoadmapHubStats | null): HubStatItem[] {
  if (!stats) return defaultHubTimeDemandStats;
  return [
    { label: 'Vrijeme', value: stats.vrijeme?.trim() || '--', icon: Clock3 },
    {
      label: 'Potražnja',
      value: stats.potraznja?.trim() || '--',
      icon: TrendingUp,
    },
  ];
}

export async function generateStaticParams() {
  const [putokaziSlugs, hubs] = await Promise.all([
    fetchPutokaziSlugs(),
    fetchRoadmapHubSummaries(),
  ]);
  const set = new Set<string>([...putokaziSlugs, ...hubs.map((h) => h.slug)]);
  return Array.from(set).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const hub = await fetchRoadmapHubBySlug(slug);
  if (hub) {
    const description = hub.lead?.trim() || undefined;
    const cover = resolvePutokazCover(
      { title: hub.title, coverImage: hub.coverImage },
      { w: 1200, h: 630 }
    );
    return {
      title: hub.title,
      description,
      openGraph: {
        title: hub.title,
        description,
        ...(cover
          ? {
              images: [
                {
                  url: cover.url,
                  alt: cover.alt,
                  width: 1200,
                  height: 630,
                },
              ],
            }
          : {}),
      },
    };
  }
  const doc = await fetchPutokazBySlug(slug);
  if (!doc) return { title: 'Putokaz' };
  const description = doc.lead?.trim() || undefined;
  const cover = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 1200, h: 630 }
  );
  return {
    title: doc.title,
    description,
    openGraph: {
      title: doc.title,
      description,
      ...(cover
        ? {
            images: [
              {
                url: cover.url,
                alt: cover.alt,
                width: 1200,
                height: 630,
              },
            ],
          }
        : {}),
    },
  };
}

export default async function PutokazDetailPage({ params }: PageProps) {
  noStore();
  const { slug } = await params;
  const hub = await fetchRoadmapHubBySlug(slug);
  if (hub) {
    const sections = hub.sections ?? [];
    const timeDemandStats = getHubTimeDemandStats(hub.stats);
    const hubCover = resolvePutokazCover(
      { title: hub.title, coverImage: hub.coverImage },
      { w: 1400, h: 800 }
    );
    return (
      <>
        {/* Hero Block */}
        <HeroBlock
          heading={hub.title}
          body={
            hub.lead?.trim() ? (
              <p className="leading-relaxed">{hub.lead}</p>
            ) : (
              <p className="leading-relaxed text-muted-foreground">
                Dodaj uvod u Sanity dokumentu hub mape puta.
              </p>
            )
          }
          {...(hubCover
            ? {
                mediaType: 'image' as const,
                bottomCornerRadius: 'rounded' as const,
                image: {
                  src: hubCover.url,
                  alt: hubCover.alt,
                  short: false,
                },
              }
            : {})}
        />

        <Container
          paddingTop="medium"
          paddingBottom="default"
          className="border-x border-t border-dashed"
        >
          <HubPageTocMobile />
          <div className="mt-6 grid gap-8 lg:mt-0 lg:grid-cols-[minmax(0,1fr)_min(10rem,28%)] xl:grid-cols-[minmax(0,1fr)_10rem] xl:gap-12">
            <div className="min-w-0 space-y-0">
              <section
                id="brzi-podaci"
                className="scroll-mt-28 pb-8 md:pb-10"
                aria-label="Brzi podaci"
              >
                <HubEarningsRangeChart
                  earningsByRegion={hub.stats?.earningsByRegion}
                />
                <div className="mt-4 grid gap-4 md:grid-cols-2">
                  {timeDemandStats.map((item) => (
                    <article
                      key={`${hub.slug}-${item.label}`}
                      className="rounded-xl border border-solid border-border/80 bg-background/60 p-5"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            {item.label}
                          </p>
                          <Heading
                            tag="h2"
                            size="xs"
                            className="mt-2 leading-tight text-foreground md:text-xl"
                          >
                            {item.value}
                          </Heading>
                        </div>
                        <span
                          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary"
                          aria-label={item.label}
                        >
                          <item.icon className="size-4" aria-hidden />
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </section>

              <section
                id="o-zanimanju"
                className="scroll-mt-28 border-t border-dashed border-border/80 pt-8 pb-10 md:pt-10 md:pb-14"
                aria-labelledby="about-occupation-heading"
              >
                <div className="grid grid-cols-12 gap-3 pt-2 md:gap-6 md:pt-0 xl:gap-14">
                  <div className="col-span-12 lg:col-span-4">
                    <Heading
                      id="about-occupation-heading"
                      tag="h2"
                      size="xl"
                      className="leading-tight text-balance md:max-w-160 lg:sticky lg:top-28 lg:z-10 lg:bg-background lg:py-1"
                    >
                      O zanimanju
                    </Heading>
                  </div>
                  <div className="col-span-12 min-w-0 lg:col-span-8">
                    {Array.isArray(hub.aboutOccupation) &&
                    hub.aboutOccupation.length > 0 ? (
                      <div>
                        <PortableText value={hub.aboutOccupation} />
                      </div>
                    ) : (
                      <p className="mt-3 text-base leading-relaxed text-muted-foreground md:mt-0 md:text-lg">
                        Dodaj opis zanimanja u Sanity polju „O zanimanju”.
                      </p>
                    )}
                  </div>
                </div>
              </section>

              <section
                id="karijerni-putokaz"
                className="scroll-mt-28 border-t border-dashed border-border/80 pt-8 md:pt-10"
                aria-labelledby="career-roadmap-heading"
              >
                <div className="grid grid-cols-12 gap-3 pt-2 md:gap-6 md:pt-0 xl:gap-14">
                  <div className="col-span-12 lg:col-span-4">
                    <Heading
                      id="career-roadmap-heading"
                      tag="h2"
                      size="xl"
                      className="leading-tight text-balance md:max-w-160 lg:sticky lg:top-28 lg:z-10 lg:bg-background lg:py-1"
                    >
                      Karijerni putokaz
                    </Heading>
                  </div>
                  <div className="col-span-12 min-w-0 lg:col-span-8">
                    {sections.length === 0 ? (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:mt-0 md:text-base">
                        Nema poglavlja — u dokumentu dodaj barem jedno poglavlje
                        u polju „Poglavlja”.
                      </p>
                    ) : (
                      <nav
                        className="mt-3 border-border/80 md:mt-0"
                        aria-label="Sadržaj mape puta"
                      >
                        <ol className="flex flex-col">
                          {sections.map((section, index) => {
                            const isLast = index === sections.length - 1;
                            return (
                              <li
                                key={section._key}
                                id={`poglavlje-${section.slug}`}
                                className="scroll-mt-28 border-b border-dashed border-border/70 py-8 last:border-b-0 sm:py-10"
                              >
                                <div className="flex gap-4">
                                  <div className="flex w-10 shrink-0 flex-col items-center">
                                    <div
                                      aria-hidden
                                      className="-mb-px h-8 w-0 shrink-0 self-center border-l-2 border-dotted border-primary/45"
                                    />
                                    <span
                                      className="relative z-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-dashed border-border bg-background text-sm font-medium text-muted-foreground tabular-nums"
                                      aria-hidden
                                    >
                                      {index + 1}
                                    </span>
                                    {!isLast ? (
                                      <>
                                        <ChevronDown
                                          className="my-1 size-4 shrink-0 text-primary/50"
                                          aria-hidden
                                          strokeWidth={2.25}
                                        />
                                        <div
                                          aria-hidden
                                          className="min-h-8 w-0 flex-1 shrink-0 self-center border-l-2 border-dotted border-primary/45"
                                        />
                                      </>
                                    ) : null}
                                  </div>
                                  <div className="flex min-h-0 min-w-0 flex-1 flex-col gap-3 self-stretch sm:pt-8">
                                    <Link
                                      href={`/karijerni-putokazi/${hub.slug}/${section.slug}`}
                                      className={cn(
                                        buttonVariants({
                                          variant: 'default',
                                          size: 'lg',
                                        }),
                                        'group/section inline-flex w-fit max-w-full items-center gap-2 text-left whitespace-normal'
                                      )}
                                    >
                                      <span className="min-w-0 wrap-break-word">
                                        {section.title}
                                      </span>
                                      <ArrowRight
                                        className="size-4 shrink-0 transition-transform duration-200 group-hover/section:translate-x-0.5"
                                        aria-hidden
                                      />
                                    </Link>
                                    {section.lead?.trim() ? (
                                      <p className="max-w-2xl text-base leading-relaxed text-pretty text-muted-foreground md:text-lg">
                                        {section.lead}
                                      </p>
                                    ) : null}
                                    <div className="mt-auto flex justify-end pt-1">
                                      <span
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-muted/25 px-2.5 py-1 text-xs text-muted-foreground tabular-nums md:text-sm"
                                        title="Procijenjeno vrijeme čitanja (ilustracija)"
                                      >
                                        <Clock3
                                          className="size-3.5 shrink-0 opacity-80"
                                          aria-hidden
                                        />
                                        <span className="font-medium">
                                          ~{4 + (index % 4)} min čitanja
                                        </span>
                                      </span>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            );
                          })}
                        </ol>
                      </nav>
                    )}
                  </div>
                </div>
              </section>
            </div>

            <HubPageTocSidebar
              roadmapChapters={sections.map((s) => ({
                id: `poglavlje-${s.slug}`,
                title: s.title,
              }))}
            />
          </div>
        </Container>
      </>
    );
  }

  const doc = await fetchPutokazBySlug(slug);
  if (!doc) notFound();

  const cover = resolvePutokazCover(
    { title: doc.title, coverImage: doc.coverImage },
    { w: 1920, h: 640 }
  );

  return (
    <div className="pattern-bg px-4 xl:px-10">
      <Container className="space-y-6 border-x border-dashed px-4 pt-32 pb-14 md:space-y-8 md:pt-40 md:pb-24">
        {cover ? (
          <div className="relative aspect-21/9 max-h-80 min-h-44 w-full overflow-hidden rounded-2xl border border-border/60 md:min-h-56">
            <Image
              src={cover.url}
              alt={cover.alt}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 1280px) 100vw, 90rem"
            />
          </div>
        ) : null}
        <Heading tag="h1" size="xxl" className="max-w-3xl text-balance">
          {doc.title}
        </Heading>
        {doc.lead?.trim() ? (
          <p className="max-w-3xl text-lg leading-relaxed text-balance text-neutral-600">
            {doc.lead}
          </p>
        ) : null}
        <p className="max-w-2xl text-sm text-muted-foreground">
          Koraci i detalji puta uskoro — ovo je početna stranica za sadržaj iz
          CMS-a.
        </p>
      </Container>
    </div>
  );
}
