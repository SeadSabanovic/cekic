/**
 * Lokalna navigacija (bez Sanity-ja). Uredi linkove i naslove ovdje — samo bosanski sadržaj.
 */

export type SiteNavSingle = {
  id: string;
  kind: 'single';
  label: string;
  /** Apsolutna putanja, npr. "/", "/o-nama" */
  href: string;
  isButton?: boolean;
};

export type SiteNavGroup = {
  id: string;
  kind: 'group';
  label: string;
  items: Array<{ href: string; label: string }>;
};

export type SiteNavbarItem = SiteNavSingle | SiteNavGroup;

export type SiteFooterLink = {
  id: string;
  label: string;
  href: string;
  external?: boolean;
};

export type SiteFooterColumn = {
  id: string;
  title: string;
  links: SiteFooterLink[];
};

export type SiteSocialLink = {
  id: string;
  label: string;
  href: string;
  /** Opcionalno: npr. "/icons/linkedin.svg" iz public/ */
  iconSrc?: string;
};

export type SiteSlideCta = {
  id: string;
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline';
};

export const siteNavigation = {
  navbar: [
    {
      id: 'home',
      kind: 'single',
      label: 'Početna',
      href: '/',
    },
    {
      id: 'about',
      kind: 'single',
      label: 'O nama',
      href: '/o-nama',
    },
    {
      id: 'contact',
      kind: 'single',
      label: 'Kontakt',
      href: '/kontakt',
      isButton: true,
    },
  ] satisfies SiteNavbarItem[],

  slideOut: {
    enabled: true,
    /** Prazno = iste stavke kao u navbar-u */
    menuItems: [] as SiteNavbarItem[],
    menuTitle: 'Meni',
    showContact: false,
    contactTitle: 'Kontakt',
    contactEmail: '',
    contactPhone: '',
    /** Tekstualni linkovi; ako dodaš iconSrc, prikazuje se i ikona */
    socialLinks: [] as SiteSocialLink[],
    ctaButtons: [] as SiteSlideCta[],
  },

  footer: {
    columns: [
      {
        id: 'col-nav',
        title: 'Navigacija',
        links: [
          { id: 'f-home', label: 'Početna', href: '/' },
          { id: 'f-about', label: 'O nama', href: '/o-nama' },
        ],
      },
    ] satisfies SiteFooterColumn[],
    legal: [],
  },
};
