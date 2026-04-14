import type { Metadata } from 'next';
import Container from '@/components/global/container';
import Heading from '@/components/shared/heading';

export const metadata: Metadata = {
  title: 'O nama',
  description: 'Ko smo i kako pomažemo klijentima kroz web projekte.',
};

export default function AboutPage() {
  return (
    <div className="px-4 xl:px-10 pattern-bg">
      <Container className="px-4 pt-32 md:pt-40 pb-14 md:pb-24 border-x border-dashed space-y-8">
        <Heading tag="h1" size="xxl" className="max-w-3xl text-balance">
          O nama
        </Heading>
        <p className="max-w-3xl text-lg text-neutral-600 leading-relaxed text-balance">
          Pomažemo malim i srednjim biznisima da dobiju jasnu, brzu i
          profesionalnu web prezentaciju. Fokus nam je jednostavan dizajn,
          kvalitetan sadržaj i iskustvo koje vodi korisnika do kontakta.
        </p>
        <p className="max-w-3xl text-neutral-600 leading-relaxed text-balance">
          Ako želiš, ovaj sadržaj možeš direktno uređivati u fajlu
          <code> src/app/(frontend)/o-nama/page.tsx</code> bez CMS-a.
        </p>
      </Container>
    </div>
  );
}
