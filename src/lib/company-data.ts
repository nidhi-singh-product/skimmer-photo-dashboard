/**
 * Company Deep Dive data — queried March 19, 2026
 * Two companies: Pools Plus (gold standard) and Total Pool Care (typical)
 */

export interface CompanyProfile {
  id: string;
  name: string;
  tag: string;
  tagColor: string;
  tagBg: string;
  description: string;
  stats: {
    totalPhotos: number;
    withCaption: number;
    captionPct: number;
    serviceLocations: number;
    customers: number;
    uniqueStops: number;
    photosPerStop: number;
    woPhotos: number;
    woEquipmentKeywords: number;
  };
  categories: { category: string; count: number }[];
  samplePhotos: { url: string; caption: string }[];
  insights: string[];
}

export const COMPANIES_DATA: CompanyProfile[] = [
  {
    id: "pools-plus",
    name: "Pools Plus",
    tag: "Gold Standard",
    tagColor: "text-sk-moss-700",
    tagBg: "bg-sk-moss-100 border-sk-moss-700/20",
    description: "98% caption rate — nearly every photo is labeled. This is the best-case scenario: a complete, classified photo database built from existing technician behavior.",
    stats: {
      totalPhotos: 145_496,
      withCaption: 142_805,
      captionPct: 98.1,
      serviceLocations: 5_445,
      customers: 5_366,
      uniqueStops: 18_188,
      photosPerStop: 8.0,
      woPhotos: 8_240,
      woEquipmentKeywords: 2_079,
    },
    categories: [
      { category: "Pool Overview", count: 37_721 },
      { category: "Basket / Skimmer", count: 34_489 },
      { category: "After / Completion", count: 18_735 },
      { category: "Pressure / Gauge", count: 17_243 },
      { category: "Gate / Security", count: 16_933 },
      { category: "Chemistry / Readings", count: 10_824 },
      { category: "Other", count: 3_875 },
      { category: "Brushing / Surface", count: 2_838 },
      { category: "Filter Maintenance", count: 46 },
      { category: "Before Photo", count: 38 },
      { category: "Damage / Repair", count: 38 },
      { category: "Equipment Inspection", count: 15 },
    ],
    samplePhotos: [
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/c45f8b0f40834ef9872c035f53eefe36.jpg", caption: "Overall View/After" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/89b45a8408f94d07b66efebec7830e61.jpg", caption: "Pump basket empty" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/df79d413c0f848d3b67d97efb12524c5.jpg", caption: "PSI on high speed" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/b3bdbf2fa1694118a015e382b6311d86.jpg", caption: "Deep End Of Pool (shows clarity)" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/a962dfe31236434298b98fb390a15f5c.jpg", caption: "Side gate closed" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/ac829b51027b42b5a889743eba0b0e41.jpg", caption: "Skimmer basket empty" },
    ],
    insights: [
      "With 2,079 work order photos containing equipment keywords, we could build equipment profiles for a significant portion of their 5,445 service locations.",
      "Their 17,243 pressure gauge photos over 6 months could power automated filter pressure trending for every customer.",
      "98% caption rate means AI classification would only need to handle 2% of their photos — the rest are already categorized.",
    ],
  },
  {
    id: "total-pool-care",
    name: "Total Pool Care",
    tag: "Typical Company",
    tagColor: "text-sk-sunrise",
    tagBg: "bg-sk-sunrise-100 border-sk-sunrise/20",
    description: "27% caption rate — representative of a typical Skimmer company. 73% of photos have no metadata. This is where AI classification adds the most value.",
    stats: {
      totalPhotos: 66_412,
      withCaption: 17_832,
      captionPct: 26.8,
      serviceLocations: 1_281,
      customers: 1_275,
      uniqueStops: 15_676,
      photosPerStop: 4.2,
      woPhotos: 1_411,
      woEquipmentKeywords: 2,
    },
    categories: [
      { category: "Basket / Skimmer", count: 7_446 },
      { category: "Pressure / Gauge", count: 6_473 },
      { category: "Vacuuming", count: 2_110 },
      { category: "Filter Maintenance", count: 635 },
      { category: "Pool Overview", count: 514 },
      { category: "Other", count: 474 },
      { category: "Gate / Security", count: 139 },
      { category: "Chemistry / Readings", count: 23 },
      { category: "After / Completion", count: 10 },
      { category: "Brushing / Surface", count: 5 },
      { category: "Before Photo", count: 1 },
      { category: "Damage / Repair", count: 1 },
    ],
    samplePhotos: [
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/fe066325e1ab40bcb0151f6dc6f870be.jpg", caption: "Vacuumed To Filter" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/f0010404dfd145bda1920eb47e722bb1.jpg", caption: "Emptied Pump Baskets" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/e41577dee7874d20a7af0694c8fc07c6.jpg", caption: "Picture of PSI" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/05b1718427ba4d76a5ab988ba22ac30c.jpg", caption: "Emptied Pump Baskets" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/75790fcc73b640fda931b4e08cdd8fca.jpg", caption: "Picture of PSI" },
      { url: "https://storwebproduction.blob.core.windows.net/service-202603/c76d1eafbe8e4679a23e71ba59e4edeb.jpg", caption: "Emptied Pump Baskets" },
    ],
    insights: [
      "48,580 photos (73%) have no caption. AI classification would categorize all of them — instantly turning invisible data into searchable categories.",
      "Even with only 27% caption rate, they already have 6,473 pressure gauge photos that could power automated PSI tracking.",
      "With 1,281 service locations, even basic equipment identification from work order photos would add significant value.",
    ],
  },
];
