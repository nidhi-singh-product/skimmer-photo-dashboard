/**
 * Sample photos pulled from Skimmer production database — March 18, 2026
 * Used for the Photo Explorer page to demonstrate AI classification potential
 */

export interface SamplePhoto {
  url: string;
  caption: string;
  company: string;
  source: "Route Stop" | "Work Order";
  date: string;
  category: string;
}

export const SAMPLE_PHOTOS: SamplePhoto[] = [
  // ── Pools Plus — Route Stops (98% caption rate) ────────
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/017f7339830342a39ec2e5cb04650f10.jpg",
    caption: "Pump basket empty",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Basket / Skimmer Cleaning",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/0ad61aa29a654f968c708b4b9a40e6fb.jpg",
    caption: "Side gate closed",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Gate / Security",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/78486234557845b4980021f03b2e1a0d.jpg",
    caption: "Skimmer basket empty",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Basket / Skimmer Cleaning",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/a1d495fe0a644e2688ee31e18c12f0bd.jpg",
    caption: "PSI on high speed",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Pressure / Gauge",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/529617596144430d9013eacd02093a7a.jpg",
    caption: "Deep End Of Pool (main drains, shows clarity)",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Pool Overview",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/ca2fea9e741c4978b045ce5458ce1635.jpg",
    caption: "Steps/Entry (shows clarity)",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Pool Overview",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/cfa9ad09c9bb47acb703cf01c694b2d8.jpg",
    caption: "Overall View/After",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "After / Completion",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/d42b6aec952d49e5b03a0fd4f83bd889.jpg",
    caption: "Deck hosed down",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Brushing / Surface",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/4eaaf65c027b4d5cb3c3c6d997e09fd6.jpg",
    caption: "PSI on High speed",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Pressure / Gauge",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/91f62b443cc540c092355494fb8a028c.jpg",
    caption: "Chemical tabs info — output may be reduced in winter",
    company: "Pools Plus",
    source: "Route Stop",
    date: "2026-03-18",
    category: "Chemistry / Readings",
  },

  // ── Work Orders — Diverse categories ───────────────────
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/9e96ead9a53a44b6a5c520b8ccd92505.jpg",
    caption: "Leaks. Needs to be replaced",
    company: "Poolwerx Northern Utah",
    source: "Work Order",
    date: "2026-03-18",
    category: "Damage / Repair",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2402a13fdc8f45f78287d1ec1f5d0305.jpg",
    caption: "Equipment is running with no leaks!",
    company: "Splash Pros",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Inspection",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/484cf230d1b448859490c32246692bed.jpg",
    caption: "Filter was cleaned!",
    company: "Splash Pros",
    source: "Work Order",
    date: "2026-03-18",
    category: "Filter Maintenance",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/85089b0824d84690a0d15656a0b5bfcb.jpg",
    caption: "Drop Pump",
    company: "Blu Sky Lawn & Pool",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Inspection",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2ffde87234e64e5f9a24062f769ac5ff.jpg",
    caption: "MODEL SERIAL",
    company: "Team Empower Solutions",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Dataplate",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/38dcdf83cd08477682a72c197ee78ead.jpg",
    caption: "PIC OF MODEL SERIAL",
    company: "Team Empower Solutions",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Dataplate",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/809f7ab915924c7eace92f0dbd2348f0.jpg",
    caption: "TOOK AFTER PICTURE OF CLEAN SALT CELL",
    company: "Backyard Pool & Spa Service",
    source: "Work Order",
    date: "2026-03-18",
    category: "After / Completion",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/11f61640b5f64a209fd9d72b4e4d9243.jpg",
    caption: "TOOK BEFORE PICTURE OF DIRTY SALT CELL",
    company: "Backyard Pool & Spa Service",
    source: "Work Order",
    date: "2026-03-18",
    category: "Before Photo",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/274d990a38c4471b8896d17e5002e276.jpg",
    caption: "Dirty Filters",
    company: "Priority Pools of Las Vegas",
    source: "Work Order",
    date: "2026-03-18",
    category: "Filter Maintenance",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/97ca2ca1de95460da3ef11b941fb7110.jpg",
    caption: "Filter Psi Before Service",
    company: "Priority Pools of Las Vegas",
    source: "Work Order",
    date: "2026-03-18",
    category: "Pressure / Gauge",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/4dea33cb45c64cf0b80d6b3040cf0983.jpg",
    caption: "Heater has been turned off",
    company: "Vortex Pools & Spas",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Inspection",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/f41afa346d884186a3b907635904a77a.jpg",
    caption: "Take picture of operating unit after cleaning to show function and any damage or leaks",
    company: "PoolLogic",
    source: "Work Order",
    date: "2026-03-18",
    category: "Equipment Inspection",
  },

  // ── Other Pilot Companies — Route Stops ────────────────
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202602/34a17185c06d45bc8b9be3f63374e433.jpg",
    caption: "Picture of equipment",
    company: "Happy Pool and Spa",
    source: "Route Stop",
    date: "2026-02-23",
    category: "Equipment Inspection",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202602/1a4528b678cd4eb2833b8c48eb912edf.jpg",
    caption: "Filter pressure checked",
    company: "Poolfessionals",
    source: "Route Stop",
    date: "2026-02-11",
    category: "Pressure / Gauge",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202602/e8b4cfaf743443ee84ddb672d71b40b9.jpg",
    caption: "Filter Washed",
    company: "First Class Pools",
    source: "Route Stop",
    date: "2026-02-12",
    category: "Filter Maintenance",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/8461b3ee385449c1b32fc4d428a75dd7.jpg",
    caption: "Filter Cleaned",
    company: "Happy Pool and Spa",
    source: "Route Stop",
    date: "2026-03-09",
    category: "Filter Maintenance",
  },
  {
    url: "https://storwebproduction.blob.core.windows.net/service-202603/c68fd79ded6f4b6989e571826535c316.jpg",
    caption: "The gate has been closed and latched",
    company: "Poolfessionals",
    source: "Route Stop",
    date: "2026-03-02",
    category: "Gate / Security",
  },
];

export const CATEGORIES = [
  "All",
  "Basket / Skimmer Cleaning",
  "Pool Overview",
  "Pressure / Gauge",
  "Gate / Security",
  "Filter Maintenance",
  "Equipment Inspection",
  "Equipment Dataplate",
  "After / Completion",
  "Before Photo",
  "Damage / Repair",
  "Brushing / Surface",
  "Chemistry / Readings",
];

export const COMPANIES = [
  "All",
  ...Array.from(new Set(SAMPLE_PHOTOS.map((p) => p.company))).sort(),
];

export const SOURCES = ["All", "Route Stop", "Work Order"];
