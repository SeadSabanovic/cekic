import { 
  heroBlockQuery, 
  headerBlockQuery,
  featureBlockQuery,
  featureCardsBlockQuery,
  featuresMinimalBlockQuery,
  callToActionBlockQuery,
  logoBlockQuery,
  freeformBlockQuery,
  portableTextBlockQuery,
  blogArchiveBlockQuery,
  mediaBlockQuery,
} from "./blocks";

export const pageBuilder = `
  pageBuilder[] {
    ${heroBlockQuery},
    ${headerBlockQuery},
    ${featureBlockQuery},
    ${featureCardsBlockQuery},
    ${featuresMinimalBlockQuery},
    ${callToActionBlockQuery},
    ${logoBlockQuery},
    ${freeformBlockQuery},
    ${portableTextBlockQuery},
    ${blogArchiveBlockQuery},
    ${mediaBlockQuery}
  }
`