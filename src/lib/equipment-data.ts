/**
 * Equipment OCR extraction results — run March 18, 2026
 * GPT-4o Vision on real Skimmer production dataplate photos
 * 10/10 successful extractions, $0.08 total cost
 */

export interface EquipmentExtraction {
  photoUrl: string;
  caption: string;
  company: string;
  brand: string | null;
  model: string | null;
  serial: string | null;
  partNumber: string | null;
  date: string | null;
  specs: string | null;
  equipmentType: string | null;
  confidence: "High" | "Medium";
  notes: string;
}

export const EQUIPMENT_EXTRACTIONS: EquipmentExtraction[] = [
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2ffde87234e64e5f9a24062f769ac5ff.jpg",
    caption: "MODEL SERIAL",
    company: "Team Empower Solutions",
    brand: "Whirlpool",
    model: "WTW4955HW3",
    serial: "CD1900446",
    partNumber: null,
    date: "4/2020",
    specs: "60 Hz, 120V",
    equipmentType: "Appliance",
    confidence: "High",
    notes: "Clean white label, UL certified. All fields extracted perfectly.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2c288a317af848c7a6887e33ef769fd9.jpg",
    caption: "Model number off jet pump",
    company: "Melone's Pool Service",
    brand: "Speck Pumps (Germany)",
    model: "0-17384003GS",
    serial: "388353",
    partNumber: null,
    date: null,
    specs: null,
    equipmentType: "Swimming Pool Pump",
    confidence: "High",
    notes: "Manufactured by Speck Pumps, Germany for Pool Products Inc., Jacksonville FL. Clear label despite outdoor environment.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202602/fe36068902fb4b249f6508e5ad10aae7.jpg",
    caption: "Make/Model/Serial Number of Tub",
    company: "Mohave Mist and Spa",
    brand: "Watkins",
    model: "Rhythm Pearl",
    serial: "RHY1R3T29",
    partNumber: "302359-11",
    date: "11-17-2012",
    specs: null,
    equipmentType: "Hot Tub / Spa",
    confidence: "High",
    notes: "Watkins Rhythm Pearl spa — 12+ year old equipment identified from dataplate. Manufacture date extracted.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/a78960f8e3cf4ef7b5c4b948f03c50e4.jpg",
    caption: "Picture of new pump model number",
    company: "ASP — America's Swimming Pool Co.",
    brand: "Hayward",
    model: "SP2315X20",
    serial: "02130909060049004",
    partNumber: null,
    date: null,
    specs: null,
    equipmentType: "Pool Pump",
    confidence: "High",
    notes: "Hayward pool pump — brand, model, and full 17-digit serial extracted from a single photo.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202602/e899e957b928494d8d8f8787f0a34728.jpg",
    caption: "MODEL SERIAL PIC",
    company: "Team Empower Solutions",
    brand: "Whirlpool",
    model: "WRS321SDHZ11",
    serial: "HRD1114025",
    partNumber: null,
    date: "March 2024",
    specs: "R600a refrigerant, 7.2A full load, 965 kPa low / 2275 kPa high pressure",
    equipmentType: "Household Refrigerator",
    confidence: "High",
    notes: "Dense label with safety specs, refrigerant type, design pressures — all extracted. NSF/ANSI 372 certified.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202602/7621bacd4c96462a9a95cb86e6ea701f.jpg",
    caption: "Serial and model number",
    company: "Mikes Pool Service",
    brand: "Hayward",
    model: "T-CELL-940",
    serial: null,
    partNumber: null,
    date: null,
    specs: "TurboCell Extended Life, Turbulent Flo Chamber",
    equipmentType: "Salt Cell (Chlorine Generator)",
    confidence: "Medium",
    notes: "Hayward GoldLine TurboCell identified. Inspection number found (2231124186). Maintenance instruction: inspect every 3 months.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/69beceb4f37f412d86374da6cf43bc47.jpg",
    caption: "MODEL SERIAL",
    company: "Team Empower Solutions",
    brand: "Whirlpool",
    model: "WDP540HAMZ4",
    serial: "FE1612987",
    partNumber: null,
    date: null,
    specs: "Type 553-0, ANSI/CSA 167.3 certified",
    equipmentType: "Dishwasher",
    confidence: "High",
    notes: "Weathered label but all key fields extracted. ANSI/CSA safety certification detected.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/8d687d0e53f54c799fce9e5258e2b99e.jpg",
    caption: "Old cover serial number, coverlogic mfg",
    company: "Superior Pool Service",
    brand: "CoverLogix",
    model: null,
    serial: "359728",
    partNumber: null,
    date: null,
    specs: "ASTM F 1346-1 (2003) manual safety cover classification",
    equipmentType: "Pool Safety Cover",
    confidence: "High",
    notes: "Safety cover with full compliance text extracted. Manufacturer: CoverLogix, Oregon City, OR. Safety classification and drowning warning text captured.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202603/38dcdf83cd08477682a72c197ee78ead.jpg",
    caption: "PIC OF MODEL SERIAL",
    company: "Team Empower Solutions",
    brand: "Whirlpool",
    model: "WTW4955HW3",
    serial: "CD1904046",
    partNumber: null,
    date: null,
    specs: "Type 588, 120V 60Hz 12A",
    equipmentType: "Appliance",
    confidence: "High",
    notes: "Same model as first extraction but different serial — confirms OCR works consistently across units of the same product.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202602/8984e6ee17ad4b6491af7127c7150842.jpg",
    caption: "Cell serial number",
    company: "Wade in the Water Pool Services",
    brand: "Hayward",
    model: "ETL0511",
    serial: "123034-202497",
    partNumber: null,
    date: null,
    specs: "NSF certified, PMRA REG. 24583",
    equipmentType: "Salt Cell",
    confidence: "Medium",
    notes: "Salt cell with partial label visibility. Hayward branding from patent URL. Maintenance instruction detected: inspect every 3 months.",
  },
  // ── New batch: Heaters & Pumps (run March 18, 2026) ────
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202602/46f3e0a879ec41bdaaaccd576494e884.jpg",
    caption: "New Pool Heater model and serial for Warranty",
    company: "Everclear Pool Service",
    brand: "Jandy",
    model: "JXI400NN",
    serial: "MT E C02 0503 0325 0052",
    partNumber: null,
    date: null,
    specs: "399,000 BTU, Direct Ignition, Low-NOx, Natural Gas, 0-4500 FT elevation",
    equipmentType: "Pool & Spa Heater",
    confidence: "High",
    notes: "Jandy JXi 400K BTU gas heater — full specs extracted including fuel type, ignition type, elevation rating, and CA Prop 65 warning. Manufactured by Zodiac Pool Systems, Carlsbad CA.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202601/db856469e6764c8ab8d3179b00cbd33c.jpg",
    caption: "Heater model and serial",
    company: "Caraccio Pools",
    brand: "Jandy",
    model: "JXI Q400NK",
    serial: "AT ECO2 0514 3625 1128",
    partNumber: "H0716800 Rev C",
    date: null,
    specs: null,
    equipmentType: "Gas Heater",
    confidence: "High",
    notes: "Second Jandy JXi heater from a different company — confirms consistent extraction across installations. Part number and revision also captured.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202601/b2e4ab069db9404da343d570b139dcee.jpg",
    caption: "Heater serial number",
    company: "Wade in the Water Pool Services",
    brand: null,
    model: "S18-F1325",
    serial: "18S-002052",
    partNumber: null,
    date: "3/15/2018",
    specs: null,
    equipmentType: "Heater",
    confidence: "Medium",
    notes: "Compact label with model, serial, and manufacture date (March 2018). Brand not visible on label — would need model lookup to identify manufacturer. Equipment is 8 years old.",
  },
  {
    photoUrl: "https://storwebproduction.blob.core.windows.net/work-orders-202601/09e950705bcc44479dda4a4ae1604827.jpg",
    caption: "Pump model",
    company: "Fratelli Pool Service",
    brand: "Century",
    model: "M48AB4A34A04",
    serial: "S042120004844",
    partNumber: "1001488-004",
    date: null,
    specs: "1.85/0.85 HP, 600-3450 RPM, 240/230/115V, Variable Speed",
    equipmentType: "Variable Speed Pool Pump Motor",
    confidence: "High",
    notes: "Century variable speed pump motor — dense electrical label with HP, RPM range, voltage, amperage, and FCC compliance info all extracted. Part number and serial confirmed.",
  },
];

export const EXTRACTION_STATS = {
  photosProcessed: 14,
  successfulExtractions: 14,
  successRate: "100%",
  brandsIdentified: 7,
  uniqueBrands: ["Whirlpool", "Hayward", "Speck Pumps", "Watkins", "CoverLogix", "Jandy", "Century"],
  equipmentTypes: ["Pool Pump", "Salt Cell", "Hot Tub / Spa", "Pool Safety Cover", "Pool & Spa Heater", "Variable Speed Pump Motor", "Appliance"],
  apiCost: "$0.12",
  dateRun: "March 18, 2026",
  highConfidence: 11,
  mediumConfidence: 3,
};

/** What a productized equipment profile would look like */
export interface EquipmentProfile {
  location: string;
  customer: string;
  equipment: {
    type: string;
    brand: string;
    model: string;
    serial: string;
    installedDate: string;
    age: string;
    avgLifespan: string;
    status: "Good" | "Aging" | "Replace Soon";
    lastServiceDate: string;
    workOrderCount: number;
    photoSource: string;
  }[];
}

export const MOCK_PROFILES: EquipmentProfile[] = [
  {
    location: "123 Oak Lane, Scottsdale, AZ",
    customer: "Johnson Residence",
    equipment: [
      {
        type: "Variable Speed Pump",
        brand: "Pentair",
        model: "IntelliFlo VSF 3HP",
        serial: "PP2024-VS-00847",
        installedDate: "March 2021",
        age: "5.0 years",
        avgLifespan: "8-12 years",
        status: "Good",
        lastServiceDate: "Feb 2026",
        workOrderCount: 2,
        photoSource: "Work order #WO-84721 dataplate photo",
      },
      {
        type: "DE Filter",
        brand: "Hayward",
        model: "ProGrid DE6020",
        serial: "HW-DE-20220315-0042",
        installedDate: "June 2019",
        age: "6.8 years",
        avgLifespan: "7-10 years",
        status: "Aging",
        lastServiceDate: "Mar 2026",
        workOrderCount: 5,
        photoSource: "Route stop equipment check photo",
      },
      {
        type: "Gas Heater",
        brand: "Jandy",
        model: "JXi 400K BTU",
        serial: "JD-JXI-400-2020-1847",
        installedDate: "January 2020",
        age: "6.2 years",
        avgLifespan: "5-8 years",
        status: "Replace Soon",
        lastServiceDate: "Jan 2026",
        workOrderCount: 8,
        photoSource: "Work order #WO-91203 dataplate photo",
      },
      {
        type: "Salt Chlorine Generator",
        brand: "Hayward",
        model: "AquaRite T-CELL-940",
        serial: "2231124186",
        installedDate: "March 2022",
        age: "4.0 years",
        avgLifespan: "3-5 years",
        status: "Aging",
        lastServiceDate: "Mar 2026",
        workOrderCount: 3,
        photoSource: "Work order salt cell inspection photo",
      },
    ],
  },
];
