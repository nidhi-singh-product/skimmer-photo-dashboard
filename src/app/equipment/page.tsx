"use client";

import { useState } from "react";
import {
  CheckCircle2, AlertTriangle, Cpu, Wrench, TrendingUp,
  ShieldCheck, DollarSign, Package, Clock, FileText, Zap, Target,
} from "lucide-react";
import {
  EQUIPMENT_EXTRACTIONS, EXTRACTION_STATS, MOCK_PROFILES,
} from "@/lib/equipment-data";

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Good: "bg-sk-moss-100 text-sk-moss-700",
    Aging: "bg-amber-100 text-amber-700",
    "Replace Soon": "bg-red-100 text-red-700",
  };
  return (
    <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${config[status] || "bg-gray-100 text-gray-600"}`}>
      {status}
    </span>
  );
}

export default function EquipmentPage() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const selected = EQUIPMENT_EXTRACTIONS[selectedIdx];

  const fieldsExtracted = [
    { label: "Brand", value: selected.brand },
    { label: "Model", value: selected.model },
    { label: "Serial", value: selected.serial },
    { label: "Part Number", value: selected.partNumber },
    { label: "Date", value: selected.date },
    { label: "Specs", value: selected.specs },
    { label: "Equipment Type", value: selected.equipmentType },
  ];

  const profile = MOCK_PROFILES[0];

  return (
    <div className="space-y-10">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sk-dark-900 via-sk-blue-800 to-sk-dark-800 px-10 py-12 text-white">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-sk-moss/10 blur-3xl" />
        <div className="absolute -bottom-8 -left-8 h-48 w-48 rounded-full bg-sk-sunrise/10 blur-3xl" />
        <div className="relative">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sk-moss">
            Equipment Intelligence
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            From Photo to Equipment Record
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            Techs are already photographing equipment dataplates. AI reads them in seconds —
            brand, model, serial number, manufacture date — and links them to the service location.
            No new behavior required.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            {[
              { value: "112,780", label: "Service locations with equipment photos" },
              { value: "7,556", label: "Photos explicitly captioned \"model/serial\"" },
              { value: "10/10", label: "Successful extractions in today's test" },
              { value: "$0.08", label: "Total cost for 10 extractions" },
            ].map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm">
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-white/50">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Extractions ──────────────────────────────── */}
      <section>
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
            Real Extractions — Run Today
          </h2>
          <p className="mt-1 text-sm text-sk-text-medium">
            {EXTRACTION_STATS.photosProcessed} dataplate photos from production, processed through GPT-4o Vision on {EXTRACTION_STATS.dateRun}.
            {" "}{EXTRACTION_STATS.successRate} success rate. Total cost: {EXTRACTION_STATS.apiCost}.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Photo side */}
          <div className="space-y-4">
            <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm">
              <div className="relative aspect-[4/3] bg-sk-gray-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={selected.photoUrl}
                  alt={selected.caption}
                  className="h-full w-full object-contain"
                />
                <div className="absolute bottom-3 left-3 rounded-lg bg-black/70 px-3 py-1.5 text-xs text-white backdrop-blur-sm">
                  Tech caption: &ldquo;{selected.caption}&rdquo;
                </div>
              </div>
              <div className="border-t border-sk-gray-100 px-4 py-3">
                <div className="text-xs text-sk-text-medium">{selected.company}</div>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 overflow-x-auto pb-2">
              {EQUIPMENT_EXTRACTIONS.map((ext, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedIdx(i)}
                  className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                    i === selectedIdx ? "border-sk-blue shadow-md" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ext.photoUrl}
                    alt={ext.caption}
                    className="h-14 w-14 object-cover"
                    loading="lazy"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Extracted data side */}
          <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                AI Extracted Data
              </h3>
              <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                selected.confidence === "High"
                  ? "bg-sk-moss-100 text-sk-moss-700"
                  : "bg-amber-100 text-amber-700"
              }`}>
                {selected.confidence} Confidence
              </span>
            </div>

            <div className="space-y-3">
              {fieldsExtracted.map((f) => (
                <div key={f.label} className="flex items-start gap-3">
                  {f.value ? (
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sk-moss-700" />
                  ) : (
                    <div className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-sk-gray-200" />
                  )}
                  <div className="flex-1">
                    <div className="text-xs font-medium uppercase tracking-wide text-sk-text-disabled">
                      {f.label}
                    </div>
                    <div className={`text-sm font-semibold ${f.value ? "text-sk-text" : "text-sk-text-disabled"}`}>
                      {f.value || "Not found"}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-lg bg-sk-blue-light p-3">
              <div className="text-xs font-medium text-sk-blue">AI Notes</div>
              <div className="mt-1 text-xs text-sk-text-medium">{selected.notes}</div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-sk-text-disabled">
              <span>Brands found: {EXTRACTION_STATS.uniqueBrands.join(", ")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Why Structured Records Matter ─────────────────── */}
      <section className="rounded-2xl bg-gradient-to-r from-sk-blue-light via-white to-sk-moss-100 p-8">
        <h2 className="mb-2 text-2xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          Why Structured Equipment Records Matter
        </h2>
        <p className="mb-6 max-w-3xl text-sm text-sk-text-medium">
          Right now, equipment data lives trapped inside photos — invisible to search, reporting, and automation.
          A structured record turns a JPEG into actionable business intelligence.
        </p>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {[
            {
              icon: Clock,
              title: "Proactive Replacement Alerts",
              description: "Know equipment age from manufacture dates. Alert pros before a pump fails — \"This Pentair IntelliFlo is 7.2 years old, average lifespan is 8-12 years.\"",
              value: "Reduce emergency repairs",
            },
            {
              icon: Package,
              title: "Instant Parts Lookup",
              description: "With brand + model, auto-suggest replacement parts, compatible accessories, and supplier links. No more guessing which seal kit fits which pump.",
              value: "Faster repair turnaround",
            },
            {
              icon: FileText,
              title: "Equipment Service History",
              description: "Link work orders to specific equipment. \"This Hayward salt cell has had 4 cleanings in 12 months — it may need replacement.\" Track cost-per-equipment over time.",
              value: "Data-driven service decisions",
            },
            {
              icon: TrendingUp,
              title: "Industry Intelligence",
              description: "Aggregate equipment data across 7,400+ companies. \"62% of Arizona pools use variable-speed pumps. In Florida, only 41%.\" Valuable for manufacturer partnerships.",
              value: "Market insights at scale",
            },
            {
              icon: DollarSign,
              title: "Upsell & Revenue Opportunities",
              description: "Identify aging equipment across a pro's customer base. \"47 of your customers have pumps over 6 years old — here's a replacement campaign template.\"",
              value: "New revenue for pros",
            },
            {
              icon: ShieldCheck,
              title: "Warranty & Compliance Tracking",
              description: "Serial numbers enable warranty lookups. Safety cover certifications (ASTM F 1346) can be tracked. \"This cover's certification is from 2003 — may need reinspection.\"",
              value: "Liability protection",
            },
            {
              icon: Wrench,
              title: "Technician Efficiency",
              description: "Tech arrives at a stop and sees the full equipment profile before opening the gate. No more hunting for model numbers or calling the office to ask what filter is installed.",
              value: "Faster service visits",
            },
            {
              icon: Target,
              title: "Customer Communication",
              description: "Auto-generate equipment reports for homeowners. \"Your pool equipment summary: 4 items, all in good condition. Your heater is approaching typical replacement age.\"",
              value: "Professional customer experience",
            },
            {
              icon: Zap,
              title: "Zero New Behavior Required",
              description: "Techs are already taking these photos. We just need AI to read them. On-device OCR means it works offline, costs $0/month, and builds the database automatically going forward.",
              value: "Frictionless adoption",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-5 shadow-sm">
              <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-sk-blue" />
                <h3 className="text-sm font-bold text-sk-text">{item.title}</h3>
              </div>
              <p className="mt-2 text-xs text-sk-text-medium leading-relaxed">{item.description}</p>
              <div className="mt-3 text-xs font-semibold text-sk-moss-700">{item.value}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Product Vision: Equipment Profile ─────────────── */}
      <section>
        <h2 className="mb-2 text-2xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          Product Vision: Equipment Profile per Service Location
        </h2>
        <p className="mb-6 text-sm text-sk-text-medium">
          What the equipment tab could look like in Skimmer — built entirely from photos techs already take.
        </p>

        <div className="rounded-xl border border-sk-blue-200 bg-white shadow-sm overflow-hidden">
          {/* Mock header */}
          <div className="border-b border-sk-gray-100 bg-sk-blue-light px-6 py-4">
            <div className="text-xs font-medium uppercase tracking-wide text-sk-blue">Service Location</div>
            <div className="text-lg font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
              {profile.location}
            </div>
            <div className="text-sm text-sk-text-medium">{profile.customer} — {profile.equipment.length} equipment items identified</div>
          </div>

          {/* Equipment table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                  <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Equipment</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Model</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Serial</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Age</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Avg Lifespan</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Work Orders</th>
                </tr>
              </thead>
              <tbody>
                {profile.equipment.map((eq, i) => (
                  <tr key={i} className="border-b border-sk-gray-100 last:border-0 hover:bg-sk-blue-light/30">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-sk-text">{eq.brand} {eq.type}</div>
                      <div className="text-xs text-sk-text-disabled">Installed {eq.installedDate}</div>
                    </td>
                    <td className="px-4 py-4 font-mono text-xs text-sk-text">{eq.model}</td>
                    <td className="px-4 py-4 font-mono text-xs text-sk-text-medium">{eq.serial}</td>
                    <td className="px-4 py-4 text-sk-text">{eq.age}</td>
                    <td className="px-4 py-4 text-sk-text-medium">{eq.avgLifespan}</td>
                    <td className="px-4 py-4"><StatusBadge status={eq.status} /></td>
                    <td className="px-4 py-4 text-sk-text">{eq.workOrderCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mock footer */}
          <div className="border-t border-sk-gray-100 bg-gray-50/50 px-6 py-3">
            <p className="text-xs text-sk-text-disabled">
              Equipment data sourced from work order and route stop photos via AI OCR. Last updated from photo taken March 2026.
            </p>
          </div>
        </div>
      </section>

      {/* ── Scale & Cost ─────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <Cpu className="mb-3 h-6 w-6 text-sk-blue" />
          <div className="text-3xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>
            ~$280
          </div>
          <div className="mt-1 text-sm font-medium text-sk-text">Process all 70K equipment photos</div>
          <div className="mt-2 text-xs text-sk-text-medium">
            70,000 equipment-captioned work order photos × $0.004/image. Build equipment records for ~100K service locations.
          </div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <DollarSign className="mb-3 h-6 w-6 text-sk-moss-700" />
          <div className="text-3xl font-bold text-sk-moss-700" style={{ fontFamily: "var(--font-outfit)" }}>
            $0/month
          </div>
          <div className="mt-1 text-sm font-medium text-sk-text">On-device OCR for new photos</div>
          <div className="mt-2 text-xs text-sk-text-medium">
            Apple Vision + Google ML Kit run on the phone. Works offline. Every new dataplate photo auto-builds the equipment record.
          </div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <TrendingUp className="mb-3 h-6 w-6 text-sk-sunrise" />
          <div className="text-3xl font-bold text-sk-sunrise" style={{ fontFamily: "var(--font-outfit)" }}>
            100K+
          </div>
          <div className="mt-1 text-sm font-medium text-sk-text">Service locations covered</div>
          <div className="mt-2 text-xs text-sk-text-medium">
            112,780 service locations already have equipment-captioned photos. Retroactive equipment database from existing data.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-6 text-center text-xs text-sk-text-disabled">
        Equipment extractions run March 18, 2026 using GPT-4o Vision on Skimmer production photos. Total cost: $0.08.
      </footer>
    </div>
  );
}
