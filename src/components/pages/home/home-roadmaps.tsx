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
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold tracking-[0.12em] text-primary uppercase">
            Mape puta
          </p>
          <p className="mt-4 text-balance text-muted-foreground md:text-lg">
            Od male popravke do ozbiljnog zanata — sve je raščlanjeno kao
            inženjerski plan: koraci, granice i jasno šta dolazi sljedeće.
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
                    <RoadmapCard
                      map={map}
                      enabled={index < 3}
                    />
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
