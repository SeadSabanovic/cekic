import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/hero-block';

export const metadata: Metadata = {
  title: 'O nama',
  description: 'Ko smo i kako pomažemo klijentima kroz web projekte.',
};

export default function AboutPage() {
  return (
    <>
      <HeroBlock
        heading="O nama"
        body={
          <>
            <p className="leading-relaxed">
              Pomažemo malim i srednjim biznisima da dobiju jasnu, brzu i
              profesionalnu web prezentaciju. Fokus nam je jednostavan dizajn,
              kvalitetan sadržaj i iskustvo koje vodi korisnika do kontakta.
            </p>
            <p className="mt-4 leading-relaxed">
              Ako želiš, ovaj sadržaj možeš direktno uređivati u fajlu
              <code className="mx-1 rounded bg-muted px-1.5 py-0.5 text-sm">
                src/app/(frontend)/o-nama/page.tsx
              </code>
              bez CMS-a.
            </p>
          </>
        }
        actions={[
          { label: 'Kontakt', href: '/kontakt', variant: 'default' },
          { label: 'Početna', href: '/', variant: 'ghost' },
        ]}
      />
    </>
  );
}
