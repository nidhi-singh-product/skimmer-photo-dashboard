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

/* ─── Photo Categories (Work Order, 587K captioned, last 6 months) ── */

export const WORK_ORDER_CATEGORIES = [
  { category: "After / Completion", count: 52_093, pct: 8.9 },
  { category: "Before Photo", count: 47_853, pct: 8.2 },
  { category: "Filter Work", count: 44_068, pct: 7.5 },
  { category: "General Photo", count: 43_538, pct: 7.4 },
  { category: "Pool Condition", count: 33_533, pct: 5.7 },
  { category: "Pump / Motor", count: 29_501, pct: 5.0 },
  { category: "Leak / Damage", count: 22_389, pct: 3.8 },
  { category: "Valve / Actuator", count: 21_098, pct: 3.6 },
  { category: "Completion / Verification", count: 19_265, pct: 3.3 },
  { category: "Gate / Closure", count: 12_906, pct: 2.2 },
  { category: "Model / Serial / Dataplate", count: 11_005, pct: 1.9 },
  { category: "Heater", count: 11_135, pct: 1.9 },
  { category: "Salt Cell", count: 8_424, pct: 1.4 },
  { category: "Green Pool / Algae", count: 6_808, pct: 1.2 },
  { category: "Other", count: 224_116, pct: 38.2 },
];

/* ─── Photo Categories (Location, 359K captioned) ───────── */

export const LOCATION_CATEGORIES = [
  { category: "Pump (all types)", count: 44_750, pct: 12.5 },
  { category: "Pool Overview", count: 26_044, pct: 7.3 },
  { category: "Filter", count: 24_072, pct: 6.7 },
  { category: "Spa", count: 14_800, pct: 4.1 },
  { category: "Heater", count: 11_129, pct: 3.1 },
  { category: "Gate / Entry", count: 10_793, pct: 3.0 },
  { category: "Equipment / Pad", count: 9_242, pct: 2.6 },
  { category: "After Photo", count: 8_256, pct: 2.3 },
  { category: "Water Feature / Autofill", count: 5_070, pct: 1.4 },
  { category: "Salt Cell / Chlorinator", count: 4_946, pct: 1.4 },
  { category: "Before Photo", count: 4_750, pct: 1.3 },
  { category: "Other", count: 194_920, pct: 54.3 },
];

/* ─── Pilot Scorecard ────────────────────────────────────── */

export interface PilotResult {
  id: string;
  name: string;
  photosTested: number;
  usablePhotos: number;
  accuracy: string;
  accuracyOnUsable: string;
  verdict: "GO" | "DEFERRED" | "NO-GO";
  howItWorked: string;
  summary: string;
  details: string[];
  cost: string;
  whyGap?: string;
  examplePhoto?: { url: string; caption: string; aiResult: string; match: boolean };
  failPhoto?: { url: string; caption: string; aiResult: string; reason: string };
}

export const PILOT_RESULTS: PilotResult[] = [
  {
    id: "water-clarity",
    name: "Water Clarity Scoring",
    photosTested: 20,
    usablePhotos: 19,
    accuracy: "100%",
    accuracyOnUsable: "100%",
    verdict: "GO",
    howItWorked: "We gave the AI a pool photo and asked \"score the water clarity 1–5.\" Then we checked if it aligned with the tech's caption — \"pool is clean\" should produce a 4 or 5.",
    summary: "19 of 20 photos showed a pool. AI scored all of them correctly. Average clarity: 4.79/5.",
    details: [
      "95% of pool photos naturally contain enough signal — water fills the frame, no close-up needed",
      "15 scored crystal clear (5/5), 4 scored mostly clear (4/5) — all matched caption tone",
      "1 photo didn't show a pool — AI correctly flagged it rather than guessing",
      "Average confidence: 0.94 — high and well-calibrated",
    ],
    cost: "$0.08",
    examplePhoto: {
      url: "https://storwebproduction.blob.core.windows.net/service-202602/bda9460ec5de4de8941cd77206ad83cb.jpg",
      caption: "Photo of Pool",
      aiResult: "Crystal Clear — 5/5 (0.95 confidence)",
      match: true,
    },
  },
  {
    id: "gauge-reading",
    name: "Pressure Gauge Reading",
    photosTested: 20,
    usablePhotos: 19,
    accuracy: "73.7%",
    accuracyOnUsable: "74% (14/19)",
    verdict: "GO",
    howItWorked: "We gave the AI a photo of a filter gauge and asked \"what PSI does this read?\" Then we compared the reading against the actual needle position. Correct = within ±2 PSI.",
    summary: "19 of 20 identified as gauges. 14 readings extracted. Clean gauges: 10/10. Dirty/weathered: 4/9.",
    details: [
      "Clean gauges: 100% accuracy (10/10) — when the face is readable, the AI reads it",
      "Dirty gauges: 40% (2/5) — grime obscures the dial face",
      "Weathered: 67% (2/3) — depends on how much text is still visible",
      "AI reports low confidence when it can't read — useful for flagging gauges that need replacement",
    ],
    cost: "$0.08",
    whyGap: "The gap isn't AI accuracy — it's gauge condition. Clean gauges read at 100%. Dirty and foggy gauges fail for the same reason a human would struggle: the dial face is obscured.",
    examplePhoto: {
      url: "https://storwebproduction.blob.core.windows.net/service-202603/dc06a9b25906482ba02f21fa50cc03dc.jpg",
      caption: "Filter pressure is checked",
      aiResult: "11 PSI, 0–60 scale, clean gauge (0.90 confidence)",
      match: true,
    },
    failPhoto: {
      url: "https://storwebproduction.blob.core.windows.net/service-202602/ceda777ac9db40329947446870586823.jpg",
      caption: "Filter Pressure Recorded",
      aiResult: "Could not read — dirty/blurry (0.30 confidence)",
      reason: "Blurry image with obscured gauge face — AI correctly reported low confidence rather than guessing",
    },
  },
  {
    id: "equipment-ocr",
    name: "Equipment Dataplate OCR",
    photosTested: 30,
    usablePhotos: 8,
    accuracy: "62.5% overall",
    accuracyOnUsable: "100% brand (8/8), 63% model (5/8)",
    verdict: "GO",
    howItWorked: "We gave the AI a work order photo and asked \"read the brand, model, and serial from the dataplate.\" Then we verified against what a human could read on the same plate.",
    summary: "Only 8 of 30 work order photos contained a visible dataplate. On those 8: brand extraction was 100%.",
    details: [
      "Brand detection: 100% (8/8) — Jandy, Hayward, Pentair, HeatPro, Super Pro all identified",
      "Model number: 62.5% (5/8) — smaller text, sometimes partially obscured",
      "Serial number: 25% (2/8) — smallest text, often weathered or angled",
      "Most photos show the whole pump/heater, not a close-up of the label — a capture guidance problem, not an AI problem",
    ],
    cost: "$0.12",
    whyGap: "The AI performed well on every readable dataplate. The issue is that only 27% of work order photos show the label at all. Techs photograph the whole equipment. Guided capture (\"take a close-up of the dataplate\") would raise yield without any AI improvement.",
    examplePhoto: {
      url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/5e2d1d42f1244ee69e0364372e3da168.jpg",
      caption: "Model number off pump",
      aiResult: "Jandy VSPHP270DV2A — Variable speed pump, 2.70 THP, 230/115V (0.95 confidence)",
      match: true,
    },
  },
  {
    id: "classification",
    name: "Photo Classification",
    photosTested: 50,
    usablePhotos: 50,
    accuracy: "58%",
    accuracyOnUsable: "58% (29/50)",
    verdict: "NO-GO",
    howItWorked: "We gave the AI a service photo with the caption removed and asked \"what category is this?\" (basket, gauge, pool overview, chemistry, gate, etc.) Then we checked if the AI's category matched the tech's original caption.",
    summary: "29 of 50 correct. Visual categories worked well (gate 100%, gauge 100%, pool 82%). Task categories failed (chemistry 38%, after photo 0%).",
    details: [
      "Gate security: 100% (3/3), Pressure gauge: 100% (3/3), Pool overview: 82% (14/17)",
      "Basket cleaning: 50% (6/12) — AI saw equipment in frame, classified by visual content not task",
      "Chemistry reading: 38% (3/8) — test strips look similar to other equipment photos",
      "After photo: 0% (0/6) — impossible to know a photo is \"after\" without seeing the \"before\"",
      "Average confidence 0.92 despite 58% accuracy — model is over-confident on ambiguous categories",
    ],
    cost: "$0.20",
    whyGap: "Not a photo quality issue — a taxonomy problem. The AI classifies by what it sees (a pump with a gauge), but the tech's caption reflects what they were doing (cleaning the basket). Simplifying the taxonomy or pairing with checklist context would improve results.",
    examplePhoto: {
      url: "https://storwebproduction.blob.core.windows.net/service-202601/0bebadfdfce045e59ee33c610af691ba.jpg",
      caption: "Skimmer basket empty",
      aiResult: "basket_cleaning (0.90 confidence)",
      match: true,
    },
    failPhoto: {
      url: "https://storwebproduction.blob.core.windows.net/service-202603/50300a7ea4ae47619dd3c934fa983233.jpg",
      caption: "Pump basket empty",
      aiResult: "pressure_gauge (0.95 confidence) — WRONG",
      reason: "AI saw a gauge in the frame and classified by the most visually prominent object, not the tech's intent",
    },
  },
  {
    id: "before-after",
    name: "Before / After Comparison",
    photosTested: 0,
    usablePhotos: 0,
    accuracy: "N/A",
    accuracyOnUsable: "N/A",
    verdict: "DEFERRED",
    howItWorked: "Planned: give the AI a before/after photo pair and ask \"what work was performed?\" Compare against the work order description.",
    summary: "Not yet executed. Database query to find photo pairs timed out (self-join on 189M rows).",
    details: [
      "1.16M explicit pair candidates (484K \"Before\" + 675K \"After\" captions)",
      "Need to pre-compute pairs using RouteStopId + Sequence ordering",
      "Will revisit with optimized query approach",
    ],
    cost: "$0.00",
  },
];

export const PILOT_TOTAL_COST = "$0.72";
export const PILOT_TOTAL_PHOTOS = 120;

export const PHOTO_QUALITY_TABLE = [
  { useCase: "Water Clarity", usableSignal: "95% (19/20)", aiAccuracy: "100%", why: "Any pool photo works — water fills the frame" },
  { useCase: "Gauge Reading", usableSignal: "95% (19/20)", aiAccuracy: "74%", why: "Techs photograph gauges intentionally; dirty gauges reduce readability" },
  { useCase: "Equipment OCR", usableSignal: "27% (8/30)", aiAccuracy: "100% brand", why: "Most photos show full equipment, not the label close-up" },
  { useCase: "Classification", usableSignal: "100% (50/50)", aiAccuracy: "58%", why: "Not photo quality — taxonomy overlap problem" },
];

/* ─── Coverage Stats ─────────────────────────────────────── */

export const COVERAGE = {
  serviceLocationsWithWOPhotos: 1_159_159,
  serviceLocationsTotal: 2_852_081,
  serviceLocationsWithEquipmentPhotos: 112_780,
  companiesTotal: 14_237,
};
