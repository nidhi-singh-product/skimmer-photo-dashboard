"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, ImageIcon, Building2, Tag, X, ChevronLeft, ChevronRight, Camera, Layers } from "lucide-react";
import {
  SAMPLE_PHOTOS, CATEGORIES, COMPANIES, SOURCES,
  type SamplePhoto,
} from "@/lib/photo-samples";

/* ── Category badge color map ─────────────────────────── */
const categoryColors: Record<string, { bg: string; text: string; dot: string }> = {
  "Basket / Skimmer Cleaning": { bg: "bg-sky-50", text: "text-sky-700", dot: "bg-sky-500" },
  "Pool Overview": { bg: "bg-blue-50", text: "text-blue-700", dot: "bg-blue-500" },
  "Pressure / Gauge": { bg: "bg-amber-50", text: "text-amber-700", dot: "bg-amber-500" },
  "Gate / Security": { bg: "bg-slate-50", text: "text-slate-600", dot: "bg-slate-400" },
  "Filter Maintenance": { bg: "bg-teal-50", text: "text-teal-700", dot: "bg-teal-500" },
  "Equipment Inspection": { bg: "bg-purple-50", text: "text-purple-700", dot: "bg-purple-500" },
  "Equipment Dataplate": { bg: "bg-rose-50", text: "text-rose-700", dot: "bg-rose-500" },
  "After / Completion": { bg: "bg-emerald-50", text: "text-emerald-700", dot: "bg-emerald-500" },
  "Before Photo": { bg: "bg-orange-50", text: "text-orange-700", dot: "bg-orange-500" },
  "Damage / Repair": { bg: "bg-red-50", text: "text-red-700", dot: "bg-red-500" },
  "Brushing / Surface": { bg: "bg-lime-50", text: "text-lime-700", dot: "bg-lime-500" },
  "Chemistry / Readings": { bg: "bg-indigo-50", text: "text-indigo-700", dot: "bg-indigo-500" },
  "Vacuuming": { bg: "bg-cyan-50", text: "text-cyan-700", dot: "bg-cyan-500" },
};

function CategoryBadge({ category }: { category: string }) {
  const c = categoryColors[category] || { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold sm:text-xs ${c.bg} ${c.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${c.dot}`} />
      {category}
    </span>
  );
}

/* ── Photo Card ───────────────────────────────────────── */
function PhotoCard({ photo, onClick }: { photo: SamplePhoto; onClick: () => void }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group cursor-pointer overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm transition-all hover:border-sk-blue-200 hover:shadow-md"
      onClick={onClick}
    >
      {/* Image with hover zoom */}
      <div className="relative aspect-[4/3] overflow-hidden bg-sk-navy/5">
        {!errored ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={photo.url}
            alt={photo.caption}
            loading="lazy"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sk-text-disabled">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}

        {/* Loading shimmer */}
        {!loaded && !errored && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-sk-gray-100 via-white to-sk-gray-100" />
        )}

        {/* Source badge */}
        <div className="absolute left-2 top-2">
          <span className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-[10px] font-semibold backdrop-blur-md sm:text-xs ${
            photo.source === "Work Order"
              ? "bg-sk-sunrise/85 text-white"
              : "bg-sk-dark/75 text-white"
          }`}>
            {photo.source === "Work Order" ? <Layers className="h-3 w-3" /> : <Camera className="h-3 w-3" />}
            {photo.source}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-sk-navy/0 transition-colors duration-300 group-hover:bg-sk-navy/20">
          <span className="translate-y-4 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-sk-dark opacity-0 shadow-lg backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            View photo
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-3 sm:p-4">
        <CategoryBadge category={photo.category} />
        <p className="mt-2 text-xs font-medium leading-relaxed text-sk-text line-clamp-2 sm:text-sm">
          &ldquo;{photo.caption}&rdquo;
        </p>
        <div className="mt-2 flex items-center justify-between text-[10px] text-sk-text-disabled sm:text-xs">
          <span className="flex items-center gap-1">
            <Building2 className="h-3 w-3" />
            {photo.company}
          </span>
          <span>{photo.date}</span>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Lightbox ─────────────────────────────────────────── */
function Lightbox({
  photo,
  photos,
  currentIndex,
  onClose,
  onNavigate,
}: {
  photo: SamplePhoto;
  photos: SamplePhoto[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (idx: number) => void;
}) {
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < photos.length - 1;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-sk-navy/90 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
      >
        <X className="h-5 w-5" />
      </button>

      {/* Nav arrows */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); }}
          className="absolute left-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-6"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); }}
          className="absolute right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-6"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Photo + info */}
      <motion.div
        key={photo.url}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex max-h-[90vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo.url}
          alt={photo.caption}
          className="max-h-[65vh] w-full object-contain bg-sk-navy/5"
        />
        <div className="flex flex-wrap items-start justify-between gap-3 p-4 sm:p-6">
          <div className="space-y-2">
            <CategoryBadge category={photo.category} />
            <p className="text-sm font-medium text-sk-text sm:text-base">&ldquo;{photo.caption}&rdquo;</p>
            <div className="flex items-center gap-3 text-xs text-sk-text-medium">
              <span className="flex items-center gap-1"><Building2 className="h-3 w-3" />{photo.company}</span>
              <span>{photo.source}</span>
              <span>{photo.date}</span>
            </div>
          </div>
          <div className="rounded-lg bg-sk-gray-100 px-3 py-1.5 text-xs text-sk-text-disabled">
            {currentIndex + 1} of {photos.length}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Page ──────────────────────────────────────────────── */
export default function ExplorerPage() {
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [sourceFilter, setSourceFilter] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

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

  const clearFilters = useCallback(() => {
    setCategoryFilter("All");
    setCompanyFilter("All");
    setSourceFilter("All");
  }, []);

  const hasFilters = categoryFilter !== "All" || companyFilter !== "All" || sourceFilter !== "All";

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <section>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1
            className="text-2xl font-bold text-sk-dark-900 sm:text-3xl"
            style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}
          >
            Photo Explorer
          </h1>
          <p className="mt-2 max-w-2xl text-xs text-sk-text-medium sm:text-sm">
            Browse <span className="font-semibold text-sk-text">{SAMPLE_PHOTOS.length} real production photos</span> from{" "}
            <span className="font-semibold text-sk-text">{COMPANIES.length - 1} companies</span>.
            Click any photo to view it full-size. These are live images from Skimmer&apos;s Azure Blob Storage — the same photos techs see in the app.
          </p>
        </motion.div>
      </section>

      {/* Filters bar */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="rounded-xl border border-sk-gray-100 bg-white p-3 shadow-sm sm:p-4"
      >
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-sk-text-medium sm:text-sm">
            <Filter className="h-4 w-4" />
            Filter
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="rounded-lg border border-sk-gray-200 bg-white px-2.5 py-1.5 text-xs text-sk-text focus:border-sk-blue focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Categories" : c}</option>
            ))}
          </select>

          <select
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            className="rounded-lg border border-sk-gray-200 bg-white px-2.5 py-1.5 text-xs text-sk-text focus:border-sk-blue focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
          >
            {COMPANIES.map((c) => (
              <option key={c} value={c}>{c === "All" ? "All Companies" : c}</option>
            ))}
          </select>

          <select
            value={sourceFilter}
            onChange={(e) => setSourceFilter(e.target.value)}
            className="rounded-lg border border-sk-gray-200 bg-white px-2.5 py-1.5 text-xs text-sk-text focus:border-sk-blue focus:outline-none sm:px-3 sm:py-2 sm:text-sm"
          >
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s === "All" ? "All Sources" : s}</option>
            ))}
          </select>

          {hasFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 rounded-lg bg-sk-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-sk-text-medium transition-colors hover:bg-sk-gray-200 sm:text-xs"
            >
              <X className="h-3 w-3" /> Clear
            </button>
          )}

          <span className="ml-auto text-[10px] text-sk-text-disabled sm:text-xs">
            {filtered.length} of {SAMPLE_PHOTOS.length}
          </span>
        </div>
      </motion.section>

      {/* Category chips */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.25, duration: 0.4 }}
        className="flex flex-wrap gap-1.5 sm:gap-2"
      >
        {categoryCounts.map(({ category, count }) => {
          const isActive = categoryFilter === category;
          const c = categoryColors[category] || { bg: "bg-gray-50", text: "text-gray-600", dot: "bg-gray-400" };
          return (
            <button
              key={category}
              onClick={() => setCategoryFilter(isActive ? "All" : category)}
              className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-medium transition-all sm:px-3 sm:py-1.5 sm:text-xs ${
                isActive
                  ? `${c.bg} ${c.text} border-current`
                  : "border-sk-gray-100 bg-white text-sk-text-medium hover:border-sk-gray-300"
              }`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${isActive ? c.dot : "bg-sk-gray-300"}`} />
              {category}
              <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold ${isActive ? "bg-white/60" : "bg-sk-gray-100"}`}>
                {count}
              </span>
            </button>
          );
        })}
      </motion.section>

      {/* Photo Grid */}
      <section>
        <AnimatePresence mode="popLayout">
          <motion.div
            layout
            className="grid grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 sm:gap-4"
          >
            {filtered.map((photo, i) => (
              <PhotoCard
                key={`${photo.url}-${photo.caption}`}
                photo={photo}
                onClick={() => setLightboxIndex(i)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="rounded-xl border border-sk-gray-100 bg-white py-16 text-center"
          >
            <ImageIcon className="mx-auto h-10 w-10 text-sk-text-disabled" />
            <p className="mt-3 text-xs text-sk-text-medium sm:text-sm">No photos match the current filters.</p>
            <button
              onClick={clearFilters}
              className="mt-3 rounded-lg bg-sk-blue-100 px-4 py-2 text-xs font-medium text-sk-blue transition-colors hover:bg-sk-blue-200"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </section>

      {/* Context callout */}
      <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-4 sm:p-5">
        <h3 className="text-xs font-bold text-sk-dark-800 sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
          What you&apos;re seeing
        </h3>
        <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-sm">
          Live photos from Azure Blob Storage — the same photos techs see in the app.
          Categories are from the tech&apos;s caption (the labeled 20%). For the 80% without captions,
          AI classification would assign categories automatically by analyzing the image itself.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        {SAMPLE_PHOTOS.length} photos from {COMPANIES.length - 1} companies — sourced from skimmer-prod_db
      </footer>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <Lightbox
            photo={filtered[lightboxIndex]}
            photos={filtered}
            currentIndex={lightboxIndex}
            onClose={() => setLightboxIndex(null)}
            onNavigate={setLightboxIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
