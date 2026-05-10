import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Clock3, Wallet } from 'lucide-react';

import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { Badge } from '@/components/ui/badge';
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
    fetchPutokaziList({ trade: 'sve' }),
    fetchRoadmapHubSummaries(),
  ]);

  const cards = [
    ...hubovi.map(roadmapHubSummaryToRoadmapItem),
    ...putokazi.map(putokazListItemToRoadmapItem),
  ].sort((a, b) => a.title.localeCompare(b.title, 'bs'));

  return (
    <section className="border-t border-dashed">
      <Container
        className="border-x px-6 md:px-10"
        paddingTop="default"
        paddingBottom="default"
      >
        <div>
          <Heading tag="h2" size="xl">
            Najtraženija zanimanja
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
        {cards.length > 0 ? (
          <div className="relative -mx-6 mt-10 md:-mx-10">
            <Carousel
              opts={{
                align: 'start',
                loop: false,
              }}
              className="relative w-full"
            >
              <CarouselContent className="px-6 md:px-10">
                {cards.map((map) => {
                  const locked = map.locked === true;
                  const cardMedia = (
                    <div className="relative aspect-5/4 w-full shrink-0 overflow-hidden rounded-2xl bg-muted/30">
                      {map.cover?.url ? (
                        <Image
                          src={map.cover.url}
                          alt={map.cover.alt}
                          fill
                          sizes="(max-width: 640px) 82vw, (max-width: 1024px) 45vw, 33vw"
                          loading="lazy"
                          className={cn(
                            'absolute inset-0 size-full rounded-2xl object-cover transition-transform duration-500',
                            !locked && 'group-hover:scale-[1.03]',
                            locked && 'opacity-60'
                          )}
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center bg-linear-to-b from-muted/80 to-muted">
                          <map.icon className="size-12 text-muted-foreground" />
                        </div>
                      )}
                      {locked ? (
                        <Badge
                          className="pointer-events-none absolute top-3 left-3 z-20 h-auto min-h-6 min-w-0 backdrop-blur-sm"
                          aria-hidden
                        >
                          USKORO
                        </Badge>
                      ) : null}
                    </div>
                  );
                  const { zarada, vrijeme } = map.cardStats;
                  const cardFooter = (
                    <div className="flex flex-1 flex-col justify-center p-4">
                      <p className="line-clamp-3 text-lg font-semibold tracking-tight text-foreground">
                        {map.title}
                      </p>
                      <div
                        className="mt-2.5 flex flex-wrap gap-1 sm:gap-1.5"
                        role="group"
                        aria-label="Zarada i vrijeme do samostalne zarade"
                      >
                        <Badge
                          variant="outline"
                          title={`Zarada: ${zarada}`}
                          className="h-auto min-h-6 min-w-0 border-green-500/20 bg-green-500/10 text-green-800"
                        >
                          <Wallet className="shrink-0" aria-hidden />
                          <span className="min-w-0 truncate">{zarada}</span>
                        </Badge>
                        <Badge
                          variant="outline"
                          title={`Vrijeme: ${vrijeme}`}
                          className="h-auto min-h-6 min-w-0 border-yellow-500/20 bg-yellow-500/10 text-yellow-800"
                        >
                          <Clock3 className="shrink-0" aria-hidden />
                          <span className="min-w-0 truncate">{vrijeme}</span>
                        </Badge>
                      </div>
                    </div>
                  );

                  return (
                    <CarouselItem
                      key={`${map.listSource ?? 'putokaz'}-${map.id}`}
                      className="basis-[78%] pl-4 sm:basis-[60%] lg:basis-1/3"
                    >
                      <article
                        className={cn(
                          'flex h-full flex-col bg-background',
                          locked && 'select-none'
                        )}
                      >
                        {locked ? (
                          <div
                            className="flex h-full min-h-0 flex-col rounded-2xl outline-none"
                            aria-label={`${map.title} — uskoro dostupno`}
                          >
                            {cardMedia}
                            {cardFooter}
                          </div>
                        ) : (
                          <Link
                            href={`/putokazi/${map.id}`}
                            className="group flex h-full min-h-0 flex-col rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                          >
                            {cardMedia}
                            {cardFooter}
                          </Link>
                        )}
                      </article>
                    </CarouselItem>
                  );
                })}
              </CarouselContent>
              <CarouselPrevious
                size="icon-lg"
                className="left-6 hidden bg-primary! text-primary-foreground backdrop-blur-sm transition-colors duration-200 hover:bg-primary/80! hover:text-primary-foreground/80 active:translate-x-0.5! disabled:opacity-0! md:flex"
              />
              <CarouselNext
                size="icon-lg"
                className="right-6 hidden bg-primary! text-primary-foreground backdrop-blur-sm hover:bg-primary/80! hover:text-primary-foreground/80 disabled:opacity-0! md:flex"
              />
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
