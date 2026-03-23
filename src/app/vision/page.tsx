"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cpu, Wrench, TrendingUp, ShieldCheck, DollarSign, Package,
  Clock, FileText, Zap, Target, BarChart3, Globe, Bot,
  Camera, Layers, AlertTriangle, LineChart, Users, Building2,
  CheckCircle2, CircleDot, Video, Volume2, ArrowRight, Scan,
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
            We&apos;ve proven the AI works, shown what it extracts, and demonstrated it on real companies.
            Here&apos;s the full product strategy — from equipment profiles today to an intelligent service platform tomorrow.
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

      {/* ── Video Intelligence ─────────────────────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl border border-sk-gray-100 bg-white shadow-sm">
          {/* Header */}
          <div className="border-b border-sk-gray-100 bg-gradient-to-r from-sk-orchid/5 to-sk-blue-100 p-5 sm:p-6">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-orchid text-white">
                <Video className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
                  Beyond Photos: Video Intelligence
                </h2>
                <p className="text-[10px] text-sk-text-medium sm:text-xs">The same AI pipeline extends to video — with even richer data</p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-6">
            <p className="mb-5 max-w-3xl text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
              We&apos;re starting with photos because we have 211M+ of them. But video captures what photos can&apos;t —
              motion, sound, sequence, and time. With video uploads coming to mobile quotes, every new video becomes an AI asset.
            </p>

            {/* Photo vs Video comparison */}
            <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="rounded-xl border-l-4 border-l-sk-blue bg-sk-blue-100 p-4">
                <div className="flex items-center gap-2">
                  <Camera className="h-4 w-4 text-sk-dark" />
                  <span className="text-sm font-bold text-sk-dark" style={{ fontFamily: "var(--font-outfit)" }}>Photo</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Captures a single moment",
                    "~$0.01 per analysis",
                    "~300KB storage per photo",
                    "What it is: brand, model, serial",
                    "What it looks like: condition, damage",
                    "211M+ assets ready today",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[10px] text-sk-text-medium sm:text-xs">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-sk-dark" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border-l-4 border-l-sk-orchid bg-purple-50 p-4">
                <div className="flex items-center gap-2">
                  <Video className="h-4 w-4 text-sk-orchid" />
                  <span className="text-sm font-bold text-sk-orchid" style={{ fontFamily: "var(--font-outfit)" }}>Video</span>
                  <span className="rounded-full bg-sk-orchid/10 px-2 py-0.5 text-[9px] font-bold text-sk-orchid">Coming Soon</span>
                </div>
                <ul className="mt-3 space-y-1.5">
                  {[
                    "Captures motion, sound, and time",
                    "~$0.15–0.30 per analysis (30 sec)",
                    "~15–50MB storage per video",
                    "How it runs: vibration, noise, flow",
                    "How it changes: leak progression, clarity",
                    "New asset class starting with mobile quotes",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-[10px] text-sk-text-medium sm:text-xs">
                      <span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-sk-orchid" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Video-only use cases */}
            <h3 className="mb-3 text-xs font-bold uppercase tracking-wider text-sk-text-disabled sm:text-sm">
              What Video Unlocks That Photos Can&apos;t
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              {[
                {
                  icon: Volume2,
                  title: "Audio Diagnostics",
                  description: "A 15-second video of a pump running reveals bearing whine, unusual vibration, or cavitation that no photo can capture. \"This pump sounds abnormal — recommend inspection.\"",
                  accent: "border-l-sk-orchid",
                },
                {
                  icon: Scan,
                  title: "Equipment Pad Walkthrough",
                  description: "One 30-second walk-around video captures every piece of equipment on the pad. Today that takes 5-8 individual photos. Video is more efficient for the tech AND more complete for AI.",
                  accent: "border-l-sk-blue",
                },
                {
                  icon: LineChart,
                  title: "Leak Flow Analysis",
                  description: "A photo shows a wet spot. Video shows where the water is coming from, the flow rate, and whether it's intermittent. Much easier to diagnose remotely without a return visit.",
                  accent: "border-l-sk-sunrise",
                },
                {
                  icon: Target,
                  title: "Water Feature Verification",
                  description: "\"Is the waterfall running correctly?\" can't be answered by a photo. A 10-second video instantly shows if jets, fountains, or waterfalls are operating normally.",
                  accent: "border-l-sk-moss-700",
                },
              ].map((item, i) => (
                <Reveal key={item.title} delay={i * 0.06}>
                  <div className={`rounded-xl border-l-4 ${item.accent} bg-white p-3 shadow-sm transition-all hover:shadow-md sm:p-4`}>
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-md bg-sk-blue-100">
                        <item.icon className="h-3.5 w-3.5 text-sk-dark" />
                      </div>
                      <span className="text-xs font-bold text-sk-text sm:text-sm">{item.title}</span>
                    </div>
                    <p className="mt-2 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">{item.description}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Connection to mobile quotes */}
            <div className="mt-5 flex items-start gap-3 rounded-xl bg-sk-navy/5 p-4 sm:mt-6">
              <ArrowRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-sk-dark" />
              <div>
                <div className="text-xs font-bold text-sk-dark sm:text-sm">The connection: Mobile Quotes Video Upload</div>
                <p className="mt-1 text-[10px] leading-relaxed text-sk-text-medium sm:text-xs">
                  We&apos;re currently building video upload support for mobile quotes. Once live, every video a tech records becomes
                  an AI asset — the same pipeline that processes photos can extract frames from video, analyze audio, and generate
                  richer insights than any single photo. The photo intelligence infrastructure we&apos;re building today is the foundation for video intelligence tomorrow.
                </p>
              </div>
            </div>
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
              { phase: "Pilot", what: "Validated AI on 120 production photos — water clarity 100%, gauge reading 74%, equipment brand 100%, classification 58%. Core finding: AI accuracy is high when photo contains the right signal.", cost: "$0.72", timeline: "Done", done: true },
              { phase: "Equipment Database", what: "Process 70K equipment-captioned photos → structured records for ~100K service locations. Pilot proved 100% brand extraction on readable dataplates.", cost: "~$280", timeline: "TBD", done: false },
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

      {/* ── 3-Stage Equipment Rollout ──────────────────────── */}
      <Reveal>
        <section>
          <h2 className="mb-2 text-lg font-bold text-sk-dark-900 sm:text-2xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
            Equipment Intelligence: 3-Stage Rollout
          </h2>
          <p className="mb-5 text-xs text-sk-text-medium sm:mb-6 sm:text-sm">
            The equipment database doesn&apos;t ship all at once. Each stage adds customer value incrementally.
          </p>
          <div className="space-y-5 sm:space-y-6">
            {/* Stage 1 */}
            <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 border-b border-sk-gray-100 bg-sk-blue-100 px-5 py-3 sm:px-6 sm:py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-dark text-sm font-bold text-white">1</div>
                <div><h3 className="text-sm font-bold text-sk-dark-900 sm:text-base" style={{ fontFamily: "var(--font-outfit)" }}>Build the Equipment Database</h3><p className="text-[10px] text-sk-text-medium sm:text-xs">Internal only &middot; ~$280 &middot; No product changes needed</p></div>
                <span className="ml-auto rounded-full bg-sk-blue px-3 py-1 text-[10px] font-bold text-white sm:text-xs">Next Step</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-4 text-xs text-sk-text-medium sm:text-sm">Process 70K equipment-captioned photos through AI OCR. The output is a structured database table — brand, model, serial, manufacture date — linked to service locations. This is <span className="font-semibold text-sk-text">the foundation everything else builds on.</span></p>
                <div className="mb-4 overflow-hidden rounded-lg border border-gray-300 shadow-sm">
                  <div className="flex items-center gap-2 border-b border-gray-300 bg-[#2d2d2d] px-3 py-1.5"><div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-400" /><div className="h-2 w-2 rounded-full bg-yellow-400" /><div className="h-2 w-2 rounded-full bg-green-400" /></div><span className="text-[9px] text-gray-400 sm:text-[10px]">skimmer-prod_db — Query Results</span></div>
                  <div className="border-b border-gray-700 bg-[#1e1e1e] px-4 py-2"><span className="font-mono text-[10px] sm:text-xs"><span className="text-[#569cd6]">SELECT</span> <span className="text-[#9cdcfe]">*</span> <span className="text-[#569cd6]">FROM</span> <span className="text-[#4ec9b0]">EquipmentRecords</span> <span className="text-[#569cd6]">WHERE</span> <span className="text-[#9cdcfe]">CompanyId</span> <span className="text-[#d4d4d4]">=</span> <span className="text-[#ce9178]">&apos;4953e493...&apos;</span></span></div>
                  <div className="overflow-x-auto bg-[#1e1e1e]">
                    <table className="w-full font-mono text-[10px] sm:text-xs">
                      <thead><tr className="border-b border-gray-700 bg-[#252526] text-left">{["ServiceLocationId","Brand","Model","Serial","Type","MfgDate","Confidence"].map(h => (<th key={h} className="px-3 py-1.5 font-semibold text-[#569cd6]">{h}</th>))}</tr></thead>
                      <tbody>{[{loc:"SL-84721",brand:"Jandy",model:"VSPHP270DV2A",serial:"—",type:"VS Pump",date:"NULL",conf:"0.95"},{loc:"SL-84721",brand:"Hayward",model:"T-CELL-940",serial:"2231124186",type:"Salt Cell",date:"NULL",conf:"0.85"},{loc:"SL-91203",brand:"Jandy",model:"JXI400NN",serial:"MTE C02 0503...",type:"Gas Heater",date:"NULL",conf:"0.99"},{loc:"SL-55089",brand:"Watkins",model:"Rhythm Pearl",serial:"RHY1R3T29",type:"Hot Tub",date:"2012-11-17",conf:"0.95"},{loc:"SL-72334",brand:"Century",model:"M48AB4A34A04",serial:"S042120004844",type:"Pump Motor",date:"NULL",conf:"0.95"}].map((r,i) => (<tr key={i} className={`border-t border-gray-800 ${i%2===0?"bg-[#1e1e1e]":"bg-[#252526]"}`}><td className="px-3 py-1.5 text-[#9cdcfe]">{r.loc}</td><td className="px-3 py-1.5 font-semibold text-[#dcdcaa]">{r.brand}</td><td className="px-3 py-1.5 text-[#d4d4d4]">{r.model}</td><td className="px-3 py-1.5 text-[#808080]">{r.serial}</td><td className="px-3 py-1.5 text-[#ce9178]">{r.type}</td><td className="px-3 py-1.5 text-[#808080]">{r.date}</td><td className="px-3 py-1.5"><span className={`rounded px-1.5 py-0.5 text-[9px] font-bold ${parseFloat(r.conf)>=0.9?"bg-[#2d4a2d] text-[#6a9955]":"bg-[#4a3d2d] text-[#d7ba7d]"}`}>{r.conf}</span></td></tr>))}</tbody>
                    </table>
                  </div>
                  <div className="flex items-center justify-between border-t border-gray-300 bg-[#2d2d2d] px-3 py-1.5 text-[9px] text-gray-400 sm:text-[10px]"><span>5 rows returned (0.023 sec)</span><span>Projected: ~19,000–35,000 records from 70K photos</span></div>
                </div>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">{[{val:"70K",lbl:"equipment photos to process"},{val:"19-35K",lbl:"equipment records projected"},{val:"~100K",lbl:"service locations covered"}].map(s => (<div key={s.val} className="rounded-lg bg-sk-blue-100 p-3 text-center"><div className="text-lg font-bold text-sk-dark" style={{fontFamily:"var(--font-outfit)"}}>{s.val}</div><div className="text-[10px] text-sk-text-medium sm:text-xs">{s.lbl}</div></div>))}</div>
              </div>
            </div>
            {/* Stage 2 */}
            <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 border-b border-sk-gray-100 bg-sk-moss-100 px-5 py-3 sm:px-6 sm:py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-moss-700 text-sm font-bold text-white">2</div>
                <div><h3 className="text-sm font-bold text-sk-dark-900 sm:text-base" style={{fontFamily:"var(--font-outfit)"}}>Admin Equipment View (Web App)</h3><p className="text-[10px] text-sk-text-medium sm:text-xs">Customer-facing &middot; Engineering required &middot; Admins see equipment per customer</p></div>
                <span className="ml-auto rounded-full bg-sk-moss-700/10 px-3 py-1 text-[10px] font-bold text-sk-moss-700 sm:text-xs">Future</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-4 text-xs text-sk-text-medium sm:text-sm">Surface the database where admins already work — the Skimmer web app. A new &ldquo;Equipment&rdquo; section shows auto-populated profiles per customer, filterable and searchable.</p>
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                  <div><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">Today: No equipment visibility</div><div className="overflow-hidden rounded-lg border-2 border-red-200 shadow-sm">{/* eslint-disable-next-line @next/next/no-img-element */}<img src="/skimmer-customers.png" alt="Current Skimmer" className="w-full" loading="lazy" /><div className="bg-red-50 px-3 py-2"><p className="text-[10px] text-red-600 sm:text-xs">No equipment section. Admins search through work order photos or call the tech.</p></div></div></div>
                  <div><div className="mb-2 text-[10px] font-bold uppercase tracking-wider text-sk-text-disabled sm:text-xs">Future: Equipment auto-populated</div><div className="overflow-hidden rounded-lg border-2 border-sk-moss-700/30 bg-white shadow-sm"><div className="flex items-center gap-1.5 border-b border-gray-200 bg-gray-100 px-3 py-1.5"><div className="flex gap-1"><div className="h-2 w-2 rounded-full bg-red-400" /><div className="h-2 w-2 rounded-full bg-yellow-400" /><div className="h-2 w-2 rounded-full bg-green-400" /></div><div className="ml-2 flex-1 rounded bg-white px-2 py-0.5 text-[8px] text-gray-400 sm:text-[9px]">app.getskimmer.com/Equipment</div></div><div className="flex" style={{minHeight:"300px"}}><div className="w-32 flex-shrink-0 sm:w-36" style={{background:"linear-gradient(180deg,#3a8fd4 0%,#2a6496 100%)"}}><div className="border-b border-white/10 px-3 py-2"><div className="text-[10px] font-bold tracking-wide text-white sm:text-xs">SKIMMER</div></div><div className="px-1.5 py-1 text-[8px] sm:text-[9px]">{["Dashboard","Customers","Schedule","Routes","Work Orders","Quotes"].map(n=>(<div key={n} className="rounded px-2 py-1 text-white/60">{n}</div>))}<div className="mt-0.5 rounded bg-white/20 px-2 py-1 font-bold text-white">Equipment</div>{["Jobs","Billing","Reports","Settings"].map(n=>(<div key={n} className="rounded px-2 py-1 text-white/60">{n}</div>))}</div></div><div className="flex-1 bg-[#f5f7fa]"><div className="flex items-center justify-between border-b border-gray-200 bg-white px-3 py-1.5 sm:px-4"><span className="text-[9px] text-gray-500 sm:text-[10px]">☰ nidhi admin</span><div className="flex gap-2 text-[8px] text-gray-400 sm:text-[9px]"><span>Earn $150</span><span>Support</span><span>Log out</span></div></div><div className="px-3 py-2 sm:px-4 sm:py-3"><div className="mb-2 flex items-center justify-between"><div className="text-[10px] font-bold text-gray-800 sm:text-xs">Equipment (4)</div><div className="rounded bg-[#5cb85c] px-2 py-0.5 text-[8px] font-bold text-white sm:text-[9px]">+ Add Equipment</div></div><div className="mb-2 flex gap-2"><div className="flex-1 rounded border border-gray-300 bg-white px-2 py-1 text-[8px] text-gray-400 sm:text-[9px]">Search equipment...</div><div className="rounded border border-gray-300 bg-white px-2 py-1 text-[8px] text-gray-600 sm:text-[9px]">Customer: <span className="font-bold">Barry Allen</span> ▾</div><div className="rounded border border-gray-300 bg-white px-2 py-1 text-[8px] text-gray-600 sm:text-[9px]">All Types ▾</div></div><div className="overflow-hidden rounded border border-gray-200 bg-white"><table className="w-full text-[8px] sm:text-[9px]"><thead><tr className="border-b border-gray-200 bg-gray-50">{["Equipment","Model","Age","Status","Action"].map(h=>(<th key={h} className="px-2 py-1.5 text-left font-semibold text-gray-500">{h}</th>))}</tr></thead><tbody>{[{name:"Pentair VS Pump",model:"IntelliFlo VSF",age:"5.0 yr",status:"Good",sc:"bg-green-100 text-green-700"},{name:"Hayward DE Filter",model:"ProGrid DE6020",age:"6.8 yr",status:"Aging",sc:"bg-amber-100 text-amber-700"},{name:"Jandy Gas Heater",model:"JXi 400K BTU",age:"6.2 yr",status:"Replace Soon",sc:"bg-red-100 text-red-700"},{name:"Hayward Salt Cell",model:"T-CELL-940",age:"4.0 yr",status:"Aging",sc:"bg-amber-100 text-amber-700"}].map((eq,i)=>(<tr key={i} className="border-b border-gray-100 last:border-0"><td className="px-2 py-1.5 font-bold text-gray-800">{eq.name}</td><td className="px-2 py-1.5 font-mono text-gray-600">{eq.model}</td><td className="px-2 py-1.5 text-gray-600">{eq.age}</td><td className="px-2 py-1.5"><span className={`rounded px-1.5 py-0.5 text-[7px] font-bold sm:text-[8px] ${eq.sc}`}>{eq.status}</span></td><td className="px-2 py-1.5 text-gray-400">✏️ 🗑</td></tr>))}</tbody></table></div><div className="mt-1.5 text-[7px] text-gray-400 sm:text-[8px]">Auto-populated from photos via AI OCR</div></div></div></div><div className="bg-sk-moss-100 px-3 py-2"><p className="text-[10px] text-sk-moss-700 sm:text-xs">New &ldquo;Equipment&rdquo; in sidebar. Filter by customer. No manual entry.</p></div></div></div>
                </div>
              </div>
            </div>
            {/* Stage 3 */}
            <div className="overflow-hidden rounded-xl border border-sk-gray-100 bg-white shadow-sm">
              <div className="flex flex-wrap items-center gap-3 border-b border-sk-gray-100 bg-sk-sunrise-100 px-5 py-3 sm:px-6 sm:py-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sk-sunrise text-sm font-bold text-white">3</div>
                <div><h3 className="text-sm font-bold text-sk-dark-900 sm:text-base" style={{fontFamily:"var(--font-outfit)"}}>Mobile On-Device OCR</h3><p className="text-[10px] text-sk-text-medium sm:text-xs">Field tech value &middot; Q3 2026 &middot; $0/month &middot; Works offline</p></div>
                <span className="ml-auto rounded-full bg-sk-sunrise/10 px-3 py-1 text-[10px] font-bold text-sk-sunrise sm:text-xs">Q3 2026</span>
              </div>
              <div className="p-5 sm:p-6">
                <p className="mb-4 text-xs text-sk-text-medium sm:text-sm">Tech points their phone at a dataplate, and the app <span className="font-semibold text-sk-text">instantly reads brand, model, and serial</span>. On-device (Apple Vision / Google ML Kit) — free, offline.</p>
                <div className="flex justify-center"><div className="grid w-full max-w-2xl grid-cols-3 gap-3 sm:gap-4">
                  <Reveal delay={0.1}><div><div className="overflow-hidden rounded-2xl bg-sk-dark-900 shadow-lg" style={{aspectRatio:"9/16",maxHeight:"240px"}}><div className="flex items-center justify-center border-b border-white/10 py-1.5"><div className="h-1 w-8 rounded-full bg-white/20" /></div><div className="flex flex-col items-center justify-center px-3 py-6 text-center"><div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-sk-blue/20 text-2xl">📷</div><div className="text-[10px] font-bold text-white sm:text-xs">Scan Equipment</div><div className="mt-1 text-[8px] text-white/40 sm:text-[9px]">Point at dataplate</div></div></div><div className="mt-2 text-center"><div className="text-[10px] font-bold text-sk-text sm:text-xs">Tech opens camera</div></div></div></Reveal>
                  <Reveal delay={0.2}><div><div className="overflow-hidden rounded-2xl bg-sk-dark-900 shadow-lg" style={{aspectRatio:"9/16",maxHeight:"240px"}}><div className="flex items-center justify-center border-b border-white/10 py-1.5"><div className="h-1 w-8 rounded-full bg-white/20" /></div><div className="space-y-1.5 px-2 py-4 sm:px-3">{[{l:"Brand",v:"Pentair"},{l:"Model",v:"IntelliFlo VSF"},{l:"Serial",v:"PP2024-VS-00847"}].map(f=>(<div key={f.l} className="rounded bg-sk-moss-700/20 px-2 py-1"><div className="text-[8px] text-white/50">{f.l}</div><div className="text-[10px] font-bold text-sk-moss sm:text-xs">{f.v}</div></div>))}</div></div><div className="mt-2 text-center"><div className="text-[10px] font-bold text-sk-text sm:text-xs">OCR reads instantly</div></div></div></Reveal>
                  <Reveal delay={0.3}><div><div className="overflow-hidden rounded-2xl bg-sk-dark-900 shadow-lg" style={{aspectRatio:"9/16",maxHeight:"240px"}}><div className="flex items-center justify-center border-b border-white/10 py-1.5"><div className="h-1 w-8 rounded-full bg-white/20" /></div><div className="flex flex-col items-center justify-center px-3 py-6 text-center"><div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-sk-moss-700 text-xl text-white">✓</div><div className="text-[10px] font-bold text-white sm:text-xs">Equipment Saved</div><div className="mt-1 text-[8px] text-white/40 sm:text-[9px]">Linked to SL-84721</div></div></div><div className="mt-2 text-center"><div className="text-[10px] font-bold text-sk-text sm:text-xs">Record saved</div></div></div></Reveal>
                </div></div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      {/* ── Connecting to Equipment Management ─────────────── */}
      <Reveal>
        <section className="overflow-hidden rounded-2xl border border-sk-blue-200 bg-white shadow-sm">
          <div className="border-b border-sk-blue-200 bg-gradient-to-r from-sk-blue-100 to-sk-mint-100 px-5 py-4 sm:px-8 sm:py-5">
            <h2 className="text-base font-bold text-sk-dark-900 sm:text-xl" style={{ fontFamily: "var(--font-outfit)", letterSpacing: "-0.02em" }}>
              How This Connects to Equipment Management
            </h2>
            <p className="mt-1 text-[10px] text-sk-text-medium sm:text-xs">
              Two initiatives building the same capability from opposite directions — together, they&apos;re significantly more powerful than either alone.
            </p>
          </div>

          <div className="p-5 sm:p-8">
            {/* The two halves */}
            <p className="mb-5 text-xs leading-relaxed text-sk-text sm:text-sm">
              The Equipment Management initiative is building a <span className="font-semibold">structured equipment record</span> — a rich data model with status tracking (Active, Out of Service, Under Repair, Replaced), condition monitoring (Good, Fair, Poor, Critical), warranty lifecycle management with auto-calculated expirations, document uploads, and service history linking. This gives Skimmer the <span className="font-semibold">container</span> — the schema, the UI, the workflows.
            </p>
            <p className="mb-5 text-xs leading-relaxed text-sk-text sm:text-sm">
              Photo Intelligence is building the <span className="font-semibold">data pipeline</span> — automated extraction of brand, model, serial, and manufacture dates from photos techs already take. This gives Skimmer the <span className="font-semibold">data</span> to fill that container, at scale, without manual entry.
            </p>

            {/* Side by side comparison */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
              <div className="rounded-xl border-l-4 border-l-sk-blue bg-sk-blue-100 p-4">
                <div className="text-xs font-bold text-sk-dark sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>Equipment Management</div>
                <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">Builds the container</div>
                <ul className="mt-2.5 space-y-1 text-[10px] text-sk-text-medium sm:text-xs">
                  {["Data model: status, condition, warranty, lifecycle","UI: web accordion + mobile tab bar","Warranty auto-calculation (start date + duration)","6 status values, 4 condition values","Document uploads, service history linking"].map(t => (
                    <li key={t} className="flex items-start gap-1.5"><span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-sk-dark" />{t}</li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border-l-4 border-l-sk-moss-700 bg-sk-moss-100 p-4">
                <div className="text-xs font-bold text-sk-dark sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>Photo Intelligence</div>
                <div className="mt-0.5 text-[10px] text-sk-text-medium sm:text-xs">Fills the container</div>
                <ul className="mt-2.5 space-y-1 text-[10px] text-sk-text-medium sm:text-xs">
                  {["AI extracts brand, model, serial from existing photos","100% brand accuracy on readable dataplates","70K historical photos → 19-35K pre-populated records","On-device OCR: every new photo auto-builds records","AI-assisted condition assessment from photo analysis"].map(t => (
                    <li key={t} className="flex items-start gap-1.5"><span className="mt-1 h-1 w-1 flex-shrink-0 rounded-full bg-sk-moss-700" />{t}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* The cold start problem */}
            <div className="mb-5 rounded-xl border-l-4 border-l-sk-sunrise bg-sk-sunrise-100 p-4 sm:p-5">
              <h3 className="text-xs font-bold text-sk-sunrise sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>The Cold Start Problem</h3>
              <p className="mt-2 text-[10px] leading-relaxed text-sk-text sm:text-xs">
                Equipment Management assumes office admins will manually create equipment records — typing brand, model, serial, install dates, and warranty terms for every piece of equipment at every customer location. A company with 500 service locations and 3-4 pieces of equipment each means <span className="font-semibold">1,500-2,000 records to create by hand.</span> Realistically, most companies won&apos;t do this. The feature ships, adoption stays low, and the structured data remains mostly empty.
              </p>
              <p className="mt-2 text-[10px] leading-relaxed text-sk-text sm:text-xs">
                <span className="font-semibold">Photo Intelligence solves this.</span> Instead of starting with empty records, AI pre-populates 19,000-35,000 equipment records from photos techs have already taken. When an admin opens a customer&apos;s location for the first time, <span className="font-semibold">the equipment is already there.</span> Their job goes from &ldquo;create from scratch&rdquo; to &ldquo;verify and add warranty details&rdquo; — a 5-minute task instead of a 20-minute task.
              </p>
            </div>

            {/* Together > apart */}
            <div className="rounded-xl bg-sk-navy p-4 text-white sm:p-5">
              <h4 className="text-xs font-bold sm:text-sm" style={{ fontFamily: "var(--font-outfit)" }}>Together &gt; Apart</h4>
              <p className="mt-2 text-[10px] leading-relaxed text-white/75 sm:text-sm">
                Without Photo Intelligence, Equipment Management is a manual data entry tool — slow adoption, incomplete data. Without Equipment Management, Photo Intelligence has data but no home in the product — internal-only value.{" "}
                <span className="font-semibold text-sk-mint">Together: AI pre-populates the equipment records, admins verify and enrich with warranty details, the system gets smarter with every new photo.</span>{" "}
                The data model provides the structure. The AI pipeline provides the data. Neither initiative needs to change scope — they just need to connect.
              </p>
            </div>
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
              { value: "$0.72", label: "to prove it all works", sub: "4 pilot use cases, 120 photos analyzed — the AI works when it can see what it needs.", accent: "border-t-sk-sunrise" },
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
