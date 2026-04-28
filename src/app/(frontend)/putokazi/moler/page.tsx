import type { Metadata } from 'next';
import Link from 'next/link';
import HeroBlock from '@/components/blocks/hero-block';
import Container from '@/components/global/container';
import { MOLER_ROADMAP_SLUG } from '@/lib/roadmap-public';
import { cn } from '@/lib/utils';
import { fetchRoadmapHubBySlug } from '@/sanity/lib/queries/roadmap';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const hub = await fetchRoadmapHubBySlug(MOLER_ROADMAP_SLUG);
  if (!hub) {
    return { title: 'Moler' };
  }
  return {
    title: hub.title,
    description: hub.lead?.trim() || undefined,
  };
}

export default async function MolerHubPage() {
  const hub = await fetchRoadmapHubBySlug(MOLER_ROADMAP_SLUG);

  if (!hub) {
    return (
      <div className="pattern-bg px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-24">
          <p className="max-w-2xl text-muted-foreground">
            U Sanity studiju još nema dokumenta tipa „Mapa puta (hub)” sa slugom{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              {MOLER_ROADMAP_SLUG}
            </code>
            . Kreiraj ga ili uvezi seed (vidi{' '}
            <code className="rounded bg-muted px-1.5 py-0.5 text-sm">
              src/sanity/seed/roadmap-moler.ndjson
            </code>
            ).
          </p>
        </Container>
      </div>
    );
  }

  const sections = hub.sections ?? [];

  return (
    <>
      <HeroBlock
        heading={hub.title}
        body={
          hub.lead?.trim() ? (
            <p className="leading-relaxed">{hub.lead}</p>
          ) : (
            <p className="leading-relaxed text-muted-foreground">
              Dodaj uvod u Sanity dokumentu mape puta.
            </p>
          )
        }
      />
      <div className="pattern-bg px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-16 md:py-24">
          <div className="mx-auto max-w-3xl">
            <h2 className="text-lg font-semibold tracking-tight text-foreground">
              Sadržaj
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Poglavlja dolaze iz CMS-a; redoslijed u studiju = redoslijed ovdje.
            </p>
            {sections.length === 0 ? (
              <p className="mt-8 text-sm text-muted-foreground">
                Nema poglavlja — u dokumentu dodaj barem jedno poglavlje u polju
                „Poglavlja”.
              </p>
            ) : (
              <nav
                className="mt-8 border border-dashed border-border/80 bg-background/40"
                aria-label="Sadržaj puta moler"
              >
                <ol className="divide-y divide-dashed divide-border/80">
                  {sections.map((section, index) => (
                    <li key={section._key}>
                      <Link
                        href={`/putokazi/moler/${section.slug}`}
                        className={cn(
                          'group flex gap-4 px-4 py-4 transition-colors',
                          'hover:bg-muted/40 focus-visible:bg-muted/40 focus-visible:outline-none'
                        )}
                      >
                        <span
                          className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dashed border-border text-sm font-medium text-muted-foreground tabular-nums group-hover:border-foreground/30 group-hover:text-foreground"
                          aria-hidden
                        >
                          {index + 1}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-medium text-foreground group-hover:underline">
                            {section.title}
                          </span>
                          {section.lead?.trim() ? (
                            <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">
                              {section.lead}
                            </span>
                          ) : null}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ol>
              </nav>
            )}
          </div>
        </Container>
      </div>
    </>
  );
}
