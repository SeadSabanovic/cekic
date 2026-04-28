/**
 * Kategorije „logičan put gradnje” — moraju se poklapati sa URL parametrom
 * `?sekcija=` i sa vrijednošću polja `kategorija` na Sanity dokumentu `putokaz`.
 */
export const putokaziTradeCategoryIds = [
  'zidovi',
  'podovi',
  'plocice',
  'struja',
  'voda',
  'drvo',
  'metal',
] as const;

export type PutokaziTradeKategorija = (typeof putokaziTradeCategoryIds)[number];

export const putokaziTradeCategoryOptions: Array<{
  title: string;
  value: PutokaziTradeKategorija;
}> = [
  { title: 'Zidovi', value: 'zidovi' },
  { title: 'Podovi', value: 'podovi' },
  { title: 'Pločice', value: 'plocice' },
  { title: 'Struja', value: 'struja' },
  { title: 'Voda', value: 'voda' },
  { title: 'Drvo', value: 'drvo' },
  { title: 'Metal', value: 'metal' },
];

export const putokaziTradeCategoryLabels: Record<
  PutokaziTradeKategorija,
  string
> = {
  zidovi: 'Zidovi',
  podovi: 'Podovi',
  plocice: 'Pločice',
  struja: 'Struja',
  voda: 'Voda',
  drvo: 'Drvo',
  metal: 'Metal',
};

export function isPutokaziTradeKategorija(
  value: string | undefined | null
): value is PutokaziTradeKategorija {
  return (
    !!value &&
    (putokaziTradeCategoryIds as readonly string[]).includes(value)
  );
}

/** Normalizuje `?sekcija=` iz URL-a; nepoznate vrijednosti padaju na `sve`. */
export function normalizePutokaziTradeQueryParam(
  raw: string | string[] | undefined
): 'sve' | PutokaziTradeKategorija {
  const v = Array.isArray(raw) ? raw[0] : raw;
  if (!v || v === 'sve') return 'sve';
  if (isPutokaziTradeKategorija(v)) return v;
  return 'sve';
}
