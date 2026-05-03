import type { Metadata } from 'next';
import Container from '@/components/global/container';
import HeroBlock from '@/components/blocks/hero-block';
import { siteNavigation } from '@/lib/site-navigation';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Kontakt informacije i način da brzo stupite u kontakt.',
};

export default function ContactPage() {
  const { contactEmail, contactPhone } = siteNavigation.slideOut;

  return (
    <>
      <HeroBlock
        heading="Kontakt"
        body={
          <p className="leading-relaxed">
            Pišite nam za ponudu, savjet ili pitanje vezano za vaš projekat.
          </p>
        }
        actions={[
          { label: 'Početna', href: '/', variant: 'default' },
          { label: 'O nama', href: '/o-nama', variant: 'ghost' },
        ]}
      />
      <div className="px-4 xl:px-10">
        <Container className="space-y-3 border-x border-dashed px-4 py-16 text-neutral-700 md:py-24">
          <p>
            Email:{' '}
            <a
              className="underline underline-offset-4"
              href={`mailto:${contactEmail || 'hello@example.com'}`}
            >
              {contactEmail || 'hello@example.com'}
            </a>
          </p>
          <p>
            Telefon:{' '}
            <a
              className="underline underline-offset-4"
              href={`tel:${(contactPhone || '+38760000000').replace(/\s/g, '')}`}
            >
              {contactPhone || '+387 60 000 000'}
            </a>
          </p>
        </Container>
      </div>
    </>
  );
}
