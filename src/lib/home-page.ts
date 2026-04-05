import type { Metadata } from "next";

/** Tekstovi i SEO za Next početnu stranicu (bez CMS-a). */
export const homePageContent = {
  metaTitle: "Početna",
  description:
    "Čekić — predstavite svoj brend, usluge i kontakt na jednom mjestu.",
  headline: "Gradimo web koji radi za vas",
  lead:
    "Jednostavna prezentacija, jasna navigacija i sadržaj na bosanskom jeziku. Prilagodite ovaj tekst u src/lib/home-page.ts.",
} as const;

export function getHomeMetadata(): Metadata {
  const site = process.env.NEXT_PUBLIC_SITE_NAME ?? "Čekić";
  return {
    title: homePageContent.metaTitle,
    description: homePageContent.description,
    openGraph: {
      title: `${homePageContent.metaTitle} | ${site}`,
      description: homePageContent.description,
    },
  };
}
