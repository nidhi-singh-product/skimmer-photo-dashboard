"use client";

import {
  CheckCircle2, Clock, AlertTriangle, DollarSign, Camera, Zap,
} from "lucide-react";
import { PILOT_RESULTS, PILOT_TOTAL_COST, PILOT_TOTAL_PHOTOS } from "@/lib/photo-data";

const verdictConfig = {
  GO: {
    bg: "bg-sk-moss-100",
    text: "text-sk-moss-700",
    border: "border-sk-moss-700/20",
    icon: CheckCircle2,
    label: "GO",
  },
  DEFERRED: {
    bg: "bg-sk-sunrise-100",
    text: "text-sk-sunrise",
    border: "border-sk-sunrise/20",
    icon: Clock,
    label: "DEFERRED",
  },
  "NO-GO": {
    bg: "bg-red-50",
    text: "text-red-600",
    border: "border-red-200",
    icon: AlertTriangle,
    label: "NO-GO",
  },
};

export default function PilotPage() {
  const goCount = PILOT_RESULTS.filter((r) => r.verdict === "GO").length;

  return (
    <div className="space-y-10">
      {/* ── Header ───────────────────────────────────────── */}
      <section>
        <h1
          className="text-3xl font-bold text-sk-dark-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Pilot Scorecard
        </h1>
        <p className="mt-2 max-w-2xl text-sk-text-medium">
          We analyzed{" "}
          <span className="font-semibold text-sk-text">{PILOT_TOTAL_PHOTOS} real production photos</span>{" "}
          across 5 use cases using GPT-4o Vision. Total cost:{" "}
          <span className="font-semibold text-sk-moss-700">{PILOT_TOTAL_COST}</span>.
          Not a vendor demo, not synthetic data — real photos from real techs in the field.
        </p>
      </section>

      {/* ── What This Proves ─────────────────────────────── */}
      <section className="rounded-xl border border-sk-blue-200 bg-sk-blue-light p-6">
        <h2 className="mb-4 text-lg font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          What This Proves
        </h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {[
            {
              result: "Classification works (85%+)",
              soWhat: "We can categorize the 80% of photos that have no caption — turning invisible data into searchable, structured categories.",
            },
            {
              result: "Equipment OCR works (100%)",
              soWhat: "We can read brand, model, and serial from dataplates — meaning we can build an equipment database from photos techs already take.",
            },
            {
              result: "Gauge reading works (70%)",
              soWhat: "We can extract PSI values from pressure gauge photos — opening the door to automated filter pressure tracking over time.",
            },
            {
              result: "Water clarity scoring works (95%)",
              soWhat: "We can assess pool condition from a photo — enabling water quality trends and early detection of algae or clarity issues.",
            },
          ].map((item) => (
            <div key={item.result} className="rounded-lg bg-white p-4 shadow-sm">
              <div className="text-sm font-bold text-sk-blue">{item.result}</div>
              <p className="mt-1 text-xs text-sk-text-medium">{item.soWhat}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Summary Stats ────────────────────────────────── */}
      <section className="grid grid-cols-1 gap-5 md:grid-cols-4">
        <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-sk-text-medium">
            <Zap className="h-4 w-4" /> Verdict
          </div>
          <div className="mt-2 text-3xl font-bold text-sk-moss-700" style={{ fontFamily: "var(--font-outfit)" }}>
            {goCount} of 5
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">use cases validated</div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-sk-text-medium">
            <Camera className="h-4 w-4" /> Photos Tested
          </div>
          <div className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            {PILOT_TOTAL_PHOTOS}
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">real production photos</div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-sk-text-medium">
            <DollarSign className="h-4 w-4" /> Total Cost
          </div>
          <div className="mt-2 text-3xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>
            {PILOT_TOTAL_COST}
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">in API fees for 120 photos</div>
        </div>

        <div className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-sk-text-medium">
            <DollarSign className="h-4 w-4" /> Projected Full Pilot
          </div>
          <div className="mt-2 text-3xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
            ~$4
          </div>
          <div className="mt-1 text-sm text-sk-text-disabled">for 1,000 photos at this rate</div>
        </div>
      </section>

      {/* ── Pilot Cards ──────────────────────────────────── */}
      <section className="space-y-5">
        {PILOT_RESULTS.map((pilot) => {
          const vc = verdictConfig[pilot.verdict];
          const VerdictIcon = vc.icon;
          return (
            <div
              key={pilot.id}
              className={`rounded-xl border bg-white shadow-sm overflow-hidden ${vc.border}`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-sk-gray-100 px-6 py-4">
                <div className="flex items-center gap-4">
                  <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
                    {pilot.name}
                  </h3>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold ${vc.bg} ${vc.text}`}
                  >
                    <VerdictIcon className="h-3.5 w-3.5" />
                    {vc.label}
                  </span>
                </div>
                <div className="flex items-center gap-6 text-sm text-sk-text-medium">
                  <span>
                    <span className="font-semibold text-sk-text">{pilot.photosTested}</span> photos
                  </span>
                  <span>
                    Accuracy:{" "}
                    <span className="font-semibold text-sk-text">{pilot.accuracy}</span>
                  </span>
                  <span>
                    Cost: <span className="font-semibold text-sk-text">{pilot.cost}</span>
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="px-6 py-4">
                <p className="text-sm text-sk-text">{pilot.summary}</p>
                <ul className="mt-3 space-y-1.5">
                  {pilot.details.map((d, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-sk-text-medium">
                      <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-sk-blue-300" />
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── Bottom Line ──────────────────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-r from-sk-moss-100 to-sk-blue-light p-8">
        <h2
          className="mb-3 text-2xl font-bold text-sk-dark-900"
          style={{ fontFamily: "var(--font-outfit)" }}
        >
          Bottom Line
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>
              $0.48
            </div>
            <div className="mt-1 text-sm text-sk-text">
              analyzed 120 real production photos
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold text-sk-sunrise" style={{ fontFamily: "var(--font-outfit)" }}>
              ~$280
            </div>
            <div className="mt-1 text-sm text-sk-text">
              to build equipment database from 70K existing photos
            </div>
          </div>
          <div className="rounded-xl bg-white p-5 shadow-sm">
            <div className="text-2xl font-bold text-sk-moss-700" style={{ fontFamily: "var(--font-outfit)" }}>
              $0/month
            </div>
            <div className="mt-1 text-sm text-sk-text">
              on-device OCR in mobile app (works offline)
            </div>
          </div>
        </div>
        <p className="mt-6 text-sm text-sk-text-medium">
          The data is there. The technology is proven. The cost is trivial.
          Four of five pilot use cases validated. The equipment database build (70K photos)
          costs less than a team lunch.
        </p>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-6 text-center text-xs text-sk-text-disabled">
        Pilot conducted March 17, 2026 using GPT-4o Vision on Skimmer production photos
      </footer>
    </div>
  );
}
