import type { Metadata } from "next";
import Container from "@/components/global/container";
import Heading from "@/components/shared/heading";
import { siteNavigation } from "@/lib/site-navigation";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontakt informacije i način da brzo stupite u kontakt.",
};

export default function ContactPage() {
  const { contactEmail, contactPhone } = siteNavigation.slideOut;

  return (
    <div className="px-4 xl:px-10 pattern-bg">
      <Container className="px-4 pt-32 md:pt-40 pb-14 md:pb-24 border-x border-dashed space-y-8">
        <Heading tag="h1" size="xxl" className="max-w-3xl text-balance">
          Kontakt
        </Heading>
        <p className="max-w-3xl text-lg text-neutral-600 leading-relaxed text-balance">
          Pišite nam za ponudu, savjet ili pitanje vezano za vaš projekat.
        </p>

        <div className="space-y-3 text-neutral-700">
          <p>
            Email:{" "}
            <a className="underline underline-offset-4" href={`mailto:${contactEmail || "hello@example.com"}`}>
              {contactEmail || "hello@example.com"}
            </a>
          </p>
          <p>
            Telefon:{" "}
            <a
              className="underline underline-offset-4"
              href={`tel:${(contactPhone || "+38760000000").replace(/\s/g, "")}`}
            >
              {contactPhone || "+387 60 000 000"}
            </a>
          </p>
        </div>
      </Container>
    </div>
  );
}
