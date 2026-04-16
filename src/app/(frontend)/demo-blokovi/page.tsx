import type { Metadata } from 'next';
import HeroBlock from '@/components/blocks/hero-block';
import HeaderBlock from '@/components/blocks/header-block';
import PortableTextBlock from '@/components/blocks/portable-text-block';
import FeaturesMinimalBlock from '@/components/blocks/features-minimal-block';
import FeatureCardsBlock from '@/components/blocks/feature-cards-block';
import FreeformBlock, {
  FreeformButton,
  FreeformHeading,
  FreeformImage,
  FreeformRichText,
  FreeformSpacer,
} from '@/components/blocks/freeform-block';
import ServicesBlock from '@/components/blocks/services-block';
import LogoBlock from '@/components/blocks/logo-block';
import MediaBlock from '@/components/blocks/media-block';
import TestimonialBlock from '@/components/blocks/testimonial-block';
import FormBlock from '@/components/blocks/form-block';

export const metadata: Metadata = {
  title: 'Demo blokova',
  description: 'Pregled svih UI blokova s mock podacima.',
};

/** Stabilne slike s picsum.photos (zahtijeva remotePattern u next.config). */
const img = (id: number, w = 800, h = 600) =>
  `https://picsum.photos/id/${id}/${w}/${h}`;

export default function DemoBlokoviPage() {
  return (
    <div className="bg-background">
      <HeroBlock
        anchorId="hero"
        heading="Hero — naslov i poziv na akciju"
        body={
          <>
            <p>
              Ovo je demo stranica: svi blokovi ispod koriste mock podatke.
              Možeš ih kopirati kao polaznu tačku za prave stranice.
            </p>
          </>
        }
        mediaType="image"
        bottomCornerRadius="rounded"
        image={{
          src: img(29, 1400, 800),
          alt: 'Pejzaž',
          short: false,
        }}
        overlayType="dark"
        dialogType="video"
        videoUrl="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
        actions={[
          { label: 'Primarni', href: '/kontakt', variant: 'default' },
          { label: 'Sekundarni', href: '/o-nama', variant: 'outline' },
        ]}
      />

      <HeaderBlock
        anchorId="header"
        heading="Header blok"
        bottomCornerRadius="rounded"
        body={
          <p>
            Kratak uvodni tekst ispod velikog naslova — zamijeni sa pravim
            sadržajem ili proslijedi kao{' '}
            <code className="rounded bg-muted px-1">ReactNode</code>.
          </p>
        }
      />

      <PortableTextBlock alignment="left" anchorId="tekst">
        <div className="prose max-w-none prose-neutral dark:prose-invert">
          <p>
            <strong>PortableTextBlock</strong> sada prima običan sadržaj (ovdje
            paragrafi). Možeš koristiti prose klase iz Tailwind Typography ako
            su uključene.
          </p>
          <ul>
            <li>Stavka jedan</li>
            <li>Stavka dva</li>
          </ul>
        </div>
      </PortableTextBlock>

      <FeaturesMinimalBlock
        anchorId="minimal"
        heading="Minimalne karakteristike"
        body={<p>Kratki opis sekcije uz listu stavki s lijeve strane.</p>}
        actions={[
          { label: 'Saznaj više', href: '/o-nama', variant: 'default' },
        ]}
        features={[
          'Brza isporuka',
          'Podrška na bosanskom',
          'Jasni dogovori',
          'Fokus na kvalitetu',
        ]}
        enableBorderTop
        cornerRadiusTop="rounded"
      />

      <FeatureCardsBlock
        anchorId="kartice"
        heading="Kartice s opcijama"
        headerActions={[
          {
            label: 'Sve usluge',
            href: '/demo-blokovi#usluge',
            variant: 'outline',
          },
        ]}
        features={[
          {
            id: '1',
            imageSrc: img(106, 800, 600),
            imageAlt: 'Šuma',
            title: 'Prva kartica',
            description: 'Kratki opis usluge ili proizvoda.',
            items: ['Stavka A', 'Stavka B', 'Stavka C'],
            cta: { label: 'Detalji', href: '/kontakt' },
          },
          {
            id: '2',
            imageSrc: img(15, 800, 600),
            imageAlt: 'Most',
            title: 'Druga kartica',
            description: 'Još jedan primjer teksta.',
            items: ['Check 1', 'Check 2'],
            cta: { label: 'Kontakt', href: '/kontakt' },
          },
        ]}
        showCallToAction
        callToAction={{
          title: 'Zajednički poziv (CTA)',
          body: (
            <p>
              Tekst unutar CTA sekcije — može biti više paragrafa ili bilo koji
              React sadržaj.
            </p>
          ),
          actions: [
            { label: 'Pošalji upit', href: '/kontakt', variant: 'default' },
          ],
        }}
      />

      <FreeformBlock
        anchorId="freeform"
        border="topBottom"
        columnsPerRow={2}
        columns={[
          {
            id: 'c1',
            spacing: 'medium',
            alignment: 'left',
            children: (
              <>
                <FreeformHeading tag="h3" size="lg">
                  Kolona 1
                </FreeformHeading>
                <FreeformSpacer size="small" />
                <FreeformRichText>
                  <p>Tekst u prvoj koloni. Ispod je slika i dugme.</p>
                </FreeformRichText>
                <FreeformSpacer size="medium" />
                <FreeformImage
                  src={img(28, 600, 600)}
                  alt="Uzorak"
                  aspect="rectangle"
                />
                <FreeformSpacer size="medium" />
                <FreeformButton href="/kontakt" variant="default" size="sm">
                  Dugme
                </FreeformButton>
              </>
            ),
          },
          {
            id: 'c2',
            spacing: 'medium',
            alignment: 'left',
            children: (
              <>
                <FreeformHeading tag="h3" size="lg">
                  Kolona 2
                </FreeformHeading>
                <FreeformSpacer size="small" />
                <FreeformRichText className="text-muted-foreground">
                  <p>
                    Druga kolona — koristi iste pomoćne komponente (naslov,
                    razmak, tekst).
                  </p>
                </FreeformRichText>
              </>
            ),
          },
        ]}
      />

      <ServicesBlock
        anchorId="usluge"
        heading="Usluge (kartice s linkom)"
        background="pattern"
        topCornerRadius="rounded"
        headerActions={[
          { label: 'Kontakt', href: '/kontakt', variant: 'outline' },
        ]}
        services={[
          {
            id: 's1',
            href: '/o-nama',
            title: 'Konzalting',
            description: 'Strategija i planiranje za tvoj tim.',
            imageSrc: img(180, 800, 600),
            imageAlt: 'Usluga 1',
          },
          {
            id: 's2',
            href: '/kontakt',
            title: 'Razvoj',
            description: 'Web i alati prilagođeni poslu.',
            imageSrc: img(119, 800, 600),
            imageAlt: 'Usluga 2',
          },
          {
            id: 's3',
            href: '/demo-blokovi',
            title: 'Podrška',
            description: 'Odvojeno vrijeme za održavanje i savjete.',
            imageSrc: img(225, 800, 600),
            imageAlt: 'Usluga 3',
          },
        ]}
        paddingTop="default"
        paddingBottom="default"
      />

      <LogoBlock
        anchorId="logoi"
        heading="Partneri / logotipi"
        logos={[
          {
            id: 'l1',
            src: img(1, 200, 100),
            alt: 'Logo 1',
            title: 'Logo 1',
            size: 'normal',
          },
          {
            id: 'l2',
            src: img(2, 200, 100),
            alt: 'Logo 2',
            title: 'Logo 2',
            href: 'https://example.com',
            size: 'large',
          },
          {
            id: 'l3',
            src: img(3, 200, 100),
            alt: 'Logo 3',
            title: 'Logo 3',
            size: 'normal',
          },
        ]}
      />

      <MediaBlock
        anchorId="media"
        backgroundType="image"
        backgroundWidth="contained"
        image={{ src: img(48, 2400, 1200), alt: 'Široka slika' }}
        overlayType="dark"
        dialogType="none"
      />

      <TestimonialBlock
        anchorId="iskustva"
        eyebrow="Iskustva"
        heading="Šta kažu klijenti"
        cornerRadiusTop="rounded"
        cornerRadiusBottom="rounded"
        testimonials={[
          {
            id: 't1',
            quote:
              'Odlična saradnja i jasna komunikacija od prvog dana. Preporučujem svima koji traže ozbiljan pristup.',
            name: 'Amra Hodžić',
            jobTitle: 'Direktorica, Primjer d.o.o.',
            company: 'Primjer d.o.o.',
            avatarSrc: img(64, 100, 100),
            logoSrc: img(5, 80, 40),
          },
          {
            id: 't2',
            quote:
              'Brza isporuka i pažnja prema detaljima. Tim je uvijek dostupan za pitanja.',
            name: 'Marko Petrović',
            jobTitle: 'Vlasnik',
            company: 'Studio X',
            avatarSrc: img(65, 100, 100),
            logoSrc: img(6, 80, 40),
          },
        ]}
      />

      <FormBlock
        anchorId="forma"
        heading="Kontakt forma (mock)"
        intro={
          <p>
            Polja ispod su samo za prikaz; poveži ih kasnije s API-jem ili
            akcijom.
          </p>
        }
      >
        <form className="flex w-full max-w-md flex-col gap-4">
          <label className="flex flex-col gap-1 text-sm font-medium">
            Ime
            <input
              type="text"
              name="name"
              className="rounded-md border border-input bg-background px-3 py-2"
              placeholder="Tvoje ime"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Email
            <input
              type="email"
              name="email"
              className="rounded-md border border-input bg-background px-3 py-2"
              placeholder="email@primjer.ba"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm font-medium">
            Poruka
            <textarea
              name="message"
              rows={4}
              className="rounded-md border border-input bg-background px-3 py-2"
              placeholder="Kratko opiši zahtjev…"
            />
          </label>
          <button
            type="button"
            className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Pošalji (mock)
          </button>
        </form>
      </FormBlock>
    </div>
  );
}
