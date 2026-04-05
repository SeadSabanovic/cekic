import Link from "next/link";
import { Metadata } from "next";
import { cn } from "@/lib/utils";
import Container from "@/components/global/container";
import Heading from "@/components/shared/heading";
import { buttonVariants } from "@/components/ui/button";
import { getHomeMetadata, homePageContent } from "@/lib/home-page";
import { siteNavigation } from "@/lib/site-navigation";

export function generateMetadata(): Metadata {
  return getHomeMetadata();
}

export default function Home() {
  const primaryCta = siteNavigation.navbar.find(
    (item) => item.kind === "single" && item.id === "about"
  );
  const secondaryCta = siteNavigation.navbar.find(
    (item) => item.kind === "single" && item.href === "/kontakt"
  );

  return (
    <div id="home" className="overflow-hidden">
      <div className="px-4 xl:px-10 pattern-bg">
        <Container className="px-4 pt-32 md:pt-40 pb-14 md:pb-28 border-x border-dashed">
          <Heading tag="h1" size="xxxl" className="w-fit max-w-3xl text-balance">
            {homePageContent.headline}
          </Heading>
          <p className="mt-6 text-lg text-neutral-600 max-w-2xl text-balance leading-relaxed">
            {homePageContent.lead}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {primaryCta && primaryCta.kind === "single" && (
              <Link
                href={primaryCta.href}
                className={cn("group", buttonVariants({ variant: "primary" }))}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && secondaryCta.kind === "single" && (
              <Link
                href={secondaryCta.href}
                className={cn("group", buttonVariants({ variant: "outline" }))}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        </Container>
      </div>
    </div>
  );
}
