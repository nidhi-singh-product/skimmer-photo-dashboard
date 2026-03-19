"use client";

import {
  BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { Camera, TrendingUp, Tag, Database, Image, Layers } from "lucide-react";
import {
  PHOTO_TOTALS, MONTHLY_TREND, LABEL_COVERAGE,
  ROUTE_STOP_CATEGORIES, COVERAGE,
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

const PIE_COLORS = ["#4795EC", "#3570B1", "#244B76"];
const CATEGORY_COLORS = [
  "#4795EC", "#256295", "#3570B1", "#6CAAF0", "#91BFF4",
  "#FB8B24", "#FCA250", "#90CC19", "#A6D647", "#4C3779",
  "#AEEBF3", "#B5D5F7", "#637381", "#919EAB",
];

export default function OverviewPage() {
  const pieData = [
    { name: "Route Stop", value: PHOTO_TOTALS.allTime.routeStop, label: "Route Stops" },
    { name: "Work Order", value: PHOTO_TOTALS.allTime.workOrder, label: "Work Orders" },
    { name: "Location", value: PHOTO_TOTALS.allTime.location, label: "Locations" },
  ];

  const labeledTotal =
    LABEL_COVERAGE.routeStop.withCaption + LABEL_COVERAGE.workOrder.withCaption;
  const unlabeledTotal =
    LABEL_COVERAGE.routeStop.noCaption + LABEL_COVERAGE.workOrder.noCaption;
  const labelPieData = [
    { name: "Labeled", value: labeledTotal },
    { name: "Unlabeled", value: unlabeledTotal },
  ];

  const trendData = MONTHLY_TREND.map((m) => ({
    ...m,
    photosM: +(m.photos / 1_000_000).toFixed(2),
  }));

  return (
    <div className="space-y-10">
      {/* ── Hero Section ─────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sk-dark-900 via-sk-dark-800 to-sk-blue-800 px-10 py-14 text-white">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sk-blue/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-sk-mint/10 blur-3xl" />
        <div className="relative">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sk-mint">
            Skimmer Photo Dataset
          </p>
          <h1
            className="mb-3 text-6xl font-bold tracking-tight"
            style={{ fontFamily: "var(--font-outfit)" }}
          >
            {fmt(PHOTO_TOTALS.allTime.total)}
            <span className="ml-3 text-2xl font-normal text-white/60">
              photos
            </span>
          </h1>
          <p className="max-w-2xl text-lg text-white/70">
            Field service photos captured by pool technicians across{" "}
            <span className="font-semibold text-white">
              {fmtFull(COVERAGE.companiesTotal)}
            </span>{" "}
            companies. Growing at{" "}
            <span className="font-semibold text-sk-mint">
              ~{fmt(PHOTO_TOTALS.monthlyRate)}/month
            </span>
            . An untapped dataset waiting for AI.
          </p>
        </div>

        {/* Mini stat pills */}
        <div className="relative mt-8 flex flex-wrap gap-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-widest text-white/40">
            Breakdown by source
          </p>
          {[
            { icon: Camera, label: "Route Stop Photos", value: fmt(PHOTO_TOTALS.allTime.routeStop), sub: "89% of total" },
            { icon: Layers, label: "Work Order Photos", value: fmt(PHOTO_TOTALS.allTime.workOrder), sub: "9% of total" },
            { icon: Image, label: "Location Photos", value: fmt(PHOTO_TOTALS.allTime.location), sub: "2% of total" },
            { icon: TrendingUp, label: "Monthly Growth", value: `~${fmt(PHOTO_TOTALS.monthlyRate)}`, sub: "new photos each month" },
          ].map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm"
            >
              <s.icon className="h-5 w-5 text-sk-mint" />
              <div>
                <div className="text-xl font-bold">{s.value}</div>
                <div className="text-xs text-white/50">{s.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Metrics Row ──────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-sk-text-medium">
            <Database className="h-4 w-4" /> Companies Uploading Photos
          </div>
          <div className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            {fmtFull(PHOTO_TOTALS.companiesUploading.routeStop)}
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">
            {((PHOTO_TOTALS.companiesUploading.routeStop / COVERAGE.companiesTotal) * 100).toFixed(0)}% of all companies
          </div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-sk-text-medium">
            <Camera className="h-4 w-4" /> Avg Photos per Route Stop
          </div>
          <div className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            {PHOTO_TOTALS.avgPerEntity.routeStop}
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">
            {PHOTO_TOTALS.avgPerEntity.workOrder} per work order
          </div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-medium text-sk-text-medium">
            <Image className="h-4 w-4" /> Service Locations with Photos
          </div>
          <div className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            {fmt(COVERAGE.serviceLocationsWithWOPhotos)}
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">
            {((COVERAGE.serviceLocationsWithWOPhotos / COVERAGE.serviceLocationsTotal) * 100).toFixed(0)}% of all service locations
          </div>
        </div>
      </section>

      {/* ── Monthly Growth Chart ─────────────────────────── */}
      <section className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
          Photos Uploaded Per Month
        </h2>
        <p className="mb-6 text-sm text-sk-text-medium">
          Route stop photos — last 7 months (Mar 2026 is partial)
        </p>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={trendData} barSize={48}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" />
            <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#637381" }} />
            <YAxis
              tick={{ fontSize: 12, fill: "#637381" }}
              tickFormatter={(v) => `${v}M`}
            />
            <Tooltip
              formatter={(value) => [`${Number(value).toFixed(2)}M photos`, "Photos"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB" }}
            />
            <Bar dataKey="photosM" fill="#4795EC" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
        <div className="mt-4 flex justify-center gap-8 text-sm text-sk-text-medium">
          <span>
            <span className="font-semibold text-sk-text">
              {fmtFull(MONTHLY_TREND.filter((m) => !m.partial).reduce((a, m) => a + m.companies, 0) / MONTHLY_TREND.filter((m) => !m.partial).length | 0)}
            </span>{" "}
            avg companies/month
          </span>
          <span>
            <span className="font-semibold text-sk-text">
              {fmt(MONTHLY_TREND.filter((m) => !m.partial).reduce((a, m) => a + m.photos, 0))}
            </span>{" "}
            photos in 6 months
          </span>
        </div>
      </section>

      {/* ── Labeled vs Unlabeled ──────────────────────────── */}
      <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-sk-sunrise" />
            <h2 className="text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
              The Label Gap
            </h2>
          </div>
          <p className="mb-6 mt-1 text-sm text-sk-text-medium">
            Last 6 months — {fmt(LABEL_COVERAGE.routeStop.total + LABEL_COVERAGE.workOrder.total)} photos analyzed
          </p>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={labelPieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  <Cell fill="#4795EC" />
                  <Cell fill="#E9EAEB" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              <div>
                <div className="text-3xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>
                  ~80%
                </div>
                <div className="text-sm text-sk-text-medium">
                  of photos have <span className="font-semibold text-sk-text">no caption or label</span>
                </div>
              </div>
              <div className="rounded-lg bg-sk-sunrise-100 px-4 py-3">
                <div className="text-sm font-medium text-sk-sunrise">
                  {fmt(unlabeledTotal)} unlabeled photos
                </div>
                <div className="mt-0.5 text-xs text-sk-text-medium">
                  Sitting in storage with zero metadata — this is the mining opportunity
                </div>
              </div>
              <div className="rounded-lg bg-sk-blue-light px-4 py-3">
                <div className="text-sm font-medium text-sk-blue">
                  {fmt(labeledTotal)} labeled photos
                </div>
                <div className="mt-0.5 text-xs text-sk-text-medium">
                  From checklist items — serves as AI training data
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Photo Source Breakdown */}
        <div className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
          <h2 className="mb-1 text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            Photo Sources — All Time
          </h2>
          <p className="mb-6 text-sm text-sk-text-medium">
            {fmt(PHOTO_TOTALS.allTime.total)} total photos across 3 sources
          </p>
          <div className="flex items-center gap-8">
            <ResponsiveContainer width={180} height={180}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={55}
                  outerRadius={80}
                  dataKey="value"
                  strokeWidth={0}
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={PIE_COLORS[i]} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3">
              {pieData.map((d, i) => (
                <div key={d.name} className="flex items-center gap-3">
                  <div
                    className="h-3 w-3 rounded-full"
                    style={{ backgroundColor: PIE_COLORS[i] }}
                  />
                  <div>
                    <div className="text-sm font-semibold">{d.label}</div>
                    <div className="text-xs text-sk-text-medium">
                      {fmt(d.value)} ({((d.value / PHOTO_TOTALS.allTime.total) * 100).toFixed(1)}%)
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── What Are Techs Photographing? ────────────────── */}
      <section className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-1 text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
          What Are Techs Photographing?
        </h2>
        <p className="mb-6 text-sm text-sk-text-medium">
          Categories from {fmt(LABEL_COVERAGE.routeStop.withCaption)} captioned route stop photos (last 6 months)
        </p>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={ROUTE_STOP_CATEGORIES}
            layout="vertical"
            margin={{ left: 160 }}
            barSize={20}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
            <XAxis type="number" tickFormatter={(v) => fmt(Number(v))} tick={{ fontSize: 11, fill: "#637381" }} />
            <YAxis
              type="category"
              dataKey="category"
              tick={{ fontSize: 12, fill: "#212B36" }}
              width={155}
            />
            <Tooltip
              formatter={(value) => [fmtFull(Number(value)), "Photos"]}
              contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB" }}
            />
            <Bar dataKey="count" radius={[0, 6, 6, 0]}>
              {ROUTE_STOP_CATEGORIES.map((_, i) => (
                <Cell key={i} fill={CATEGORY_COLORS[i % CATEGORY_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </section>

      {/* ── The Opportunity Callout ───────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-r from-sk-blue-light via-white to-sk-moss-100 p-8">
        <h2
          className="mb-3 text-2xl font-bold text-sk-dark-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          The Opportunity
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>
              {fmt(COVERAGE.serviceLocationsWithEquipmentPhotos)}
            </div>
            <div className="mt-1 text-sm font-medium text-sk-text">
              Service locations with equipment photos
            </div>
            <div className="mt-2 text-xs text-sk-text-medium">
              Ready for OCR extraction — brand, model, serial number from existing dataplate photos
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-sk-sunrise" style={{ fontFamily: "var(--font-outfit)" }}>
              7,556
            </div>
            <div className="mt-1 text-sm font-medium text-sk-text">
              Photos with model/serial captions
            </div>
            <div className="mt-2 text-xs text-sk-text-medium">
              Techs are already photographing dataplates — we just need AI to read them
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-3xl font-bold text-sk-moss-700" style={{ fontFamily: "var(--font-outfit)" }}>
              128K
            </div>
            <div className="mt-1 text-sm font-medium text-sk-text">
              Pressure gauge photos
            </div>
            <div className="mt-2 text-xs text-sk-text-medium">
              AI can read PSI values and build filter pressure trends over time
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-6 text-center text-xs text-sk-text-disabled">
        Skimmer Photo Intelligence — Data sourced from skimmer-prod_db, March 2026
      </footer>
    </div>
  );
}
