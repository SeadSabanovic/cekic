import type { LucideIcon } from 'lucide-react';
import {
  Bath,
  BrickWall,
  Car,
  DoorOpen,
  Droplets,
  Fan,
  Flame,
  Hammer,
  Layers,
  LayoutGrid,
  Paintbrush,
  Palette,
  PanelLeft,
  PlugZap,
  ShowerHead,
  Toilet,
  WashingMachine,
  Wrench,
  Zap,
} from 'lucide-react';

export type RoadmapCategory = 'uradi-sam' | 'zanatski-putevi';

export type RoadmapDifficulty = 'pocetni' | 'srednji' | 'napredni';

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  category: RoadmapCategory;
  difficulty: RoadmapDifficulty;
  duration: string;
  icon: LucideIcon;
  /** Opcionalna naslovna slika (npr. iz CMS-a). */
  cover?: {
    url: string;
    alt: string;
  } | null;
}

export const difficultyLabel: Record<RoadmapDifficulty, string> = {
  pocetni: 'Početni',
  srednji: 'Srednji',
  napredni: 'Napredni',
};

export interface RoadmapSection {
  id: RoadmapCategory;
  title: string;
  lead: string;
  maps: RoadmapItem[];
}

export const roadmapSections: RoadmapSection[] = [
  {
    id: 'uradi-sam',
    title: 'Uradi sam (Osnove održavanja doma)',
    lead: 'Mali koraci koji vraćaju osjećaj kontrole: od zida do odvoda, jasni redoslijed i mir u glavi — bez panike i bez žurbe.',
    maps: [
      {
        id: 'farbanje-zidova',
        title: 'Farbanje zidova',
        description:
          'Kako zaštititi podove, izvući čiste linije krep trakom i nanijeti boju bez tragova valjka.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: 'pol dana',
        icon: Paintbrush,
      },
      {
        id: 'krpanje-rupa-tiplova-eksera',
        title: 'Krpanje rupa od tiplova i eksera',
        description:
          'Priprema glet mase, popunjavanje rupa i lagano šmirglanje za zid koji izgleda kao nov.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '2–3 h',
        icon: BrickWall,
      },
      {
        id: 'zamjena-silikona-kada-sudoper',
        title: 'Zamjena silikona na kadi ili sudoperu',
        description:
          'Uklanjanje buđi i starog silikona, te izvlačenje savršene nove linije pomoću sapunice.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '1–2 h',
        icon: Droplets,
      },
      {
        id: 'stelovanje-sarki-kuhinja',
        title: 'Štelovanje šarki na kuhinjskim elementima',
        description:
          'Kako ispraviti vrata koja "vise" ili zapinju pomoću običnog krstastog odvijača.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: 'oko 1 h',
        icon: Wrench,
      },
      {
        id: 'ciscenje-sifona-odcepljivanje',
        title: 'Čišćenje sifona i odčepljivanje odvoda',
        description:
          'Rastavljanje PVC sifona ispod sudopera i čišćenje bez poplave u kuhinji.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '45 min',
        icon: Bath,
      },
      {
        id: 'zamjena-uticnice-prekidaca',
        title: 'Zamjena utičnice ili prekidača',
        description:
          'Sigurno isključivanje osigurača, spajanje žica (faza, nula, uzemljenje) i fiksiranje u zid.',
        category: 'uradi-sam',
        difficulty: 'srednji',
        duration: '1–2 h',
        icon: PlugZap,
      },
      {
        id: 'montaza-zidne-police-beton-rigips',
        title: 'Montaža zidne police (Beton vs. Rigips)',
        description:
          'Odabir pravog tipla i burgije, te korištenje libele da polica ne stoji "u vinklo".',
        category: 'uradi-sam',
        difficulty: 'srednji',
        duration: '2–3 h',
        icon: Layers,
      },
      {
        id: 'zamjena-mehanizma-vodokotlic',
        title: 'Zamjena mehanizma u vodokotliću',
        description:
          'Stopiranje curenja vode u šolju zamjenom plovka ili zvona (izbacivača vode).',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '1 h',
        icon: Toilet,
      },
      {
        id: 'podmazivanje-vrata-panti',
        title: 'Podmazivanje škripavih vrata i panti',
        description:
          'Gdje nanijeti WD-40 ili mast i kako očistiti stare šarke da vrata klize nečujno.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '30 min',
        icon: DoorOpen,
      },
      {
        id: 'stelovanje-pvc-prozora',
        title: 'Štelovanje PVC prozora (Zimski/Ljetni režim)',
        description:
          'Kako imbus ključem podesiti pritisak krila na gumu da bi prozor bolje dihtovao.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: 'oko 1 h',
        icon: PanelLeft,
      },
      {
        id: 'zamjena-glave-tusa-crijeva',
        title: 'Zamjena glave tuša i crijeva',
        description:
          'Rješavanje slabog pritiska i curenja na spojevima uz pravilno korištenje gumica.',
        category: 'uradi-sam',
        difficulty: 'pocetni',
        duration: '45 min',
        icon: ShowerHead,
      },
      {
        id: 'postavljanje-laminata-zamjena-letve',
        title: 'Postavljanje laminata (zamjena oštećene letve)',
        description:
          'Kako zamijeniti jedan oštećeni komad ili postaviti prelaznu lajsnu koja se odlijepila.',
        category: 'uradi-sam',
        difficulty: 'srednji',
        duration: '2–4 h',
        icon: LayoutGrid,
      },
    ],
  },
  {
    id: 'zanatski-putevi',
    title: 'Zanatski putevi',
    lead: 'Strukturiran put do zanata koji traje: alat, sigurnost, materijali i praksa — korak po korak, kao pravi obrtnik.',
    maps: [
      {
        id: 'elektricar',
        title: 'Električar',
        description:
          'Od razvođenja bužira u grubim radovima do šemiranja razvodnih ormara i finomontaže rasvjete.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Zap,
      },
      {
        id: 'keramicar',
        title: 'Keramičar',
        description:
          'Priprema podloga, hidroizolacija, precizno sječenje i polaganje pločica velikog formata.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Palette,
      },
      {
        id: 'vodoinstalater',
        title: 'Vodoinstalater',
        description:
          'Montaža vodoopskrbnih cijevi, odvodnih sistema i sanitarija (tzv. "bijela tehnika").',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Droplets,
      },
      {
        id: 'gipsar-suva-gradnja',
        title: 'Gipsar (Suva gradnja)',
        description:
          'Izrada pregradnih zidova, spuštenih plafona i termoizolacije pomoću metalnih konstrukcija i rigips ploča.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Layers,
      },
      {
        id: 'stolar-namjestaj-po-mjeri',
        title: 'Stolar (Namještaj po mjeri)',
        description:
          'Od rada na CNC mašinama do sklapanja kuhinja, plakara i obrade masivnog drveta.',
        category: 'zanatski-putevi',
        difficulty: 'napredni',
        duration: 'duži period',
        icon: Hammer,
      },
      {
        id: 'moler-fasader',
        title: 'Moler / Fasader',
        description:
          'Obrada zidova, gletovanje, dekorativne tehnike (npr. Sahara) i postavljanje termo-fasada.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Paintbrush,
      },
      {
        id: 'podopolagac-parketar-laminat',
        title: 'Podopolagač (Parketar/Laminat)',
        description:
          'Priprema estriha, brušenje i lakiranje parketa ili brzo polaganje modernih vinil podova.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: LayoutGrid,
      },
      {
        id: 'bravar-zavarivac',
        title: 'Bravar / Zavarivač',
        description:
          'Izrada metalnih konstrukcija, ograda, te rad sa različitim tehnikama zavarivanja (REL, MIG/MAG, TIG).',
        category: 'zanatski-putevi',
        difficulty: 'napredni',
        duration: 'duži period',
        icon: Flame,
      },
      {
        id: 'monter-grijanja-klimatizacije-hvac',
        title: 'Monter grijanja i klimatizacije (HVAC)',
        description:
          'Postavljanje podnog grijanja, toplotnih pumpi i klima uređaja.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Fan,
      },
      {
        id: 'serviser-bijele-tehnike',
        title: 'Serviser bijele tehnike',
        description:
          'Dijagnostika i popravka veš mašina, frižidera i ugradbenih pećnica (elektronika + mehanika).',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: WashingMachine,
      },
      {
        id: 'automehanicar',
        title: 'Automehaničar',
        description:
          'Redovno održavanje, mehanika motora i dijagnostika kvarova na modernim vozilima.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: Car,
      },
      {
        id: 'monter-stolarije-pvc-aluminijum',
        title: 'Monter stolarije (PVC i Aluminijum)',
        description:
          'Ugradnja prozora, kliznih stijena i roletni, sa fokusom na RAL montažu i dihtovanje.',
        category: 'zanatski-putevi',
        difficulty: 'srednji',
        duration: 'više mjeseci',
        icon: PanelLeft,
      },
    ],
  },
];

export type PutokaziSectionFilterId =
  | 'sve'
  | RoadmapCategory
  | 'alati'
  | 'materijali';

export type PutokaziSectionFilterItem = {
  id: PutokaziSectionFilterId;
  label: string;
};

/** Stavke za horizontalnu traku filtera na /putokazi (?sekcija=…). */
export function getPutokaziSectionFilters(): PutokaziSectionFilterItem[] {
  return [
    { id: 'sve', label: 'Sve' },
    ...roadmapSections.map((s) => ({
      id: s.id,
      label: s.id === 'uradi-sam' ? 'Uradi sam' : s.title,
    })),
    { id: 'alati', label: 'Alati' },
    { id: 'materijali', label: 'Materijali' },
  ];
}
