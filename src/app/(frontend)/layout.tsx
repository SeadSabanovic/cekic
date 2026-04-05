import type { Metadata } from "next";
import Container from "@/components/global/container";
import { sanityFetch } from "@/sanity/lib/sanity-fetch";
import ClientLayout from "@/components/global/client-layout";
import { navigationSettingsQuery } from "@/sanity/lib/queries/singletons/navigation";
import { generalSettingsQuery } from "@/sanity/lib/queries/singletons/settings";
import type { GeneralSettingsQueryResult, NavigationSettingsQueryResult } from "../../../sanity.types";

export const metadata: Metadata = {
  title: {
    template: `%s | ${process.env.NEXT_PUBLIC_SITE_NAME}`,
    default: `${process.env.NEXT_PUBLIC_SITE_NAME}`,
  },
  description: "Čekić — web prezentacija.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const [{ data: settings }, { data: navigationSettings }] = await Promise.all([
    sanityFetch<GeneralSettingsQueryResult | null>({ query: generalSettingsQuery }),
    sanityFetch<NavigationSettingsQueryResult | null>({ query: navigationSettingsQuery })
  ]);

  if (!settings) return (
    <Container className="py-16 flex flex-col items-center justify-center gap-3 min-h-dvh pattern-bg--2 text-center px-6">
      <p className="text-lg font-semibold text-neutral-900">
        Sanity još nije konfigurisan
      </p>
      <p className="max-w-md text-sm text-neutral-600 text-balance">
        U Studiju kreiraj dokument <strong>General</strong> postavki (singleton) i popuni osnovna polja, ili provjeri varijable okruženja za projekat i dataset.
      </p>
    </Container>
  )
  
  return (
    <>
      <ClientLayout
        settings={settings}
        navigationSettings={navigationSettings}
      >
        {children}
      </ClientLayout>
    </>
  );
}