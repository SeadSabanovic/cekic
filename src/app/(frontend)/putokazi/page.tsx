import type { Metadata } from 'next';
import { Suspense } from 'react';
import Container from '@/components/global/container';
import PutokaziFiltersToolbar from '@/components/pages/putokazi/putokazi-filters-toolbar';
import RoadmapCard from '@/components/ui/cards/roadmap-card';
import HeroBlock from '@/components/blocks/hero-block';
import { getPutokaziSectionFilters } from '@/lib/home-roadmaps-data';
import { putokazListItemToRoadmapItem } from '@/lib/putokaz-to-roadmap-item';
import { fetchPutokaziList } from '@/sanity/lib/queries/putokaz-list';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Putokazi',
  description:
    'Pregled svih mapa puta — strukturirani koraci za kućne popravke i zanate.',
};

function PutokaziFiltersFallback() {
  return (
    <div
      className="pattern-bg--2 relative -mx-4 mt-6 mb-8 h-[46px] animate-pulse border-y border-dashed py-3 pl-4 md:mt-8 md:mb-10 md:pl-0"
      aria-hidden
    />
  );
}

export default async function PutokaziPage() {
  const filterItems = getPutokaziSectionFilters();
  const putokazi = await fetchPutokaziList();
  const cards = putokazi.map(putokazListItemToRoadmapItem);

  return (
    <>
      <HeroBlock
        heading="Putokazi"
        body={
          <p className="leading-relaxed">
            Pregled putokaza iz Sanity studija. Ispod su filteri za buduće
            grupisanje; kartice prikazuju sve objavljene putokaze.
          </p>
        }
      />
      <div className="pattern-bg px-4 md:px-10">
        <Container className="p-0!">
          <Suspense fallback={<PutokaziFiltersFallback />}>
            <PutokaziFiltersToolbar items={filterItems} />
          </Suspense>
        </Container>
      </div>
      <div className="px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-16 md:py-24">
          {cards.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((map) => (
                <li key={map.id}>
                  <RoadmapCard map={map} detailHref={`/putokazi/${map.id}`} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 max-w-2xl text-muted-foreground">
              Još nema putokaza u studiju. Dodaj dokument tipa „Putokaz” u
              Sanityju (npr. Krečenje) pa će se ovdje pojaviti automatski.
            </p>
          )}
        </Container>
      </div>
    </>
  );
}
