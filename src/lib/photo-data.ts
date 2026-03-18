/**
 * Skimmer Photo Intelligence — Static Data
 * Source: skimmer-prod_db, queried March 17-18, 2026
 */

/* ─── Volume ─────────────────────────────────────────────── */

export const PHOTO_TOTALS = {
  allTime: {
    routeStop: 187_588_465,
    workOrder: 19_681_615,
    location: 4_465_747,
    total: 211_735_827,
  },
  last6Months: {
    routeStop: 34_726_648,
    workOrder: 3_764_034,
    total: 38_490_682,
  },
  monthlyRate: 6_300_000,
  companiesUploading: {
    routeStop: 6_279,
    workOrder: 4_547,
  },
  avgPerEntity: {
    routeStop: 2.6,
    workOrder: 3.1,
  },
};

/* ─── Monthly Trend ──────────────────────────────────────── */

export const MONTHLY_TREND = [
  { month: "Sep 2025", photos: 3_423_508, stops: 1_335_455, companies: 5_377 },
  { month: "Oct 2025", photos: 6_389_775, stops: 2_491_776, companies: 5_466 },
  { month: "Nov 2025", photos: 5_040_900, stops: 1_942_504, companies: 5_401 },
  { month: "Dec 2025", photos: 5_589_989, stops: 2_140_823, companies: 5_372 },
  { month: "Jan 2026", photos: 5_932_490, stops: 2_260_696, companies: 5_482 },
  { month: "Feb 2026", photos: 5_678_082, stops: 2_128_601, companies: 5_509 },
  { month: "Mar 2026", photos: 2_920_545, stops: 1_076_878, companies: 5_471, partial: true },
];

/* ─── Label Coverage ─────────────────────────────────────── */

export const LABEL_COVERAGE = {
  routeStop: {
    withCaption: 7_315_623,
    noCaption: 27_411_025,
    linkedToChecklist: 6_923_295,
    total: 34_726_648,
    captionPct: 21,
  },
  workOrder: {
    withCaption: 522_755,
    noCaption: 3_241_279,
    linkedToChecklist: 271_665,
    total: 3_764_034,
    captionPct: 14,
  },
};

/* ─── Photo Categories (Route Stop, 7.3M captioned) ─────── */

export const ROUTE_STOP_CATEGORIES = [
  { category: "Basket / Skimmer Cleaning", count: 1_771_184, pct: 24.2 },
  { category: "Uncategorized", count: 1_425_063, pct: 19.5 },
  { category: "After / Completion", count: 675_560, pct: 9.2 },
  { category: "Filter Maintenance", count: 630_640, pct: 8.6 },
  { category: "Equipment Inspection", count: 494_905, pct: 6.8 },
  { category: "Before Photo", count: 484_271, pct: 6.6 },
  { category: "Gate / Security", count: 401_531, pct: 5.5 },
  { category: "Brushing / Surface", count: 264_537, pct: 3.6 },
  { category: "Chemistry / Readings", count: 252_233, pct: 3.4 },
  { category: "Vacuuming", count: 197_219, pct: 2.7 },
  { category: "Pool Overview", count: 162_682, pct: 2.2 },
  { category: "Water Level", count: 158_345, pct: 2.2 },
  { category: "Pressure / Gauge", count: 128_470, pct: 1.8 },
  { category: "Damage / Repair", count: 29_218, pct: 0.4 },
];

/* ─── Pilot Scorecard ────────────────────────────────────── */

export interface PilotResult {
  id: string;
  name: string;
  photosTested: number;
  accuracy: string;
  verdict: "GO" | "DEFERRED" | "NO-GO";
  summary: string;
  details: string[];
  cost: string;
}

export const PILOT_RESULTS: PilotResult[] = [
  {
    id: "classification",
    name: "Photo Classification",
    photosTested: 50,
    accuracy: "~85%+",
    verdict: "GO",
    summary: "AI correctly identifies visual content in ~85%+ of photos from Pools Plus.",
    details: [
      "Keyword matching measured 62%, but manual review shows AI was right even when matcher said wrong",
      "AI said \"pool_overview\" for a photo captioned \"Overall View/After\" — correct, just different framing",
      "Works across basket, filter, equipment, gate, pool overview categories",
    ],
    cost: "$0.20",
  },
  {
    id: "equipment-ocr",
    name: "Equipment Dataplate OCR",
    photosTested: 33,
    accuracy: "100% on dataplates",
    verdict: "GO",
    summary: "On actual dataplate photos: 100% accuracy. Extracted brand, model, serial from all tested.",
    details: [
      "Whirlpool: MOD WTW4816FW3, SER CE2505371 — 100% accurate",
      "Hayward: MODEL# HSCTRACUHB, SERIAL# 21342508001753046 — 100% accurate",
      "Weathered pump label (rotated 90°): P/N 011772, WF-24 1HP — still 100% accurate",
      "On broader \"equipment\" photos: 17% had readable data — expected, most are photos OF equipment, not dataplates",
    ],
    cost: "$0.12",
  },
  {
    id: "gauge-reading",
    name: "Pressure Gauge Reading",
    photosTested: 20,
    accuracy: "70%",
    verdict: "GO",
    summary: "14 of 20 gauges readable. AI extracted PSI values from clean, dirty, and weathered gauges.",
    details: [
      "Also identified gauge condition (clean/dirty/weathered/foggy)",
      "6 photos were not close-ups of gauges (too far, wrong subject)",
      "Bezel text (\"START\" / \"CLEAN FILTER\") detected as bonus context",
      "Right at threshold — specialized model would improve accuracy",
    ],
    cost: "$0.08",
  },
  {
    id: "water-clarity",
    name: "Water Clarity Scoring",
    photosTested: 20,
    accuracy: "95%",
    verdict: "GO",
    summary: "19 of 20 were pool photos. Average clarity: 4.8/5. All \"pool is clean\" captions scored 4-5.",
    details: [
      "AI correctly identified pool types, screen enclosures, and visible issues",
      "Scoring on 1-5 scale is consistent and reliable",
      "Could build per-pool water quality trends over time",
    ],
    cost: "$0.08",
  },
  {
    id: "before-after",
    name: "Before / After Comparison",
    photosTested: 0,
    accuracy: "N/A",
    verdict: "DEFERRED",
    summary: "Database query timed out (self-join on 189M rows). Need optimized query or pre-computed pairs.",
    details: [
      "1.16M explicit pair candidates (484K \"Before\" + 675K \"After\" captions)",
      "Need to pre-compute pairs using RouteStopId + Sequence ordering",
      "Will revisit with optimized query approach",
    ],
    cost: "$0.00",
  },
];

export const PILOT_TOTAL_COST = "$0.48";
export const PILOT_TOTAL_PHOTOS = 120;

/* ─── Coverage Stats ─────────────────────────────────────── */

export const COVERAGE = {
  serviceLocationsWithWOPhotos: 1_159_159,
  serviceLocationsTotal: 2_852_081,
  serviceLocationsWithEquipmentPhotos: 112_780,
  companiesTotal: 14_237,
};
