import type { Metadata } from 'next';
import Container from '@/components/global/container';
import PutokaziFiltersToolbar from '@/components/pages/putokazi/putokazi-filters-toolbar';
import RoadmapCard from '@/components/ui/cards/roadmap-card';
import HeroBlock from '@/components/blocks/hero-block';
import { getPutokaziTradeFilters } from '@/lib/home-roadmaps-data';
import { roadmapHubSummaryToRoadmapItem } from '@/lib/roadmap-hub-to-roadmap-item';
import { putokazListItemToRoadmapItem } from '@/lib/putokaz-to-roadmap-item';
import { normalizePutokaziTradeQueryParam } from '@/lib/putokazi-trade-categories';
import { fetchRoadmapHubSummaries } from '@/sanity/lib/queries/roadmap';
import { fetchPutokaziList } from '@/sanity/lib/queries/putokaz-list';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Putokazi',
  description:
    'Pregled svih mapa puta — strukturirani koraci za kućne popravke i zanate.',
};

type PageProps = {
  searchParams: Promise<{ sekcija?: string | string[] }>;
};

export default async function PutokaziPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const trade = normalizePutokaziTradeQueryParam(sp.sekcija);
  const filterItems = getPutokaziTradeFilters();
  const putokazi = await fetchPutokaziList('putokazi', { trade });
  const hubovi =
    trade === 'sve' ? await fetchRoadmapHubSummaries() : ([] as const);
  const cards = [
    ...hubovi.map(roadmapHubSummaryToRoadmapItem),
    ...putokazi.map(putokazListItemToRoadmapItem),
  ].sort((a, b) => a.title.localeCompare(b.title, 'bs'));

  return (
    <>
      <HeroBlock
        heading="Putokazi"
        body={
          <p className="leading-relaxed">
            Sve što ti treba da pređeš put od znatiželje do zanata. Naši
            putokazi te vode kroz proces učenja, nabavku opreme i biznis stranu
            posla. Odaberi sistem gradnje i počni svoju novu karijeru danas.
          </p>
        }
      />
      <div className="pattern-bg px-4 md:px-10">
        <Container className="p-0!">
          <PutokaziFiltersToolbar items={filterItems} activeTrade={trade} />
        </Container>
      </div>
      <div className="px-4 xl:px-10">
        <Container className="border-x border-dashed px-4 py-16 md:py-24">
          {cards.length > 0 ? (
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cards.map((map) => (
                <li key={`${map.listSource ?? 'putokaz'}-${map.id}`}>
                  <RoadmapCard map={map} detailHref={`/putokazi/${map.id}`} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 max-w-2xl text-muted-foreground">
              {trade === 'sve'
                ? 'Još nema putokaza u studiju. Dodaj dokument tipa „Putokaz” u Sanityju pa će se ovdje pojaviti automatski.'
                : `Nema putokaza u kategoriji „${filterItems.find((f) => f.id === trade)?.label ?? trade}”. Postavi polje „Kategorija” na putokazu ili odaberi „Sve”.`}
            </p>
          )}
        </Container>
      </div>
    </>
  );
}
