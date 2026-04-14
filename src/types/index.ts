/**
 * Tipovi za dugmad (UI) — nezavisno od Sanity šeme; proširi kad uvezete CMS polja.
 */
export type ButtonPageReference = {
  _type?: string;
  slug?: string | null;
};

export type ButtonType = {
  buttonType?: "internal" | "anchor" | "external" | "fileDownload" | "emailAddress";
  buttonPageReference?: ButtonPageReference | null;
  buttonExternalUrl?: string | null;
  buttonAnchorLocation?: "currentPage" | "otherPage";
  buttonAnchorId?: string | null;
  buttonEmailAddress?: string | null;
};
