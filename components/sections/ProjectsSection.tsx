"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import ProjectCard from "@/components/ui/ProjectCard";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

const locationGroups = [
  {
    key: "haiti",
    label: "Haiti & Dominican Republic",
    period: "2024 — Present",
    color: "#FF6B6B",
    org: "Global Care · KOICA-Partner NGO",
    projects: [
      {
        title: "Offline EHR — Rural Maternal Care",
        featured: true,
        role: "Independent · iOS Engineer",
        impact: "300+ expectant mothers · 6 villages · zero connectivity required",
        metrics: [
          { value: "300+", label: "mothers tracked" },
          { value: "6", label: "villages served" },
          { value: "0", label: "signal required" },
        ],
        description:
          "My first night in Haiti, I stayed up building. A nurse showed me how she started every consultation by asking 'What's wrong?' — not because she was careless, but because last month's notes were in a notebook in a different village. That was the moment I knew what to build.",
        highlights: [
          "Offline-first: full patient history available with zero signal — works identically in a concrete clinic with no WiFi",
          "Nurse feedback at 9am → deployed update by 2pm same day, enabled by AI-augmented workflow",
          "Adopted across 6 villages without formal training — nurses learned it in the field",
        ],
        problem:
          "Rural Haitian nurses ran mobile clinics across 6 disconnected villages. Patient records were handwritten cards that got lost, rained on, or left behind. For high-risk pregnancies — where tracking BP trends across visits can be the difference between a flag and a crisis — each visit was starting from zero. There was no internet. There was sometimes no power.",
        bullets: [
          "Built offline-first with CoreData (Apple's local database) — full patient history loads instantly with zero signal, syncs automatically when connection appears",
          "Chose Swift/SwiftUI because nurses already used iPads personally: no new device to learn, only the app",
          "Tracks BP progression, gestational age, fetal heart rate, risk flags, sonography, monthly checklists — the data nurses said they needed, added one field at a time based on their feedback",
          "Key trade-off: CoreData over SQLite for its schema migration tools — critical when adding new vital fields to a live production app mid-deployment",
          "AI-augmented dev cycle (Claude Code + Cursor): nurse feedback at 9am became deployed update by 2pm the same day, cutting iteration cycles ~40%",
          "Deployed via TestFlight across 6 villages — nurses adopted it without formal training",
          "What I'd do differently: build the sync conflict resolution logic earlier; manual reconciliation was painful when two nurses updated the same patient record offline",
        ],
        tech: ["Swift", "SwiftUI", "CoreData", "iOS", "Claude Code"],
        images: [
          { src: "/portfolio-images/ehr-field.JPG", alt: "Hana showing the EHR app to a nurse at a mobile clinic in Haiti", objectPosition: "center 40%" },
          { src: "/portfolio-images/ehr-monthly-checklist.jpeg", alt: "EHR monthly checklist — patient Widline Amucy" },
          { src: "/portfolio-images/ehr-consultation.jpeg", alt: "EHR consultation history view" },
          { src: "/portfolio-images/ehr-sonography.jpeg", alt: "EHR birth plan and sonography data entry" },
        ],
        link: undefined,
        linkLabel: "In active field use (TestFlight)",
      },
      {
        title: "Child Sponsorship Platform",
        role: "Independent · Full-Stack Engineer",
        impact: "50+ children tracked · replaced Excel + WhatsApp entirely",
        metrics: [
          { value: "50+", label: "children tracked" },
          { value: "6h", label: "admin saved weekly" },
        ],
        description:
          "I was at a ministry planning meeting when an admin opened three different WhatsApp chats to answer one question: 'Is this child currently sponsored?' That moment — watching someone scroll through 200 messages to find a yes or no — was the brief. One child had already slipped through the cracks; their sponsorship lapsed without anyone noticing until they missed a school term.",
        highlights: [
          "Real-time funding dashboard: donors see exactly which children need sponsors at a glance",
          "Replaced WhatsApp + Excel + email with one platform — 6+ hrs/week of admin work eliminated",
        ],
        problem:
          "OakTree Ministry tracked 50+ child sponsorships across WhatsApp threads, Excel rows, and memory. No single source of truth meant gaps weren't visible until the damage was done. The admin spent 6+ hours a week reconciling data. Donors had no visibility into who still needed support.",
        bullets: [
          "Chose React/TypeScript for maintainability — the platform needs to survive after I leave, maintained by non-engineers",
          "Real-time dashboard shows funding coverage and gaps at a glance: which children are sponsored, which need sponsors, which are at risk",
          "Individual child profiles with photos, stories, and full sponsorship history — donors see exactly who they're supporting",
          "Iterated the donation flow through 4 rounds of user testing with non-technical stakeholders; removed every step that caused confusion",
          "Deployed on Vercel: zero-downtime, global CDN, no server to maintain — right choice for a small NGO with no IT team",
          "AI-augmented workflow: 40% faster UI delivery compared to previous solo projects without AI tools",
        ],
        tech: ["React", "TypeScript", "TailwindCSS", "Vercel"],
        images: [
          { src: "/portfolio-images/sponsorship-website.png", alt: "OakTree Ministry — Haiti La Gonave project page" },
          { src: "/portfolio-images/sponsorship-payment.png", alt: "Child sponsorship profile and payment flow" },
        ],
        link: "https://oaktree-ministry.vercel.app",
        linkLabel: "View Live Platform",
      },
    ],
  },
  {
    key: "korea",
    label: "Seoul, Korea",
    period: "2022 — 2024",
    color: "#3B82F6",
    org: "Seoul National University Hospital · BCSD Labs, KOREATECH",
    projects: [
      {
        title: "DICOM Anonymization Tool",
        role: "Independent · Research Software Engineer",
        impact: "Hospital-deployed · thousands of MRI/CT files de-identified",
        metrics: [
          { value: "1000s", label: "files processed" },
          { value: "1-click", label: "desktop workflow" },
        ],
        description:
          "I wasn't hired to build this. A researcher mentioned offhand that they were 'pretty sure' their anonymizer was working. I ran one spot-check — comparing the anonymized output against the originals — and found patient names still embedded in manufacturer-specific tags. The data was two days from being shared with three research institutions.",
        highlights: [
          "Found patient identifiers in files that 'standard' tools had already cleared — missed Siemens/GE private tags",
          "Deployed at Seoul National University Hospital, processing thousands of MRI & CT files per batch",
          "One-click Windows app — hospital staff runs it with no technical setup required",
        ],
        problem:
          "Seoul National University Hospital's LAMIS lab needed to share MRI and CT imaging data with research partners. Standard anonymization tools (which strip known header tags) were missing private tags specific to Siemens and GE equipment — tags that still contained patient name fragments. Manual review of thousands of files per batch was both unsustainable and unreliable. The compliance risk was real.",
        bullets: [
          "Reverse-engineered Siemens and GE private tag formats to understand what was being missed — no public documentation existed for most of them",
          "Extended DICOM parsing (the medical imaging file format) to detect and strip non-standard private tags that off-the-shelf tools ignored",
          "Batch engine handles thousands of files per run with a per-batch modification report — researchers can verify exactly what changed before any data leaves the hospital",
          "Key decision: PyQt6 (Python GUI framework) compiled to a standalone Windows executable — hospital staff runs it with one click, no Python environment required",
          "Cross-platform: Mac and Windows, tested against 5 different scanner manufacturer datasets before deployment",
          "Published full technical documentation so the hospital team can maintain and extend it without me",
        ],
        tech: ["Python", "PyQt6", "DICOM (medical imaging format)", "Windows/Mac"],
        images: [
          { src: "/portfolio-images/dicom-app.png", alt: "LAMIS DICOM anonymizer desktop app — batch processing UI" },
          { src: "/portfolio-images/dicom-docs.png", alt: "DICOM Anonymizer technical documentation" },
        ],
        link: "https://hanagertridekim.notion.site/DICOM-Anonymizer-Docs-c2461f6447094cc49db8b73770748a88?pvs=74",
        linkLabel: "View Documentation",
      },
      {
        title: "KOIN — Front-End Architecture Lead",
        role: "Team Lead + Engineer · BCSD Labs (200-engineer student org)",
        impact: "~25% faster delivery cycles · ~30% less duplicated code org-wide",
        metrics: [
          { value: "200", label: "engineers" },
          { value: "25%", label: "faster cycles" },
          { value: "30%", label: "less duplicate code" },
        ],
        description:
          "On my second week at BCSD Labs, I counted 8 separate implementations of a toast notification component across our repos. No shared button. State management scattered across Redux, Recoil, and ad-hoc useState. I was 20, newly made team lead, working with engineers who'd been at the org longer than me. The first thing I had to do was convince them the mess was worth fixing.",
        highlights: [
          "Led front-end architecture for 200 engineers — unified 8 teams under shared component standards",
          "~25% faster delivery cycles, ~30% less duplicated code after migration to shared design system",
          "Built & shipped internal npm package adopted org-wide; automated PR pipeline via GitHub Actions",
        ],
        problem:
          "BCSD Labs ships real production apps to thousands of students at KOREATECH daily — not side projects. With 200 engineers across multiple teams and no shared standards, every team reinvented the same components. Merge conflicts were constant. PR reviews took days. New engineers were onboarded into chaos.",
        bullets: [
          "Chose Zustand over Recoil (both are state management libraries) after benchmarking both: simpler API, no boilerplate, easier for junior engineers to pick up in a day",
          "Built and published an internal npm package (private registry) with shared utilities — once installed, teams stopped re-implementing the same logic",
          "Refactored UI architecture to Compound Components pattern — eliminated ~30% of duplicated front-end code across the org",
          "Set up automated PR pipeline via GitHub Actions + Slack notifications — cut review time from days to hours for common checks",
          "Led sprints, mentored engineers across experience levels, conducted weekly code reviews in an agile workflow",
          "Honest reflection: the migration to Zustand broke production for 2 hours. I learned to stage rollouts, not flip switches.",
        ],
        tech: ["React", "TypeScript", "Zustand (state management)", "React Query", "GitHub Actions"],
        images: [
          { src: "/portfolio-images/koin-service.png", alt: "KOIN Service — campus nearby stores feature" },
        ],
        link: undefined,
        linkLabel: "Private codebase",
      },
    ],
  },
];

function EHRDemoShowcase() {
  return (
    <SectionReveal className="mb-24">
      <div className="relative overflow-hidden rounded-[2rem] border border-white/[0.08] bg-[#101722] px-6 py-10 md:px-12 md:py-14">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_80%_at_78%_45%,rgba(255,107,107,0.12),transparent_62%)]" />
        <div className="absolute left-1/2 top-0 h-full w-px bg-white/[0.04]" />
        <div className="absolute right-16 top-10 hidden h-32 w-32 rounded-full border border-white/[0.06] md:block" />

        <div className="relative grid items-center gap-12 md:grid-cols-[0.78fr_1.22fr]">
          <div>
            <p className="font-code text-xs uppercase tracking-[0.25em] text-haiti mb-5">
              Featured Demo
            </p>
            <h3 className="font-display text-5xl md:text-7xl leading-[0.9] text-white mb-7">
              EHR<br />in the<br />field.
            </h3>
            <p className="max-w-md text-lg leading-relaxed text-text-secondary mb-8">
              The app was designed for nurses moving between villages, not for a
              perfect office network. Tap through a visit, check risk flags, and
              keep patient history available when signal disappears.
            </p>
            <div className="grid grid-cols-3 gap-px max-w-md overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.08] mb-8">
              {[
                ["BP", "trend tracking"],
                ["GA", "gestational age"],
                ["FHR", "fetal heart rate"],
              ].map(([value, label]) => (
                <div key={value} className="bg-bg-card/90 px-4 py-3">
                  <p className="font-display text-2xl leading-none text-haiti">{value}</p>
                  <p className="font-code text-[9px] uppercase tracking-widest text-text-secondary/45 mt-1 leading-tight">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <a
              href="#haiti-projects"
              className="inline-flex items-center gap-2 rounded-xl bg-haiti px-5 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-haiti/90 hover:shadow-lg hover:shadow-haiti/20"
            >
              View EHR case study
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="relative min-h-[520px] md:min-h-[640px]">
            <div className="absolute left-[5%] top-[9%] hidden h-[74%] w-[38%] rotate-[-8deg] rounded-[2rem] border border-white/[0.08] bg-white/[0.03] md:block" />
            <div className="absolute right-[7%] top-[6%] hidden h-[80%] w-[42%] rotate-[9deg] rounded-[2rem] border border-white/[0.08] bg-white/[0.03] md:block" />

            <div className="ehr-phone-float absolute left-1/2 top-6 h-[500px] w-[246px] -translate-x-1/2 md:h-[590px] md:w-[290px]">
              <div
                className="relative h-full w-full rounded-[2.35rem] border border-white/25 bg-[#050914] p-2 shadow-2xl shadow-black/70"
                style={{ transform: "perspective(1100px) rotateY(-22deg) rotateX(8deg) rotateZ(3deg)" }}
              >
                <div className="absolute left-1/2 top-3 z-20 h-2 w-20 -translate-x-1/2 rounded-full bg-black/80" />
                <div className="relative h-full w-full overflow-hidden rounded-[1.85rem] bg-white">
                  <Image
                    src="/portfolio-images/ehr-monthly-checklist.jpeg"
                    alt="EHR app monthly checklist screen inside a 3D phone mockup"
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/20" />
                </div>
                <div className="absolute -right-5 top-1/2 h-32 w-1 -translate-y-1/2 rounded-full bg-haiti/80" />
              </div>
            </div>

            <div className="absolute bottom-9 left-0 hidden max-w-xs rounded-2xl border border-white/[0.08] bg-black/35 p-4 backdrop-blur-md md:block">
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-white/40 mb-2">
                Offline-first
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                Local data first. Sync later. No blank screen when the village has no signal.
              </p>
            </div>

            <div className="absolute bottom-20 right-0 hidden max-w-[13rem] rounded-2xl border border-haiti/20 bg-haiti/10 p-4 backdrop-blur-md md:block">
              <p className="font-code text-[10px] uppercase tracking-[0.2em] text-haiti mb-2">
                Field feedback loop
              </p>
              <p className="text-sm leading-relaxed text-white/70">
                Nurse feedback in the morning, updated TestFlight build by afternoon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionReveal>
  );
}

export default function ProjectsSection() {
  return (
    <section className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-1/2 top-32 h-80 w-[52rem] -translate-x-1/2 rounded-full bg-korea/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-6xl mx-auto">
        <SectionReveal className="mb-20">
          <div className="grid md:grid-cols-[0.82fr_1.18fr] gap-8 md:gap-14 items-end">
            <div>
              <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-3">
                Selected Work
              </p>
              <h2 className="font-display text-5xl md:text-7xl text-text-primary leading-[0.95]">
                Field-tested<br />software.
              </h2>
            </div>
            <div className="md:pb-2">
              <p className="text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
                These are not polished mockups. They are systems built around clinics,
                hospitals, ministries, student teams, and the messy workflows people
                actually use every day.
              </p>
              <div className="mt-6 grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.06] max-w-lg">
                {[
                  ["4", "production projects"],
                  ["3", "countries"],
                  ["1000s", "records handled"],
                ].map(([value, label]) => (
                  <div key={label} className="bg-bg-card/80 px-4 py-3">
                    <p className="font-display text-2xl text-text-primary leading-none">{value}</p>
                    <p className="font-code text-[9px] uppercase tracking-widest text-text-secondary/45 mt-1 leading-tight">
                      {label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </SectionReveal>

        <EHRDemoShowcase />

        <div className="space-y-24">
          {locationGroups.map((group, groupIndex) => (
            <div key={group.key}>
              <SectionReveal className="mb-8">
                <div
                  className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 rounded-2xl border bg-white/[0.02] px-5 py-4"
                  style={{ borderColor: `${group.color}22` }}
                >
                  <MapPin size={18} className="mt-1 flex-shrink-0" style={{ color: group.color }} />
                  <div className="flex-1 min-w-0">
                    <span className="font-display text-3xl text-text-primary">{group.label}</span>
                    <p className="text-xs font-code text-text-secondary mt-1">{group.org}</p>
                  </div>
                  <span
                    className="font-code text-xs flex-shrink-0 rounded-full border px-3 py-1"
                    style={{ color: group.color, borderColor: `${group.color}30`, background: `${group.color}08` }}
                  >
                    {group.period}
                  </span>
                </div>
              </SectionReveal>

              <div className="space-y-10">
                {group.projects.map((project, i) => (
                  <ProjectCard
                    key={project.title}
                    {...project}
                    accentColor={group.color}
                    location={group.label}
                    delay={i * 0.1}
                    featured={"featured" in project ? project.featured : false}
                    index={locationGroups
                      .slice(0, groupIndex)
                      .reduce((count, previous) => count + previous.projects.length, 0) + i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
