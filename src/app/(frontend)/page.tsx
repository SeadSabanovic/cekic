import { Metadata } from "next";
import { processMetadata } from "@/lib/utils";
import { sanityFetch } from "@/sanity/lib/sanity-fetch";
import Container from "@/components/global/container";
import { PageBuilder } from "@/components/page-builder";
import type { GeneralSettingsQueryResult, PageBySlugQueryResult } from "../../../sanity.types";
import { pageBySlugQuery } from "@/sanity/lib/queries/documents/page";
import { generalSettingsQuery } from "@/sanity/lib/queries/singletons/settings";

export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch<GeneralSettingsQueryResult | null>({
    query: generalSettingsQuery,
  });

  const page = settings?.homePage;

  if (!page) { return {} };

  return processMetadata({ data: page as PageBySlugQueryResult });
}

export default async function Home() {

  const { data: settings } = await sanityFetch<GeneralSettingsQueryResult | null>({
    query: generalSettingsQuery,
  });

  if (settings?.homePage === null) return (
    <Container className="py-16">
      No Homepage Set...
    </Container>
  )

  const { data: page } = await sanityFetch<PageBySlugQueryResult | null>({ 
    query: pageBySlugQuery, 
    params: { slug: settings?.homePage?.slug },
  });

  return(
    <div id="home">
      <PageBuilder pageBuilder={page?.pageBuilder ?? []} />
    </div>
  )
}