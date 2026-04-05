import React from 'react';
import Link from 'next/link';
import Container from './container';
import { buttonVariants } from '../ui/button';
import useScroll from '@/hooks/use-scroll';
import SiteLogo from '../shared/site-logo';
import SlideOutMenu from './slide-out-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Menu } from 'lucide-react';
import AnimatedText from '../shared/animated-text';
import { GeneralSettingsQueryResult } from '../../../sanity.types';
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { siteNavigation, type SiteNavbarItem } from '@/lib/site-navigation';

interface NavbarProps {
  settings: GeneralSettingsQueryResult;
}

function navItemActive(pathname: string, href: string) {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar({ settings }: NavbarProps) {

  const pathname = usePathname();
  const hasScrolled = useScroll();

  const navbarMenuItems = siteNavigation.navbar;
  const { enabled: showSlideOutMenu } = siteNavigation.slideOut;
  
  return (
    <header 
      className={cn('z-40 fixed top-0 left-0 w-full py-6 rounded-b-xl border-b border-b-gray-100 bg-white/80 backdrop-blur-lg transition-all duration-300 ease-in-out', {
        'py-4 ': hasScrolled
      })}
    >
      <Container className='flex items-center justify-between'>
        <SiteLogo settings={settings} />
        <div className='flex items-center gap-3'>
          <NavigationMenu className='hidden md:block'>
            <NavigationMenuList className='space-x-8 group/nav'>
              {navbarMenuItems.map((item) => (
                <NavbarMenuItem key={item.id} item={item} pathname={pathname} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          {showSlideOutMenu && (
            <SlideOutMenu settings={settings}>
              <button aria-label='Otvori meni' className='p-2.5 border border-gray-200/60 rounded-full cursor-pointer hover:bg-gray-50 transition-colors duration-300 ease-in-out'>
                <Menu size={18} />
              </button>
            </SlideOutMenu>
          )}
        </div>
      </Container>
    </header>
  )
}

function NavbarMenuItem({ item, pathname }: { item: SiteNavbarItem; pathname: string }) {
  if (item.kind === 'group') {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className='group-hover/nav:opacity-40 hover:opacity-100!'>
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className='min-w-[180px] text-nowrap py-3 px-3 flex flex-col gap-2 bg-white'>
          {item.items.map((page) => (
            <Link 
              key={page.href} 
              href={page.href}
              className='group py-1 pl-3 pr-2 flex items-center justify-between gap-6 rounded-md border border-dashed hover:bg-gray-50'
            >
              {page.label}
              <ChevronRight 
                size={14} 
                className='text-gray-300 group-hover:-translate-x-0.5 group-hover:text-gray-500 transition-all duration-300' 
              />
            </Link>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  if (item.isButton) {
    return (
      <NavigationMenuItem>
        <Link
          href={item.href}
          className={cn('group', buttonVariants({ variant: 'primary' }))}
        >
          {item.label}
        </Link>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <Link 
        href={item.href}
        className={cn('relative overflow-hidden inline-flex transition-opacity duration-200 group-hover/nav:opacity-40 hover:opacity-100!', {
          'hover:underline underline-offset-38': true,
          'text-blue-700': navItemActive(pathname, item.href),
        })}
      >
        <AnimatedText>
          {item.label}
        </AnimatedText>
      </Link>
    </NavigationMenuItem>
  );
}
