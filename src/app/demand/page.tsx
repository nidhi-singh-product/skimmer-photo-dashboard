"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";
import {
  Users, Camera, MessageCircle, TrendingUp, FileText, Quote, BarChart3,
} from "lucide-react";
import { AnimatedCounter } from "@/components/counter";
import { NextPage } from "@/components/next-page";
import {
  SURVEY_STATS, KEY_FINDINGS, EQUIPMENT_RECORDING_METHODS,
  TIME_SAVING_FEATURES, PAIN_POINTS, PRO_QUOTES, HUBSPOT_STATS,
} from "@/lib/demand-data";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

export default function DemandPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-10 text-white sm:px-12 sm:py-16">
        <motion.div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-sk-sunrise/12 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 h-56 w-56 rounded-full bg-sk-blue/12 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 2 }} />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 50" className="w-full" preserveAspectRatio="none">
            <path d="M0 25 Q300 0 600 25 Q900 50 1200 25 L1200 50 L0 50Z" fill="#FCFCFC" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }}
            className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sk-sunrise-500 sm:text-sm">
            Customer Demand
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}>
            Pros Are Already Asking for This
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-2xl text-sm leading-relaxed text-white/60 sm:text-lg">
            This isn&apos;t our idea — it&apos;s what pool service professionals are requesting.{" "}
            <span className="font-semibold text-sk-sunrise-500">57% want camera → auto-fill equipment.</span>{" "}
            56% already photograph dataplates and walk away. The behavior exists. AI just reads what they capture.
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2.5 backdrop-blur-sm">
            <Users className="h-4 w-4 text-white/50" />
            <span className="text-xs text-white/50 sm:text-sm">Based on <span className="font-semibold text-white">{SURVEY_STATS.totalResponses} survey responses</span> + <span className="font-semibold text-white">{HUBSPOT_STATS.photoTickets} HubSpot feature requests</span></span>
          </motion.div>
        </div>
      </section>

      {/* ── Key Findings ──────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
        {KEY_FINDINGS.map((f, i) => (
          <Reveal key={f.stat} delay={i * 0.1}>
            <div className={`rounded-xl border border-sk-gray-100 border-t-4 ${f.color} bg-white p-5 shadow-sm sm:p-6`}>
              <div className="text-3xl font-bold text-sk-dark-900 sm:text-4xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
                {f.stat}
              </div>
              <div className="mt-1 text-xs font-semibold text-sk-text sm:text-sm">{f.label}</div>
              <div className="mt-2 text-[10px] italic text-sk-text-medium sm:text-xs">{f.sub}</div>
              <div className="mt-3 text-[10px] text-sk-text-disabled sm:text-xs">{f.votes} of {SURVEY_STATS.totalResponses} respondents</div>
            </div>
          </Reveal>
        ))}
      </section>

      {/* ── How Techs Record Equipment Today ───────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
              <Camera className="h-3.5 w-3.5 text-sk-dark" />
            </div>
            <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              How Techs Record Equipment Details Today
            </h2>
          </div>
          <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
            {SURVEY_STATS.totalResponses} responses — &ldquo;How do your techs currently record equipment details?&rdquo;
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={EQUIPMENT_RECORDING_METHODS} layout="vertical" margin={{ left: 200, right: 20 }} barSize={18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E9EAEB" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 10, fill: "#637381" }} />
              <YAxis type="category" dataKey="method" tick={{ fontSize: 11, fill: "#212B36" }} width={195} />
              <Tooltip formatter={(value) => [value, "Responses"]} contentStyle={{ borderRadius: 8, border: "1px solid #E9EAEB", fontSize: 12 }} />
              <Bar dataKey="count" radius={[0, 4, 4, 0]}>
                {EQUIPMENT_RECORDING_METHODS.map((_, i) => (
                  <Cell key={i} fill={i === 0 ? "#256295" : "#B5D5F7"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-3 rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 px-3 py-2.5 sm:px-4">
            <p className="text-[10px] text-sk-text-medium sm:text-xs">
              <span className="font-semibold text-sk-dark">The dominant behavior: take a photo and move on.</span>{" "}
              56% of pros already capture dataplate photos — the data goes into blob storage and is never read.
              AI OCR reads what they already photograph. No behavior change needed.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── What Would Save Most Time ──────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-moss-100">
              <TrendingUp className="h-3.5 w-3.5 text-sk-moss-700" />
            </div>
            <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              What Would Save Techs the Most Time?
            </h2>
          </div>
          <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
            Multi-select — &ldquo;When your techs need to document what they see, which would save the most time?&rdquo;
          </p>
          <div className="space-y-2.5">
            {TIME_SAVING_FEATURES.map((f, i) => (
              <Reveal key={f.feature} delay={i * 0.05}>
                <div className={`flex items-center gap-3 rounded-lg p-3 ${f.highlight ? "border border-sk-blue-200 bg-sk-blue-100" : "bg-sk-gray-100/50"}`}>
                  <div className="flex-shrink-0">
                    <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                      <svg viewBox="0 0 36 36" className="h-full w-full -rotate-90">
                        <circle cx="18" cy="18" r="14" fill="none" stroke="#E9EAEB" strokeWidth="4" />
                        <circle cx="18" cy="18" r="14" fill="none" stroke={f.highlight ? "#256295" : "#919EAB"} strokeWidth="4"
                          strokeDasharray={`${f.pct * 0.88} 88`} strokeLinecap="round" />
                      </svg>
                      <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-sk-dark sm:text-[10px]">{f.pct}%</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-xs font-semibold sm:text-sm ${f.highlight ? "text-sk-dark" : "text-sk-text-medium"}`}>{f.feature}</div>
                    <div className="text-[10px] text-sk-text-disabled">{f.votes} votes</div>
                  </div>
                  {f.highlight && (
                    <span className="flex-shrink-0 rounded-full bg-sk-dark px-2.5 py-0.5 text-[9px] font-bold text-white sm:text-[10px]">Photo Intelligence</span>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Pain Points ───────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-sunrise-100">
              <BarChart3 className="h-3.5 w-3.5 text-sk-sunrise" />
            </div>
            <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Pain Points (1-5 Scale)
            </h2>
          </div>
          <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:mb-5 sm:text-xs">
            &ldquo;How much of a pain point is each of these for your team?&rdquo; — % rating 3-5 (moderate to major)
          </p>
          <div className="space-y-3">
            {PAIN_POINTS.map((p, i) => (
              <Reveal key={p.pain} delay={i * 0.08}>
                <div className="rounded-lg border border-sk-gray-100 bg-white p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex-1">
                      <div className="text-xs font-semibold text-sk-text sm:text-sm">{p.pain}</div>
                      <div className="mt-0.5 text-[10px] text-sk-text-disabled sm:text-xs">{p.note}</div>
                    </div>
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-sk-sunrise sm:text-xl" style={{ fontFamily: "var(--font-outfit)" }}>{p.rating3to5}%</div>
                        <div className="text-[9px] text-sk-text-disabled">3-5 rated</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-sk-dark sm:text-xl" style={{ fontFamily: "var(--font-outfit)" }}>{p.rating4to5}%</div>
                        <div className="text-[9px] text-sk-text-disabled">4-5 rated</div>
                      </div>
                    </div>
                  </div>
                  {/* Visual bar */}
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-sk-gray-100">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${p.rating3to5}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                      className="h-full rounded-full bg-gradient-to-r from-sk-sunrise to-sk-sunrise-500"
                    />
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Their Words ───────────────────────────────────── */}
      <Reveal>
        <section>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-orchid/10">
              <MessageCircle className="h-3.5 w-3.5 text-sk-orchid" />
            </div>
            <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              Their Words, Not Ours
            </h2>
          </div>
          <p className="mb-4 text-[10px] text-sk-text-medium sm:text-xs">
            Direct quotes from the survey — &ldquo;If you had a magic wand, what feature do you wish Skimmer had?&rdquo;
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {PRO_QUOTES.map((q, i) => (
              <Reveal key={i} delay={i * 0.06}>
                <div className="rounded-xl border-l-4 border-l-sk-orchid bg-white p-4 shadow-sm sm:p-5">
                  <Quote className="mb-2 h-5 w-5 text-sk-orchid/30" />
                  <p className="text-xs italic leading-relaxed text-sk-text sm:text-sm">
                    &ldquo;{q.quote}&rdquo;
                  </p>
                  <p className="mt-2 text-[10px] text-sk-text-disabled">— Pool Service Professional</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── HubSpot Evidence ──────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-sk-blue-100">
              <FileText className="h-3.5 w-3.5 text-sk-dark" />
            </div>
            <h2 className="text-base font-bold sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              HubSpot Feature Requests
            </h2>
          </div>
          <p className="mb-4 mt-1 text-[10px] text-sk-text-medium sm:text-xs">
            Beyond the survey — what pros are requesting through support
          </p>

          <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            <div className="rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 p-4">
              <div className="text-2xl font-bold text-sk-dark sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>
                <AnimatedCounter end={HUBSPOT_STATS.photoTickets} duration={1200} />
              </div>
              <div className="mt-0.5 text-xs font-medium text-sk-text">Photo-related feature requests</div>
              <div className="mt-1 text-[10px] text-sk-text-medium">Organization, management, upload, and AI analysis</div>
            </div>
            <div className="rounded-lg border-l-4 border-l-sk-orchid bg-purple-50 p-4">
              <div className="text-2xl font-bold text-sk-orchid sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>1</div>
              <div className="mt-0.5 text-xs font-medium text-sk-text">Explicit AI photo analysis request</div>
              <div className="mt-1 text-[10px] text-sk-text-medium">&ldquo;AI Test Strip Image Analysis for Reading Verification&rdquo;</div>
            </div>
          </div>

          <h3 className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">Representative Requests</h3>
          <div className="space-y-2">
            {HUBSPOT_STATS.relevantExamples.map((ex, i) => (
              <div key={i} className="flex items-start gap-2 rounded-lg bg-sk-gray-100/50 px-3 py-2">
                <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sk-blue" />
                <span className="text-[10px] text-sk-text-medium sm:text-xs">{ex}</span>
              </div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── The Gap ───────────────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2 className="mb-3 text-lg font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            The Gap
          </h2>
          <p className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
            Pros are generating photos at scale, asking for AI to read them, and manually working around
            what automation could solve. The technology is proven
            (see <span className="font-semibold text-sk-mint">AI Validation</span>).
            The demand is documented. The question is <span className="font-semibold text-white">when, not if</span>.
          </p>
        </section>
      </Reveal>

      {/* Next Page */}
      <NextPage
        href="/demo"
        label="Live Demo"
        description="Don't take our word for it — try AI analysis on any Skimmer photo yourself."
      />

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Survey: {SURVEY_STATS.totalResponses} responses, March 2026 — HubSpot: {HUBSPOT_STATS.photoTickets} photo feature requests in pipeline
      </footer>
    </div>
  );
}
