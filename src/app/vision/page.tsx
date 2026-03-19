"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu, Wrench, TrendingUp, ShieldCheck, DollarSign, Package,
  Clock, FileText, Zap, Target, BarChart3, Globe, Bot,
  Camera, Layers, AlertTriangle, LineChart, Users, Building2,
  CheckCircle2, CircleDot,
} from "lucide-react";
import { AnimatedCounter } from "@/components/counter";

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 25 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, ease: "easeOut", delay }} className={className}>
      {children}
    </motion.div>
  );
}

/* ── Layer Card ───────────────────────────────────────── */
function LayerCard({ number, title, subtitle, color, items }: {
  number: string; title: string; subtitle: string; color: string;
  items: { icon: React.ElementType; title: string; description: string }[];
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string; cardBorder: string }> = {
    blue: { bg: "bg-sk-blue-100", border: "border-sk-blue-200", text: "text-sk-dark", badge: "bg-sk-dark text-white", cardBorder: "border-l-sk-blue" },
    green: { bg: "bg-sk-moss-100", border: "border-sk-moss-700/20", text: "text-sk-moss-700", badge: "bg-sk-moss-700 text-white", cardBorder: "border-l-sk-moss-700" },
    orange: { bg: "bg-sk-sunrise-100", border: "border-sk-sunrise/20", text: "text-sk-sunrise", badge: "bg-sk-sunrise text-white", cardBorder: "border-l-sk-sunrise" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-sk-orchid text-white", cardBorder: "border-l-sk-orchid" },
    dark: { bg: "bg-sk-navy/5", border: "border-sk-dark-800/20", text: "text-sk-dark-800", badge: "bg-sk-navy text-white", cardBorder: "border-l-sk-navy" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <Reveal>
      <div className={`rounded-2xl border ${c.border} ${c.bg} p-4 sm:p-6`}>
        <div className="mb-4 flex items-center gap-3">
          <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${c.badge}`}>{number}</span>
          <div>
            <h3 className="text-base font-bold text-sk-text sm:text-lg" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>{title}</h3>
            <p className="text-[10px] text-sk-text-medium sm:text-xs">{subtitle}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2 sm:gap-3">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <div className={`rounded-xl border-l-4 ${c.cardBorder} bg-white p-3 shadow-sm transition-all hover:shadow-md sm:p-4`}>
                <div className="flex items-center gap-2">
                  <item.icon className={`h-4 w-4 ${c.text}`} />
                  <span className="text-xs font-bold text-sk-text sm:text-sm">{item.title}</span>
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function VisionPage() {
  return (
    <div className="space-y-8 sm:space-y-12">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-sk-navy px-6 py-10 text-white sm:px-12 sm:py-16">
        <motion.div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-sk-mint/12 blur-3xl" animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 7, repeat: Infinity }} />
        <motion.div className="absolute -bottom-16 -left-16 h-60 w-60 rounded-full bg-sk-sunrise/10 blur-3xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 9, repeat: Infinity, delay: 3 }} />
        <motion.div className="absolute left-1/3 top-1/4 h-40 w-40 rounded-full bg-sk-orchid/8 blur-3xl" animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, delay: 5 }} />

        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1200 50" className="w-full" preserveAspectRatio="none">
            <path d="M0 25 Q300 0 600 25 Q900 50 1200 25 L1200 50 L0 50Z" fill="#FCFCFC" />
          </svg>
        </div>

        <div className="relative z-10">
          <motion.p initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-sk-mint sm:text-sm">
            Product Vision
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
            className="mb-3 text-2xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.03em" }}>
            From 211M Photos to an<br className="hidden sm:block" /> Intelligent Service Platform
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }}
            className="max-w-3xl text-sm leading-relaxed text-white/60 sm:text-lg">
            Every pool service visit generates photos. Every photo contains information.
            Today that information is trapped in JPEG files. The vision: unlock it — turning photos into equipment records, service quality scores, predictive insights, and industry intelligence.
          </motion.p>
        </div>
      </section>

      {/* ── Data Moat ─────────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-4 text-base font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>The Data Moat</h2>
          <p className="mb-5 max-w-3xl text-xs text-sk-text-medium sm:text-sm">
            No competitor has this. 211 million field service photos, growing by 6.3 million per month, from 6,279 companies. The longer we build on this, the harder it is to replicate.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {[
              { value: 211, suffix: "M+", label: "Total photos", sub: "and growing daily" },
              { value: 6.3, suffix: "M", label: "New photos/month", sub: "from active techs" },
              { value: 7.3, suffix: "M", label: "Labeled training data", sub: "from checklist captions" },
              { value: 6279, suffix: "", label: "Companies contributing", sub: "44% of all customers" },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 0.08}>
                <div className="rounded-lg border-l-4 border-l-sk-blue bg-sk-blue-100 p-3 sm:p-4">
                  <div className="text-xl font-bold text-sk-dark sm:text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>
                    <AnimatedCounter end={s.value} decimals={s.value < 10 ? 1 : 0} duration={1500} />{s.suffix}
                  </div>
                  <div className="text-[10px] font-medium text-sk-text sm:text-xs">{s.label}</div>
                  <div className="text-[9px] text-sk-text-disabled sm:text-[10px]">{s.sub}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── 5 Layers ──────────────────────────────────────── */}
      <LayerCard number="1" title="Equipment Intelligence" subtitle="Build equipment profiles from photos techs already take" color="blue" items={[
        { icon: Cpu, title: "Auto-Build Equipment Inventory", description: "Process existing dataplate photos → structured records per service location. Brand, model, serial, age — no manual entry." },
        { icon: Package, title: "Instant Parts Lookup", description: "Know the model → auto-suggest replacement parts, compatible accessories, and supplier links." },
        { icon: Clock, title: "Equipment Age Tracking", description: "Manufacture dates from dataplates → real-time age. \"This pump is 7.2 years old, avg lifespan 8-12 years.\"" },
        { icon: ShieldCheck, title: "Warranty & Compliance", description: "Serial numbers enable warranty lookups. Safety certifications (ASTM, UL) tracked per equipment." },
      ]} />

      <LayerCard number="2" title="Service Quality Scoring" subtitle="Measure and improve service quality from photo documentation" color="green" items={[
        { icon: Camera, title: "Before / After Comparison", description: "AI scores photo pairs per visit. \"Did the pool look better after service?\" Track scores per tech, per company." },
        { icon: ShieldCheck, title: "Compliance Documentation", description: "Verify techs complete every checklist step. \"Tech A documents gate closure 98%. Tech B: 62%.\"" },
        { icon: FileText, title: "Auto-Generated Service Reports", description: "After each visit, auto-generate a homeowner email: \"Here's what we did at your pool today.\"" },
        { icon: Users, title: "Tech Performance Insights", description: "Quality-based routing: assign best techs to most valuable customers based on documentation quality." },
      ]} />

      <LayerCard number="3" title="Predictive Maintenance" subtitle="Track conditions over time — predict problems before they happen" color="orange" items={[
        { icon: LineChart, title: "Filter Pressure Trending", description: "AI reads gauge photos every visit. \"Pressure increased 12→22 PSI over 6 weeks — filter cleaning due.\"" },
        { icon: Target, title: "Water Clarity Degradation", description: "Score pool photos each visit. \"Clarity dropped 4.8→3.2 over 3 visits — potential algae developing.\"" },
        { icon: AlertTriangle, title: "Equipment Condition Tracking", description: "Same pump photographed 12 times over a year. \"Corrosion detected — replacement recommended within 60 days.\"" },
        { icon: Clock, title: "Seasonal Pattern Detection", description: "\"Every October, this pool develops leaf staining.\" Pre-schedule treatments based on historical patterns." },
      ]} />

      <LayerCard number="4" title="Business Intelligence at Scale" subtitle="Aggregate anonymized data across 7,400+ companies" color="purple" items={[
        { icon: Globe, title: "Industry Reports", description: "\"62% of Arizona pools use variable-speed pumps. In Florida, 41%.\" Regional equipment trends, brand market share." },
        { icon: Building2, title: "Manufacturer Partnerships", description: "\"Pentair, we know where 47,000 of your pumps are installed, their age, and which are approaching replacement.\"" },
        { icon: BarChart3, title: "Parts Demand Forecasting", description: "\"Based on equipment age in your area, we predict 23% increase in pump seal kit orders next quarter.\"" },
        { icon: DollarSign, title: "Upsell Campaigns", description: "\"47 of your customers have pumps over 6 years old.\" Auto-generate targeted replacement campaigns." },
      ]} />

      <LayerCard number="5" title="Smart Automation" subtitle="AI triggers actions — not just insights" color="dark" items={[
        { icon: Bot, title: "Auto-Generate Work Orders", description: "Tech photographs cracked chlorinator → AI detects damage → suggests: \"Create repair WO — est. $85 parts + labor.\"" },
        { icon: Wrench, title: "Smart Invoicing", description: "Equipment identified → auto-populate line items with correct part numbers and pricing. No manual lookup." },
        { icon: Zap, title: "Automated Compliance Alerts", description: "\"Gate photo not found for today's stop — reminder sent to tech.\" Enforce standards without micromanaging." },
        { icon: Layers, title: "Inventory Management", description: "\"Based on your customers' equipment, stock: 12 Pentair seal kits, 8 Hayward cartridges, 3 Jandy modules.\"" },
      ]} />

      {/* ── Intelligent Database ───────────────────────────── */}
      <Reveal>
        <section className="rounded-2xl bg-gradient-to-r from-sk-blue-100 via-white to-sk-moss-100 p-5 sm:p-8">
          <h2 className="mb-2 text-lg font-bold text-sk-dark-900 sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>The Intelligent Database</h2>
          <p className="mb-5 max-w-3xl text-xs text-sk-text-medium sm:mb-6 sm:text-sm">Not a static database. A living system that gets smarter every day.</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5 sm:gap-4">
            {[
              { title: "Self-Building", description: "Every new dataplate photo auto-adds an equipment record. No manual entry.", icon: Cpu },
              { title: "Self-Aging", description: "Manufacture dates + current date = real-time age. Equipment ages automatically.", icon: Clock },
              { title: "Self-Linking", description: "Work orders link to equipment via service location. History accumulates.", icon: Layers },
              { title: "Self-Improving", description: "More photos = more training data = better accuracy. The system learns.", icon: TrendingUp },
              { title: "Self-Benchmarking", description: "More companies = better averages. Every customer makes benchmarks more accurate.", icon: BarChart3 },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 0.06}>
                <div className="rounded-xl bg-white p-3 shadow-sm transition-all hover:shadow-md sm:p-4">
                  <item.icon className="mb-2 h-4 w-4 text-sk-dark sm:h-5 sm:w-5" />
                  <div className="text-xs font-bold text-sk-text sm:text-sm">{item.title}</div>
                  <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{item.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Competitive Landscape ─────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-2 text-base font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>Competitive Landscape</h2>
          <p className="mb-5 max-w-3xl text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
            No pool service competitor is doing photo-based equipment intelligence. The closest analog is XOi Technologies in HVAC — they raised $230M proving this thesis in a different vertical.
          </p>

          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">Direct Pool Competitors</h3>
          <div className="mb-5 overflow-x-auto sm:mb-6">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Competitor</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">AI Features</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Photo Intelligence?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "Pool Brain", ai: "Route optimization, AI chlorine dosing (upcoming), Waterguru integration for remote water monitoring.", photo: "No" },
                  { name: "Pooltrac", ai: "Basic — maps, messaging, chemical calculator. Legacy platform with limited modern features.", photo: "No" },
                  { name: "Pay the Pool Man", ai: "Billing & invoicing, route management, GPS tracking, LaMotte SpinTouch integration. Recently launched 2.0 beta.", photo: "No" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-sk-gray-100 transition-colors hover:bg-sk-blue-100/20">
                    <td className="px-3 py-2.5 font-semibold text-sk-text sm:px-4 sm:py-3">{row.name}</td>
                    <td className="px-3 py-2.5 text-[10px] text-sk-text-medium sm:px-4 sm:text-xs">{row.ai}</td>
                    <td className="px-3 py-2.5 sm:px-4"><span className="rounded-full bg-sk-gray-100 px-2.5 py-0.5 text-[10px] font-bold text-sk-text-disabled sm:text-xs">{row.photo}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">New AI-Native Entrants</h3>
          <div className="mb-5 rounded-lg border-l-4 border-l-sk-sunrise bg-sk-sunrise-100 p-3 sm:mb-6 sm:p-4">
            <p className="text-[10px] text-sk-text sm:text-sm">
              New startups like <span className="font-semibold">Pool Proof</span>, <span className="font-semibold">Simple Pool</span>, and <span className="font-semibold">PoolPros.ai</span> are entering with AI-first approaches.
              But they start from <span className="font-semibold">zero data</span>. Skimmer has 10+ years and 211M+ photos. <span className="font-semibold">This dataset cannot be replicated.</span>
            </p>
          </div>

          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">Horizontal Field Service</h3>
          <div className="mb-5 overflow-x-auto sm:mb-6">
            <table className="w-full text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Competitor</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">AI Features</th>
                  <th className="px-3 py-2.5 text-left text-[10px] font-semibold uppercase tracking-wider text-sk-text-disabled sm:px-4 sm:text-xs">Photo Intelligence?</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: "ServiceTitan", ai: "Atlas AI sidekick, Field Pro with equipment recognition, AI pre-job briefs. Publicly traded.", photo: "Partial", photoColor: "bg-amber-100 text-amber-700", detail: "HVAC/plumbing focused, not pool photo OCR at scale" },
                  { name: "Housecall Pro", ai: "CSR AI (phone + chat answering), auto photo upload retries. 45K+ businesses.", photo: "No", photoColor: "bg-sk-gray-100 text-sk-text-disabled", detail: "Photos are documentation only" },
                  { name: "Jobber", ai: "AI pricing, upsell flagging, AI marketing suite, image markup tools.", photo: "No", photoColor: "bg-sk-gray-100 text-sk-text-disabled", detail: "Manual annotation, not AI recognition" },
                ].map((row) => (
                  <tr key={row.name} className="border-b border-sk-gray-100 transition-colors hover:bg-sk-blue-100/20">
                    <td className="px-3 py-2.5 font-semibold text-sk-text sm:px-4 sm:py-3">{row.name}</td>
                    <td className="px-3 py-2.5 text-[10px] text-sk-text-medium sm:px-4 sm:text-xs">{row.ai}</td>
                    <td className="px-3 py-2.5 sm:px-4">
                      <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold sm:text-xs ${row.photoColor}`}>{row.photo}</span>
                      <div className="mt-0.5 text-[9px] text-sk-text-disabled sm:text-[10px]">{row.detail}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h3 className="mb-3 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">The Proven Model — Different Vertical</h3>
          <div className="mb-5 rounded-xl border border-sk-blue-200 bg-sk-blue-100 p-4 sm:mb-6 sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
              <div className="flex-1">
                <div className="text-base font-bold text-sk-dark-900 sm:text-lg" style={{ fontFamily: "var(--font-outfit)" }}>XOi Technologies</div>
                <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">HVAC / Plumbing / Mechanical — $230M+ raised</div>
                <p className="mt-2 text-xs text-sk-text-medium sm:text-sm">
                  XOi proved this exact thesis in HVAC. Smart Dataplate Capture uses OCR to extract make, model, serial from a single photo — then enriches with 100+ data points.
                </p>
                <p className="mt-2 text-xs font-semibold text-sk-dark sm:text-sm">We&apos;re applying the same playbook to pool — with a 10-year head start on data.</p>
              </div>
              <div className="flex-shrink-0 rounded-lg bg-white p-3 text-center shadow-sm sm:p-4">
                <div className="text-xl font-bold text-sk-dark sm:text-2xl" style={{ fontFamily: "var(--font-outfit)" }}>$230M</div>
                <div className="text-[9px] text-sk-text-disabled sm:text-[10px]">raised on this thesis</div>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-sk-navy p-4 text-white sm:p-5">
            <h4 className="text-xs font-bold sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>Key Takeaway</h4>
            <p className="mt-1.5 text-[10px] leading-relaxed text-white/75 sm:text-sm">
              No pool competitor is doing photo-based equipment intelligence. This is a{" "}
              <span className="font-semibold text-sk-mint">first-mover opportunity</span> — and we have 211M+ photos that would take any competitor years to replicate.
            </p>
          </div>
        </section>
      </Reveal>

      {/* ── Roadmap ───────────────────────────────────────── */}
      <Reveal>
        <section className="rounded-xl border border-sk-gray-100 bg-white p-5 shadow-sm sm:p-6">
          <h2 className="mb-5 text-base font-bold text-sk-dark-900 sm:mb-6 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>Roadmap</h2>
          <div className="space-y-3 sm:space-y-4">
            {[
              { phase: "Pilot", what: "Prove AI works on real Skimmer photos — classification, OCR, gauge reading, water clarity", cost: "$0.60", timeline: "Done", done: true },
              { phase: "Equipment Database", what: "Process 70K equipment-captioned photos → structured records for ~100K service locations", cost: "~$280", timeline: "TBD", done: false },
              { phase: "On-Device OCR", what: "On-device OCR in mobile app — every new dataplate auto-builds equipment record. Works offline.", cost: "Eng time", timeline: "TBD", done: false },
              { phase: "Classification Pipeline", what: "Classify all new photos as uploaded — equipment, gauge, damage, pool condition, etc.", cost: "~$1-6K/mo", timeline: "TBD", done: false },
              { phase: "Predictive Models", what: "Train on historical patterns — gauge pressure trends, water clarity, equipment condition", cost: "Eng time", timeline: "TBD", done: false },
              { phase: "Customer Features", what: "Equipment reports, replacement alerts, quality scores, auto-generated homeowner comms", cost: "Eng time", timeline: "TBD", done: false },
              { phase: "Platform Intelligence", what: "Industry reports, manufacturer partnerships, parts forecasting, regional trends", cost: "Biz dev", timeline: "TBD", done: false },
            ].map((item, i) => (
              <Reveal key={item.phase} delay={i * 0.05}>
                <div className={`flex items-center gap-3 rounded-xl border p-3 sm:gap-4 sm:p-4 ${
                  item.done ? "border-sk-moss-700/20 bg-sk-moss-100" : "border-sk-gray-100 bg-white"
                }`}>
                  {item.done ? (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: "spring" }}>
                      <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sk-moss-700" />
                    </motion.div>
                  ) : (
                    <CircleDot className="h-5 w-5 flex-shrink-0 text-sk-text-disabled" />
                  )}
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-xs font-bold text-sk-text sm:text-sm">{item.phase}</span>
                      <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold sm:text-[10px] ${
                        item.done ? "bg-sk-moss-700 text-white" : "bg-sk-gray-100 text-sk-text-disabled"
                      }`}>{item.timeline}</span>
                    </div>
                    <p className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">{item.what}</p>
                  </div>
                  <div className="hidden text-right text-[10px] text-sk-text-disabled sm:block sm:text-xs">{item.cost}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>
      </Reveal>

      {/* ── Why This Matters ──────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl bg-sk-navy p-6 text-white sm:p-10">
          <h2 className="mb-6 text-lg font-bold sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>Why This Matters</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-6">
            {[
              { value: "Zero", label: "new behavior required from techs", sub: "They already take the photos. We just need AI to read them.", accent: "border-t-sk-mint" },
              { value: "211M+", label: "photos no competitor has", sub: "Growing by 6.3M/month. The data moat gets deeper every day.", accent: "border-t-sk-blue" },
              { value: "$0.60", label: "to prove it all works", sub: "14 equipment extractions, 4 pilot use cases, 120 photos analyzed.", accent: "border-t-sk-sunrise" },
            ].map((item, i) => (
              <motion.div key={item.label} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className={`rounded-xl border-t-4 ${item.accent} bg-white/[0.06] p-4 backdrop-blur-sm sm:p-5`}>
                <div className="text-2xl font-bold text-white sm:text-3xl" style={{ fontFamily: "var(--font-outfit)" }}>{item.value}</div>
                <div className="mt-1 text-xs text-white/80 sm:text-sm">{item.label}</div>
                <p className="mt-1.5 text-[10px] text-white/45 sm:text-xs">{item.sub}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </Reveal>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-4 text-center text-[10px] text-sk-text-disabled sm:pt-6 sm:text-xs">
        Skimmer Photo Intelligence — Product Vision, March 2026
      </footer>
    </div>
  );
}
