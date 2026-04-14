import Image from 'next/image';
import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import SiteLogo from '../shared/site-logo';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { buttonVariants } from '../ui/button';
import Link from 'next/link';
import AnimatedUnderline from '../shared/animated-underline';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '../ui/collapsible';
import type { SiteSettings } from '@/lib/site-settings';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';
import { siteNavigation, type SiteNavbarItem } from '@/lib/site-navigation';

export default function SlideOutMenu({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: SiteSettings;
}) {
  const router = useRouter();
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const {
    menuTitle,
    showContact,
    contactTitle,
    contactEmail,
    contactPhone,
    socialLinks,
    ctaButtons,
    menuItems,
  } = siteNavigation.slideOut;

  const slideItems = menuItems.length > 0 ? menuItems : siteNavigation.navbar;

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="overflow-y-scroll pb-44">
        <SheetHeader className="z-20 fixed top-0 pt-[26px] right-7 w-[338px] md:w-[330px] h-20 border-b border-dashed border-b-gray-200 bg-white/95">
          <SiteLogo />
          <SheetDescription className="sr-only">
            Cekic{settings.copyright}
          </SheetDescription>
        </SheetHeader>
        <SheetTitle className="mt-16 px-0 py-6 antialiased font-normal text-gray-400">
          {menuTitle}
        </SheetTitle>
        <ul className="px-0 flex flex-col gap-4 text-black">
          {slideItems.map((item) => (
            <SlideMenuRow
              key={item.id}
              item={item}
              openItems={openItems}
              setOpenItems={setOpenItems}
              router={router}
            />
          ))}
        </ul>
        {showContact && (
          <>
            <SheetTitle className="border-t border-dashed mt-8 px-0 pt-8 antialiased font-normal text-gray-400">
              {contactTitle}
            </SheetTitle>
            <div className="mt-2 space-y-4">
              {contactEmail ? (
                <a
                  href={`mailto:${contactEmail}`}
                  className="relative w-fit block text-2xl tracking-tight group"
                >
                  {contactEmail}
                  <AnimatedUnderline className="h-[2px]" />
                </a>
              ) : null}
              {contactPhone ? (
                <a
                  href={`tel:${contactPhone.replace(/\s/g, '')}`}
                  className="relative w-fit block text-2xl tracking-tight group"
                >
                  {contactPhone}
                  <AnimatedUnderline className="h-[2px]" />
                </a>
              ) : null}
            </div>
            {socialLinks.length > 0 && (
              <div className="mt-8 py-4 flex items-center gap-3 border-y border-dashed flex-wrap">
                {socialLinks.map((item) =>
                  item.iconSrc ? (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 border rounded-full hover:bg-black group transition-all duration-300"
                    >
                      <Image
                        src={item.iconSrc}
                        width={16}
                        height={16}
                        alt={item.label}
                        className="group-hover:invert"
                      />
                    </a>
                  ) : (
                    <a
                      key={item.id}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium underline-offset-4 hover:underline"
                    >
                      {item.label}
                    </a>
                  )
                )}
              </div>
            )}
          </>
        )}
        {ctaButtons.length > 0 && (
          <div className="pt-10 fixed bottom-1 right-0 w-full md:w-[380px] px-4 pb-4 bg-linear-to-t from-white via-white to-transparent">
            <div className="flex flex-col md:flex-row gap-3">
              {ctaButtons.map((btn) => (
                <SheetClose key={btn.id} asChild>
                  <Link
                    href={btn.href}
                    className={cn(
                      'group w-full justify-center text-center',
                      buttonVariants({
                        variant:
                          btn.variant === 'secondary'
                            ? 'secondary'
                            : btn.variant === 'outline'
                              ? 'outline'
                              : 'default',
                      })
                    )}
                  >
                    {btn.label}
                  </Link>
                </SheetClose>
              ))}
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

function SlideMenuRow({
  item,
  openItems,
  setOpenItems,
  router,
}: {
  item: SiteNavbarItem;
  openItems: Record<string, boolean>;
  setOpenItems: React.Dispatch<React.SetStateAction<Record<string, boolean>>>;
  router: ReturnType<typeof useRouter>;
}) {
  if (item.kind === 'group') {
    return (
      <li>
        <Collapsible
          open={openItems[item.id]}
          onOpenChange={(open) =>
            setOpenItems((prev) => ({ ...prev, [item.id]: open }))
          }
          className="space-y-3.5"
        >
          <CollapsibleTrigger className="relative flex items-center gap-2 text-3xl tracking-tight group">
            <span className="relative">
              {item.label}
              <AnimatedUnderline className="h-[2px]" />
            </span>
            <ChevronDown
              size={23}
              className={cn(
                'translate-y-0.5 rotate-0 transition-transform duration-200',
                {
                  'rotate-180': openItems[item.id],
                }
              )}
            />
          </CollapsibleTrigger>
          <CollapsibleContent className="flex flex-col gap-y-1 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 transition-all duration-200">
            {item.items.map((sub) => (
              <SheetClose key={sub.href}>
                <button
                  type="button"
                  onClick={() => {
                    router.push(sub.href);
                    setOpenItems((prev) => ({ ...prev, [item.id]: false }));
                  }}
                  className="relative block text-xl tracking-tight text-gray-500 hover:text-black group"
                >
                  {sub.label}
                  <AnimatedUnderline className="h-[1.5px] bg-gray-500 group-hover:bg-black" />
                </button>
              </SheetClose>
            ))}
          </CollapsibleContent>
        </Collapsible>
      </li>
    );
  }

  return (
    <li>
      <SheetClose asChild>
        <button
          type="button"
          onClick={() => router.push(item.href)}
          className="relative block text-3xl tracking-tight group w-full text-left"
        >
          {item.label}
          <AnimatedUnderline className="h-[2px]" />
        </button>
      </SheetClose>
    </li>
  );
}
