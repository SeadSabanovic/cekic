import type { Metadata } from 'next';
import Container from '@/components/global/container';
import PutokaziFiltersToolbar from '@/components/pages/putokazi/putokazi-filters-toolbar';
import RoadmapCard from '@/components/ui/cards/roadmap-card';
import HeroBlock from '@/components/blocks/hero-block';
import { getPutokaziTradeFilters } from '@/lib/home-roadmaps-data';
import { projekatListItemToRoadmapItem } from '@/lib/putokaz-to-roadmap-item';
import { normalizePutokaziTradeQueryParam } from '@/lib/putokazi-trade-categories';
import { fetchProjektiList } from '@/sanity/lib/queries/putokaz-list';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Projekti',
  description:
    'Pregled svih projekata — praktični primjeri izvedenih radova i slučajeva iz prakse.',
};

type PageProps = {
  searchParams: Promise<{ sekcija?: string | string[] }>;
};

export default async function ProjektiPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const trade = normalizePutokaziTradeQueryParam(sp.sekcija);
  const filterItems = getPutokaziTradeFilters();
  const projekti = await fetchProjektiList({ trade });
  const cards = projekti.map(projekatListItemToRoadmapItem);

  return (
    <>
      <HeroBlock
        heading="Projekti"
        body={
          <p className="leading-relaxed">
            Praktična uputstva za konkretne zahvate. Od sitnih popravki koje ti
            štede novac, do složenijih projekata koji podižu vrijednost tvog
            prostora. Svaki projekat dolazi sa preciznom listom alata,
            materijala i provjerenim koracima koji garantuju rezultat bez
            fušeraja.
          </p>
        }
      />
      <div className="pattern-bg px-4 md:px-10">
        <Container className="p-0!">
          <PutokaziFiltersToolbar
            items={filterItems}
            pathnameBase="/projekti"
            activeTrade={trade}
          />
        </Container>
      </div>
      <div className="px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-16 md:py-24">
          {cards.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((map) => (
                <li key={`${map.listSource ?? 'projekat'}-${map.id}`}>
                  <RoadmapCard
                    map={map}
                    detailHref={`/projekti/${map.id}`}
                    enabled={!map.locked}
                    variant="projekti"
                  />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 max-w-2xl text-muted-foreground">
              Još nema projekata u studiju. U listi „Projekti” kreiraj dokument
              tipa „Projekt” pa će se ovdje pojaviti automatski.
            </p>
          )}
        </Container>
      </div>
    </>
  );
}
