"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { Code2, Languages, Sword, MapPin, Music, School, Waves } from "lucide-react";

const langTags = [
  { label: "Korean", sub: "Native", color: "#3B82F6" },
  { label: "English", sub: "Professional", color: "#10B981" },
  { label: "Haitian Creole", sub: "Elementary", color: "#FF6B6B" },
];

const cards = [
  {
    icon: MapPin,
    iconBg: "bg-haiti/10",
    iconColor: "text-haiti",
    title: "Currently",
    content: <p className="text-text-secondary text-sm">Dominican Republic</p>,
  },
  {
    icon: Code2,
    iconBg: "bg-usa/10",
    iconColor: "text-usa",
    title: "Gordon College",
    content: (
      <p className="text-text-secondary text-sm leading-relaxed">
        Incoming B.S. Computer Science student, August 2026.
        Bringing field-tested healthcare software experience into formal CS study.
      </p>
    ),
  },
  {
    icon: Sword,
    iconBg: "bg-korea/10",
    iconColor: "text-korea",
    title: "Hapkido",
    content: (
      <p className="text-text-secondary text-sm leading-relaxed">
        10+ years · Assistant Instructor · Seoul national team
        (Philippines, Cambodia 2014–2023).
        Taught me precision, how to teach, and how to stay calm under pressure.
      </p>
    ),
  },
  {
    icon: School,
    iconBg: "bg-haiti/10",
    iconColor: "text-haiti",
    title: "Teaching in Haiti",
    content: (
      <p className="text-text-secondary text-sm leading-relaxed">
        Taught Taekwondo to elementary school children in Haiti for a year.
        It shaped how I build: show, repeat, listen, adjust — especially when
        language and context are different.
      </p>
    ),
  },
  {
    icon: Music,
    iconBg: "bg-usa/10",
    iconColor: "text-usa",
    title: "Music",
    content: (
      <p className="text-text-secondary text-sm leading-relaxed">
        10+ years of piano, plus acoustic guitar when I need a quieter kind of
        debugging. Reading music and reading code share more than people think:
        structure, timing, and knowing when to improvise.
      </p>
    ),
  },
  {
    icon: Waves,
    iconBg: "bg-korea/10",
    iconColor: "text-korea",
    title: "Ocean Person",
    content: (
      <p className="text-text-secondary text-sm leading-relaxed">
        I prefer the sea to mountains and love ocean swimming. It is where I
        reset after long builds — steady breathing, open water, no shortcuts.
      </p>
    ),
  },
  {
    icon: Languages,
    iconBg: "bg-usa/10",
    iconColor: "text-usa",
    title: "Languages",
    content: (
      <div className="flex flex-wrap gap-2 mt-1">
        {langTags.map((t) => (
          <span
            key={t.label}
            className="inline-flex items-center gap-1 text-xs font-code px-2.5 py-1 rounded-full border"
            style={{ color: t.color, borderColor: `${t.color}30`, background: `${t.color}10` }}
          >
            {t.label}
            <span className="opacity-60">· {t.sub}</span>
          </span>
        ))}
      </div>
    ),
  },
  {
    icon: Code2,
    iconBg: "bg-korea/10",
    iconColor: "text-korea",
    title: "AI-Augmented Workflow",
    content: <p className="text-text-secondary text-sm">Claude Code, Cursor — 40% faster UI delivery</p>,
  },
];

export default function AboutSection() {
  return (
    <section className="py-28 px-6 bg-bg-secondary/20">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <SectionReveal direction="left">
            <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-4">
              About
            </p>
            <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-5 leading-tight">
              Field-tested,<br />context-aware.
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              I build software in the environments where it has to work —
              offline clinics in Haiti, hospital research labs in Seoul,
              and anywhere else the problem is real and the constraints are real.
            </p>
            <p className="text-text-secondary leading-relaxed">
              When I&apos;m not writing Swift or TypeScript, I&apos;m at the piano, playing
              acoustic guitar, teaching martial arts, swimming in the ocean, or
              learning Creole — looking for the next place where software can close
              a gap that nothing else has.
            </p>
          </SectionReveal>

          <SectionReveal direction="right" className="space-y-4">
            {cards.map(({ icon: Icon, iconBg, iconColor, title, content }) => (
              <div
                key={title}
                className="flex items-start gap-3 p-4 rounded-xl bg-bg-card border border-white/5"
              >
                <div className={`p-2 rounded-lg ${iconBg} mt-0.5 flex-shrink-0`}>
                  <Icon size={16} className={iconColor} />
                </div>
                <div>
                  <p className="text-text-primary text-sm font-medium mb-1">{title}</p>
                  {content}
                </div>
              </div>
            ))}
          </SectionReveal>
        </div>
      </div>
    </section>
  );
}
