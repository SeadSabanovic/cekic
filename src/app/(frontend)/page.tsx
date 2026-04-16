import { Metadata } from 'next';
import { getHomeMetadata, homePageContent } from '@/lib/home-page';
import HomeRoadmapsSection from '@/components/pages/home/home-roadmaps';
import HeroBlock from '@/components/blocks/hero-block';

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default function Home() {
  return (
    <>
      <HeroBlock
        heading={homePageContent.headline}
        body={<p className="leading-relaxed">{homePageContent.lead}</p>}
        actions={[
          { label: 'O nama', href: '/o-nama', variant: 'default' },
          { label: 'Kontakt', href: '/kontakt', variant: 'ghost' },
        ]}
      />
      <HomeRoadmapsSection />
    </>
  );
}
