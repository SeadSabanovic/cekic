/**
 * Globalne postavke sajta (bez CMS-a). Uredi naslov, logo i copyright ovdje.
 */

export type SiteSettings = {
  siteTitle: string;
  /** Putanja u public/ (npr. /logo.svg) ili puna URL; null = prikazuje se tekstualni naziv */
  siteLogoUrl: string | null;
  /** Kratak tekst za footer (opciono; trenutni footer ima fiksni copy) */
  copyright?: string;
};

const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? 'Čekić';

export const siteSettings: SiteSettings = {
  siteTitle: siteName,
  siteLogoUrl: null,
};
