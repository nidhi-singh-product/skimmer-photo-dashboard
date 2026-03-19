"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles, Search, Loader2, ImageIcon, Tag, FileText,
  Wrench, Eye, Lightbulb, AlertCircle, Copy, Check,
} from "lucide-react";

interface Analysis {
  category: string;
  confidence: string;
  description: string;
  equipment_detected: string | null;
  ocr_text: string | null;
  condition_assessment: string | null;
  ai_insights: string;
}

interface Result {
  url: string;
  analysis: Analysis;
  cost_estimate: string;
}

const SAMPLE_GROUPS = [
  {
    group: "Equipment & Dataplates",
    samples: [
      { label: "Pump Dataplate", url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/2c288a317af848c7a6887e33ef769fd9.jpg" },
      { label: "Heater Dataplate", url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/46f3e0a879ec41bdaaaccd576494e884.jpg" },
      { label: "Salt Cell Label", url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/7621bacd4c96462a9a95cb86e6ea701f.jpg" },
      { label: "Safety Cover Serial", url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/8d687d0e53f54c799fce9e5258e2b99e.jpg" },
      { label: "Pump Motor Specs", url: "https://storwebproduction.blob.core.windows.net/work-orders-202601/09e950705bcc44479dda4a4ae1604827.jpg" },
    ],
  },
  {
    group: "Pool Conditions",
    samples: [
      { label: "Pool Overview", url: "https://storwebproduction.blob.core.windows.net/service-202603/529617596144430d9013eacd02093a7a.jpg" },
      { label: "Water Clarity", url: "https://storwebproduction.blob.core.windows.net/service-202603/ca2fea9e741c4978b045ce5458ce1635.jpg" },
      { label: "Completed Service", url: "https://storwebproduction.blob.core.windows.net/service-202603/c2902389c19f4782aeee9f6dd84dff15.jpg" },
    ],
  },
  {
    group: "Gauges & Readings",
    samples: [
      { label: "Pressure Gauge", url: "https://storwebproduction.blob.core.windows.net/service-202603/afe6be52c36344e094246c9efb793afb.jpg" },
      { label: "Filter Pressure", url: "https://storwebproduction.blob.core.windows.net/service-202603/7dff28d4d8b34a6ab6ee012922d90581.jpg" },
      { label: "Test Strip", url: "https://storwebproduction.blob.core.windows.net/service-202603/6d297377fdac445589af9890693c05f1.jpg" },
    ],
  },
  {
    group: "Damage & Repairs",
    samples: [
      { label: "Leak Detected", url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/9e96ead9a53a44b6a5c520b8ccd92505.jpg" },
      { label: "Broken Part", url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/abeacfeb1515476f917794793b080569.jpg" },
      { label: "Valve Issue", url: "https://storwebproduction.blob.core.windows.net/work-orders-202602/5446636d7cbe48e487809f6e89791f78.jpg" },
    ],
  },
  {
    group: "Routine Service",
    samples: [
      { label: "Basket Cleaned", url: "https://storwebproduction.blob.core.windows.net/service-202603/017f7339830342a39ec2e5cb04650f10.jpg" },
      { label: "Gate Closed", url: "https://storwebproduction.blob.core.windows.net/service-202603/0ad61aa29a654f968c708b4b9a40e6fb.jpg" },
      { label: "Filter Cleaned", url: "https://storwebproduction.blob.core.windows.net/work-orders-202603/484cf230d1b448859490c32246692bed.jpg" },
      { label: "Vacuumed", url: "https://storwebproduction.blob.core.windows.net/service-202603/91228fa0f2a24d2a876a4733d5280fa8.jpg" },
    ],
  },
];

const confidenceColor: Record<string, string> = {
  High: "bg-sk-moss-100 text-sk-moss-700 border-sk-moss-700/20",
  Medium: "bg-amber-50 text-amber-700 border-amber-200",
  Low: "bg-red-50 text-red-700 border-red-200",
};

function ResultField({ icon: Icon, label, value, accent = "text-sk-dark" }: {
  icon: React.ElementType; label: string; value: string | null; accent?: string;
}) {
  if (!value) return null;
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-lg bg-white p-3 shadow-sm sm:p-4"
    >
      <div className="flex items-center gap-2">
        <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sk-blue-100">
          <Icon className="h-3.5 w-3.5 text-sk-dark" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:text-xs">{label}</span>
      </div>
      <p className={`mt-2 text-xs leading-relaxed sm:text-sm ${accent}`}>{value}</p>
    </motion.div>
  );
}

export default function DemoPage() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [history, setHistory] = useState<Result[]>([]);

  const analyze = async (photoUrl: string) => {
    if (!photoUrl.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    setUrl(photoUrl);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: photoUrl.trim() }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Analysis failed");

      const newResult = { url: photoUrl.trim(), analysis: data.analysis, cost_estimate: data.cost_estimate };
      setResult(newResult);
      setHistory((prev) => [newResult, ...prev.slice(0, 4)]);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const copyUrl = () => {
    if (result?.url) {
      navigator.clipboard.writeText(result.url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* ── Header ────────────────────────────────────────── */}
      <motion.section initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sk-navy">
            <Sparkles className="h-5 w-5 text-sk-mint" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-sk-dark-900 sm:text-3xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Live Demo
            </h1>
            <p className="text-xs text-sk-text-medium sm:text-sm">Don&apos;t take our word for it — try it yourself. Paste any photo URL or pick a sample below.</p>
          </div>
        </div>
      </motion.section>

      {/* ── Input Bar ─────────────────────────────────────── */}
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-5"
      >
        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-sk-text-disabled" />
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && analyze(url)}
              placeholder="Paste a storwebproduction.blob.core.windows.net photo URL..."
              className="w-full rounded-lg border border-sk-gray-200 bg-sk-blue-100/30 py-3 pl-10 pr-4 text-xs text-sk-text placeholder-sk-text-disabled transition-colors focus:border-sk-blue focus:bg-white focus:outline-none sm:text-sm"
              disabled={loading}
            />
          </div>
          <button
            onClick={() => analyze(url)}
            disabled={loading || !url.trim()}
            className="flex items-center justify-center gap-2 rounded-lg bg-sk-navy px-6 py-3 text-sm font-semibold text-white transition-all hover:bg-sk-dark-800 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span className="hidden sm:inline">Analyzing...</span>
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4" />
                Analyze
              </>
            )}
          </button>
        </div>

        {/* Sample URLs by category */}
        <div className="mt-4 space-y-2.5">
          {SAMPLE_GROUPS.map((group) => (
            <div key={group.group} className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="w-full text-[9px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:w-auto sm:min-w-[130px] sm:text-[10px]">{group.group}</span>
              {group.samples.map((s) => (
                <button
                  key={s.label}
                  onClick={() => analyze(s.url)}
                  disabled={loading}
                  className="rounded-full border border-sk-gray-100 bg-white px-2.5 py-1 text-[10px] font-medium text-sk-text-medium transition-all hover:border-sk-blue-200 hover:bg-sk-blue-100 hover:text-sk-dark disabled:opacity-40 sm:text-xs"
                >
                  {s.label}
                </button>
              ))}
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── Error ─────────────────────────────────────────── */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex items-center gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3"
          >
            <AlertCircle className="h-4 w-4 flex-shrink-0 text-red-500" />
            <p className="text-xs text-red-700 sm:text-sm">{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Loading State ─────────────────────────────────── */}
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2"
          >
            <div className="aspect-[4/3] animate-pulse rounded-xl bg-sk-navy/5" />
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-20 animate-pulse rounded-lg bg-sk-navy/5" style={{ animationDelay: `${i * 150}ms` }} />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Result ────────────────────────────────────────── */}
      <AnimatePresence>
        {result && !loading && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6"
          >
            {/* Photo */}
            <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-sk-navy/[0.03] shadow-sm">
              <div className="relative aspect-[4/3]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={result.url}
                  alt="Analyzed photo"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex items-center justify-between border-t border-sk-gray-100 px-3 py-2 sm:px-4 sm:py-2.5">
                <span className="truncate text-[10px] text-sk-text-disabled sm:text-xs">{result.url.split("/").pop()}</span>
                <button onClick={copyUrl} className="flex items-center gap-1 text-[10px] text-sk-text-medium hover:text-sk-dark sm:text-xs">
                  {copied ? <Check className="h-3 w-3 text-sk-moss-700" /> : <Copy className="h-3 w-3" />}
                  {copied ? "Copied" : "Copy URL"}
                </button>
              </div>
            </div>

            {/* Analysis */}
            <div className="space-y-3">
              {/* Category + Confidence header */}
              <motion.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-wrap items-center gap-2 rounded-xl bg-sk-navy p-4 sm:p-5"
              >
                <Tag className="h-4 w-4 text-sk-mint" />
                <span className="text-sm font-bold text-white sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>
                  {result.analysis.category}
                </span>
                <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold sm:text-xs ${confidenceColor[result.analysis.confidence] || "bg-gray-100 text-gray-600"}`}>
                  {result.analysis.confidence} Confidence
                </span>
                <span className="ml-auto text-[10px] text-white/40 sm:text-xs">
                  Cost: {result.cost_estimate}
                </span>
              </motion.div>

              <ResultField icon={Eye} label="What AI Sees" value={result.analysis.description} />
              <ResultField icon={Wrench} label="Equipment Detected" value={result.analysis.equipment_detected} accent="text-sk-dark font-medium" />
              <ResultField icon={FileText} label="Text / OCR Extracted" value={result.analysis.ocr_text} accent="font-mono text-sk-dark" />
              <ResultField icon={AlertCircle} label="Condition Assessment" value={result.analysis.condition_assessment} />
              <ResultField icon={Lightbulb} label="AI Insights" value={result.analysis.ai_insights} accent="text-sk-dark" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── History ───────────────────────────────────────── */}
      {history.length > 1 && (
        <section>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-sk-text-disabled sm:text-sm">
            Recent Analyses
          </h3>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:gap-3">
            {history.map((h, i) => (
              <button
                key={`${h.url}-${i}`}
                onClick={() => { setResult(h); setUrl(h.url); }}
                className={`flex-shrink-0 overflow-hidden rounded-lg border-2 transition-all ${
                  result?.url === h.url && result?.analysis.category === h.analysis.category
                    ? "border-sk-blue shadow-md"
                    : "border-transparent opacity-60 hover:opacity-90"
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={h.url} alt={h.analysis.category} className="h-14 w-14 object-cover sm:h-16 sm:w-16" />
              </button>
            ))}
          </div>
        </section>
      )}

      {/* ── Empty state ───────────────────────────────────── */}
      {!result && !loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="rounded-xl border border-dashed border-sk-gray-200 bg-white py-16 text-center sm:py-20"
        >
          <ImageIcon className="mx-auto h-10 w-10 text-sk-text-disabled sm:h-12 sm:w-12" />
          <p className="mt-3 text-sm font-medium text-sk-text-medium">Paste a photo URL above or try a sample</p>
          <p className="mt-1 text-[10px] text-sk-text-disabled sm:text-xs">AI will classify the photo, extract text, identify equipment, and assess condition</p>
        </motion.div>
      )}

      {/* ── Context ───────────────────────────────────────── */}
      <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-4 sm:p-5">
        <h3 className="text-xs font-bold text-sk-dark-800 sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>
          How This Works
        </h3>
        <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-sm">
          The photo URL is sent to GPT-4o Vision, which analyzes the image and returns structured data — classification, OCR text, equipment identification, and condition assessment.
          This runs in real-time (~3-5 seconds). Cost: ~$0.01 per photo. In production, this would run automatically on every photo uploaded via the mobile app.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Live analysis powered by GPT-4o Vision — ~$0.01 per photo
      </footer>
    </div>
  );
}
