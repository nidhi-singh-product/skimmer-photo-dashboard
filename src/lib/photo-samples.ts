/**
 * Sample photos pulled from Skimmer production database — March 18, 2026
 * ~60 photos across 12 categories from 25+ companies for Photo Explorer
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
  // ── Equipment Dataplates (10) — #1 OCR use case ────────
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2ffde87234e64e5f9a24062f769ac5ff.jpg", caption: "MODEL SERIAL", company: "Team Empower Solutions", source: "Work Order", date: "2026-03-18", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/38dcdf83cd08477682a72c197ee78ead.jpg", caption: "PIC OF MODEL SERIAL", company: "Team Empower Solutions", source: "Work Order", date: "2026-03-18", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2c288a317af848c7a6887e33ef769fd9.jpg", caption: "Model number off jet pump", company: "Melone's Pool Service", source: "Work Order", date: "2026-03-18", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/fe36068902fb4b249f6508e5ad10aae7.jpg", caption: "Make/Model/Serial Number of Tub", company: "Mohave Mist and Spa", source: "Work Order", date: "2026-02-15", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/a78960f8e3cf4ef7b5c4b948f03c50e4.jpg", caption: "Picture of new pump model number", company: "ASP - America's Swimming Pool Co.", source: "Work Order", date: "2026-03-15", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/e899e957b928494d8d8f8787f0a34728.jpg", caption: "MODEL SERIAL PIC", company: "Team Empower Solutions", source: "Work Order", date: "2026-02-20", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/7621bacd4c96462a9a95cb86e6ea701f.jpg", caption: "Serial number and model number added to work order", company: "Mikes Pool Service", source: "Work Order", date: "2026-02-18", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/8984e6ee17ad4b6491af7127c7150842.jpg", caption: "Cell serial number", company: "Wade in the Water Pool Services", source: "Work Order", date: "2026-02-22", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/69beceb4f37f412d86374da6cf43bc47.jpg", caption: "MODEL SERIAL", company: "Team Empower Solutions", source: "Work Order", date: "2026-03-12", category: "Equipment Dataplate" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/8d687d0e53f54c799fce9e5258e2b99e.jpg", caption: "Old cover serial number, coverlogic mfg", company: "Superior Pool Service", source: "Work Order", date: "2026-03-10", category: "Equipment Dataplate" },

  // ── Pressure / Gauge (8) — AI reading use case ─────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/a1d495fe0a644e2688ee31e18c12f0bd.jpg", caption: "PSI on high speed", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/4eaaf65c027b4d5cb3c3c6d997e09fd6.jpg", caption: "PSI on High speed", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/afe6be52c36344e094246c9efb793afb.jpg", caption: "Picture of PSI", company: "Total Pool Care", source: "Route Stop", date: "2026-03-18", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/d68b6e10fcaa4bfe93e88bb71bb811d5.jpg", caption: "Recording of Filter Pressure", company: "Dazzle Pools", source: "Route Stop", date: "2026-03-17", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/ee446d8d44f24663a08c0b13833e9a50.jpg", caption: "Filter Pressure Checked", company: "Blue Shade Pools", source: "Route Stop", date: "2026-03-16", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/7dff28d4d8b34a6ab6ee012922d90581.jpg", caption: "Checked Pressure Gauge Reading", company: "Clarity Pool Management", source: "Route Stop", date: "2026-03-15", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/f45b7e2e2307492d830acaac786d2f1c.jpg", caption: "Filter Pressure", company: "Dease Family Pool Service", source: "Route Stop", date: "2026-03-14", category: "Pressure / Gauge" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/97ca2ca1de95460da3ef11b941fb7110.jpg", caption: "Filter Psi Before Service", company: "Priority Pools of Las Vegas", source: "Work Order", date: "2026-03-18", category: "Pressure / Gauge" },

  // ── Damage / Repair (6) — AI detection story ───────────
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/9e96ead9a53a44b6a5c520b8ccd92505.jpg", caption: "Leaks. Needs to be replaced", company: "Poolwerx Northern Utah", source: "Work Order", date: "2026-03-18", category: "Damage / Repair" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/3bebf939598744ac98fd1f9cfe811d9b.jpg", caption: "Flow switch is broken — no continuity when circuit is closed. Heater not working due to faulty flow switch.", company: "Poolkeeping Pros", source: "Work Order", date: "2026-03-17", category: "Damage / Repair" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/cbebe70ae9ac48b3b7fed40eff8f2a84.jpg", caption: "Replaced broken vac lock", company: "Backyard Pools", source: "Work Order", date: "2026-02-20", category: "Damage / Repair" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/5446636d7cbe48e487809f6e89791f78.jpg", caption: "Leaking air from the valve", company: "Poolwerx Augusta", source: "Work Order", date: "2026-02-22", category: "Damage / Repair" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/abeacfeb1515476f917794793b080569.jpg", caption: "Broken Part before Replaced", company: "Arizona Mirage", source: "Work Order", date: "2026-02-18", category: "Damage / Repair" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/be77bfb4670b40fd8271fc7ce4c7d2c4.jpg", caption: "Replaced x 2 intake valve gaskets", company: "Complete Pools", source: "Work Order", date: "2026-03-15", category: "Damage / Repair" },

  // ── Before / After (6) — comparison potential ──────────
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/11f61640b5f64a209fd9d72b4e4d9243.jpg", caption: "TOOK BEFORE PICTURE OF DIRTY SALT CELL", company: "Backyard Pool & Spa Service", source: "Work Order", date: "2026-03-18", category: "Before Photo" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/809f7ab915924c7eace92f0dbd2348f0.jpg", caption: "TOOK AFTER PICTURE OF CLEAN SALT CELL", company: "Backyard Pool & Spa Service", source: "Work Order", date: "2026-03-18", category: "After / Completion" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/1c0644d878bc4903b4de96ebfb88c3b3.jpg", caption: "Before Picture", company: "G.L. Pool Service", source: "Work Order", date: "2026-03-16", category: "Before Photo" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/8471e813a7374b2eb926ab19c92ae051.jpg", caption: "After", company: "Quality Clear Pools", source: "Work Order", date: "2026-03-17", category: "After / Completion" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/b7dbcd44bc0a49d29a8d7a64777db278.jpg", caption: "Equipment Photo After Cleaning Filters", company: "Priority Pools of Las Vegas", source: "Work Order", date: "2026-03-16", category: "After / Completion" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/790ee5c47f75463c8cf97360f0a4c0c6.jpg", caption: "Before replacement", company: "Blue Kiwi", source: "Work Order", date: "2026-02-19", category: "Before Photo" },

  // ── Pool Overview / Water Clarity (6) ──────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/529617596144430d9013eacd02093a7a.jpg", caption: "Deep End Of Pool (main drains, shows clarity)", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Pool Overview" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/ca2fea9e741c4978b045ce5458ce1635.jpg", caption: "Steps/Entry (shows clarity)", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Pool Overview" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/c2902389c19f4782aeee9f6dd84dff15.jpg", caption: "Final Photo Completed", company: "SunShower Pools", source: "Route Stop", date: "2026-03-17", category: "Pool Overview" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/597ef45d493549cdbecd4afb7c663e93.jpg", caption: "Final Photo Completed", company: "SunShower Pools SunCoast", source: "Route Stop", date: "2026-03-16", category: "Pool Overview" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/5233921c9ac442bbb8a6c0ae4443b40f.jpg", caption: "Final Photo Completed", company: "SunShower Pools Las Vegas", source: "Route Stop", date: "2026-03-15", category: "Pool Overview" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/23bf96a1076a42e98eca30289bffb1a8.jpg", caption: "Pool is clean", company: "Manny's Pools", source: "Route Stop", date: "2026-03-14", category: "Pool Overview" },

  // ── Filter Maintenance (5) ─────────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/484cf230d1b448859490c32246692bed.jpg", caption: "Filter was cleaned!", company: "Splash Pros", source: "Work Order", date: "2026-03-18", category: "Filter Maintenance" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/274d990a38c4471b8896d17e5002e276.jpg", caption: "Dirty Filters", company: "Priority Pools of Las Vegas", source: "Work Order", date: "2026-03-18", category: "Filter Maintenance" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202602/e8b4cfaf743443ee84ddb672d71b40b9.jpg", caption: "Filter Washed", company: "First Class Pools", source: "Route Stop", date: "2026-02-12", category: "Filter Maintenance" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/8461b3ee385449c1b32fc4d428a75dd7.jpg", caption: "Filter Cleaned", company: "Happy Pool and Spa", source: "Route Stop", date: "2026-03-09", category: "Filter Maintenance" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/5b2a1c010f61482db940c7e718d8648f.jpg", caption: "Filter Cleaned", company: "Happy Pool and Spa", source: "Route Stop", date: "2026-03-03", category: "Filter Maintenance" },

  // ── Equipment Inspection (5) ───────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2402a13fdc8f45f78287d1ec1f5d0305.jpg", caption: "Equipment is running with no leaks!", company: "Splash Pros", source: "Work Order", date: "2026-03-18", category: "Equipment Inspection" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/4dea33cb45c64cf0b80d6b3040cf0983.jpg", caption: "Heater has been turned off", company: "Vortex Pools & Spas", source: "Work Order", date: "2026-03-18", category: "Equipment Inspection" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/d7603e1293e84b74a3d0c8ba6ef1505b.jpg", caption: "Check Equipment", company: "Corley's Pool Pros", source: "Route Stop", date: "2026-03-17", category: "Equipment Inspection" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/9582780dd5a040e2a7d377e53c22ee68.jpg", caption: "Check Equipment and record pressure from pressure gauge", company: "Ultra Pool Service", source: "Route Stop", date: "2026-03-16", category: "Equipment Inspection" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202602/34a17185c06d45bc8b9be3f63374e433.jpg", caption: "Picture of equipment", company: "Happy Pool and Spa", source: "Route Stop", date: "2026-02-23", category: "Equipment Inspection" },

  // ── Chemistry / Readings (4) ───────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/91f62b443cc540c092355494fb8a028c.jpg", caption: "Chemical tabs info — output may be reduced in winter", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Chemistry / Readings" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/6d297377fdac445589af9890693c05f1.jpg", caption: "Test strip photographed", company: "Western Water Works", source: "Route Stop", date: "2026-03-17", category: "Chemistry / Readings" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/5aa19d0bea844049b208deb45058a4e4.jpg", caption: "Test strip photographed", company: "Western Water Works", source: "Route Stop", date: "2026-03-16", category: "Chemistry / Readings" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/4fe0146c44564a30a911a86f752323e1.jpg", caption: "Test strip photographed", company: "Western Water Works", source: "Route Stop", date: "2026-03-15", category: "Chemistry / Readings" },

  // ── Basket / Skimmer Cleaning (3) ──────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/017f7339830342a39ec2e5cb04650f10.jpg", caption: "Pump basket empty", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Basket / Skimmer Cleaning" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/78486234557845b4980021f03b2e1a0d.jpg", caption: "Skimmer basket empty", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Basket / Skimmer Cleaning" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/c4b5c54ba1d14e27a69401adfcf4ca54.jpg", caption: "Skimmer basket empty", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Basket / Skimmer Cleaning" },

  // ── Gate / Security (3) ────────────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/0ad61aa29a654f968c708b4b9a40e6fb.jpg", caption: "Side gate closed", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Gate / Security" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/c68fd79ded6f4b6989e571826535c316.jpg", caption: "The gate has been closed and latched", company: "Poolfessionals", source: "Route Stop", date: "2026-03-02", category: "Gate / Security" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202602/1514c1dcfc52451b88d909dfad88f120.jpg", caption: "Closed gate if applicable", company: "Happy Pool and Spa", source: "Route Stop", date: "2026-02-05", category: "Gate / Security" },

  // ── Vacuuming (3) ──────────────────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/bbd3aae958724c76aa185a35bc473631.jpg", caption: "Vacuum", company: "Poolwerx Northern Utah", source: "Route Stop", date: "2026-03-16", category: "Vacuuming" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/91228fa0f2a24d2a876a4733d5280fa8.jpg", caption: "Pool Vacuumed", company: "PoolHeads", source: "Route Stop", date: "2026-03-15", category: "Vacuuming" },
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/e7e234c9f4524b2c90a2b5c6e7741bc8.jpg", caption: "Blue Hose Vacuumed", company: "Safari Pools", source: "Route Stop", date: "2026-03-14", category: "Vacuuming" },

  // ── Brushing / Surface (2) ─────────────────────────────
  { url: "https://storwebproduction.blob.core.windows.net/service-202603/d42b6aec952d49e5b03a0fd4f83bd889.jpg", caption: "Deck hosed down", company: "Pools Plus", source: "Route Stop", date: "2026-03-18", category: "Brushing / Surface" },
  { url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/eab409adc0e3440eb44d9ecf0b973c7f.jpg", caption: "After skimming", company: "Scott Roundy The Pool Guy", source: "Work Order", date: "2026-03-17", category: "Brushing / Surface" },
];

export const CATEGORIES = [
  "All",
  "Equipment Dataplate",
  "Pressure / Gauge",
  "Damage / Repair",
  "Before Photo",
  "After / Completion",
  "Pool Overview",
  "Filter Maintenance",
  "Equipment Inspection",
  "Chemistry / Readings",
  "Basket / Skimmer Cleaning",
  "Gate / Security",
  "Vacuuming",
  "Brushing / Surface",
];

export const COMPANIES = [
  "All",
  ...Array.from(new Set(SAMPLE_PHOTOS.map((p) => p.company))).sort(),
];

export const SOURCES = ["All", "Route Stop", "Work Order"];
