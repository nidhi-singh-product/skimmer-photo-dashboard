"use client";

import {
  Cpu, Wrench, TrendingUp, ShieldCheck, DollarSign, Package,
  Clock, FileText, Zap, Target, BarChart3, Globe, Bot,
  Camera, Layers, AlertTriangle, LineChart, Users, Building2,
  CheckCircle2, CircleDot,
} from "lucide-react";

function LayerCard({
  number,
  title,
  subtitle,
  color,
  items,
}: {
  number: string;
  title: string;
  subtitle: string;
  color: string;
  items: { icon: React.ElementType; title: string; description: string }[];
}) {
  const colorMap: Record<string, { bg: string; border: string; text: string; badge: string }> = {
    blue: { bg: "bg-sk-blue-light", border: "border-sk-blue-200", text: "text-sk-blue", badge: "bg-sk-blue text-white" },
    green: { bg: "bg-sk-moss-100", border: "border-sk-moss-700/20", text: "text-sk-moss-700", badge: "bg-sk-moss-700 text-white" },
    orange: { bg: "bg-sk-sunrise-100", border: "border-sk-sunrise/20", text: "text-sk-sunrise", badge: "bg-sk-sunrise text-white" },
    purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-sk-orchid text-white" },
    dark: { bg: "bg-sk-dark-900/5", border: "border-sk-dark-800/20", text: "text-sk-dark-800", badge: "bg-sk-dark-800 text-white" },
  };
  const c = colorMap[color] || colorMap.blue;

  return (
    <div className={`rounded-2xl border ${c.border} ${c.bg} p-6`}>
      <div className="mb-4 flex items-center gap-3">
        <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold ${c.badge}`}>
          {number}
        </span>
        <div>
          <h3 className="text-lg font-bold text-sk-text" style={{ fontFamily: "var(--font-outfit)" }}>
            {title}
          </h3>
          <p className="text-xs text-sk-text-medium">{subtitle}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {items.map((item) => (
          <div key={item.title} className="rounded-xl bg-white p-4 shadow-sm">
            <div className="flex items-center gap-2">
              <item.icon className={`h-4 w-4 ${c.text}`} />
              <span className="text-sm font-semibold text-sk-text">{item.title}</span>
            </div>
            <p className="mt-1.5 text-xs leading-relaxed text-sk-text-medium">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function VisionPage() {
  return (
    <div className="space-y-10">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sk-dark-900 via-sk-blue-800 to-sk-orchid px-10 py-12 text-white">
        <div className="absolute -right-20 -top-20 h-80 w-80 rounded-full bg-sk-mint/10 blur-3xl" />
        <div className="absolute -bottom-10 -left-10 h-60 w-60 rounded-full bg-sk-sunrise/10 blur-3xl" />
        <div className="relative">
          <p className="mb-2 text-sm font-medium uppercase tracking-widest text-sk-mint">
            Product Vision
          </p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight" style={{ fontFamily: "var(--font-outfit)" }}>
            From 211M Photos to an Intelligent Service Platform
          </h1>
          <p className="max-w-3xl text-lg text-white/70">
            Every pool service visit generates photos. Every photo contains information.
            Today that information is trapped in JPEG files. The vision is to unlock it —
            turning photos into equipment records, service quality scores, predictive
            insights, and industry intelligence. No new behavior required from techs.
            Just AI reading what they already capture.
          </p>
        </div>
      </section>

      {/* ── The Data Moat ─────────────────────────────────── */}
      <section className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-4 text-xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          The Data Moat
        </h2>
        <p className="mb-5 max-w-3xl text-sm text-sk-text-medium">
          No competitor has this. 211 million field service photos, growing by 6.3 million per month,
          from 6,279 companies across the country. The longer we build on this, the harder it is to replicate.
        </p>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { value: "211M+", label: "Total photos", sub: "and growing daily" },
            { value: "6.3M", label: "New photos/month", sub: "from active field techs" },
            { value: "7.3M", label: "Labeled training data", sub: "from checklist captions" },
            { value: "6,279", label: "Companies contributing", sub: "44% of all customers" },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-sk-blue-light p-4 text-center">
              <div className="text-2xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>{s.value}</div>
              <div className="text-xs font-medium text-sk-text">{s.label}</div>
              <div className="text-[10px] text-sk-text-disabled">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Layer 1 ───────────────────────────────────────── */}
      <LayerCard
        number="1"
        title="Equipment Intelligence"
        subtitle="Build equipment profiles from photos techs already take"
        color="blue"
        items={[
          { icon: Cpu, title: "Auto-Build Equipment Inventory", description: "Process existing dataplate photos → structured records per service location. Brand, model, serial, age — no manual entry needed." },
          { icon: Package, title: "Instant Parts Lookup", description: "Know the model, know the part. Auto-suggest replacement parts, compatible accessories, and supplier links from the equipment record." },
          { icon: Clock, title: "Equipment Age Tracking", description: "Manufacture dates from dataplates → real-time age tracking. \"This pump is 7.2 years old, average lifespan is 8-12 years.\"" },
          { icon: ShieldCheck, title: "Warranty & Compliance", description: "Serial numbers enable warranty lookups. Safety certifications (ASTM, UL) tracked per equipment. \"This cover's certification is from 2003.\"" },
        ]}
      />

      {/* ── Layer 2 ───────────────────────────────────────── */}
      <LayerCard
        number="2"
        title="Service Quality Scoring"
        subtitle="Measure and improve service quality from photo documentation"
        color="green"
        items={[
          { icon: Camera, title: "Before / After Comparison", description: "AI scores photo pairs per visit. \"Did the pool actually look better after service?\" Track improvement scores per tech, per company." },
          { icon: ShieldCheck, title: "Compliance Documentation", description: "Gate closure photos, equipment check photos — verify techs complete every checklist step. \"Tech A documents gate closure 98%. Tech B: 62%.\"" },
          { icon: FileText, title: "Auto-Generated Service Reports", description: "After each visit, auto-generate a homeowner email: \"Here's what we did at your pool today\" — built from photos + chemistry readings." },
          { icon: Users, title: "Tech Performance Insights", description: "Quality-based routing: assign your best techs to your most valuable customers based on documentation quality and service scores." },
        ]}
      />

      {/* ── Layer 3 ───────────────────────────────────────── */}
      <LayerCard
        number="3"
        title="Predictive Maintenance"
        subtitle="Track conditions over time — predict problems before they happen"
        color="orange"
        items={[
          { icon: LineChart, title: "Filter Pressure Trending", description: "AI reads gauge photos every visit. \"Pressure increased from 12 PSI to 22 PSI over 6 weeks — filter cleaning due.\" Alert before the filter clogs." },
          { icon: Target, title: "Water Clarity Degradation", description: "Score pool photos each visit on a 1-5 scale. \"Clarity dropped from 4.8 to 3.2 over 3 visits — potential algae event developing.\"" },
          { icon: AlertTriangle, title: "Equipment Condition Tracking", description: "Same pump photographed 12 times over a year. Visual degradation scoring. \"Corrosion detected on salt cell — replacement recommended within 60 days.\"" },
          { icon: Clock, title: "Seasonal Pattern Detection", description: "\"Every October, this pool develops leaf staining.\" Pre-schedule treatments based on historical photo patterns." },
        ]}
      />

      {/* ── Layer 4 ───────────────────────────────────────── */}
      <LayerCard
        number="4"
        title="Business Intelligence at Scale"
        subtitle="Aggregate anonymized data across 7,400+ companies"
        color="purple"
        items={[
          { icon: Globe, title: "Industry Reports", description: "\"62% of Arizona pools use variable-speed pumps. In Florida, 41%.\" Regional equipment trends, adoption rates, brand market share." },
          { icon: Building2, title: "Manufacturer Partnerships", description: "\"Pentair, we can tell you exactly where 47,000 of your pumps are installed, their average age, and which are approaching replacement.\"" },
          { icon: BarChart3, title: "Parts Demand Forecasting", description: "\"Based on equipment age distribution in your area, we predict a 23% increase in pump seal kit orders next quarter.\" Smart inventory planning." },
          { icon: DollarSign, title: "Upsell Campaigns", description: "\"47 of your customers have pumps over 6 years old.\" Auto-generate targeted replacement campaigns with equipment-specific messaging." },
        ]}
      />

      {/* ── Layer 5 ───────────────────────────────────────── */}
      <LayerCard
        number="5"
        title="Smart Automation"
        subtitle="AI triggers actions — not just insights"
        color="dark"
        items={[
          { icon: Bot, title: "Auto-Generate Work Orders", description: "Tech photographs a cracked chlorinator → AI detects damage → suggests: \"Create repair WO: Replace chlorinator — est. $85 parts + labor.\"" },
          { icon: Wrench, title: "Smart Invoicing", description: "Equipment identified in photo → auto-populate line items with correct part numbers and pricing. No manual lookup needed." },
          { icon: Zap, title: "Automated Compliance Alerts", description: "\"Gate photo not found for today's stop — reminder sent to tech.\" Enforce documentation standards without micromanaging." },
          { icon: Layers, title: "Inventory Management", description: "\"Based on equipment across your customers, stock: 12 Pentair seal kits, 8 Hayward cartridges, 3 Jandy ignition modules.\"" },
        ]}
      />

      {/* ── The Intelligent Database ──────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-r from-sk-blue-light via-white to-sk-moss-100 p-8">
        <h2 className="mb-2 text-2xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          The Intelligent Database
        </h2>
        <p className="mb-6 max-w-3xl text-sm text-sk-text-medium">
          This isn&apos;t a static database. It&apos;s a living system that gets smarter every day.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-5">
          {[
            { title: "Self-Building", description: "Every new dataplate photo auto-adds an equipment record. No manual data entry ever.", icon: Cpu },
            { title: "Self-Aging", description: "Manufacture dates + current date = real-time age tracking. Equipment ages automatically.", icon: Clock },
            { title: "Self-Linking", description: "Work orders link to equipment via service location. Service history accumulates over time.", icon: Layers },
            { title: "Self-Improving", description: "More photos = more training data = better AI accuracy. The system learns from every image.", icon: TrendingUp },
            { title: "Self-Benchmarking", description: "More companies = better industry averages. Every new customer makes benchmarks more accurate.", icon: BarChart3 },
          ].map((item) => (
            <div key={item.title} className="rounded-xl bg-white p-4 shadow-sm">
              <item.icon className="mb-2 h-5 w-5 text-sk-blue" />
              <div className="text-sm font-bold text-sk-text">{item.title}</div>
              <p className="mt-1 text-xs text-sk-text-medium">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-6 text-xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          Roadmap
        </h2>
        <div className="space-y-4">
          {[
            { phase: "Pilot", what: "Prove AI works on real Skimmer photos — classification, OCR, gauge reading, water clarity", cost: "$0.60", timeline: "Done", status: "done" as const },
            { phase: "Equipment Database", what: "Process 70K equipment-captioned photos → build structured equipment records for ~100K service locations", cost: "~$280", timeline: "TBD", status: "tbd" as const },
            { phase: "On-Device OCR", what: "Add on-device OCR to mobile app — every new dataplate photo auto-builds equipment record. Works offline, $0/month.", cost: "Engineering time", timeline: "TBD", status: "tbd" as const },
            { phase: "Classification Pipeline", what: "Classify all new photos as they're uploaded — categorize into equipment, gauge, damage, pool condition, etc.", cost: "~$1-6K/month", timeline: "TBD", status: "tbd" as const },
            { phase: "Predictive Models", what: "Train on historical photo patterns — gauge pressure trends, water clarity scoring, equipment condition tracking", cost: "Engineering time", timeline: "TBD", status: "tbd" as const },
            { phase: "Customer Features", what: "Equipment reports, replacement alerts, service quality scores, auto-generated homeowner communications", cost: "Engineering time", timeline: "TBD", status: "tbd" as const },
            { phase: "Platform Intelligence", what: "Industry reports, manufacturer partnerships, parts forecasting, regional equipment trends", cost: "Business development", timeline: "TBD", status: "tbd" as const },
          ].map((item) => (
            <div key={item.phase} className={`flex items-center gap-4 rounded-xl border p-4 ${
              item.status === "done" ? "border-sk-moss-700/20 bg-sk-moss-100" : "border-sk-gray-100 bg-white"
            }`}>
              {item.status === "done" ? (
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-sk-moss-700" />
              ) : (
                <CircleDot className="h-5 w-5 flex-shrink-0 text-sk-text-disabled" />
              )}
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-sk-text">{item.phase}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    item.status === "done" ? "bg-sk-moss-700 text-white" : "bg-sk-gray-100 text-sk-text-disabled"
                  }`}>
                    {item.timeline}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-sk-text-medium">{item.what}</p>
              </div>
              <div className="text-right text-xs text-sk-text-disabled">{item.cost}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Competitive Landscape ─────────────────────────── */}
      <section className="rounded-xl border border-sk-gray-100 bg-white p-6 shadow-sm">
        <h2 className="mb-2 text-xl font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
          Competitive Landscape
        </h2>
        <p className="mb-6 max-w-3xl text-sm text-sk-text-medium">
          No pool service competitor is doing photo-based equipment intelligence today.
          The closest analog is XOi Technologies in HVAC — they raised $230M proving this exact thesis
          in a different vertical. Here&apos;s where everyone stands.
        </p>

        {/* Direct Pool Competitors */}
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-sk-text-disabled">
          Direct Pool Competitors
        </h3>
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Competitor</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">AI Features</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Photo Intelligence?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Pool Brain", ai: "Route optimization, AI chlorine dosing (upcoming), Waterguru integration for remote water monitoring. Has PoolBrain.ai (industry-tuned LLM for text/knowledge).", photo: "No", photoDetail: "LLM is text-based, not photo analysis" },
                { name: "Pooltrac", ai: "Basic — maps, messaging, chemical calculator. Legacy platform with limited modern features.", photo: "No", photoDetail: "Basic photo notes only" },
                { name: "Pool Founder", ai: "AI route optimization, chemical dosage calculations, invoicing automation.", photo: "No", photoDetail: "No photo AI capabilities" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-sk-gray-100">
                  <td className="px-4 py-3 font-semibold text-sk-text">{row.name}</td>
                  <td className="px-4 py-3 text-xs text-sk-text-medium">{row.ai}</td>
                  <td className="px-4 py-3">
                    <span className="inline-block rounded-full bg-sk-gray-100 px-2.5 py-0.5 text-xs font-bold text-sk-text-disabled">{row.photo}</span>
                    <div className="mt-1 text-[10px] text-sk-text-disabled">{row.photoDetail}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* New Entrants */}
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-sk-text-disabled">
          New AI-Native Entrants
        </h3>
        <div className="mb-6 rounded-lg bg-sk-sunrise-100 p-4">
          <p className="text-sm text-sk-text">
            New startups like <span className="font-semibold">Pool Proof</span>, <span className="font-semibold">Simple Pool</span>, and <span className="font-semibold">PoolPros.ai</span> (launched March 2026) are entering the market with AI-first approaches.
            However, they start from <span className="font-semibold">zero data</span>. Skimmer has been in business for over 10 years and has accumulated
            211M+ photos from 6,279 companies. <span className="font-semibold">This dataset cannot be replicated</span> — it took a decade of pool pros
            capturing real-world service data to build. New entrants would need years of customer adoption just to begin approaching this scale.
          </p>
        </div>

        {/* Horizontal Field Service */}
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-sk-text-disabled">
          Horizontal Field Service Competitors
        </h3>
        <div className="mb-6 overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-sk-gray-100 bg-gray-50/50">
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Competitor</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">AI Features</th>
                <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-sk-text-disabled">Photo Intelligence?</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "ServiceTitan", ai: "Atlas AI sidekick, Field Pro with equipment recognition, AI pre-job briefs, guided troubleshooting. Publicly traded.", photo: "Partial", photoColor: "bg-amber-100 text-amber-700", photoDetail: "Field Pro mentions \"automatic equipment recognition\" but focused on HVAC/plumbing drain cameras — not photo OCR at scale on service photos" },
                { name: "Housecall Pro", ai: "CSR AI (phone + chat answering), auto photo upload retries. 45,000+ businesses.", photo: "No", photoColor: "bg-sk-gray-100 text-sk-text-disabled", photoDetail: "Photos are documentation only — no AI analysis" },
                { name: "Jobber", ai: "AI pricing, upsell flagging, AI marketing suite, image markup tools, Home Depot catalog integration.", photo: "No", photoColor: "bg-sk-gray-100 text-sk-text-disabled", photoDetail: "Image markup is manual annotation, not AI recognition" },
              ].map((row) => (
                <tr key={row.name} className="border-b border-sk-gray-100">
                  <td className="px-4 py-3 font-semibold text-sk-text">{row.name}</td>
                  <td className="px-4 py-3 text-xs text-sk-text-medium">{row.ai}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${row.photoColor}`}>{row.photo}</span>
                    <div className="mt-1 text-[10px] text-sk-text-disabled">{row.photoDetail}</div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* XOi — The Proven Model */}
        <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-sk-text-disabled">
          The Proven Model — Different Vertical
        </h3>
        <div className="rounded-xl border border-sk-blue-200 bg-sk-blue-light p-5">
          <div className="flex items-start gap-4">
            <div className="flex-1">
              <div className="text-lg font-bold text-sk-dark-900" style={{ fontFamily: "var(--font-outfit)" }}>
                XOi Technologies
              </div>
              <div className="mt-0.5 text-xs text-sk-text-medium">HVAC / Plumbing / Mechanical — $230M+ raised</div>
              <p className="mt-3 text-sm text-sk-text-medium">
                XOi proved this exact thesis in HVAC. Their Smart Dataplate Capture uses OCR to extract make, model, and serial
                from a single photo — then enriches with 100+ data points including wiring diagrams, parts specs, and service bulletins.
                They&apos;ve raised $230M on the strength of this approach.
              </p>
              <p className="mt-2 text-sm font-semibold text-sk-blue">
                We&apos;re applying the same playbook to pool — with a 10-year head start on data.
              </p>
            </div>
            <div className="flex-shrink-0 rounded-lg bg-white p-3 shadow-sm text-center">
              <div className="text-2xl font-bold text-sk-blue" style={{ fontFamily: "var(--font-outfit)" }}>$230M</div>
              <div className="text-[10px] text-sk-text-disabled">raised on this thesis</div>
            </div>
          </div>
        </div>

        {/* Key Takeaway */}
        <div className="mt-6 rounded-xl bg-sk-dark-900 p-5 text-white">
          <h4 className="text-sm font-bold" style={{ fontFamily: "var(--font-outfit)" }}>Key Takeaway</h4>
          <p className="mt-2 text-sm text-white/80">
            No pool competitor is doing photo-based equipment intelligence. The horizontal players (ServiceTitan, Jobber, Housecall Pro)
            are investing in AI but not in service photo analysis at scale. XOi validated the approach in HVAC.
            This is a <span className="font-semibold text-sk-mint">first-mover opportunity</span> in pool — and we have the data to make it work.
            With 211M+ photos and 10+ years of history, we have an asset that would take any competitor years to replicate.
            In the age of AI, this is the best time to unlock it.
          </p>
        </div>
      </section>

      {/* ── Bottom Line ───────────────────────────────────── */}
      <section className="rounded-2xl bg-gradient-to-br from-sk-dark-900 to-sk-blue-800 p-8 text-white">
        <h2 className="mb-3 text-2xl font-bold" style={{ fontFamily: "var(--font-outfit)" }}>
          Why This Matters
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div>
            <div className="text-3xl font-bold text-sk-mint" style={{ fontFamily: "var(--font-outfit)" }}>Zero</div>
            <div className="mt-1 text-sm text-white/80">new behavior required from techs</div>
            <p className="mt-2 text-xs text-white/50">They already take the photos. We just need AI to read them.</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-sk-mint" style={{ fontFamily: "var(--font-outfit)" }}>211M+</div>
            <div className="mt-1 text-sm text-white/80">photos no competitor has</div>
            <p className="mt-2 text-xs text-white/50">Growing by 6.3M/month. The data moat gets deeper every day.</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-sk-mint" style={{ fontFamily: "var(--font-outfit)" }}>$0.60</div>
            <div className="mt-1 text-sm text-white/80">to prove it all works</div>
            <p className="mt-2 text-xs text-white/50">14 equipment extractions, 4 pilot use cases validated, 120 photos analyzed.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-sk-gray-100 pt-6 text-center text-xs text-sk-text-disabled">
        Skimmer Photo Intelligence — Product Vision, March 2026
      </footer>
    </div>
  );
}
