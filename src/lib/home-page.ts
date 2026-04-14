import type { Metadata } from 'next';

/** Tekstovi i SEO za Next početnu stranicu (bez CMS-a). */
export const homePageContent = {
  metaTitle: 'Početna',
  description:
    'Čekić — predstavite svoj brend, usluge i kontakt na jednom mjestu.',
  headline: 'Zanat je u tvojim rukama',
  lead: 'Postani sam svoj majstor uz cekic.io. Donosimo ti jasne mape puta za Balkan: od sitnih kućnih popravki do visokoplaćenih modernih zanata. Nauči, primijeni i gradi svojim rukama.',
} as const;

export function getHomeMetadata(): Metadata {
  const site = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Čekić';
  return {
    title: homePageContent.metaTitle,
    description: homePageContent.description,
    openGraph: {
      title: `${homePageContent.metaTitle} | ${site}`,
      description: homePageContent.description,
    },
  };
}
