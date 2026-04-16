import Link from 'next/link';
import { cn } from '@/lib/utils';
import Container from './container';
import Heading from '../shared/heading';
import SiteLogo from '../shared/site-logo';
import { ExternalLink } from 'lucide-react';
import AnimatedUnderline from '../shared/animated-underline';
import {
  siteNavigation,
  type SiteFooterColumn,
  type SiteFooterLink,
} from '@/lib/site-navigation';
export default function Footer() {
  const { columns, legal: legalMenuItems } = siteNavigation.footer;

  return (
    <footer className="border-t border-t-gray-200/60 px-4 xl:px-10">
      <Container className="border-x border-dashed pt-14 md:pt-16">
        <div className="w-full space-y-14 md:space-y-16">
          <div className="flex-none border-y border-dashed py-4 md:border-none md:py-0">
            <SiteLogo />
          </div>
          <FooterColumns columns={columns} />
        </div>
        <div className="pattern-bg--2 relative mt-10 mb-8 flex flex-col justify-between gap-1 border-y border-dashed py-6 text-xs md:mt-20 md:flex-row md:items-center md:gap-0">
          <div className="relative z-20">
            Čekić © {new Date().getFullYear()} - Design + Code by
            <a
              href="https://www.linkedin.com/in/ssabanovic/"
              rel="noopener noreferrer"
              target="_blank"
              className="group relative ml-1 font-semibold tracking-tight text-primary"
            >
              <span>Sead Šabanović</span>
              <AnimatedUnderline className="bg-primary" />
            </a>
          </div>
          <LegalMenuItems legalMenuItems={legalMenuItems} />
          <EdgeBlur />
        </div>
      </Container>
    </footer>
  );
}

function FooterColumns({ columns }: { columns: SiteFooterColumn[] }) {
  return (
    <ul className="pattern-bg--2 grid flex-1 gap-0 border-y border-dashed md:grid-cols-2 md:gap-2 lg:grid-cols-4">
      {columns.map((column, index) => (
        <li
          key={column.id}
          className={cn(
            'w-full space-y-7 border-x border-dashed bg-white px-10 md:py-10',
            {
              'pb-8': index === columns.length - 1,
            }
          )}
        >
          <Heading
            tag="h2"
            size="xs"
            className="pattern-bg--2 relative mt-8 border-y border-dashed py-2.5 font-semibold md:mt-0"
          >
            <span className="relative z-20">{column.title}</span>
            <EdgeBlur />
          </Heading>
          <ul className="space-y-1 md:space-y-2">
            {column.links.map((item) => (
              <li key={item.id}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}

function FooterLink({ item }: { item: SiteFooterLink }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        rel="noopener noreferrer"
        target="_blank"
        className="group flex items-center gap-2"
      >
        <span className="relative">
          {item.label}
          <AnimatedUnderline />
        </span>
        <ExternalLink
          size={14}
          className="transition-all duration-300 group-hover:rotate-12 group-hover:text-blue-500"
        />
      </a>
    );
  }
  return (
    <Link href={item.href} className="group relative text-sm md:text-base">
      {item.label}
      <AnimatedUnderline />
    </Link>
  );
}

function LegalMenuItems({
  legalMenuItems,
}: {
  legalMenuItems: SiteFooterLink[];
}) {
  return (
    <ul className="relative z-20 flex flex-wrap items-center gap-1">
      {legalMenuItems.map((item, index) => (
        <li key={item.id} className="text-xs font-medium">
          <Link href={item.href} className="group relative">
            <span>{item.label}</span>
            <AnimatedUnderline />
          </Link>
          {index !== legalMenuItems.length - 1 && (
            <span className="ml-1">/</span>
          )}
        </li>
      ))}
    </ul>
  );
}

function EdgeBlur() {
  return (
    <div className="absolute inset-0 flex items-center justify-between">
      <div className="relative h-full w-[100px] bg-linear-to-r from-white to-transparent"></div>
      <div className="h-full w-[100px] bg-linear-to-l from-white to-transparent"></div>
    </div>
  );
}
