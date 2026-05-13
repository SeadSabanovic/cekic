import React from 'react';
import Link from 'next/link';
import Container from './container';
import useScroll from '@/hooks/use-scroll';
import SiteLogo from '../shared/site-logo';
import SlideOutMenu from './slide-out-menu';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Menu, Search } from 'lucide-react';
import AnimatedText from '../shared/animated-text';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { siteNavigation, type SiteNavbarItem } from '@/lib/site-navigation';
import type { SiteSettings } from '@/lib/site-settings';

interface NavbarProps {
  settings: SiteSettings;
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
      className={cn(
        'fixed top-0 left-0 z-40 w-full rounded-b-xl border-b bg-background/80 py-6 backdrop-blur-lg transition-all duration-300 ease-in-out',
        {
          'py-4': hasScrolled,
        }
      )}
    >
      <Container className="flex items-center justify-between">
        <SiteLogo />
        <div className="flex items-center gap-6">
          <NavigationMenu className="hidden md:block">
            <NavigationMenuList className="group/nav space-x-8">
              {navbarMenuItems.map((item) => (
                <NavbarMenuItem key={item.id} item={item} pathname={pathname} />
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-2">
            <button
              type="button"
              aria-label="Otvori pretragu"
              className="cursor-pointer rounded-full border p-2.5 transition-colors duration-300 ease-in-out hover:bg-foreground/10"
            >
              <Search size={18} aria-hidden />
            </button>
            {showSlideOutMenu && (
              <SlideOutMenu settings={settings}>
                <button
                  type="button"
                  aria-label="Otvori meni"
                  className="cursor-pointer rounded-full border p-2.5 transition-colors duration-300 ease-in-out hover:bg-foreground/10"
                >
                  <Menu size={18} aria-hidden />
                </button>
              </SlideOutMenu>
            )}
          </div>
        </div>
      </Container>
    </header>
  );
}

function NavbarMenuItem({
  item,
  pathname,
}: {
  item: SiteNavbarItem;
  pathname: string;
}) {
  if (item.kind === 'group') {
    return (
      <NavigationMenuItem>
        <NavigationMenuTrigger className="group-hover/nav:opacity-40 hover:opacity-100!">
          {item.label}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="flex min-w-[180px] flex-col gap-2 bg-background px-3 py-3 text-nowrap">
          {item.items.map((page) => (
            <Link
              key={page.href}
              href={page.href}
              className="group flex items-center justify-between gap-6 rounded-md border border-dashed py-1 pr-2 pl-3 hover:bg-gray-50"
            >
              {page.label}
              <ChevronRight
                size={14}
                className="text-gray-300 transition-all duration-300 group-hover:-translate-x-0.5 group-hover:text-gray-500"
              />
            </Link>
          ))}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem>
      <Link
        href={item.href}
        className={cn(
          'relative inline-flex overflow-hidden transition-opacity duration-200 group-hover/nav:opacity-40 hover:opacity-100!',
          {
            'underline-offset-38 hover:underline': true,
            'text-accent': navItemActive(pathname, item.href),
          }
        )}
      >
        <AnimatedText>{item.label}</AnimatedText>
      </Link>
    </NavigationMenuItem>
  );
}
