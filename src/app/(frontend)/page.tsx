import Link from 'next/link';
import { Metadata } from 'next';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';
import { Button } from '@/components/ui/button';
import { getHomeMetadata, homePageContent } from '@/lib/home-page';

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default function Home() {
  return (
    <div id="home" className="overflow-hidden">
      <div className="px-4 xl:px-10 pattern-bg">
        <Container className="px-4 pt-32 md:pt-40 pb-14 md:pb-28 border-x border-dashed">
          <Heading>{homePageContent.headline}</Heading>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl text-balance leading-relaxed">
            {homePageContent.lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button asChild>
              <Link href="/o-nama">O nama</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/kontakt">Kontakt</Link>
            </Button>
          </div>
        </Container>
      </div>
    </div>
  );
}
