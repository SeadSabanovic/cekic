import type { Metadata } from 'next';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';

export const metadata: Metadata = {
  title: 'O nama',
  description: 'Ko smo i kako pomažemo klijentima kroz web projekte.',
};

export default function AboutPage() {
  return (
    <div className="pattern-bg px-4 xl:px-10">
      <Container className="space-y-8 border-x border-dashed px-4 pt-32 pb-14 md:pt-40 md:pb-24">
        <Heading tag="h1" size="xxl" className="max-w-3xl text-balance">
          O nama
        </Heading>
        <p className="max-w-3xl text-lg leading-relaxed text-balance text-neutral-600">
          Pomažemo malim i srednjim biznisima da dobiju jasnu, brzu i
          profesionalnu web prezentaciju. Fokus nam je jednostavan dizajn,
          kvalitetan sadržaj i iskustvo koje vodi korisnika do kontakta.
        </p>
        <p className="max-w-3xl leading-relaxed text-balance text-neutral-600">
          Ako želiš, ovaj sadržaj možeš direktno uređivati u fajlu
          <code> src/app/(frontend)/o-nama/page.tsx</code> bez CMS-a.
        </p>
      </Container>
    </div>
  );
}
