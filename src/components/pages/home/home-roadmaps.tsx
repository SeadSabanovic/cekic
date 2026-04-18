import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { roadmapSections } from '@/lib/home-roadmaps-data';

import RoadmapCard from './roadmap-card';

export default function HomeRoadmapsSection() {
  return (
    <section className="border-t border-dashed">
      <Container
        className="border-x px-6 md:px-10"
        paddingTop="default"
        paddingBottom="large"
      >
        <div className="relative pt-10 pb-12 text-center">
          <Heading tag="h2" size="xl">
            Putokazi
          </Heading>
          <p className="mx-auto mt-4 max-w-3xl text-balance text-muted-foreground md:text-lg">
            Zaboravi na sate besciljnog pretraživanja YouTube-a. Svaki putokaz
            je dekomponovan na jasne korake, neophodan alat i tehničke cake koje
            majstori inače čuvaju za sebe. Tvoj plan rada, od prve mjere do
            finalnog udarca.
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-20 md:mt-20 md:gap-24">
          {roadmapSections.map((section) => (
            <div key={section.id}>
              <div className="mb-8 max-w-3xl">
                <Heading tag="h2" size="md" className="text-balance">
                  {section.title}
                </Heading>
                <p className="mt-3 leading-relaxed text-pretty text-muted-foreground md:text-lg">
                  {section.lead}
                </p>
              </div>

              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.maps.map((map, index) => (
                  <li key={map.id}>
                    <RoadmapCard map={map} enabled={index < 3} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
