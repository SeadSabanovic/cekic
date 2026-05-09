import type { LucideIcon } from 'lucide-react';

import { putokaziTradeCategoryOptions } from '@/lib/putokazi-trade-categories';

export type RoadmapCategory = 'uradi-sam' | 'zanatski-putevi';

export type RoadmapDifficulty = 'pocetni' | 'srednji' | 'napredni';

/** Zarada, vrijeme do zarade, potražnja — minikartice ispod naslova (npr. početna). */
export type RoadmapCardStats = {
  zarada: string;
  vrijeme: string;
  potraznja: string;
};

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  difficulty: RoadmapDifficulty;
  duration: string;
  icon: LucideIcon;
  /** Porijeklo zapisa na listi (za React key i ponašanje). */
  listSource?: 'roadmapHub' | 'putokaz' | 'projekat';
  /** Oznaka iz CMS-a (`kategorija`), npr. „Zidovi”. */
  tradeLabel?: string | null;
  /** Opcionalna naslovna slika (npr. iz CMS-a). */
  cover?: {
    url: string;
    alt: string;
  } | null;
  /**
   * Iz CMS polja `locked` — kartica ostaje vidljiva, ali kao „Uskoro”
   * (npr. početni karusel bez linka).
   */
  locked?: boolean;
  /** Zarada, vrijeme, potražnja — prikaz ispod naslova na kartici. */
  cardStats: RoadmapCardStats;
}

export const difficultyLabel: Record<RoadmapDifficulty, string> = {
  pocetni: 'Početni',
  srednji: 'Srednji',
  napredni: 'Napredni',
};

/** Filteri na listi putokaza — logičan put gradnje (?sekcija=…). */
export type PutokaziTradeFilterId =
  | 'sve'
  | (typeof putokaziTradeCategoryOptions)[number]['value'];

export type PutokaziTradeFilterItem = {
  id: PutokaziTradeFilterId;
  label: string;
};

/** Redoslijed: sve → zidovi → … → metal; vrijednosti = `putokaz.kategorija` u CMS-u. */
export function getPutokaziTradeFilters(): PutokaziTradeFilterItem[] {
  return [
    { id: 'sve', label: 'Sve' },
    ...putokaziTradeCategoryOptions.map((o) => ({
      id: o.value,
      label: o.title,
    })),
  ];
}
