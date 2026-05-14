"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import SectionReveal from "@/components/ui/SectionReveal";

const events = [
  {
    year: "2022",
    location: "Seoul, Korea",
    color: "#3B82F6",
    title: "KOREATECH — CS Begins",
    description: "Started B.S. Computer Science. Joined BCSD Labs as a front-end engineer, building production apps for 200+ engineers.",
  },
  {
    year: "2023",
    location: "Seoul, Korea",
    color: "#3B82F6",
    title: "Seoul National University Hospital",
    description: "Independent project: built a DICOM anonymization tool deployed at one of Korea's top hospitals. Discovered a passion for healthcare privacy.",
  },
  {
    year: "2024",
    location: "Port-au-Prince, Haiti",
    color: "#FF6B6B",
    title: "First Mission Trip — Problem Discovery",
    description: "Volunteered with OakTree Ministry. Witnessed pregnant women arriving at mobile clinics with no medical history. Knew software could change this.",
  },
  {
    year: "2024 →",
    location: "Haiti & Dominican Republic",
    color: "#FFA500",
    title: "EHR & Sponsorship Platform Deployed",
    description: "Shipped offline-first EHR tracking 300+ mothers across 6 villages, and a sponsorship web platform for 50+ children.",
  },
  {
    year: "2026",
    location: "Boston, USA",
    color: "#10B981",
    title: "Gordon College — Next Chapter",
    description: "Incoming B.S. Computer Science. Continuing to build healthcare software that works at the margins of the world.",
  },
];

export default function TimelineSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-28 px-6 bg-bg-secondary/30">
      <div className="max-w-4xl mx-auto">
        <SectionReveal className="text-center mb-20">
          <p className="font-code text-xs text-text-secondary tracking-widest uppercase mb-3">
            The Journey
          </p>
          <h2 className="font-display text-4xl md:text-5xl text-text-primary">
            Where Code Met Reality
          </h2>
          <p className="text-text-secondary text-sm mt-4 max-w-sm mx-auto">
            Every entry here changed how I write software.
          </p>
        </SectionReveal>

        <div className="relative">
          {/* Background track line */}
          <div className="absolute left-[7.5rem] md:left-36 top-0 bottom-0 w-px bg-white/5" />

          {/* Animated fill line */}
          <div className="absolute left-[7.5rem] md:left-36 top-0 w-px overflow-hidden" style={{ height: "100%" }}>
            <motion.div
              className="w-full bg-gradient-to-b from-korea via-haiti to-usa"
              style={{ height: lineHeight, originY: 0 }}
            />
          </div>

          <div className="space-y-14">
            {events.map((event, i) => (
              <SectionReveal key={event.year} delay={i * 0.05} className="flex gap-8 md:gap-12">
                {/* Year + location */}
                <div className="w-28 md:w-32 flex-shrink-0 text-right pt-1">
                  <div className="font-display text-lg text-text-primary">{event.year}</div>
                  <div className="font-code text-xs text-text-secondary leading-tight mt-0.5">
                    {event.location}
                  </div>
                </div>

                {/* Dot */}
                <div className="relative flex-shrink-0 mt-2">
                  <div
                    className="w-3 h-3 rounded-full border-2 bg-bg-primary"
                    style={{ borderColor: event.color }}
                  />
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <h3 className="font-semibold text-text-primary mb-2">{event.title}</h3>
                  <p className="text-text-secondary text-sm leading-relaxed">{event.description}</p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
