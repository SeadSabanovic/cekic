import type { Metadata } from "next";
import ClientLayout from "@/components/global/client-layout";
import { siteSettings } from "@/lib/site-settings";

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
  return (
    <ClientLayout settings={siteSettings}>
      {children}
    </ClientLayout>
  );
}