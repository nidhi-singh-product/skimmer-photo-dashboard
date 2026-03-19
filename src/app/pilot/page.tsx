"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  CheckCircle2, Clock, AlertTriangle, DollarSign, Camera, Zap, Target,
} from "lucide-react";
import { AnimatedCounter } from "@/components/counter";
import { PILOT_RESULTS, PILOT_TOTAL_COST, PILOT_TOTAL_PHOTOS } from "@/lib/photo-data";

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
  GO: { bg: "bg-sk-moss-100", text: "text-sk-moss-700", border: "border-l-sk-moss-700", icon: CheckCircle2, label: "GO", pulse: "shadow-sk-moss-700/20" },
  DEFERRED: { bg: "bg-sk-sunrise-100", text: "text-sk-sunrise", border: "border-l-sk-sunrise", icon: Clock, label: "DEFERRED", pulse: "" },
  "NO-GO": { bg: "bg-red-50", text: "text-red-600", border: "border-l-red-500", icon: AlertTriangle, label: "NO-GO", pulse: "" },
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
            Before building anything, we tested: does AI actually work on real pool service photos? We ran{" "}
            <span className="font-semibold text-white/90">{PILOT_TOTAL_PHOTOS} real production photos</span>{" "}
            through GPT-4o Vision for{" "}
            <span className="font-semibold text-sk-mint">{PILOT_TOTAL_COST}</span>.
            Not a vendor demo — real photos from real techs.
          </motion.p>

          {/* Summary stats */}
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:flex sm:gap-3">
            {[
              { icon: Zap, label: "Validated", value: `${goCount} of 5` },
              { icon: Camera, label: "Photos Tested", value: String(PILOT_TOTAL_PHOTOS) },
              { icon: DollarSign, label: "Total Cost", value: PILOT_TOTAL_COST },
              { icon: Target, label: "Projected 1K", value: "~$4" },
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

      {/* ── What This Proves ─────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-dark-200 bg-gradient-to-r from-sk-blue-100 via-white to-sk-mint-100 p-5 sm:p-6">
          <h2 className="mb-4 text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            What This Proves
          </h2>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
            {[
              { result: "Classification works (85%+)", soWhat: "We can categorize the 80% of photos that have no caption — turning invisible data into searchable, structured categories.", accent: "border-l-sk-blue" },
              { result: "Equipment OCR works (100%)", soWhat: "We can read brand, model, and serial from dataplates — meaning we can build an equipment database from photos techs already take.", accent: "border-l-sk-moss-700" },
              { result: "Gauge reading works (70%)", soWhat: "We can extract PSI values from pressure gauge photos — opening the door to automated filter pressure tracking over time.", accent: "border-l-sk-sunrise" },
              { result: "Water clarity scoring works (95%)", soWhat: "We can assess pool condition from a photo — enabling water quality trends and early detection of algae or clarity issues.", accent: "border-l-sk-orchid" },
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
                    <span>Accuracy: <span className="font-semibold text-sk-text">{pilot.accuracy}</span></span>
                    <span>Cost: <span className="font-semibold text-sk-text">{pilot.cost}</span></span>
                  </div>
                </div>

                {/* Body */}
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-xs text-sk-text sm:text-sm">{pilot.summary}</p>
                  <ul className="mt-2.5 space-y-1.5 sm:mt-3">
                    {pilot.details.map((d, i) => (
                      <li key={i} className="flex items-start gap-2 text-[10px] text-sk-text-medium sm:text-sm">
                        <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sk-blue-300" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          );
        })}
      </section>

      {/* ── Bottom Line ──────────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2 className="mb-6 text-lg font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Bottom Line
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { value: "$0.48", label: "Analyzed 120 real production photos", accent: "border-t-sk-blue" },
              { value: "~$280", label: "To build equipment DB from 70K photos", accent: "border-t-sk-sunrise" },
              { value: "$0/mo", label: "On-device OCR in mobile app (offline)", accent: "border-t-sk-moss" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-t-4 ${item.accent} bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5`}>
                <div className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>{item.value}</div>
                <div className="mt-1 text-xs text-white/70 sm:text-sm">{item.label}</div>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-xs leading-relaxed text-white/50 sm:text-sm">
            The data is there. The technology is proven. The cost is trivial.
            Four of five use cases validated. The equipment database build costs less than a team lunch.
          </p>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Pilot conducted March 17, 2026 using GPT-4o Vision on Skimmer production photos
      </footer>
    </div>
  );
}
