import Link from 'next/link';
import { cn } from '@/lib/utils';
import Container from './container';
import Heading from '../shared/heading';
import SiteLogo from '../shared/site-logo';
import { ExternalLink } from 'lucide-react';
import AnimatedUnderline from '../shared/animated-underline';
import { siteNavigation, type SiteFooterColumn, type SiteFooterLink } from '@/lib/site-navigation';
import type { SiteSettings } from '@/lib/site-settings';

interface FooterProps {
  settings: SiteSettings;
}

export default function Footer({ settings }: FooterProps) {

  const { columns, legal: legalMenuItems } = siteNavigation.footer;

  return (
    <footer className='px-4 xl:px-10 border-t border-t-gray-200/60'>
      <Container className='pt-14 md:pt-16 border-x border-dashed'>
        <div className='w-full space-y-14 md:space-y-16'>
          <div className='flex-none py-4 md:py-0 border-y border-dashed md:border-none'>
            <SiteLogo settings={settings} location="footer" />
          </div>
          <FooterColumns columns={columns} />
        </div>
        <div className='relative mt-10 md:mt-20 mb-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-1 md:gap-0 border-y border-dashed text-xs pattern-bg--2'>
          <div className='z-20 relative'>
            Čekić © {new Date().getFullYear()}  - Design + Code by
            <a
              href="https://www.linkedin.com/in/ssabanovic/"
              rel="noopener noreferrer" target="_blank"
              className='relative ml-1 font-semibold tracking-tight text-blue-600 group'
            >
              <span>Sead Šabanović</span>
              <AnimatedUnderline className='bg-blue-600' />
            </a>
          </div>
          <LegalMenuItems legalMenuItems={legalMenuItems} />
          <EdgeBlur />
        </div>
      </Container>
    </footer>
  )
}

function FooterColumns({ columns }: { columns: SiteFooterColumn[] }) {
  return (
    <ul className='flex-1 grid md:grid-cols-2 lg:grid-cols-4 gap-0 md:gap-2 border-y border-dashed pattern-bg--2'>
      {columns.map((column, index) => (
        <li
          key={column.id}
          className={cn('md:py-10 px-10 w-full space-y-7 border-x border-dashed bg-white', {
            'pb-8': index === columns.length - 1
          })}>
          <Heading tag="h2" size="xs" className='relative mt-8 md:mt-0 py-2.5 font-semibold border-y border-dashed pattern-bg--2'>
            <span className='z-20 relative'>
              {column.title}
            </span>
            <EdgeBlur />
          </Heading>
          <ul className='space-y-1 md:space-y-2'>
            {column.links.map((item) => (
              <li key={item.id}>
                <FooterLink item={item} />
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  )
}

function FooterLink({ item }: { item: SiteFooterLink }) {
  if (item.external) {
    return (
      <a
        href={item.href}
        rel="noopener noreferrer" target="_blank"
        className='group flex items-center gap-2'
      >
        <span className='relative'>
          {item.label}
          <AnimatedUnderline />
        </span>
        <ExternalLink size={14} className='group-hover:rotate-12 group-hover:text-blue-500 transition-all duration-300' />
      </a>
    );
  }
  return (
    <Link
      href={item.href}
      className='relative group text-sm md:text-base'
    >
      {item.label}
      <AnimatedUnderline />
    </Link>
  );
}

function LegalMenuItems({ legalMenuItems }: { legalMenuItems: SiteFooterLink[] }) {
  return (
    <ul className='z-20 relative flex items-center gap-1 flex-wrap'>
      {legalMenuItems.map((item, index) => (
        <li key={item.id} className='text-xs font-medium'>
          <Link
            href={item.href}
            className='relative group'
          >
            <span>{item.label}</span>
            <AnimatedUnderline />
          </Link>
          {index !== legalMenuItems.length - 1 && (
            <span className='ml-1'>/</span>
          )}
        </li>
      ))}
    </ul>
  )
}

function EdgeBlur() {
  return (
    <div className='absolute inset-0 flex items-center justify-between'>
      <div className='relative bg-linear-to-r from-white to-transparent h-full w-[100px]'></div>
      <div className='bg-linear-to-l from-white to-transparent h-full w-[100px]'></div>
    </div>
  )
}
