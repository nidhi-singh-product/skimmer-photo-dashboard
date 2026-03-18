"use client";

import { useState } from "react";
import { Filter, ImageIcon, Building2, Tag } from "lucide-react";
import {
  SAMPLE_PHOTOS, CATEGORIES, COMPANIES, SOURCES,
  type SamplePhoto,
} from "@/lib/photo-samples";

function CategoryBadge({ category }: { category: string }) {
  const colorMap: Record<string, string> = {
    "Basket / Skimmer Cleaning": "bg-sky-100 text-sky-700",
    "Pool Overview": "bg-blue-100 text-blue-700",
    "Pressure / Gauge": "bg-amber-100 text-amber-700",
    "Gate / Security": "bg-slate-100 text-slate-600",
    "Filter Maintenance": "bg-teal-100 text-teal-700",
    "Equipment Inspection": "bg-purple-100 text-purple-700",
    "Equipment Dataplate": "bg-rose-100 text-rose-700",
    "After / Completion": "bg-emerald-100 text-emerald-700",
    "Before Photo": "bg-orange-100 text-orange-700",
    "Damage / Repair": "bg-red-100 text-red-700",
    "Brushing / Surface": "bg-lime-100 text-lime-700",
    "Chemistry / Readings": "bg-indigo-100 text-indigo-700",
  };
  const cls = colorMap[category] || "bg-gray-100 text-gray-600";
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}>
      {category}
    </span>
  );
}

function PhotoCard({ photo }: { photo: SamplePhoto }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <div className="group overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sk-gray-100">
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.url}
            alt={photo.caption}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sk-text-disabled">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}
        {/* Source badge */}
        <span
          className={`absolute left-2 top-2 rounded-md px-2 py-0.5 text-xs font-medium backdrop-blur-sm ${
            photo.source === "Work Order"
              ? "bg-sk-sunrise/90 text-white"
              : "bg-sk-blue/90 text-white"
          }`}
        >
          {photo.source}
        </span>
      </div>

      {/* Info */}
      <div className="p-4">
        <CategoryBadge category={photo.category} />
        <p className="mt-2 text-sm font-medium text-sk-text line-clamp-2">
          &ldquo;{photo.caption}&rdquo;
        </p>
        <div className="mt-2 flex items-center justify-between text-xs text-sk-text-disabled">
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {photo.company}
          </span>
          <span>{photo.date}</span>
        </div>
      </div>
    </div>
  );
}

export default function ExplorerPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");

  const filtered = SAMPLE_PHOTOS.filter((p) => {
    if (categoryFilter !== "All" && p.category !== categoryFilter) return false;
    if (companyFilter !== "All" && p.company !== companyFilter) return false;
    if (sourceFilter !== "All" && p.source !== sourceFilter) return false;
    return true;
  });

  const categoryCounts = CATEGORIES.slice(1).map((cat) => ({
    category: cat,
    count: SAMPLE_PHOTOS.filter((p) => p.category === cat).length,
  })).sort((a, b) => b.count - a.count);

  return (
    <div className="space-y-8">
      {/* Header */}
      <section>
        <h1
          className="text-3xl font-bold text-sk-dark-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Photo Explorer
        </h1>
        <p className="mt-2 max-w-2xl text-sk-text-medium">
          Browse real production photos from Skimmer&apos;s Azure Blob Storage.
          These are actual photos taken by pool technicians in the field — {SAMPLE_PHOTOS.length} samples from {COMPANIES.length - 1} companies.
        </p>
      </section>

      {/* Filters */}
      <section className="flex flex-wrap items-center gap-4 rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-sk-text-medium">
          <Filter className="h-4 w-4" />
          Filters
        </div>

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-sk-gray-200 bg-white px-3 py-2 text-sm text-sk-text focus:border-sk-blue focus:outline-none"
        >
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Categories" : c}
            </option>
          ))}
        </select>

        <select
          value={companyFilter}
          onChange={(e) => setCompanyFilter(e.target.value)}
          className="rounded-lg border border-sk-gray-200 bg-white px-3 py-2 text-sm text-sk-text focus:border-sk-blue focus:outline-none"
        >
          {COMPANIES.map((c) => (
            <option key={c} value={c}>
              {c === "All" ? "All Companies" : c}
            </option>
          ))}
        </select>

        <select
          value={sourceFilter}
          onChange={(e) => setSourceFilter(e.target.value)}
          className="rounded-lg border border-sk-gray-200 bg-white px-3 py-2 text-sm text-sk-text focus:border-sk-blue focus:outline-none"
        >
          {SOURCES.map((s) => (
            <option key={s} value={s}>
              {s === "All" ? "All Sources" : s}
            </option>
          ))}
        </select>

        <span className="ml-auto text-sm text-sk-text-disabled">
          Showing {filtered.length} of {SAMPLE_PHOTOS.length} photos
        </span>
      </section>

      {/* Category Quick Stats */}
      <section className="flex flex-wrap gap-2">
        {categoryCounts.map(({ category, count }) => (
          <button
            key={category}
            onClick={() =>
              setCategoryFilter(categoryFilter === category ? "All" : category)
            }
            className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
              categoryFilter === category
                ? "border-sk-blue bg-sk-blue-light text-sk-blue"
                : "border-sk-gray-100 bg-white text-sk-text-medium hover:border-sk-blue-200"
            }`}
          >
            <Tag className="h-3 w-3" />
            {category}
            <span className="rounded-full bg-sk-gray-100 px-1.5 py-0.5 text-[10px]">
              {count}
            </span>
          </button>
        ))}
      </section>

      {/* Photo Grid */}
      <section className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filtered.map((photo, i) => (
          <PhotoCard key={`${photo.url}-${i}`} photo={photo} />
        ))}
      </section>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-sk-gray-100 bg-white py-16 text-center">
          <ImageIcon className="mx-auto h-12 w-12 text-sk-text-disabled" />
          <p className="mt-3 text-sm text-sk-text-medium">
            No photos match the current filters.
          </p>
        </div>
      )}

      {/* Context callout */}
      <section className="rounded-xl bg-sk-blue-light p-6">
        <h3 className="text-sm font-bold text-sk-dark-800" style={{ fontFamily: "var(--font-outfit)" }}>
          What you&apos;re seeing
        </h3>
        <p className="mt-1 text-sm text-sk-text-medium">
          These are live photos from Skimmer&apos;s Azure Blob Storage — the same photos techs see in the app.
          Categories shown are based on the tech&apos;s caption (the labeled 20%). For the 80% of photos without captions,
          AI classification would assign these categories automatically. The Photo Explorer demonstrates
          what a classified, searchable photo database would look like.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-6 text-center text-xs text-sk-text-disabled">
        Photos sourced from skimmer-prod_db — {SAMPLE_PHOTOS.length} samples from {COMPANIES.length - 1} companies
      </footer>
    </div>
  );
}
