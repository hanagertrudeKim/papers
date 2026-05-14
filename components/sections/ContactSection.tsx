"use client";

import SectionReveal from "@/components/ui/SectionReveal";
import { Mail, ExternalLink, Download } from "lucide-react";

const links = [
  {
    icon: Mail,
    label: "rlagksk8428@gmail.com",
    href: "mailto:rlagksk8428@gmail.com",
    color: "#FF6B6B",
  },
  {
    icon: ExternalLink,
    label: "github.com/hanagertrudeKim",
    href: "https://github.com/hanagertrudeKim",
    color: "#3B82F6",
  },
  {
    icon: ExternalLink,
    label: "linkedin.com/in/hana-gertrude-kim",
    href: "https://linkedin.com/in/hana-gertrude-kim",
    color: "#10B981",
  },
];

const interests = [
  "Healthcare Technology Roles",
  "Social Impact Projects",
  "Open Source Collaboration",
  "Mission-Driven Organizations",
];

export default function ContactSection() {
  return (
    <section className="py-28 px-6 border-t border-white/5">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-16">
          <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-4">
            Let&apos;s Connect
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary mb-4">
            Let&apos;s Build Something Meaningful
          </h2>
          <p className="text-text-secondary max-w-md mx-auto">
            Whether you&apos;re working on healthcare technology, social impact software,
            or want to collaborate on something that matters — I&apos;d love to talk.
          </p>
        </SectionReveal>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Interests */}
          <SectionReveal direction="left">
            <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-5">
              Interested In
            </p>
            <ul className="space-y-3">
              {interests.map((item, i) => (
                <li key={item} className="flex items-center gap-3 text-text-secondary">
                  <span
                    className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                    style={{
                      background: ["#FF6B6B", "#3B82F6", "#10B981", "#FFA500"][i % 4],
                    }}
                  />
                  {item}
                </li>
              ))}
            </ul>
          </SectionReveal>

          {/* Contact links */}
          <SectionReveal direction="right" className="space-y-4">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl bg-bg-card border border-white/5 hover:border-white/15 group transition-all"
                >
                  <div
                    className="p-2 rounded-lg transition-colors"
                    style={{ background: `${link.color}15` }}
                  >
                    <Icon size={18} style={{ color: link.color }} />
                  </div>
                  <span className="text-text-secondary group-hover:text-text-primary transition-colors text-sm">
                    {link.label}
                  </span>
                </a>
              );
            })}

            {/* Resume download */}
            <a
              href="/HanaKim_Resume.pdf"
              download="HanaKim_Resume.pdf"
              className="w-full flex items-center justify-center gap-2 p-4 rounded-xl border border-korea/30 bg-korea/5 hover:bg-korea/10 text-korea transition-all font-medium text-sm"
            >
              <Download size={16} />
              Download Resume
            </a>
          </SectionReveal>
        </div>

        <SectionReveal className="mt-20 text-center">
          <p className="font-code text-xs text-text-secondary/40">
            © 2026 Hana Kim · Built with Next.js & Three.js
          </p>
        </SectionReveal>
      </div>
    </section>
  );
}
