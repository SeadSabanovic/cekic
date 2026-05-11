export const HUB_PAGE_TOC_ENTRIES = [
  { id: 'brzi-podaci', href: '#brzi-podaci', label: 'Brzi podaci' },
  { id: 'o-zanimanju', href: '#o-zanimanju', label: 'O zanimanju' },
  {
    id: 'karijerni-putokaz',
    href: '#karijerni-putokaz',
    label: 'Karijerni putokaz',
  },
] as const;

export type HubPageTocEntryId = (typeof HUB_PAGE_TOC_ENTRIES)[number]['id'];
