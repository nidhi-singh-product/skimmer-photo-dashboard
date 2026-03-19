"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, PieChart, Pie,
} from "recharts";
import {
  Building2, Camera, Image, MapPin, Users, Wrench, Lightbulb, Tag, ChevronRight,
} from "lucide-react";
import { AnimatedCounter } from "@/components/counter";
import { COMPANIES_DATA, type CompanyProfile } from "@/lib/company-data";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

function fmt(n: number): string {
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

export default function CompanyPage() {
  const [selectedId, setSelectedId] = useState(COMPANIES_DATA[0].id);
  const company = COMPANIES_DATA.find((c) => c.id === selectedId)!;
  const s = company.stats;

  const labeledPie = [
    { name: "Labeled", value: s.withCaption },
    { name: "Unlabeled", value: s.totalPhotos - s.withCaption },
  ];

  const categoryColors: Record<string, string> = {
    "Pool Overview": "#4795EC",
    "Basket / Skimmer": "#256295",
    "After / Completion": "#6CAAF0",
    "Pressure / Gauge": "#FB8B24",
    "Gate / Security": "#637381",
    "Chemistry / Readings": "#4C3779",
    "Vacuuming": "#AEEBF3",
    "Filter Maintenance": "#90CC19",
    "Brushing / Surface": "#A6D647",
    "Before Photo": "#FCA250",
    "Damage / Repair": "#E07B20",
    "Equipment Inspection": "#3570B1",
    "Other": "#919EAB",
  };

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-10 text-white sm:px-12 sm:py-14">
        <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sk-blue/12 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sk-mint/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 50" className="w-full" preserveAspectRatio="none">
            <path d="M0 25 Q300 0 600 25 Q900 50 1200 25 L1200 50 L0 50Z" fill="#FCFCFC" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sk-mint sm:text-sm">
            Company Deep Dive
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}>
            What Photo Intelligence Looks Like<br className="hidden sm:block" /> for a Real Company
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg">
            Not a hypothetical. These are real companies on Skimmer with real photo data.
            See what their classified photo database and equipment profiles would look like.
          </motion.p>
        </div>
      </section>

      {/* ── Company Selector ──────────────────────────────── */}
      <section className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
        {COMPANIES_DATA.map((c) => (
          <button
            key={c.id}
            onClick={() => setSelectedId(c.id)}
            className={`group rounded-xl border-2 p-4 text-left transition-all sm:p-5 ${
              selectedId === c.id
                ? "border-sk-blue bg-sk-blue-100 shadow-md"
                : "border-sk-gray-100 bg-white hover:border-sk-blue-200 hover:shadow-sm"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${selectedId === c.id ? "bg-sk-navy" : "bg-sk-gray-100"}`}>
                  <Building2 className={`h-4 w-4 ${selectedId === c.id ? "text-white" : "text-sk-text-medium"}`} />
                </div>
                <div>
                  <div className="text-sm font-bold text-sk-text sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>{c.name}</div>
                  <span className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[9px] font-bold sm:text-[10px] ${c.tagBg} ${c.tagColor}`}>
                    {c.tag}
                  </span>
                </div>
              </div>
              <ChevronRight className={`h-4 w-4 transition-transform ${selectedId === c.id ? "text-sk-blue" : "text-sk-text-disabled"}`} />
            </div>
            <p className="mt-2 text-[10px] text-sk-text-medium sm:text-xs">{c.description}</p>
          </button>
        ))}
      </section>

      {/* ── Stats Grid ────────────────────────────────────── */}
      <Reveal>
        <section className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            { icon: Camera, label: "Photos (6 months)", value: s.totalPhotos, accent: "border-l-sk-blue" },
            { icon: MapPin, label: "Service Locations", value: s.serviceLocations, accent: "border-l-sk-sunrise" },
            { icon: Users, label: "Customers", value: s.customers, accent: "border-l-sk-moss-700" },
            { icon: Image, label: "Photos per Stop", value: s.photosPerStop, accent: "border-l-sk-orchid", noCounter: true },
          ].map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className={`rounded-xl border border-sk-gray-100 border-l-4 ${m.accent} bg-white p-3 shadow-sm sm:p-4`}
            >
              <div className="flex items-center gap-1.5 text-[10px] text-sk-text-medium sm:text-xs">
                <m.icon className="h-3.5 w-3.5" /> {m.label}
              </div>
              <div className="mt-1.5 text-xl font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
                {m.noCounter ? m.value : <AnimatedCounter end={m.value as number} duration={1200} />}
              </div>
            </motion.div>
          ))}
        </section>
      </Reveal>

      {/* ── Label Coverage + Category Chart ────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
        <Reveal>
          <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
                <Tag className="h-3.5 w-3.5 text-sk-dark" />
              </div>
              <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>Caption Coverage</h3>
            </div>
            <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
              {s.captionPct}% of photos have captions{s.captionPct < 50 ? " — AI classification would handle the rest" : ""}
            </p>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <div className="relative">
                <ResponsiveContainer width={150} height={150}>
                  <PieChart>
                    <Pie data={labeledPie} cx="50%" cy="50%" innerRadius={48} outerRadius={68} dataKey="value" strokeWidth={0}>
                      <Cell fill="#256295" />
                      <Cell fill="#E9EAEB" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-lg font-bold text-sk-dark" style={{ fontFamily: "var(--font-outfit)" }}>{s.captionPct}%</span>
                </div>
              </div>
              <div className="space-y-2.5">
                <div className="rounded-lg border-l-4 border-l-sk-dark bg-sk-blue-100 px-3 py-2">
                  <div className="text-sm font-bold text-sk-dark">{fmt(s.withCaption)}</div>
                  <div className="text-[10px] text-sk-text-medium">Labeled photos</div>
                </div>
                <div className="rounded-lg border-l-4 border-l-sk-sunrise bg-sk-sunrise-100 px-3 py-2">
                  <div className="text-sm font-bold text-sk-sunrise">{fmt(s.totalPhotos - s.withCaption)}</div>
                  <div className="text-[10px] text-sk-text-medium">
                    {s.captionPct >= 90 ? "Unlabeled (minimal)" : "Unlabeled — AI opportunity"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-sunrise-100">
                <Wrench className="h-3.5 w-3.5 text-sk-sunrise" />
              </div>
              <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>Equipment Opportunity</h3>
            </div>
            <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
              Work order photos with equipment data
            </p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 px-3 py-2.5">
                  <div className="text-lg font-bold text-sk-dark" style={{ fontFamily: "var(--font-outfit)" }}>{fmt(s.woPhotos)}</div>
                  <div className="text-[10px] text-sk-text-medium">Work order photos</div>
                </div>
                <div className="rounded-lg border-l-4 border-l-sk-moss-700 bg-sk-moss-100 px-3 py-2.5">
                  <div className="text-lg font-bold text-sk-moss-700" style={{ fontFamily: "var(--font-outfit)" }}>{fmt(s.woEquipmentKeywords)}</div>
                  <div className="text-[10px] text-sk-text-medium">Equipment keyword photos</div>
                </div>
              </div>
              <div className="rounded-lg bg-sk-navy/5 px-3 py-2.5 text-[10px] text-sk-text-medium sm:text-xs">
                {s.woEquipmentKeywords > 100
                  ? `With ${fmt(s.woEquipmentKeywords)} equipment photos, we could build profiles for a significant portion of their ${fmt(s.serviceLocations)} service locations.`
                  : `AI vision would identify equipment in photos even without captions — across all ${fmt(s.woPhotos)} work order photos.`
                }
              </div>
            </div>
          </div>
        </Reveal>
      </div>

      {/* ── Category Breakdown ─────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h3 className="mb-1 text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Photo Categories — {company.name}
          </h3>
          <p className="mb-4 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
            {fmt(s.withCaption)} captioned route stop photos classified by keyword matching
          </p>
          <ResponsiveContainer width="100%" height={Math.max(300, company.categories.length * 30)}>
            <BarChart data={company.categories.filter((c) => c.count > 0)} layout="vertical" margin={{ left: 120, right: 10 }} barSize={14}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
              <XAxis type="number" tickFormatter={(v) => fmt(Number(v))} tick={{ fontSize: 10, fill: "#637381" }} />
              <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "#212B36" }} width={115} />
              <Tooltip formatter={(value) => [Number(value).toLocaleString(), "Photos"]} contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {company.categories.filter((c) => c.count > 0).map((c) => (
                  <Cell key={c.category} fill={categoryColors[c.category] || "#919EAB"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          {s.captionPct < 50 && (
            <div className="mt-4 rounded-lg border-l-4 border-l-sk-sunrise bg-sk-sunrise-100/50 px-3 py-2.5 text-[10px] text-sk-text-medium sm:text-xs">
              <span className="font-semibold text-sk-sunrise">Note:</span> This only shows the {s.captionPct}% with captions.
              AI classification would categorize the remaining {fmt(s.totalPhotos - s.withCaption)} unlabeled photos — potentially revealing
              thousands more equipment, damage, and gauge photos.
            </div>
          )}
        </section>
      </Reveal>

      {/* ── Sample Photos ──────────────────────────────────── */}
      <Reveal>
        <section>
          <h3 className="mb-4 text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Sample Photos — {company.name}
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
            {company.samplePhotos.map((p, i) => (
              <motion.div
                key={p.url}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.06 }}
                className="group overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sk-navy/5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.url}
                    alt={p.caption}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="px-3 py-2">
                  <p className="text-[10px] font-medium text-sk-text sm:text-xs">&ldquo;{p.caption}&rdquo;</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Insights ──────────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-5 sm:p-6">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-sk-dark" />
            <h3 className="text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
              Key Insights — {company.name}
            </h3>
          </div>
          <ul className="mt-3 space-y-2.5">
            {company.insights.map((insight, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="flex items-start gap-2.5 rounded-lg bg-white p-3 shadow-sm sm:p-4">
                  <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sk-navy text-[10px] font-bold text-white">{i + 1}</span>
                  <p className="text-xs text-sk-text-medium sm:text-sm">{insight}</p>
                </li>
              </Reveal>
            ))}
          </ul>
        </section>
      </Reveal>

      {/* ── The Multiplier ─────────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2 className="mb-3 text-lg font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            The Multiplier
          </h2>
          <p className="max-w-2xl text-sm text-white/60 sm:text-base">
            <span className="font-semibold text-white">{company.name}</span> is one company.
          </p>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { value: 6279, label: "Companies uploading photos", sub: "Each one has a story like this", accent: "border-t-sk-blue" },
              { value: 211, suffix: "M+", label: "Total photos across all companies", sub: "The combined dataset", accent: "border-t-sk-mint" },
              { value: 100, suffix: "K+", label: "Service locations ready for equipment profiles", sub: "From existing photos alone", accent: "border-t-sk-sunrise" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-t-4 ${item.accent} bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5`}>
                <div className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>
                  <AnimatedCounter end={item.value} duration={1500} />{item.suffix || ""}
                </div>
                <div className="mt-1 text-xs text-white/80 sm:text-sm">{item.label}</div>
                <div className="mt-1 text-[10px] text-white/40 sm:text-xs">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Company data sourced from skimmer-prod_db — March 2026
      </footer>
    </div>
  );
}
