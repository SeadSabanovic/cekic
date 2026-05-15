import type { PortableTextHeading } from '@/lib/portable-text-headings';

import { SectionPageTocMobile } from '@/components/pages/putokazi/section-page-toc-mobile.client';
import { SectionPageTocSidebar } from '@/components/pages/putokazi/section-page-toc-sidebar.client';

export { SectionPageTocMobile, SectionPageTocSidebar };

export type SectionPageTocProps = {
  className?: string;
  headings: PortableTextHeading[];
  /** Kratki uvod iznad inline TOC-a (mobil). */
  intro?: string;
};
