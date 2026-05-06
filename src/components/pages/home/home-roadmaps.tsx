import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { putokazListItemToRoadmapItem } from '@/lib/putokaz-to-roadmap-item';
import { roadmapHubSummaryToRoadmapItem } from '@/lib/roadmap-hub-to-roadmap-item';
import { fetchRoadmapHubSummaries } from '@/sanity/lib/queries/roadmap';
import { fetchPutokaziList } from '@/sanity/lib/queries/putokaz-list';

export const revalidate = 60;

export default async function HomeRoadmapsSection() {
  const [putokazi, hubovi] = await Promise.all([
    fetchPutokaziList('putokazi', { trade: 'sve' }),
    fetchRoadmapHubSummaries(),
  ]);

  const cards = [
    ...hubovi.map(roadmapHubSummaryToRoadmapItem),
    ...putokazi.map(putokazListItemToRoadmapItem),
  ].sort((a, b) => a.title.localeCompare(b.title, 'bs'));
  const previewCards =
    cards.length > 0 && cards.length < 5
      ? Array.from({ length: 5 }, (_, i) => cards[i % cards.length])
      : cards;

  return (
    <section className="border-t border-dashed">
      <Container
        className="border-x px-6 md:px-10"
        paddingTop="default"
        paddingBottom="default"
      >
        <div>
          <Heading tag="h2" size="xl">
            Istraži tražena zanimanja
          </Heading>
          <p className="mt-4 max-w-3xl text-balance text-muted-foreground md:text-lg">
            Odaberi profesiju koja ti najviše odgovara i kreni sa učenjem već
            danas.
          </p>
          <div className="group mt-8 w-fit">
            <Link
              href="/putokazi"
              className={cn(
                buttonVariants({ variant: 'default', size: 'lg' }),
                'inline-flex items-center gap-2'
              )}
            >
              <span>Kreni učiti</span>
              <ArrowRight
                className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </div>
        {previewCards.length > 0 ? (
          <div className="relative -mx-6 mt-10 overflow-hidden md:-mx-10">
            <Carousel
              opts={{ align: 'start', loop: previewCards.length > 3 }}
              className="relative w-full px-6 md:px-10"
            >
              <CarouselContent className="overflow-visible!">
                {previewCards.map((map, idx) => (
                  <CarouselItem
                    key={`${map.listSource ?? 'putokaz'}-${map.id}-${idx}`}
                    className="basis-[78%] pl-4 sm:basis-[60%] lg:basis-1/3"
                  >
                    <article className="group relative h-[360px] overflow-hidden rounded-2xl border border-border/60 bg-muted/20">
                      {map.cover?.url ? (
                        <Image
                          src={map.cover.url}
                          alt={map.cover.alt}
                          fill
                          sizes="(max-width: 640px) 82vw, 300px"
                          className="size-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center bg-linear-to-b from-muted/80 to-muted">
                          <map.icon className="size-12 text-muted-foreground" />
                        </div>
                      )}

                      <Link
                        href={`/putokazi/${map.id}`}
                        className="absolute inset-0 z-10 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                        aria-label={`Otvori putokaz: ${map.title}`}
                      />

                      <div className="absolute inset-x-0 top-0 z-20 flex items-start justify-between p-4 text-white">
                        <div className="max-w-[80%]">
                          <p className="line-clamp-1 text-sm font-semibold tracking-tight">
                            {map.title}
                          </p>
                          <p className="mt-0.5 text-xs text-white/80">
                            @{map.id}
                          </p>
                        </div>
                      </div>

                      <div className="absolute inset-x-0 bottom-0 z-20 p-4 text-white">
                        <div className="flex items-center justify-between gap-2">
                          <span className="line-clamp-1 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-medium backdrop-blur-sm">
                            {map.tradeLabel ?? 'Putokaz'}
                          </span>
                        </div>
                      </div>
                    </article>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4 hidden md:flex" />
              <CarouselNext className="right-4 hidden md:flex" />
            </Carousel>
          </div>
        ) : (
          <p className="mt-10 max-w-2xl text-muted-foreground">
            Još nema putokaza u studiju. Dodaj dokument tipa „Putokaz” ili
            „Roadmap Hub” u Sanityju pa će se ovdje pojaviti automatski.
          </p>
        )}
      </Container>
    </section>
  );
}
