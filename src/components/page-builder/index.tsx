"use client"
import dynamic from "next/dynamic";
import { ComponentType } from "react";
import { PageBuilderType } from "@/types";
import { PageBySlugQueryResult } from "../../../sanity.types";

const HeroBlock = dynamic(() => import("./blocks/hero-block"));
const HeaderBlock = dynamic(() => import("./blocks/header-block"));
const FeatureCardsBlock = dynamic(() => import("./blocks/feature-cards-block"));
const LogoBlock = dynamic(() => import("./blocks/logo-block"));
const FreeformBlock = dynamic(() => import("./blocks/freeform-block"));
const PortableTextBlock = dynamic(() => import("./blocks/portable-text-block"));
const CallToActionBlock = dynamic(() => import("./blocks/call-to-action-block"));
const FeaturesMinimalBlock = dynamic(() => import("./blocks/features-minimal-block"));
const MediaBlock = dynamic(() => import("./blocks/media-block"));

type PageBlock = NonNullable<
  NonNullable<PageBySlugQueryResult>["pageBuilder"]
>[number];

export type PageBuilderProps = {
  pageBuilder: PageBlock[];
};

const PB_BLOCKS = {
  heroBlock: HeroBlock,
  headerBlock: HeaderBlock,
  featureCardsBlock: FeatureCardsBlock,
  logoBlock: LogoBlock,
  freeformBlock: FreeformBlock,
  portableTextBlock: PortableTextBlock,
  callToActionBlock: CallToActionBlock,
  featuresMinimalBlock: FeaturesMinimalBlock,
  mediaBlock: MediaBlock,
} as const;

type BlockType = keyof typeof PB_BLOCKS;

type ActivePageBlock = Extract<PageBlock, { _type: BlockType }>;

function isActivePageBlock(block: PageBlock): block is ActivePageBlock {
  return block._type in PB_BLOCKS;
}

export function PageBuilder({ pageBuilder }: PageBuilderProps) {
  return (
    <div>
      {pageBuilder.map((block) => {
        if (!isActivePageBlock(block)) return null;
        const Component = PB_BLOCKS[block._type] as ComponentType<
          PageBuilderType<BlockType>
        >;
        return (
          <div key={`${block._type}-${block._key}`}>
            <Component {...block} />
          </div>
        );
      })}
    </div>
  );
}