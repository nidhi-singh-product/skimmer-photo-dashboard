"use client";

import { useRef } from "react";
import {
  BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { motion, useInView } from "framer-motion";
import { Camera, TrendingUp, Tag, Database, Image, Layers, Wrench, MapPin } from "lucide-react";
import { AnimatedCounter } from "@/components/counter";
import {
  PHOTO_TOTALS, MONTHLY_TREND, LABEL_COVERAGE,
  ROUTE_STOP_CATEGORIES, WORK_ORDER_CATEGORIES, LOCATION_CATEGORIES,
  COVERAGE,
} from "@/lib/photo-data";

function fmt(n: number): string {
  if (n >= 1_000_000_000) return (n / 1_000_000_000).toFixed(1) + "B";
  if (n >= 1_000_000) return (n / 1_000_000).toFixed(1) + "M";
  if (n >= 1_000) return (n / 1_000).toFixed(1) + "K";
  return n.toLocaleString();
}

function fmtFull(n: number): string {
  return n.toLocaleString();
}

/* Scroll-triggered section wrapper */
function RevealSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const PIE_COLORS = ["#256295", "#4795EC", "#91BFF4"];
const WO_COLORS = ["#FB8B24", "#FCA250", "#E07B20", "#D46A10", "#C85A00", "#B04E00", "#984200", "#803600", "#682A00", "#501E00", "#381200", "#200600", "#637381", "#919EAB", "#B7BABF"];
const LOC_COLORS = ["#90CC19", "#A6D647", "#6C9913", "#5A8010", "#48670D", "#364E0A", "#243306", "#4795EC", "#3570B1", "#244B76", "#637381", "#919EAB"];
const RS_COLORS = ["#256295", "#4795EC", "#3570B1", "#6CAAF0", "#91BFF4", "#FB8B24", "#FCA250", "#90CC19", "#A6D647", "#4C3779", "#AEEBF3", "#B5D5F7", "#637381", "#919EAB"];

export default function OverviewPage() {
  const pieData = [
    { name: "Route Stop", value: PHOTO_TOTALS.allTime.routeStop, label: "Route Stops" },
    { name: "Work Order", value: PHOTO_TOTALS.allTime.workOrder, label: "Work Orders" },
    { name: "Location", value: PHOTO_TOTALS.allTime.location, label: "Locations" },
  ];

  const labeledTotal = LABEL_COVERAGE.routeStop.withCaption + LABEL_COVERAGE.workOrder.withCaption;
  const unlabeledTotal = LABEL_COVERAGE.routeStop.noCaption + LABEL_COVERAGE.workOrder.noCaption;
  const labelPieData = [
    { name: "Labeled", value: labeledTotal },
    { name: "Unlabeled", value: unlabeledTotal },
  ];

  const trendData = MONTHLY_TREND.map((m) => ({
    ...m,
    photosM: +(m.photos / 1_000_000).toFixed(2),
  }));

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-12 text-white sm:px-12 sm:py-20">
        {/* Animated background orbs */}
        <motion.div
          className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-sk-blue/15 blur-3xl"
          animate={{ scale: [1, 1.15, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-sk-mint/12 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.12, 0.2, 0.12] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute right-1/4 top-1/3 h-48 w-48 rounded-full bg-sk-sunrise/8 blur-3xl"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 4 }}
        />

        {/* Wave SVG at bottom */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 60" className="w-full" preserveAspectRatio="none">
            <path d="M0 30 Q300 0 600 30 Q900 60 1200 30 L1200 60 L0 60Z" fill="#FCFCFC" fillOpacity="1" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-sk-mint sm:text-sm"
          >
            Skimmer Photo Dataset
          </motion.p>

          {/* The big number */}
          <div className="mb-4">
            <span
              className="text-5xl font-bold tracking-tight sm:text-7xl lg:text-8xl"
              style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}
            >
              <AnimatedCounter end={211.7} decimals={1} duration={2500} className="" />
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.7 }}
                transition={{ delay: 2, duration: 0.5 }}
                className="text-3xl font-light text-white/70 sm:text-5xl lg:text-6xl"
              >
                M
              </motion.span>
            </span>
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.4 }}
              className="ml-2 inline-block text-sm font-normal text-white/40 sm:ml-3 sm:text-lg"
            >
              photos &middot; all-time
            </motion.span>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg sm:leading-relaxed"
          >
            Skimmer&apos;s pool technicians have captured the largest field service photo dataset in the industry — across{" "}
            <span className="font-semibold text-white/90">{fmtFull(COVERAGE.companiesTotal)}</span>{" "}
            companies. Growing at{" "}
            <span className="font-semibold text-sk-mint">~{fmt(PHOTO_TOTALS.monthlyRate)}/month</span>.
            Explore the data below, then see what AI can do with it.
          </motion.p>

          {/* Source breakdown pills */}
          <div className="mt-8 sm:mt-10">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mb-3 text-[10px] font-semibold uppercase tracking-[0.25em] text-white/30 sm:text-xs"
            >
              Breakdown by source
            </motion.p>
            <div className="grid grid-cols-2 gap-2.5 sm:flex sm:gap-3">
              {[
                { icon: Camera, label: "Route Stop", value: fmt(PHOTO_TOTALS.allTime.routeStop), sub: "89%", accent: "border-sk-blue/30" },
                { icon: Layers, label: "Work Order", value: fmt(PHOTO_TOTALS.allTime.workOrder), sub: "9%", accent: "border-sk-sunrise/30" },
                { icon: Image, label: "Location", value: fmt(PHOTO_TOTALS.allTime.location), sub: "2%", accent: "border-sk-moss/30" },
                { icon: TrendingUp, label: "Growth", value: `~${fmt(PHOTO_TOTALS.monthlyRate)}`, sub: "/month", accent: "border-sk-mint/30" },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4 + i * 0.12, duration: 0.4 }}
                  className={`rounded-xl border ${s.accent} bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3`}
                >
                  <div className="flex items-center gap-1.5">
                    <s.icon className="hidden h-3.5 w-3.5 text-white/40 sm:block" />
                    <span className="text-[10px] font-medium text-white/50 sm:text-xs">{s.label}</span>
                  </div>
                  <div className="mt-0.5 text-lg font-bold sm:text-xl">{s.value}</div>
                  <div className="text-[10px] text-white/35 sm:text-xs">{s.sub}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Metrics ──────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {[
          {
            icon: Database, label: "Companies Uploading Photos",
            value: PHOTO_TOTALS.companiesUploading.routeStop,
            sub: `${((PHOTO_TOTALS.companiesUploading.routeStop / COVERAGE.companiesTotal) * 100).toFixed(0)}% of all companies`,
            accent: "border-l-sk-dark",
          },
          {
            icon: Camera, label: "Avg Photos per Route Stop",
            value: PHOTO_TOTALS.avgPerEntity.routeStop,
            sub: `${PHOTO_TOTALS.avgPerEntity.workOrder} per work order`,
            accent: "border-l-sk-blue",
          },
          {
            icon: Image, label: "Service Locations with Photos",
            value: COVERAGE.serviceLocationsWithWOPhotos,
            sub: `${((COVERAGE.serviceLocationsWithWOPhotos / COVERAGE.serviceLocationsTotal) * 100).toFixed(0)}% of all service locations`,
            accent: "border-l-sk-sunrise",
          },
        ].map((m, i) => (
          <RevealSection key={m.label} delay={i * 0.1}>
            <div className={`group rounded-xl border border-sk-gray-100 border-l-4 ${m.accent} bg-white p-5 shadow-sm transition-all hover:shadow-md sm:p-6`}>
              <div className="flex items-center gap-2 text-xs font-medium text-sk-text-medium sm:text-sm">
                <m.icon className="h-4 w-4" /> {m.label}
              </div>
              <div className="mt-2 text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
                {typeof m.value === "number" && m.value > 100
                  ? <AnimatedCounter end={m.value} duration={1500} />
                  : m.value}
              </div>
              <div className="mt-1 text-xs text-sk-text-disabled sm:text-sm">{m.sub}</div>
            </div>
          </RevealSection>
        ))}
      </section>

      {/* ── Monthly Growth ───────────────────────────────── */}
      <RevealSection>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <h2 className="mb-1 text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Photos Uploaded Per Month
          </h2>
          <p className="mb-4 text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
            Route stop photos — last 7 months (Mar 2026 is partial)
          </p>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={trendData} barSize={36}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#637381" }} />
              <YAxis tick={{ fontSize: 11, fill: "#637381" }} tickFormatter={(v) => `${v}M`} />
              <Tooltip
                formatter={(value) => [`${Number(value).toFixed(2)}M photos`, "Photos"]}
                contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 13 }}
              />
              <Bar dataKey="photosM" radius={[6, 6, 0, 0]}>
                {trendData.map((_, i) => (
                  <Cell key={i} fill={i === trendData.length - 1 ? "#91BFF4" : "#256295"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </section>
      </RevealSection>

      {/* ── Label Gap + Sources ───────────────────────────── */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <RevealSection>
          <div className="h-full rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-sunrise-100">
                <Tag className="h-4 w-4 text-sk-sunrise" />
              </div>
              <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
                The Label Gap
              </h2>
            </div>
            <p className="mb-4 mt-2 text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
              Last 6 months — {fmt(LABEL_COVERAGE.routeStop.total + LABEL_COVERAGE.workOrder.total)} photos
            </p>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <div className="relative">
                <ResponsiveContainer width={160} height={160}>
                  <PieChart>
                    <Pie data={labelPieData} cx="50%" cy="50%" innerRadius={52} outerRadius={74} dataKey="value" strokeWidth={0}>
                      <Cell fill="#256295" />
                      <Cell fill="#E9EAEB" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-sk-dark" style={{ fontFamily: "var(--font-outfit)" }}>80%</span>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border-l-4 border-l-sk-sunrise bg-sk-sunrise-100 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="text-sm font-bold text-sk-sunrise">{fmt(unlabeledTotal)}</div>
                  <div className="text-[10px] text-sk-text-medium sm:text-xs">Unlabeled — the mining opportunity</div>
                </div>
                <div className="rounded-lg border-l-4 border-l-sk-dark bg-sk-blue-100 px-3 py-2.5 sm:px-4 sm:py-3">
                  <div className="text-sm font-bold text-sk-dark">{fmt(labeledTotal)}</div>
                  <div className="text-[10px] text-sk-text-medium sm:text-xs">Labeled — AI training data from checklists</div>
                </div>
              </div>
            </div>
          </div>
        </RevealSection>

        <RevealSection delay={0.15}>
          <div className="h-full rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
            <h2 className="mb-1 text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Photo Sources — All Time
            </h2>
            <p className="mb-4 mt-1 text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
              {fmt(PHOTO_TOTALS.allTime.total)} total across 3 sources
            </p>
            <div className="flex flex-col items-center gap-5 sm:flex-row sm:gap-8">
              <ResponsiveContainer width={160} height={160}>
                <PieChart>
                  <Pie data={pieData} cx="50%" cy="50%" innerRadius={52} outerRadius={74} dataKey="value" strokeWidth={2} stroke="#fff">
                    {pieData.map((_, i) => (<Cell key={i} fill={PIE_COLORS[i]} />))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-3">
                {pieData.map((d, i) => (
                  <div key={d.name} className="flex items-center gap-3">
                    <div className="h-3 w-3 rounded-sm" style={{ backgroundColor: PIE_COLORS[i] }} />
                    <div>
                      <div className="text-xs font-semibold text-sk-text sm:text-sm">{d.label}</div>
                      <div className="text-[10px] text-sk-text-medium sm:text-xs">
                        {fmt(d.value)} ({((d.value / PHOTO_TOTALS.allTime.total) * 100).toFixed(1)}%)
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </RevealSection>
      </div>

      {/* ── Category Charts ──────────────────────────────── */}
      <section className="space-y-5 sm:space-y-6">
        <RevealSection>
          <div>
            <h2 className="text-lg font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              What Are Techs Photographing?
            </h2>
            <p className="mt-1 text-xs text-sk-text-medium sm:text-sm">
              Each source tells a different story — routine verification, service documentation, and equipment inventory.
            </p>
          </div>
        </RevealSection>

        {/* Route Stop */}
        <RevealSection>
          <div className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
                <Camera className="h-4 w-4 text-sk-blue" />
              </div>
              <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>Route Stop Photos</h3>
              <span className="rounded-full bg-sk-blue-100 px-2.5 py-0.5 text-[10px] font-semibold text-sk-dark sm:text-xs">Routine Verification</span>
            </div>
            <p className="mb-4 text-xs text-sk-text-medium sm:mb-5 sm:text-sm">
              {fmt(LABEL_COVERAGE.routeStop.withCaption)} captioned — checklist-driven proof-of-work
            </p>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={ROUTE_STOP_CATEGORIES} layout="vertical" margin={{ left: 120, right: 10 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => fmt(Number(v))} tick={{ fontSize: 10, fill: "#637381" }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "#212B36" }} width={115} />
                <Tooltip formatter={(value) => [fmtFull(Number(value)), "Photos"]} contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 12 }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {ROUTE_STOP_CATEGORIES.map((_, i) => (<Cell key={i} fill={RS_COLORS[i % RS_COLORS.length]} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </RevealSection>

        {/* Work Order */}
        <RevealSection>
          <div className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-sunrise-100">
                <Wrench className="h-4 w-4 text-sk-sunrise" />
              </div>
              <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>Work Order Photos</h3>
              <span className="rounded-full bg-sk-sunrise-100 px-2.5 py-0.5 text-[10px] font-semibold text-sk-sunrise sm:text-xs">Service Documentation</span>
            </div>
            <p className="mb-2 text-xs text-sk-text-medium sm:text-sm">
              {fmt(WORK_ORDER_CATEGORIES.reduce((a, c) => a + c.count, 0))} captioned — repairs, equipment, damage
            </p>
            <div className="mb-4 rounded-lg border-l-4 border-l-sk-sunrise bg-sk-sunrise-100/50 px-3 py-2 text-[10px] text-sk-text-medium sm:px-4 sm:py-2.5 sm:text-xs">
              <span className="font-semibold text-sk-sunrise">&ldquo;Other&rdquo; (38%):</span> Freeform captions — equipment verification instructions, scheduling notes, acknowledgments. AI would classify these by the actual photo.
            </div>
            <ResponsiveContainer width="100%" height={420}>
              <BarChart data={WORK_ORDER_CATEGORIES} layout="vertical" margin={{ left: 140, right: 10 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => fmt(Number(v))} tick={{ fontSize: 10, fill: "#637381" }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "#212B36" }} width={135} />
                <Tooltip formatter={(value) => [fmtFull(Number(value)), "Photos"]} contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 12 }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {WORK_ORDER_CATEGORIES.map((_, i) => (<Cell key={i} fill={WO_COLORS[i % WO_COLORS.length]} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </RevealSection>

        {/* Location */}
        <RevealSection>
          <div className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
            <div className="mb-1 flex flex-wrap items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-moss-100">
                <MapPin className="h-4 w-4 text-sk-moss-700" />
              </div>
              <h3 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>Location Photos</h3>
              <span className="rounded-full bg-sk-moss-100 px-2.5 py-0.5 text-[10px] font-semibold text-sk-moss-700 sm:text-xs">Equipment Inventory</span>
            </div>
            <p className="mb-2 text-xs text-sk-text-medium sm:text-sm">
              {fmt(LOCATION_CATEGORIES.reduce((a, c) => a + c.count, 0))} captioned — what&apos;s installed at each site
            </p>
            <div className="mb-4 rounded-lg border-l-4 border-l-sk-moss-700 bg-sk-moss-100/50 px-3 py-2 text-[10px] text-sk-text-medium sm:px-4 sm:py-2.5 sm:text-xs">
              <span className="font-semibold text-sk-moss-700">&ldquo;Other&rdquo; (54%):</span> Property notes like &ldquo;ENTER RIGHT&rdquo;, &ldquo;backyard&rdquo;, site descriptions. These likely still show equipment — AI would classify by the image.
            </div>
            <ResponsiveContainer width="100%" height={340}>
              <BarChart data={LOCATION_CATEGORIES} layout="vertical" margin={{ left: 130, right: 10 }} barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
                <XAxis type="number" tickFormatter={(v) => fmt(Number(v))} tick={{ fontSize: 10, fill: "#637381" }} />
                <YAxis type="category" dataKey="category" tick={{ fontSize: 11, fill: "#212B36" }} width={125} />
                <Tooltip formatter={(value) => [fmtFull(Number(value)), "Photos"]} contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 12 }} />
                <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                  {LOCATION_CATEGORIES.map((_, i) => (<Cell key={i} fill={LOC_COLORS[i % LOC_COLORS.length]} />))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </RevealSection>

        {/* Insight */}
        <RevealSection>
          <div className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-4 sm:p-5">
            <h4 className="text-xs font-bold text-sk-dark-800 sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
              Each Source → Different AI Approach
            </h4>
            <p className="mt-1.5 text-[10px] leading-relaxed text-sk-text-medium sm:text-sm">
              <strong>Route stops</strong> → quality scoring &amp; compliance.{" "}
              <strong>Work orders</strong> → equipment OCR, damage detection, before/after.{" "}
              <strong>Location photos</strong> → building equipment inventory per service location.
            </p>
          </div>
        </RevealSection>
      </section>

      {/* ── Opportunity ──────────────────────────────────── */}
      <RevealSection>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2
            className="mb-6 text-lg font-bold sm:text-2xl"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            The Opportunity
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { value: COVERAGE.serviceLocationsWithEquipmentPhotos, suffix: "", label: "Service locations with equipment photos", sub: "Ready for OCR — brand, model, serial from existing dataplates", accent: "border-t-sk-blue" },
              { value: 7556, suffix: "", label: "Photos with model/serial captions", sub: "Techs already photograph dataplates — AI just needs to read them", accent: "border-t-sk-sunrise" },
              { value: 128470, suffix: "", label: "Pressure gauge photos", sub: "AI can read PSI and build filter pressure trends over time", accent: "border-t-sk-moss" },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className={`rounded-xl border-t-4 ${item.accent} bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5`}
              >
                <div className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>
                  <AnimatedCounter end={item.value} duration={1800} />
                </div>
                <div className="mt-1 text-xs font-medium text-white/80 sm:text-sm">{item.label}</div>
                <div className="mt-1.5 text-[10px] text-white/45 sm:text-xs">{item.sub}</div>
              </motion.div>
            ))}
          </div>
        </section>
      </RevealSection>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Skimmer Photo Intelligence — Data sourced from skimmer-prod_db, March 2026
      </footer>
    </div>
  );
}
