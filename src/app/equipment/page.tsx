"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, Cpu, Wrench, TrendingUp,
  ShieldCheck, DollarSign, Package, Clock, FileText, Zap, Target,
  ChevronLeft, ChevronRight,
} from "lucide-react";
import { AnimatedCounter } from "@/components/counter";
import { NextPage } from "@/components/next-page";
import {
  EQUIPMENT_EXTRACTIONS, EXTRACTION_STATS, MOCK_PROFILES,
} from "@/lib/equipment-data";

/* Scroll reveal */
function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, string> = {
    Good: "bg-sk-moss-100 text-sk-moss-700 border-sk-moss-700/20",
    Aging: "bg-amber-50 text-amber-700 border-amber-200",
    "Replace Soon": "bg-red-50 text-red-700 border-red-200",
  };
  return (
    <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold sm:text-xs ${config[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
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

  const goPrev = () => setSelectedIdx((i) => Math.max(0, i - 1));
  const goNext = () => setSelectedIdx((i) => Math.min(EQUIPMENT_EXTRACTIONS.length - 1, i + 1));

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-10 text-white sm:px-12 sm:py-16">
        <motion.div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sk-moss/12 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-sk-sunrise/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 3 }} />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 50" className="w-full" preserveAspectRatio="none">
            <path d="M0 25 Q300 0 600 25 Q900 50 1200 25 L1200 50 L0 50Z" fill="#FCFCFC" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sk-moss-500 sm:text-sm">
            Equipment Intelligence — What AI Extracts
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}>
            From Photo to Equipment Record
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg">
            Now that we&apos;ve validated AI works (see AI Validation), here&apos;s what it actually extracts.
            Brand, model, serial, manufacture date — from photos techs already take. No new behavior required.
          </motion.p>

          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
            {[
              { value: "112,780", label: "Locations with equipment photos" },
              { value: "7,556", label: "Dataplate photos found" },
              { value: "14/14", label: "Successful extractions" },
              { value: "$0.12", label: "Total extraction cost" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
                <div className="text-base font-bold sm:text-xl">{s.value}</div>
                <div className="text-[10px] text-white/45 sm:text-xs">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Live Extractions ──────────────────────────────── */}
      <Reveal>
        <section>
          <div className="mb-5 sm:mb-6">
            <h2 className="text-xl font-bold text-sk-dark-900 sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Real Extractions — Run Today
            </h2>
            <p className="mt-1 text-xs text-sk-text-medium sm:text-sm">
              {EXTRACTION_STATS.photosProcessed} production dataplate photos → GPT-4o Vision → {EXTRACTION_STATS.successRate} success. Cost: {EXTRACTION_STATS.apiCost}.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
            {/* Photo side */}
            <div className="space-y-3">
              <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-sk-navy/[0.03] shadow-sm">
                <div className="relative aspect-[4/3]">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={selected.photoUrl}
                      src={selected.photoUrl}
                      alt={selected.caption}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="h-full w-full object-contain"
                    />
                  </AnimatePresence>
                  <div className="absolute bottom-3 left-3 right-3 rounded-lg bg-sk-navy/80 px-3 py-2 backdrop-blur-md">
                    <div className="text-[10px] text-white/50 sm:text-xs">Tech caption</div>
                    <div className="text-xs font-medium text-white sm:text-sm">&ldquo;{selected.caption}&rdquo;</div>
                  </div>

                  {/* Nav arrows on photo */}
                  <button onClick={goPrev} disabled={selectedIdx === 0}
                    className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sk-text shadow-md backdrop-blur-sm transition-opacity disabled:opacity-0 hover:bg-white">
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button onClick={goNext} disabled={selectedIdx === EQUIPMENT_EXTRACTIONS.length - 1}
                    className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-sk-text shadow-md backdrop-blur-sm transition-opacity disabled:opacity-0 hover:bg-white">
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex items-center justify-between border-t border-sk-gray-100 px-4 py-2.5">
                  <span className="text-xs text-sk-text-medium">{selected.company}</span>
                  <span className="text-[10px] text-sk-text-disabled">{selectedIdx + 1} of {EQUIPMENT_EXTRACTIONS.length}</span>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="flex gap-1.5 overflow-x-auto pb-1 sm:gap-2">
                {EQUIPMENT_EXTRACTIONS.map((ext, i) => (
                  <button key={i} onClick={() => setSelectedIdx(i)}
                    className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                      i === selectedIdx ? "border-sk-blue shadow-md scale-105" : "border-transparent opacity-50 hover:opacity-80"
                    }`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={ext.photoUrl} alt={ext.caption} className="h-12 w-12 object-cover sm:h-14 sm:w-14" loading="lazy" />
                  </button>
                ))}
              </div>
            </div>

            {/* Extracted data side */}
            <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
                  AI Extracted Data
                </h3>
                <span className={`rounded-full border px-3 py-1 text-[10px] font-bold sm:text-xs ${
                  selected.confidence === "High"
                    ? "border-sk-moss-700/20 bg-sk-moss-100 text-sk-moss-700"
                    : "border-amber-200 bg-amber-50 text-amber-700"
                }`}>
                  {selected.confidence} Confidence
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedIdx}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-2.5"
                >
                  {fieldsExtracted.map((f, i) => (
                    <motion.div
                      key={f.label}
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                      className={`flex items-start gap-3 rounded-lg px-3 py-2 ${f.value ? "bg-sk-moss-100/40" : "bg-sk-gray-100/40"}`}
                    >
                      {f.value ? (
                        <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-sk-moss-700" />
                      ) : (
                        <div className="mt-0.5 h-4 w-4 flex-shrink-0 rounded-full border-2 border-sk-gray-200" />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:text-xs">{f.label}</div>
                        <div className={`text-xs font-semibold sm:text-sm ${f.value ? "text-sk-text" : "text-sk-text-disabled"} truncate`}>
                          {f.value || "Not found"}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              <div className="mt-4 rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 p-3">
                <div className="text-[10px] font-semibold text-sk-dark sm:text-xs">AI Notes</div>
                <div className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{selected.notes}</div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Why Structured Records Matter ─────────────────── */}
      <Reveal>
        <section className="rounded-2xl bg-gradient-to-r from-sk-blue-100 via-white to-sk-moss-100 p-5 sm:p-8">
          <h2 className="mb-2 text-lg font-bold text-sk-dark-900 sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Why Structured Equipment Records Matter
          </h2>

          {/* The Problem Today */}
          <div className="mb-5 rounded-xl border border-sk-sunrise/20 bg-sk-sunrise-100 p-4 sm:mb-6 sm:p-5">
            <h3 className="text-xs font-bold text-sk-sunrise sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>The Problem Today</h3>
            <p className="mt-1.5 text-[10px] leading-relaxed text-sk-text-medium sm:text-sm">
              If a pro wants to know &ldquo;what pump does my customer at 123 Oak Lane have?&rdquo; — there&apos;s no way to answer that without
              driving to the location, scrolling through old work order photos hoping someone took a dataplate picture, or calling the tech who was there last.
              <span className="font-semibold text-sk-text"> The data already exists in photos. It&apos;s just locked inside JPEGs — invisible to search, reporting, and automation.</span>
            </p>
            <p className="mt-2 text-[10px] leading-relaxed text-sk-text-medium sm:text-sm">
              OCR turns those photos into a structured database: &ldquo;123 Oak Lane: Pentair IntelliFlo VS, Serial #XYZ, installed 2019, 6 years old.&rdquo;
              Searchable. Queryable. Linked to work orders and service history. For <span className="font-semibold text-sk-sunrise">$280 total</span> across all 70K equipment photos.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
            {[
              { icon: Clock, title: "Proactive Replacement Alerts", description: "Know equipment age from manufacture dates. Alert before failure — \"This pump is 7.2 years old, avg lifespan 8-12 years.\"", value: "Reduce emergency repairs", accent: "border-l-sk-sunrise" },
              { icon: Package, title: "Instant Parts Lookup", description: "Brand + model → auto-suggest replacement parts, compatible accessories, supplier links. No guessing which seal kit fits.", value: "Faster repair turnaround", accent: "border-l-sk-blue" },
              { icon: FileText, title: "Equipment Service History", description: "Link work orders to specific equipment. \"This salt cell had 4 cleanings in 12 months — may need replacement.\"", value: "Data-driven decisions", accent: "border-l-sk-moss-700" },
              { icon: TrendingUp, title: "Industry Intelligence", description: "Aggregate data across 7,400+ companies. \"62% of AZ pools use variable-speed pumps. In FL, only 41%.\"", value: "Market insights at scale", accent: "border-l-sk-orchid" },
              { icon: DollarSign, title: "Upsell Opportunities", description: "\"47 of your customers have pumps over 6 years old.\" Auto-generate targeted replacement campaigns.", value: "New revenue for pros", accent: "border-l-sk-sunrise" },
              { icon: ShieldCheck, title: "Warranty & Compliance", description: "Serial numbers enable warranty lookups. Safety certifications tracked. \"This cover cert is from 2003.\"", value: "Liability protection", accent: "border-l-sk-dark" },
              { icon: Wrench, title: "Technician Efficiency", description: "Tech sees full equipment profile before opening the gate. No hunting for model numbers or calling the office.", value: "Faster service visits", accent: "border-l-sk-blue" },
              { icon: Target, title: "Customer Communication", description: "Auto-generate equipment reports: \"4 items, all good. Your heater is approaching typical replacement age.\"", value: "Professional experience", accent: "border-l-sk-moss-700" },
              { icon: Zap, title: "Zero New Behavior", description: "Techs already take these photos. On-device OCR works offline, costs $0/month, builds the database automatically.", value: "Frictionless adoption", accent: "border-l-sk-sunrise" },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.05}>
                <div className={`rounded-xl border-l-4 ${item.accent} bg-white p-4 shadow-sm transition-all hover:shadow-md sm:p-5`}>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
                      <item.icon className="h-3.5 w-3.5 text-sk-dark" />
                    </div>
                    <h3 className="text-xs font-bold text-sk-text sm:text-sm">{item.title}</h3>
                  </div>
                  <p className="mt-2 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{item.description}</p>
                  <div className="mt-2.5 text-[10px] font-bold text-sk-moss-700 sm:text-xs">{item.value}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Two Journeys ──────────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl border border-sk-gray-100 bg-white shadow-sm">
          <div className="border-b border-sk-gray-100 bg-sk-navy px-5 py-4 sm:px-6 sm:py-5">
            <h2 className="text-base font-bold text-white sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              How It Works: Two Paths to an Equipment Database
            </h2>
            <p className="mt-1 text-[10px] text-white/50 sm:text-xs">
              Retroactive processing unlocks history. Real-time processing builds the future. Both require zero new behavior from techs.
            </p>
          </div>

          <div className="grid grid-cols-1 divide-y divide-sk-gray-100 lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            {/* Journey 1: Retroactive */}
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
                  <Clock className="h-4 w-4 text-sk-dark" />
                </div>
                <div>
                  <span className="text-sm font-bold text-sk-dark sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>Path 1: Unlock the Past</span>
                  <span className="ml-2 rounded-full bg-sk-blue-100 px-2 py-0.5 text-[9px] font-bold text-sk-dark sm:text-[10px]">~$280 one-time</span>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  { step: "1", text: "70K equipment photos already exist in blob storage", sub: "Taken by techs over the past years — dataplates, pumps, heaters, filters", color: "bg-sk-dark" },
                  { step: "2", text: "Batch OCR processes all 70K photos", sub: "AI reads brand, model, serial, manufacture date from each dataplate", color: "bg-sk-blue" },
                  { step: "3", text: "Structured equipment records created", sub: "Linked to service locations via work orders", color: "bg-sk-blue" },
                  { step: "4", text: "~100K service locations get equipment profiles", sub: "Searchable, queryable — instantly available to every tech and office staff", color: "bg-sk-moss-700" },
                ].map((item, i) => (
                  <Reveal key={item.step} delay={i * 0.06}>
                    <div className="flex gap-3 py-2.5">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${item.color} text-[10px] font-bold text-white`}>
                          {item.step}
                        </div>
                        {i < 3 && <div className="h-full w-px bg-sk-gray-200" />}
                      </div>
                      <div className="pb-2">
                        <div className="text-xs font-semibold text-sk-text sm:text-sm">{item.text}</div>
                        <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">{item.sub}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            {/* Journey 2: Real-Time */}
            <div className="p-5 sm:p-6">
              <div className="mb-4 flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-moss-100">
                  <Zap className="h-4 w-4 text-sk-moss-700" />
                </div>
                <div>
                  <span className="text-sm font-bold text-sk-dark sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>Path 2: Build the Future</span>
                  <span className="ml-2 rounded-full bg-sk-moss-100 px-2 py-0.5 text-[9px] font-bold text-sk-moss-700 sm:text-[10px]">$0/month ongoing</span>
                </div>
              </div>

              <div className="space-y-0">
                {[
                  { step: "1", text: "Tech arrives at a service location for a repair", sub: "Opens the work order in the Skimmer mobile app — same as today", color: "bg-sk-dark" },
                  { step: "2", text: "Takes a photo of the equipment dataplate", sub: "They already do this — we have 7,556 of these. No new behavior.", color: "bg-sk-moss-700" },
                  { step: "3", text: "On-device OCR runs instantly", sub: "Apple Vision / Google ML Kit — free, offline, no internet needed", color: "bg-sk-moss-700" },
                  { step: "4", text: "App auto-fills equipment fields", sub: "\"Pentair IntelliFlo VS, Model 011018, Serial #PP2024-VS-00847\"", color: "bg-sk-moss-700" },
                  { step: "5", text: "Tech confirms — equipment record saved", sub: "Linked to service location. Next tech sees it before opening the gate.", color: "bg-sk-moss-700" },
                  { step: "6", text: "Over a few visits, full inventory builds itself", sub: "Pump, filter, heater, salt cell — all from photos techs take anyway", color: "bg-sk-blue" },
                ].map((item, i) => (
                  <Reveal key={item.step} delay={i * 0.06}>
                    <div className="flex gap-3 py-2">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${item.color} text-[10px] font-bold text-white`}>
                          {item.step}
                        </div>
                        {i < 5 && <div className="h-full w-px bg-sk-gray-200" />}
                      </div>
                      <div className="pb-1.5">
                        <div className="text-xs font-semibold text-sk-text sm:text-sm">{item.text}</div>
                        <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">{item.sub}</div>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom callout */}
          <div className="border-t border-sk-gray-100 bg-sk-navy/5 px-5 py-3 sm:px-6 sm:py-4">
            <p className="text-[10px] text-sk-text-medium sm:text-xs">
              <span className="font-semibold text-sk-text">Both paths start with the same action:</span> a tech takes a photo of a dataplate.
              Path 1 reads the photos they&apos;ve already taken. Path 2 reads every new photo going forward.
              Together, they build a complete equipment database — with zero new behavior from any technician.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Product Vision ─────────────────────────────────── */}
      <Reveal>
        <section>
          <h2 className="mb-2 text-lg font-bold text-sk-dark-900 sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            The Result: What Every Service Location Gets
          </h2>
          <p className="mb-3 text-xs text-sk-text-medium sm:text-sm">
            After Path 1 and Path 2 build the database, every service location gets a profile like this.
          </p>
          <div className="mb-4 rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 px-3 py-2.5 sm:mb-6 sm:px-4 sm:py-3">
            <p className="text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">
              <span className="font-semibold text-sk-dark">The scenario:</span> A tech is dispatched to 123 Oak Lane for a pump repair.
              Before they leave the shop, they open the customer&apos;s equipment profile and see everything installed —
              brand, model, age, condition. They bring the right parts on the first trip. No wasted visit. No phone call to the office.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-sk-blue-200 bg-white shadow-sm">
            <div className="border-b border-sk-gray-100 bg-sk-blue-100 px-4 py-3 sm:px-6 sm:py-4">
              <div className="text-[10px] font-semibold uppercase tracking-wider text-sk-dark sm:text-xs">Service Location</div>
              <div className="text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>{profile.location}</div>
              <div className="text-xs text-sk-text-medium">{profile.customer} — {profile.equipment.length} items identified</div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">
                <thead>
                  <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                    <th className="px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-6 sm:text-xs">Equipment</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Model</th>
                    <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:table-cell sm:text-xs">Serial</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Age</th>
                    <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled md:table-cell sm:text-xs">Lifespan</th>
                    <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Status</th>
                    <th className="hidden px-4 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:table-cell sm:text-xs">WOs</th>
                  </tr>
                </thead>
                <tbody>
                  {profile.equipment.map((eq, i) => (
                    <tr key={i} className="border-b border-sk-gray-100 last:border-0 transition-colors hover:bg-sk-blue-100/30">
                      <td className="px-4 py-3 sm:px-6 sm:py-4">
                        <div className="font-semibold text-sk-text">{eq.brand} {eq.type}</div>
                        <div className="text-[10px] text-sk-text-disabled">Installed {eq.installedDate}</div>
                      </td>
                      <td className="px-3 py-3 font-mono text-[10px] text-sk-text sm:px-4 sm:text-xs">{eq.model}</td>
                      <td className="hidden px-4 py-3 font-mono text-[10px] text-sk-text-medium sm:table-cell sm:text-xs">{eq.serial}</td>
                      <td className="px-3 py-3 text-sk-text sm:px-4">{eq.age}</td>
                      <td className="hidden px-4 py-3 text-sk-text-medium md:table-cell">{eq.avgLifespan}</td>
                      <td className="px-3 py-3 sm:px-4"><StatusBadge status={eq.status} /></td>
                      <td className="hidden px-4 py-3 text-sk-text sm:table-cell">{eq.workOrderCount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-sk-gray-100 bg-gray-50/50 px-4 py-2.5 sm:px-6 sm:py-3">
              <p className="text-[10px] text-sk-text-disabled sm:text-xs">
                Equipment data sourced from work order and route stop photos via AI OCR. Last updated March 2026.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Scale & Cost ─────────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2 className="mb-6 text-lg font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Scale & Cost
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { icon: Cpu, value: "~$280", label: "Process all 70K equipment photos", sub: "70,000 photos × $0.004/image → equipment records for ~100K service locations", accent: "border-t-sk-blue" },
              { icon: DollarSign, value: "$0/mo", label: "On-device OCR for new photos", sub: "Apple Vision + Google ML Kit. Works offline. Every new dataplate auto-builds the record.", accent: "border-t-sk-moss" },
              { icon: TrendingUp, value: "100K+", label: "Service locations covered", sub: "112,780 locations already have equipment photos. Retroactive database from existing data.", accent: "border-t-sk-sunrise" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-t-4 ${item.accent} bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5`}>
                <item.icon className="mb-2 h-5 w-5 text-white/50" />
                <div className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>{item.value}</div>
                <div className="mt-1 text-xs font-medium text-white/80 sm:text-sm">{item.label}</div>
                <div className="mt-1.5 text-[10px] text-white/40 sm:text-xs">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Next Page */}
      <NextPage
        href="/company"
        label="Company Deep Dive"
        description="See what this looks like for a real Skimmer company — their photos, their data, their equipment opportunity."
      />

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Equipment extractions run March 18, 2026 using GPT-4o Vision. {EXTRACTION_STATS.photosProcessed} photos, {EXTRACTION_STATS.successRate} success, {EXTRACTION_STATS.apiCost} total.
      </footer>
    </div>
  );
}
