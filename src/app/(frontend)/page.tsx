import { Metadata } from 'next';
import { getHomeMetadata, homePageContent } from '@/lib/home-page';
import HomeRoadmapsSection from '@/components/pages/home/home-roadmaps';
import HeroBlock from '@/components/blocks/hero-block';
import HomeSplitSection from '@/components/pages/home/home-split';

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default function Home() {
  return (
    <>
      <HeroBlock
        heading={homePageContent.headline}
        body={
          <p className="leading-relaxed">
            Izgradi novu karijeru kroz stručne <b>Putokaze</b> ili riješi kućne
            izazove uz praktične <b>Projekte</b>. Od šegrta do majstora, sve na
            jednom mjestu.
          </p>
        }
        mediaType="image"
        image={{
          src: '/images/landing.png',
          alt: 'Majstor radi u radionici',
          short: false,
        }}
        actions={[
          { label: 'Putokazi', href: '/putokazi', variant: 'default' },
          { label: 'Projekti', href: '/projekti', variant: 'secondary' },
        ]}
      />
      <HomeSplitSection />
      <HomeRoadmapsSection />
    </>
  );
}
