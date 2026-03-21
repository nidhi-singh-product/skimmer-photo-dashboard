"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2, Clock, AlertTriangle, DollarSign, Camera, Zap, Target,
  Beaker, Eye, ImageIcon, XCircle,
} from "lucide-react";
import Image from "next/image";
import { AnimatedCounter } from "@/components/counter";
import { NextPage } from "@/components/next-page";
import { PILOT_RESULTS, PILOT_TOTAL_COST, PILOT_TOTAL_PHOTOS, PHOTO_QUALITY_TABLE } from "@/lib/photo-data";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

const verdictConfig = {
  GO: { bg: "bg-sk-moss-100", text: "text-sk-moss-700", border: "border-l-sk-moss-700", icon: CheckCircle2, label: "PASS", pulse: "shadow-sk-moss-700/20" },
  DEFERRED: { bg: "bg-sk-sunrise-100", text: "text-sk-sunrise", border: "border-l-sk-sunrise", icon: Clock, label: "DEFERRED", pulse: "" },
  "NO-GO": { bg: "bg-red-50", text: "text-red-600", border: "border-l-red-500", icon: AlertTriangle, label: "BELOW TARGET", pulse: "" },
};

export default function PilotPage() {
  const goCount = PILOT_RESULTS.filter((r) => r.verdict === "GO").length;

  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-10 text-white sm:px-12 sm:py-16">
        <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sk-moss/15 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 6, repeat: Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sk-blue/12 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 2 }} />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 50" className="w-full" preserveAspectRatio="none">
            <path d="M0 25 Q300 0 600 25 Q900 50 1200 25 L1200 50 L0 50Z" fill="#FCFCFC" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sk-moss-500 sm:text-sm">
            AI Validation
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}>
            <span className="text-sk-moss-500"><AnimatedCounter end={goCount} duration={1500} /></span>
            <span className="text-white/60"> of 5</span>
            <span className="ml-3 text-lg font-normal text-white/40 sm:text-2xl">use cases validated</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg">
            We tested whether AI can extract useful data from real pool service photos —{" "}
            <span className="font-semibold text-white/90">{PILOT_TOTAL_PHOTOS} production photos</span>{" "}
            for{" "}
            <span className="font-semibold text-sk-mint">{PILOT_TOTAL_COST}</span> total.
            Not a vendor demo — real photos from real techs.
          </motion.p>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
            {[
              { icon: Zap, label: "Passed", value: `${goCount} of 5` },
              { icon: Camera, label: "Photos Tested", value: String(PILOT_TOTAL_PHOTOS) },
              { icon: DollarSign, label: "Total Cost", value: PILOT_TOTAL_COST },
              { icon: Target, label: "Projected 1K", value: "~$6" },
            ].map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 + i * 0.1 }}
                className="rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2.5 backdrop-blur-sm sm:px-5 sm:py-3">
                <div className="flex items-center gap-1.5">
                  <s.icon className="hidden h-3.5 w-3.5 text-white/40 sm:block" />
                  <span className="text-[10px] font-medium text-white/50 sm:text-xs">{s.label}</span>
                </div>
                <div className="mt-0.5 text-lg font-bold sm:text-xl">{s.value}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How We Validated ────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-blue-200 bg-gradient-to-br from-sk-blue-100 via-white to-sk-mint-100 p-5 sm:p-8">
          <h2 className="mb-3 text-lg font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            How We Validated
          </h2>
          <p className="mb-5 text-sm leading-relaxed text-sk-text-medium sm:text-base">
            We selected one of the Skimmer pros with a <span className="font-semibold text-sk-text">98.1% caption rate</span> across
            132,000+ photos — the closest thing to human-labeled ground truth in our dataset. Captions were written by field techs
            via checklist items. For each pilot, we <span className="font-semibold text-sk-text">stripped the caption</span>, sent just
            the photo to the AI, and compared its output against what the tech originally wrote.
            The AI never saw the answer.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { step: "1", title: "Select Photos", desc: "Pull real production photos from a company with high caption rates" },
              { step: "2", title: "Strip Labels", desc: "Remove all captions — AI sees only the raw image" },
              { step: "3", title: "AI Analyzes", desc: "Claude Vision classifies, reads, or scores each photo blind" },
              { step: "4", title: "Compare", desc: "Match AI output against the tech's original caption" },
            ].map((s, i) => (
              <Reveal key={s.step} delay={i * 0.08}>
                <div className="rounded-lg border border-sk-blue-200 bg-white p-3 sm:p-4">
                  <div className="mb-2 flex h-7 w-7 items-center justify-center rounded-full bg-sk-dark text-xs font-bold text-white">{s.step}</div>
                  <div className="text-xs font-bold text-sk-dark-800 sm:text-sm">{s.title}</div>
                  <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Core Finding ───────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border-2 border-sk-blue-300 bg-gradient-to-r from-sk-mint-100 to-sk-blue-100 p-5 sm:p-6">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-sk-dark text-white">
              <Eye className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-sk-dark-800 sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>The Core Finding</h3>
              <p className="mt-1 text-sm leading-relaxed text-sk-text sm:text-base">
                <span className="font-semibold">When the photo contains what the AI needs to see, accuracy is high across all use cases.</span>{" "}
                The difference between pilots isn&apos;t AI capability — it&apos;s how often production photos naturally contain the right signal.
                A pool photo almost always shows water (95%), but an equipment photo rarely shows the dataplate close-up (27%).
                The variable is photo quality and framing, not AI accuracy.
              </p>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Photo Quality vs AI Accuracy Table ──────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm">
          <div className="border-b border-sk-gray-100 px-4 py-3 sm:px-6 sm:py-4">
            <h2 className="text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Photo Quality vs. AI Accuracy
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b-2 border-sk-blue-200 bg-sk-blue-100/50">
                  <th className="px-4 py-3 text-left font-semibold text-sk-dark sm:px-6" style={{ fontFamily: "var(--font-outfit)" }}>Use Case</th>
                  <th className="px-4 py-3 text-center font-semibold text-sk-dark sm:px-6" style={{ fontFamily: "var(--font-outfit)" }}>Photos with usable signal</th>
                  <th className="px-4 py-3 text-center font-semibold text-sk-dark sm:px-6" style={{ fontFamily: "var(--font-outfit)" }}>AI accuracy on those</th>
                  <th className="hidden px-4 py-3 text-left font-semibold text-sk-dark sm:table-cell sm:px-6" style={{ fontFamily: "var(--font-outfit)" }}>Why</th>
                </tr>
              </thead>
              <tbody>
                {PHOTO_QUALITY_TABLE.map((row, i) => (
                  <tr key={row.useCase} className={i < PHOTO_QUALITY_TABLE.length - 1 ? "border-b border-sk-gray-100" : ""}>
                    <td className="px-4 py-3 font-medium text-sk-text sm:px-6">{row.useCase}</td>
                    <td className="px-4 py-3 text-center sm:px-6">
                      <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                        row.usableSignal.startsWith("9") || row.usableSignal.startsWith("100")
                          ? "bg-sk-moss-100 text-sk-moss-700"
                          : "bg-sk-sunrise-100 text-sk-sunrise"
                      }`}>
                        {row.usableSignal}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-center font-bold sm:px-6">
                      <span className={
                        row.aiAccuracy.includes("100") ? "text-sk-moss-700"
                          : row.aiAccuracy.includes("74") ? "text-sk-sunrise"
                          : "text-red-500"
                      }>
                        {row.aiAccuracy}
                      </span>
                    </td>
                    <td className="hidden px-4 py-3 text-xs text-sk-text-medium sm:table-cell sm:px-6">{row.why}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </Reveal>

      {/* ── Pilot Cards ──────────────────────────────────── */}
      <section className="space-y-4 sm:space-y-5">
        <h2 className="text-lg font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
          Detailed Results
        </h2>
        {PILOT_RESULTS.map((pilot, idx) => {
          const vc = verdictConfig[pilot.verdict];
          const VerdictIcon = vc.icon;
          return (
            <Reveal key={pilot.id} delay={idx * 0.08}>
              <div className={`overflow-hidden rounded-xl border-l-4 ${vc.border} bg-white shadow-sm transition-all hover:shadow-md`}>
                {/* Header */}
                <div className="flex flex-col gap-2 border-b border-sk-gray-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4">
                  <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                    <h3 className="text-sm font-bold text-sk-text sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>
                      {pilot.name}
                    </h3>
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 + idx * 0.1, type: "spring", stiffness: 300 }}
                      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-bold sm:text-xs ${vc.bg} ${vc.text}`}
                    >
                      <VerdictIcon className="h-3 w-3 sm:h-3.5 sm:w-3.5" />
                      {vc.label}
                    </motion.span>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-[10px] text-sk-text-medium sm:gap-5 sm:text-sm">
                    <span><span className="font-semibold text-sk-text">{pilot.photosTested}</span> photos</span>
                    <span>Usable: <span className="font-semibold text-sk-text">{pilot.usablePhotos}/{pilot.photosTested}</span></span>
                    <span>Accuracy: <span className="font-semibold text-sk-text">{pilot.accuracy}</span></span>
                    <span>Cost: <span className="font-semibold text-sk-text">{pilot.cost}</span></span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  {/* How it worked */}
                  <div className="mb-4 rounded-lg bg-sk-blue-100 p-3 sm:p-4">
                    <div className="flex items-start gap-2.5">
                      <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-sk-dark text-[10px] font-bold text-white">?</div>
                      <p className="text-xs leading-relaxed text-sk-dark-800 sm:text-sm">
                        <span className="font-semibold">How it worked: </span>
                        {pilot.howItWorked}
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-sk-text sm:text-sm">{pilot.summary}</p>
                  <ul className="mt-2.5 space-y-1.5 sm:mt-3">
                    {pilot.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-sk-text-medium sm:text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sk-blue-300" />
                        {d}
                      </li>
                    ))}
                  </ul>

                  {/* Why gap explanation */}
                  {pilot.whyGap && (
                    <div className="mt-3 rounded-lg bg-sk-sunrise-100/60 p-3">
                      <p className="text-xs text-sk-text sm:text-sm">
                        <span className="font-semibold">Why the gap: </span>
                        {pilot.whyGap}
                      </p>
                    </div>
                  )}

                  {/* Example photos */}
                  {pilot.examplePhoto && (
                    <div className="mt-4 space-y-3">
                      <div className="flex items-center gap-3 rounded-lg border border-sk-gray-100 p-3">
                        <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md bg-sk-gray-100 sm:h-24 sm:w-36">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={pilot.examplePhoto.url}
                            alt={pilot.examplePhoto.caption}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="inline-block rounded bg-sk-blue-100 px-2 py-0.5 text-[10px] font-semibold text-sk-dark sm:text-xs">
                              Tech: &ldquo;{pilot.examplePhoto.caption}&rdquo;
                            </span>
                            <span className="inline-block rounded bg-sk-moss-100 px-2 py-0.5 text-[10px] font-semibold text-sk-moss-700 sm:text-xs">
                              AI: {pilot.examplePhoto.aiResult}
                            </span>
                          </div>
                        </div>
                      </div>

                      {pilot.failPhoto && (
                        <div className="flex items-center gap-3 rounded-lg border border-red-100 bg-red-50/30 p-3">
                          <div className="relative h-20 w-28 flex-shrink-0 overflow-hidden rounded-md bg-sk-gray-100 sm:h-24 sm:w-36">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={pilot.failPhoto.url}
                              alt={pilot.failPhoto.caption}
                              className="h-full w-full object-cover"
                              loading="lazy"
                            />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex flex-wrap gap-1.5">
                              <span className="inline-block rounded bg-sk-blue-100 px-2 py-0.5 text-[10px] font-semibold text-sk-dark sm:text-xs">
                                Tech: &ldquo;{pilot.failPhoto.caption}&rdquo;
                              </span>
                              <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-600 sm:text-xs">
                                AI: {pilot.failPhoto.aiResult}
                              </span>
                            </div>
                            <p className="mt-1 text-[10px] text-sk-text-medium sm:text-xs">{pilot.failPhoto.reason}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── What This Proves ─────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-5 sm:p-6">
          <h2 className="mb-4 text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            What This Proves
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              { result: "The AI works — photo quality is the variable", soWhat: "When the photo contains the right signal, accuracy is high across every use case: 100% for water clarity, 100% for brand detection, 100% for clean gauge reads.", accent: "border-l-sk-blue" },
              { result: "Water clarity is the easiest win", soWhat: "Any photo that shows a pool gives the AI enough to work with (95% of pool photos). No special framing or close-up needed. 100% accuracy.", accent: "border-l-sk-moss-700" },
              { result: "Equipment OCR is an AI success with a capture problem", soWhat: "Brand detection was 100% on every readable dataplate. The issue: only 27% of work order photos show the label. Guided capture solves this without any AI improvement.", accent: "border-l-sk-sunrise" },
              { result: "Classification needs a different approach", soWhat: "Visual categories work (gauge, pool, gate). Task categories require knowing what the tech intended, not just what the camera sees. Simpler taxonomy or checklist pairing would help.", accent: "border-l-sk-orchid" },
            ].map((item, i) => (
              <Reveal key={item.result} delay={i * 0.08}>
                <div className={`rounded-lg border-l-4 ${item.accent} bg-white p-4 shadow-sm`}>
                  <div className="text-xs font-bold text-sk-dark sm:text-sm">{item.result}</div>
                  <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{item.soWhat}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Bottom Line ──────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-moss-100 p-5 sm:p-6">
          <p className="text-xs text-sk-text sm:text-sm">
            <span className="font-bold">The technology works when it can see what it needs.</span>{" "}
            3 of 4 completed pilots proved the AI is accurate on usable photos.
            The path to production is improving what the camera captures — through guided prompts and checklist integration — not improving the AI.
          </p>
        </section>
      </Reveal>

      {/* Next Page */}
      <NextPage
        href="/equipment"
        label="Equipment Intelligence"
        description="See what AI extracts from dataplates — brand, model, serial — and how it builds an equipment database."
      />

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Pilot conducted March 17, 2026 using Claude Vision API on Skimmer production photos &middot; Total cost: {PILOT_TOTAL_COST}
      </footer>
    </div>
  );
}
