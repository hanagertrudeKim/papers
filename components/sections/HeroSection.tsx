"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Mail, ArrowRight } from "lucide-react";
import { useState } from "react";
import { LocationKey } from "@/lib/locations";

const GlobeScene = dynamic(() => import("@/components/Globe/GlobeScene"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-52 h-52 rounded-full border border-korea/20 animate-pulse" />
    </div>
  ),
});

const locationMessages: Record<LocationKey, string> = {
  haiti: "Haiti & DR — EHR tracking 300+ mothers across 6 villages.",
  korea: "Seoul — Medical data privacy tools & engineering leadership.",
  usa: "Boston — Next chapter at Gordon College, 2026.",
};

const stats = [
  { value: "300+", label: "Mothers\nTracked", color: "#FF6B6B" },
  { value: "6",    label: "Villages\nServed",  color: "#FF6B6B" },
  { value: "0",    label: "Connectivity\nNeeded", color: "#3B82F6" },
];

const skills = ["Swift", "React", "TypeScript", "Python"];

export default function HeroSection() {
  const [activeLocation, setActiveLocation] = useState<LocationKey | null>(null);

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#080f1e]">
      {/* Ambient gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_75%_50%,rgba(30,58,138,0.18),transparent)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_50%_at_15%_80%,rgba(255,107,107,0.05),transparent)]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.018]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* Two-column layout */}
      <div className="relative z-10 min-h-screen flex flex-col md:grid md:grid-cols-[1fr_1fr] items-center">

        {/* ── Globe (right on desktop, top on mobile) ── */}
        <div className="md:order-2 relative w-full h-[42vh] md:h-[86vh] md:min-h-[620px] md:max-h-[820px] flex items-center justify-center overflow-hidden">
          {/* Glow behind globe */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_70%_at_50%_50%,rgba(59,130,246,0.12),transparent)] pointer-events-none" />
          <div className="relative w-full h-full max-w-[760px]">
            <GlobeScene onPinClick={(loc) => setActiveLocation(loc)} />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute bottom-5 right-5 md:bottom-10 md:right-10 hidden sm:block rounded-2xl border border-white/10 bg-[#07111f]/70 backdrop-blur-md px-4 py-3 shadow-2xl shadow-black/20"
          >
            <p className="font-code text-[10px] tracking-[0.22em] uppercase text-white/45 mb-2">
              Project Route
            </p>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-korea" />
                Korea: privacy + platform systems
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-haiti" />
                Haiti / DR: field healthcare tools
              </div>
              <div className="flex items-center gap-2 text-xs text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-usa" />
                USA: next chapter
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── Text (left on desktop, bottom on mobile) ── */}
        <div className="md:order-1 px-8 md:px-12 lg:px-20 xl:px-28 py-12 md:py-0 flex flex-col justify-center min-h-[58vh] md:min-h-screen">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Role label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-px w-6 bg-korea flex-shrink-0" />
              <p className="font-code text-[11px] text-korea tracking-[0.22em] uppercase">
                Software Engineer
              </p>
            </div>

            {/* Name — headline */}
            <h1 className="font-display text-[4.8rem] sm:text-[5.5rem] md:text-[6rem] lg:text-[7.5rem] xl:text-[8.5rem] text-white leading-[0.87] tracking-tight mb-7">
              Hana<br />Kim
            </h1>

            {/* One-line pitch */}
            <p className="text-text-secondary text-base md:text-lg max-w-xs md:max-w-sm leading-relaxed mb-9">
              Healthcare software built for the field —{" "}
              <span className="text-white font-medium">
                where the internet cuts out
              </span>{" "}
              and patients can&apos;t wait.
            </p>

            {/* Stat strip */}
            <div className="flex items-stretch w-fit mb-9 rounded-xl border border-white/[0.08] overflow-hidden bg-white/[0.02]">
              {stats.map((s, i) => (
                <div key={s.label} className="flex items-stretch">
                  <div className="px-5 py-3 text-center">
                    <div
                      className="font-display text-2xl md:text-3xl leading-none"
                      style={{ color: s.color }}
                    >
                      {s.value}
                    </div>
                    <div className="font-code text-[9px] text-text-secondary/45 uppercase tracking-widest mt-1 whitespace-pre-line leading-tight">
                      {s.label}
                    </div>
                  </div>
                  {i < stats.length - 1 && (
                    <div className="w-px bg-white/[0.08] self-stretch" />
                  )}
                </div>
              ))}
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {skills.map((s) => (
                <span
                  key={s}
                  className="font-code text-xs px-3 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-text-secondary"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-korea text-white text-sm font-semibold hover:bg-korea/90 transition-all duration-200 hover:shadow-lg hover:shadow-korea/20 hover:-translate-y-0.5"
              >
                View Work <ArrowRight size={14} />
              </a>
              <a
                href="mailto:rlagksk8428@gmail.com"
                className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/[0.03] text-text-secondary text-sm hover:text-white hover:border-white/20 hover:bg-white/[0.06] transition-all duration-200"
              >
                <Mail size={13} />
                Get in Touch
              </a>
            </div>

            {/* Globe pin message */}
            {activeLocation && (
              <motion.p
                key={activeLocation}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-sm text-text-secondary/70 font-code"
              >
                📍 {locationMessages[activeLocation]}
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — mouse style */}
      <motion.div
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-0.5 h-1.5 rounded-full bg-white/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
